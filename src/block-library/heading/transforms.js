/**
 * WordPress dependencies
 */
import { createBlock, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import { TEMPLATE as ICON_LABEL_TEMPLATE } from '../icon-label/edit'

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/text' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlock( 'lumen/heading', { ...attrs } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/subtitle' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlock( 'lumen/heading', { ...attrs } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/paragraph' ],
			transform: attributes => {
				return attributes.map( ( { content } ) => createBlock( 'lumen/heading', {
					text: content,
				} ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/heading' ],
			transform: attributes => {
				return attributes.map( ( { content } ) => createBlock( 'lumen/heading', {
					text: content,
				} ) )
			},
		},
	],
	to: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/text' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlock( 'lumen/text', { ...attrs } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/subtitle' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlock( 'lumen/subtitle', { ...attrs } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/paragraph' ],
			transform: attributes => {
				return attributes.map( ( { text } ) => createBlock( 'core/paragraph', { content: text } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/heading' ],
			transform: attributes => {
				return attributes.map( ( { text } ) => createBlock( 'core/heading', { content: text } ) )
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
								if ( block[ 0 ] === 'lumen/heading' ) {
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
