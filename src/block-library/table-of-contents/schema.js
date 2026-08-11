import {
	Advanced,
	BlockDiv,
	Style,
	CustomAttributes,
	EffectsAnimations,
	Responsive,
	Typography,
	MarginBottom,
	Alignment,
	Transform,
	ConditionalDisplay,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION, i18n } from 'lumen'
import { __ } from '@wordpress/i18n'

export const tableofContentsAttributes = {
	// Used to generate a simple example
	// @see example.js
	example: {
		type: 'html',
	},

	// Columns.
	isSmoothScroll: {
		type: 'boolean',
		default: '',
	},
	columns: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	columnGap: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	ordered: {
		type: 'boolean',
		default: '',
	},
	indentation: {
		type: 'number',
		default: '',
	},

	// Bullets and Numbers.
	listType: {
		type: 'string',
		default: '',
	},
	iconGap: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	rowGap: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},

	// Headings
	// { level, customText, isExcluded }
	headings: {
		type: 'array',
		default: [],
	},
	includeH1: {
		type: 'boolean',
		default: false,
	},
	includeH2: {
		type: 'boolean',
		default: true,
	},
	includeH3: {
		type: 'boolean',
		default: true,
	},
	includeH4: {
		type: 'boolean',
		default: true,
	},
	includeH5: {
		type: 'boolean',
		default: true,
	},
	includeH6: {
		type: 'boolean',
		default: true,
	},
}

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Typography.addAttributes( attrObject, 'ul,ol', {
		hasTextTag: false,
		multiline: 'li',
		multilineWrapperTags: [ 'ol', 'ul' ],
	} )
	MarginBottom.addAttributes( attrObject )

	attrObject.add( {
		attributes: tableofContentsAttributes,
		versionAdded: '3.2.0',
		versionDeprecated: '',
	} )

	attrObject.addDefaultValues( {
		attributes: {
			htmlTag: 'nav',
		},
		versionAdded: '3.2.0',
		versionDeprecated: '',
	} )

	//Does not generate titleShow, generates titleShowText. That is why we added titleShow manually below
	Typography.addAttributes( attrObject, '.lmn-table-of-contents__title', {
		hasTextTag: false,
		hasTextContent: true,
		attrNameTemplate: 'title%s',
		defaultText: __( 'Table of Contents', i18n ),
	} )

	attrObject.add( {
		attributes: {
			titleShow: {
				type: 'boolean',
				default: true,
			},
		},
		versionAdded: '3.6.3',
		versionDeprecated: '',
	} )

	attrObject.add( {
		attributes: {
			scrollTopOffset: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
		},
		versionAdded: '3.19.3',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}
export default attributes( VERSION )
