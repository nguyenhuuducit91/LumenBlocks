/**
 * External dependencies
 */
import { __getValue, appendImportant } from '~lumen/utils'
import {
	createBackgroundStyleSet,
} from '../../util'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	styles.push( {
		desktopTablet: {
			'.lmb-spacer': {
				height: appendImportant( getValue( 'height', `%s${ getValue( 'heightUnit' ) || 'px' }` ) ),
			},
		},
		tabletOnly: {
			'.lmb-spacer': {
				height: appendImportant( getValue( 'tabletHeight', `%s${ getValue( 'tabletHeightUnit' ) || 'px' }` ) ),
			},
		},
		mobile: {
			'.lmb-spacer': {
				height: appendImportant( getValue( 'mobileHeight', `%s${ getValue( 'mobileHeightUnit' ) || 'px' }` ) ),
			},
		},
	} )

	// Column Background.
	styles.push( {
		...createBackgroundStyleSet( '%s', 'lmb-spacer--inner', props.attributes, {
			importantBackgroundColor: true,
		} ),
	} )

	return deepmerge.all( styles )
}

export default createStyles
