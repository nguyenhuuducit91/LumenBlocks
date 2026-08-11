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
import { version as VERSION } from 'lumen'
import { DEFAULT_SVG } from './util'

export const iconListAttributes = {
	// Columns.
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
		default: false,
	},
	indentation: {
		type: 'number',
		default: '',
	},
	listAlignment: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	listDisplayStyle: {
		type: 'string',
		default: '',
	},
	listFullWidth: {
		type: 'boolean',
		default: true,
	},

	// Icon.
	icon: {
		type: 'string',
		default: DEFAULT_SVG,
	},
	markerColor: {
		type: 'string',
		default: '',
		lmnHover: true,
	},
	icons: {
		type: 'object',
		default: {},
	},
	iconSize: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	iconOpacity: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	iconRotation: {
		type: 'number',
		default: '',
	},
	iconVerticalAlignment: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	iconVerticalOffset: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},

	// Numbers.
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
	hasPeriod: {
		type: 'boolean',
		default: true,
	},

	// List item borders.
	listItemBorderStyle: {
		type: 'string',
		default: '',
	},
	listItemBorderWidth: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	listItemBorderColor: {
		type: 'string',
		default: '',
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
	} )
	MarginBottom.addAttributes( attrObject )

	attrObject.add( {
		attributes: iconListAttributes,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
	attrObject.add( {
		attributes: {
			useCustomIconColor: {
				type: 'boolean',
				default: false,
			},
		},
		versionAdded: '3.14.4',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}
export default attributes( VERSION )
