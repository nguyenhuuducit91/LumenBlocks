<?php
/**
 * V2 initializer
 *
 * @since 	3.0.0
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Max number of times to check the frontend for v2 blocks if backward
// compatibility is not enabled - this is to ensure the frontend always looks
// okay after updating.
defined( 'LUMEN_FRONTEND_V2_DETECTOR_LIMIT' ) || define( 'LUMEN_FRONTEND_V2_DETECTOR_LIMIT', 10 );

if ( ! function_exists( 'lumen_auto_compatibility_v2' ) ) {

	/**
	 * When upgrading from v2 to v3, turn on v2 compatibility, and let the user know about how to turn it off.
	 *
	 * @since 3.0.0
	 */
	function lumen_auto_compatibility_v2( $old_version, $new_version ) {
		if ( ! empty( $old_version ) && version_compare( $old_version, "3.0", "<" ) ) {
			// Only do this if we have never set the compatibility options before.
			if ( get_option( 'lumen_v2_editor_compatibility' ) === false &&
				get_option( 'lumen_v2_editor_compatibility_usage' ) === false
			) {
				update_option( 'lumen_v2_editor_compatibility_usage', '1', 'no' ); // Load version 2 blocks in the editor
				update_option( 'lumen_v2_disabled_blocks', get_option( 'lumen_disabled_blocks' ), 'no' ); // Migrate the disabled blocks.
			}

			// Always enable frontend compatibility when updating so that the frontend will always look okay.
			update_option( 'lumen_v2_frontend_compatibility', '1' ); // Load version 2 blocks in the editor
		}
	}
	// Unhooked in Lumen: migrated sites upgrading from an upstream release older
	// than 3.0. Lumen's version line starts at 1.0.0, so this guard would compare
	// 1.x against 3.0 and wrongly re-run on every update.
	// add_action( 'lumen_version_upgraded', 'lumen_auto_compatibility_v2', 10, 2 );
}

if ( ! function_exists( 'lumen_v2_compatibility_option' ) ) {

	/**
	 * V2 option for backward compatibility.
	 *
	 * @since 3.0.0
	 */
	function lumen_v2_compatibility_option() {
		// If true, frontend scripts and styles will be loaded when a block is rendered.
		register_setting(
			'lumen_v2_compatibility',
			'lumen_v2_frontend_compatibility',
			array(
				'type' => 'string',
				'description' => __( 'Load version 2 frontend styles and scripts', LUMEN_I18N ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '',
			)
		);

		// If true, v2 blocks will be loaded in the editor and you can still add
		// them, frontend scripts and styles will be loaded like in v2 (with the
		// option to turn on optimization)
		register_setting(
			'lumen_v2_compatibility',
			'lumen_v2_editor_compatibility',
			array(
				'type' => 'string',
				'description' => __( 'Load version 2 blocks in the editor', LUMEN_I18N ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '',
			)
		);

		// If true, v2 blocks will only be loaded in the editor when there are
		// v2 blocks used in the page being edited.
		register_setting(
			'lumen_v2_compatibility',
			'lumen_v2_editor_compatibility_usage',
			array(
				'type' => 'string',
				'description' => __( 'Load version 2 blocks when old blocks are used', LUMEN_I18N ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '',
			)
		);

		// The auto-detect for v2 blocks is always present, but it will not be
		// checked anymore if this is set
		register_setting(
			'lumen_v2_compatibility',
			'lumen_v2_block_detector_disabled',
			array(
				'type' => 'string',
				'description' => __( 'This disables the v2 block detected in the editor', LUMEN_I18N ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '',
			)
		);

		// Auto-detect v2 blocks in the frontend, this is a counter, and if it
		// reaches a certain amount, the auto-detect stops.
		register_setting(
			'lumen_v2_compatibility',
			'lumen_v2_frontend_detector_counter',
			array(
				'type' => 'number',
				'description' => __( 'This disables the v2 block detected in the frontend', LUMEN_I18N ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest' => true,
				'default' => '',
			)
		);
	}
	add_action( 'admin_init', 'lumen_v2_compatibility_option' );
	add_action( 'rest_api_init', 'lumen_v2_compatibility_option' );
}

if ( ! function_exists( 'has_lumen_v2_frontend_compatibility' ) ) {

	/**
	 * Should we load v2 frontend
	 *
	 * @return Boolean
	 *
	 * @since 3.0.0
	 */
	function has_lumen_v2_frontend_compatibility() {
		// In case the plugin was auto-updated from v2 to v3, run auto-compatibility cehck.
		if ( ! is_admin() && get_option( 'lumen_current_version_installed' ) !== LUMEN_VERSION ) {
			lumen_auto_compatibility_v2( get_option( 'lumen_current_version_installed' ), LUMEN_VERSION );
		}
		return get_option( 'lumen_v2_frontend_compatibility' ) === '1';
	}

	/**
	 * Should we load v2 blocks
	 *
	 * @return Boolean
	 *
	 * @since 3.0.0
	 */
	function has_lumen_v2_editor_compatibility() {
		return get_option( 'lumen_v2_editor_compatibility' ) === '1' || get_option( 'lumen_v2_editor_compatibility_usage' ) === '1';
	}

	/**
	 * Should we load v2 blocks only when they are used in the editor
	 *
	 * @return Boolean
	 *
	 * @since 3.0.0
	 */
	function has_lumen_v2_editor_compatibility_usage() {
		return get_option( 'lumen_v2_editor_compatibility_usage' ) === '1';
	}
}

if ( ! function_exists( 'lumen_block_assets_v2' ) ) {

	/**
	* Enqueue block assets for both frontend + backend.
	*
	* @since 3.0.0
	*/
	function lumen_block_assets_v2() {
		// Frontend block styles.
		wp_register_style(
			'lmb-style-css-v2',
			plugins_url( 'dist/deprecated/frontend_blocks_deprecated_v2.css', LUMEN_FILE ),
			apply_filters( 'lumen_frontend_css_dependencies_v2', array() ),
			LUMEN_VERSION
		);

		// Frontend only scripts.
		if ( ! is_admin() ) {
			// Add global colors and typography.
			$inline_css = apply_filters( 'lumen_inline_styles', '' );
			if ( ! empty( $inline_css ) ) {
				wp_add_inline_style( 'lmb-style-css-v2', $inline_css );
			}

			wp_register_script(
				'lmb-block-frontend-js-v2',
				plugins_url( 'dist/deprecated/frontend_blocks_deprecated_v2.js', LUMEN_FILE ),
				apply_filters( 'lumen_frontend_js_dependencies_v2', array() ),
				LUMEN_VERSION
			);

			$args = apply_filters( 'lumen_localize_frontend_script', array(
				'restUrl' => get_rest_url(),
			) );
			wp_localize_script( 'lmb-block-frontend-js-v2', 'lumen', $args );
		}
	}

	if ( has_lumen_v2_frontend_compatibility() || has_lumen_v2_editor_compatibility() ) {
		add_action( 'init', 'lumen_block_assets_v2' );
	}
}

if ( ! function_exists( 'lumen_block_enqueue_frontend_assets_v2' ) ) {

	/**
	* Enqueue frontend scripts and styles.
	*
	* @since 2.17.2
	*/
	function lumen_block_enqueue_frontend_assets_v2() {
		lumen_block_assets_v2();
		wp_enqueue_style( 'lmb-style-css-v2' );
		wp_enqueue_script( 'lmb-block-frontend-js-v2' );
	}
}

if ( ! function_exists( 'lumen_block_editor_assets_v2' ) ) {

	/**
	 * Enqueue block assets for backend editor.
	 *
	 * @since 3.0.0
	 */
	function lumen_block_editor_assets_v2() {
		if ( ! is_admin() ) {
			return;
		}

		// Backend editor scripts: blocks.
		$dependencies = array( 'lmb-block-js', 'code-editor', 'wp-blocks', 'wp-element', 'wp-components', 'wp-util', 'wp-plugins', 'wp-i18n', 'wp-api' );
		wp_register_script(
			'lmb-block-js-v2',
			plugins_url( 'dist/deprecated/editor_blocks_deprecated_v2.js', LUMEN_FILE ),
			// wp-util for wp.ajax.
			// wp-plugins & wp-edit-post for Gutenberg plugins.
			apply_filters( 'lumen_editor_js_dependencies_v2', $dependencies ),
			LUMEN_VERSION
		);

		// Add translations.
		wp_set_script_translations( 'lmb-block-js-v2', LUMEN_I18N );

		// Backend editor only styles.
		wp_register_style(
			'lmb-block-editor-css-v2',
			plugins_url( 'dist/deprecated/editor_blocks_deprecated_v2.css', LUMEN_FILE ),
			apply_filters( 'lumen_editor_css_dependencies_v2', array( 'wp-edit-blocks' ) ),
			LUMEN_VERSION
		);
	}

	if ( has_lumen_v2_frontend_compatibility() || has_lumen_v2_editor_compatibility() ) {
		add_action( 'init', 'lumen_block_editor_assets_v2' );
	}
}

require_once( plugin_dir_path( __FILE__ ) . 'block/blog-posts/index.php' );

// Used in Fonts.
if ( ! function_exists( 'lumen_is_lumen_block_v2' ) ) {
	function lumen_is_lumen_block_v2( $is_lumen_block, $block_name ) {
		if ( ! $is_lumen_block && ! empty( $block_name ) ) {
			return strpos( $block_name, 'lmb/' ) === 0;
		}
		return $is_lumen_block;
	}
	if ( has_lumen_v2_frontend_compatibility() || has_lumen_v2_editor_compatibility() ) {
		add_filter( 'lumen_is_lumen_block', 'lumen_is_lumen_block_v2', 10, 2 );
	}
}

if ( ! function_exists( 'lumen_add_required_block_styles_v2' ) ) {

	/**
	 * Adds the required global styles for Lumen blocks.
	 *
	 * @since 1.3
	 */
	function lumen_add_required_block_styles_v2() {

		global $content_width;
		$full_width_block_inner_width = isset( $content_width ) ? $content_width : 900;

		$custom_css = ':root {
			--content-width: ' . esc_attr( $full_width_block_inner_width ) . 'px;
		}';
		wp_add_inline_style( 'lmb-style-css-v2', $custom_css );
	}
	if ( has_lumen_v2_editor_compatibility() || has_lumen_v2_frontend_compatibility() ) {
		add_action( 'enqueue_block_assets', 'lumen_add_required_block_styles_v2', 11 );
	}
}

/**
 * If frontend compatibility is enabled, and editor compatibility is disabled,
 * try and load add the required frontend styles when the blocks are used.
 */
if ( ! function_exists( 'load_frontend_scripts_conditionally_v2') ) {

	function load_frontend_scripts_conditionally_v2( $block_content, $block ) {
		if ( $block_content === null ) {
			return $block_content;
		}

		if (
			( isset( $block['blockName'] ) && strpos( $block['blockName'], 'lmb/' ) === 0 ) ||
			strpos( $block_content, '<!-- wp:lmb/' ) !==  false
		) {
			lumen_block_enqueue_frontend_assets_v2();
			lumen_add_required_block_styles_v2();

			// Don't do this again.
			remove_filter( 'render_block', 'load_frontend_scripts_conditionally_v2', 10, 2 );
		}

		return $block_content;
	}

	if ( has_lumen_v2_frontend_compatibility() && ! has_lumen_v2_editor_compatibility() ) {
		if ( is_frontend() ) {
			add_filter( 'render_block', 'load_frontend_scripts_conditionally_v2', 10, 2 );
		}
	}
}

if ( ! function_exists( 'register_frontend_blog_posts_block_compatibility_v2' ) ) {
	/**
	 * Registers the blog posts block to make it work in the frontend. This is
	 * only used when the v2 blocks aren't loaded in the editor, but frontend
	 * compatibliity is turned on.
	 *
	 * @return void
	 */
	function register_frontend_blog_posts_block_compatibility_v2() {
		register_block_type( 'lmb/blog-posts', array(
			'attributes' => lumen_blog_posts_attributes_v2(),
			'render_callback' => 'lumen_render_blog_posts_block_v2',
		) );
	}

	if ( ! is_admin() && has_lumen_v2_frontend_compatibility() && ! has_lumen_v2_editor_compatibility() ) {
		add_action( 'init', 'register_frontend_blog_posts_block_compatibility_v2' );
	}
}

if ( ! function_exists( 'lumen_frontend_v2_try_migration' ) ) {
	/**
	 * Check each rendered block whether there are any v2 blocks loaded so we
	 * can enable frontend compatibility.
	 *
	 * @param string $block_content
	 * @param Array $block
	 * @return string The block content
	 */
	function lumen_frontend_v2_try_migration( $block_content, $block ) {
		if ( $block_content === null ) {
			return $block_content;
		}

		if (
			( isset( $block['blockName'] ) && stripos( $block['blockName'], 'lmb/' ) === 0 ) ||
			stripos( $block_content, '<!-- wp:lmb/' ) !==  false
		) {
			lumen_frontend_v2_try_migration_detected();
		}

		return $block_content;
	}

	/**
	 * Check each the content in the frontend whether there are any v2 blocks
	 * loaded so we can enable frontend compatibility. (This may not detect all
	 * blocks, so we need to do the render_block also)
	 *
	 * @param string $content
	 * @return string
	 */
	function lumen_frontend_v2_try_migration_content( $content ) {
		if ( stripos( $content, '<!-- wp:lmb/' ) !==  false ) {
			lumen_frontend_v2_try_migration_detected();
		}

		return $content;
	}

	/**
	 * When a V2 block is detected, enable frontend compatibility, and stop
	 * further checking.
	 *
	 * @return void
	 */
	function lumen_frontend_v2_try_migration_detected() {
		lumen_block_enqueue_frontend_assets_v2();
		lumen_add_required_block_styles_v2();
		register_frontend_blog_posts_block_compatibility_v2();

		// Enable frontend compatibility.
		update_option( 'lumen_v2_frontend_compatibility', '1' );

		// This forces our checker to not do this again.
		update_option( 'lumen_v2_frontend_detector_counter', LUMEN_FRONTEND_V2_DETECTOR_LIMIT );

		// Don't do the checks again.
		remove_filter( 'render_block', 'lumen_frontend_v2_try_migration', 9, 2 );
		remove_filter( 'the_content', 'lumen_frontend_v2_try_migration_content', 1 );
	}

	/**
	 * Check for v2 blocks in the frontend and enable frontend compatibility if
	 * any are detected. Do this check a few times only.
	 */
	// DEV NOTE: Commented out for now as of v3.13, we need to check if this is still needed.
	// if ( ! is_admin() ) {
	// 	$detector_counter = get_option( 'lumen_v2_frontend_detector_counter' );
	// 	$detector_counter = empty( $detector_counter ) ? 0 : (int) $detector_counter;

	// 	if ( $detector_counter < LUMEN_FRONTEND_V2_DETECTOR_LIMIT && ! has_lumen_v2_frontend_compatibility() ) {
	// 		// Try and check if we need to perform v2 frontend migration.
	// 		add_filter( 'render_block', 'lumen_frontend_v2_try_migration', 9, 2 );
	// 		// Need to also do this in the_content, since catching a v2 blog
	// 		// posts block here allows it to be loaded correctly.
	// 		add_filter( 'the_content', 'lumen_frontend_v2_try_migration_content', 1 );

	// 		// Increment our detector counter.
	// 		update_option( 'lumen_v2_frontend_detector_counter', $detector_counter + 1 );
	// 	}
	// }
}
