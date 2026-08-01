<?php
/**
 * FontAwesome icons v5.15.4 is used in v3.12.6 and below.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_font_awesome_icons_version_set_default' ) ) {

	/**
	 * When upgrading to v3.12.7 and above, use FontAwesome icons v5.15.4 by default.
	 * If new installation, use FontAwesome icons v6.5.1.
	 *
	 */
	function lumen_font_awesome_icons_version_set_default( $old_version, $new_version ) {
		if ( ! empty( $old_version ) && version_compare( $old_version, "3.12.7", "<" ) ) {
			// Use FontAwesome icons v5.15.4 for users upgrading from v3.12.6 and below.
			if ( ! get_option( 'lumen_icons_fa_free_version' ) || get_option( 'lumen_icons_fa_free_version' ) === '5.15.4' ) {
				update_option( 'lumen_icons_fa_free_version', '5.15.4', 'no' );
			}
		}
	}
	// Unhooked in Lumen: migrated sites upgrading from an upstream release older
	// than 3.12.7. Lumen's version line starts at 1.0.0, so this guard would compare
	// 1.x against 3.12.7 and wrongly re-run on every update.
	// add_action( 'lumen_early_version_upgraded', 'lumen_font_awesome_icons_version_set_default', 10, 2 );
}
