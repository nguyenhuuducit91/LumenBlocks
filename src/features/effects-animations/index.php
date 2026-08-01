<?php
/**
 * Motion effects.
 *
 * Loads the script that starts entrance animations. It rides on the same hook
 * as the rest of the frontend assets, so it arrives only on pages that
 * actually have a Lumen block on them.
 *
 * The animation is CSS and ships with the block styles; this script only
 * decides when it starts. If it fails to load, blocks are simply visible.
 *
 * @package Lumen
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'lumen_load_motion_effects_script' ) ) {

	/**
	 * Enqueues the entrance-animation script on the front end.
	 */
	function lumen_load_motion_effects_script() {
		if ( is_admin() ) {
			return;
		}

		wp_enqueue_script(
			'lmn-frontend-motion-effects',
			plugins_url( 'dist/frontend_motion_effects.js', LUMEN_FILE ),
			array(),
			LUMEN_VERSION,
			true
		);
	}

	add_action( 'lumen_block_enqueue_frontend_assets', 'lumen_load_motion_effects_script' );
}
