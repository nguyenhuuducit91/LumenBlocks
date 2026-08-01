/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import {
	useMemo, useCallback, Suspense, lazy,
} from '@wordpress/element'
import { useLocalStorage } from '~lumen/utils'

export const Switcher = props => {
	const [ _apiVersion, setApiVersion ] = useLocalStorage( 'lmn__design_library_api_version', '' )

	const versions = useMemo( () => {
		return applyFilters( 'lumen.design-library.versions', [ '' ] ) // Blank means the latest version.
	}, [] )

	// If there's no version switcher, it means backward compatibility is
	// disabled, always default to the first version
	const apiVersion = versions.includes( _apiVersion ) ? _apiVersion : versions[ 0 ]

	// Lazy-load the ModalDesignLibrary to reduce initial bundle size
	// Note: We import the named export and set it as default for React.lazy
	const LazyModalDesignLibrary = lazy( () => import( /* webpackChunkName: "design-library" */ '~lumen/ui-lazy/design-library' ) )

	const ModalComponent = useMemo( () => {
		return applyFilters( 'lumen.design-library.modal-component', LazyModalDesignLibrary, apiVersion )
	}, [ apiVersion ] )

	const onChangeApiVersion = useCallback( v => setApiVersion( v ), [] )

	return (
		<Suspense fallback={ null }>
			<ModalComponent
				hasVersionSwitcher={ versions.length > 1 }
				apiVersion={ apiVersion }
				onChangeApiVersion={ onChangeApiVersion }
				{ ...props }
			/>
		</Suspense>
	)
}

Switcher.defaultProps = {
}

export default Switcher
