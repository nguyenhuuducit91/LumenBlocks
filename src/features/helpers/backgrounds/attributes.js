import { deprecatedAddAttributes } from './deprecated'

export const backgroundAttributes = {
	backgroundColorType: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	backgroundMediaId: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundMediaUrl: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundMediaThumbnailId: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundMediaThumbnailUrl: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundGradientBlendMode: {
		type: 'string',
		default: '',
	},
	backgroundPosition: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundRepeat: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundSize: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	backgroundImageBlendMode: {
		type: 'string',
		default: '',
	},
	backgroundTintStrength: {
		lmnHover: true,
		type: 'number',
		default: '',
	},
	backgroundCustomSize: {
		lmnResponsive: true,
		lmnUnits: '%',
		type: 'number',
		default: '',
	},
	fixedBackground: {
		type: 'boolean',
		default: '',
	},
	backgroundMediaExternalUrl: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
}

export const addBackgroundAttributes = ( attrObject, attrNameTemplate = '%s' ) => {
	deprecatedAddAttributes( attrObject, attrNameTemplate )

	attrObject.add( {
		attributes: backgroundAttributes,
		attrNameTemplate,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}

