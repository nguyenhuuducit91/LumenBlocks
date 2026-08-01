/**
 * This file only contains Premium notices and Premium panel notices.
 */
/**
 * External dependencies
 */
import { ProControl, PanelAdvancedSettings } from '~lumen/ui'
import { i18n, showProNotice } from 'lumen'

/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'

if ( showProNotice ) {
	addFilter( 'lumen.separator.edit.inspector.style.after', 'lumen/separator', output => {
		return (
			<Fragment>
				{ output }
				<PanelAdvancedSettings
					initialOpen={ false }
					title={ sprintf( _x( '%s %d', 'Nth Title', i18n ), __( 'Layer', i18n ), 2 ) }
					className="lmb--help-tip-separator-layer2"
				>
					<ProControl type="separator" />
				</PanelAdvancedSettings>
				<PanelAdvancedSettings
					initialOpen={ false }
					title={ sprintf( _x( '%s %d', 'Nth Title', i18n ), __( 'Layer', i18n ), 3 ) }
					className="lmb--help-tip-separator-layer3"
				>
					<ProControl type="separator" />
				</PanelAdvancedSettings>
			</Fragment>
		)
	} )
}
