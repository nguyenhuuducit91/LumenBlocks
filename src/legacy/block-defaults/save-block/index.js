/**
 * Internal dependencies
 */
import './store'
import './variation-picker'
import './custom-block-styles-editor'
import SaveMenu from './save-menu'
import { useSavedDefaultBlockStyle } from './use-saved-default-block-style'
import { settings } from 'lumen'

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data'
import { registerPlugin } from '@wordpress/plugins'
import { addFilter } from '@wordpress/hooks'
import { createHigherOrderComponent } from '@wordpress/compose'

/**
 * Add the save block style menu to the more options menu of all Lumen
 * blocks.
 */
const _SaveMenu = withSelect( select => {
	return {
		clientId: select( 'core/block-editor' ).getSelectedBlockClientId(),
	}
} )( SaveMenu )

if ( settings.lumen_enable_save_as_default_block ) {
	registerPlugin( 'lumen-save-block-menu', { render: _SaveMenu } )
}

/**
 * Add the block style loader to each Lumen block.
 */
const withSaveBlockStyle = createHigherOrderComponent( BlockEdit => {
	return props => {
		useSavedDefaultBlockStyle( props )
		return <BlockEdit { ...props } />
	}
}, 'withSaveBlockStyle' )

addFilter(
	'editor.BlockEdit',
	'lumen/save-block-style',
	withSaveBlockStyle
)
