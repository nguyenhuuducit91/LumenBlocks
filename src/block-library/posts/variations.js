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
import ImageList from './images/list.svg'
/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.posts.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			isDefault: true,
			attributes: {
				className: 'is-style-default',
				contentOrder: [
					'title',
					'featured-image',
					'meta',
					'category',
					'excerpt',
					'readmore',
				],
				hasContainer: false,
				imageWidth: 100,
				imageWidthUnit: '%',
			},
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			isActive: [ 'className' ],
			scope: [ 'block' ],
		},
		{
			name: 'list',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'List', i18n ) ),
			attributes: {
				imageWidth: 35,
				contentOrder: [
					'title',
					'meta',
					'category',
					'excerpt',
					'readmore',
				],
				imageWidthUnit: '%',
				imageHeightUnit: 'px',
				hasContainer: false,
				className: 'is-style-list',
				innerBlockContentAlign: 'alignwide',
				align: 'wide',
			},
			pickerTitle: __( 'List', i18n ),
			pickerIcon: ImageList,
			isActive: [ 'className' ],
			scope: [ 'block' ],
		},
	]
)

export default variations

