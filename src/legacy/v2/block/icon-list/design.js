/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.icon-list.design.no-text-attributes', 'lumen/icon-list', attributes => {
	return omit( attributes, [
		'text',
	] )
} )
