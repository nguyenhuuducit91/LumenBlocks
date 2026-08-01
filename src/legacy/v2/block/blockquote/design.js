/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.blockquote.design.no-text-attributes', 'lumen/blockquote', attributes => {
	return omit( attributes, [
		'text',
	] )
} )
