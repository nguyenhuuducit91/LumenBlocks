/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.blog-posts.design.no-text-attributes', 'lumen/blog-posts', attributes => {
	return omit( attributes, [
		'text',
	] )
} )

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.blog-posts.design.filtered-block-attributes', 'lumen/button', attributes => {
	return {
		...omit( attributes, [
			'numberOfItems',
			'order',
			'orderBy',
			'postType',
			'taxonomyType',
			'taxonomy',
			'taxonomyFilterType',
			'postOffset',
			'postExclude',
			'postInclude',
		] ),
	}
} )
