/**
 * External dependencies
 */
import {
	i18n, isPro, showProNotice,
} from 'lumen'
import {
	InspectorAdvancedControls,
	PanelAdvancedSettings,
	ProControl,
} from '~lumen/ui'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { useBlockAttributesContext } from '~lumen/hooks'

export const Edit = props => {
	const customCSSMinified = useBlockAttributesContext( attributes => attributes.customCSSMinified )

	if ( ! showProNotice && ! isPro ) {
		return null
	}

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Custom CSS', i18n ) }
					id="custom-css"
					isPremiumPanel={ ! isPro }
					showModifiedIndicator={ !! customCSSMinified }
				>
					{ ! isPro && <ProControl type="custom-css" /> }
					{ isPro &&
						applyFilters( 'lumen.block-component.custom-css.control', null, {
							mainBlockClass: props.mainBlockClass,
						} )
					}
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}

Edit.defaultProps = {
	mainBlockClass: '',
}
