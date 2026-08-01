import { deprecatedAddAttributes } from './deprecated'

export const borderAttributes = {
	borderType: {
		type: 'string',
		default: '',
	},
	borderColor: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	borderWidth: {
		lmnResponsive: true,
		lmnHover: true,
		type: 'object',
	},
	borderRadius: {
		lmnResponsive: true,
		lmnHover: true,
		type: 'number',
		default: '',
	},
	borderRadius2: {
		lmnResponsive: true,
		lmnHover: true,
		type: 'object',
	},
	shadow: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
}

export const addBorderAttributes = ( attrObject, attrNameTemplate = '%s' ) => {
	deprecatedAddAttributes( attrObject, attrNameTemplate )

	attrObject.add( {
		attributes: borderAttributes,
		attrNameTemplate,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
