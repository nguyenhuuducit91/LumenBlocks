/**
 * BLOCK: Spacer Block
 */
/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import schema from './schema'
import metadata from './block.json'
import example from './example'
import deprecated from './deprecated'

/**
 * External dependencies
 */
import { SpacerIcon } from '~lumen/icons'

export const settings = {
	...metadata,
	icon: SpacerIcon,
	attributes: schema,
	supports: {
		anchor: true,
		align: [ 'center', 'wide', 'full' ],
		lmnSaveBlockStyle: false,
		spacing: true,
	},
	example,
	deprecated,
	edit,
	save,
}
