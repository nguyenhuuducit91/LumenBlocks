
/**
 * Internal dependencies
 */
import './store'

/**
 * External dependencies
 */
import {
	i18n, isPro, showProNotice,
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
import { useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'

export { GlobalBlockStyles } from './editor-loader'

if ( showProNotice || isPro ) {
	addFilter( 'lumen.global-settings.inspector', 'lumen/global-block-styles', output => {
		const hasBlockStyles = useSelect( select => {
			const blockStyles = select( 'lumen/global-block-styles' ).getAllBlockStyles()

			return Object.keys( blockStyles ).length > 0
		}, [] )

		return (
			<Fragment>
				{ output }
				<PanelAdvancedSettings
					title={ __( 'Global Block Styles', i18n ) }
					className="lmb-global-block-styles__panel"
					isPremiumPanel={ ! isPro }
					showModifiedIndicator={ isPro && hasBlockStyles }
				>
					{ ! isPro && <ProControl type="global-block-styles" /> }
					{ isPro && applyFilters( 'lumen.global-settings.inspector.global-block-styles.control', Fragment ) }

				</PanelAdvancedSettings>
			</Fragment>
		)
	}, 8 )
}
