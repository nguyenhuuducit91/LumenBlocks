<?php
/**
 * Loads the Font Awesome Kit
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Icons' ) ) {

	/**
	 * Lumen Icons
	 */
    class Lumen_Icons {

		/**
		 * Initialize
		 */
        function __construct() {
			add_action( 'admin_init', array( $this, 'register_icon_settings' ) );
			add_action( 'rest_api_init', array( $this, 'register_icon_settings' ) );

			// Make our settings available in the editor.
			add_action( 'lumen_localize_script', array( $this, 'add_settings' ) );
		}

		/**
		 * Register the setting to select FontAwesome version
		 *
		 * @return void
		 */
		public function register_icon_settings() {
			register_setting(
				'lumen_icons',
				'lumen_icons_fa_free_version',
				array(
					'type' => 'string',
					'description' => __( 'Select FontAwesome version', 'lumen-blocks' ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);
		}

		/**
		 * Add the JS variables needed by our icon settings.
		 *
		 * @param array $args
		 * @return array
		 */
		public function add_settings( $args ) {
			return array_merge( $args, array(
				'iconsFaFreeKitVersion' => get_option( 'lumen_icons_fa_free_version' ),
			) );
			return $args;
		}
	}

	new Lumen_Icons();
}
