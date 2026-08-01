/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	PanelAdvancedSettings,
	InspectorAdvancedControls,
	AdvancedToggleControl,
} from '~lumen/ui'
import { useBlockAttributesContext, useBlockSetAttributesContext } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

export const Edit = () => {
	const setAttributes = useBlockSetAttributesContext()
	const {
		hideDesktop,
		hideTablet,
		hideMobile,
	} = useBlockAttributesContext( attributes => {
		return {
			hideDesktop: attributes.hideDesktop,
			hideTablet: attributes.hideTablet,
			hideMobile: attributes.hideMobile,
		}
	} )

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Responsive', i18n ) }
					initialOpen={ false }
				>
					<AdvancedToggleControl
						className="lmn-control--attr-hideDesktop"
						label={ __( 'Hide on Desktop', i18n ) }
						checked={ hideDesktop }
						onChange={ hideDesktop => setAttributes( { hideDesktop } ) }
					/>
					<AdvancedToggleControl
						className="lmn-control--attr-hideTablet"
						label={ __( 'Hide on Tablet', i18n ) }
						checked={ hideTablet }
						onChange={ hideTablet => setAttributes( { hideTablet } ) }
					/>
					<AdvancedToggleControl
						className="lmn-control--attr-hideMobile"
						label={ __( 'Hide on Mobile', i18n ) }
						checked={ hideMobile }
						onChange={ hideMobile => setAttributes( { hideMobile } ) }
					/>
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}
