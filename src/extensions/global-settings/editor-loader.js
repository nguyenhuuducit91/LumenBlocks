/**
 * This loads the global styles in the editor.
 */

/**
 * Internal dependencies
 */
import { GlobalColorSchemeStyles } from './color-schemes'
import { GlobalColorStyles } from './colors'
import { GlobalTypographyStyles } from './typography'
import { GlobalSpacingAndBordersStyles } from './spacing-and-borders'
import { GlobalButtonsAndIconsStyles } from './buttons-and-icons'
import { GlobalPresetControlsStyles } from './preset-controls'
import { GlobalBlockStyles } from './block-styles'

/**
 * External dependencies
 */
import { useDeviceType } from '~lumen/hooks'
import { createRoot } from '~lumen/utils'

/** WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins'
import { useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data'
import domReady from '@wordpress/dom-ready'
import { addFilter } from '@wordpress/hooks'

const GlobalSettingsLoader = () => {
	const deviceType = useDeviceType()
	const editorDom = useSelect( select => {
		return select( 'lumen/editor-dom' ).getEditorDom()
	} )

	/**
	 * Render the global colors and typography in Gutenberg
	 *
	 * WordPress 5.8 introduces block templates.
	 * When editing blocks inside a template window, the editor is mounted inside
	 * an `iframe` DOMElement. For the styles to work, we need to mount the styles inside
	 * the iframe document.
	 *
	 * @since 2.17.2
	 */
	useEffect( () => {
		const editorBody = editorDom?.closest( 'body' )
		const editorHead = editorBody?.ownerDocument?.head

		if ( editorHead ) {
			editorHead.appendChild( globalTypographyWrapper )
			editorHead.appendChild( globalColorWrapper )
		    editorHead.appendChild( globalSpacingAndBorderWrapper )
			editorHead.appendChild( globalButtonsAndIconsWrapper )
			editorHead.appendChild( globalColorSchemesWrapper )
			editorHead.appendChild( globalPresetControlsWrapper )
			editorHead.appendChild( globalBlockStylesWrapper )
		}
	}, [ deviceType, editorDom ] )

	return null
}

registerPlugin( 'lumen-global-settings-loader', {
	render: GlobalSettingsLoader,
} )

const globalTypographyWrapper = document?.createElement( 'style' )
const globalColorWrapper = document?.createElement( 'style' )
const globalSpacingAndBorderWrapper = document?.createElement( 'style' )
const globalButtonsAndIconsWrapper = document?.createElement( 'style' )
const globalColorSchemesWrapper = document?.createElement( 'style' )
const globalPresetControlsWrapper = document?.createElement( 'style' )
const globalBlockStylesWrapper = document?.createElement( 'style' )

globalTypographyWrapper?.setAttribute( 'id', 'lmn-global-typography-styles' )
globalColorWrapper?.setAttribute( 'id', 'lmn-global-color-styles' )
globalSpacingAndBorderWrapper?.setAttribute( 'id', 'lmn-global-spacing-and-borders-styles' )
globalButtonsAndIconsWrapper?.setAttribute( 'id', 'lmn-global-buttons-and-icons-styles' )
globalColorSchemesWrapper?.setAttribute( 'id', 'lmn-global-color-schemes-styles' )
globalPresetControlsWrapper?.setAttribute( 'id', 'lmn-global-preset-controls-styles' )
globalBlockStylesWrapper?.setAttribute( 'id', 'lmn-global-block-styles' )

addFilter( 'lumen.global-styles.ids', 'lumen/global-settings', styleIds => {
	styleIds.push(
		'lmn-global-typography-styles',
		'lmn-global-color-styles',
		'lmn-global-spacing-and-borders-styles',
		'lmn-global-buttons-and-icons-styles',
		'lmn-global-color-schemes-styles',
		'lmn-global-preset-controls-styles'
	)

	return styleIds
} )

domReady( () => {
	document?.head?.appendChild( globalTypographyWrapper )
	document?.head?.appendChild( globalColorWrapper )
	document?.head?.appendChild( globalSpacingAndBorderWrapper )
	document?.head?.appendChild( globalButtonsAndIconsWrapper )
	document?.head?.appendChild( globalColorSchemesWrapper )
	document?.head?.appendChild( globalPresetControlsWrapper )
	document?.head?.appendChild( globalBlockStylesWrapper )
	createRoot( globalTypographyWrapper ).render( <GlobalTypographyStyles /> )
	createRoot( globalColorWrapper ).render( <GlobalColorStyles /> )
	createRoot( globalSpacingAndBorderWrapper ).render( <GlobalSpacingAndBordersStyles /> )
	createRoot( globalButtonsAndIconsWrapper ).render( <GlobalButtonsAndIconsStyles /> )
	createRoot( globalColorSchemesWrapper ).render( <GlobalColorSchemeStyles /> )
	createRoot( globalPresetControlsWrapper ).render( <GlobalPresetControlsStyles /> )
	createRoot( globalBlockStylesWrapper ).render( <GlobalBlockStyles /> )
} )
