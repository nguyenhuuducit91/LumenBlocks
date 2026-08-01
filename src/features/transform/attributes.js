export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			transitionDuration: {
				type: 'number',
				default: '',
			},
			transformOrigin: {
				type: 'string',
				default: '',
			},
			transitionFunction: {
				type: 'string',
				default: '',
			},
			transform: {
				type: 'string',
				lmnHover: true,
				lmnResponsive: true,
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
