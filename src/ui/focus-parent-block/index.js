/**
 * Getting back out of a block.
 *
 * Lumen layouts nest deeply — a button sits in a Button Group, in a Container,
 * in a Column, in a Columns block — and the settings an author wants next are
 * usually one or two levels up from whatever they just clicked. Getting there
 * meant clicking the canvas around the child and hoping the click landed on the
 * parent's padding rather than on a sibling, or opening the list view.
 *
 * Two ways up, because they answer different questions:
 *
 * - **The toolbar button** answers "take me one level out". It names the parent,
 *   so the author knows where they will land before they click.
 * - **The breadcrumb** answers "where am I, and how do I get to that Columns
 *   block three levels up". It is a trail, not a button — the destination is
 *   often not the immediate parent.
 *
 * Both highlight their target in the canvas on hover, which is what makes the
 * names mean something: "Column" is ambiguous when there are four of them.
 *
 * WordPress core has its own parent selector to the left of the block toolbar
 * and its own breadcrumb pinned to the bottom of the editor. Core's selector is
 * hidden below a large viewport, in zoom-out, and while multiple blocks are
 * selected, and core's breadcrumb is a long way from the settings the author is
 * reading. These stay with the block and with the sidebar.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import {
	BlockControls,
	BlockIcon,
	useBlockEditContext,
} from '@wordpress/block-editor'
import {
	DropdownMenu,
	Icon,
	MenuGroup,
	MenuItem,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components'
import { chevronRightSmall, moreHorizontal } from '@wordpress/icons'
import { getBlockType } from '@wordpress/blocks'
import { useDispatch, useSelect } from '@wordpress/data'
import {
	useCallback, useEffect, useMemo, useRef, memo,
} from '@wordpress/element'
import {
	__, _n, sprintf,
} from '@wordpress/i18n'

const EMPTY_ARRAY = []

/**
 * How many levels of the trail keep a crumb of their own.
 *
 * Four, counting the block you are on. The ancestors are drawn as their block
 * icon alone — no name — which is what makes four of them fit where two named
 * ones did: an icon costs 24px against a word's 60 to 110. The name is not lost,
 * it moves to the tooltip.
 *
 * Deeper than four and the levels that do not fit fold into a menu, taking one
 * of the four slots for themselves, so the row is never wider than four crumbs
 * however deep the block is. The ones that get folded are always the outermost
 * — the structural levels, a Column inside a Columns inside a Container, worth
 * being able to reach but rarely the destination.
 */
const MAX_LEVELS = 4

// One of the four belongs to the block you are on.
const ANCESTOR_SLOTS = MAX_LEVELS - 1

/**
 * The blocks that contain the given one, outermost first.
 *
 * Read in two steps rather than one so that `useSelect` has something stable to
 * compare. Its mapper runs on every store change and the result is compared by
 * identity, so building the finished array of objects inside it would rerender
 * the toolbar and the breadcrumb on every keystroke anywhere in the post.
 *
 * @param {string} clientId The block to look up from.
 * @return {Array} `{ clientId, name, title, icon }` for each ancestor.
 */
export const useBlockAncestors = clientId => {
	/*
	 * `lumen/no-get-block-parents` points at `useBlockContext().parentTree` as
	 * the faster alternative. That hook and the `lumen/block-context` store it
	 * read are not part of this codebase — nothing here exposes a parent tree —
	 * so the rule's replacement does not exist to be used. What it is guarding
	 * against is the rerender cost, and that is handled instead: this selector
	 * is memoised on `state.blocks.parents`, so it hands back the very same
	 * array until the block tree itself changes.
	 */
	const ancestorClientIds = useSelect( select => (
		// eslint-disable-next-line lumen/no-get-block-parents
		clientId ? select( 'core/block-editor' ).getBlockParents( clientId ) : EMPTY_ARRAY
	), [ clientId ] )

	// Collapsed to one string on purpose — see above. Block names change when a
	// block is transformed, which is rare, and a string compares by value.
	const ancestorNames = useSelect( select => {
		const { getBlockName } = select( 'core/block-editor' )
		return ancestorClientIds.map( ancestorClientId => getBlockName( ancestorClientId ) ).join( ',' )
	}, [ ancestorClientIds ] )

	return useMemo( () => {
		const names = ancestorNames ? ancestorNames.split( ',' ) : []

		return ancestorClientIds.map( ( ancestorClientId, index ) => {
			const name = names[ index ]
			const blockType = getBlockType( name )

			return {
				clientId: ancestorClientId,
				name,
				// A block whose type is no longer registered still has a place
				// in the tree, and the author still needs to be able to get to
				// it, so fall back to the raw name rather than dropping it.
				title: blockType?.title || name,
				icon: blockType?.icon,
			}
		} )
	}, [ ancestorClientIds, ancestorNames ] )
}

/**
 * Mouse and keyboard handlers that outline `clientId` in the canvas while the
 * control is hovered or focused.
 *
 * The highlight is editor state rather than a CSS hover, so it has to be turned
 * off again by hand — including when the control disappears out from under the
 * pointer, which is exactly what happens here: clicking selects the parent, and
 * selecting the parent unmounts the button that was highlighting it. Without
 * the cleanup the old parent keeps its outline until something else flashes.
 *
 * @param {string} clientId The block to highlight.
 * @return {Object} Props to spread onto the control.
 */
const useHighlightGestures = clientId => {
	const { toggleBlockHighlight } = useDispatch( 'core/block-editor' )
	const isHighlighted = useRef( false )

	const setHighlight = useCallback( isOn => {
		if ( ! clientId || isHighlighted.current === isOn ) {
			return
		}
		isHighlighted.current = isOn
		toggleBlockHighlight( clientId, isOn )
	}, [ clientId, toggleBlockHighlight ] )

	useEffect( () => () => setHighlight( false ), [ setHighlight ] )

	return {
		onMouseEnter: () => setHighlight( true ),
		onMouseLeave: () => setHighlight( false ),
		onFocus: () => setHighlight( true ),
		onBlur: () => setHighlight( false ),
	}
}

/**
 * One step out, in the block's own toolbar.
 *
 * Rendered for every Lumen block through `withFocusParentBlock`, and returns
 * nothing at the top level where there is no parent to go to.
 *
 * @return {Element|null} The toolbar button.
 */
export const FocusParentBlockToolbar = memo( () => {
	const { clientId } = useBlockEditContext()
	const ancestors = useBlockAncestors( clientId )
	const parent = ancestors[ ancestors.length - 1 ]
	const { selectBlock } = useDispatch( 'core/block-editor' )
	const highlightGestures = useHighlightGestures( parent?.clientId )

	if ( ! parent ) {
		return null
	}

	return (
		<BlockControls>
			<ToolbarGroup className="lmn-focus-parent__toolbar">
				<ToolbarButton
					icon={ <BlockIcon icon={ parent.icon } /> }
					text={ parent.title }
					/* translators: %s: title of the block that contains this one. */
					label={ sprintf( __( 'Select parent block: %s', i18n ), parent.title ) }
					onClick={ () => selectBlock( parent.clientId ) }
					{ ...highlightGestures }
				/>
			</ToolbarGroup>
		</BlockControls>
	)
} )

/**
 * The chevron between two crumbs.
 *
 * Rendered by every crumb and hidden on the first one in CSS, because which
 * crumb comes first changes with the shape of the trail — folding the middle
 * away moves it — and a separator that is a sibling of the crumbs cannot know.
 *
 * @return {Element} The separator.
 */
const Separator = () => (
	<Icon
		className="lmn-focus-parent__separator"
		icon={ chevronRightSmall }
		size={ 18 }
	/>
)

/**
 * One crumb of the trail: an enclosing block, drawn as its icon.
 *
 * The name is carried by the tooltip and the accessible label rather than by a
 * visible word — see `MAX_LEVELS`. Pointing at the crumb also outlines the
 * block itself in the canvas, which answers "which Column" in a way no label
 * could.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.ancestor The block this crumb points at.
 * @return {Element} The crumb.
 */
const Crumb = ( { ancestor } ) => {
	const { selectBlock } = useDispatch( 'core/block-editor' )
	const highlightGestures = useHighlightGestures( ancestor.clientId )

	return (
		<li className="lmn-focus-parent__crumb">
			<Separator />
			<button
				type="button"
				className="lmn-focus-parent__button lmn-focus-parent__button--icon"
				/* translators: %s: title of an enclosing block. */
				aria-label={ sprintf( __( 'Select %s', i18n ), ancestor.title ) }
				title={ ancestor.title }
				onClick={ () => selectBlock( ancestor.clientId ) }
				{ ...highlightGestures }
			>
				<BlockIcon icon={ ancestor.icon } showColors={ false } />
			</button>
		</li>
	)
}

/**
 * One of the levels folded away into the overflow menu.
 *
 * @param {Object}   props          Component props.
 * @param {Object}   props.ancestor The block this row points at.
 * @param {number}   props.depth    How far in from the outermost crumb it sits.
 * @param {Function} props.onClose  Closes the menu.
 * @return {Element} The menu row.
 */
const OverflowItem = ( {
	ancestor, depth, onClose,
} ) => {
	const { selectBlock } = useDispatch( 'core/block-editor' )
	const highlightGestures = useHighlightGestures( ancestor.clientId )

	return (
		<MenuItem
			className="lmn-focus-parent__overflow-item"
			icon={ <BlockIcon icon={ ancestor.icon } showColors={ false } /> }
			onClick={ () => {
				selectBlock( ancestor.clientId )
				onClose()
			} }
			{ ...highlightGestures }
		>
			{ /*
			  * Indented by depth so the menu reads as the nesting it stands for
			  * rather than as a flat list of blocks that happen to be related.
			  */ }
			<span style={ { paddingLeft: `${ depth * 10 }px` } }>{ ancestor.title }</span>
		</MenuItem>
	)
}

/**
 * The folded middle of the trail.
 *
 * @param {Object} props           Component props.
 * @param {Array}  props.ancestors The levels that were folded away.
 * @return {Element} The overflow crumb.
 */
const OverflowCrumb = ( { ancestors } ) => (
	<li className="lmn-focus-parent__crumb lmn-focus-parent__crumb--overflow">
		<Separator />
		<DropdownMenu
			className="lmn-focus-parent__overflow"
			icon={ moreHorizontal }
			label={ sprintf(
				/* translators: %d: how many nesting levels are hidden. */
				_n( '%d level in between', '%d levels in between', ancestors.length, i18n ),
				ancestors.length
			) }
			popoverProps={ { placement: 'bottom-start' } }
			toggleProps={ { className: 'lmn-focus-parent__button lmn-focus-parent__button--overflow' } }
		>
			{ ( { onClose } ) => (
				<MenuGroup>
					{ ancestors.map( ( ancestor, index ) => (
						<OverflowItem
							key={ ancestor.clientId }
							ancestor={ ancestor }
							depth={ index }
							onClose={ onClose }
						/>
					) ) }
				</MenuGroup>
			) }
		</DropdownMenu>
	</li>
)

/**
 * Where this block sits, at the top of the sidebar.
 *
 * Sits above everything else in the inspector because it is about the block
 * rather than about any one of its settings, and because a trail that appears
 * below the panels is a trail nobody scrolls back up to read.
 *
 * @return {Element|null} The breadcrumb.
 */
export const FocusParentBlockBreadcrumb = memo( () => {
	const { clientId, name } = useBlockEditContext()
	const ancestors = useBlockAncestors( clientId )
	const listRef = useRef()

	/*
	 * Folding fixes the number of crumbs, but not their width — two blocks
	 * titled "Horizontal Scroller" can still push the end of the row out of
	 * sight between them. When that happens the end is the part worth keeping:
	 * it is where the author is. So the row starts scrolled to its end rather
	 * than to its beginning.
	 */
	useEffect( () => {
		if ( listRef.current ) {
			listRef.current.scrollLeft = listRef.current.scrollWidth
		}
	}, [ ancestors ] )

	// A top-level block is not inside anything, so there is no trail to show —
	// and a breadcrumb of one is just the block title repeated.
	if ( ! ancestors.length ) {
		return null
	}

	const currentBlockType = getBlockType( name )

	// Everything fits, or the fold takes a slot for itself and the nearest
	// ancestors keep the ones that are left.
	const fits = ancestors.length <= ANCESTOR_SLOTS
	const visible = fits ? ancestors : ancestors.slice( -( ANCESTOR_SLOTS - 1 ) )
	const folded = fits ? EMPTY_ARRAY : ancestors.slice( 0, -( ANCESTOR_SLOTS - 1 ) )

	return (
		<nav
			className="lmn-focus-parent"
			aria-label={ __( 'Block hierarchy', i18n ) }
		>
			<ol className="lmn-focus-parent__list" ref={ listRef }>
				{ !! folded.length && <OverflowCrumb ancestors={ folded } /> }

				{ visible.map( ancestor => (
					<Crumb key={ ancestor.clientId } ancestor={ ancestor } />
				) ) }

				<li className="lmn-focus-parent__crumb lmn-focus-parent__crumb--current">
					<Separator />
					<span
						className="lmn-focus-parent__button lmn-focus-parent__button--current"
						title={ currentBlockType?.title || name }
						aria-current="page"
					>
						<BlockIcon icon={ currentBlockType?.icon } showColors={ false } />
						<span className="lmn-focus-parent__label">
							{ currentBlockType?.title || name }
						</span>
					</span>
				</li>
			</ol>
		</nav>
	)
} )
