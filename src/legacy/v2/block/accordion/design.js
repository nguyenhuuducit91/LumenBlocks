/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.accordion.design.no-text-attributes', 'lumen/accordion', attributes => {
	return omit( attributes, [
		'title',
	] )
} )

addFilter( 'lumen.accordion.edit.designs', 'lumen/accordion', designs => {
	return {
		...designs,
		// corporate: {
		// 	label: __( 'Corporate', i18n ),
		// 	attributes: {
		// 		borderRadius: 50,
		// 		containerBackgroundColor: '#fcb900',
		// 	},
		// },
	}
} )
