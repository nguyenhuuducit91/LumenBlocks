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
	'lumen.pricing-box.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			attributes: { className: 'is-style-basic' },
			isDefault: true,
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			isActive: [ 'className' ],
			innerBlocks: [
				[ 'lumen/heading', {
					text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3',
				} ],
				[ 'lumen/price', {} ],
				[ 'lumen/subtitle', { text: _x( 'Subtitle for This Block', 'Subtitle placeholder', i18n ) } ],
				[ 'lumen/icon-list', {
					text: sprintf( '<li>%s</li><li>%s</li><li>%s</li>', ...[ __( 'one', i18n ), __( 'two', i18n ), __( 'three', i18n ) ].map( v => sprintf( __( 'Package inclusion %s', i18n ), v ) ) ),
				} ],
				[ 'lumen/button-group', {}, [
					[ 'lumen/button', {
						text: _x( 'Button', 'Button placeholder', i18n ),
					} ],
				] ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'compact',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Compact', i18n ) ),
			attributes: { className: 'is-style-compact' },
			pickerTitle: __( 'Compact', i18n ),
			pickerIcon: ImageCompact,
			isActive: [ 'className' ],
			innerBlocks: [
				[ 'lumen/columns', {}, [
					[ 'lumen/column', {}, [
						[ 'lumen/image', {} ],
					] ],
					[ 'lumen/column', {
						contentAlign: 'left',
						columnAlign: 'center',
					}, [
						[ 'lumen/heading', {
							text: _x( 'Title for This Block', 'Heading placeholder', i18n ), textTag: 'h3',
						} ],
						[ 'lumen/price', {} ],
						[ 'lumen/subtitle', { text: _x( 'Subtitle for This Block', 'Subtitle placeholder', i18n ) } ],
						[ 'lumen/button-group', {}, [
							[ 'lumen/button', {
								text: _x( 'Button', 'Button placeholder', i18n ),
							} ],
						] ],
					] ],
				] ],
				[ 'lumen/icon-list', {
					text: sprintf( '<li>%s</li><li>%s</li><li>%s</li>', ...[ __( 'one', i18n ), __( 'two', i18n ), __( 'three', i18n ) ].map( v => sprintf( __( 'Package inclusion %s', i18n ), v ) ) ),
				} ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
