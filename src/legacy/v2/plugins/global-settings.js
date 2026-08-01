import { addFilter } from '@wordpress/hooks'

addFilter( 'lumen.global-settings.typography-selectors', 'lumen/v2', ( selectors, selector ) => {
	selectors.push( `[data-type^="lmb/"] ${ selector }` )
	if ( selector.startsWith( '.' ) ) {
		selectors.push( `[data-type^="lmb/"] ${ selector } p` )
	}
	return selectors
} )

addFilter( 'lumen.global-settings.typography.selector-is-lumen', 'lumen/v2', ( isLumen, selector ) => {
	if ( ! isLumen ) {
		return selector.includes( 'lmb/' )
	}
	return isLumen
} )
