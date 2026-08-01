<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_expand_frontend_script' ) ) {
	function lumen_load_expand_frontend_script() {
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-expand',
				plugins_url( 'dist/frontend_block_expand.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
		}
	}
	add_action( 'lumen/expand/enqueue_scripts', 'lumen_load_expand_frontend_script' );
}
