/**
 * BLOCK: Blockquote Block
 */
/**
 * Internal dependencies
 */
import variations from './variations'
import metadata from './block.json'
import edit from './edit'
import save from './save'
import schema from './schema'
import example from './example'
import deprecated from './deprecated'
import substitute from './substitute'

/**
 * External dependencies
 */
import { BlockquoteIcon } from '~lumen/icons'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export const settings = {
	...metadata,
	icon: BlockquoteIcon,
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

	deprecated,
	variations,
	edit,
	save,
	substitute,
}
