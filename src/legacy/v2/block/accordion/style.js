/**
 * External dependencies
 */
import {
	createResponsiveStyles,
	createTypographyStyles,
	whiteIfDark,
	appendImportant,
	__getValue,
	createBorderStyleSet,
} from '~lumen/utils'
import {
	createBackgroundStyleSet,
} from '../../util'
import deepmerge from 'deepmerge'

/**
 * Internal dependencies
 */
import { showOptions } from './util'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const {
		design = 'basic',
		reverseArrow = false,
	} = props.attributes

	const show = showOptions( props )

	const styles = []

	styles.push( {
		'.lmb-accordion__heading': {
			flexDirection: reverseArrow ? 'row-reverse' : undefined,
		},
	} )

	if ( show.borderRadius && design === 'basic' ) {
		styles.push( {
			'.lmb-accordion__heading': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	// Column Background.
	const columnBackgroundOptions = {
		importantBackgroundColor: true,
	}
	styles.push( {
		...( show.headerBackground ? createBackgroundStyleSet( 'container%s', 'lmb-accordion__heading', props.attributes, columnBackgroundOptions ) : {} ),
	} )

	// Container Border.
	if ( show.containerBorder ) {
		if ( design === 'basic' ) {
			styles.push( {
				...createBorderStyleSet( 'container%s', '.lmb-accordion__heading', props.attributes ),
			} )
		} else if ( design === 'line-colored' ) {
			styles.push( {
				...createBorderStyleSet( 'container%s', '.lmb-accordion.lmb-accordion--design-line-colored.lmb-accordion--open .lmb-accordion__item', props.attributes ),
			} )
		} else {
			styles.push( {
				...createBorderStyleSet( 'container%s', '.lmb-accordion__item', props.attributes ),
			} )
		}
	}

	// Title.
	const {
		titleColor = '',
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.lmb-accordion__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes, { importantSize: true } ),
				textAlign: getValue( 'titleAlign', '%s !important' ),
			},
			tablet: {
				'.lmb-accordion__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'titleTabletAlign', '%s !important' ),
				},
			},
			mobile: {
				'.lmb-accordion__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'titleMobileAlign', '%s !important' ),
				},
			},
		} )
	}

	const {
		containerBackgroundColor = '',
	} = props.attributes
	if ( design === 'basic' || design === 'plain' ) {
		styles.push( {
			'.lmb-accordion__title': {
				color: whiteIfDark( titleColor, show.headerBackground && containerBackgroundColor ),
			},
		} )
	}

	// Arrow.
	const {
		showArrow = true,
		arrowColor = '',
	} = props.attributes
	if ( showArrow ) {
		styles.push( {
			'.lmb-accordion__arrow': {
				width: appendImportant( getValue( 'arrowSize', '%spx' ) ),
				height: appendImportant( getValue( 'arrowSize', '%spx' ) ),
			},
		} )
	}
	if ( showArrow && ( design === 'basic' || design === 'plain' ) ) {
		styles.push( {
			'.lmb-accordion__arrow': {
				fill: whiteIfDark( arrowColor, show.headerBackground && containerBackgroundColor ),
			},
		} )
	}

	// Border.
	const {
		showBorder = true,
	} = props.attributes
	if ( show.border && ! showBorder ) {
		styles.push( {
			'.lmb-accordion__item': {
				border: 'none !important',
			},
		} )
	}
	if ( show.border && showBorder ) {
		styles.push( {
			'.lmb-accordion__item': {
				borderWidth: appendImportant( getValue( 'borderSize', '%spx' ) ),
				borderColor: appendImportant( getValue( 'borderColor' ) ),
			},
		} )
	}

	// Spacing.
	if ( show.headerBackground ) {
		styles.push( {
			'.lmb-accordion__heading': {
				paddingTop: appendImportant( getValue( 'containerPaddingTop', '%spx' ) ),
				paddingRight: appendImportant( getValue( 'containerPaddingRight', '%spx' ) ),
				paddingBottom: appendImportant( getValue( 'containerPaddingBottom', '%spx' ) ),
				paddingLeft: appendImportant( getValue( 'containerPaddingLeft', '%spx' ) ),
			},
		} )
	}
	if ( show.titleSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-accordion.lmb-accordion--open .lmb-accordion__heading', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	return deepmerge.all( styles )
}

export default createStyles
