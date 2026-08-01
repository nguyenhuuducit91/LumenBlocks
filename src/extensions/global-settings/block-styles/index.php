<?php
/**
 * Lumen Global Block Styles
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if ( ! class_exists( 'Lumen_Global_Block_Styles' ) ) {
	/**
	 * Lumen Global Block Styles
	 */
    class Lumen_Global_Block_Styles {

		/**
		 * Initialize
		 */
		public static $lumen_global_block_styles = array();

  		function __construct() {
			// Register our settings.
			add_action( 'lumen_register_global_settings', array( $this, 'register_block_styles' ) );

			if ( lumen_is_frontend() ) {
				// Add the Global Block Styles styles in the frontend only.
				add_filter( 'lumen_inline_styles_nodep', array( $this, 'add_global_block_styles' ) );
			}
		}

		/**
		 * Register the settings we need for global color schemes.
		 *
		 * @return void
		 */
		public function register_block_styles() {
			register_setting(
				'lumen_global_settings',
				'lumen_global_block_styles',
				array(
					'type' => 'object',
					'description' => __( 'Lumen Block Styles', 'lumen-blocks' ),
					'sanitize_callback' => array( $this, 'sanitize_array_setting' ),
					'show_in_rest' => array(
						'schema' => array(
							'type' => 'object',
							// The keys are block names in kebab case.
							// The values are the block styles array for the block.
							'additionalProperties' => array(
								'type' => 'array',
								'items' => array(
									'type' => 'object',
									'properties' => array(
										'name' => array(
											'type' => 'string',
										),
										'slug' => array(
											'type' => 'string',
										),
										'attributes' => array(
											'type' => 'object',
											'additionalProperties' => true,
										),
										'nonCssAttributes' => array(
											'type' => 'object',
											'additionalProperties' => true,
										),
										'saveCss' => array(
											'type' => 'string',
										),
										'editCss' => array(
											'type' => 'string',
										),
									),
								),
							),
						),
					),
					'default' => array(),
				)
			);
		}

		public function sanitize_array_setting( $input ) {
			return ! is_array( $input ) ? array( array() ) : $input;
		}


		/**-----------------------------------------------------------------------------
		 * Global Block Styles functions
		 *-----------------------------------------------------------------------------*/

		 /**
		  * Compiles all the global block styles CSS
		  */
		public function add_global_block_styles( $current_css ) {
			$global_block_styles = get_option( 'lumen_global_block_styles' );

			if ( ! $global_block_styles ) {
				return $current_css;
			}

			$block_style_css = "";

			foreach ( $global_block_styles as $block => $block_styles ) {
				$block_style_css .= "\n/* Global Block Styles ($block) */\n";
				foreach ( $block_styles as $block_style ) {
					$block_style_css .= $block_style[ 'saveCss' ];
				}
			}

			$current_css .= $block_style_css;

			return $current_css;
		}
	}

	new Lumen_Global_Block_Styles();
}
