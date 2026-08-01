/**
 * Internal dependencies
 */
import FontAwesomeIcon from '../font-awesome-icon'
import { getShapeSVG } from '~lumen/utils'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

const wrapBackgroundShape = ( icon, shape ) => {
	const ShapeComp = getShapeSVG( shape || 'blob1' )
	if ( ! ShapeComp ) {
		return icon
	}

	return (
		<div className="lmb-icon__bg-shape-wrapper">
			{ icon }
			<ShapeComp className="lmb-icon__bg-shape" />
		</div>
	)
}

/**
 * Extracts the first SVG tag it could find in an HTML string.
 *
 * @param {string} _htmlString String to extract the svg.
 */
const extractSvg = _htmlString => {
	const htmlString = applyFilters( 'lumen.svg-icon.extract-svg', _htmlString )
	if ( htmlString.match( /^<svg(.*?)<\/svg>$/g ) ) {
		return htmlString
	} else if ( htmlString.match( /<svg/ ) ) {
		return ( htmlString.match( /<svg.*?<\/svg>/g ) || [ htmlString ] )[ 0 ]
	}
	return htmlString
}

const SvgIcon = props => {
	const propsToPass = {
		...props,
		value: typeof props.value === 'string' ? extractSvg( props.value ) : props.value,
	}

	const classNames = classnames( [
		'lmb-icon-inner-svg',
		props.className,
	], {
		[ `lmb-icon--${ props.colorType }` ]: props.colorType && props.colorType !== 'single',
	} )

	let ret = (
		<FontAwesomeIcon { ...propsToPass } className={ classNames } />
	)

	if ( props.design === 'shaped' || props.design === 'outlined' ) {
		const wrapperClasses = classnames( [
			'lmb-icon__design-wrapper',
			`lmb-icon__design-${ props.design }`,
		], {
			[ `lmb--shadow-${ props.shadow }` ]: props.shadow && props.design === 'shaped',
		} )
		ret = <div className={ wrapperClasses } >{ ret }</div>
	}

	if ( props.showBackgroundShape ) {
		ret = wrapBackgroundShape( ret, props.backgroundShape )
	}

	ret = applyFilters( 'lumen.component.svg-icon', ret, propsToPass )

	return ret
}

SvgIcon.defaultProps = {
	className: '',

	value: '', // The icon name or icon SVG.
	design: '', // Can be plain, shaped or outlined

	colorType: '', // Blank/single, gradient or multicolor.

	// Show background shape.
	showBackgroundShape: false,
	backgroundShape: '', // An SVG to add as a background
	shadow: '', // For shaped only

	// The icon has a gradient color.
	gradientColor1: '',
	gradientColor2: '',
	gradientDirection: 0, // Only supports every 45 degrees.
}

SvgIcon.Content = props => {
	const propsToPass = {
		...props,
		value: typeof props.value === 'string' ? extractSvg( props.value ) : props.value,
	}

	const classNames = classnames( [
		'lmb-icon-inner-svg',
		props.className,
	], {
		[ `lmb-icon--${ props.colorType }` ]: props.colorType && props.colorType !== 'single',
	} )

	let ret = <FontAwesomeIcon.Content { ...propsToPass } className={ classNames } />

	if ( props.design === 'shaped' || props.design === 'outlined' ) {
		const wrapperClasses = classnames( [
			'lmb-icon__design-wrapper',
			`lmb-icon__design-${ props.design }`,
		], {
			[ `lmb--shadow-${ props.shadow }` ]: props.shadow && props.design === 'shaped',
		} )
		ret = <div className={ wrapperClasses } >{ ret }</div>
	}

	if ( props.showBackgroundShape ) {
		ret = wrapBackgroundShape( ret, props.backgroundShape )
	}

	ret = applyFilters( 'lumen.component.svg-icon', ret, propsToPass )

	return ret
}

SvgIcon.Content.defaultProps = {
	...SvgIcon.defaultProps,
}

export default SvgIcon
