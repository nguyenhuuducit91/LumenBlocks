/**
 * External dependencies
 */
import counterUp from 'counterup2'

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

domReady( () => {
	require( 'waypoints/lib/noframework.waypoints.js' )
	const elems = document.querySelectorAll( '.lmb-countup .lmb-counter, .lmb-countup__counter' )
	elems.forEach( el => {
		el.classList.add( 'lmb-countup--hide' )
		new Waypoint( {
			element: el,
			handler() {
				counterUp( el )
				el.classList.remove( 'lmb-countup--hide' )
				this.destroy()
			},
			offset: 'bottom-in-view',
		} )
	} )
} )
