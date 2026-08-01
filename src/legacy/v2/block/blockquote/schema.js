/**
 * Internal dependencies
 */
import './design'

/**
 * External dependencies
 */
import {
	createAllCombinationAttributes,
	createTypographyAttributes,
	createResponsiveAttributes,
	createBorderAttributes,
} from '~lumen/utils'
import {
	createBackgroundAttributes,
} from '../../util'

export default {
	design: {
		type: 'string',
		default: 'plain',
	},
	borderRadius: {
		type: 'number',
		default: '',
	},
	shadow: {
		type: 'number',
		default: '',
	},

	// Container.
	...createBackgroundAttributes( 'container%s' ),

	// Border.
	...createBorderAttributes( 'column%s' ),

	// Quote.
	showQuote: {
		type: 'boolean',
		default: true,
	},
	quoteIcon: {
		type: 'string',
		default: 'round-thin',
	},
	quoteOpacity: {
		type: 'number',
		default: '',
	},
	quoteColor: {
		type: 'string',
		default: '',
	},
	quoteSize: {
		type: 'number',
		default: 70,
	},
	...createAllCombinationAttributes(
		'quote%s%s', {
			type: 'number',
			default: '',
		},
		[ '', 'Tablet', 'Mobile' ],
		[ 'X', 'Y' ]
	),

	// Text.
	text: {
		source: 'html',
		selector: '.lmb-blockquote__text',
		default: '',
	},
	...createTypographyAttributes( 'text%s' ),
	textColor: {
		type: 'string',
		default: '',
	},
	...createResponsiveAttributes( 'text%sAlign', {
		type: 'string',
		default: '',
	} ),
}
