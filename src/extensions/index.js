/**
 * Internal dependencies
 */
import './global-settings'
import './theme-block-size'
import './design-library-button'
import './layout-picker-reset'
import './guided-modal-tour'
import './page-icons'
// import './v2-migration-popup' // Probably 1.5yrs of checking for backward compatibility is enough.
import './editor-device-preview-class'
import './theme-block-style-inheritance'
import { BlockLinking } from './block-linking'
import { BlockHoverState } from './block-hover-state'
import { ContentAlign } from './content-align'
import { EditorDom } from './get-editor-dom'
import { LumenThemeFonts } from './get-theme-fonts'
import { TextDefaultBlock } from './text-default-block'

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins'

/**
 * External dependencies
 */
import { ConvertToContainerButton, GetBlockAttributesButton } from '~lumen/ui'
import { devMode } from 'lumen'
import { fetchSettings } from '~lumen/utils'
import '~lumen/legacy/block-defaults'

registerPlugin( 'lumen-convert-to-container-button', { render: ConvertToContainerButton } )
registerPlugin( 'lumen-block-hover-state', { render: BlockHoverState } )
registerPlugin( 'lumen-content-align', { render: ContentAlign } )
registerPlugin( 'lumen-editor-dom', { render: EditorDom } )
registerPlugin( 'lumen-theme-fonts', { render: LumenThemeFonts } )

if ( devMode ) {
	registerPlugin( 'lumen-block-attributes-get-button', { render: GetBlockAttributesButton } )
}

fetchSettings().then( response => {
	if ( response.lumen_enable_block_linking ) {
		registerPlugin( 'lumen-block-linking', { render: BlockLinking } )
	}
	if ( response.lumen_enable_text_default_block ) {
		registerPlugin( 'lumen-text-default-block', { render: TextDefaultBlock } )
	}
} )
