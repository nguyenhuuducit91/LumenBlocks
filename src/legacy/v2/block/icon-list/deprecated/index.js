/**
 * Internal dependencies
 */
import { getIconSVGBase64, getIconSVG } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import { svgRenderToString } from '~lumen/utils'

/**
 * External dependencies
 */
import classnames from 'classnames'

export const deprecatedIcon_2_9_1 = ( () => {
	const returnObject = {}
	const icons = [ 'check', 'plus', 'arrow', 'cross', 'star' ]

	icons.forEach( icon => {
		[ '', 'circle', 'outline' ].forEach( iconShape => {
			returnObject[ `${ icon }-${ iconShape || 'default' }` ] = svgRenderToString( getIconSVG( icon, iconShape ) )
		} )
	} )

	return returnObject
} )()

const deprecatedSave_1_15_4 = props => {
	const { className } = props
	const {
		icon,
		iconShape,
		iconColor,
		iconSize,
		text,
		columns,
		gap,
		design = '',
	} = props.attributes

	const mainClasses = classnames( [
		className.split( ' ' ).filter( name => name !== 'lmb-icon-list' ),
		'lmb-icon-list-wrapper',
	], applyFilters( 'lumen.icon-list.mainclasses_1_15_4', {}, design, props ) )

	const ulClasses = classnames( [
		'lmb-icon-list',
		`lmb-icon--icon-${ icon }`,
		`lmb-icon--columns-${ columns }`,
	], applyFilters( 'lumen.icon-list.ulclasses_1_15_4', {}, design, props ) )

	const iconSVGString = getIconSVGBase64( icon, iconShape, iconColor )
	const style = {
		'--icon': 'url(\'data:image/svg+xml;base64,' + iconSVGString + '\')',
		'--icon-size': iconSize ? `${ iconSize }px` : undefined,
		'--gap': gap ? `${ gap }px` : undefined,
	}

	return (
		<div className={ mainClasses }>
			{ applyFilters( 'lumen.icon-list.save.output.before_1_15_4', null, design, props ) }
			<RichText.Content
				tagName="ul"
				className={ ulClasses }
				style={ style }
				value={ text }
			/>
			{ applyFilters( 'lumen.icon-list.save.output.after_1_15_4', null, design, props ) }
		</div>
	)
}

export const deprecatedSchema_1_15_4 = {
	icon: {
		type: 'string',
		default: 'check',
	},
	iconShape: {
		type: 'string',
	},
	iconColor: {
		type: 'string',
	},
	iconSize: {
		type: 'number',
		default: 20,
	},
	columns: {
		type: 'number',
		default: 1,
	},
	text: {
		source: 'html',
		selector: 'ul',
		multiline: 'li',
		default: '',
	},
	gap: {
		type: 'number',
		default: 16,
	},

	// Custom CSS attributes.
	customCSSUniqueID: {
		type: 'string',
		default: '',
	},
	customCSS: {
		type: 'string',
		default: '',
	},
	customCSSCompiled: {
		type: 'string',
		default: '',
	},
}

const deprecatedSave_1_13_3 = props => {
	const { className } = props
	const {
		icon,
		iconShape,
		iconColor,
		iconSize,
		text,
		columns,
		gap,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-icon-list',
		`lmb-icon--icon-${ icon }`,
		`lmb-icon--columns-${ columns }`,
	] )

	const iconSVGString = getIconSVGBase64( icon, iconShape, iconColor )
	const style = {
		'--icon': 'url(\'data:image/svg+xml;base64,' + iconSVGString + '\')',
		'--icon-size': iconSize ? `${ iconSize }px` : undefined,
		'--gap': gap ? `${ gap }px` : undefined,
	}

	return (
		<RichText.Content
			tagName="ul"
			className={ mainClasses }
			style={ style }
			value={ text }
		/>
	)
}

const deprecatedSchema_1_13_3 = {
	icon: {
		type: 'string',
		default: 'check',
	},
	iconShape: {
		type: 'string',
	},
	iconColor: {
		type: 'string',
	},
	iconSize: {
		type: 'number',
		default: 20,
	},
	columns: {
		type: 'number',
		default: 1,
	},
	text: {
		source: 'html',
		selector: 'ul',
		multiline: 'li',
	},
	gap: {
		type: 'number',
		default: 16,
	},
}

const deprecated = [
	{
		attributes: deprecatedSchema_1_15_4,
		save: deprecatedSave_1_15_4,
		migrate: attributes => {
			// Update the custom CSS since the structure has changed.
			const updateCSS = css => ( css || '' )
				.replace( /.lmb-icon-list-wrapper .lmb-icon-list li/g, '.lmb-icon-list li' )
				.replace( /.lmb-icon-list-wrapper .lmb-icon-list/g, '.lmb-icon-list ul' )
				.replace( /.lmb-icon-list-wrapper/g, '.lmb-icon-list' )

			return {
				...attributes,
				columns: attributes.columns ? attributes.columns : 1,
				customCSS: updateCSS( attributes.customCSS ),
				customCSSCompiled: updateCSS( attributes.customCSSCompiled ),
			}
		},
	},
	{
		attributes: deprecatedSchema_1_13_3,
		save: deprecatedSave_1_13_3,
	},
]

export default deprecated

