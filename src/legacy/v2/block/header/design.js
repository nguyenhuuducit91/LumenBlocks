/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.header.design.no-text-attributes', 'lumen/header', attributes => {
	return omit( attributes, [
		'title',
		'subtitle',
		'buttonText',
		'button2Text',
	] )
} )

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.header.design.filtered-block-attributes', 'lumen/header', attributes => {
	return {
		...omit( attributes, [
			'buttonUrl',
			'buttonNewTab',
			'buttonNoFollow',
			'button2Url',
			'button2NewTab',
			'button2NoFollow',
		] ),
	}
} )
