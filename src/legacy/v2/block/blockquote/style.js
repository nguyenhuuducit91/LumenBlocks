/**
 * External dependencies
 */
import {
	appendImportantAll,
	createTypographyStyles,
	createResponsiveStyles,
	createBorderStyleSet,
	whiteIfDark,
	appendImportant,
	__getValue,
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

	const show = showOptions( props )

	const styles = []

	styles.push( {
		...( show.containerBackground ? createBackgroundStyleSet( 'container%s', 'lmb-blockquote__item', props.attributes, {
			importantBackgroundColor: true,
		} ) : {} ),
	} )
	if ( show.containerBackground ) {
		styles.push( {
			'.lmb-blockquote__item': {
				borderRadius: show.borderRadius ? getValue( 'borderRadius', '%spx !important' ) : undefined,
			},
		} )
	}

	if ( show.border ) {
		styles.push( {
			...createBorderStyleSet( 'column%s', '.lmb-blockquote__item', props.attributes ),
		} )
	}

	// Quote.
	const {
		showQuote = true,
	} = props.attributes
	if ( showQuote ) {
		styles.push( {
			'.lmb-blockquote__quote': {
				fill: appendImportant( getValue( 'quoteColor' ) ),
				opacity: getValue( 'quoteOpacity' ),
			},
		} )
		styles.push( ...createResponsiveStyles( '.lmb-blockquote__quote', 'quote%sSize', 'width', '%spx', props.attributes, { important: true } ) )
		styles.push( ...createResponsiveStyles( '.lmb-blockquote__quote', 'quote%sSize', 'height', '%spx', props.attributes, { important: true } ) )
		styles.push( ...createResponsiveStyles( '.lmb-blockquote__quote', 'quote%sX', 'left', '%spx', props.attributes, { important: true } ) )
		styles.push( ...createResponsiveStyles( '.lmb-blockquote__quote', 'quote%sY', 'top', '%spx', props.attributes, { important: true } ) )
	}

	// Container.
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
				'> .lmb-inner-block > .lmb-block-content > .lmb-blockquote__item': appendImportantAll( {
					paddingTop: getValue( 'columnPaddingTop', `%s${ columnPaddingUnit }` ),
					paddingBottom: getValue( 'columnPaddingBottom', `%s${ columnPaddingUnit }` ),
					paddingRight: getValue( 'columnPaddingRight', `%s${ columnPaddingUnit }` ),
					paddingLeft: getValue( 'columnPaddingLeft', `%s${ columnPaddingUnit }` ),
				} ),
			},
			tabletOnly: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-blockquote__item': appendImportantAll( {
					paddingTop: getValue( 'tabletColumnPaddingTop', `%s${ tabletColumnPaddingUnit }` ),
					paddingRight: getValue( 'tabletColumnPaddingRight', `%s${ tabletColumnPaddingUnit }` ),
					paddingBottom: getValue( 'tabletColumnPaddingBottom', `%s${ tabletColumnPaddingUnit }` ),
					paddingLeft: getValue( 'tabletColumnPaddingLeft', `%s${ tabletColumnPaddingUnit }` ),
				} ),
			},
			mobile: {
				'> .lmb-inner-block > .lmb-block-content > .lmb-blockquote__item': appendImportantAll( {
					paddingTop: getValue( 'mobileColumnPaddingTop', `%s${ mobileColumnPaddingUnit }` ),
					paddingRight: getValue( 'mobileColumnPaddingRight', `%s${ mobileColumnPaddingUnit }` ),
					paddingBottom: getValue( 'mobileColumnPaddingBottom', `%s${ mobileColumnPaddingUnit }` ),
					paddingLeft: getValue( 'mobileColumnPaddingLeft', `%s${ mobileColumnPaddingUnit }` ),
				} ),
			},
		},
	} )

	// Text.
	const {
		containerBackgroundColor = '',
		textColor = '',
	} = props.attributes
	styles.push( {
		'.lmb-blockquote__text': {
			...createTypographyStyles( 'text%s', 'desktop', props.attributes, { important: true } ),
			color: whiteIfDark( textColor, show.containerBackground && containerBackgroundColor ),
		},
		tablet: {
			'.lmb-blockquote__text': {
				...createTypographyStyles( 'text%s', 'tablet', props.attributes, { important: true } ),
			},
		},
		mobile: {
			'.lmb-blockquote__text': {
				...createTypographyStyles( 'text%s', 'mobile', props.attributes, { important: true } ),
			},
		},
	} )
	styles.push( ...createResponsiveStyles( '.lmb-blockquote__item', 'text%sAlign', 'textAlign', '%s', props.attributes, { important: true } ) )

	return deepmerge.all( styles )
}

export default createStyles
