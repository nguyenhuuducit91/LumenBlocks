/**
 * Running entrance animations as blocks are scrolled to.
 *
 * The animation itself is CSS. All this does is decide when it starts, which
 * CSS on its own cannot: an animation declared on a block below the fold plays
 * out while nobody is looking at it, and the reader scrolls down to something
 * that already finished.
 *
 * Two properties of this are deliberate.
 *
 * A block is only hidden once this file has run. If the script fails to load,
 * is blocked, or throws, every block is simply visible — the worst case is a
 * page without animations, never a page without content.
 *
 * Which blocks animate is read from the CSS rather than from an attribute in
 * the markup. `--lmn-entrance` is set by the same responsive machinery as every
 * other style, so a block that animates on a desktop and not on a phone needs
 * no extra logic here: at that width the property is simply not there.
 */

const READY = 'lmn--entrance-ready'
const VISIBLE = 'lmn--entrance-visible'

// Enough of the block on screen to count as arrived at.
const THRESHOLD = 0.15

// Fires slightly before the block reaches the viewport, so the animation is
// already under way by the time it is properly in view.
const MARGIN = '0px 0px -40px 0px'

/**
 * Whether a block asks for an entrance at the current width.
 *
 * @param {Element} block A block element.
 * @return {boolean} Whether it animates.
 */
const wantsEntrance = block => !! window.getComputedStyle( block )
	.getPropertyValue( '--lmn-entrance' )
	.trim()

/**
 * Arms every block that asks for an entrance, and reveals each as it arrives.
 */
const init = () => {
	const blocks = Array.from( document.querySelectorAll( '.lmn-block' ) )
		.filter( wantsEntrance )

	if ( ! blocks.length ) {
		return
	}

	/*
	 * Without an observer there is nothing sensible to wait for, so the blocks
	 * are left alone and the page reads normally.
	 */
	if ( typeof window.IntersectionObserver === 'undefined' ) {
		return
	}

	const observer = new window.IntersectionObserver( ( entries, self ) => {
		entries.forEach( entry => {
			if ( ! entry.isIntersecting ) {
				return
			}

			entry.target.classList.add( VISIBLE )

			// An entrance happens once. Watching afterwards would replay it
			// every time the reader scrolled back up.
			self.unobserve( entry.target )
		} )
	}, {
		threshold: THRESHOLD,
		rootMargin: MARGIN,
	} )

	blocks.forEach( block => {
		block.classList.add( READY )

		/*
		 * A block already on screen when the page loads would otherwise wait
		 * for the observer's first callback, showing a blank space for a frame.
		 */
		observer.observe( block )
	} )
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init )
} else {
	init()
}
