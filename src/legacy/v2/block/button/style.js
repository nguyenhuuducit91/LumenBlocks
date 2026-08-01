/**
 * External dependencies
 */
import {
	appendImportant,
	createButtonStyleSet,
	__getValue,
} from '~lumen/utils'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	const {
		showButton2 = false,
		showButton3 = false,
	} = props.attributes

	const contentAlign = getValue( 'contentAlign' )
	const tabletContentAlign = getValue( 'tabletContentAlign' )
	const mobileContentAlign = getValue( 'mobileContentAlign' )
	const justifyContent = contentAlign === 'left' ? 'flex-start'
		: contentAlign === 'right' ? 'flex-end'
			: contentAlign === 'center' ? 'center'
				: undefined
	const tabletJustifyContent = tabletContentAlign === 'left' ? 'flex-start !important'
		: tabletContentAlign === 'right' ? 'flex-end !important'
			: tabletContentAlign === 'center' ? 'center !important'
				: undefined
	const mobileJustifyContent = mobileContentAlign === 'left' ? 'flex-start !important'
		: mobileContentAlign === 'right' ? 'flex-end !important'
			: mobileContentAlign === 'center' ? 'center !important'
				: undefined

	const collapseOn = getValue( 'collapseOn' )
	const collapseOnTablet = collapseOn === 'tablet'
	const collapseOnMobile = !! collapseOn

	styles.push( {
		'.lmb-block-content': {
			justifyContent: appendImportant( justifyContent ),
		},
		'.lmb-block-content .lmb-button': {
			borderRadius: getValue( 'borderRadius', '%spx' ),
		},
		tablet: {
			'.lmb-block-content': {
				justifyContent: appendImportant( ! collapseOnTablet ? tabletJustifyContent : undefined ),
				// Collapse buttons in tablet.
				flexDirection: collapseOnTablet ? 'column' : undefined,
				alignItems: collapseOnTablet ? tabletJustifyContent || justifyContent : undefined,
			},
		},
		mobile: {
			'.lmb-block-content': {
				justifyContent: appendImportant( ! collapseOnMobile ? mobileJustifyContent : undefined ),
				// Collapse buttons in mobile.
				flexDirection: collapseOnMobile ? 'column' : undefined,
				alignItems: collapseOnMobile ? mobileJustifyContent || justifyContent : undefined,
			},
		},
	} )

	// styles.push( createButtonStyleSet = ( attrNameTemplate = '%s', mainClassName = '', blockAttributes = {} ) )
	styles.push( {
		...createButtonStyleSet( 'button1%s', 'lmb-button1', props.attributes ),
	} )
	if ( showButton2 ) {
		styles.push( {
			...createButtonStyleSet( 'button2%s', 'lmb-button2', props.attributes ),
		} )
	}
	if ( showButton3 ) {
		styles.push( {
			...createButtonStyleSet( 'button3%s', 'lmb-button3', props.attributes ),
		} )
	}

	return deepmerge.all( styles )
}

export default createStyles
