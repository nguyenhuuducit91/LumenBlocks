/**
 * Internal dependencies
 */
import './store'

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element'
import { dispatch } from '@wordpress/data'
import apiFetch from '@wordpress/api-fetch'

export const LumenThemeFonts = () => {
	useEffect( () => {
		apiFetch( {
			path: `/lumen/v3/get_theme_fonts/`,
			method: 'GET',
		} ).then( font => {
			if ( font ) {
				dispatch( 'lumen/theme-fonts' ).updateThemeFonts( font )
			}
		} )
	}, [] )

	return null
}
