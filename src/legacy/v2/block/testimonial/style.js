/**
 * External dependencies
 */
import {
	appendImportantAll,
	createTypographyStyles,
	createImageStyleSet,
	marginLeftAlign,
	marginRightAlign,
	appendImportant,
	createResponsiveStyles,
	createBorderStyleSet,
	whiteIfDarkBlackIfLight,
	__getValue,
} from '~lumen/utils'
import {
	createBackgroundStyleSet,
} from '../../util'
import { range } from 'lodash'

/**
 * Internal dependencies
 */
import { showOptions } from './util'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const show = showOptions( props )

	const {
		design = 'basic',
		columns = 3,
		columnBackgroundColor = '',
		showImage = true,
		imageAlign = '',
		contentAlign = '',
		imageTabletAlign = '',
		mobileTabletAlign = '',
		imageMobileAlign = '',
		mobileContentAlign = '',
	} = props.attributes

	const styles = []

	if ( show.borderRadius ) {
		styles.push( {
			'.lmb-testimonial__item': {
				borderRadius: getValue( 'borderRadius', '%spx !important' ),
			},
		} )
	}

	if ( show.border ) {
		styles.push( {
			...createBorderStyleSet( 'column%s', '.lmb-testimonial__item', props.attributes ),
		} )
	}

	// Column Background.
	styles.push( {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'lmb-testimonial__item', props.attributes, {
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
				'> .lmb-inner-block > .lmb-block-content > .lmb-testimonial__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-testimonial__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-testimonial__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	// Testimonial.
	const {
		testimonialColor = '',
		showTestimonial = true,
	} = props.attributes
	if ( showTestimonial ) {
		styles.push( {
			'.lmb-testimonial__body': {
				...createTypographyStyles( 'testimonial%s', 'desktop', props.attributes, { important: true } ),
				color: appendImportant( whiteIfDarkBlackIfLight( testimonialColor, ( show.columnBackground || design === 'background' ) && columnBackgroundColor ) ),
				textAlign: appendImportant( getValue( 'testimonialAlign' ) || getValue( 'contentAlign' ) ),
			},
			tablet: {
				'.lmb-testimonial__body': {
					...createTypographyStyles( 'testimonial%s', 'tablet', props.attributes, { important: true } ),
					textAlign: appendImportant( getValue( 'testimonialTabletAlign' ) || getValue( 'mobileTabletAlign' ) ),
				},
			},
			mobile: {
				'.lmb-testimonial__body': {
					...createTypographyStyles( 'testimonial%s', 'mobile', props.attributes, { important: true } ),
					textAlign: appendImportant( getValue( 'testimonialMobileAlign' ) || getValue( 'mobileContentAlign' ) ),
				},
			},
		} )
	}

	// Image.
	if ( ! show.imageAsBackground && showImage ) {
		styles.push( {
			...createImageStyleSet( 'image%s', 'lmb-img', props.attributes, { inherit: false } ),
		} )

		styles.push( {
			desktopTablet: {
				[ `.lmb-testimonial__image` ]: {
					width: appendImportant( getValue( 'imageWidth', '%spx' ) ),
				},
			}, tabletOnly: {
				[ `.lmb-testimonial__image` ]: {
					width: appendImportant( getValue( 'imageTabletWidth', '%spx' ) ),
				},
			}, mobile: {
				[ `.lmb-testimonial__image` ]: {
					width: appendImportant( getValue( 'imageMobileWidth', '%spx' ) ),
				},
			},
		} )

		styles.push( {
			'.lmb-img, .lmb-testimonial__image': {
				marginLeft: imageAlign !== '' || contentAlign !== '' ? marginLeftAlign( imageAlign || contentAlign ) + ' !important' : undefined,
				marginRight: imageAlign !== '' || contentAlign !== '' ? marginRightAlign( imageAlign || contentAlign ) + ' !important' : undefined,
			},
			tablet: {
				'.lmb-img, .lmb-testimonial__image': {
					marginLeft: imageTabletAlign !== '' || mobileTabletAlign !== '' ? marginLeftAlign( imageTabletAlign || mobileTabletAlign ) + ' !important' : undefined,
					marginRight: imageTabletAlign !== '' || mobileTabletAlign !== '' ? marginRightAlign( imageTabletAlign || mobileTabletAlign ) + ' !important' : undefined,
				},
			},
			mobile: {
				'.lmb-img, .lmb-testimonial__image': {
					marginLeft: imageMobileAlign !== '' || mobileContentAlign !== '' ? marginLeftAlign( imageMobileAlign || mobileContentAlign ) + ' !important' : undefined,
					marginRight: imageMobileAlign !== '' || mobileContentAlign !== '' ? marginRightAlign( imageMobileAlign || mobileContentAlign ) + ' !important' : undefined,
				},
			},
		} )
	} else if ( showImage ) {
		range( 1, columns + 1 ).forEach( i => {
			styles.push( {
				[ `.lmb-testimonial__item.lmb-testimonial__item${ i } .lmb-testimonial__image` ]: {
					backgroundImage: getValue( `image${ i }Url`, 'url(%s)' ),
				},
			} )
		} )
	}

	// Name.
	const {
		nameColor = '',
		showName = true,
	} = props.attributes
	if ( showName ) {
		styles.push( {
			'.lmb-testimonial__name': {
				...createTypographyStyles( 'name%s', 'desktop', props.attributes ),
				color: appendImportant( whiteIfDarkBlackIfLight( nameColor, ( show.columnBackground || design === 'background' ) && columnBackgroundColor ) ),
				textAlign: getValue( 'nameAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.lmb-testimonial__name': {
					...createTypographyStyles( 'name%s', 'tablet', props.attributes ),
					textAlign: getValue( 'nameTabletAlign' ) || getValue( 'mobileTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-testimonial__name': {
					...createTypographyStyles( 'name%s', 'mobile', props.attributes ),
					textAlign: getValue( 'nameMobileAlign' ) || getValue( 'mobileContentAlign' ),
				},
			},
		} )
	}

	// Position.
	const {
		positionColor = '',
		showPosition = true,
	} = props.attributes
	if ( showPosition ) {
		styles.push( {
			'.lmb-testimonial__position': {
				...createTypographyStyles( 'position%s', 'desktop', props.attributes, { importantSize: true } ),
				color: appendImportant( whiteIfDarkBlackIfLight( positionColor, ( show.columnBackground || design === 'background' ) && columnBackgroundColor ) ),
				textAlign: getValue( 'positionAlign' ) || getValue( 'contentAlign' ),
			},
			tablet: {
				'.lmb-testimonial__position': {
					...createTypographyStyles( 'position%s', 'tablet', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'positionTabletAlign' ) || getValue( 'mobileTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-testimonial__position': {
					...createTypographyStyles( 'position%s', 'mobile', props.attributes, { importantSize: true } ),
					textAlign: getValue( 'positionMobileAlign' ) || getValue( 'mobileContentAlign' ),
				},
			},
		} )
	}

	// Spacing.
	if ( show.testimonialSpacing ) {
		if ( design !== 'bubble' ) {
			styles.push( ...createResponsiveStyles( '.lmb-testimonial__body', 'testimonial%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
		} else {
			styles.push( ...createResponsiveStyles( '.lmb-testimonial__body-wrapper', 'testimonial%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
		}
	}
	if ( show.imageSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-testimonial__image', 'image%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.nameSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-testimonial__name', 'name%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	if ( show.positionSpacing ) {
		styles.push( ...createResponsiveStyles( '.lmb-testimonial__position', 'position%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}

	return deepmerge.all( styles )
}

export default createStyles
