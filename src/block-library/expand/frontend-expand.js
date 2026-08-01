/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

class LumenExpand {
	init = () => {
		const els = document.querySelectorAll( '.lmn-block-expand .lmn-button' )
		const blocks = document.querySelectorAll( '.lmn-block-expand' )

		const onClick = event => {
			const el = event.target.closest( '.lmn-block-expand' )

			// Invert the hidden text.
			const visibles = el.querySelectorAll( '[aria-hidden="false"]' )
			const hiddens = el.querySelectorAll( '[aria-hidden="true"]' )
			hiddens.forEach( el => el.setAttribute( 'aria-hidden', 'false' ) )
			visibles.forEach( el => el.setAttribute( 'aria-hidden', 'true' ) )

			// Refocus on the hide/show button.
			el.querySelector( `.lmn-button[aria-hidden="false"]` ).focus( {
				preventScroll: true,
			} )

			event.preventDefault()
		}

		const addAriaAttributes = el => {
			const shortText = el.querySelector( '.lmn-block-expand__short-text' )
			const showBtn = el.querySelector( '.lmn-block-expand__show-button > .lmn-button' )
			const moreText = el.querySelector( '.lmn-block-expand__more-text' )
			const hideBtn = el.querySelector( '.lmn-block-expand__hide-button > .lmn-button' )

			shortText.setAttribute( 'id', shortText.getAttribute( 'data-block-id' ) )
			moreText.setAttribute( 'id', moreText.getAttribute( 'data-block-id' ) )

			showBtn.setAttribute( 'aria-controls', shortText.getAttribute( 'data-block-id' ) )
			hideBtn.setAttribute( 'aria-controls', moreText.getAttribute( 'data-block-id' ) )
		}

		const fixAriaAttributes = el => {
			if ( el.hasAttribute( 'aria-expanded' ) ) {
				el.removeAttribute( 'aria-expanded' )
			}
		}

		els.forEach( el => {
			if ( ! el._LumenHasInitExpand ) {
				el.addEventListener( 'click', onClick )
				el._LumenHasInitExpand = true
			}
		} )

		blocks.forEach( block => {
			if ( ! block._LumenHasInitExpandFix ) {
				fixAriaAttributes( block )
				addAriaAttributes( block )
				block._LumenHasInitExpandFix = true
			}
		} )
	}
}

window.lumenExpand = new LumenExpand()
domReady( window.lumenExpand.init )
