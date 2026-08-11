<?php
/**
 * Size and Spacing Preset Controls
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Size_And_Spacing_Preset_Controls' ) ) {

	/**
	 * Size and Spacing Preset Controls
	 */
    class Lumen_Size_And_Spacing_Preset_Controls {
		public const PRESET_MAPPING = array(
			'fontSizes' => array(
				'settings' => array('typography', 'fontSizes' ),
				'prefix' => 'font-size',
			),
			'spacingSizes' => array(
				'settings' => array( 'spacing', 'spacingSizes' ),
				'prefix' => 'spacing',
			),
			'blockHeights' => array(
				'settings' => array( 'blockHeights' ),
				'prefix' => 'block-height',
			),
			'borderRadius' => array(
				'settings' => array( 'borderRadius' ),
				'prefix' => 'border-radius',
			),
		);

		public $custom_presets;
		public $theme_presets;
		public $default_presets;
		public $lumen_presets;

		/**
		 * Initialize
		 */
  		function __construct() {
			add_action( 'lumen_register_global_settings', array( $this, 'register_use_size_presets_by_default' ) );
			// Unhooked in Lumen: migrated sites upgrading from an upstream release older
			// than 3.16.0. Lumen's version line starts at 1.0.0, so this guard would compare
			// 1.x against 3.16.0 and wrongly re-run on every update.
			// add_action( 'lumen_early_version_upgraded',  array( $this, 'use_size_presets_by_default_set_default' ), 10, 2 );
			// Unhooked in Lumen: migrated sites upgrading from an upstream release older
			// than 3.16.0. Lumen's version line starts at 1.0.0, so this guard would compare
			// 1.x against 3.16.0 and wrongly re-run on every update.
			// add_action( 'lumen_early_version_upgraded',  array( $this, 'migrate_global_typography_font_size' ), 10, 2 );
			add_filter( 'lumen_js_settings', array( $this, 'add_setting' ) );

			add_filter( 'lumen_inline_styles_nodep', array( $this, 'add_preset_controls_styles' ) );
			add_filter( 'lumen_inline_editor_styles', array( $this, 'add_preset_controls_styles' ) );
		}

		// Register the setting for using presets by default
		function register_use_size_presets_by_default() {
			register_setting(
				'lumen_global_settings',
				'lumen_use_size_presets_by_default',
				array(
					'type' => 'boolean',
					'description' => __( 'If enabled, range controls will be on preset mode by default', 'lumen-blocks' ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest' => true,
					'default' => true,
				)
			);
		}

		/**
		 * When upgrading to v3.16.0 and above, set option to false.
		 * If new installation, set option to true.
		 *
		 * @since 3.16.0
		 */
		public function use_size_presets_by_default_set_default( $old_version, $new_version ) {
			if ( ! empty( $old_version ) && version_compare( $old_version, "3.16.0", "<" ) ) {
				if ( ! get_option( 'lumen_use_size_presets_by_default' ) ) {
					update_option( 'lumen_use_size_presets_by_default', '' );
				}
			}
		}

		/**
		 * Migrates global typography font sizes from numbers to strings 
		 * when upgrading to v3.16.0 and above
		 *
		 * @since 3.16.0
		 */
		public function migrate_global_typography_font_size( $old_version, $new_version ) {
			if ( ! empty( $old_version ) && version_compare( $old_version, "3.16.0", "<" ) ) {
				$typography_option = get_option( 'lumen_global_typography' );

				if ( ! empty( $typography_option ) && isset( $typography_option[ 0 ] ) && is_array( $typography_option[ 0 ] ) ) {
					$updated = false;

					foreach ( $typography_option[ 0 ] as $key => $item ) {
						if ( ! is_array( $item ) ) {
							continue;
						}

						foreach ( [ 'fontSize', 'tabletFontSize', 'mobileFontSize' ] as $size_key ) {
							if ( isset( $item[ $size_key ] ) && is_numeric( $item[ $size_key ] ) ) {
								$typography_option[ 0 ][ $key ][ $size_key ] = strval( $item[ $size_key ] );
								$updated = true;
							}
						}
					}

					if ( $updated ) {
						update_option( 'lumen_global_typography', $typography_option );
					}
				}
			}
		}


		// Make the setting available in the editor
		public function add_setting( $settings ) {
			$settings['lumen_use_size_presets_by_default'] = get_option( 'lumen_use_size_presets_by_default' );
			return $settings;
		}
		
		/**
		 * Loads the different preset values.
		 *
		 * @return void
		 */
		public function load_presets() {
			$this->custom_presets = get_option( 'lumen_global_custom_preset_controls' );
			$this->theme_presets = WP_Theme_JSON_Resolver::get_theme_data()->get_settings();
			$this->default_presets = WP_Theme_JSON_Resolver::get_core_data()->get_settings();
			$this->lumen_presets = $this->load_json_file( __DIR__ . '/presets.json');
		}

		public static function sanitize_array_setting( $input ) {
			// Cleans every leaf of the structure rather than only checking the
			// outer value; see src/sanitize.php.
			return lumen_sanitize_array_setting( $input );
		}

		/**
		 * Loads and decodes a JSON file, returning the settings array if available.
		 *
		 * @param string $json_path Absolute path to the JSON file.
		 * @return array The settings array from the decoded JSON file, or an empty array.
		 */
		private function load_json_file( $json_path ) {
			if ( file_exists( $json_path ) ) {
				$decoded_data = wp_json_file_decode( $json_path, [
					'associative' => true,
				] );
				return $decoded_data[ 'settings' ] ?? [];
			}
			return [];
		}

		/**
		 * Generate CSS variable style definitions based on the property (e.g., fontSizes, spacing).
		 * The given presets will be overriden it match with a preset from custom.
		 * 
		 * @param array $property 
		 * @param array $presets 
		 * @param array $prefix 
		 * @param bool $isTheme
		 * @return mixed
		 */
		public function generate_css_variables_styles( $property, $presets, $prefix, $isTheme = false ) {
			$filter_name =  current_filter();
			$custom_presets = $this->custom_presets[ $property ] ?? [];

			$presets_by_slug = [];
			// Convert presets into an associative array with key 'slug'
			if ( is_array( $presets ) ) {
				foreach ( $presets as $preset ) {
					$presets_by_slug[ $preset[ 'slug' ] ] = $preset;
				}
			}

			// There is no need to generate custom presets in the editor.
			// The custom presets are generated dynamically.
			if ( $filter_name !== 'lumen_inline_editor_styles' ) {
				// Override values in base presets if it exist in custom presets
				foreach ( $custom_presets as $custom ) {
					$custom[ '__is_custom' ] = true;
					$presets_by_slug[ $custom[ 'slug' ] ] = $custom;
				}
			}

			// Build the CSS variables array.
			// If custom presets or using lumen presets, use the given size.
			// If using theme presets, use WP generated --wp-preset to support theme.json specific
			// configuration (fluid, clamping, etc.)
			$css_vars = [];
			foreach ( $presets_by_slug as $slug => $preset ) {
				$is_custom = $preset['__is_custom'] ?? false;
		
				$value = $is_custom || ! $isTheme
					? $preset['size']
					: "var(--wp--preset--$prefix--$slug)";
		
				$css_vars[ "--lmn--preset--$prefix--$slug" ] = $value;
			}
	
			return array(
				'selector' => ':root',
				'declarations' => $css_vars,
			);
		}

		/**
		 * Get the value from an array with an array of keys
		 *
		 * @param array $array 
		 * @param array $keys 
		 * @return mixed
		 */
		public function deepGet( $array, $keys ) {
			return array_reduce( $keys, function( $value, $key ) {
				return $value[ $key ] ?? null;
			}, $array );
		}
		/**
		 * Add our global preset control styles.
		 *
		 * @param String $current_css
		 * @return String
		 */
		public function add_preset_controls_styles( $current_css ) {
			$this->load_presets();
			$generated_styles = array();

			foreach ( self::PRESET_MAPPING as $key => $value ) {
				if ( ! empty( $this->deepGet( $this->theme_presets, $value[ 'settings' ] )[ 'theme' ] ) ) {
					$styles = $this->generate_css_variables_styles( 
						$key,
						$this->deepGet( $this->theme_presets, $value[ 'settings' ] )[ 'theme' ], 
						$value[ 'prefix' ],
						true
					);
					$generated_styles[] = $styles;

				} elseif ( ! empty( $this->deepGet( $this->default_presets, $value[ 'settings' ] )[ 'default' ] ) ) {
					$styles = $this->generate_css_variables_styles( 
						$key,
						$this->deepGet( $this->default_presets, $value[ 'settings' ] )[ 'default' ], 
						$value[ 'prefix' ],
						true
					);
					$generated_styles[] = $styles;
				} else {
					$styles = $this->generate_css_variables_styles( 
						$key,
						$this->deepGet( $this->lumen_presets, $value[ 'settings' ] ), 
						$value[ 'prefix' ],
					);
					$generated_styles[] = $styles;
				}
			}

			$generated_css = wp_style_engine_get_stylesheet_from_css_rules( $generated_styles );
			if ( ! $generated_css ) {
				return $current_css;
			}

			$current_css .= "\n/* Global Preset Controls */\n";
			$current_css .= $generated_css;
			
			return apply_filters( 'lumen_frontend_css' , $current_css );
		}
	}

	new Lumen_Size_And_Spacing_Preset_Controls();
}