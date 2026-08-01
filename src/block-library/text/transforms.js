/**
 * WordPress dependencies
 */
import { createBlock, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks'
import { select } from '@wordpress/data'

/**
 * Internal dependencies
 */
import { TEMPLATE as ICON_LABEL_TEMPLATE } from '../icon-label/edit'
import { settings } from 'lumen'

const transforms = {
	from: [
		// When pasting, ensure that the default text block setting is followed
		{
			type: 'raw',
			isMatch: node => node.nodeName === 'P' &&
				settings.lumen_enable_text_default_block &&
				// Only allow transformation if lumen text can be inserted
				select( 'core/block-editor' ).canInsertBlockType( 'lumen/text' ),
			transform: node => {
				return createBlock( 'lumen/text', {
					text: node.textContent.trim(),
				} )
			},
			priority: 11,
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'lumen/subtitle' ],
			transform: attributes => {
				return attributes.map( ( { ...attrs } ) => createBlock( 'lumen/text', { ...attrs } ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/paragraph' ],
			transform: attributes => {
				return attributes.map( ( { content } ) => createBlock( 'lumen/text', {
					text: content,
				} ) )
			},
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/heading' ],
			transform: attributes => {
				return attributes.map( ( { content } ) => createBlock( 'lumen/text', {
					text: content,
				} ) )
			},
		},
	],
	to: [
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
