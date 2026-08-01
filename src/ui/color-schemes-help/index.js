import { i18n } from 'lumen'
import { Link } from '~lumen/ui'

import { __ } from '@wordpress/i18n'
import { dispatch } from '@wordpress/data'

export const ColorSchemesHelp = props => {
	const {
		customText, callback, className,
	} = props
	const onClick = () => {
		let cancelOnClick = false
		if ( callback ) {
			cancelOnClick = callback()
		}

		if ( cancelOnClick ) {
			return
		}

		// Open the global settings sidebar.
		dispatch( 'core/edit-post' )?.openGeneralSidebar( 'lumen-global-settings/sidebar' ) // For Block Editor
		dispatch( 'core/edit-site' )?.openGeneralSidebar( 'lumen-global-settings/sidebar' ) // For Site Editor

		// Add a small delay to ensure DOM elements are fully rendered and accessible after the sidebar opens
		setTimeout( () => {
			// Closes all panels except the color scheme panel
			const panels = document.querySelectorAll( '.lmb-global-settings__inspector > .lmb-toggle-panel-body.is-opened' )
			panels?.forEach( panel => {
				if ( panel.classList.contains( 'lmb-global-color-schemes__panel' ) ) {
					return
				}
				const toggle = panel.querySelector( '.components-panel__body-title > .components-panel__body-toggle' )
				toggle?.click()
			} )

			const colorSchemeToggle = document.querySelector( '.lmb-global-color-schemes__panel .components-panel__body-title > .components-panel__body-toggle' )
			// Opens the color scheme panel
			if ( colorSchemeToggle.getAttribute( 'aria-expanded' ) === 'false' ) {
				colorSchemeToggle?.click()
			}
		}, 10 )
	}

	return <>
		{ customText || customText === '' ? customText
			: <span>{ __( 'Change the color scheme.', i18n ) }</span> }
		{ customText !== '' && <>&nbsp;</> }
		<Link className={ className } onClick={ onClick }> { __( 'Manage your color schemes.', i18n ) } </Link>
	</>
}

