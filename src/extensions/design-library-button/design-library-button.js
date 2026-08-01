/**
 * External dependencies
 */
import { i18n, settings } from 'lumen'
import { SVGLumenIcon } from '~lumen/icons'

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks'
import { dispatch, useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'
import { useCallback } from '@wordpress/element'
import { ToolbarButton } from '@wordpress/components'
import { GuidedModalTour } from '~lumen/ui'

const DesignLibraryButton = () => {
	const { getEditorDom } = useSelect( 'lumen/editor-dom' )

	const onClick = useCallback( () => {
		// If there's a design library block already in the editor, just open it.
		if ( getEditorDom()?.querySelector( '[data-type="lumen/design-library"]' ) ) {
			const button = getEditorDom()?.querySelector( `[data-type="lumen/design-library"] button` )
			// Open the design library.
			if ( button ) {
				button.click()
			}
			return
		}

		// Insert a design library block.
		const block = createBlock( 'lumen/design-library' )

		dispatch( 'core/block-editor' ).insertBlocks( block )
			.then( () => {
				const button = getEditorDom()?.querySelector( `[data-block="${ block.clientId }"] button` )
				// Open the design library.
				if ( button ) {
					button.click()
				}
			} )
	}, [ getEditorDom ] )

	return ( settings.lumen_enable_design_library &&
		<>
			{ /* TODO: This will need to only play on first time going to the editor, and if there's no quick button that started another tour */ }
			<GuidedModalTour tourId="editor" />
			<ToolbarButton
				onClick={ onClick }
				className="lmb-insert-library-button"
				icon={ <SVGLumenIcon /> }
			>{ __( 'Design Library', i18n ) }</ToolbarButton>
		</>
	)
}

export default DesignLibraryButton
