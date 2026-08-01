import { addFilter } from '@wordpress/hooks'

/**
 * This filter has the following parameters:
 * 1. decls - The current css declarations.
 * 2. scheme - The current color scheme.
 * 3. mode - The current mode.
 * 4. theme - The current theme.
 */
addFilter( 'lumen.global-settings.global-color-schemes.add-theme-compatibility', 'lumen/global-color-schemes.theme-compatibility.blocksy', decls => {
	/**
	 * This is WIP. Blocksy is not supported yet.
	 */

	/*
	if ( theme === 'lmn--is-blocksy-theme' ) {
		let buttonSelector = ''
	 	const backgroundProperty = camelToKebab( 'buttonBackgroundColor' )
	 	const textProperty = camelToKebab( 'buttonTextColor' )

	 	switch ( mode ) {
	 		case 'background':
	 			buttonSelector = [
	 				' > :where(.lmn-button-group) > :where(div) > :where(div) > div:where([data-type="lumen/button"])',
	 				' > :where(.lmn-inner-blocks) > :where(div) > :where(div) > :where([data-type="lumen/button-group"]) > :where(.lmn-block:not(.lmn-block-background)) > :where(.lmn-button-group) > :where(div) > :where(div) > div:where([data-type="lumen/button"])',
	 			].join( ',' )
	 			break
	 		case 'container':
	 			buttonSelector = ' > :where(div) > :where(div) > :where([data-type="lumen/button-group"]) > :where(.lmn-block:not(.lmn-block-background)) > :where(.lmn-button-group) > :where(div) > :where(div) > div:where([data-type="lumen/button"])'
	 			break
	 		default:
	 			buttonSelector = ' :where([data-type="lumen/button-group"]) > :where(.lmn-block:not(.lmn-block-background)) > :where(.lmn-button-group) > :where(div) > :where(div) > div:where([data-type="lumen/button"])'
	 	}

	 	const _decls = {
	 		desktop: [],
	 		desktopParentHover: [],
	 	}

	 	Object.keys( _decls ).forEach( state => {
	 		const bgValue = getInheritedValue( scheme.buttonBackgroundColor, state, mode )
	 		decls[ state ].push( `${ buttonSelector }{${ backgroundProperty }: ${ bgValue };}` )

	 		const textValue = getInheritedValue( scheme.buttonTextColor, state, mode )
	 		decls[ state ].push( `${ buttonSelector }{${ textProperty }: ${ textValue };}` )
	 	} )
	}
	*/

	return decls
} )

