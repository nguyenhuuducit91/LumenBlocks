/**
 * External Dependencies
 */
import classnames from 'classnames'

export const getRowClasses = attributes => {
	return classnames( [
		'lmn-row',
	], {
		[ `lmn-columns-${ attributes.numInnerBlocks }` ]: attributes.numInnerBlocks && attributes.numInnerBlocks > 1,
	} )
}
