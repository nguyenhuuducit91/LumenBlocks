/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.cta.design.no-text-attributes', 'lumen/cta', attributes => {
	return omit( attributes, [
		'title',
		'description',
		'buttonText',
	] )
} )

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.cta.design.filtered-block-attributes', 'lumen/cta', attributes => {
	return {
		...omit( attributes, [
			'buttonUrl',
			'buttonNewTab',
			'buttonNoFollow',
		] ),
	}
} )
