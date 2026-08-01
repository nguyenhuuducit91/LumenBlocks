export const flexGapAttributes = {
	columnGap: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	rowGap: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
}

export const addFlexGapAttributes = ( attrObject, attrNameTemplate = '%s' ) => {
	attrObject.add( {
		attributes: flexGapAttributes,
		attrNameTemplate,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
