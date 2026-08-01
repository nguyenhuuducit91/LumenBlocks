/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.feature.design.no-text-attributes', 'lumen/feature', attributes => {
	return omit( attributes, [
		'title',
		'description',
		'buttonText',
	] )
} )

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.feature.design.filtered-block-attributes', 'lumen/feature', ( attributes, blockAttributes = null ) => {
	return {
		...omit( attributes, [
			'imageId',
			...( blockAttributes && blockAttributes.imageId ? [ 'imageUrl' ] : [] ),
			'imageAlt',
			'buttonUrl',
			'buttonNewTab',
			'buttonNoFollow',
		] ),
	}
} )
