/**
 * External dependencies
 */
import classnames from 'classnames'

export const getButtonClasses = attributes => {
	return classnames( 'lmn-button', {
		[ `lmn--hover-effect-${ attributes.buttonHoverEffect }` ]: attributes.buttonHoverEffect,
	} )
}
