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
import ImageCompact from './images/compact.svg'
/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.testimonial.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			attributes: {
				className: 'is-style-default',
				hasContainer: true,
				contentAlign: 'center',
			},
			isDefault: true,
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			isActive: [ 'className' ],
			innerBlocks: [
				[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
				[ 'lumen/image', {
					imageHeight: 75, imageWidth: 75, imageWidthUnit: 'px', imageShape: 'circle',
				} ],
				[ 'lumen/heading', {
					text: __( 'Name', i18n ), textTag: 'h3',
				} ],
				[ 'lumen/subtitle', {
					text: __( 'Position', i18n ),
				} ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'compact',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Compact', i18n ) ),
			attributes: {
				className: 'is-style-compact',
				hasContainer: false,
				contentAlign: '',
			},
			pickerTitle: __( 'Compact', i18n ),
			pickerIcon: ImageCompact,
			isActive: [ 'className' ],
			innerBlocks: [
				[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ) } ],
				[ 'lumen/columns', { columnJustify: 'flex-start' }, [
					[ 'lumen/column', {}, [
						[ 'lumen/image', {
							imageHeight: 75, imageWidth: 75, imageWidthUnit: 'px', imageShape: 'circle',
						} ],
					] ],
					[ 'lumen/column', { contentAlign: 'left' }, [
						[ 'lumen/heading', {
							text: __( 'Name', i18n ),
							textTag: 'h3',
							blockMargin: { bottom: 0 },
						} ],
						[ 'lumen/subtitle', {
							text: __( 'Position', i18n ),
						} ],
					] ],
				] ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
