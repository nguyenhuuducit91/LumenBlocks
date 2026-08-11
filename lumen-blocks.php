<?php
/**
 * Plugin Name:       Lumen Blocks
 * Description:       The complete website builder for the WordPress block editor. Build professional sites faster with powerful blocks, block styles, and a global design system.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Lumen Blocks
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       lumen-blocks
 * Domain Path:       /languages
 *
 * @package Lumen
 *
 * Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc.,
 * distributed under GPL-3.0-or-later. See NOTICE.txt for the list of changes.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * There used to be a check here that deactivated any other active plugin
 * declaring LUMEN_FILE, on the assumption that a free and a premium build of
 * the same plugin were installed side by side. Turning another plugin off is
 * the site owner's decision to make, not this plugin's, so it has been removed
 * along with the notice that announced it. Nothing in this build depends on
 * being the only one: the guards below all use `defined()`, so a second copy
 * simply loses the race to define the constants and leaves them alone.
 */

defined( 'LUMEN_SHOW_PRO_NOTICES' ) || define( 'LUMEN_SHOW_PRO_NOTICES', true );
defined( 'LUMEN_BUILD' ) || define( 'LUMEN_BUILD', 'free' );
defined( 'LUMEN_VERSION' ) || define( 'LUMEN_VERSION', '1.0.0' );
// Block data-format version. Separate from the plugin version on purpose: the
// block deprecation chains and attribute schemas compare against it, so it
// keeps the lineage it was forked at. Bump it only when the block markup or
// attribute schema changes.
defined( 'LUMEN_BLOCK_VERSION' ) || define( 'LUMEN_BLOCK_VERSION', '3.19.10' );
defined( 'LUMEN_FILE' ) || define( 'LUMEN_FILE', __FILE__ );
defined( 'LUMEN_I18N' ) || define( 'LUMEN_I18N', 'lumen-blocks' ); // Plugin slug.
// Design Library CDN. Empty by default: point this at your own CDN via
// wp-config.php or the `lumen_design_library_url` filter to enable the library.
defined( 'LUMEN_DESIGN_LIBRARY_URL' ) || define( 'LUMEN_DESIGN_LIBRARY_URL', '' );

/********************************************************************************************
 * Activation & PHP version checks.
 ********************************************************************************************/

if ( ! function_exists( 'lumen_php_requirement_activation_check' ) ) {

	/**
	 * Upon activation, check if we have the proper PHP version.
	 * Show an error if needed and don't continue with the plugin.
	 *
	 * @since 1.9
	 */
	function lumen_php_requirement_activation_check() {
		if ( version_compare( PHP_VERSION, '7.3.0', '<' ) ) {
			deactivate_plugins( basename( __FILE__ ) );
			wp_die(
				sprintf(
					/* translators: 1: opening strong tag, 2: closing strong tag with line breaks, 3: the PHP version running on the site, 4: opening link tag back to the plugins screen, 5: closing link tag */
					esc_html__( '%1$s"Lumen" can not be activated. %2$s It requires PHP version 7.3.0 or higher, but PHP version %3$s is used on the site. Please upgrade your PHP version first ✌️ %4$s Back %5$s', 'lumen-blocks' ),
					'<strong>',
					'</strong><br><br>',
					PHP_VERSION,
					'<br /><br /><a href="' . esc_url( get_dashboard_url( get_current_user_id(), 'plugins.php' ) ) . '" class="button button-primary">',
					'</a>'
				)
			);
		}
	}
	register_activation_hook( __FILE__, 'lumen_php_requirement_activation_check' );
}

/**
 * Always check the PHP version at the start.
 * If the PHP version isn't sufficient, don't continue to prevent any unwanted errors.
 *
 * @since 1.9
 */
if ( version_compare( PHP_VERSION, '7.3.0', '<' ) ) {
	if ( ! function_exists( 'lumen_php_requirement_notice' ) ) {
		function lumen_php_requirement_notice() {
	        printf(
	            '<div class="notice notice-error"><p>%s</p></div>',
	            /* translators: %s: the PHP version running on the site */
	            sprintf( esc_html__( '"Lumen" requires PHP version 7.3.0 or higher, but PHP version %s is used on the site.', 'lumen-blocks' ), PHP_VERSION )
	        );
		}
	}
	add_action( 'admin_notices', 'lumen_php_requirement_notice' );
	return;
}

/**
 * Always keep note of the Lumen version.
 *
 * @since 2.0
 */
if ( ! function_exists( 'lumen_version_upgrade_check' ) ) {
	function lumen_version_upgrade_check() {
		// This is triggered only when V1 was previously activated, and this is the first time V2 is activated.
		// Will not trigger after successive V2 activations.
		if ( get_option( 'lumen_activation_date' ) && ! get_option( 'lumen_current_version_installed' ) ) {
			update_option( 'lumen_current_version_installed', '1', 'no' );
		}

		// Always check the current version installed. Trigger if it changes.
		if ( get_option( 'lumen_current_version_installed' ) !== LUMEN_VERSION ) {
			do_action( 'lumen_version_upgraded', get_option( 'lumen_current_version_installed' ), LUMEN_VERSION );
			update_option( 'lumen_current_version_installed', LUMEN_VERSION, 'no' );
		}
	}
	add_action( 'admin_menu', 'lumen_version_upgrade_check', 1 );
}

/**
 * Allow early version upgrade processes.
 *
 * @since 3.10.2
 */
if ( ! function_exists( 'lumen_early_version_upgrade_check' ) ) {
	function lumen_early_version_upgrade_check() {
		// Always check the current version installed. Trigger if it changes.
		if ( get_option( 'lumen_current_version_installed' ) !== LUMEN_VERSION ) {
			if ( is_admin() ) {
				do_action( 'lumen_early_version_upgraded', get_option( 'lumen_current_version_installed' ), LUMEN_VERSION );
			} else {
				do_action( 'lumen_early_version_upgraded_frontend', get_option( 'lumen_current_version_installed' ), LUMEN_VERSION );
			}
		}
	}
	add_action( 'init', 'lumen_early_version_upgrade_check', 1 );
}

/**
 * If Gutenberg plugin is activated, add a notice to disable it since it may cause issues.
 *
 * @since 2.11.4
 */
if ( ! function_exists( 'lumen_should_show_gutenberg_notice' ) ) {
	/**
	 * Whether the Gutenberg-plugin notice belongs on this request.
	 *
	 * Shown only to somebody who could act on it — the notice asks for a plugin
	 * to be turned off — and only on the screens where plugins and blocks are
	 * managed, rather than on every page of the admin.
	 *
	 * @since 2.11.4
	 *
	 * @return bool
	 */
	function lumen_should_show_gutenberg_notice() {
		if ( ! defined( 'GUTENBERG_VERSION' ) || ! current_user_can( 'activate_plugins' ) ) {
			return false;
		}

		if ( get_option( 'lumen_notice_gutenberg_plugin_ignore' ) ) {
			return false;
		}

		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		$screens = array( 'dashboard', 'plugins', 'plugins-network', 'edit-post', 'edit-page' );

		if ( ! $screen || ! in_array( $screen->id, $screens, true ) ) {
			return false;
		}

		return is_plugin_active( 'gutenberg/gutenberg.php' );
	}
}

if ( ! function_exists( 'lumen_notice_gutenberg_plugin_scripts' ) ) {
	/**
	 * The dismiss handler for the notice below.
	 *
	 * Enqueued rather than printed as a `<script>` tag beside the notice, and
	 * hung off `wp-util` because that is what provides the `wp.ajax` it calls.
	 * It carries a nonce, which the handler checks.
	 *
	 * @since 2.11.4
	 */
	function lumen_notice_gutenberg_plugin_scripts() {
		if ( ! lumen_should_show_gutenberg_notice() ) {
			return;
		}

		wp_enqueue_script( 'wp-util' );
		wp_add_inline_script(
			'wp-util',
			sprintf(
				'( function() {
					document.body.addEventListener( "click", function( event ) {
						if ( event.target.matches( ".notice.lumen_notice_gutenberg_plugin button.notice-dismiss" ) ) {
							wp.ajax.post( "lumen_notice_gutenberg_plugin_ignore", { _ajax_nonce: %s } );
						}
					} );
				} )();',
				wp_json_encode( wp_create_nonce( 'lumen_notice_gutenberg_plugin_ignore' ) )
			)
		);
	}
	add_action( 'admin_enqueue_scripts', 'lumen_notice_gutenberg_plugin_scripts' );
}

/**
 * If Gutenberg plugin is activated, add a notice to disable it since it may cause issues.
 *
 * @since 2.11.4
 */
if ( ! function_exists( 'lumen_notice_gutenberg_plugin_activated' ) ) {
	function lumen_notice_gutenberg_plugin_activated() {
		if ( ! lumen_should_show_gutenberg_notice() ) {
			return;
		}

		printf(
			'<div class="notice notice-warning is-dismissible lumen_notice_gutenberg_plugin"><p>%s</p></div>',
			/* translators: 1: opening strong tag, 2: closing strong tag */
			sprintf( esc_html__( '%1$sLumen Notice%2$s: We noticed that the Gutenberg plugin is active! Please be aware the Gutenberg plugin is used to try out the new Block Editor features, and Lumen might not be compatible with it. Click the close button on the side to dismiss this notice.', 'lumen-blocks' ), '<strong>', '</strong>' )
		);
	}

	add_action( 'admin_notices', 'lumen_notice_gutenberg_plugin_activated' );
}

if ( ! function_exists( 'lumen_notice_gutenberg_plugin_ignore' ) ) {
	/**
	 * Remember that the notice above was dismissed.
	 *
	 * Writes an option, so it verifies the nonce and the capability first: any
	 * logged-in user could otherwise call this endpoint.
	 *
	 * @since 2.11.4
	 */
	function lumen_notice_gutenberg_plugin_ignore() {
		check_ajax_referer( 'lumen_notice_gutenberg_plugin_ignore' );

		if ( ! current_user_can( 'activate_plugins' ) ) {
			wp_send_json_error( esc_html__( 'Insufficient permissions.', 'lumen-blocks' ), 403 );
		}

		update_option( 'lumen_notice_gutenberg_plugin_ignore', true );
		wp_send_json_success();
	}
	add_action( 'wp_ajax_lumen_notice_gutenberg_plugin_ignore', 'lumen_notice_gutenberg_plugin_ignore' );
}

/********************************************************************************************
 * END Activation & PHP version checks.
 ********************************************************************************************/

/********************************************************************************************
 * Deactivation & cleanup
 ********************************************************************************************/

 if ( ! function_exists( 'lumen_deactivation_cleanup' ) ) {

	/**
	 * Upon deactivation, delete some Lumen database entries which are no
	 * longer needed (even if re-activating).
	 *
	 * @since 3.7.1
	 */
	function lumen_deactivation_cleanup() {
		// Delete deprecated cached dynamic content auto-detected fields.
		delete_option( 'lumen_dynamic_content_other_fields_frontend' );
		// Delete cached dynamic content auto-detected fields.
		delete_option( 'lumen_dynamic_content_meta_keys_frontend' );
		// Delete old v2 go premium notice status.
		delete_option( 'lumen_inspector_premium_notice_status' );
		// Delete old Navigation Panel setting.
		delete_option( 'lumen_enable_navigation_panel' );
		// Delete stored signatures for display conditions
		delete_option( 'lumen_custom_php_sigs' );
		delete_option( 'lumen_disp_cond_custom_php_sigs' );
	}
	register_deactivation_hook( __FILE__, 'lumen_deactivation_cleanup' );
}

/********************************************************************************************
 * END Deactivation & cleanup
 ********************************************************************************************/

if ( ! function_exists( 'lumen_is_frontend' ) ) {
	/**
	 * Check if we are in the frontend.
	 *
	 * @since 3.13.0
	 *
	 * @return bool
	 */
	function lumen_is_frontend() {
		return ! is_admin() && ! wp_is_json_request();
	}
}

/**
 * Block Initializer.
 */
// First, so that every settings class below can reach the shared sanitizers.
require_once( plugin_dir_path( __FILE__ ) . 'src/sanitize.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/editor-settings.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/admin.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/init.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/lmn-block-types.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/blocks.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/fonts.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/icons.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/unique-id.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/conditional-display.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/features/effects-animations/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/posts/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/pro.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/jetpack.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/multisite.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/kses.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/dynamic-breakpoints.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/design-library/init.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/design-library/built-in-patterns.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/styles/block-design-system.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/theme-block-style-inheritance/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/global-settings.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/spacing-and-borders/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/buttons-and-icons/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/color-schemes/deprecated/index.php' );  // We need to add this so the filter for deprecation gets applied.
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/color-schemes/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/preset-controls/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/extensions/global-settings/block-styles/index.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/css-optimize.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/compatibility/index.php' );

if ( ! is_admin() ) {
	require_once( plugin_dir_path( __FILE__ ) . 'src/lightbox/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/accordion/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/carousel/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/count-up/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/countdown/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/expand/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/notification/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/video-popup/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/table-of-contents/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/map/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/progress-bar/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/progress-circle/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/horizontal-scroller/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/marquee/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/tabs/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/features/alignment/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/columns/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/timeline/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/block-library/icon-label/deprecated.php' );
}

/**
 * Welcome screen.
 */
require_once( plugin_dir_path( __FILE__ ) . 'src/dashboard/getting-started.php' );
if ( is_admin() ) {
	require_once( plugin_dir_path( __FILE__ ) . 'src/dashboard/index.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/dashboard/notification.php' );
	require_once( plugin_dir_path( __FILE__ ) . 'src/dashboard/about.php' );
}

if ( LUMEN_BUILD === 'premium' ) {
	/**
	 * Premium initialize code.
	 */
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'pro__premium_only/index.php' ) ) {
		require_once( plugin_dir_path( __FILE__ ) . 'pro__premium_only/index.php' );
	}
}

// Deprecated.
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/editor-settings.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/native-global-colors.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/navigation-panel-pre-enabled.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/font-awesome-version.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/global-color-schemes.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/block-defaults.php' );

/**
 * V2 Deprecated
 */
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/init.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/blocks.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/disabled-blocks.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/design-library/init.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/optimization-settings.php' );
require_once( plugin_dir_path( __FILE__ ) . 'src/legacy/v2/global-settings.php' );
