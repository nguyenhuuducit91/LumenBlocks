<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	0.1
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Init' ) ) {
	class Lumen_Init {

		/**
		 * Holds the scripts which are already enqueued, to ensure we only do it once per script.
		 * @var Array
		 */
		public static $scripts_loaded = array();

		/**
		 * Enqueue the frontend scripts, ensures we only do it once.
		 *
		 * @var boolean
		 */
		public static $is_main_script_loaded = false;

		/**
		 * Add our hooks.
		 */
		function __construct() {
			// Only load the frontend scripts for now in the backend.  In the frontend,
			// we'll load these conditionally with `load_frontend_scripts_conditionally`
			if ( is_admin() ) {
				add_action( 'enqueue_block_editor_assets', array( $this, 'block_enqueue_frontend_assets' ) );
			}

			// Checks if a Lumen block is rendered in the frontend, then loads our scripts.
			if ( ! is_admin() ) {
				add_filter( 'render_block', array( $this, 'load_frontend_scripts_conditionally' ), 10, 2 );
				add_action( 'template_redirect', array( $this, 'load_frontend_scripts_conditionally_head' ) );
			}

			// Load our editor scripts.
			if ( is_admin() ) {
				add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_editor_assets' ) );
			}
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_editor_assets_admin' ) );

			if ( is_admin() ) {
				// Use enqueue_block_assets so it gets loaded in the editor's iframe <head> tag
				add_action( 'enqueue_block_assets', array( $this, 'enqueue_style_in_editor' ), 50 );
			}

			add_action( 'wp_footer', array( $this, 'init_lumen_vars' ) );

			// Add the fallback values for the default block width and wide block width.
			// These are used for the inside "Content width" option of Columns.
			add_action( 'lumen_inline_styles', array( $this, 'add_block_widths' ) );
			add_action( 'lumen_inline_editor_styles', array( $this, 'add_block_widths' ) );

			// Add theme classes for compatibility detection.
			add_action( 'body_class', array( $this, 'add_body_class_theme_compatibility' ) );
			add_action( 'admin_body_class', array( $this, 'add_body_class_theme_compatibility' ) );

			// Allow users to force load the Lumen CSS
			add_action( 'wp_enqueue_scripts', array( $this, 'maybe_force_css_load' ) );
		}

		/**
		 * Allow users to force load the Lumen CSS, this can be helpful if
		 * somehow the page fails to detect Lumen blocks and doesn't load
		 * the required stylesheets.
		 *
		 * @return void
		 */
		public function maybe_force_css_load() {
			if ( ! self::$is_main_script_loaded && apply_filters( 'lumen_force_css_load', false ) ) {
				self::block_enqueue_frontend_assets();
				self::$is_main_script_loaded = true;
			}
		}

		/**
		 * Register block assets for both frontend + backend.
		 *
		 * @since 0.1
		 */
		public static function register_frontend_assets() {
			// Frontend block styles.
			wp_register_style(
				'lmb-style-css',
				plugins_url( 'dist/frontend_blocks.css', LUMEN_FILE ),
				apply_filters( 'lumen_frontend_css_dependencies', array() ),
				LUMEN_VERSION
			);

			// Frtonend only inline styles.
			if ( ! is_admin() ) {
				$inline_css = apply_filters( 'lumen_inline_styles', '' );
				if ( ! empty( $inline_css ) ) {
					wp_add_inline_style( 'lmb-style-css', $inline_css );
				}
			}

			// Frontend block styles (responsive).
			wp_register_style(
				'lmb-style-css-responsive',
				plugins_url( 'dist/frontend_blocks_responsive.css', LUMEN_FILE ),
				array( 'lmb-style-css' ),
				LUMEN_VERSION
			);
			wp_enqueue_style( 'lmb-style-css-responsive' );

			if ( ! is_admin() ) {
				wp_register_script( 'lmb-block-frontend-js', null, [], LUMEN_VERSION, true );
			}

			// Register inline frontend styles, these are always loaded.
			// Register via a dummy style.
			wp_register_style( 'lmb-style-css-nodep', false, array(), LUMEN_VERSION );
			$inline_css = apply_filters( 'lumen_inline_styles_nodep', '' );
			if ( ! empty( $inline_css ) ) {
				wp_add_inline_style( 'lmb-style-css-nodep', trim( $inline_css ) );
			}

			// Register inline frontend styles for theme.json block style inheritance
			wp_register_style( 'lmb-block-style-inheritance-nodep', false, array(), LUMEN_VERSION );
			$block_style_inline_css = apply_filters( 'lumen_block_style_inheritance_inline_styles_nodep', '' );
			if ( ! empty( $block_style_inline_css ) ) {
				wp_add_inline_style( 'lmb-block-style-inheritance-nodep', $block_style_inline_css );
			}

			// This is needed for the translation strings in our UI.
			if ( is_admin() ) {
				lumen_load_js_translations();
			}

			// Frontend only scripts.
			// if ( ! is_admin() ) {
			// 	wp_register_script(
			// 		'lmb-block-frontend-js',
			// 		plugins_url( 'dist/frontend_blocks.js', LUMEN_FILE ),
			// 		apply_filters( 'lumen_frontend_js_dependencies', array() ),
			// 		LUMEN_VERSION
			// 	);

			// 	wp_localize_script( 'lmb-block-frontend-js', 'lumen', array(
			// 		'restUrl' => get_rest_url(),
			// 	) );
			// }
		}

		/**
		 * This is an earlier conditional css loader in the frontend so that we
		 * can load the frontend styles in the head. This is to prevent CLS.
		 *
		 * This is a newer implementation of the
		 * load_frontend_scripts_conditionally function. We don't remove the old
		 * one to keep it as a fallback.
		 *
		 * @return void
		 *
		 * @since 3.0.7
		 */
		public function load_frontend_scripts_conditionally_head() {
			// Only do this in the frontend.
			if ( self::$is_main_script_loaded ) {
				return;
			}

			// Only do this for singular posts.
			$post_id = get_the_ID();
			if ( is_singular() && ! empty( $post_id ) ) {
				global $post;
				if ( ! empty( $post ) && ! empty( $post->post_content ) ) {
					// Check if we have a lumen block in the content.
					if (
						stripos( $post->post_content, '<!-- wp:lumen/' ) !==  false ||
						stripos( $post->post_content, 'lmn-highlight' ) !==  false
					) {
						// Enqueue our main scripts and styles.
						self::block_enqueue_frontend_assets();
						self::$is_main_script_loaded = true;
					}
				}
			}
		}

		/**
		 * This is the original implementation of the conditional css loading in
		 * the frontend. This checks each block to see whether it's a Lumen
		 * block or a feature, then loads the CSS and JS conditionally.
		 *
		 * This works, but it also loads the CSS inside the body tag and
		 * introduces CLS.
		 *
		 * $this->load_frontend_scripts_conditionally_head was created to
		 * address the CLS issue.
		 *
		 * @param string $block_content The block content.
		 * @param Array $block The block object.
		 *
		 * @return string output block
		 */
		public function load_frontend_scripts_conditionally( $block_content, $block ) {
			if ( $block_content === null ) {
				$block_content = "";
			}

			// Load our main frontend scripts if there's a Lumen block
			// loaded in the frontend.
			if ( ! self::$is_main_script_loaded && ! is_admin() ) {
				if ( strpos( $block_content, '<!-- wp:lumen/' ) !== false ||
					strpos( $block_content, 'lmn-highlight' ) !== false
				) {
					self::block_enqueue_frontend_assets();
					self::$is_main_script_loaded = true;
				}
			}

			// Only do this for Lumen blocks.
			if ( ! isset( $block['blockName'] ) || strpos( $block['blockName'], 'lumen/' ) === false ) {
				return $block_content;
			}

			// Load our main frontend scripts if not yet loaded.
			if ( ! self::$is_main_script_loaded && ! is_admin() ) {
				self::block_enqueue_frontend_assets();
				self::$is_main_script_loaded = true;
			}

			// Enqueue the block script once.
			// Do not enqueue if the block content is empty (e.g. due to conditional display)
			if ( ! isset( self::$scripts_loaded[ $block['blockName'] ] ) && $block_content !== '' ) {
				$lumen_block = substr( $block['blockName'], 10 );
				do_action( 'lumen/' . $lumen_block . '/enqueue_scripts' );
				self::$scripts_loaded[ $block['blockName'] ] = true;
			}

			// Check whether the current block needs to enqueue some scripts.
			// This gets called across all the blocks.
			do_action( 'lumen/enqueue_scripts', $block_content );

			return $block_content;
		}

		/**
		 * Enqueue frontend scripts and styles.
		 *
		 * @since 2.17.2
		 */
		public static function block_enqueue_frontend_assets() {
			self::register_frontend_assets();
			wp_enqueue_style( 'lmb-style-css' );
			if ( lumen_is_frontend() ) {
				wp_enqueue_style( 'lmb-block-style-inheritance-nodep' );
			}
			wp_enqueue_style( 'lmb-style-css-nodep' );
			wp_enqueue_script( 'lmb-block-frontend-js' );
			do_action( 'lumen_block_enqueue_frontend_assets' );
		}

		/**
		 * Enqueue frontend scripts and styles for a given post content.
		 *
		 * @param string $post_content The post content.
		 * @return void
		 */
		public static function enqueue_frontend_assets_for_content( $post_content ) {
			// If a Lumen block is present in the post content, enqueue the frontend assets.
			if ( ! self::$is_main_script_loaded && ! is_admin() ) {
				if ( stripos( $post_content, '<!-- wp:lumen/' ) !==  false ) {
					self::block_enqueue_frontend_assets();
					self::$is_main_script_loaded = true;
				}
			}

			// Gather all the unique Lumen blocks and load all the block scripts once.
			// Gather all the "<!-- wp:lumen/BLOCK_NAME"
			preg_match_all( '/<!-- wp:lumen\/([a-zA-Z_-]+)/', $post_content, $lumen_blocks );
			// Go through each unique block name.
			foreach ( $lumen_blocks[1] as $_block_name ) {
				// Clean up the block name, trailing "-" from the end since it may have "--" in the end if the post content is compressed.
				$block_name = trim( $_block_name, '-' );

				// Enqueue the block script once.
				if ( ! isset( self::$scripts_loaded[ $block_name ] ) ) {
					do_action( 'lumen/' . $block_name . '/enqueue_scripts' );
					self::$scripts_loaded[ $block_name ] = true;
				}
			}

			// Check whether the current block needs to enqueue some scripts.
			// This gets called across all the blocks.
			do_action( 'lumen/enqueue_scripts', $post_content );
		}

		/**
		 * Enqueue CodeMirror separately. This originally was enqueued in
		 * `register_block_editor_assets`, but we want to enqueue this only when
		 * Gutenberg is loaded. Other plugins may use CodeMirror in other parts
		 * of the admin, and us enqueuing it may interfere with how their plugin
		 * works.
		 *
		 * @since 3.2.0
		 */
		public function register_block_editor_assets_admin() {
			$current_screen = get_current_screen();
			if ( $current_screen->is_block_editor() ) {
				// Enqueue CodeMirror for Custom CSS.
				wp_enqueue_code_editor( array(
					'type' => 'text/css', // @see https://developer.wordpress.org/reference/functions/wp_get_code_editor_settings/
					'codemirror' => array(
						'indentUnit' => 2,
						'tabSize' => 2,
					),
				) );
			}
		}

		/**
		 * Enqueue block assets for backend editor.
		 *
		 * @since 0.1
		 */
		public function register_block_editor_assets() {
			// LMN API.
			wp_register_script(
				'lmb-lmn',
				plugins_url( 'dist/lmn.js', LUMEN_FILE ),
				// wp-util for wp.ajax.
				// wp-plugins & wp-edit-post for Gutenberg plugins.
				array( 'code-editor', 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-api-fetch', 'wp-util', 'wp-plugins', 'wp-i18n', 'wp-api', 'lodash' ),
				LUMEN_VERSION,
				true
			);

			// Backend editor scripts: blocks.
			wp_register_script(
				'lmb-block-js',
				plugins_url( 'dist/editor_blocks.js', LUMEN_FILE ),
				// Depend on the window.lmn API.
				apply_filters( 'lumen_editor_js_dependencies', array( 'lmb-lmn' ) ),
				LUMEN_VERSION,
				true
			);

			// Add translations.
			wp_set_script_translations( 'lmb-lmn', 'lumen-blocks' );
			wp_set_script_translations( 'lmb-block-js', 'lumen-blocks' );

			// Backend editor only styles.
			wp_register_style(
				'lmb-block-editor-css',
				plugins_url( 'dist/editor_blocks.css', LUMEN_FILE ),
				apply_filters( 'lumen_editor_css_dependencies', array( 'wp-edit-blocks' ) ),
				LUMEN_VERSION
			);

			// Backend editor only inline styles.
			$inline_css = apply_filters( 'lumen_inline_editor_styles', '' );
			if ( ! empty( $inline_css ) ) {
				wp_add_inline_style( 'lmb-block-editor-css', $inline_css );
			}

			$version_parts = explode( '-', LUMEN_BLOCK_VERSION );

			global $content_width;
			global $wp_version;
			$args = apply_filters( 'lumen_localize_script', array(
				'srcUrl' => untrailingslashit( plugins_url( '/', LUMEN_FILE ) ),
				'homeUrl' => home_url(),
				'contentWidth' => isset( $content_width ) ? $content_width : 900,
				'i18n' => 'lumen-blocks',
				'nonce' => wp_create_nonce( 'lumen' ),
				'devMode' => defined( 'WP_ENV' ) ? WP_ENV === 'development' : false,
				'cdnUrl' => LUMEN_DESIGN_LIBRARY_URL,
				'currentTheme' => esc_html( get_template() ),
				'settingsUrl' => admin_url( 'admin.php?page=lumen-settings' ),
				'version' => array_shift( $version_parts ),
				'wpVersion' => ! empty( $wp_version ) ? preg_replace( '/-.*/', '', $wp_version ) : $wp_version, // Ensure semver, strip out after dash
				'adminUrl' => admin_url(),
				'ajaxUrl' => admin_url('admin-ajax.php'),

				// Fonts.
				'locale' => get_locale(),

				// Overridable default primary color for buttons and other blocks.
				'primaryColor' => get_theme_mod( 's_primary_color', '#f59e0b' ),

				// Premium related variables.
				'isPro' => apply_filters( 'lumen_is_pro', false ),
				'showProNotice' => lumen_should_show_pro_notices(),
				'pricingURL' => '',
				'planName' => '',

				// Icons.
				'fontAwesomeSearchProIcons' => apply_filters( 'lumen_search_fontawesome_pro_icons', false ),

				// Editor settings.
				'settings' => apply_filters( 'lumen_js_settings', array() ),
				'isContentOnlyMode' => apply_filters( 'lumen_editor_role_is_content_only', false ),
				'blockCategoryIndex' => apply_filters( 'lumen_block_category_index', 0 ),
			) );
			wp_localize_script( 'wp-blocks', 'lumen', $args );
		}

		// Ensure that block style inheritance styles comes after the editor block styles.
		function enqueue_style_in_editor() {
			wp_enqueue_style( 'lmb-block-editor-css' );
			wp_enqueue_style( 'lmb-block-style-inheritance-nodep' );
		}

		/**
		 * Gets the default/center and wide block widths from the theme if
		 * possible. We need this so our "Content Width" option can be
		 * consistent with what the theme uses.
		 *
		 * @param String $css
		 * @return String The CSS to print out in the frontend.
		 */
		public function add_block_widths( $css ) {
			$width_default = '';
			$width_wide = '';

			// Check the theme.json file if we have any block sizes set.
			// @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#styles
			if ( class_exists( 'WP_Theme_JSON_Resolver_Gutenberg' ) ) {
				$settings = WP_Theme_JSON_Resolver_Gutenberg::get_merged_data()->get_settings();
				if ( ! empty( $settings ) && array_key_exists( 'layout', $settings ) ) {
					$layout = $settings['layout'];
					if ( ! empty( $layout ) ) {
						if ( array_key_exists( 'contentSize', $layout ) ) {
							$width_default = $layout['contentSize'];
						}
						if ( array_key_exists( 'wideSize', $layout ) ) {
							$width_wide = $layout['wideSize'];
						}
					}
				}
			}

			// The old way for themes to specify the contents are through
			// $content_width, we can use this for the default block width.
			global $content_width;
			if ( empty( $width_default ) && ! empty( $content_width ) ) {
				$width_default = $content_width;
			}

			// Add the CSS to the frontend.
			if ( ! empty( $width_default ) || ! empty( $width_wide ) ) {
				$css .= ':root {';
				if ( ! empty( $width_default ) ) {
					$width_default .= is_numeric( $width_default ) ? 'px' : '';
					$css .= '--lmn-block-width-default-detected: ' . esc_attr( $width_default ) . ';';
				}
				if ( ! empty( $width_wide ) ) {
					$width_wide .= is_numeric( $width_wide ) ? 'px' : '';
					$css .= '--lmn-block-width-wide-detected: ' . esc_attr( $width_wide ) . ';';
				}
				$css .= '}';
			}

			return $css;
		}

		/**
		 * Adds a class that denotes the current theme, so we can add CSS to
		 * make our blocks look better.
		 */
		public function add_body_class_theme_compatibility( $classes ) {
			// admin_body_class provides a space-separated-string, body_class
			// provides an array. Let's support both.
			$convert_to_string = is_string( $classes );
			if ( $convert_to_string ) {
				$classes = explode( ' ', $classes );
			}

			if ( defined( 'ASTRA_THEME_VERSION' ) ) {
				$classes[] = 'lmn--is-astra-theme';
			} else if ( class_exists( 'Blocksy_Translations_Manager' ) ) {
				$classes[] = 'lmn--is-blocksy-theme';
			} else if ( defined( 'NEVE_VERSION' ) ) {
				$classes[] = 'lmn--is-neve-theme';
			} else if ( defined( 'KADENCE_VERSION' ) ) {
				$classes[] = 'lmn--is-kadence-theme';
			} else if ( class_exists( 'Storefront' ) ) {
				$classes[] = 'lmn--is-storefront-theme';
			} else if ( function_exists( 'twenty_twenty_one_setup' ) ) {
				$classes[] = 'lmn--is-twentytwentyone-theme';
			} else if ( function_exists( 'twentytwentytwo_support' ) ) {
				$classes[] = 'lmn--is-twentytwentytwo-theme';
			} else if ( function_exists( 'twentytwentyfive_post_format_setup' ) ) {
				$classes[] = 'lmn--is-twentytwentyfive-theme';
			} else if ( function_exists( 'hello_elementor_setup' ) ) { // Taken from https://github.com/elementor/hello-theme/blob/master/functions.php
				$classes[] = 'lmn--is-helloelementor-theme';
			} else if ( function_exists( 'tove_setup' ) ) {
				$classes[] = 'lmn--is-tove-theme';
			}

			return $convert_to_string ? implode( ' ', $classes ) : $classes;
		}

		/**
		 * Adds the lumen object with frontend constants if needed.
		 *
		 * @return void
		 */
		public function init_lumen_vars() {
			$args = apply_filters( 'lumen_localize_frontend_script', array() );
			if ( ! empty( $args ) ) {
				echo '<script>lumen = ' . json_encode( $args ) . '</script>';
			}
		}
	}

	new Lumen_init();
}

if ( ! function_exists( 'lumen_load_js_translations' ) ) {
	/**
	 * Loads the translation strings used by our JS scripts. This should be
	 * called when a JS script is enqueued in the admin.
	 *
	 * The translation-strings.js file is an automatically generated file
	 * containing translatable strings located in all our block.json files
	 * (since this is not yet done by WordPress) and our other JS files.
	 *
	 * @return void
	 */
	function lumen_load_js_translations() {
		wp_enqueue_script( 'lumen-strings', plugins_url( 'dist/translation-strings.js', LUMEN_FILE ), array(), LUMEN_VERSION, true );
		wp_set_script_translations( 'lumen-strings', 'lumen-blocks' );
	}
}

// Adds a special class to the body tag, to indicate we can now run
// hover transitions and other effects.
if ( ! function_exists( 'lumen_init_animations' ) ) {
	function lumen_init_animations() {
		echo '<script>requestAnimationFrame(() => document.body.classList.add( "lmn--anim-init" ))</script>';
	}
}

if ( ! function_exists( 'lumen_check_block_animation' ) ) {

	function lumen_css_has_hover_effects_or_animation( $css_string ) {
		if ( strpos( $css_string, ':hover' ) !== false || // Hover effects
			 strpos( $css_string, '--entrance-' ) !== false || // Entrance animations
			 strpos( $css_string, 'lmn-anim' ) !== false || // Scroll animations
			 strpos( $css_string, '--lmn-tran' ) !== false || // Transition duration
			 strpos( $css_string, 'lmn-entrance' ) !== false || // Entrance class
			strpos( $css_string, '-hover' ) !== false // has CSS custom property for hover effects
		) {
			return true;
		}
		return false;
	}

	function lumen_check_block_animation( $block_content, $block ) {
		if ( ! isset( $block['blockName'] ) || strpos( $block['blockName'], 'lumen/' ) === false ) {
			return $block_content;
		}

		if ( lumen_css_has_hover_effects_or_animation( $block_content )	) {
			// Adds a special class to the body tag, to indicate we can now run animations.
			add_action( 'wp_footer', 'lumen_init_animations' );
			remove_filter( 'render_block', 'lumen_check_block_animation', 10, 2 );
		}

		return $block_content;
	}

	function lumen_check_block_animation_on_global_styles( $css ) {
		if ( lumen_css_has_hover_effects_or_animation( $css )	) {
			// Adds a special class to the body tag, to indicate we can now run animations.
			add_action( 'wp_footer', 'lumen_init_animations' );
		}

		return $css;
	}

	if ( lumen_is_frontend() ) {
		add_filter( 'render_block', 'lumen_check_block_animation', 1, 2 );
		add_filter( 'lumen_frontend_css', 'lumen_check_block_animation_on_global_styles', 999 );
	}
}
