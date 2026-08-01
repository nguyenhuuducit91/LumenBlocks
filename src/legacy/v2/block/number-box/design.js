/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.number-box.design.no-text-attributes', 'lumen/number-box', attributes => {
	return omit( attributes, [
		'num1',
		'num2',
		'num3',
		'title1',
		'title2',
		'title3',
		'description1',
		'description2',
		'description3',
	] )
} )
