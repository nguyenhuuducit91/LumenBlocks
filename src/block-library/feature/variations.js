/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import ImageDefault from './images/default.svg'
import ImageHorizontal from './images/horizontal.svg'
/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.feature.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			attributes: { className: 'is-style-default' },
			isActive: [ 'className' ],
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			isDefault: true,
			innerBlocks: [
				[ 'lumen/column', { columnAlign: 'center' }, [
					[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ) } ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', { text: _x( 'Button', 'Button placeholder', i18n ) } ],
					] ],
				] ],
				[ 'lumen/column', { templateLock: 'insert', columnAlign: 'center' }, [
					[ 'lumen/image', {} ],
				] ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'horizontal',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Horizontal', i18n ) ),
			attributes: {
				className: 'is-style-horizontal',
				align: 'full',
				innerBlockContentAlign: 'alignwide',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Horizontal', i18n ),
			pickerIcon: ImageHorizontal,
			innerBlocks: [
				[ 'lumen/column', { columnAlign: 'center' }, [
					[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h2' } ],
					[ 'lumen/columns', {}, [
						[ 'lumen/column', { align: 'full' }, [
							[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3' } ],
							[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block.', 'Content placeholder', i18n ) } ],
						] ],
						[ 'lumen/column', {}, [
							[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3' } ],
							[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block.', 'Content placeholder', i18n ) } ],
						] ],
					] ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', { text: _x( 'Button', 'Button placeholder', i18n ) } ],
					] ],
				] ],
				[ 'lumen/column', { templateLock: 'insert', columnAlign: 'center' }, [
					[ 'lumen/image', {} ],
				] ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
