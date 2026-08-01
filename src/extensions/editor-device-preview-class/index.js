/**
 * Adds the lmn-preview-device-desktop/tablet/mobile classes to the
 * .editor-styles-wrapper or iframe wrapper. This class is used to simulate
 * breakpoints.
 */

/**
 * External dependencies
 */
import { useDeviceType, useBlockHoverState } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element'
import { useSelect } from '@wordpress/data'
import { registerPlugin } from '@wordpress/plugins'
import { addFilter } from '@wordpress/hooks'

const EditorPreviewClass = () => {
	const deviceType = useDeviceType()
	const [ currentHoverState ] = useBlockHoverState( { forceUpdateHoverState: true } )
	const editorEl = useSelect( select => {
		return select( 'lumen/editor-dom' ).getEditorDom()
	}, [] )

	// Update the editor class when the preview size changes.
	useEffect( () => {
		const themeRegex = /lmn--is-\w+-theme/gm

		if ( editorEl ) {
			// Add device class
			if ( editorEl && editorEl.classList.contains( `lmn-preview-device-${ deviceType.toLowerCase() }` ) === false ) {
				editorEl.classList.remove( 'lmn-preview-device-desktop', 'lmn-preview-device-tablet', 'lmn-preview-device-mobile' )
				editorEl.classList.add( `lmn-preview-device-${ deviceType.toLowerCase() }` )
			}

			// Add hover state class
			// Dev note: This allows us to easily add CSS rules for each hover state in global styles.
			if ( editorEl && editorEl.classList.contains( `lmn-preview-state--${ currentHoverState }` ) === false ) {
				editorEl.classList.remove( 'lmn-preview-state--normal', 'lmn-preview-state--hover', 'lmn-preview-state--parent-hover', 'lmn-preview-state--collapsed' )
				editorEl.classList.add( `lmn-preview-state--${ currentHoverState }` )
			}

			// Add theme class
			if ( document.querySelector( 'body' ).className.match( themeRegex ) && ! editorEl.className.match( themeRegex ) ) {
				const theme = document.querySelector( 'body' ).className.match( themeRegex )[ 0 ]
				editorEl.classList.add( theme )
				addFilter( 'lumen.global-styles.classnames', 'lumen/theme-classname', styleIds => {
					styleIds.push( theme )
					return styleIds
				} )
			}

			// At first load of the editor, the `lmn-preview-device-*` and `lmn--is-*-theme` are removed, so we have to re-add it.
			const mo = onClassChange( editorEl, () => {
				if ( editorEl?.classList.contains( `lmn-preview-device-${ deviceType.toLowerCase() }` ) === false ) {
					editorEl.classList.remove( 'lmn-preview-device-desktop', 'lmn-preview-device-tablet', 'lmn-preview-device-mobile' )
					editorEl.classList.add( `lmn-preview-device-${ deviceType.toLowerCase() }` )
				}
				if ( editorEl?.classList.contains( `lmn-preview-state--${ currentHoverState }` ) === false ) {
					editorEl.classList.remove( 'lmn-preview-state--normal', 'lmn-preview-state--hover', 'lmn-preview-state--parent-hover', 'lmn-preview-state--collapsed' )
					editorEl.classList.add( `lmn-preview-state--${ currentHoverState }` )
				}
				if ( document.querySelector( 'body' ).className.match( themeRegex ) && ! editorEl.className.match( themeRegex ) ) {
					const theme = document.querySelector( 'body' ).className.match( themeRegex )[ 0 ]
					editorEl.classList.add( theme )
					addFilter( 'lumen.global-styles.classnames', 'lumen/theme-classname', styleIds => {
						styleIds.push( theme )
						return styleIds
					} )
				}
			} )

			return () => mo.disconnect()
		}
	}, [ editorEl, deviceType, currentHoverState ] )

	return null
}

registerPlugin( 'lumen-editor-device-preview-class', {
	render: EditorPreviewClass,
} )

// Listener when a class is changed on an element.
const onClassChange = ( node, callback ) => {
	let lastClassString = node.classList.toString()

	const mutationObserver = new MutationObserver( mutationList => {
		for ( const item of mutationList ) {
			if ( item.attributeName === 'class' ) {
				const classString = node.classList.toString()
				if ( classString !== lastClassString ) {
					callback( mutationObserver )
					lastClassString = classString
					break
				}
			}
	  }
	} )

	mutationObserver.observe( node, { attributes: true } )

	return mutationObserver
}
