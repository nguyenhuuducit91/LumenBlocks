export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			htmlTag: {
				type: 'string',
				default: '',
			},
			opacity: {
				lmnResponsive: true,
				lmnHover: true,
				type: 'number',
				default: '',
			},
			zIndex: {
				lmnResponsive: true,
				type: 'number',
				default: '',
			},
			overflow: {
				lmnResponsive: true,
				type: 'string',
				default: '',
			},
			clear: {
				type: 'string',
				default: '',
			},
			position: {
				lmnResponsive: true,
				type: 'string',
				default: '',
			},
			positionNum: {
				lmnUnits: 'px',
				lmnResponsive: true,
				lmnHover: true,
				type: 'object',
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
