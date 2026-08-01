/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

export const showOptions = blockProps => {
	const {
		showTitle = true,
	} = blockProps.attributes

	return applyFilters( 'lumen.icon.show', {
		titleSpacing: showTitle,
		iconAlign: showTitle,
	}, blockProps )
}
