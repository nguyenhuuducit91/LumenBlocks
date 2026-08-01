import { addFilter } from '@wordpress/hooks'

addFilter( 'lumen.block-components.content-align.getContentAlignmentClasses', 'lumen/3_7_3', ( classes, attributes ) => {
	// We changed this to lmn--flex.
	classes[ 'lmn--fit-content' ] = attributes.columnFit
	return classes
} )

export const deprecatedAddAttributes = attrObject => {
	attrObject.add( {
		attributes: {
			// This has been removed, but still keep this for graceful deprecation.
			// Deprecation will trigger when columnFit is true.
			columnFit: {
				type: 'boolean',
				default: '',
			},
			// This is replaced with columnJustify.
			columnFitAlign: {
				type: 'string',
				default: '',
				lmnResponsive: true,
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
}
