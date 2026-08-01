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
	'lumen.call-to-action.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			isDefault: true,
			attributes: {
				className: 'is-style-default',
				hasContainer: true,
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			innerBlocks: [
				[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3' } ],
				[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
				[ 'lumen/button-group', {}, [
					[ 'lumen/button', { text: __( 'Button', i18n ) } ],
				] ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'horizontal',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Horizontal', i18n ) ),
			attributes: {
				className: 'is-style-horizontal',
				hasContainer: true,
				innerBlockOrientation: 'horizontal',
				innerBlockContentAlign: 'alignwide',
				innerBlockVerticalAlign: 'center',
				align: 'wide',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Horizontal', i18n ),
			pickerIcon: ImageHorizontal,
			innerBlocks: [
				[ 'lumen/heading', { text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3' } ],
				[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
				[ 'lumen/button-group', {}, [
					[ 'lumen/button', { text: __( 'Button', i18n ) } ],
				] ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
