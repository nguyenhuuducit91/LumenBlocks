<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_global_typography_selectors_v2' ) ) {
	function lumen_global_typography_selectors_v2( $selectors, $selector ) {
		// If the selector is a class selector, remove the white space in between.
		if ( stripos( $selector, '.' ) === 0 ) {
			$selectors[] = '.lmb-main-block' . $selector;
			$selectors[] = '.lmb-main-block' . $selector . ' p';
		} else {
			$selectors[] = '.lmb-main-block ' . $selector;
		}
		return $selectors;
	}
	add_filter( 'lumen_global_typography_selectors', 'lumen_global_typography_selectors_v2', 10, 2 );
}
