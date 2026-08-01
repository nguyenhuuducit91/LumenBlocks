<?php
/**
 * Ships designs with the plugin, for both design library tabs.
 *
 * The library reads from whatever CDN the site points it at, and ships pointing
 * at none — so out of the box both tabs opened empty. These designs are merged
 * into whatever the CDN returns (or into nothing, if there is no CDN), which
 * means a fresh install has something to insert on the first day.
 *
 * Two sets, one mechanism:
 *   - patterns.php — single sections, for the Patterns tab.
 *   - pages.php    — whole page templates, for the Pages tab.
 *
 * Both are generated rather than written by hand; see the header of either file.
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
		 * @var array Keyed by set name.
		 */
		private static $cache = array();

		public function __construct() {
			add_filter( 'lumen_design_library', array( $this, 'add_patterns' ), 10, 2 );
		}

		/**
		 * Reads a generated design file, once per request per set.
		 *
		 * The two files are large and only one of them is ever needed on a given
		 * request, so neither is loaded until the tab that shows it is opened.
		 *
		 * @param string $set Either `patterns` (single sections) or `pages`.
		 *
		 * @return array Designs keyed by id.
		 */
		public static function get_designs( $set = 'patterns' ) {
			if ( ! isset( self::$cache[ $set ] ) ) {
				$file = plugin_dir_path( __FILE__ ) . ( $set === 'pages' ? 'pages.php' : 'patterns.php' );
				$designs = file_exists( $file ) ? require $file : array();
				self::$cache[ $set ] = is_array( $designs ) ? $designs : array();
			}
			return self::$cache[ $set ];
		}

		/**
		 * Back-compat shim for anything that called the single-set accessor.
		 *
		 * @return array
		 */
		public static function get_patterns() {
			return self::get_designs( 'patterns' );
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
			$set = $type === 'pages' ? 'pages' : 'patterns';

			$patterns = apply_filters(
				'lumen_built_in_patterns',
				self::get_designs( $set ),
				$set
			);
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
