/**
 * External dependencies
 */
import {
	appendImportantAll,
	createResponsiveStyles,
	createTypographyStyles,
	whiteIfDark,
	appendImportant,
	__getValue,
	marginLeftAlign,
	marginRightAlign,
	createIconStyleSet,
	createBorderStyleSet,
} from '~lumen/utils'
import {
	createBackgroundStyleSet,
} from '../../util'

/**
 * Internal dependencies
 */
import { showOptions } from './util'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const show = showOptions( props )

	const styles = []
	styles.push( {
		'.lmb-countup__icon, .lmb-countup__counter, .lmb-countup__title, .lmb-countup__description': {
			textAlign: getValue( 'contentAlign' ),
		},
		tablet: {
			'.lmb-countup__icon, .lmb-countup__counter, .lmb-countup__title, .lmb-countup__description': {
				textAlign: getValue( 'tabletContentAlign' ),
			},
		},
		mobile: {
			'.lmb-countup__icon, .lmb-countup__counter, .lmb-countup__title, .lmb-countup__description': {
				textAlign: getValue( 'mobileContentAlign' ),
			},
		},
	} )

	if ( show.columnBackground ) {
		styles.push( {
			'.lmb-countup__item': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	if ( show.border ) {
		styles.push( {
			...createBorderStyleSet( 'column%s', '.lmb-countup__item', props.attributes ),
		} )
	}

	// Column Background.
	const columnBackgroundOptions = {
		importantBackgroundColor: true,
	}
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'lmb-countup__item', props.attributes, columnBackgroundOptions ) : {} ),
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
				'> .lmb-inner-block > .lmb-block-content > .lmb-countup__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-countup__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-countup__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	// Spacing.
	const {
		showIcon = false,
		showNumber = true,
		showTitle = true,
		showDescription = true,
	} = props.attributes
	if ( showIcon ) {
		styles.push( ...createResponsiveStyles( '.lmb-countup__icon', 'icon%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( showNumber ) {
		styles.push( ...createResponsiveStyles( '.lmb-countup__counter', 'number%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( showTitle ) {
		styles.push( ...createResponsiveStyles( '.lmb-countup__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( showDescription ) {
		styles.push( ...createResponsiveStyles( '.lmb-countup__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	// Icon
	const {
		columnBackgroundColor = '',
		showBlockBackground = false,
		blockBackgroundBackgroundColor = '',
		iconAlign = '',
		contentAlign = '',
		iconTabletAlign = '',
		tabletContentAlign = '',
		iconMobileAlign = '',
		mobileContentAlign = '',
	} = props.attributes
	if ( showIcon ) {
		styles.push( {
			'.lmb-countup__icon svg:not(.lmb-custom-icon)': {
				color: whiteIfDark( getValue( 'iconColor' ), show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
			},
			'.lmb-countup__icon': {
				marginLeft: iconAlign !== '' || contentAlign !== '' ? appendImportant( marginLeftAlign( iconAlign || contentAlign ) ) : undefined,
				marginRight: iconAlign !== '' || contentAlign !== '' ? appendImportant( marginRightAlign( iconAlign || contentAlign ) ) : undefined,
			},
			tablet: {
				'.lmb-countup__icon': {
					marginLeft: iconTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginLeftAlign( iconTabletAlign || tabletContentAlign ) ) : undefined,
					marginRight: iconTabletAlign !== '' || tabletContentAlign !== '' ? appendImportant( marginRightAlign( iconTabletAlign || tabletContentAlign ) ) : undefined,
				},
			},
			mobile: {
				'.lmb-countup__icon': {
					marginLeft: iconMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginLeftAlign( iconMobileAlign || mobileContentAlign ) ) : undefined,
					marginRight: iconMobileAlign !== '' || mobileContentAlign !== '' ? appendImportant( marginRightAlign( iconMobileAlign || mobileContentAlign ) ) : undefined,
				},
			},
		} )
		styles.push( { ...createIconStyleSet( 'icon%s', 'lmb-countup__icon', props.attributes ) } )
	}

	// Title.
	const {
		titleColor = '',
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.lmb-countup__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				color: whiteIfDark( titleColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'titleAlign' ),
			},
			tablet: {
				'.lmb-countup__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-countup__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ),
				},
			},
		} )
	}

	// Number.
	const {
		numberColor = '',
	} = props.attributes
	if ( showNumber ) {
		styles.push( {
			'.lmb-countup__counter': {
				...createTypographyStyles( 'number%s', 'desktop', props.attributes, { importantSize: true } ),
				color: whiteIfDark( numberColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'numberAlign' ),
			},
			tablet: {
				'.lmb-countup__counter': {
					...createTypographyStyles( 'number%s', 'tablet', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'numberTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-countup__counter': {
					...createTypographyStyles( 'number%s', 'mobile', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'numberMobileAlign' ),
				},
			},
		} )
	}

	// Description.
	const {
		descriptionColor = '',
	} = props.attributes
	if ( showDescription ) {
		styles.push( {
			'.lmb-countup__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				color: whiteIfDark( descriptionColor, show.columnBackground ? columnBackgroundColor : ( showBlockBackground ? blockBackgroundBackgroundColor : '' ) ),
				textAlign: getValue( 'descriptionAlign' ),
			},
			tablet: {
				'.lmb-countup__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: getValue( 'descriptionTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-countup__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: getValue( 'descriptionMobileAlign' ),
				},
			},
		} )
	}

	return deepmerge.all( styles )
	// return {
	// 	'.lmb-icon-list li': {
	// 		...createTypographyStyles( 'listText%s', 'desktop', props.attributes ),
	// 		color: whiteIfDark( listTextColor, showBlockBackground && blockBackgroundBackgroundColor ),
	// 		'--icon': 'url(\'data:image/svg+xml;base64,' + iconSVGString + '\')',
	// 		'--icon-size': iconSize ? `${ iconSize }px` : undefined,
	// 		'--gap': gap ? `${ gap }px` : undefined,
	// 	},
	// }
}

export default createStyles
