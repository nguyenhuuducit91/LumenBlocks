/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

class LumenNotification {
	init = () => {
		const els = document.querySelectorAll( '.lmn-block-notification.lmn--is-dismissible' )
		els.forEach( el => {
			if ( el._LumenHasInitAccordion ) {
				return
			}
			// Dismiss handler.
			const uid = el.getAttribute( 'data-block-id' )
			const itemName = `stckbl-notif-${ uid }`

			// Show if not yet dismissed.
			if ( localStorage.getItem( itemName ) &&
				! window.location.search.match( /preview=\w+/ ) ) { // Always show notification if in preview.
				el.style.display = 'none'
			}

			el.querySelector( '.lmn-block-notification__close-button' ).addEventListener( 'click', () => {
				localStorage.setItem( itemName, 1 )
				el.style.display = 'none'
			} )
			el._LumenHasInitAccordion = true
		} )
	}
}

window.lumenNotification = new LumenNotification()
domReady( window.lumenNotification.init )
