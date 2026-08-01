<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_load_map_frontend_script' ) ) {
	function lumen_load_map_frontend_script() {
		if ( ! is_admin() ) {
			wp_enqueue_script(
				'lmn-frontend-map',
				plugins_url( 'dist/frontend_block_map.js', LUMEN_FILE ),
				array(),
				LUMEN_VERSION,
				true
			);
			wp_localize_script( 'lmn-frontend-map', 'lumenMapVars', array(
				'googleApiKey' => get_option( 'lumen_google_maps_api_key', '' ),
				'labelMissingMapApiKey' =>  __( 'This map block uses settings that require a Google Maps API key, but it is missing. Please enter your Google Maps API key in the Lumen settings, or edit this map block.', 'lumen-blocks' ),
			) );
		}
	}
	add_action( 'lumen/map/enqueue_scripts', 'lumen_load_map_frontend_script' );
}
