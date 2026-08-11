export const addAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			generatedCss: {
				type: 'string',
				source: 'html',
				/*
				 * The `:not()` outlives the feature it was written for.
				 *
				 * Per-block custom CSS has been removed, so nothing writes a
				 * `style.lmn-custom-css` any more — but a post saved before it
				 * was removed still contains one, and this selector is what
				 * reads the generated CSS back out of saved markup. Dropping
				 * the exclusion would make those old blocks parse a stylesheet
				 * they did not have into `generatedCss`, and a block whose
				 * attributes no longer match its markup is an invalid block.
				 */
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
