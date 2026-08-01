/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.notification.design.no-text-attributes', 'lumen/notification', attributes => {
	return omit( attributes, [
		'title',
		'description',
		'buttonText',
	] )
} )

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.notification.design.filtered-block-attributes', 'lumen/notification', attributes => {
	return {
		...omit( attributes, [
			'buttonUrl',
			'buttonNewTab',
			'buttonNoFollow',
		] ),
	}
} )
