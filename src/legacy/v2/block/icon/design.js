/**
 * External dependencies
 */
import { omit, range } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Remove text from block designs being applied.
addFilter( 'lumen.icon.design.no-text-attributes', 'lumen/icon', attributes => {
	return omit( attributes, range( 1, 9 ).reduce( ( acc, curr ) => {
		return [
			...acc,
			`icon${ curr }`,
			`url${ curr }`,
			`newTab${ curr }`,
			`noFollow${ curr }`,
			`sponsored${ curr }`,
			`ugc${ curr }`,
			`title${ curr }`,
		]
	}, [] ) )
} )
