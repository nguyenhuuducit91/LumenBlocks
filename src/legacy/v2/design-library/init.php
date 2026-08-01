<?php
/**
 * V3 Design Library
 *
 * @since 	3.0.0
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Design_Library_V2' ) ) {
	class Lumen_Design_Library_V2 {
		/**
		 * Add our hooks.
		 */
		function __construct() {
			if ( lumen_has_v2_frontend_compatibility() || lumen_has_v2_editor_compatibility() ) {
				// Check whether we need to clear the design library cache.
				$this->reset_design_library_cache();

				// Add the v2 design library entries when the design library is fetched.
				add_filter( 'lumen_fetch_design_library', array( $this, 'fetch_v2_design_library' ) );

				// Register rest API endpoints used by the v2 design library.
				add_action( 'rest_api_init', array( $this, 'register_design_library_route' ) );

				// Also delete any cachces the v2 design library calls made.
				add_action( 'lumen_delete_design_library_cache', array( $this, 'delete_design_library_cache' ) );
			}
		}

		/**
		 * Checks whether the user just turned on the V2 compatibility, and if
		 * we should reset any cached design library files.
		 *
		 * @return void
		 */
		public function reset_design_library_cache() {
			$designs = get_transient( 'lumen_get_design_library_v3' );
			if ( ! empty( $designs ) && ! array_key_exists( 'v2', $designs ) ) {
				delete_transient( 'lumen_get_design_library_v3' );
			}
		}

		/**
		 * Fetch the v2 design library entries.
		 *
		 * @param Array $designs Existing designs.
		 * @return Array Design library entries.
		 */
		public function fetch_v2_design_library( $designs ) {
			$response = wp_remote_get( Lumen_Design_Library::get_cdn_url() . 'library/library-v2.json' );
			$content = wp_remote_retrieve_body( $response );
			$content = apply_filters( 'lumen_design_library_retreive_body', $content );

			$designs['v2'] = json_decode( $content, true );

			return $designs;
		}

		/**
		 * Regsiter v2 design library routes.
		 *
		 * @return void
		 */
		public function register_design_library_route() {
			register_rest_route( 'lumen/v2', '/block_designs/(?P<block>[\w\d-]+)', array(
				'methods' => 'GET',
				'callback' => array( $this, 'get_block_designs' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => array(
					'block' => array(
						'validate_callback' => 'Lumen_Design_Library::validate_string',
					),
				),
			) );
		}

		/**
		 * Delete design library block designs.
		 *
		 * @return void
		 */
		public function delete_design_library_cache() {
			global $wpdb;
			// The transients being deleted are the cache, so there is nothing to read
			// a cached list of them from, and no core API lists transients by prefix.
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$transients = $wpdb->get_col( "SELECT option_name FROM $wpdb->options WHERE option_name LIKE '_transient_lumen_get_block_designs_v2_%'" );

			if ( $transients ) {
				foreach ( $transients as $transient ) {
					$transient = preg_replace( '/^_transient_/i', '', $transient );
					delete_transient( $transient );
				}
			}
		}

		/**
		 * Get block designs.
		 *
		 * @param Array $request Rest API Request
		 * @return Array Block designs.
		 */
		public function get_block_designs( $request ) {
			$block = $request->get_param( 'block' );

			$designs = get_transient( 'lumen_get_block_designs_v2_' . $block );

			// Fetch designs.
			if ( empty( $designs ) ) {

				$response = wp_remote_get( Lumen_Design_Library::get_cdn_url() . 'library/block-' . $block . '.json' );
				$content = wp_remote_retrieve_body( $response );
				$content = apply_filters( 'lumen_design_library_retreive_body', $content );
				$designs = json_decode( $content, true );

				// Cache results.
				set_transient( 'lumen_get_block_designs_v2_' . $block, $designs, 7 * DAY_IN_SECONDS );
			}

			$designs = apply_filters( 'lumen_block_design_v2_' . $block, $designs );

			return rest_ensure_response( $designs );
		}
	}

	new Lumen_Design_Library_V2();
}
