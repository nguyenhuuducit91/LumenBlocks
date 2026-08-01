/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

export const showOptions = blockProps => {
	const {
		showSubtitle = true,
		showTopLine = false,
		showBottomLine = false,
	} = blockProps.attributes

	return applyFilters( 'lumen.heading.show', {
		subtitleSpacing: showSubtitle,
		topLineSpacing: showTopLine,
		bottomLineSpacing: showBottomLine,
	}, blockProps )
}
