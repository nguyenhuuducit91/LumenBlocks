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

import { addFilter, applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

if ( showProNotice || isPro ) {
	addFilter( 'lumen.global-settings.inspector', 'lumen/icon-library', output => {
		return (
			<Fragment>
				{ output }

				<PanelAdvancedSettings
					title={ __( 'Icon Library', i18n ) }
					id="icon-library-settings"
					isPremiumPanel={ ! isPro }
				>
					{ ! isPro && <ProControl type="icon-library" /> }
					{ isPro &&
							applyFilters( 'lumen.global-settings.inspector.icon-library.control', null )
					}

				</PanelAdvancedSettings>
			</Fragment>
		)
	}, 16 )
}
