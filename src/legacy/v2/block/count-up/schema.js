
/**
 * External dependencies
 */
import {
	createAllCombinationAttributes,
	createResponsiveAttributes,
	createTypographyAttributes,
	createIconAttributes,
	createBorderAttributes,
} from '~lumen/utils'
import {
	createBackgroundAttributes,
} from '../../util'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { i18n } from 'lumen'

export default {
	title1: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(1) .lmb-countup__title',
		default: __( 'Title', i18n ),
	},
	title2: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(2) .lmb-countup__title',
		default: __( 'Title', i18n ),
	},
	title3: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(3) .lmb-countup__title',
		default: __( 'Title', i18n ),
	},
	title4: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(4) .lmb-countup__title',
		default: __( 'Title', i18n ),
	},
	countText1: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(1) .lmb-countup__counter',
		default: '$99.99',
	},
	countText2: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(2) .lmb-countup__counter',
		default: '1,234',
	},
	countText3: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(3) .lmb-countup__counter',
		default: '1,234.56',
	},
	countText4: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(4) .lmb-countup__counter',
		default: '£99.99',
	},
	description1: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(1) .lmb-countup__description',
		default: __( 'Description', i18n ),
	},
	description2: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(2) .lmb-countup__description',
		default: __( 'Description', i18n ),
	},
	description3: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(3) .lmb-countup__description',
		default: __( 'Description', i18n ),
	},
	description4: {
		source: 'html',
		selector: '.lmb-countup__item:nth-of-type(4) .lmb-countup__description',
		default: __( 'Description', i18n ),
	},

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
	columns: {
		type: 'number',
		default: 2,
	},

	// Column.
	...createBackgroundAttributes( 'column%s' ),

	// Border.
	...createBorderAttributes( 'column%s' ),

	// Spacing.
	...createResponsiveAttributes( 'icon%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'title%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'number%sBottomMargin', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( 'description%sBottomMargin', {
		type: 'number',
		default: '',
	} ),

	// Icon.
	showIcon: {
		type: 'boolean',
		default: false,
	},
	icon1: {
		type: 'string',
		source: 'html',
		selector: '.lmb-countup__item1 .lmb-icon-inner-svg,' +
			// This one is for backward compatibility <= 2.6.
			'.lmb-countup__item1 .lmb-countup__icon:not(.lmb-countup__icon--v2)',
		default: 'fas-cogs',
	},
	icon2: {
		type: 'string',
		source: 'html',
		selector: '.lmb-countup__item2 .lmb-icon-inner-svg,' +
			// This one is for backward compatibility <= 2.6.
			'.lmb-countup__item2 .lmb-countup__icon:not(.lmb-countup__icon--v2)',
		default: 'fas-hands-helping',
	},
	icon3: {
		type: 'string',
		source: 'html',
		selector: '.lmb-countup__item3 .lmb-icon-inner-svg,' +
			// This one is for backward compatibility <= 2.6.
			'.lmb-countup__item3 .lmb-countup__icon:not(.lmb-countup__icon--v2)',
		default: 'fas-envelope',
	},
	icon4: {
		type: 'string',
		source: 'html',
		selector: '.lmb-countup__item4 .lmb-icon-inner-svg,' +
			// This one is for backward compatibility <= 2.6.
			'.lmb-countup__item4 .lmb-countup__icon:not(.lmb-countup__icon--v2)',
		default: 'fas-globe-americas',
	},
	...createIconAttributes( 'icon%s' ),

	// Number.
	showNumber: {
		type: 'boolean',
		default: true,
	},
	...createTypographyAttributes( 'number%s' ),
	numberColor: {
		type: 'string',
		default: '',
	},

	// Title.
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

	// Description.
	showDescription: {
		type: 'boolean',
		default: true,
	},
	...createTypographyAttributes( 'description%s' ),
	descriptionColor: {
		type: 'string',
		default: '',
	},

	...createAllCombinationAttributes(
		'%s%sAlign', {
			type: 'string',
			default: '',
		},
		[ 'Icon', 'Number', 'Title', 'Description' ],
		[ '', 'Tablet', 'Mobile' ]
	),

	// Individual column colors.
	...createAllCombinationAttributes(
		'Column%s%sColor', {
			type: 'string',
			default: '',
		},
		[ '1', '2', '3', '4' ],
		[ 'Background', 'Icon' ]
	),
}
