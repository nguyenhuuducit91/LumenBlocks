/**
 * Internal dependencies
 */
import { GlobalPresetControlsStyles } from './editor-loader'

/**
 * External dependencies
 */
import {
	i18n, showProNotice, isPro,
} from 'lumen'
import {
	PanelAdvancedSettings,
	ProControl,
} from '~lumen/ui'

/**
 * WordPress dependencies
 */

import { addFilter, applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

export { GlobalPresetControlsStyles }

if ( showProNotice || isPro ) {
	addFilter( 'lumen.global-settings.inspector', 'lumen/preset-controls', output => {
		return (
			<Fragment>
				{ output }

				<PanelAdvancedSettings
					title={ __( 'Global Preset Controls', i18n ) }
					id="preset-controls-settings"
					isPremiumPanel={ ! isPro }
				>
					{ ! isPro && <ProControl type="preset-controls" /> }
					{ isPro &&
                            applyFilters( 'lumen.global-settings.inspector.preset-controls.control', null )
					}

				</PanelAdvancedSettings>
			</Fragment>
		)
	}, 14 )
}
