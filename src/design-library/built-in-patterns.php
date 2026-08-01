<?php
/**
 * Ships a set of patterns with the plugin.
 *
 * The design library reads from whatever CDN the site points it at, and ships
 * pointing at none — so out of the box it opened empty. These patterns are
 * merged into whatever the CDN returns (or into nothing, if there is no CDN),
 * which means a fresh install has something to insert on the first day.
 *
 * The templates live in patterns.php and are generated rather than written by
 * hand; see the header of that file.
 *
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Built_In_Patterns' ) ) {
	class Lumen_Built_In_Patterns {

		/**
		 * The design library API version these are written against.
		 */
		const API_VERSION = 'v4';

		/**
		 * Loaded templates, kept for the life of the request.
		 *
		 * @var array|null
		 */
		private static $cache = null;

		public function __construct() {
			add_filter( 'lumen_design_library', array( $this, 'add_patterns' ), 10, 2 );
		}

		/**
		 * Reads the generated pattern file once per request.
		 *
		 * @return array Designs keyed by id.
		 */
		public static function get_patterns() {
			if ( self::$cache === null ) {
				$file = plugin_dir_path( __FILE__ ) . 'patterns.php';
				$patterns = file_exists( $file ) ? require $file : array();
				self::$cache = is_array( $patterns ) ? $patterns : array();
			}
			return self::$cache;
		}

		/**
		 * Merges the built-in patterns into the design library response.
		 *
		 * @param array  $designs The library, keyed by API version.
		 * @param string $type    Either `patterns` or `pages`.
		 *
		 * @return array
		 */
		public function add_patterns( $designs, $type = 'patterns' ) {
			// These are sections, not whole pages. Adding them to the Pages tab
			// would promise a layout and deliver a band.
			if ( $type !== 'patterns' ) {
				return $designs;
			}

			$patterns = apply_filters( 'lumen_built_in_patterns', self::get_patterns() );
			if ( empty( $patterns ) ) {
				return $designs;
			}

			if ( ! is_array( $designs ) ) {
				$designs = array();
			}

			/*
			 * A cached failure from a previous request would otherwise still be
			 * in here, and the editor shows any error key it finds instead of the
			 * designs beside it. Having patterns to show makes those stale.
			 */
			unset( $designs['wp_remote_get_error'] );
			unset( $designs['content_error'] );

			$existing = isset( $designs[ self::API_VERSION ] ) && is_array( $designs[ self::API_VERSION ] )
				? $designs[ self::API_VERSION ]
				: array();

			// CDN designs win on an id clash: a site that configured a library
			// meant to override what ships here.
			$designs[ self::API_VERSION ] = array_merge( $patterns, $existing );

			return $designs;
		}
	}

	new Lumen_Built_In_Patterns();
}
