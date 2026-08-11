<?php
/**
 * This is in charge of enabling/disbling the show Go Premium notices in the editor.
 *
 * There are 2 Go Premium notices: 1 small notices, the rest of the notices.
 * These are controlled by:
 * 1. The const LUMEN_SHOW_PRO_NOTICES
 *    - If true, then all notices will show up. If false, hide everything.
 * 2. The option 'lumen_show_pro_notice'
 *    - If true, then all notices will show up. If false, hide everything.
 *    - Similar to how the const LUMEN_SHOW_PRO_NOTICES works.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_show_pro_notices_option' ) ) {

	/**
	 * Gets whether the Go Premium notices are set to show or hide from the options.
	 * If the option is not yet set (e.g. new install), this is considered "show".
	 *
	 * @return Array
	 */
	function lumen_show_pro_notices_option() {
		$show_pro_notice = get_option( 'lumen_show_pro_notices' );
		if ( $show_pro_notice === false ) {
			return true;
		}
		return $show_pro_notice === '1';
	}
}

if ( ! function_exists( 'lumen_register_show_pro_notice_option' ) ) {

	/**
	 * Ajax handler for saving the setting for the Go Premium show/hide notices.
	 */
	function lumen_register_show_pro_notice_option() {
		register_setting(
			'lumen_show_pro_notices',
			'lumen_show_pro_notices',
			array(
				'type' => 'string',
				'description' => __( 'Hide "Go Premium" notices', 'lumen-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '1',
			)
		);
	}
	add_action( 'admin_init', 'lumen_register_show_pro_notice_option' );
	add_action( 'rest_api_init', 'lumen_register_show_pro_notice_option' );
}

if ( ! function_exists( 'lumen_should_show_pro_notices' ) ) {

	/**
	 * Should we show all premium notices?
	 *
	 * @return Boolean
	 */
	function lumen_should_show_pro_notices() {
		/*
		 * There is no premium build of this plugin, so there is nothing for a
		 * "Go Premium" notice to point at. The machinery around it is kept only
		 * so that the legacy v2 modules which read this can go on calling it —
		 * they hide their upsells when it is false, which is now always.
		 */
		return false;
	}
}
