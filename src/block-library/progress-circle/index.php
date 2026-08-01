<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_progresscircle_frontend_script' ) ) {
	function lumen_load_progresscircle_frontend_script() {
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-progress-circle',
				plugins_url( 'dist/frontend_block_progress_circle.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
		}
	}
	add_action( 'lumen/progress-circle/enqueue_scripts', 'lumen_load_progresscircle_frontend_script' );
}

// Remove commas when the progress value is text field from dynamic content
if ( ! function_exists( 'lumen_progress_circle_value_remove_commas' ) ) {
	function lumen_progress_circle_value_remove_commas( $block_content, $block ) {
		if ( empty( $block_content ) ) {
			return $block_content;
		}

		if ( stripos( $block_content, ',' ) === false ) {
			return $block_content;
		}

		return preg_replace_callback( '/--progress-value:[^%;\}]+/', function ( $matches ) {
			return str_replace( ',', '', $matches[0] );
		}, $block_content );
	}

	add_filter( 'render_block_lumen/progress-circle', 'lumen_progress_circle_value_remove_commas', 99, 2 );
}
