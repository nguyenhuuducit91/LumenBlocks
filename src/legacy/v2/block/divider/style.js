/**
 * External dependencies
 */
import {
	appendImportant,
	marginLeftAlign,
	marginRightAlign,
	__getValue,
} from '~lumen/utils'
import deepmerge from 'deepmerge'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	const {
		design = 'basic',
		contentAlign = '',
		tabletContentAlign = '',
		mobileContentAlign = '',
	} = props.attributes

	styles.push( {
		'.lmb-block-content': {
			marginTop: appendImportant( getValue( 'hrMarginTop', '%spx' ) ),
			marginBottom: appendImportant( getValue( 'hrMarginBottom', '%spx' ) ),
		},
	} )

	if ( design === 'basic' || design === 'bar' ) {
		styles.push( {
			'hr.lmb-divider__hr': {
				backgroundColor: appendImportant( getValue( 'color' ) ),
				height: appendImportant( getValue( 'height', '%spx' ) ),
				width: appendImportant( getValue( 'width', '%s%' ) ),
				marginLeft: appendImportant( marginLeftAlign( contentAlign ) ),
				marginRight: appendImportant( marginRightAlign( contentAlign ) ),
				borderRadius: design === 'bar' ? appendImportant( getValue( 'height', 'calc(%spx / 2)' ) ) : undefined,
			},
			tablet: {
				'hr.lmb-divider__hr': {
					marginLeft: appendImportant( tabletContentAlign !== '' ? marginLeftAlign( tabletContentAlign ) : undefined ),
					marginRight: appendImportant( tabletContentAlign !== '' ? marginRightAlign( tabletContentAlign ) : undefined ),
				},
			},
			mobile: {
				'hr.lmb-divider__hr': {
					marginLeft: appendImportant( mobileContentAlign !== '' ? marginLeftAlign( mobileContentAlign ) : undefined ),
					marginRight: appendImportant( mobileContentAlign !== '' ? marginRightAlign( mobileContentAlign ) : undefined ),
				},
			},
		} )
	}

	if ( design === 'dots' || design === 'asterisks' ) {
		styles.push( {
			'.lmb-divider__dots': {
				width: appendImportant( getValue( 'width', '%s%' ) ),
				marginLeft: appendImportant( marginLeftAlign( contentAlign ) ),
				marginRight: appendImportant( marginRightAlign( contentAlign ) ),
			},
			'.lmb-divider__dot': {
				backgroundColor: design === 'dots' ? appendImportant( getValue( 'color' ) ) : undefined,
				height: appendImportant( getValue( 'height', '%spx' ) ),
				width: appendImportant( getValue( 'height', '%spx' ) ),
			},
			tablet: {
				'.lmb-divider__dots': {
					marginLeft: appendImportant( tabletContentAlign !== '' ? marginLeftAlign( tabletContentAlign ) : undefined ),
					marginRight: appendImportant( tabletContentAlign !== '' ? marginRightAlign( tabletContentAlign ) : undefined ),
				},
			},
			mobile: {
				'.lmb-divider__dots': {
					marginLeft: appendImportant( mobileContentAlign !== '' ? marginLeftAlign( mobileContentAlign ) : undefined ),
					marginRight: appendImportant( mobileContentAlign !== '' ? marginRightAlign( mobileContentAlign ) : undefined ),
				},
			},
		} )
	}

	if ( design === 'asterisks' ) {
		styles.push( {
			'.lmb-divider__dot:before': {
				color: getValue( 'color' ),
				fontSize: getValue( 'height', 'calc(%spx * 1.8)' ),
			},
		} )
	}

	return deepmerge.all( styles )
}

export default createStyles
