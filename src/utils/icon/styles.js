/**
 * Internal dependencies
 */
import {
	__getValue, appendImportant, clampInheritedStyle,
} from '../styles'

/**
 * External dependencies
 */
import { camelCase } from 'lodash'
import deepmerge from 'deepmerge'

/**
 * WordPress dependencies
 */
import { sprintf } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

/**
 * Generates button styles
 *
 * @param {string} attrNameTemplate Template name where to get the attributes from
 * @param {string} mainClassName The classname that will be used for the CSS generation
 * @param {Object} blockAttributes The attributes of the block
 *
 * @return {Object} CSS Styles object
 */
export const createIconStyleSet = ( attrNameTemplate = '%s', mainClassName = '', blockAttributes = {} ) => {
	const getAttrName = attrName => camelCase( sprintf( attrNameTemplate, attrName ) )
	const getValue = __getValue( blockAttributes, getAttrName )

	const styles = []

	const clampedTabletSize = clampInheritedStyle( getValue( 'Size' ), { max: 200 } )
	const clampedMobileSize = clampInheritedStyle( getValue( 'Size' ), { max: 200 } )

	styles.push( {
		[ `.${ mainClassName } .lmb-icon-inner-svg, .${ mainClassName } .lmb-icon-inner-svg svg` ]: {
			width: appendImportant( getValue( 'Size', '%spx' ) ),
			height: appendImportant( getValue( 'Size', '%spx' ) ),
		},
		tabletOnly: {
			[ `.${ mainClassName } .lmb-icon-inner-svg, .${ mainClassName } .lmb-icon-inner-svg svg` ]: {
				width: appendImportant( getValue( 'TabletSize', '%spx' ) || ( clampedTabletSize && `${ clampedTabletSize }px` ) ),
				height: appendImportant( getValue( 'TabletSize', '%spx' ) || ( clampedMobileSize && `${ clampedMobileSize }px` ) ),
			},
		},
		mobile: {
			[ `.${ mainClassName } .lmb-icon-inner-svg, .${ mainClassName } .lmb-icon-inner-svg svg` ]: {
				width: appendImportant( getValue( 'MobileSize', '%spx' ) || ( clampedTabletSize && `${ clampedTabletSize }px` ) ),
				height: appendImportant( getValue( 'MobileSize', '%spx' ) || ( clampedMobileSize && `${ clampedMobileSize }px` ) ),
			},
		},
		[ `.${ mainClassName } .lmb-icon-inner-svg` ]: {
			color: appendImportant( getValue( 'Color' ) ),
			transform: appendImportant( getValue( 'Rotation', 'rotate(%sdeg)' ) ),
		},
		saveOnly: {
			[ `.${ mainClassName } .lmb-icon-inner-svg, .${ mainClassName } .lmb-icon-inner-svg svg *` ]: {
				color: appendImportant( getValue( 'Color' ) ),
				fill: appendImportant( getValue( 'Color' ) ),
			},
		},
		editor: {
			[ `.${ mainClassName } .lmb-icon-inner-svg, .${ mainClassName } .lmb-icon-inner-svg svg path, .${ mainClassName } .lmb-icon-inner-svg svg g, .${ mainClassName } .lmb-icon-inner-svg svg shape, .${ mainClassName } .lmb-icon-inner-svg svg circle, .${ mainClassName } .lmb-icon-inner-svg svg path, .${ mainClassName } .lmb-icon-inner-svg svg rect, .${ mainClassName } .lmb-icon-inner-svg svg polygon, .${ mainClassName } .lmb-icon-inner-svg svg ellipse` ]: {
				color: appendImportant( getValue( 'Color' ) ),
				fill: appendImportant( getValue( 'Color' ) ),
			},
		},
		[ `.${ mainClassName }` ]: {
			opacity: appendImportant( getValue( 'Opacity' ) ),
		},
	} )

	if ( getValue( 'Design' ) === 'shaped' || getValue( 'Design' ) === 'outlined' ) {
		styles.push( {
			[ `.${ mainClassName } .lmb-icon__design-wrapper` ]: {
				borderRadius: appendImportant( getValue( 'BorderRadius', '%s%', '100%' ) ),
				padding: appendImportant( getValue( 'Padding', '%spx' ) ),
			},
		} )
	}

	if ( getValue( 'Design' ) === 'shaped' ) {
		styles.push( {
			[ `.${ mainClassName } .lmb-icon__design-wrapper` ]: {
				background: appendImportant( getValue( 'BackgroundColor' ) ),
			},
		} )
	}
	if ( getValue( 'Design' ) === 'outlined' ) {
		styles.push( {
			[ `.${ mainClassName } .lmb-icon__design-wrapper` ]: {
				borderColor: appendImportant( getValue( 'BackgroundColor' ) ),
				borderWidth: appendImportant( getValue( 'OutlineWidth', '%spx' ) ),
			},
		} )
	}

	return deepmerge.all( applyFilters( 'lumen.icon-style-set.styles', styles, getValue, mainClassName, blockAttributes ) )
}
