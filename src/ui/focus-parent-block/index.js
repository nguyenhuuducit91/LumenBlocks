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
import { ToolbarButton, ToolbarGroup } from '@wordpress/components'
import { getBlockType } from '@wordpress/blocks'
import { useDispatch, useSelect } from '@wordpress/data'
import {
	useCallback, useEffect, useMemo, useRef, memo,
} from '@wordpress/element'
import { __, sprintf } from '@wordpress/i18n'

const EMPTY_ARRAY = []

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
 * One crumb of the trail.
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
			<button
				type="button"
				className="lmn-focus-parent__button"
				onClick={ () => selectBlock( ancestor.clientId ) }
				{ ...highlightGestures }
			>
				<BlockIcon icon={ ancestor.icon } showColors={ false } />
				<span className="lmn-focus-parent__label">{ ancestor.title }</span>
			</button>
		</li>
	)
}

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

	// A top-level block is not inside anything, so there is no trail to show —
	// and a breadcrumb of one is just the block title repeated.
	if ( ! ancestors.length ) {
		return null
	}

	const currentTitle = getBlockType( name )?.title || name

	return (
		<nav
			className="lmn-focus-parent"
			aria-label={ __( 'Block hierarchy', i18n ) }
		>
			<ul className="lmn-focus-parent__list">
				{ ancestors.map( ancestor => (
					<Crumb key={ ancestor.clientId } ancestor={ ancestor } />
				) ) }
				<li className="lmn-focus-parent__crumb lmn-focus-parent__crumb--current">
					<span className="lmn-focus-parent__label" aria-current="true">
						{ currentTitle }
					</span>
				</li>
			</ul>
		</nav>
	)
} )
