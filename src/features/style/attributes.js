export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			generatedCss: {
				type: 'string',
				source: 'html',
				selector:
					`.lmn-block > style:not(.lmn-custom-css),
					 .lmn-block > * > style:not(.lmn-custom-css)`,
				default: '',
			},
		},
		versionAdded: '3.0.3',
		versionDeprecated: '',
	} )
}
