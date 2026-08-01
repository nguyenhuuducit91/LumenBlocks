/**
 * Internal dependencies
 */
import variations from './variations'

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

export default blockStyles
