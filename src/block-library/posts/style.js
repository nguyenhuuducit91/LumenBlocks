/**
 * Internal dependencies
 */
import variations from './variations'
import { widthsToTemplate, arrangementToColumns } from './grid-value'

/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	Column,
	ContainerDiv,
	EffectsAnimations,
	Image,
	Typography,
	addFlexGapStyles,
	Transform,
} from '~lumen/features'
import { getBlockStyle } from '~lumen/hooks'
import { range } from 'lodash'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

const itemSelector = ' .%s-container'
const hoverSelectorCallback = append => getAttribute =>
	getAttribute( 'hoverStateInContainer' )
		? `${ itemSelector }:hover ${ append }`
		: `${ itemSelector } ${ append }:hover`
const dependencies = [ 'hoverStateInContainer' ]

blockStyles.addBlockStyles( 'columns', [ {
	selector: '',
	styleRule: '--lmn-columns',
	attrName: 'columns',
	key: 'columns',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'containerPadding', [ {
	selector: '',
	responsive: 'all',
	styleRule: '--lmn-container-padding-left',
	attrName: 'containerPadding',
	key: 'containerPadding',
	hasUnits: 'px',
	valueCallback: value => value?.left,
}, {
	selector: '',
	responsive: 'all',
	styleRule: '--lmn-container-padding-right',
	attrName: 'containerPadding',
	key: 'containerPadding-right',
	hasUnits: 'px',
	valueCallback: value => value?.right,
} ] )

blockStyles.addBlockStyles( 'columnGap', [ {
	selector: '',
	styleRule: '--lmn-column-gap',
	attrName: 'columnGap',
	key: 'columnGap',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'innerBlockContentWidth', [ {
	selector: '.lmn-content-align',
	hasUnits: 'px',
	responsive: 'all',
	styleRule: 'maxWidth',
	attrName: 'innerBlockContentWidth',
	key: 'innerBlockContentWidth',
} ] )

blockStyles.addBlockStyles( 'innerBlockAlign', [ {
	selector: '.lmn-content-align',
	responsive: 'all',
	styleRule: 'marginLeft',
	attrName: 'innerBlockAlign',
	key: 'innerBlockAlign-margin-left',
	valueCallback: ( value, getAttribute, device ) => {
		if ( getAttribute( 'innerBlockContentWidth', device ) === undefined || getAttribute( 'innerBlockContentWidth', device ) === '' ) {
			return undefined
		}
		if ( value === 'center' || value === 'flex-end' ) {
			return 'auto'
		}
		return 0
	},
	dependencies: [ 'innerBlockContentWidth' ],
}, {
	selector: '.lmn-content-align',
	responsive: 'all',
	styleRule: 'marginRight',
	attrName: 'innerBlockAlign',
	key: 'innerBlockAlign',
	valueCallback: ( value, getAttribute, device ) => {
		if ( getAttribute( 'innerBlockContentWidth', device ) === undefined || getAttribute( 'innerBlockContentWidth', device ) === '' ) {
			return undefined
		}
		if ( value === 'center' || value === 'flex-start' ) {
			return 'auto'
		}
		return 0
	},
	dependencies: [ 'innerBlockContentWidth' ],
} ] )
{ /** Category Highlight Color */ }

blockStyles.addBlockStyles( 'categoryHighlightColor', [ {
	selector: `${ itemSelector } .lmn-button`,
	styleRule: 'background',
	attrName: 'categoryHighlightColor',
	key: 'categoryHighlightColor-button',
	enabledCallback: getAttribute => getAttribute( 'categoryHighlighted' ),
	dependencies: [ 'categoryHighlighted' ],
}, {
	selector: `${ itemSelector } .lmn-button:after`,
	styleRule: 'background',
	attrName: 'categoryHighlightColor',
	key: 'categoryHighlightColor-button-after',
	hoverSelectorCallback: getAttribute => getAttribute( 'categoryHoverStateInContainer' )
		? `${ itemSelector }:hover .lmn-button:after`
		: `${ itemSelector } .lmn-button:hover:after`,
	hover: 'all',
	valuePreCallback: ( value, getAttribute, device, state ) => {
		if ( state === 'normal' ) {
			return undefined
		}

		return value
	},
	enabledCallback: getAttribute => getAttribute( 'categoryHighlighted' ),
	dependencies: [ 'categoryHighlighted', 'categoryHoverStateInContainer' ],
}, {
	selector: `${ itemSelector } .lmn-button:after`,
	styleRule: 'opacity',
	attrName: 'categoryHighlightColor',
	key: 'categoryHighlightColor-opacity',
	hoverSelectorCallback: getAttribute => getAttribute( 'categoryHoverStateInContainer' )
		? `${ itemSelector }:hover .lmn-button:after`
		: `${ itemSelector } .lmn-button:hover:after`,
	hover: 'all',
	valuePreCallback: ( value, getAttribute, device, state ) => {
		if ( state === 'normal' ) {
			return undefined
		}

		return ( value !== undefined && value !== '' ) ? 1 : undefined
	},
	enabledCallback: getAttribute => getAttribute( 'categoryHighlighted' ),
	dependencies: [ 'categoryHighlighted', 'categoryHoverStateInContainer' ],
} ] )

{ /** Spacing */ }
blockStyles.addBlockStyles( 'imageSpacing', [ {
	selector: `${ itemSelector } .lmn-block-posts__image-link`,
	styleRule: 'marginBottom',
	attrName: 'imageSpacing',
	key: 'imageSpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'titleSpacing', [ {
	selector: '.lmn-block-posts__title',
	styleRule: 'marginBottom',
	attrName: 'titleSpacing',
	key: 'titleSpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'categorySpacing', [ {
	selector: '.lmn-block-posts__category',
	styleRule: 'marginBottom',
	attrName: 'categorySpacing',
	key: 'categorySpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'excerptSpacing', [ {
	selector: '.lmn-block-posts__excerpt',
	styleRule: 'marginBottom',
	attrName: 'excerptSpacing',
	key: 'excerptSpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'metaSpacing', [ {
	selector: '.lmn-block-posts__meta',
	styleRule: 'marginBottom',
	attrName: 'metaSpacing',
	key: 'metaSpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'readmoreSpacing', [ {
	selector: '.lmn-block-posts__readmore',
	styleRule: 'marginBottom',
	attrName: 'readmoreSpacing',
	key: 'readmoreSpacing',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'imageWidth', [ {
	renderIn: 'save',
	selector: '.lmn-container-padding',
	styleRule: 'width',
	attrName: 'imageWidth',
	key: 'imageWidth',
	responsive: 'all',
	valueCallback: ( value, getAttribute, device ) => {
		if ( getAttribute( 'imageWidthUnit', device ) === '%' && value !== undefined && value !== '' ) {
			return ( 100 - parseInt( value ) ) + '%'
		}

		return undefined
	},
	enabledCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )
		return blockStyle?.name === 'list'
	},
	dependencies: [ 'imageWidthUnit', 'className' ],
}, {
	renderIn: 'save',
	selector: '.lmn-block-posts__image-link:not(:empty)',
	styleRule: 'width',
	attrName: 'imageWidth',
	key: 'imageWidthHorizontalSave',
	responsive: 'all',
	hasUnits: '%',
	enabledCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )

		return ( getAttribute( 'imageWidthUnit' ) === '%' ||
		getAttribute( 'imageWidthUnitTablet' ) === '%' ) &&
		[ 'horizontal', 'horizontal-2' ].includes( blockStyle?.name ) &&
		getAttribute( 'imageHasLink' )
	},
	dependencies: [
		'imageWidthUnitTablet',
		'imageWidthUnit',
		'imageHasLink',
		'className',
	],
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Column.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )
ContainerDiv.addStyles( blockStyles, {
	backgroundSelector: itemSelector,
	borderSelector: itemSelector,
	sizeSelector: itemSelector,
} )
Image.addStyles( blockStyles, {
	dependencies: [ 'imageHoverStateInContainer', 'imageOverlayColorType' ],
	enableHeightCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )

		return ! [ 'portfolio' ].includes( blockStyle?.name )
	},
	enableAspectRatioCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )
		return ! [ 'list', 'horizontal', 'horizontal-2', 'portfolio', 'portfolio-2', 'vertical-card-2' ].includes( blockStyle?.name )
	},
	saveEnableWidthCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const imageHasLink = getAttribute( 'imageHasLink' )
		const blockStyle = getBlockStyle( variations, className )

		if ( [ 'horizontal', 'horizontal-2' ].includes( blockStyle?.name ) ) {
			// If the image has a link and the width unit is %, return false
			// because we have set a custom selector for the image width that uses the % unit.
			if ( imageHasLink && ( getAttribute( 'imageWidthUnit' ) === '%' ||
			getAttribute( 'imageWidthUnitTablet' ) === '%' ) ) {
				return false
			}
			return true
		}
		return true
	},
	selectorCallback: ( getAttribute, _attributes, _clientId, props ) => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )
		const imageHasLink = getAttribute( 'imageHasLink' )

		const selector = props.selector
		if ( [ 'list' ].includes( blockStyle?.name ) && imageHasLink ) {
			return Array.isArray( selector )
				? [ ...selector, `${ itemSelector } .lmn-block-posts__image-link` ]
				: [ selector, `${ itemSelector } .lmn-block-posts__image-link` ]
		}
		return selector
	},
	hoverSelectorCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )

		if ( [ 'portfolio', 'portfolio-2' ].includes( blockStyle?.name ) ) {
			return `${ itemSelector }:hover .lmn-img-wrapper img`
		}

		if ( [ 'image-card' ].includes( blockStyle?.name ) ) {
			return `.lmn-block-posts__image-card-container:hover img`
		}
		return '.lmn-img-wrapper:hover img'
	},
	widthStyleRuleCallback: getAttribute => {
		const className = getAttribute( 'className' )
		const blockStyle = getBlockStyle( variations, className )
		const imageHasLink = getAttribute( 'imageHasLink' )

		if ( [ 'list' ].includes( blockStyle?.name ) && imageHasLink ) {
			return 'flexBasis'
		}
		return 'width'
	},

} )

Typography.addStyles( blockStyles, {
	editSelector: '.lmn-block-posts__title',
	saveSelector: `.lmn-block-posts__title a`,
	editHoverSelectorCallback: hoverSelectorCallback( '.lmn-block-posts__title' ),
	saveHoverSelectorCallback: hoverSelectorCallback( '.lmn-block-posts__title a' ),
	attrNameTemplate: 'title%s',
	dependencies,
} )

Typography.addStyles( blockStyles, {
	selectorCallback: getAttribute => `.lmn-block-posts__category, .lmn-block-posts__category a${ getAttribute( 'highlighted' )
		? ' .lmn-button__inner-text'
		: '' }`,
	hoverSelectorCallback: getAttribute => {
		const selector = getAttribute( 'highlighted' ) ? ' .lmn-button__inner-text' : ''
		return getAttribute( 'hoverStateInContainer' )
			? `${ itemSelector }:hover .lmn-block-posts__category a${ selector }`
			: `.lmn-block-posts__category a:hover${ selector }`
	},
	attrNameTemplate: 'category%s',
	dependencies: [ 'Highlighted', 'hoverStateInContainer', ...dependencies ],
} )

Typography.addStyles( blockStyles, {
	selector: `.lmn-block-posts__excerpt p`,
	hoverSelectorCallback: hoverSelectorCallback( '.lmn-block-posts__excerpt p' ),
	attrNameTemplate: 'excerpt%s',
	dependencies,
} )

Typography.addStyles( blockStyles, {
	selector: `.lmn-block-posts__meta`,
	hoverSelectorCallback: hoverSelectorCallback( '.lmn-block-posts__meta' ),
	attrNameTemplate: 'meta%s',
	dependencies,
} )

Typography.addStyles( blockStyles, {
	selector: `.lmn-block-posts__readmore`,
	hoverSelectorCallback: hoverSelectorCallback( '.lmn-block-posts__readmore' ),
	attrNameTemplate: 'readmore%s',
	dependencies,
} )

addFlexGapStyles( blockStyles, {
	selector: '.lmn-block-posts__items',
	enableColumnGap: false,
} )

/**
 * The grid of posts.
 *
 * The container has always been a wrapping flex row with each post given a
 * `flex-basis` worked out from the number of columns. Widths of its own and an
 * order of its own are things flex cannot do here: `order` in a wrapping
 * container reorders the whole list, not the columns of each row. So when
 * either is set the container becomes a grid — and only then, which is why a
 * post that has neither keeps exactly the CSS it was saved with.
 */
const ITEMS = '.lmn-block-posts__items'
const ITEM = `${ ITEMS } > .lmn-block-posts__item`

/**
 * Whether the author has laid the grid of posts out by hand.
 *
 * @param {Function} getAttribute Attribute reader.
 * @param {string}   device       Which viewport.
 * @return {boolean} Whether to use a grid.
 */
const hasPostsGrid = ( getAttribute, device ) => {
	const columns = getAttribute( 'columns', device ) || 2

	return !! widthsToTemplate( getAttribute( 'postsColumnWidths', device ), columns ) ||
		!! arrangementToColumns( getAttribute( 'postsColumnArrangement', device ), columns )
}

const postsGridDependencies = [ 'columns', 'postsColumnWidths', 'postsColumnArrangement' ]

blockStyles.addBlockStyles( 'postsColumnWidths', [
	{
		selector: ITEMS,
		styleRule: 'display',
		attrName: 'postsColumnWidths',
		key: 'postsGrid-display',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => (
			hasPostsGrid( getAttribute, device ) ? 'grid' : undefined
		),
		dependencies: postsGridDependencies,
	},
	{
		selector: ITEMS,
		styleRule: 'gridTemplateColumns',
		attrName: 'postsColumnWidths',
		key: 'postsGrid-columns',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => {
			if ( ! hasPostsGrid( getAttribute, device ) ) {
				return undefined
			}

			const columns = getAttribute( 'columns', device ) || 2

			return widthsToTemplate( value, columns ) || `repeat(${ columns }, 1fr)`
		},
		dependencies: postsGridDependencies,
	},
	/*
	 * The flex sizing has to be taken off the posts themselves.
	 *
	 * `style.scss` gives every post a `width` and a `flex-basis` worked out
	 * from the column count. Left in place they fight the grid track they have
	 * been put in, and a 60% column ends up holding a post half its size.
	 */
	{
		selector: ITEM,
		styleRule: 'width',
		attrName: 'postsColumnWidths',
		key: 'postsGrid-item-width',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => (
			hasPostsGrid( getAttribute, device ) ? 'auto' : undefined
		),
		dependencies: postsGridDependencies,
	},
	{
		selector: ITEM,
		styleRule: 'flexBasis',
		attrName: 'postsColumnWidths',
		key: 'postsGrid-item-basis',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => (
			hasPostsGrid( getAttribute, device ) ? 'auto' : undefined
		),
		dependencies: postsGridDependencies,
	},
] )

/*
 * The order the columns are shown in.
 *
 * One rule per position: the post in position k is told which grid column to
 * sit in. `dense` lets a post placed in an earlier column backfill the gap the
 * one before it left, which is what makes "show column 2 first" work rather
 * than leaving a hole.
 *
 * Four positions is the most the column control offers, so four rules is all
 * that is ever needed.
 */
const MAX_COLUMNS = 4

blockStyles.addBlockStyles( 'postsColumnArrangement', [
	{
		selector: ITEMS,
		styleRule: 'gridAutoFlow',
		attrName: 'postsColumnArrangement',
		key: 'postsGrid-flow',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => (
			hasPostsGrid( getAttribute, device ) ? 'row dense' : undefined
		),
		dependencies: postsGridDependencies,
	},
	...range( MAX_COLUMNS ).map( position => ( {
		selectorCallback: getAttribute => {
			const columns = getAttribute( 'columns' ) || 2

			return `${ ITEMS } > .lmn-block-posts__item:nth-child(${ columns }n + ${ position + 1 })`
		},
		styleRule: 'gridColumn',
		attrName: 'postsColumnArrangement',
		key: `postsGrid-order-${ position }`,
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => {
			const columns = getAttribute( 'columns', device ) || 2

			if ( position >= columns ) {
				return undefined
			}

			const order = arrangementToColumns( value, columns )

			return order ? String( order[ position ] ) : undefined
		},
		dependencies: postsGridDependencies,
	} ) ),
] )

/**
 * The layout of one post.
 *
 * `contentOrder` stacks the parts of a post; this decides whether the featured
 * image sits above them or beside them. It is done with grid rather than by
 * changing the markup, so nothing that has already been saved has to be
 * migrated: the parts stay a flat list of children and the grid places them.
 *
 * The image spans every row of its column, so a tall block of text keeps the
 * image beside all of it rather than only beside the first line.
 */
const ARTICLE = '.lmn-block-posts__item article'
const MEDIA = `${ ARTICLE } > :is(.lmn-img-wrapper, .lmn-block-posts__image-link)`
const NOT_MEDIA = `${ ARTICLE } > :not(.lmn-img-wrapper):not(.lmn-block-posts__image-link)`

const isBeside = value => value === 'media-left' || value === 'media-right'

/*
 * A device that has been told to stack has to say so in CSS, not merely stay
 * quiet: the desktop rule is still in force at every width below it, so
 * "stacked on mobile" means writing the grid back off again.
 */
const isStacked = value => value === 'stacked'

// A grid the author lays out part by part.
const isCustom = value => value === 'custom'

blockStyles.addBlockStyles( 'itemLayout', [
	{
		selector: ARTICLE,
		styleRule: 'display',
		attrName: 'itemLayout',
		key: 'itemLayout-display',
		responsive: 'all',
		valueCallback: value => {
			if ( isBeside( value ) || isCustom( value ) ) {
				return 'grid'
			}

			return isStacked( value ) ? 'block' : undefined
		},
	},
	{
		selector: ARTICLE,
		styleRule: 'gridTemplateColumns',
		attrName: 'itemLayout',
		key: 'itemLayout-columns',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => {
			if ( isCustom( value ) ) {
				const columns = getAttribute( 'itemColumns', device ) || 2

				return `repeat(${ columns }, 1fr)`
			}

			if ( ! isBeside( value ) ) {
				return undefined
			}

			const width = getAttribute( 'itemMediaWidth', device ) || 40
			const unit = getAttribute( 'itemMediaWidthUnit', device ) || '%'
			const media = `${ width }${ unit }`

			return value === 'media-left' ? `${ media } 1fr` : `1fr ${ media }`
		},
		dependencies: [ 'itemMediaWidth', 'itemMediaWidthUnit', 'itemColumns', ...dependencies ],
	},
	/*
	 * Dense packing, and only for a grid the author laid out.
	 *
	 * Grid places items in order and never moves its cursor backwards, so a
	 * part put in column 1 after one in column 2 lands on the next row rather
	 * than beside it — the author asks for two columns and gets a staircase.
	 * `dense` lets a later part fill an earlier gap, which is what assigning a
	 * column is asking for. It is not used for the named layouts, where the
	 * order on the page should follow the order in the list.
	 */
	{
		selector: ARTICLE,
		styleRule: 'gridAutoFlow',
		attrName: 'itemLayout',
		key: 'itemLayout-flow',
		responsive: 'all',
		valueCallback: value => ( isCustom( value ) ? 'row dense' : undefined ),
	},
	{
		selector: ARTICLE,
		styleRule: 'columnGap',
		attrName: 'itemMediaGap',
		key: 'itemLayout-gap',
		responsive: 'all',
		format: '%spx',
		/*
		 * Only the layouts whose control is called "Image Gap".
		 *
		 * A custom grid takes its gaps from Item Column Gap and Item Row Gap,
		 * which are the controls shown beside it; letting this one through as
		 * well meant two attributes writing `column-gap` onto the same element,
		 * and clearing the visible one left the other one's value on screen with
		 * nothing to say where it came from.
		 */
		valueCallback: ( value, getAttribute, device ) => (
			isBeside( getAttribute( 'itemLayout', device ) ) ? value : undefined
		),
		dependencies: [ 'itemLayout', ...dependencies ],
	},
	{
		selector: ARTICLE,
		styleRule: 'alignItems',
		attrName: 'itemMediaVerticalAlign',
		key: 'itemLayout-align',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => (
			isBeside( getAttribute( 'itemLayout', device ) ) ? value : undefined
		),
		dependencies: [ 'itemLayout', ...dependencies ],
	},

	// The image: one column, every row.
	{
		selector: MEDIA,
		styleRule: 'gridColumn',
		attrName: 'itemLayout',
		key: 'itemLayout-media-column',
		responsive: 'all',
		valueCallback: value => {
			if ( isStacked( value ) ) {
				return 'auto'
			}

			if ( ! isBeside( value ) ) {
				return undefined
			}

			return value === 'media-left' ? '1' : '2'
		},
	},
	{
		selector: MEDIA,
		styleRule: 'gridRow',
		attrName: 'itemLayout',
		key: 'itemLayout-media-row',
		responsive: 'all',
		valueCallback: value => {
			if ( isStacked( value ) ) {
				return 'auto'
			}

			return isBeside( value ) ? '1 / -1' : undefined
		},
	},
	/*
	 * Without this the image stretches to the height of the words beside it,
	 * which distorts it. It keeps its own height and sits at the top unless the
	 * author says otherwise.
	 */
	{
		selector: MEDIA,
		styleRule: 'alignSelf',
		attrName: 'itemLayout',
		key: 'itemLayout-media-self',
		responsive: 'all',
		valueCallback: ( value, getAttribute, device ) => {
			if ( ! isBeside( value ) ) {
				return undefined
			}

			return getAttribute( 'itemMediaVerticalAlign', device ) || 'start'
		},
		dependencies: [ 'itemMediaVerticalAlign', ...dependencies ],
	},

	// Everything else: the other column.
	{
		selector: NOT_MEDIA,
		styleRule: 'gridColumn',
		attrName: 'itemLayout',
		key: 'itemLayout-content-column',
		responsive: 'all',
		valueCallback: value => {
			if ( isStacked( value ) ) {
				return 'auto'
			}

			if ( ! isBeside( value ) ) {
				return undefined
			}

			return value === 'media-left' ? '2' : '1'
		},
	},
] )

/*
 * The row of columns inside a post.
 *
 * The parts are children of real column elements now, so the grid is on the row
 * rather than on the post: each column stacks its own contents, which is what
 * placing parts with `grid-column` could not do — they shared rows with the
 * other columns and were pulled apart by whatever sat beside them.
 */
const COLS = `${ ARTICLE } > .lmn-block-posts__cols`

blockStyles.addBlockStyles( 'itemColumnWidths', [ {
	selector: COLS,
	styleRule: 'gridTemplateColumns',
	attrName: 'itemColumnWidths',
	key: 'itemGrid-columns',
	responsive: 'all',
	valueCallback: ( value, getAttribute, device ) => {
		if ( ! isCustom( getAttribute( 'itemLayout', device ) ) ) {
			return undefined
		}

		const columns = getAttribute( 'itemColumns', device ) || 2

		return widthsToTemplate( value, columns ) || `repeat(${ columns }, 1fr)`
	},
	dependencies: [ 'itemLayout', 'itemColumns', ...dependencies ],
}, {
	selector: COLS,
	styleRule: 'display',
	attrName: 'itemLayout',
	key: 'itemGrid-display',
	responsive: 'all',
	valueCallback: value => ( isCustom( value ) ? 'grid' : undefined ),
} ] )

/*
 * The order the columns are shown in, as `order` on the columns themselves —
 * they are real elements in a grid, so this is the ordinary way round.
 */
blockStyles.addBlockStyles( 'itemColumnArrangement', range( MAX_COLUMNS ).map( position => ( {
	selector: `${ COLS } > .lmn-block-posts__col:nth-child(${ position + 1 })`,
	styleRule: 'order',
	attrName: 'itemColumnArrangement',
	key: `itemGrid-order-${ position }`,
	responsive: 'all',
	valueCallback: ( value, getAttribute, device ) => {
		if ( ! isCustom( getAttribute( 'itemLayout', device ) ) ) {
			return undefined
		}

		const columns = getAttribute( 'itemColumns', device ) || 2

		if ( position >= columns ) {
			return undefined
		}

		const order = arrangementToColumns( value, columns )

		return order ? String( order.indexOf( position + 1 ) + 1 ) : undefined
	},
	dependencies: [ 'itemLayout', 'itemColumns', ...dependencies ],
} ) ) )

/*
 * The four container settings, for both grids.
 *
 * `flex-direction` and `grid-auto-flow` are written together: the container is
 * a flex row until the author gives the columns widths of their own, at which
 * point it is a grid, and only one of the two properties means anything at a
 * time. Writing both is what makes the control behave the same either way,
 * rather than quietly doing nothing in one of the two states.
 */
const INNER_GRIDS = [
	/*
	 * No gaps here: Column Gap and Row Gap sit further up the same panel and
	 * already write `column-gap` and `row-gap` onto this element, and the
	 * column gap is also arithmetic in each post's `flex-basis` — a second
	 * control writing the property directly would put the widths out of step
	 * with the gaps they were worked out from.
	 */
	{ prefix: 'posts', selector: ITEMS },
	/*
	 * The row of columns, not the post itself. Inside a post the things being
	 * arranged are its columns, and they are what the author is looking at when
	 * these controls are on screen.
	 */
	{
		prefix: 'item', selector: COLS, hasGaps: true,
	},
]

INNER_GRIDS.forEach( ( {
	prefix, selector, hasGaps,
} ) => {
	blockStyles.addBlockStyles( `${ prefix }InnerDirection`, [
		{
			selector,
			styleRule: 'flexDirection',
			attrName: `${ prefix }InnerDirection`,
			key: `${ prefix }-inner-direction`,
			responsive: 'all',
		},
		{
			selector,
			styleRule: 'gridAutoFlow',
			attrName: `${ prefix }InnerDirection`,
			key: `${ prefix }-inner-flow`,
			responsive: 'all',
			valueCallback: value => ( value === 'column' ? 'column' : undefined ),
		},
	] )

	blockStyles.addBlockStyles( `${ prefix }InnerJustify`, [ {
		selector,
		styleRule: 'justifyContent',
		attrName: `${ prefix }InnerJustify`,
		key: `${ prefix }-inner-justify`,
		responsive: 'all',
	} ] )

	blockStyles.addBlockStyles( `${ prefix }InnerAlign`, [ {
		selector,
		styleRule: 'alignItems',
		attrName: `${ prefix }InnerAlign`,
		key: `${ prefix }-inner-align`,
		responsive: 'all',
	} ] )

	if ( ! hasGaps ) {
		return
	}

	// Across and down are asked for separately, as they are everywhere else in
	// this plugin: a row of cards often wants a wide gap between columns and a
	// narrow one between rows.
	blockStyles.addBlockStyles( `${ prefix }InnerColumnGap`, [ {
		selector,
		styleRule: 'columnGap',
		attrName: `${ prefix }InnerColumnGap`,
		key: `${ prefix }-inner-column-gap`,
		responsive: 'all',
		format: '%spx',
	} ] )

	blockStyles.addBlockStyles( `${ prefix }InnerRowGap`, [ {
		selector,
		styleRule: 'rowGap',
		attrName: `${ prefix }InnerRowGap`,
		key: `${ prefix }-inner-row-gap`,
		responsive: 'all',
		format: '%spx',
	} ] )
} )

/*
 * Space around each part of a post.
 *
 * Written out as the four sides rather than a shorthand so that a value left
 * empty stays empty: a shorthand would write `0` into the sides the author
 * never touched and quietly undo whatever the theme had given them.
 */
const PART_SPACING = [
	{ key: 'image', selector: '.lmn-block-posts__image-link' },
	{ key: 'category', selector: '.lmn-block-posts__category' },
	{ key: 'title', selector: '.lmn-block-posts__title' },
	{ key: 'meta', selector: '.lmn-block-posts__meta' },
	{ key: 'excerpt', selector: '.lmn-block-posts__excerpt' },
	{ key: 'readmore', selector: '.lmn-block-posts__readmore' },
]

PART_SPACING.forEach( ( { key, selector } ) => {
	[ 'margin', 'padding' ].forEach( kind => {
		const attrName = `${ key }${ kind === 'margin' ? 'Margin' : 'Padding' }`

		blockStyles.addBlockStyles( attrName, [ 'Top', 'Right', 'Bottom', 'Left' ].map( side => ( {
			selector,
			styleRule: `${ kind }${ side }`,
			attrName,
			key: `${ attrName }-${ side.toLowerCase() }`,
			responsive: 'all',
			hasUnits: 'px',
			valuePreCallback: value => value?.[ side.toLowerCase() ],
		} ) ) )
	} )
} )

export default blockStyles
