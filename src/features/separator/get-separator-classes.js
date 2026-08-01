/**
 * External dependencies
 */
import classnames from 'classnames'

export const getSeparatorClasses = attributes => {
	return classnames( {
		'lmn-has-top-separator': attributes.topSeparatorShow,
		'lmn-has-bottom-separator': attributes.bottomSeparatorShow,
	} )
}
