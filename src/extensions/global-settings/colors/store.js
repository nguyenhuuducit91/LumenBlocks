/**
 * External dependencies
 */
import { omit, head } from 'lodash'

/**
 * WordPress dependencies
 */
import {
	register, createReduxStore, dispatch,
} from '@wordpress/data'
import domReady from '@wordpress/dom-ready'
import { fetchSettings } from '~lumen/utils'

// Include all the stored state.
const DEFAULT_STATE = {
	isInitializing: true,
	lumenColors: [],
	lumenGradients: [],
	hideThemeColors: false,
	hideDefaultColors: false,
	hideSiteEditorColors: false,
}

const STORE_ACTIONS = {
	updateSettings: ( payload = {} ) => ( {
		type: 'UPDATE_SETTINGS',
		payload: omit( payload, 'type' ),
	} ),
}

const STORE_SELECTORS = {
	getSettings: state => state,
}

const STORE_REDUCER = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'UPDATE_SETTINGS': {
			return {
				...state,
				...action.payload,
			}
		}
		default: {
			return state
		}
	}
}

register( createReduxStore( 'lumen/global-colors', {
	reducer: STORE_REDUCER,
	actions: STORE_ACTIONS,
	selectors: STORE_SELECTORS,
} ) )

// Load all our settings into our store.
domReady( () => {
	fetchSettings().then( response => {
		const {
			lumen_global_hide_theme_colors: hideThemeColors,
			lumen_global_hide_default_colors: hideDefaultColors,
			lumen_global_hide_site_editor_colors: hideSiteEditorColors,
			lumen_global_colors: _lumenColors,
			lumen_global_gradients: lumenGradients,
		} = response
		const lumenColors = head( _lumenColors ) || []

		dispatch( 'lumen/global-colors' ).updateSettings( {
			hideThemeColors,
			hideDefaultColors,
			hideSiteEditorColors,
			lumenColors,
			lumenGradients: lumenGradients || [],
			isInitializing: false,
		} )
	} )
} )
