import { deprecatedAddAttributes } from './deprecated'

export const sizeAttributes = {
	width: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'number',
		default: '',
	},

	verticalAlign: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},
	horizontalAlign: {
		lmnResponsive: true,
		type: 'string',
		default: '',
	},

	margin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	padding: {
		lmnResponsive: true,
		lmnHover: true,
		lmnUnits: 'px',
		type: 'object',
	},
}

export const addSizeAttributes = ( attrObject, attrNameTemplate = '%s' ) => {
	deprecatedAddAttributes( attrObject, attrNameTemplate )

	attrObject.add( {
		attributes: sizeAttributes,
		attrNameTemplate,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	attrObject.add( {
		attributes: {
			height: {
				lmnResponsive: true,
				lmnUnits: 'px',
				type: 'string',
				default: '',
			},
		},
		attrNameTemplate,
		versionAdded: '3.16.0',
		versionDeprecated: '',
	} )
}
