/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

export const showOptions = blockProps => {
	const {
		design = 'plain',
	} = blockProps.attributes

	return applyFilters( 'lumen.count-up.show', {
		columnBackground: design === 'boxed',
		border: design === 'boxed',
	}, blockProps )
}
