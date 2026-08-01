<?php
/**
 * Navigation panel was enabled by default in v3.10.1 and below.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_deprecated_navigation_panel_pre_enabled' ) ) {

	/**
	 * When upgrading to v3.10.2 and above, if the navigation panel was enabled, keep it enabled.
	 *
	 * @since 3.10.2
	 */
	function lumen_deprecated_navigation_panel_pre_enabled( $old_version, $new_version ) {
		if ( ! empty( $old_version ) && version_compare( $old_version, "3.10.2", "<" ) ) {
			// If the option was left as default (enabled), enable it because we changed the default to disabled.
			if ( get_option( 'lumen_enable_navigation_panel' ) === false ) {
				update_option( 'lumen_enable_navigation_panel', '1', 'no' ); // Enable the navigation panel
			}
		}
	}
	// Unhooked in Lumen: migrated sites upgrading from an upstream release older
	// than 3.10.2. Lumen's version line starts at 1.0.0, so this guard would compare
	// 1.x against 3.10.2 and wrongly re-run on every update.
	// add_action( 'lumen_early_version_upgraded', 'lumen_deprecated_navigation_panel_pre_enabled', 10, 2 );
}
