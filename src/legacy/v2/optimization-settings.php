<?php
/**
 * Optimization Settings data handling.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Optimization_Settings_V2' ) ) {

	/**
	 * Lumen Global Settings
	 */
    class Lumen_Optimization_Settings_V2 {

		private $is_script_loaded = false;

		/**
		 * Initialize
		 */
        function __construct() {
			if ( lumen_has_v2_frontend_compatibility() || lumen_has_v2_editor_compatibility() ) {
				// Register our setting.
				add_action( 'admin_init', array( $this, 'register_optimization_settings' ) );
				add_action( 'rest_api_init', array( $this, 'register_optimization_settings' ) );

				// Prevent the scripts from loading normally. Low priority so we can remove the assets.
				if ( lumen_is_frontend() ) {
					add_action( 'init', array( $this, 'disable_frontend_scripts' ), 9 );

					// Load the scripts only when Lumen blocks are detected.
					add_filter( 'render_block', array( $this, 'load_frontend_scripts_conditionally' ), 10, 2 );
				}
			}
		}

		/**
		 * Register the settings we need for global settings.
		 *
		 * @return void
		 */
		public function register_optimization_settings() {
			register_setting(
				'lumen_optimization_settings',
				'lumen_optimize_script_load',
				array(
					'type' => 'boolean',
					'description' => __( 'Lumen optimization setting, only load scripts when there are Lumen blocks in the page', 'lumen-blocks' ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);
		}

		/**
		 * If the optimize script load is activated, prevent the normal loading
		 * process of the frontend scripts
		 *
		 * @return void
		 *
		 * @since 2.17.0
		 */
		public function disable_frontend_scripts() {
			if ( get_option( 'lumen_optimize_script_load' ) ) {
				remove_action( 'init', 'lumen_block_assets_v2' );
				remove_action( 'enqueue_block_assets', 'lumen_add_required_block_styles_v2' );
			}
		}

		/**
		 * If the optimize script load is activated, detect when blocks are used
		 * and only load the frontend scripts then.
		 *
		 * @param String $block_content
		 * @param Array $block
		 *
		 * @return void
		 *
		 * @since 2.17.0
		 */
		public function load_frontend_scripts_conditionally( $block_content, $block ) {
			if ( $block_content === null ) {
				return $block_content;
			}

			if ( ! $this->is_script_loaded && get_option( 'lumen_optimize_script_load' ) ) {
				if (
					( isset( $block['blockName'] ) && strpos( $block['blockName'], 'lmb/' ) === 0 ) ||
					strpos( $block_content, '<!-- wp:lmb/' ) !==  false ||
					strpos( $block_content, 'lmb-highlight' ) !==  false
				) {
					lumen_block_enqueue_frontend_assets_v2();
					lumen_add_required_block_styles_v2();
					$this->is_script_loaded = true;

					remove_filter( 'render_block', array( $this, 'load_frontend_scripts_conditionally' ), 10 );
				}
			}

			return $block_content;
		}
	}

	new Lumen_Optimization_Settings_V2();
}
