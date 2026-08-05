/**
 * The example of this block to show in the inserter.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const heading = ( uniqueId, text ) => ( {
	name: 'lumen/heading',
	attributes: {
		uniqueId, hasBackground: false, hasBorders: false, effectAnimationOut: {}, effectAnimationIn: {}, customAttributes: [], hideDesktop: false, hideTablet: false, hideMobile: false, displayCondition: {}, hasP: false, show: true, showText: true, text, textTag: 'h4', blockBackgroundCustomSizeUnit: '%', blockBackgroundCustomSizeUnitTablet: '%', blockBackgroundCustomSizeUnitMobile: '%', lineHeightUnit: 'em', lineHeightUnitTablet: 'em', lineHeightUnitMobile: 'em',
	},
	innerBlocks: [],
} )

export default {
	attributes: {
		uniqueId: 'm4rqu33', hasBackground: false, hasBorders: false, marqueePauseOnHover: true, marqueeDuration: 20, effectAnimationOut: {}, effectAnimationIn: {}, customAttributes: [], displayCondition: {}, hideDesktop: false, hideTablet: false, hideMobile: false, blockBackgroundCustomSizeUnit: '%', blockBackgroundCustomSizeUnitTablet: '%', blockBackgroundCustomSizeUnitMobile: '%',
	},
	innerBlocks: [
		heading( 'm4rqu34', __( 'Free shipping', i18n ) ),
		heading( 'm4rqu35', __( 'Thirty day returns', i18n ) ),
		heading( 'm4rqu36', __( 'Made to order', i18n ) ),
	],
}
