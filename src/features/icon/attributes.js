/**
 * External dependencies
 */
import { range } from 'lodash'

const iconAttributes = {
	icon: {
		type: 'string',
		default: '',
	},
	icon2: { // Some parent blocks may have use for this second icon. By default this is rendered in the save output as a hidden SVG.
		type: 'string',
		default: '',
	},
	iconColorType: {
		type: 'string',
		default: '',
	},
	...( range( 1, 11 ).reduce( ( acc, curr ) => {
		return {
			...acc,
			[ `iconColor${ curr }` ]: {
				lmnHover: true,
				type: 'string',
				default: '',
			},
			[ `iconOpacity${ curr }` ]: {
				lmnHover: true,
				type: 'number',
				default: '',
			},
		}
	}, {} ) ),
	iconColorGradientDirection: {
		type: 'number',
		default: '',
	},
	iconOpacity: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	iconRotation: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	iconPosition: {
		type: 'string',
		default: '',
	},
	iconGap: {
		type: 'number',
		default: '',
	},
	shapeColorType: {
		type: 'string',
		default: '',
	},
	shapeColor1: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	shapeColor2: {
		type: 'string',
		default: '',
	},
	shapeColorGradientDirection: {
		type: 'number',
		default: '',
	},
	shapeBorderRadius: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	shapePadding: {
		type: 'number',
		default: '',
	},
	showBackgroundShape: {
		type: 'boolean',
		default: false,
	},
	backgroundShape: {
		type: 'string',
		default: '',
	},
	backgroundShapeColor: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	backgroundShapeOpacity: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	backgroundShapeSize: {
		type: 'number',
		default: '',
	},
	backgroundShapeOffsetHorizontal: {
		type: 'number',
		default: '',
	},
	backgroundShapeOffsetVertical: {
		type: 'number',
		default: '',
	},
	shapeOutlineColor: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	iconSize: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	shapeOutlineWidth: {
		lmnResponsive: true,
		type: 'object',
	},
}

export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: iconAttributes,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
