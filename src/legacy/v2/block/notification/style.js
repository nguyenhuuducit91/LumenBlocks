/**
 * External dependencies
 */
import {
	appendImportantAll,
	createTypographyStyles,
	marginLeftAlign,
	marginRightAlign,
	whiteIfDarkBlackIfLight,
	createButtonStyleSet,
	createResponsiveStyles,
	appendImportant,
	__getValue,
	createIconStyleSet,
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

const NOTIFY_TEXT_COLORS = {
	success: '#ffffff',
	error: '#ffffff',
	info: '#ffffff',
	warning: '#424242',
}

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	const {
		contentAlign = '',
		tabletContentAlign = '',
		mobileContentAlign = '',
		notifType,
		design = 'basic',
		columnBackgroundColor = '',
	} = props.attributes

	const show = showOptions( props )

	// General.
	styles.push( {
		'.lmb-notification__item': {
			borderRadius: design !== 'plain' ? getValue( 'borderRadius', '%spx !important' ) : undefined,
		},
	} )

	// Column Background.
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'lmb-notification__item', props.attributes, {
			importantBackgroundColor: true,
		} ) : {} ),
	} )

	// Container
	const {
		columnPaddingUnit = 'px',
		tabletColumnPaddingUnit = 'px',
		mobileColumnPaddingUnit = 'px',
	} = props.attributes
	styles.push( {
		saveOnly: {
			desktopTablet: {
				'> .lmb-inner-block > .lmb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > *': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
		editor: {
			desktopTablet: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-notification__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-notification__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-notification__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	if ( show.containerBorder ) {
		styles.push( {
			...createBorderStyleSet( 'container%s', '.lmb-notification__item', props.attributes ),
		} )
	}

	// Dismissible.
	const {
		dismissible = false,
		dismissibleIconSize = '',
		dismissibleIconTabletSize = '',
		dismissibleIconMobileSize = '',
		dismissibleIconColor = '',
	} = props.attributes
	if ( dismissible ) {
		styles.push( {
			'.lmb-notification__item': {
				paddingRight: dismissibleIconSize && dismissibleIconSize > 40 ? '100px !important' : undefined,
			},
			'.lmb-notification__close-button svg': {
				fill: dismissibleIconColor ? `${ dismissibleIconColor } !important` : undefined,
			},
			desktopTablet: {
				'.lmb-notification__close-button': {
					width: dismissibleIconSize ? `${ dismissibleIconSize }px` : undefined,
					height: dismissibleIconSize ? `${ dismissibleIconSize }px` : undefined,
				},
			},
			tabletOnly: {
				'.lmb-notification__close-button': {
					width: dismissibleIconTabletSize ? `${ dismissibleIconTabletSize }px` : undefined,
					height: dismissibleIconTabletSize ? `${ dismissibleIconTabletSize }px` : undefined,
				},
			},
			mobile: {
				'.lmb-notification__close-button': {
					width: dismissibleIconMobileSize ? `${ dismissibleIconMobileSize }px` : undefined,
					height: dismissibleIconMobileSize ? `${ dismissibleIconMobileSize }px` : undefined,
				},
			},
		} )
	}

	// Icon.
	const {
		showIcon = false,
		iconColor = '',
		iconAlign = '',
		iconTabletAlign = '',
		iconMobileAlign = '',
	} = props.attributes
	if ( showIcon ) {
		const color = whiteIfDarkBlackIfLight( iconColor, show.columnBackground && columnBackgroundColor )
		styles.push( {
			'.lmb-notification__icon svg:not(.lmb-custom-icon)': {
				color: color ? `${ color } !important` : undefined,
			},
			'.lmb-notification__icon': {
				marginLeft: iconAlign !== '' || contentAlign !== '' ? appendImportant( marginLeftAlign( iconAlign || contentAlign ) ) : undefined,
				marginRight: iconAlign !== '' || contentAlign !== '' ? appendImportant( marginRightAlign( iconAlign || contentAlign ) ) : undefined,
				height: getValue( 'iconSize', '%spx !important' ),
				width: getValue( 'iconSize', '%spx !important' ),
			},
			tablet: {
				'.lmb-notification__icon': {
					marginLeft: iconTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginLeftAlign( iconTabletAlign || tabletContentAlign ) ) : undefined,
					marginRight: iconTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginRightAlign( iconTabletAlign || tabletContentAlign ) ) : undefined,
					height: getValue( 'iconTabletSize', '%spx !important' ),
					width: getValue( 'iconTabletSize', '%spx !important' ),
				},
			},
			mobile: {
				'.lmb-notification__icon': {
					marginLeft: iconMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginLeftAlign( iconMobileAlign || mobileContentAlign ) ) : undefined,
					marginRight: iconMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginRightAlign( iconMobileAlign || mobileContentAlign ) ) : undefined,
					height: getValue( 'iconMobileSize', '%spx !important' ),
					width: getValue( 'iconMobileSize', '%spx !important' ),
				},
			},
		} )
		styles.push( { ...createIconStyleSet( 'icon%s', 'lmb-notification__icon', props.attributes ) } )
	}

	// Title.
	const {
		titleColor = '',
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		const color = whiteIfDarkBlackIfLight( titleColor, show.columnBackground && columnBackgroundColor )
		styles.push( {
			'.lmb-notification__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes, { importantSize: true } ),
				color: color ? `${ color } !important` : undefined,
				textAlign: getValue( 'titleAlign', '%s !important' ),
			},
			tablet: {
				'.lmb-notification__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'titleTabletAlign', '%s !important' ),
				},
			},
			mobile: {
				'.lmb-notification__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'titleMobileAlign', '%s !important' ),
				},
			},
		} )
	}

	// Description.
	const {
		descriptionColor = '',
		showDescription = true,
	} = props.attributes
	if ( showDescription ) {
		const color = whiteIfDarkBlackIfLight( descriptionColor, show.columnBackground && columnBackgroundColor )
		styles.push( {
			'.lmb-notification__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				color: color ? `${ color } !important` : undefined,
				textAlign: getValue( 'descriptionAlign', '%s !important' ),
			},
			tablet: {
				'.lmb-notification__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: getValue( 'descriptionTabletAlign', '%s !important' ),
				},
			},
			mobile: {
				'.lmb-notification__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: getValue( 'descriptionMobileAlign', '%s !important' ),
				},
			},
		} )
	}

	// Button.
	const {
		showButton = false,
		buttonDesign = 'ghost',
		buttonBackgroundColor = '',
	} = props.attributes
	if ( showButton ) {
		styles.push( {
			...createButtonStyleSet( 'button%s', 'lmb-button', props.attributes ),
		} )

		// Default button color.
		// if ( ! show.columnBackground || ! columnBackgroundColor ) {
		if ( ! buttonBackgroundColor && show.columnBackground ) {
			const color = columnBackgroundColor ? whiteIfDarkBlackIfLight( buttonBackgroundColor, columnBackgroundColor, '#ffffff', '#424242' )
				: design === 'bordered' ? '#424242'
					: NOTIFY_TEXT_COLORS[ notifType ]
			const colorOpposite = ! color ? undefined : ( color === '#ffffff' ? '#424242' : '#ffffff' )
			if ( buttonDesign === 'basic' || buttonDesign === '' ) {
				styles.push( {
					[ `.lmb-button` ]: {
						backgroundColor: color ? color : undefined,
					},
					[ `.lmb-button .lmb-button--inner, .lmb-button.lmb-button--has-icon.lmb-button--has-icon svg` ]: {
						color: colorOpposite ? colorOpposite : undefined,
					},
					[ `.lmb-button:hover .lmb-button--inner, .lmb-button:hover svg` ]: {
						color: colorOpposite ? colorOpposite : undefined,
					},
				} )
			} else {
				styles.push( {
					[ `.lmb-button` ]: {
						borderColor: color ? color : undefined,
					},
					[ `.lmb-button .lmb-button--inner, .lmb-button.lmb-button--has-icon.lmb-button--has-icon svg` ]: {
						color: color ? color : undefined,
					},
					[ `.lmb-button:hover .lmb-button--inner, .lmb-button:hover svg` ]: {
						color: color ? color : undefined,
					},
				} )
			}
		}
		// } else if ( ! buttonBackgroundColor && ( design === 'basic' || design === 'large-icon' ) ) {
		// 	const color = whiteIfDarkBlackIfLight( buttonBackgroundColor, show.columnBackground && columnBackgroundColor, '#ffffff', '#424242' )
		// 	const colorOpposite = whiteIfDarkBlackIfLight( buttonBackgroundColor, show.columnBackground && columnBackgroundColor, '#424242', '#ffffff' )
		// 	if ( buttonDesign === 'basic' || buttonDesign === '' ) {
		// 		styles.push( {
		// 			[ `.lmb-button` ]: {
		// 				backgroundColor: color ? color : undefined,
		// 			},
		// 			[ `.lmb-button .lmb-button--inner, .lmb-button.lmb-button--has-icon.lmb-button--has-icon svg` ]: {
		// 				color: colorOpposite ? colorOpposite : undefined,
		// 			},
		// 			[ `.lmb-button:hover .lmb-button--inner, .lmb-button:hover svg` ]: {
		// 				color: colorOpposite ? colorOpposite : undefined,
		// 			},
		// 		} )
		// 	} else {
		// 		styles.push( {
		// 			[ `.lmb-button` ]: {
		// 				borderColor: color ? color : undefined,
		// 			},
		// 			[ `.lmb-button .lmb-button--inner, .lmb-button.lmb-button--has-icon.lmb-button--has-icon svg` ]: {
		// 				color: color ? color : undefined,
		// 			},
		// 			[ `.lmb-button:hover .lmb-button--inner, .lmb-button:hover svg` ]: {
		// 				color: color ? color : undefined,
		// 			},
		// 		} )
		// 	}
		// }

		styles.push( {
			'.lmb-button-container': {
				textAlign: getValue( 'buttonAlign', '%s !important' ),
			},
			tablet: {
				'.lmb-button-container': {
					textAlign: getValue( 'buttonTabletAlign', '%s !important' ),
				},
			},
			mobile: {
				'.lmb-button-container': {
					textAlign: getValue( 'buttonMobileAlign', '%s !important' ),
				},
			},
		} )
	}

	// Spacing.
	if ( show.iconSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-notification__icon', 'icon%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.titleSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-notification__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.descriptionSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-notification__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.buttonSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-button-container', 'button%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	// return deepmerge.all( applyFilters( 'lumen.notification.styles', styles, props, show ) )
	return deepmerge.all( styles )
}

export default createStyles
