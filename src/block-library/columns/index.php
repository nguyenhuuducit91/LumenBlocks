<?php
/**
 * In charge of loading the frontend polyfill for columns block :has() selector
 * support
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_columns_firefox_frontend_polyfill' ) ) {
	function lumen_load_columns_firefox_frontend_polyfill( $block_content, $block ) {
		if ( count( $block['innerBlocks'] ) === 1 ) {
			// Add class lmn-block-columns--has-single-block-polyfill to $block_content
			return preg_replace( '/lmn-block-columns/', 'lmn-block-columns lmn-block-columns--has-single-block-polyfill', $block_content, 1 );
		}
		return $block_content;
	}

	$lumen_user_agent = ! empty( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';
	if ( ! empty( $lumen_user_agent ) && stripos( $lumen_user_agent, 'Firefox/' ) !== false ) {
		add_filter( 'render_block_lumen/columns', 'lumen_load_columns_firefox_frontend_polyfill', 10, 2 );
	}
}
