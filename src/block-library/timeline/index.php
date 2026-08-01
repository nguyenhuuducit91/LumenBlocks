<?php
/**
 * In charge of loading the frontend polyfill for timeline block
 * accent color fill for iOS devices
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_timeline_ios_frontend_polyfill' ) ) {
	function lumen_load_timeline_ios_frontend_polyfill( $block_content, $block ) {
		// Add class lmn-block-timeline__ios-polyfill to $block_content
		return preg_replace( '/lmn-block-timeline/', 'lmn-block-timeline lmn-block-timeline__ios-polyfill', $block_content, 1 );
	}

	$lumen_user_agent = ! empty( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';
	// Add polyfill if device is iPhone/iPad
	// Include Safari because by default the User Agent in Safari on iPadOS is same  on MacOS
	// Reference: https://developer.apple.com/forums/thread/119186
	if ( ! empty( $lumen_user_agent ) && ( stripos( $lumen_user_agent, 'iPhone' ) !== false || stripos( $lumen_user_agent, 'iPad' ) !== false || stripos( $lumen_user_agent, 'Safari/' ) !== false ) ) {
		add_filter( 'render_block_lumen/timeline', 'lumen_load_timeline_ios_frontend_polyfill', 10, 2 );
	}
}
