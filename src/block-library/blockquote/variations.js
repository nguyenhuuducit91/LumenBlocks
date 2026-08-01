/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import { renderToString } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import SVGDefaultQuote from './images/round-thin.svg'
import ImageDefault from './images/default.svg'
import ImageSimple from './images/simple.svg'
/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = applyFilters(
	'lumen.blockquote.variations',
	[
		{
			name: 'default',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Default', i18n ) ),
			isDefault: true,
			attributes: {
				className: 'is-style-default',
				hasContainer: true,
				contentAlign: 'left',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Default', i18n ),
			pickerIcon: ImageDefault,
			innerBlocks: [
				[ 'lumen/icon', { icon: renderToString( <SVGDefaultQuote /> ), linkHasLink: false } ],
				[ 'lumen/text', {
					text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ),
				} ],
			],
			scope: [ 'block' ],
		},
		{
			name: 'simple',
			description: sprintf( _x( '%s Layout', 'Block layout name', i18n ), __( 'Simple', i18n ) ),
			attributes: {
				className: 'is-style-simple',
				contentAlign: 'left',
			},
			isActive: [ 'className' ],
			pickerTitle: __( 'Simple', i18n ),
			pickerIcon: ImageSimple,
			innerBlocks: [
				[ 'lumen/icon', {
					icon: renderToString( <SVGDefaultQuote /> ),
					opacity: 0.2,
					position: 'absolute',
					positionNum: {
						top: -50, right: '', bottom: '', left: -50,
					},
					iconSize: 200,
					linkHasLink: false,
				} ],
				[ 'lumen/text', {
					text: _x( 'Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.', 'Content placeholder', i18n ),
				} ],
			],
			scope: [ 'block' ],
		},
	]
)

export default variations
