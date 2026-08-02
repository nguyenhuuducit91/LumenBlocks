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

export default {
	attributes: {
		uniqueId: 'a1b2c3d', hasBackground: false, hasBorders: false, hasContainer: true, effectAnimationOut: {}, effectAnimationIn: {}, customAttributes: [], displayCondition: {}, hideDesktop: false, hideTablet: false, hideMobile: false, blockLinkHasLink: true, blockLinkNewTab: false, blockLinkHasTitle: true, blockBackgroundCustomSizeUnit: '%', blockBackgroundCustomSizeUnitTablet: '%', blockBackgroundCustomSizeUnitMobile: '%', containerBackgroundCustomSizeUnit: '%', containerBackgroundCustomSizeUnitTablet: '%', containerBackgroundCustomSizeUnitMobile: '%',
	},
	innerBlocks: [
		{
			name: 'lumen/heading',
			attributes: {
				uniqueId: 'a1b2c3e', hasBackground: false, hasBorders: false, effectAnimationOut: {}, effectAnimationIn: {}, customAttributes: [], hideDesktop: false, hideTablet: false, hideMobile: false, displayCondition: {}, hasP: false, show: true, showText: true, text: __( 'Title for This Block', i18n ), textTag: 'h3', blockBackgroundCustomSizeUnit: '%', blockBackgroundCustomSizeUnitTablet: '%', blockBackgroundCustomSizeUnitMobile: '%', lineHeightUnit: 'em', lineHeightUnitTablet: 'em', lineHeightUnitMobile: 'em',
			},
			innerBlocks: [],
		},
		{
			name: 'lumen/text',
			attributes: {
				uniqueId: 'a1b2c3f', hasBackground: false, hasBorders: false, effectAnimationOut: {}, effectAnimationIn: {}, customAttributes: [], hideDesktop: false, hideTablet: false, hideMobile: false, displayCondition: {}, hasP: false, show: true, showText: true, text: __( 'Description for this block. Use this space for describing your block. Any text will do.', i18n ), blockBackgroundCustomSizeUnit: '%', blockBackgroundCustomSizeUnitTablet: '%', blockBackgroundCustomSizeUnitMobile: '%', lineHeightUnit: 'em', lineHeightUnitTablet: 'em', lineHeightUnitMobile: 'em',
			},
			innerBlocks: [],
		},
	],
}
