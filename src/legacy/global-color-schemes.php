<?php
/**
 * Global Color Schemes has a bug in v3.16.0-v3.16.2
 * We added an option that allows users to use the v3.16.0 color scheme inheritance (broken)
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_global_color_schemes_set_color_scheme_inheritance' ) ) {

	/**
	 * When upgrading to v3.16.3 and above, check if the default container scheme is empty.
	 * If so, update the option to true -- keep the borken color scheme inheritance.
	 * Otherwise, it will use the fixed color scheme inheritance.
	 */
	function lumen_global_color_schemes_set_color_scheme_inheritance( $old_version, $new_version ) {
		if ( ! empty( $old_version ) && version_compare( $old_version, "3.16.3", "<" ) ) {
			$color_schemes = Lumen_Global_Color_Schemes::get_color_schemes_array();

			// If there are no color schemes, do nothing
			if ( ! $color_schemes ) {
				return;
			}

			$container_default = isset( $color_schemes[ get_option( 'lumen_global_container_mode_color_scheme' ) ] )  ? get_option( 'lumen_global_container_mode_color_scheme' ) : 'scheme-default-1';

			if ( Lumen_Global_Color_Schemes::is_scheme_empty( $color_schemes[ $container_default ] ) ) {
				update_option( 'lumen_use_v3_16_0_color_scheme_inheritance', true, 'no' );
			}
		}
	}
	// Unhooked in Lumen: migrated sites upgrading from an upstream release older
	// than 3.16.3. Lumen's version line starts at 1.0.0, so this guard would compare
	// 1.x against 3.16.3 and wrongly re-run on every update.
	// add_action( 'lumen_early_version_upgraded', 'lumen_global_color_schemes_set_color_scheme_inheritance', 10, 2 );
}
