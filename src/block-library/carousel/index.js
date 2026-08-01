/**
 * BLOCK: New Block.
 */
/**
 * External dependencies
 */
import { CarouselIcon } from '~lumen/icons'

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import schema from './schema'
import metadata from './block.json'
import example from './example'
import deprecated from './deprecated'
import substitute from './substitute'

export const settings = {
	...metadata,
	icon: CarouselIcon,
	attributes: schema,
	supports: {
		anchor: true,
		align: [ 'center', 'wide', 'full' ], // Only select alignments.
		lmnAlign: true,
		lmnSaveBlockStyle: false,
		lmnDefaultTab: 'layout',
		lmnColumnResize: false,
		lmnBlockLinking: true,
		spacing: true,
	},
	example,
	deprecated,
	edit,
	save,
	substitute,
}
