/**
 * External dependencies
 */
import {
	createTypographyStyles,
	createResponsiveStyles,
	__getValue,
	appendImportant,
} from '~lumen/utils'

/**
 * Internal dependencies
 */
// import { showOptions } from './utils'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	// Title.
	const {
		showTitle = true,
	} = props.attributes
	if ( showTitle ) {
		styles.push( {
			'.lmb-expand__title': {
				...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
				color: getValue( 'titleColor' ),
				textAlign: getValue( 'titleAlign' ),
			},
			tablet: {
				'.lmb-expand__title': {
					...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
					textAlign: getValue( 'titleTabletAlign' ),
				},
			},
			mobile: {
				'.lmb-expand__title': {
					...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
					textAlign: getValue( 'titleMobileAlign' ),
				},
			},
		} )
	}

	// Text.
	styles.push( {
		'.lmb-expand__less-text p, .lmb-expand__more-text p': {
			...createTypographyStyles( 'text%s', 'desktop', props.attributes ),
			color: getValue( 'textColor' ),
			textAlign: getValue( 'textAlign' ),
		},
		tablet: {
			'.lmb-expand__less-text p, .lmb-expand__more-text p': {
				...createTypographyStyles( 'text%s', 'tablet', props.attributes ),
				textAlign: getValue( 'textTabletAlign' ),
			},
		},
		mobile: {
			'.lmb-expand__less-text p, .lmb-expand__more-text p': {
				...createTypographyStyles( 'text%s', 'mobile', props.attributes ),
				textAlign: getValue( 'textMobileAlign' ),
			},
		},
	} )

	// Link.
	styles.push( {
		'.lmb-expand__toggle-wrapper': {
			textAlign: appendImportant( getValue( 'linkAlign' ) ),
		},
		'.lmb-expand__more-toggle-text, .lmb-expand__less-toggle-text': {
			...createTypographyStyles( 'link%s', 'desktop', props.attributes ),
			color: getValue( 'linkColor' ),
		},
		tablet: {
			'.lmb-expand__toggle-wrapper': {
				textAlign: appendImportant( getValue( 'linkTabletAlign' ) ),
			},
			'.lmb-expand__more-toggle-text, .lmb-expand__less-toggle-text': {
				...createTypographyStyles( 'link%s', 'tablet', props.attributes ),
			},
		},
		mobile: {
			'.lmb-expand__toggle-wrapper': {
				textAlign: appendImportant( getValue( 'linkMobileAlign' ) ),
			},
			'.lmb-expand__more-toggle-text, .lmb-expand__less-toggle-text': {
				...createTypographyStyles( 'link%s', 'mobile', props.attributes ),
			},
		},
	} )

	// Spacing.
	if ( showTitle ) {
		styles.push( ...createResponsiveStyles( '.lmb-expand__title', 'title%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	}
	styles.push( ...createResponsiveStyles( '.lmb-expand__less-text, .lmb-expand__more-text', 'text%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )
	styles.push( ...createResponsiveStyles( '.lmb-expand__more-toggle-text, .lmb-expand__less-toggle-text', 'link%sBottomMargin', 'marginBottom', '%spx', props.attributes, { important: true } ) )

	return deepmerge.all( styles )
}

export default createStyles
