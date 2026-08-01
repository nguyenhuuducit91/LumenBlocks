/**
 * Custom CSS.
 *
 * The escape hatch: whatever the panels do not offer, an author can write here.
 * The attributes and both render points already existed — the panel held an
 * advertisement where the editor should be.
 *
 * What is written is scoped to this block before it reaches the page, so a rule
 * here cannot restyle the rest of the site. See `css.js` for how, and for what
 * is filtered out on the way.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	CodeTextareaControl,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { useBlockAttributesContext, useBlockSetAttributesContext } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import { filterCss, SELECTOR_TOKEN } from './css'

export const Edit = props => {
	const customCSS = useBlockAttributesContext( attributes => attributes.customCSS )
	const setAttributes = useBlockSetAttributesContext()

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Custom CSS', i18n ) }
					id="custom-css"
					showModifiedIndicator={ !! customCSS }
				>
					<CodeTextareaControl
						attribute="customCSS"
						label={ __( 'Custom CSS', i18n ) }
						value={ customCSS }
						onChange={ value => setAttributes( {
							customCSS: value,
							// Kept for the frontend, which must not have to
							// filter anything at render time.
							customCSSMinified: filterCss( value )
								.replace( /\s*\n\s*/g, '' )
								.replace( /\s{2,}/g, ' ' )
								.trim(),
						} ) }
						help={ __(
							'Write “selector” to mean this block. Anything else is treated as being inside it, so these rules cannot affect the rest of the page.',
							i18n
						) }
						placeholder={ `${ SELECTOR_TOKEN } {\n\tbox-shadow: 0 20px 40px rgba(0,0,0,.15);\n}\n\n${ SELECTOR_TOKEN }:hover .lmn-button {\n\tletter-spacing: 1px;\n}` }
						rows={ 8 }
					/>

					{ applyFilters( 'lumen.block-component.custom-css.control', null, {
						mainBlockClass: props.mainBlockClass,
					} ) }
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}

Edit.defaultProps = {
	mainBlockClass: '',
}
