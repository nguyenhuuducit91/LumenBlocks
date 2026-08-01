/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import classnames from 'classnames'

export const getContentAlignmentClasses = ( attributes, blockName = 'column', instanceId = '' ) => {
	let instanceIdString = ''
	if ( instanceId ) {
		instanceIdString = `${ instanceId }-`
	}

	return classnames(
		'lmn-content-align',
		`lmn-${ attributes.uniqueId }-${ instanceIdString }${ blockName }`,
		applyFilters( 'lumen.block-components.content-align.getContentAlignmentClasses', {
			'lmn--flex': attributes.columnJustify,
			alignwide: attributes.innerBlockContentAlign === 'alignwide', // This will align the columns inside.
			alignfull: attributes.innerBlockContentAlign === 'alignfull', // This will align the columns inside.
		}, attributes ) )
}
