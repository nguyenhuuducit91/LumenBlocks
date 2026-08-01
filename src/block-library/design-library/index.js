/**
 * BLOCK: Design Library Block.
 */
/**
 * External dependencies
 */
import { LumenIcon } from '~lumen/icons'

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import metadata from './block.json'

export const settings = {
	...metadata,
	icon: LumenIcon,
	attributes: {
		previewMode: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		lmnSaveBlockStyle: false,
		inserter: false, // Always hide design library from block inserter
	},
	example: {
		attributes: {
			previewMode: true,
		},
	},
	edit,
	save,
}
