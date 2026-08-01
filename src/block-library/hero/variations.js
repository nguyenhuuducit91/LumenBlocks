/**
 * Internal dependencies
 */
import ImageDefault from './images/default.svg'
import ImageHorizontal from './images/horizontal.svg'
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
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.hero.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			isDefault: true,
			attributes: {
				className: 'is-style-default',
				innerBlockAlign: 'center',
				hasContainer: true,
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			innerBlocks: [
				[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ) } ],
				[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
				[ 'lumen/button-group', {}, [
					[ 'lumen/button', { text: _x( 'Button', 'Button placeholder', i18n ) } ],
				] ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'horizontal',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Horizontal', i18n ) ),
			attributes: {
				className: 'is-style-horizontal',
				hasBackground: true,
				blockBackgroundColor: '#FFFFFF',
				blockPadding: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				},
				hasContainer: false,
				innerBlockContentAlign: 'alignfull',
				align: 'full',
				contentAlign: '',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Horizontal', i18n ),
			pickerIcon: ImageHorizontal,
			innerBlocks: [
				[ 'lumen/columns', {
				}, [
					[ 'lumen/column', {
						contentAlign: 'left',
						innerBlockAlign: 'center',
						columnSpacing: {
							top: 32,
							right: 32,
							bottom: 32,
							left: 32,
						},
					}, [
						[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h1' } ],
						[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
						[ 'lumen/button-group', {}, [
							[ 'lumen/button', { text: _x( 'Button', 'Button placeholder', i18n ) } ],
						] ],
					] ],
					[ 'lumen/column', {
						columnSpacing: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
					}, [
						[ 'lumen/image', {
							imageHeight: 750,
							imageWidth: 100,
						} ],
					] ],
				] ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
