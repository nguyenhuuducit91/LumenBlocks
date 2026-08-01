/**
 * External dependencies
 */
import { appendImportant, __getValue } from '~lumen/utils'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )
	const {
		backgroundColor = '',
		layer1Color = '',
		layer1Width = 1,
		layer1Flip = false,

		marginTop = 0,
		marginBottom = 0,
		marginUnit = 'px',
		tabletMarginTop = '',
		tabletMarginBottom = '',
		tabletMarginUnit = 'px',
		mobileMarginTop = '',
		mobileMarginBottom = '',
		mobileMarginUnit = 'px',

		paddingTop = 0,
		paddingBottom = 0,
		paddingUnit = 'px',
		tabletPaddingTop = '',
		tabletPaddingBottom = '',
		tabletPaddingUnit = 'px',
		mobilePaddingTop = '',
		mobilePaddingBottom = '',
		mobilePaddingUnit = 'px',
	} = props.attributes

	const isEditing = typeof props.mergeBlocks !== 'undefined'

	return {
		'.lmb-separator': {
			backgroundColor: backgroundColor ? backgroundColor : undefined,
			// -1 to prevent white lines.
			// -14 during editing only.
			marginTop: `${ marginTop - 1 + ( isEditing ? -14 : 0 ) }${ marginUnit } !important`,
			marginBottom: `${ marginBottom - 1 + ( isEditing ? -14 : 0 ) }${ marginUnit } !important`,
		},
		'.lmb-separator__bottom-pad': {
			height: appendImportant( paddingBottom !== '' ? `${ paddingBottom }${ paddingUnit }` : undefined ),
			background: layer1Color ? layer1Color : undefined,
		},
		'.lmb-separator__top-pad': {
			height: appendImportant( paddingTop !== '' ? `${ paddingTop }${ paddingUnit }` : undefined ),
			background: backgroundColor ? backgroundColor : undefined,
		},
		'.lmb-separator__shadow, .lmb-separator__layer-1': {
			fill: layer1Color ? layer1Color : undefined,
			transform: ( () => {
				let transform = layer1Width ? `scaleX(${ layer1Width })` : undefined
				if ( layer1Flip ) {
					transform = transform ? `${ transform } scaleX(-1)` : 'scaleX(-1)'
				}
				return transform
			} )(),
		},
		desktopTablet: {
			'.lmb-separator__svg-wrapper': {
				height: appendImportant( getValue( 'height', '%spx' ) ),
			},
		},
		tabletOnly: {
			'.lmb-separator__svg-wrapper': {
				height: appendImportant( getValue( 'tabletHeight', '%spx' ) ),
			},
		},
		tablet: {
			'.lmb-separator': {
				marginTop: `${ tabletMarginTop - 1 }${ tabletMarginUnit } !important`, // -1 to prevent white lines.
				marginBottom: `${ tabletMarginBottom - 1 }${ tabletMarginUnit } !important`, // -1 to prevent white lines.
			},
			'.lmb-separator__bottom-pad': {
				height: appendImportant( tabletPaddingBottom !== '' ? `${ tabletPaddingBottom }${ tabletPaddingUnit }` : undefined ),
			},
			'.lmb-separator__top-pad': {
				height: appendImportant( tabletPaddingTop !== '' ? `${ tabletPaddingTop }${ tabletPaddingUnit }` : undefined ),
			},
		},
		mobile: {
			'.lmb-separator__svg-wrapper': {
				height: appendImportant( getValue( 'mobileHeight', '%spx' ) ),
			},
			'.lmb-separator': {
				marginTop: `${ mobileMarginTop - 1 }${ mobileMarginUnit } !important`, // -1 to prevent white lines.
				marginBottom: `${ mobileMarginBottom - 1 }${ mobileMarginUnit } !important`, // -1 to prevent white lines.
			},
			'.lmb-separator__bottom-pad': {
				height: appendImportant( mobilePaddingBottom !== '' ? `${ mobilePaddingBottom }${ mobilePaddingUnit }` : undefined ),
			},
			'.lmb-separator__top-pad': {
				height: appendImportant( mobilePaddingTop !== '' ? `${ mobilePaddingTop }${ mobilePaddingUnit }` : undefined ),
			},
		},
	}
}

export default createStyles
