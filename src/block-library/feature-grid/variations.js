/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import {
	__, sprintf, _x,
} from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import ImageDefault from './images/default.svg'
import ImageFloat from './images/float.svg'

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.feature-grid.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			attributes: {
				className: 'is-style-default',
				innerBlockContentAlign: 'alignwide',
				align: 'wide',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			isDefault: true,
			innerBlocks: [
				[ 'lumen/column', { hasContainer: true }, [
					[ 'lumen/image' ],
					[ 'lumen/heading', {
						text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3',
					} ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', {
							text: _x( 'Button', 'Button placeholder', i18n ),
							buttonBackgroundColor: 'transparent',
							className: 'is-style-plain',
						} ],
					] ],
				] ],
				[ 'lumen/column', { hasContainer: true }, [
					[ 'lumen/image' ],
					[ 'lumen/heading', {
						text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3',
					} ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', {
							text: _x( 'Button', 'Button placeholder', i18n ),
							buttonBackgroundColor: 'transparent',
							className: 'is-style-plain',
						} ],
					] ],
				] ],
				[ 'lumen/column', { hasContainer: true }, [
					[ 'lumen/image' ],
					[ 'lumen/heading', {
						text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3',
					} ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', {
							text: _x( 'Button', 'Button placeholder', i18n ),
							buttonBackgroundColor: 'transparent',
							className: 'is-style-plain',
						} ],
					] ],
				] ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'float',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Float', i18n ) ),
			attributes: {
				innerBlockContentAlign: 'alignwide',
				className: 'is-style-float',
				align: 'full',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Float', i18n ),
			pickerIcon: ImageFloat,
			innerBlocks: [
				[ 'lumen/column', {
					contentAlign: 'left',
					containerPadding: {
						left: 80,
					},
				}, [
					[ 'lumen/image', {
						imageShape: 'circle',
						imageHeight: 150,
						imageWidth: 150,
						blockMargin: {
							top: '', right: '', bottom: '', left: -80,
						},
						imageWidthUnit: 'px',
					} ],
					[ 'lumen/heading', {
						text: __( 'Title', i18n ), textTag: 'h3',
					} ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', {
							text: _x( 'Button', 'Button placeholder', i18n ),
							buttonBackgroundColor: 'transparent',
							buttonBorderType: 'solid',
							buttonBackgroundColorHover: 'transparent',
							buttonBackgroundColorParentHover: 'transparent',
							className: 'is-style-ghost',
						} ],
					] ],
				] ],
				[ 'lumen/column', {
					contentAlign: 'left',
					containerPadding: {
						left: 80,
					},
				}, [
					[ 'lumen/image', {
						imageShape: 'circle',
						imageHeight: 150,
						imageWidth: 150,
						blockMargin: {
							top: '', right: '', bottom: '', left: -80,
						},
						imageWidthUnit: 'px',
					} ],
					[ 'lumen/heading', {
						text: __( 'Title', i18n ), textTag: 'h3',
					} ],
					[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
					[ 'lumen/button-group', {}, [
						[ 'lumen/button', {
							text: _x( 'Button', 'Button placeholder', i18n ),
							buttonBackgroundColor: 'transparent',
							buttonBorderType: 'solid',
							buttonBackgroundColorHover: 'transparent',
							buttonBackgroundColorParentHover: 'transparent',
							className: 'is-style-ghost',
						} ],
					] ],
				] ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
