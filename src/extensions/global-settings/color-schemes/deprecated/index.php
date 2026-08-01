<?php
/**
 * This makes the color scheme inheritance broken.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_global_color_schemes_container_color_scheme_inheritance_deprecation' ) ) {

	function lumen_global_color_schemes_container_color_scheme_inheritance_deprecation( $styles ) {
		if ( get_option( 'lumen_use_v3_16_0_color_scheme_inheritance' ) ) {
			return [];
		}

		return $styles;
	}

	add_filter( 'lumen.global-settings.global-color-schemes.default-container-scheme', 'lumen_global_color_schemes_container_color_scheme_inheritance_deprecation' );
}
