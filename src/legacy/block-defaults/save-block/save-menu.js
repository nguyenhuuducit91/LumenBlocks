/**
 * Internal dependencies
 */
import { useSaveBlockStyle } from './save-hooks'

/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n'
import { useSelect, dispatch } from '@wordpress/data'
import { MenuItem } from '@wordpress/components'
import { BlockSettingsMenuControls } from '@wordpress/block-editor'

const SaveMenu = ( { clientId } ) => {
	const { getBlockName } = useSelect( 'core/block-editor' )
	const { getBlockSupport } = useSelect( 'core/blocks' )

	const {
		getBlockTitle,
		getBlockSave,
		getBlockAttributes,
		getBlockInnerBlocks,
	} = useSaveBlockStyle()
	const {
		blockName,
		hasDefaultBlockStyle,
	} = useSelect( select => {
		const { getBlockName } = select( 'core/block-editor' )
		const blockName = getBlockName( clientId )

		return {
			blockName,
			hasDefaultBlockStyle: () => {
				return blockName ? !! select( 'lumen/block-styles' ).getDefaultBlockStyle( blockName ) : false
			},
		}
	} )

	// Only do this if the block is ours.
	if ( ! clientId || ! getBlockName( clientId )?.startsWith( 'lumen/' ) ) {
		return null
	}

	// Don't show the menu if the block doesn't support this feature.
	if ( getBlockSupport( getBlockName( clientId ), 'lmnSaveBlockStyle' ) === false ) {
		return null
	}

	const blockTitle = getBlockTitle( clientId )

	return (
		<>
			<BlockSettingsMenuControls>
				{ ( { onClose } ) => (
					<>
						<MenuItem
							icon="sticky"
							onClick={ () => {
								const attributes = getBlockAttributes( clientId )
								const innerBlocks = getBlockInnerBlocks( clientId )
								const blockSave = getBlockSave( clientId )
								dispatch( 'lumen/block-styles' ).updateBlockDefaultStyle( blockName, attributes, innerBlocks, blockSave, sprintf( __( 'Default %s Block Saved!', i18n ), blockTitle ) )
								onClose()
							} }
						>
							{ sprintf( __( 'Save as Default %s Block', i18n ), blockTitle ) }
						</MenuItem>
						{ hasDefaultBlockStyle() && (
							<MenuItem
								icon="editor-removeformatting"
								onClick={ () => {
									dispatch( 'lumen/block-styles' ).deleteBlockDefaultStyle( blockName, sprintf( __( 'Default %s Block Deleted!', i18n ), blockTitle ) )
									onClose()
								} }
							>
								{ sprintf( __( 'Reset Default %s Block', i18n ), blockTitle ) }
							</MenuItem>
						) }
					</>
				) }
			</BlockSettingsMenuControls>
		</>
	)
}

export default SaveMenu
