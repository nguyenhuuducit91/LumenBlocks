/**
 * External dependencies
 */
import {
	BlockDiv,
	Advanced,
	Typography,
	Alignment,
	EffectsAnimations,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

// The top & bottom lines share the same set of border styles, only the
// selector and the attribute prefix differ.
const addLineBorderStyles = ( selector, attrPrefix ) => {
	const versionAdded = '3.19.10'

	blockStyles.addBlockStyles( `${ attrPrefix }BorderStyle`, [ {
		selector,
		styleRule: 'borderStyle',
		attrName: `${ attrPrefix }BorderStyle`,
		key: `${ attrPrefix }BorderStyle`,
		versionAdded,
	} ] )

	blockStyles.addBlockStyles( `${ attrPrefix }BorderWidth`, [ {
		selector,
		styleRule: 'borderWidth',
		attrName: `${ attrPrefix }BorderWidth`,
		key: `${ attrPrefix }BorderWidth`,
		responsive: 'all',
		format: '%spx',
		versionAdded,
	} ] )

	blockStyles.addBlockStyles( `${ attrPrefix }BorderColor`, [ {
		selector,
		styleRule: 'borderColor',
		attrName: `${ attrPrefix }BorderColor`,
		key: `${ attrPrefix }BorderColor`,
		hover: 'all',
		versionAdded,
	} ] )

	// The FourRangeControl corner values map to: top -> top left, right -> top
	// right, bottom -> bottom left, left -> bottom right.
	const corners = [
		[ 'borderTopLeftRadius', 'top' ],
		[ 'borderTopRightRadius', 'right' ],
		[ 'borderBottomLeftRadius', 'bottom' ],
		[ 'borderBottomRightRadius', 'left' ],
	]

	blockStyles.addBlockStyles( `${ attrPrefix }BorderRadius`, corners.map( ( [ styleRule, corner ] ) => ( {
		selector,
		styleRule,
		attrName: `${ attrPrefix }BorderRadius`,
		key: `${ attrPrefix }-${ styleRule }`,
		responsive: 'all',
		format: '%spx',
		valuePreCallback: value => value?.[ corner ],
		versionAdded,
	} ) ) )
}

blockStyles.addBlockStyles( 'topLineHeight', [ {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'height',
	attrName: 'topLineHeight',
	key: 'topLineHeight',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'topLineWidth', [ {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'width',
	attrName: 'topLineWidth',
	key: 'topLineWidth',
	hasUnits: 'px',
	hover: 'all',
} ] )

blockStyles.addBlockStyles( 'topLineColor', [ {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'backgroundColor',
	attrName: 'topLineColor',
	key: 'topLineColor',
	hover: 'all',
} ] )

blockStyles.addBlockStyles( 'topLineMargin', [ {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'marginBottom',
	attrName: 'topLineMargin',
	key: 'topLineMargin',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'topLineAlign', [ {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'marginLeft',
	attrName: 'topLineAlign',
	key: 'topLineAlign-left',
	responsive: 'all',
	valueCallback: value => value === 'center' || value === 'right' ? 'auto' : '0',
}, {
	selector: '.lmn-block-heading__top-line',
	styleRule: 'marginRight',
	attrName: 'topLineAlign',
	key: 'topLineAlign',
	responsive: 'all',
	valueCallback: value => value === 'center' || value === 'left' ? 'auto' : '0',
} ] )

blockStyles.addBlockStyles( 'bottomLineHeight', [ {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'height',
	attrName: 'bottomLineHeight',
	key: 'bottomLineHeight',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'bottomLineWidth', [ {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'width',
	attrName: 'bottomLineWidth',
	key: 'bottomLineWidth',
	hasUnits: 'px',
	hover: 'all',
} ] )

blockStyles.addBlockStyles( 'bottomLineColor', [ {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'backgroundColor',
	attrName: 'bottomLineColor',
	key: 'bottomLineColor',
	hover: 'all',
} ] )

blockStyles.addBlockStyles( 'bottomLineMargin', [ {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'marginTop',
	attrName: 'bottomLineMargin',
	key: 'bottomLineMargin',
	responsive: 'all',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'bottomLineAlign', [ {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'marginLeft',
	attrName: 'bottomLineAlign',
	key: 'bottomLineAlign',
	responsive: 'all',
	valueCallback: value => value === 'center' || value === 'right' ? 'auto' : 0,
}, {
	selector: '.lmn-block-heading__bottom-line',
	styleRule: 'marginRight',
	attrName: 'bottomLineAlign',
	key: 'bottomLineAlign-right',
	responsive: 'all',
	valueCallback: value => value === 'center' || value === 'left' ? 'auto' : 0,
} ] )

addLineBorderStyles( '.lmn-block-heading__top-line', 'topLine' )
addLineBorderStyles( '.lmn-block-heading__bottom-line', 'bottomLine' )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-heading__text',
	hoverSelector: '.lmn-block-heading__text:hover',
} )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
