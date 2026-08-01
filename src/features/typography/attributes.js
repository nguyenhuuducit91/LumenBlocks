import { deprecatedAddAttributes } from './deprecated'

const typographyAttributes = {
	lineHeight: {
		lmnResponsive: true,
		type: 'number',
		default: '',
		lmnUnits: 'em',
	},
	fontFamily: {
		type: 'string',
		default: '',
	},
	fontStyle: {
		type: 'string',
		default: '',
	},
	fontWeight: {
		type: 'string',
		default: '',
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	letterSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	textColorType: {
		type: 'string',
		default: '',
	},
	textColorClass: {
		type: 'string',
		default: '',
	},
	textColor1: {
		type: 'string',
		lmnHover: true,
		default: '',
	},
	textShadow: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	textAlign: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	hasP: {
		type: 'boolean',
		default: false,
	},
}

export const addAttributes = ( attrObject, selector = '.lmn-content', options = {} ) => {
	const {
		hasTextTag = true,
		hasTextContent = true,
		defaultTextTag = 'p',
		attrNameTemplate = '%s',
		multiline,
		defaultText = '',
		multilineWrapperTags: __unstableMultilineWrapperTags,
	} = options

	deprecatedAddAttributes( attrObject, options )

	attrObject.add( {
		attributes: {
			...typographyAttributes,
			// TODO:Add 'show' attribute if attributeNameTemplate is not the default
			...( hasTextContent ? {
				showText: {
					type: 'boolean',
					default: true,
				},
				text: {
					source: 'html',
					selector,
					multiline,
					default: defaultText,
					__unstableMultilineWrapperTags,
					/**
					 * Starting from WP 6.9, the toolbar gets hidden when the text block is set as the default block.
					 * Setting the role to 'content' will prevent the toolbar from being hidden.
					 * see https://github.com/WordPress/gutenberg/pull/70897
					 */
					role: 'content',
					__experimentalRole: 'content',
				},
			} : {} ),
			...( hasTextTag ? {
				textTag: {
					type: 'string',
					default: defaultTextTag,
				},
			} : {} ),
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
		attrNameTemplate,
	} )

	attrObject.add( {
		attributes: {
			fontSize: {
				lmnResponsive: true,
				type: 'string',
				default: '',
				lmnUnits: 'px',
			},
		},
		versionAdded: '3.16.0',
		versionDeprecated: '',
		attrNameTemplate,
	} )
}
