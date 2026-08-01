/**
 * Internal dependencies
 */
import { TEMPLATE as ICON_LABEL_TEMPLATE } from '../icon-label/edit'
import { TEMPLATE as ICON_BOX_TEMPLATE } from '../icon-box/edit'

/**
 * WordPress dependencies
 */
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks'

const transforms = {
	to: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/icon-box' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlocksFromInnerBlocksTemplate(
					[
						[ 'lumen/icon-box', {}, ICON_BOX_TEMPLATE.map(
							block => {
								if ( block[ 0 ] === 'lumen/icon-label' ) {
									block[ 2 ][ 0 ][ 1 ] = attrs
								}
								return block
							}
						) ],
					]
				)[ 0 ] )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/icon-label' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlocksFromInnerBlocksTemplate(
					[
						[ 'lumen/icon-label', {}, ICON_LABEL_TEMPLATE.map(
							block => {
								if ( block[ 0 ] === 'lumen/icon' ) {
									block[ 1 ] = attrs
								}
								return block
							}
						) ],
					]
				)[ 0 ] )
			},
		},
	],
}

export default transforms
