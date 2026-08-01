<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Editor_Settings' ) ) {
	class Lumen_Editor_Settings {

		/**
		 * Add our hooks.
		 */
		function __construct() {
			// Register settings.
			add_action( 'admin_init', array( $this, 'register_settings' ) );
			add_action( 'rest_api_init', array( $this, 'register_settings' ) );

			// Make our settings available in the editor.
			add_filter( 'lumen_js_settings', array( $this, 'add_settings' ) );

			// Add block nested widths CSS.
			add_action( 'lumen_inline_styles', array( $this, 'add_nested_block_width' ) );
			add_action( 'lumen_inline_editor_styles', array( $this, 'add_nested_block_width' ) );
		}

		/**
		 * Register the setting.
		 *
		 * @return void
		 */
		public function register_settings() {
			register_setting(
				'lumen_editor_settings',
				'lumen_hide_cimo_notice',
				array(
					'type' => 'boolean',
					'description' => __( 'Hides the Cimo download notice.', LUMEN_I18N ),
					'sanitize_callback' => 'rest_sanitize_boolean',
					'show_in_rest' => true,
					'default' => false,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_block_states',
				// Use an object to store the block names as keys and the value that represents if disabled or hidden.
				// Enabled blocks are not stored in the object to save memory.
				array(
					'type' => 'object',
					'description' => __( 'Blocks that should be hidden in the block editor', LUMEN_I18N ),
					'sanitize_callback' => array( $this, 'sanitize_array_setting' ),
					'show_in_rest' => array(
						'schema' => array(
							'type' => 'object',
							'additionalProperties' => array(
								'type' => 'number',
							),
						),
					),
					'default' => array(),
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_google_maps_api_key',
				array(
					'type' => 'string',
					'description' => __( 'Enables additional customization options for the Map Block.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_design_library',
				array(
					'type' => 'boolean',
					'description' => __( 'Hides the Lumen Design Library button on the top of the editor', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_optimize_inline_css',
				array(
					'type' => 'boolean',
					'description' => __( 'Optimizes inlined CSS styles, combines together similar selectors', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_block_default_width',
				array(
					'type' => 'string',
					'description' => __( 'The width used when a Columns block has its Content Width set to center.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_block_wide_width',
				array(
					'type' => 'string',
					'description' => __( 'The width used when a Columns block has its Content Width set to wide.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_auto_collapse_panels',
				array(
					'type' => 'boolean',
					'description' => __( 'Collapse other inspector panels when opening another, keeping only one open at a time.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_global_settings',
				array(
					'type' => 'boolean',
					'description' => __( 'Allow the configuration of global settings such as color palette, typography, and block defaults', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_block_linking',
				array(
					'type' => 'boolean',
					'description' => __( 'Gives you the ability to link columns. Any changes you make on one column will automatically get applied on the other columns.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => false,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_help_tooltip_disabled',
				array(
					'type' => 'string',
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => '',
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_text_highlight',
				array(
					'type' => 'boolean',
					'description' => __( 'Adds a toolbar button for highlighting text', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_dynamic_content',
				array(
					'type' => 'boolean',
					'description' => __( 'Adds a toolbar button for inserting dynamic content', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_copy_paste_styles',
				array(
					'type' => 'boolean',
					'description' => __( 'Adds a toolbar button for copying and pasting block styles', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_reset_layout',
				array(
					'type' => 'boolean',
					'description' => __( 'Adds a toolbar button for resetting the layout of a block', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_save_as_default_block',
				array(
					'type' => 'boolean',
					'description' => __( 'Adds a toolbar button for saving the current block variation as the default block', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);

			register_setting(
				'lumen_editor_settings',
				'lumen_enable_text_default_block',
				array(
					'type' => 'boolean',
					'description' => __( 'If this is enabled, the default block when adding a new block will be the Lumen Text block.', LUMEN_I18N ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => false,
				)
			);
		}

		public function sanitize_array_setting( $input ) {
			return ! is_array( $input ) ? array( array() ) : $input;
		}

		/**
		 * Make our settings available in the editor.
		 *
		 * @param Array $settings
		 * @return Array Settings array to be loaded in the editor.
		 */
		public function add_settings( $settings ) {
			$settings['lumen_google_maps_api_key'] = get_option( 'lumen_google_maps_api_key' );
			$settings['lumen_block_states'] = get_option( 'lumen_block_states' );
			$settings['lumen_enable_design_library'] = get_option( 'lumen_enable_design_library' );
			$settings['lumen_optimize_inline_css'] = get_option( 'lumen_optimize_inline_css' );
			$settings['lumen_auto_collapse_panels'] = get_option( 'lumen_auto_collapse_panels' );
			$settings['lumen_enable_global_settings'] = get_option( 'lumen_enable_global_settings' );
			$settings['lumen_enable_block_linking'] = get_option( 'lumen_enable_block_linking' );
			$settings['lumen_enable_text_highlight'] = get_option( 'lumen_enable_text_highlight' );
			$settings['lumen_enable_dynamic_content'] = get_option( 'lumen_enable_dynamic_content' );
			$settings['lumen_enable_copy_paste_styles'] = get_option( 'lumen_enable_copy_paste_styles' );
			$settings['lumen_enable_reset_layout'] = get_option( 'lumen_enable_reset_layout' );
			$settings['lumen_enable_save_as_default_block'] = get_option( 'lumen_enable_save_as_default_block' );
			$settings['lumen_enable_text_default_block'] = get_option( 'lumen_enable_text_default_block' );

			return $settings;
		}

		/**
		 * Add styles for the block nested widths.
		 *
		 * @param String $css
		 * @return String CSS to be added.
		 */
		public function add_nested_block_width( $css ) {
			$default_width = get_option( 'lumen_block_default_width' );
			$wide_width = get_option( 'lumen_block_wide_width' );

			if ( ! empty( $default_width ) || ! empty( $wide_width ) ) {
				$css .= ':root {';
					if ( ! empty( $default_width ) ) {
						$default_width .= is_numeric( $default_width ) ? 'px' : '';
						$css .= '--lmn-block-default-width: ' . esc_attr( $default_width ) . ';';
					}
					if ( ! empty( $wide_width ) ) {
						$wide_width .= is_numeric( $wide_width ) ? 'px' : '';
						$css .= '--lmn-block-wide-width: ' . esc_attr( $wide_width ) . ';';
					}

					$css .= '}';
			}

			return $css;
		}
	}

	new Lumen_Editor_Settings();
}
