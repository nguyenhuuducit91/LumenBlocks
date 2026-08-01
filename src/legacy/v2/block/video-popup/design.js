/**
 * External dependencies
 */
import { omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

// Ignore these attributes when exporting / applying designs.
addFilter( 'lumen.video-popup.design.filtered-block-attributes', 'lumen/video-popup', ( attributes, blockAttributes = null ) => {
	return omit( attributes, [
		'videoLink',
		'videoID',
		'video-popup3',
		'previewBackgroundMediaId',
		...( blockAttributes && blockAttributes.previewBackgroundMediaId ? [ 'previewBackgroundMediaUrl' ] : [] ),
	] )
} )
