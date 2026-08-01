/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

/**
 * Permanently hide the dismissible notification if clicked.
 */

domReady( () => {
	const elems = document.querySelectorAll( '.lmb-expand' )
	elems.forEach( el => {
		const btn = el.querySelector( '.lmb-expand__toggle' )
		const clickHandler = e => {
			el.classList.toggle( 'lmb-expand--more' )
			const isExpanded = el.classList.contains( 'lmb-expand--more' )
			btn.setAttribute( 'aria-expanded', isExpanded ? 'true' : 'false' )
			e.preventDefault()
		}
		if ( btn ) {
			btn.addEventListener( 'click', clickHandler )
			btn.addEventListener( 'tapEnd', clickHandler )
		}
	} )
} )

/**
 * Deprecated < version 1.11
 */
domReady( () => {
	const elems = document.querySelectorAll( '.lmb-expand' )
	elems.forEach( el => {
		const btn = el.querySelector( '.lmb-expand-button' )
		const clickHandler = e => {
			el.classList.toggle( 'lmb-more' )
			e.preventDefault()
		}
		if ( btn ) {
			btn.addEventListener( 'click', clickHandler )
			btn.addEventListener( 'tapEnd', clickHandler )
		}
	} )
} )
