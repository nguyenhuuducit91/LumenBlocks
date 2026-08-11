<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * In WooCommerce Shop page, <style> tags are stripped out and the CSS styles are displayed in the frontend.
 * This function removes the <style> tags and CSS styles before they are stripped out.
 */
if ( ! function_exists( 'lumen_pre_kses_woocomerce_shop' ) ) {

	function lumen_pre_kses_woocomerce_shop( $content, $allowed_html, $context ) {
		// Looked up once per request rather than on every kses call: while this
		// filter is attached it runs for each piece of content WordPress
		// sanitizes, and a database read on each of those adds up.
		static $optimized_css = null;

		if ( $optimized_css === null ) {
			$optimized_css = (string) get_post_meta( wc_get_page_id( 'shop' ), 'lumen_optimized_css', true );
		}

		if ( $optimized_css === '' ) {
			return $content;
		}

		// remove CSS before kses strips out <style> tags
		return str_replace( '<style>' . $optimized_css . '</style>', '', $content );
	}

	function lumen_is_woocommerce_shop_page() {
		// only add filter when on the WooCommerce Shop page
		if ( function_exists('is_shop' ) && is_shop() ) {
			add_filter('pre_kses', 'lumen_pre_kses_woocomerce_shop', 10, 3);
		}

	}

	/**
	 * Let go of `pre_kses` once the shop loop is over.
	 *
	 * `pre_kses` is global: everything WordPress sanitizes goes through it. The
	 * filter used to be attached for the rest of the request, so content that
	 * had nothing to do with the shop — comments, widgets, whatever another
	 * plugin sanitized later — was still being handed to it. It is only needed
	 * between these two hooks, so that is how long it now stays.
	 */
	function lumen_remove_pre_kses_woocommerce_shop() {
		remove_filter( 'pre_kses', 'lumen_pre_kses_woocomerce_shop', 10 );
	}

	add_action( 'woocommerce_before_main_content', 'lumen_is_woocommerce_shop_page' );
	add_action( 'woocommerce_after_main_content', 'lumen_remove_pre_kses_woocommerce_shop' );
}

if ( ! function_exists( 'lumen_check_if_woocommerce_shop' ) ) {

	function lumen_check_if_woocommerce_shop( $optimize_css ) {
		// Load cached CSS for the WooCommerce Shop page
		// is_singular() returns false when on the Shop page so we need to use is_shop()
		return $optimize_css || ( function_exists('is_shop' ) && is_shop() );
	}

	add_filter( 'lumen/load_cached_css_for_post', 'lumen_check_if_woocommerce_shop' );
}

if ( ! function_exists( 'lumen_get_woocommerce_shop_page_id' ) ) {

	function lumen_get_woocommerce_shop_page_id( $post_id ) {
		// use wc_get_page_id() to retrieve the page ID of the Shop page
		// do this because get_the_ID() returns the product page ID when on the Shop page
		if ( function_exists('is_shop' ) && is_shop() ) {
			return wc_get_page_id( 'shop' );
		}
		return $post_id;
	}

	add_filter( 'lumen/get_post_id_for_cached_css', 'lumen_get_woocommerce_shop_page_id' );

}
