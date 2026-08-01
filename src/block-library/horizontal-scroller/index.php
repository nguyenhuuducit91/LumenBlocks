<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_horizontalscroller_frontend_script' ) ) {
	function lumen_load_horizontalscroller_frontend_script() {
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-horizontal-scroller',
				plugins_url( 'dist/frontend_block_horizontal_scroller.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
		}
	}
	add_action( 'lumen/horizontal-scroller/enqueue_scripts', 'lumen_load_horizontalscroller_frontend_script' );
}

