/**
 * WordPress dependencies
 */
import {
	createBlock,
} from '@wordpress/blocks'

const transforms = {
	from: [
		{
			type: 'block',
			isMultiblock: false,
			blocks: [ 'lumen/icon-button' ],
			transform: attributes => {
				return createBlock(
					'lumen/button',
					attributes
				)
			},
		},
	],
}

export default transforms
