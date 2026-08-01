/**
 * Global block styles.
 *
 * The storage for these is real: the setting is registered with a full REST
 * schema, the store persists changes, and `Lumen_Global_Block_Styles` puts the
 * saved CSS on the page. What is missing is the dialog for naming and saving a
 * style, so nothing can create one yet — and a panel listing an empty set is
 * not worth a place in the sidebar.
 *
 * The panel therefore appears only once styles exist. When the save dialog is
 * written, this starts working with no change here.
 */

/**
 * Internal dependencies
 */
import './store'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import { PanelAdvancedSettings } from '~lumen/ui'

/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'

export { GlobalBlockStyles } from './editor-loader'

addFilter( 'lumen.global-settings.inspector', 'lumen/global-block-styles', output => {
	const hasBlockStyles = useSelect( select => {
		const blockStyles = select( 'lumen/global-block-styles' )?.getAllBlockStyles() || {}

		return Object.keys( blockStyles ).length > 0
	}, [] )

	if ( ! hasBlockStyles ) {
		return output
	}

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Global Block Styles', i18n ) }
				className="lmb-global-block-styles__panel"
				showModifiedIndicator={ true }
			>
				{ applyFilters( 'lumen.global-settings.inspector.global-block-styles.control', Fragment ) }
			</PanelAdvancedSettings>
		</Fragment>
	)
}, 8 )
