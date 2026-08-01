/**
 * Internal dependencies
 */
import { openPanelId } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import domReady from '@wordpress/dom-ready'

let init = false
const COMMON_MATCHERS = {
	'.lmb-top-separator': 'top-separator',
	'.lmb-bottom-separator': 'bottom-separator',
	'.lmb-inner-block': 'column-background',
	'.lmb-block-title': 'block-title',
	'.lmb-block-description': 'block-description',
	'.lmb--has-block-background': 'block-background',
}
const MATCHERS = {}

// These selectors will be listened to in this order.
// If a selector is matched, the succeeding selectors are skipped.
const CLICK_LISTENER_CLASSES = [
	'.block-editor-rich-text__editable', // >= 5.4 rich text.
	'.editor-rich-text__editable', // <= 5.3 rich text.
	'svg',
	'img',
	'figure',
	'.lmb-button',
	'[role="button"]',
	'.lmb-block-content > * > *',
	'.lmb-block-content > *',
	'.lmb-content-wrapper',
	'.lmb-top-separator',
	'.lmb-bottom-separator',
	'.lmb-inner-block',
	'.lmb-main-block',
]

export const addMatcher = ( blockName, clickedClass, targetPanelId ) => {
	if ( typeof MATCHERS[ blockName ] === 'undefined' ) {
		MATCHERS[ blockName ] = {}
	}
	MATCHERS[ blockName ][ clickedClass ] = targetPanelId
}

export const getMatchers = blockName => {
	return {
		...MATCHERS[ blockName ],
		...COMMON_MATCHERS,
	}
}

export const getBlockName = el => {
	const blockEl = el.closest( '[data-type]' )
	if ( blockEl ) {
		if ( ! blockEl.getAttribute( 'data-type' ).match( /^lmb\//i ) ) {
			return ''
		}
		return blockEl.getAttribute( 'data-type' ).replace( /^lmb\//i, '' )
	}
	return ''
}

domReady( () => {
	if ( init ) {
		return
	}
	init = true

	// Don't do this if browser doesn't support matches.
	if ( ! Element.prototype.matches ) {
		return
	}

	const overrides = applyFilters( 'lumen.click-open-inspector.listener-override', {} )

	document.body.addEventListener( 'dblclick', ev => {
		// Don't do this if we're in the widget editor since it doesn't have a sidebar.
		if ( wp.customize ) { // This is true if we're in the widget editor.
			return
		}

		const blockName = getBlockName( ev.target )
		if ( ! blockName ) {
			return
		}

		const matchers = getMatchers( blockName )
		if ( ! matchers ) {
			return
		}

		let classOverrides = []

		Object.keys( overrides ).some( overrideSelector => {
			if ( ev.target.closest( overrideSelector ) ) {
				classOverrides = overrides[ overrideSelector ]
				return true
			}
			return false
		} );

		( [ ...classOverrides, ...CLICK_LISTENER_CLASSES ] ).some( listenerClass => {
			// Only listen to these so that we won't have to check a lot of things.
			const target = ev.target.closest( listenerClass )
			if ( ! target ) {
				return false
			}

			// Checks whether the clicked element matches anything that we're listening for.
			const didMatch = Object.keys( matchers ).some( matchSelector => {
				if ( target.matches( matchSelector ) ) {
					// Get the panel that we need to open.
					const panelId = matchers[ matchSelector ]

					// Don't continue to other matchers.
					return openPanelId( panelId )
				}

				return false
			} )

			return didMatch
		} )
	} )
} )
