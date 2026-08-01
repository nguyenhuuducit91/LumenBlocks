/**
 * Internal dependencies
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	CustomAttributesControl,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { useBlockAttributesContext, useBlockSetAttributesContext } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { INVALID_HTML_ATTRIBUTES } from '.'

export const Edit = () => {
	const customAttributes = useBlockAttributesContext( attributes => attributes.customAttributes )
	const setAttributes = useBlockSetAttributesContext()

	return (
		<InspectorAdvancedControls>
			<PanelAdvancedSettings
				title={ __( 'Custom Attributes', i18n ) }
				id="custom-attributes"
			>
				<CustomAttributesControl
					label={ __( 'Custom Attributes', i18n ) }
					value={ customAttributes }
					invalidHtmlAttributes={ INVALID_HTML_ATTRIBUTES }
					onChange={ customAttributes => setAttributes( { customAttributes } ) }
				/>
			</PanelAdvancedSettings>
		</InspectorAdvancedControls>
	)
}
