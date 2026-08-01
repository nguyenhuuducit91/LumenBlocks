/**
 * Internal dependencies
 */
// import { convertSVGStringToBase64 } from './util'

/**
 * External dependencies
 */
import {
	Typography, MarginBottom, BlockDiv, Advanced, EffectsAnimations, Alignment, Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'iconGap', [ {
	selector: '.lmn-block-icon-list-item__content',
	styleRule: 'gap',
	attrName: 'iconGap',
	key: 'iconGap',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'listType', [ {
	selector: 'ol',
	styleRule: '--lmn-list-style-type',
	attrName: 'listType',
	key: 'listType',
} ] )

blockStyles.addBlockStyles( 'columns', [ {
	selector: '',
	styleRule: '--lmn-icon-list-column-count',
	attrName: 'columns',
	key: 'columns',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'columnGap', [ {
	selector: '',
	styleRule: '--lmn-icon-list-column-gap',
	attrName: 'columnGap',
	key: 'columnGap',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'rowGap', [ {
	selector: '',
	styleRule: '--lmn-icon-list-row-gap',
	attrName: 'rowGap',
	key: 'rowGap',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'indentation', [ {
	selector: [ 'ul', 'ol' ],
	styleRule: 'paddingLeft',
	attrName: 'indentation',
	key: 'indentation',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'markerColor', [ {
	selector: '',
	hover: 'all',
	hoverSelector: '.%s:hover',
	styleRule: '--lmn-icon-list-marker-color',
	attrName: 'markerColor',
	key: 'markerColor',
} ] )

blockStyles.addBlockStyles( 'iconOpacity', [ {
	selector: '',
	hover: 'all',
	hoverSelector: '.%s:hover',
	styleRule: '--lmn-icon-list-icon-opacity',
	attrName: 'iconOpacity',
	key: 'iconOpacity',
} ] )

blockStyles.addBlockStyles( 'iconRotation', [ {
	selector: '',
	hover: 'all',
	hoverSelector: '.%s:hover',
	styleRule: '--lmn-icon-list-icon-rotation',
	attrName: 'iconRotation',
	key: 'iconRotation',
	valueCallback: value => value + 'deg',
} ] )

blockStyles.addBlockStyles( 'iconSize', [ {
	selector: '',
	styleRule: '--lmn-icon-list-icon-size',
	attrName: 'iconSize',
	key: 'iconSize',
	responsive: 'all',
	format: '%spx',
}, {
	selector: 'ul .lmn-block-icon-list-item__content .lmn--svg-wrapper',
	styleRule: 'marginRight',
	attrName: 'iconSize',
	key: 'iconMarginRight',
	responsive: 'all',
	valueCallback: value => value === 0 ? '0px' : undefined,
} ] )

blockStyles.addBlockStyles( 'iconVerticalAlignment', [ {
	selector: '.lmn-block-icon-list-item__content',
	styleRule: 'alignItems',
	attrName: 'iconVerticalAlignment',
	key: 'iconVerticalAlignment',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'iconVerticalOffset', [ {
	selector: [ 'ul .lmn-block-icon-list-item__content .lmn--inner-svg', 'ol .lmn-block-icon-list-item__content .lmn-block-icon-list-item__marker' ],
	styleRule: 'transform',
	attrName: 'iconVerticalOffset',
	key: 'iconVerticalOffset',
	responsive: 'all',
	format: 'translateY(%spx)',
} ] )

blockStyles.addBlockStyles( 'hasPeriod', [ {
	selector: '.lmn-block-icon-list-item__marker::before',
	styleRule: 'content',
	attrName: 'hasPeriod',
	key: 'hasPeriod',
	valueCallback: value => ! value ? `counter(lmn-icon-list-counter, var(--lmn-list-style-type, decimal))` : undefined,
	enabledCallback: getAttribute => getAttribute( 'ordered' ),
	dependencies: [ 'ordered' ],
} ] )

blockStyles.addBlockStyles( 'listAlignment', [ {
	selector: '.lmn-block-icon-list-item__content',
	styleRule: 'marginInline',
	attrName: 'listAlignment',
	key: 'listAlignment-marginInline',
	responsive: 'all',
	valueCallback: value => value === 'center' ? 'auto' : value === 'right' ? 'auto 0' : value === 'left' ? '0 auto' : '',
} ] )

blockStyles.addBlockStyles( 'listFullWidth', [ {
	selector: [ 'ul', 'ol' ],
	responsive: 'all',
	styleRule: 'width',
	attrName: 'listFullWidth',
	key: 'listFullWidth',
	valueCallback: value => ! value ? 'fit-content' : undefined,
	enabledCallback: getAttribute => getAttribute( 'listDisplayStyle' ) === 'grid',
	dependencies: [ 'listDisplayStyle' ],
} ] )

blockStyles.addBlockStyles( 'contentAlign', [ {
	selector: '.lmn-block-icon-list__group',
	responsive: 'all',
	styleRule: 'marginInline',
	attrName: 'contentAlign',
	key: 'contentAlign-group',
	valueCallback: value => value === 'center' ? 'auto' : value === 'right' ? 'auto 0' : value === 'left' ? '0 auto' : '',
	enabledCallback: getAttribute => getAttribute( 'listDisplayStyle' ) !== 'grid',
	dependencies: [ 'listDisplayStyle' ],
} ] )

blockStyles.addBlockStyles( 'listItemBorderStyle', [ {
	selectorCallback: getAttribute => {
		const columns = getAttribute( 'columns' ) || 1
		const unborderedItems = getAttribute( 'listDisplayStyle' ) === 'grid' ? columns : 1

		return `.wp-block-lumen-icon-list-item:not(:nth-last-child(-n + ${ unborderedItems }))::after`
	},
	styleRule: 'borderBottomStyle',
	attrName: 'listItemBorderStyle',
	key: 'listItemBorderStyle',
} ] )

blockStyles.addBlockStyles( 'listItemBorderWidth', [ {
	selectorCallback: getAttribute => {
		const columns = getAttribute( 'columns' ) || 1
		const unborderedItems = getAttribute( 'listDisplayStyle' ) === 'grid' ? columns : 1

		return `.wp-block-lumen-icon-list-item:not(:nth-last-child(-n + ${ unborderedItems }))::after`
	},
	styleRule: 'borderWidth',
	attrName: 'listItemBorderWidth',
	key: 'listItemBorderWidth',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'listItemBorderColor', [ {
	selectorCallback: getAttribute => {
		const columns = getAttribute( 'columns' ) || 1
		const unborderedItems = getAttribute( 'listDisplayStyle' ) === 'grid' ? columns : 1

		return `.wp-block-lumen-icon-list-item:not(:nth-last-child(-n + ${ unborderedItems }))::after`
	},
	styleRule: 'borderColor',
	attrName: 'listItemBorderColor',
	key: 'listItemBorderColor',
} ] )

Alignment.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: [
		'ul li',
		'ol li',
		// Apply directly to span for gradient text color
		'ul li span',
		'ol li span',
	],
	hoverSelector: [
		'.%s:hover ul li',
		'.%s:hover ol li',
	],
} )
MarginBottom.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
