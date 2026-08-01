/**
 * External dependencies
 */
import {
	appendImportantAll,
	createButtonStyleSet,
	createTypographyStyles,
	whiteIfDark,
	createImageStyleSet,
	marginLeftAlign,
	marginRightAlign,
	appendImportant,
	createResponsiveStyles,
	createBorderStyleSet,
	__getValue,
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

	const {
		columnBackgroundColor = '',
		showImage = true,
		imageAlign = '',
		contentAlign = '',
		imageTabletAlign = '',
		tabletContentAlign = '',
		imageMobileAlign = '',
		mobileContentAlign = '',
	} = props.attributes

	const styles = []

	if ( show.columnBackground ) {
		styles.push( {
			'.lmb-pricing-box__item': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	if ( show.border ) {
		styles.push( {
			...createBorderStyleSet( 'column%s', '.lmb-pricing-box__item', props.attributes ),
		} )
	}

	// Column Background.
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'lmb-pricing-box__item', props.attributes, {
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
				'> .lmb-inner-block > .lmb-block-content > .lmb-pricing-box__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-pricing-box__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-pricing-box__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	// Image.
	if ( showImage ) {
		styles.push( {
			...createImageStyleSet( 'image%s', 'lmb-img', props.attributes, { inherit: false } ),
		} )

		styles.push( {
			'.lmb-img, .lmb-pricing-box__image': {
				marginLeft: imageAlign !== '' || contentAlign !== '' ? marginLeftAlign( imageAlign || contentAlign ) + ' !important' : undefined,
				marginRight: imageAlign !== '' || contentAlign !== '' ? marginRightAlign( imageAlign || contentAlign ) + ' !important' : undefined,
			},
			tablet: {
				'.lmb-img, .lmb-pricing-box__image': {
					marginLeft: imageTabletAlign !== '' || tabletContentAlign !== '' ? marginLeftAlign( imageTabletAlign || tabletContentAlign ) + ' !important' : undefined,
					marginRight: imageTabletAlign !== '' || tabletContentAlign !== '' ? marginRightAlign( imageTabletAlign || tabletContentAlign ) + ' !important' : undefined,
				},
			},
			mobile: {
				'.lmb-img, .lmb-pricing-box__image': {
					marginLeft: imageMobileAlign !== '' || mobileContentAlign !== '' ? marginLeftAlign( imageMobileAlign || mobileContentAlign ) + ' !important' : undefined,
					marginRight: imageMobileAlign !== '' || mobileContentAlign !== '' ? marginRightAlign( imageMobileAlign || mobileContentAlign ) + ' !important' : undefined,
				},
			},
		} )
	}

	// Title.
	const {
		titleColor = '',
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.lmb-pricing-box__title': {
				color: whiteIfDark( titleColor, show.columnBackground && columnBackgroundColor ),
			},
		} )

		styles.push( {
			'.lmb-pricing-box__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				textAlign: getValue( 'titleAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.lmb-pricing-box__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ) || getValue( 'tabletContentAlign' ),
				},
			},
			mobile: {
				'.lmb-pricing-box__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ) || getValue( 'mobileContentAlign' ),
				},
			},
		} )
	}

	// Price.
	const {
		priceColor = '',
		showPrice = true,
	} = props.attributes
	if ( showPrice ) {
		styles.push( {
			'.lmb-pricing-box__price, .lmb-pricing-box__price-prefix, .lmb-pricing-box__price-suffix': {
				color: whiteIfDark( priceColor, show.columnBackground && columnBackgroundColor ),
			},
		} )

		const align = getValue( 'priceAlign' ) || getValue( 'contentAlign' )
		const alignTablet = getValue( 'priceTabletAlign' ) || getValue( 'tabletContentAlign' )
		const alignMobile = getValue( 'priceMobileAlign' ) || getValue( 'mobileContentAlign' )
		styles.push( {
			'.lmb-pricing-box__price-line': {
				...createTypographyStyles( 'price%s', 'desktop', props.attributes ),
				justifyContent: appendImportant( align === 'center' ? 'center'
					: align === 'left' ? 'flex-start'
						: align === 'right' ? 'flex-end'
							: undefined ),
			},
			tablet: {
				'.lmb-pricing-box__price-line': {
					...createTypographyStyles( 'price%s', 'tablet', props.attributes ),
					justifyContent: appendImportant( alignTablet === 'center' ? 'center'
						: alignTablet === 'left' ? 'flex-start'
							: alignTablet === 'right' ? 'flex-end'
								: undefined ),
				},
			},
			mobile: {
				'.lmb-pricing-box__price-line': {
					...createTypographyStyles( 'price%s', 'mobile', props.attributes ),
					justifyContent: appendImportant( alignMobile === 'center' ? 'center'
						: alignMobile === 'left' ? 'flex-start'
							: alignMobile === 'right' ? 'flex-end'
								: undefined ),
				},
			},
		} )
	}

	// Price prefix.
	const {
		pricePrefixColor = '',
		showPricePrefix = true,
	} = props.attributes
	if ( showPrice && showPricePrefix ) {
		styles.push( {
			'.lmb-pricing-box__price-prefix': {
				color: pricePrefixColor ? pricePrefixColor : undefined,
				...createTypographyStyles( 'pricePrefix%s', 'desktop', props.attributes, { important: true } ),
			},
			tablet: {
				'.lmb-pricing-box__price-prefix': {
					...createTypographyStyles( 'pricePrefix%s', 'tablet', props.attributes, { important: true } ),
				},
			},
			mobile: {
				'.lmb-pricing-box__price-prefix': {
					...createTypographyStyles( 'pricePrefix%s', 'mobile', props.attributes, { important: true } ),
				},
			},
		} )
	}

	// Price suffix.
	const {
		priceSuffixColor = '',
		showPriceSuffix = true,
	} = props.attributes
	if ( showPrice && showPriceSuffix ) {
		styles.push( {
			'.lmb-pricing-box__price-suffix': {
				color: priceSuffixColor ? priceSuffixColor : undefined,
				...createTypographyStyles( 'priceSuffix%s', 'desktop', props.attributes, { important: true } ),
			},
			tablet: {
				'.lmb-pricing-box__price-suffix': {
					...createTypographyStyles( 'priceSuffix%s', 'tablet', props.attributes, { important: true } ),
				},
			},
			mobile: {
				'.lmb-pricing-box__price-suffix': {
					...createTypographyStyles( 'priceSuffix%s', 'mobile', props.attributes, { important: true } ),
				},
			},
		} )
	}

	// Sub Price.
	const {
		subPriceColor = '',
		showSubPrice = true,
	} = props.attributes
	if ( showSubPrice ) {
		styles.push( {
			'.lmb-pricing-box__subprice': {
				color: appendImportant( whiteIfDark( subPriceColor, show.columnBackground && columnBackgroundColor ) ),
			},
		} )

		styles.push( {
			'.lmb-pricing-box__subprice': {
				...createTypographyStyles( 'subPrice%s', 'desktop', props.attributes, { important: true } ),
				textAlign: getValue( 'subPriceAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.lmb-pricing-box__subprice': {
					...createTypographyStyles( 'subPrice%s', 'tablet', props.attributes, { important: true } ),
					textAlign: getValue( 'subPriceTabletAlign' ) || getValue( 'tabletContentAlign' ),
				},
			},
			mobile: {
				'.lmb-pricing-box__subprice': {
					...createTypographyStyles( 'subPrice%s', 'mobile', props.attributes, { important: true } ),
					textAlign: getValue( 'subPriceMobileAlign' ) || getValue( 'mobileContentAlign' ),
				},
			},
		} )
	}

	// Button.
	const {
		showButton = true,
	} = props.attributes
	if ( showButton ) {
		styles.push( {
			...createButtonStyleSet( `button%s`, `lmb-button`, props.attributes ),
		} )
		styles.push( {
			'.lmb-button-container': {
				textAlign: appendImportant( getValue( 'buttonAlign' ) || getValue( 'contentAlign' ) ),
			},
			tablet: {
				'.lmb-button-container': {
					textAlign: appendImportant( getValue( 'buttonTabletAlign' ) || getValue( 'tabletContentAlign' ) ),
				},
			},
			mobile: {
				'.lmb-button-container': {
					textAlign: appendImportant( getValue( 'buttonMobileAlign' ) || getValue( 'mobileContentAlign' ) ),
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
		styles.push( {
			'.lmb-pricing-box__description': {
				...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
				color: whiteIfDark( descriptionColor, show.columnBackground && columnBackgroundColor ),
				textAlign: appendImportant( getValue( 'descriptionAlign' ) || getValue( 'contentAlign' ) ),
			},
			tablet: {
				'.lmb-pricing-box__description': {
					...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
					textAlign: appendImportant( getValue( 'descriptionTabletAlign' ) || getValue( 'tabletContentAlign' ) ),
				},
			},
			mobile: {
				'.lmb-pricing-box__description': {
					...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
					textAlign: appendImportant( getValue( 'descriptionMobileAlign' ) || getValue( 'mobileContentAlign' ) ),
				},
			},
		} )
	}

	// Spacing.
	if ( show.imageSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__image', 'image%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.titleSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.priceSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__price-wrapper', 'price%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.subPriceSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__subprice', 'subPrice%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.buttonSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__button', 'button%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.descriptionSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-pricing-box__description', 'description%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	return deepmerge.all( styles )
}

export default createStyles
