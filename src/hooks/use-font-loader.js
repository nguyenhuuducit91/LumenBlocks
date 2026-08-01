import { useEffect } from '@wordpress/element'
import { doAction } from '@wordpress/hooks'
import { loadGoogleFont } from '~lumen/utils'

import { select } from '@wordpress/data'

export const useFontLoader = fontFamilyValue => {
	const { loadingThemeFont, themeFonts } = select( 'lumen/theme-fonts' ).getThemeFonts()
	useEffect( () => {
		if ( ! themeFonts.includes( fontFamilyValue ) ) {
			loadGoogleFont( fontFamilyValue )
			doAction( 'lumen.font-loader.load', fontFamilyValue )
		}
	}, [ loadingThemeFont, fontFamilyValue ] )
}
