/**
 * BLOCK: Card Block.
 */

/**
 * External dependencies
 */
import { ColumnIcon } from '~lumen/icons'

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import schema from './schema'
import deprecated from './deprecated'
import metadata from './block.json'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export const settings = {
	...metadata,
	icon: ColumnIcon,
	attributes: schema,
	supports: {
		anchor: true,
		reusable: false,
		lmnBlockLinking: true,
		lmnSaveBlockStyle: false,
		lmnDefaultTab: 'layout',
		spacing: true,
	},
	//  styles: blockStyles,

	deprecated,
	edit,
	save,
}
