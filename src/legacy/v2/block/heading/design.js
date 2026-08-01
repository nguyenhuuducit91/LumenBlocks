/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.heading.design.no-text-attributes', 'lumen/heading', attributes => {
	return omit( attributes, [
		'title',
		'subtitle',
	] )
} )
