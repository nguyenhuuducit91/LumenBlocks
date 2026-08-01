/**
 * External dependencies
 */
import BigPicture from 'bigpicture'

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready'

domReady( () => {
	const elems = document.querySelectorAll( '.lmb-video-popup[data-video], .lmb-video-popup [data-video]' )

	// Sanitize caption.
	const sanitizeCaption = el => {
		const caption = el.getAttribute( 'data-caption' )
		if ( caption ) {
			el.setAttribute( 'data-caption', caption.replace( /<[^>]+>/g, '' ).replace( /[^\w. ]/gi, function( c ) {
				return '&#' + c.charCodeAt( 0 ) + ';'
			} ) )
		}
	}

	const openVideo = el => {
		if ( BigPicture ) {
			sanitizeCaption( el )
			const videoID = el.getAttribute( 'data-video' )
			const args = {
				el,
				noLoader: true,
			}
			if ( videoID.match( /^\d+$/g ) ) {
				args.vimeoSrc = videoID
			} else if ( videoID.match( /^https?:\/\//g ) ) {
				args.vidSrc = videoID
			} else {
				args.ytSrc = videoID
			}
			BigPicture( args )
		}
	}
	elems.forEach( el => {
		const a = el.querySelector( '.lmb-video-popup__overlay, a' )
		a.addEventListener( 'click', ev => {
			ev.preventDefault()
			openVideo( el )
		} )
	} )
} )
