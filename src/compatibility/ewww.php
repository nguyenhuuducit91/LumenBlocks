<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_image_optimizer_polyfill_frontend_script' ) ) {
	function lumen_load_image_optimizer_polyfill_frontend_script( $block_content ) {
		// If Easy IO setting is activated for EWWW Image Optimizer, dynamic images becomes blurry.
		// Load the script to fix the issue.
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-image-optimizer-polyfill',
				plugins_url( 'dist/frontend_image_optimizer_fallback.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);

			// Only do this once.
			remove_action( 'lumen/enqueue_scripts', 'lumen_load_image_optimizer_polyfill_frontend_script', 10 );
		}
	}

	function lumen_ewww_image_optimzer_plugin_checker() {
		if ( ! is_admin() && defined( 'EWWW_IMAGE_OPTIMIZER_PLUGIN_FILE' ) ) {
			// Load the script in the frontend if EWWW Image Optimizer is active.
			add_action( 'lumen/enqueue_scripts', 'lumen_load_image_optimizer_polyfill_frontend_script' );
		}
	}

	// Run the plugin checker after all plugins are loaded because
	// the condition defined( 'EWWW_IMAGE_OPTIMIZER_PLUGIN_FILE' ) may return false
	// even if the plugin is actually activated
	add_action( 'plugins_loaded', 'lumen_ewww_image_optimzer_plugin_checker' );
}
