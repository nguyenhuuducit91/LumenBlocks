/**
 * What makes the loop seamless.
 *
 * The block saves one set of its items. A row that holds one set can only
 * scroll off the screen and jump back; a row that holds the same set several
 * times over can step forward by exactly one set and land on an identical
 * picture, which reads as continuous motion. Those repeats cannot be saved with
 * the block — `InnerBlocks.Content` marks where the inner blocks go, and marking
 * it twice leaves the parser with more slots than blocks — so they are made
 * here, from the markup the block did save.
 *
 * How many: enough to cover the visible strip, plus one so there is always a
 * set waiting off the right-hand edge to take over. The keyframes read the
 * count back through `--lmn-marquee-copies` and work the step out from it, so
 * the animation stays correct at any width without being rewritten.
 */

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

const CLONE_CLASS = 'lmn-block-marquee__group--clone'

// Two is the least that can loop: one set on screen and one behind it.
const MIN_COPIES = 2

// A runaway width would clone until the tab died. No real marquee is narrower
// than a hundredth of its strip.
const MAX_COPIES = 100

class LumenMarquee {
	fill = marquee => {
		const viewport = marquee.querySelector( ':scope > .lmn-block-marquee__viewport' )
		const track = viewport?.querySelector( ':scope > .lmn-block-marquee__track' )
		const group = track?.querySelector( ':scope > .lmn-block-marquee__group' )

		if ( ! group ) {
			return
		}

		// Measure the original on its own. Leaving the previous clones in place
		// would make the group look as wide as the whole track.
		track.querySelectorAll( `:scope > .${ CLONE_CLASS }` ).forEach( clone => clone.remove() )

		const gap = parseFloat( getComputedStyle( track ).columnGap ) || 0
		const step = group.getBoundingClientRect().width + gap
		const width = viewport.getBoundingClientRect().width

		// Nothing in it yet, or the strip is not laid out — measuring now would
		// only produce a wrong answer to cache.
		if ( step <= gap || ! width ) {
			return
		}

		const copies = Math.min( MAX_COPIES, Math.max( MIN_COPIES, Math.ceil( width / step ) + 1 ) )

		for ( let i = 1; i < copies; i++ ) {
			const clone = group.cloneNode( true )
			clone.classList.add( CLONE_CLASS )

			// A copy is scenery. Screen readers should hear the items once, and
			// tabbing should not walk through the same three links four times.
			clone.setAttribute( 'aria-hidden', 'true' )
			clone.querySelectorAll( '[id]' ).forEach( el => el.removeAttribute( 'id' ) )
			clone.querySelectorAll( 'a, button, input, select, textarea, [tabindex]' )
				.forEach( el => el.setAttribute( 'tabindex', '-1' ) )

			track.appendChild( clone )
		}

		track.style.setProperty( '--lmn-marquee-copies', copies )
	}

	observe = marquee => {
		if ( ! window.ResizeObserver ) {
			return
		}

		// Filling changes the track's width, and the track is inside the thing
		// being observed. Watching the viewport alone would still fire, because
		// a scrollbar can come and go with it, so the work is deferred to the
		// next frame and coalesced — otherwise a resize can chase its own tail.
		let frame = null
		const observer = new ResizeObserver( () => {
			cancelAnimationFrame( frame )
			frame = requestAnimationFrame( () => this.fill( marquee ) )
		} )

		observer.observe( marquee )
	}

	init = () => {
		document.querySelectorAll( '.lmn-block-marquee' ).forEach( marquee => {
			if ( marquee._lumenHasInitMarquee ) {
				return
			}
			marquee._lumenHasInitMarquee = true

			this.fill( marquee )
			this.observe( marquee )

			// Images arrive after the first measurement and change how wide a
			// set is, so the ones that were still loading get a second pass.
			marquee.querySelectorAll( 'img' ).forEach( image => {
				if ( ! image.complete ) {
					image.addEventListener( 'load', () => this.fill( marquee ), { once: true } )
				}
			} )
		} )
	}
}

window.lumenMarquee = new LumenMarquee()
domReady( window.lumenMarquee.init )
