<?php
/**
 * Loads the lightbox scripts and styles that will make the lightbox work in the
 * frontend.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_lightbox_frontend_script' ) ) {
	function lumen_load_lightbox_frontend_script( $block_content ) {
		if ( strpos( $block_content, 'lmn--has-lightbox' ) !== false ) {
			wp_enqueue_script(
				'lmn-frontend-image-lightbox',
				plugins_url( 'dist/frontend_image_lightbox.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
			wp_enqueue_style(
				'lmn-frontend-image-lightbox',
				plugins_url( 'dist/frontend_image_lightbox.css', LUMEN_FILE ),
				array(),
				LUMEN_VERSION
			);

			// Only do this once.
			remove_action( 'lumen/enqueue_scripts', 'lumen_load_lightbox_frontend_script', 10 );
		}
	}

	if ( ! is_admin() ) {
		add_action( 'lumen/enqueue_scripts', 'lumen_load_lightbox_frontend_script' );
	}
}
