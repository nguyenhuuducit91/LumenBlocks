/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	createAllCombinationAttributes,
	createIconAttributes,
	createResponsiveAttributes,
	createTypographyAttributes,
} from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export default {
	columns: {
		type: 'number',
		default: 1,
	},
	alignment: {
		type: 'string',
		default: 'center',
	},

	// Icons.
	icon1: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item1 .lmb-icon-inner-svg',
		default: 'far-star',
	},
	icon2: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item2 .lmb-icon-inner-svg',
		default: 'far-circle',
	},
	icon3: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item3 .lmb-icon-inner-svg',
		default: 'far-square',
	},
	icon4: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item4 .lmb-icon-inner-svg',
		default: 'far-heart',
	},
	icon5: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item5 .lmb-icon-inner-svg',
		default: 'far-arrow-alt-circle-up',
	},
	icon6: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item6 .lmb-icon-inner-svg',
		default: 'far-times-circle',
	},
	icon7: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item7 .lmb-icon-inner-svg',
		default: 'far-check-circle',
	},
	icon8: {
		type: 'string',
		source: 'html',
		selector: '.lmb-icon__item8 .lmb-icon-inner-svg',
		default: 'far-question-circle',
	},
	...createIconAttributes( 'icon%s' ),

	// Links.
	...createAllCombinationAttributes(
		'Url%s', {
			type: 'string',
			source: 'attribute',
			selector: '.lmb-icon__item%s .lmb-icon__icon',
			attribute: 'href',
			default: '',
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),
	...createAllCombinationAttributes(
		'NewTab%s', {
			type: 'boolean',
			source: 'attribute',
			selector: '.lmb-icon__item%s .lmb-icon__icon',
			attribute: 'target',
			default: '',
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),
	...createAllCombinationAttributes(
		'NoFollow%s', {
			type: 'boolean',
			default: '',
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),
	...createAllCombinationAttributes(
		'Sponsored%s', {
			type: 'boolean',
			default: '',
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),
	...createAllCombinationAttributes(
		'Ugc%s', {
			type: 'boolean',
			default: '',
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),

	// Title.
	showTitle: {
		type: 'boolean',
		default: false,
	},
	titleTop: {
		type: 'boolean',
		default: false,
	},
	...createAllCombinationAttributes(
		'Title%s', {
			type: 'string',
			source: 'html',
			selector: '.lmb-icon__item%s .lmb-icon__title',
			default: __( 'Title', i18n ),
		},
		[ '1', '2', '3', '4', '5', '6', '7', '8' ]
	),
	titleTag: {
		type: 'string',
		default: '',
	},
	...createTypographyAttributes( 'title%s' ),
	titleColor: {
		type: 'string',
		default: '',
	},

	// Spacing.
	...createResponsiveAttributes( 'icon%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'title%sBottomMargin', {
		type: 'number',
		default: '',
	} ),

	// Alignment
	...createAllCombinationAttributes(
		'%s%sAlign', {
			type: 'string',
			default: '',
		},
		[ 'Icon', 'Title' ],
		[ '', 'Tablet', 'Mobile' ]
	),

	hoverEffect: {
		type: 'string',
		default: '',
	},
}
