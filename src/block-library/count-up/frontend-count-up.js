/**
 * External dependencies
 */
import counterUp from 'counterup2'

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

const ACTIVE = 'lmn--count-up-active'
class _LumenCountUp {
	constructor( el ) {
		this.el = el
	}

	callback = entries => {
		entries.forEach( entry => {
			const el = entry.target
			const duration = el.getAttribute( 'data-duration' ) || 1000

			if ( ! el.classList.contains( ACTIVE ) && entry.isIntersecting ) {
				setTimeout( () => {
					counterUp( el, { duration } )
					el.classList.add( ACTIVE )
				}, 200 )
			}
		} )
	}

	init = () => {
		this.el.classList.remove( ACTIVE )
		// If reduce motion is on, don't animate.
		const reduceMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		// If IntersectionObserver is not supported, just show the blocks.
		if ( ! ( 'IntersectionObserver' in window ) || reduceMotion ) {
			this.el.classList.add( ACTIVE )
			return
		}

		if ( this.io ) {
			this.io.disconnect()
		}
		// Don't use threshold 1 because if a small part of the text is hidden,
		// the IO won't trigger.
		this.io = new IntersectionObserver( this.callback, { threshold: 0.25 } ) // eslint-disable-line compat/compat
		this.io.observe( this.el )
	}
}

class LumenCountUp {
	init = () => {
		const els = document.querySelectorAll( '.lmn-block-count-up__text' )
		els.forEach( el => {
			if ( ! el._LumenHasInitCountUp ) {
				const countUp = new _LumenCountUp( el )
				el.countUp = countUp
				countUp.init()
				el.LumenHasInitCountUp = true
			}
		} )
	}
}

window.lumenCountUp = new LumenCountUp()
domReady( window.lumenCountUp.init )
