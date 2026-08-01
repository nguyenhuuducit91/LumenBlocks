<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_countdown_frontend_script' ) ) {
	function lumen_load_countdown_frontend_script() {
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-countdown',
				plugins_url( 'dist/frontend_block_countdown.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
		}
	}
	add_action( 'lumen/countdown/enqueue_scripts', 'lumen_load_countdown_frontend_script' );
}
