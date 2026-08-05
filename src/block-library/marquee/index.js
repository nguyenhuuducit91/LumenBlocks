/**
 * BLOCK: Marquee Block
 */
/**
 * Internal dependencies
 */
import metadata from './block.json'
import edit from './edit'
import save from './save'
import schema from './schema'
import example from './example'

/**
 * External dependencies
 */
import { MarqueeIcon } from '~lumen/icons'

export const settings = {
	...metadata,
	icon: MarqueeIcon,
	attributes: schema,
	supports: {
		anchor: true,
		html: false,
		align: true,
		lmnAlign: true,
		lmnDefaultTab: 'layout',
		spacing: true,
	},
	example,
	edit,
	save,
}
