/**
 * External dependencies
 */
import { addBorderAttributes } from '~lumen/features'
import { Link, Icon } from '../'
import { deprecatedAddAttributes } from './deprecated'

const buttonAttributes = {
	padding: {
		lmnResponsive: true,
		type: 'object',
		lmnUnits: 'px',
	},
	backgroundColorType: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		lmnHover: true,
		type: 'string',
		default: '', // button primary color.
	},
	minHeight: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	width: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	fullWidth: {
		type: 'boolean',
		default: '',
	},
	hoverEffect: {
		type: 'string',
		default: 'darken',
	},
}

export const addAttributes = ( attrObject, options = {} ) => {
	const {
		selector,
		attrNameTemplate = 'button%s',
	} = options

	deprecatedAddAttributes( attrObject, options )

	attrObject.add( {
		attributes: buttonAttributes,
		attrNameTemplate,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	addBorderAttributes( attrObject, attrNameTemplate )
	Link.addAttributes( attrObject, { selector } )
	Icon.addAttributes( attrObject )
}
