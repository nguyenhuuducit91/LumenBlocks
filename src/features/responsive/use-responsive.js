import classnames from 'classnames'

export const getResponsiveClasses = attributes => {
	return classnames( {
		'lmn--hide-desktop': attributes.hideDesktop,
		'lmn--hide-tablet': attributes.hideTablet,
		'lmn--hide-mobile': attributes.hideMobile,
	} )
}
