/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import { semverCompare } from '~lumen/utils'
import { wpVersion } from 'lumen'

addFilter( 'lumen.block-css.editor-preview-breakpoints', 'lumen/wp-pre-7', breakpoints => {
	if ( wpVersion && semverCompare( wpVersion, '<', '7.0' ) ) {
		return {
			tablet: 781,
			mobile: 361,
		}
	}

	return breakpoints
} )
