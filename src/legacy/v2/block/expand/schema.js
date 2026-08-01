/**
 * External dependencies
 */
import {
	createAllCombinationAttributes,
	createTypographyAttributes,
} from '~lumen/utils'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export default {
	// Title.
	title: {
		source: 'html',
		selector: '.lmb-expand__title',
		default: '',
	},
	showTitle: {
		type: 'boolean',
		default: true,
	},
	titleTag: {
		type: 'string',
		default: '',
	},
	...createTypographyAttributes( 'title%s' ),
	titleColor: {
		type: 'string',
		default: '',
	},

	// Text.
	text: {
		source: 'html',
		selector: '.lmb-expand__less-text',
		multiline: 'p',
		default: '',
	},
	moreText: {
		source: 'html',
		selector: '.lmb-expand__more-text',
		multiline: 'p',
		default: '',
	},
	...createTypographyAttributes( 'text%s' ),
	textColor: {
		type: 'string',
		default: '',
	},

	// Link.
	moreLabel: {
		source: 'html',
		selector: '.lmb-expand__more-toggle-text',
		default: __( 'Show more', i18n ),
	},
	lessLabel: {
		source: 'html',
		selector: '.lmb-expand__less-toggle-text',
		default: __( 'Show less', i18n ),
	},
	...createTypographyAttributes( 'link%s' ),
	linkColor: {
		type: 'string',
		default: '',
	},

	// Alignments.
	...createAllCombinationAttributes(
		'%s%sAlign', {
			type: 'string',
			default: '',
		},
		[ 'Title', 'Text', 'Link' ],
		[ '', 'Tablet', 'Mobile' ]
	),

	// Spacing.
	...createAllCombinationAttributes(
		'%s%sBottomMargin', {
			type: 'number',
			default: '',
		},
		[ 'Title', 'Text', 'Link' ],
		[ '', 'Tablet', 'Mobile' ]
	),
}
