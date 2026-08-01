export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			columnWidth: {
				lmnResponsive: true,
				/*
				 * A number in every unit but one. With the unit set to `custom`
				 * this holds what the author wrote — `calc(100% - 200px)` — so
				 * the type has to allow both or the block fails to parse.
				 */
				type: [ 'number', 'string' ],
				default: '',
			},
			/*
			 * The unit `columnWidth` is measured in.
			 *
			 * Empty means per cent, which is what every column written before
			 * this existed used — so leaving it empty produces byte-identical
			 * CSS to before and no saved post needs migrating.
			 *
			 * A fixed unit changes more than the suffix: see `column/style.js`,
			 * where the gap compensation and the count of columns sharing a row
			 * are both arithmetic that only means something for percentages.
			 */
			columnWidthUnit: {
				lmnResponsive: true,
				type: 'string',
				default: '',
			},
			// This is used to set the amount of column gap to compute for flex basis.
			columnAdjacentCount: {
				lmnResponsive: true,
				type: 'number',
				default: '',
			},
			columnWrapDesktop: {
				type: 'boolean',
				default: false,
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
