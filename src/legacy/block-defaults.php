<?php
/**
 * Block Defaults are deprecated since v3.18.0
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_deprecated_block_defaults_option' ) ) {

	function lumen_deprecated_block_defaults_option() {
		// If true, Block Defaults will be enabled in the editor
		register_setting(
			'lumen_editor_settings',
			'lumen_enable_block_defaults',
			array(
				'type' => 'boolean',
				'description' => __( 'Use Block Defaults in the editor', 'lumen-blocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => false,
			)
		);
	}

	function lumen_add_deprecated_block_defaults_setting( $settings ) {
		$settings['lumen_enable_block_defaults'] = boolval( get_option( 'lumen_enable_block_defaults', false ) );
		return $settings;
	}

	// Make setting available in the editor.
	add_filter( 'lumen_js_settings', 'lumen_add_deprecated_block_defaults_setting' );
	add_action( 'init', 'lumen_deprecated_block_defaults_option' );
}

if ( ! function_exists( 'lumen_deprecated_block_defaults' ) ) {

	/**
	 * Upon upgrading to v3.18.0 or later, Block Defaults will be enabled only if existing Block Defaults are present;
	 * otherwise, they will be disabled.
	 * For new installations, Block Defaults will be disabled by default.
	 */
	function lumen_deprecated_block_defaults( $old_version, $new_version ) {
		if ( ! empty( $old_version ) && version_compare( $old_version, "3.18.0", "<" ) ) {

			// set option to true if there are saved block defaults
			if ( ! empty( get_option( 'lumen_block_styles', [] ) ) ) {
				update_option( 'lumen_enable_block_defaults', true, false );
			}
		}
	}

	function lumen_require_block_defaults_script() {
		if ( get_option( 'lumen_enable_block_defaults', false ) ) {
			require_once( plugin_dir_path( __FILE__ ) . 'block-defaults/custom-block-styles.php' );
		}
	}

	// Unhooked in Lumen: migrated sites upgrading from an upstream release older
	// than 3.18.0. Lumen's version line starts at 1.0.0, so this guard would compare
	// 1.x against 3.18.0 and wrongly re-run on every update.
	// add_action( 'lumen_early_version_upgraded', 'lumen_deprecated_block_defaults', 10, 2 );
	add_action( 'init', 'lumen_require_block_defaults_script' );
}
