<?php
/**
 * This allows non-admin users to read Lumen Options for Global Settings in the Editor
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Admin_Settings' ) ) {

	class Lumen_Admin_Settings extends WP_REST_Settings_Controller {

		/**
		 * Constructor.
		 *
		 */
		public function __construct() {
			$this->namespace = 'lumen/v3';
			$this->rest_base = 'settings';
			add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		}

		public function register_routes() {
			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base,
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'args'                => array(),
					'permission_callback' => array( $this, 'retrieve_item_permissions_check' ),
				)
			);
		}

		public function retrieve_item_permissions_check( $request ) {
			return current_user_can( 'edit_posts' );
		}

		/**
		 * Retrieves only the Lumen registered options
		 *
		 * @return array Array of registered options.
		 */
		protected function get_registered_options() {
			$rest_options = parent::get_registered_options();

			$rest_options = array_filter(
				$rest_options,
				function( $key ) {
					return strpos( $key, 'lumen' ) === 0;
				},
				ARRAY_FILTER_USE_KEY
			);

			return $rest_options;
		}
	}

	new Lumen_Admin_Settings();
}
