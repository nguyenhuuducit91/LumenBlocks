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

export const Edit = props => {
	if ( ! showProNotice && ! isPro ) {
		return null
	}

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Motion Effects', i18n ) }
					id="effects-animations"
					isPremiumPanel={ ! isPro }
				>
					{ ! isPro && <ProControl type="motion-effects" /> }
					{ isPro &&
						applyFilters( 'lumen.block-component.effects-animations.control', null, {
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
