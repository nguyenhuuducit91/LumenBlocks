/**
 * BLOCK: Image Box Block.
 */

/**
 * Internal dependencies
 */
import './design'
import deprecated from './deprecated'
import edit from './edit'
import save from './save'
import schema from './schema'
import example from './example'
import _metadata from './block.json'

/**
 * External dependencies
 */
import { ImageBoxIcon } from '~lumen/icons'

/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks'
import { v2disabledBlocks as disabledBlocks } from 'lumen'

const {
	name,
	...metadata
} = _metadata

export { name }

export const settings = {
	...metadata,
	title: metadata.title + ' (v2)',
	icon: ImageBoxIcon,
	supports: {
		align: [ 'center', 'wide', 'full' ],
		inserter: ! disabledBlocks.includes( name ), // Hide if disabled.
		anchor: true,
	},
	attributes: schema,
	example,

	deprecated,
	edit,
	save,

	// Lumen modules.
	modules: {
		'advanced-general': true,
		'advanced-block-spacing': true,
		'advanced-column-spacing': {
			paddings: false,
			verticalContentAlignImportant: true,
		},
		'advanced-custom-attributes': true,
		'advanced-responsive': true,
		'block-background': {
			importantBackgroundSize: true,
		},
		'block-separators': true,
		'block-title': {
			blockTitleMarginBottomImportant: true,
			blockDescriptionMarginBottomImportant: true,
		},
		'content-align': true,
		'block-designs': true,
		'custom-css': {
			default: applyFilters( 'lumen.image-box.custom-css.default', '' ),
		},
	},
}

// The "height" option is really the "columnHeight" option. @see edit.js
// Disable the default column height.
addFilter( 'lumen.image-box.advanced-column-spacing.styles', 'lumen/image-box/column-height', styles => {
	styles.desktopTablet[ '> .lmb-inner-block > .lmb-block-content > *' ] = {
		minHeight: undefined,
	}
	styles.tabletOnly[ '> .lmb-inner-block > .lmb-block-content > *' ] = {
		minHeight: undefined,
	}
	styles.mobile[ '> .lmb-inner-block > .lmb-block-content > *' ] = {
		minHeight: undefined,
	}

	return styles
} )
