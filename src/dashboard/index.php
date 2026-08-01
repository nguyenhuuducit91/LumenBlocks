<?php
/**
 * Welcome screen.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_Welcome_Screen' ) ) {
	class Lumen_Welcome_Screen {
		function __construct() {
			add_action( 'admin_menu', array( $this, 'add_dashboard_page' ) );

			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_dashboard_script' ) );

			add_action( 'admin_init', array( $this, 'redirect_to_welcome_page' ) );
			add_action('admin_init', array( $this, 'redirect_submenus' ) );

			add_action('admin_head', array( $this, 'redirect_submenus_newtab' ) );

			$plugin = plugin_basename( LUMEN_FILE );
			add_filter( 'plugin_action_links_' . $plugin, array( $this, 'add_settings_link' ) );
		}

		public function add_dashboard_page() {

			$icon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMyLjAiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTQ2LjAgMTEwLjAgTDE5MC4wIDEwNC41IEwxOTAuMCA5NS41IEwxNDYuMCA5MC4wIFogTTEyNi45IDEzOC4yIEwxNTEuMyAxNTYuMiBMMTU2LjIgMTUxLjMgTDEzOC4yIDEyNi45IFogTTkwLjAgMTQ2LjAgTDk1LjUgMTkwLjAgTDEwNC41IDE5MC4wIEwxMTAuMCAxNDYuMCBaIE02MS44IDEyNi45IEw0My44IDE1MS4zIEw0OC43IDE1Ni4yIEw3My4xIDEzOC4yIFogTTU0LjAgOTAuMCBMMTAuMCA5NS41IEwxMC4wIDEwNC41IEw1NC4wIDExMC4wIFogTTczLjEgNjEuOCBMNDguNyA0My44IEw0My44IDQ4LjcgTDYxLjggNzMuMSBaIE0xMTAuMCA1NC4wIEwxMDQuNSAxMC4wIEw5NS41IDEwLjAgTDkwLjAgNTQuMCBaIE0xMzguMiA3My4xIEwxNTYuMiA0OC43IEwxNTEuMyA0My44IEwxMjYuOSA2MS44IFoiLz48L3N2Zz4=';

			add_menu_page(
				__( 'Lumen', LUMEN_I18N ), // Page title.
				__( 'Lumen', LUMEN_I18N ) . ' ' . lumen_notification_count(), // Menu title.
				'manage_options', // Capability.
				'lumen', // Menu slug.
				array( $this, 'lumen_getting_started_content' ), // Callback function.
				$icon,
				25
			);

			// Our getting started page.
			add_submenu_page(
				'lumen', // Parent slug.
				__( 'Getting Started', LUMEN_I18N ), // Page title.
				__( 'Getting Started', LUMEN_I18N ), // Menu title.
				'manage_options', // Capability.
				'lumen', // Menu slug.
				array( $this, 'lumen_getting_started_content' ), // Callback function.
			);

			// Our settings page.
			add_submenu_page(
				'lumen', // Parent slug.
				__( 'Lumen', LUMEN_I18N ), // Page title.
				__( 'Settings', LUMEN_I18N ) . ' ' . lumen_notification_count(), // Menu title.
				'manage_options', // Capability.
				'lumen-settings', // Menu slug.
				array( $this, 'lumen_settings_content' ), // Callback function.
			);

			do_action( 'lumen_submenu_register' );
		}

		public function enqueue_dashboard_script( $hook ) {
			// For lumen pages, show our admin css.
			if ( 'settings_page_lumen' === $hook || stripos( $hook, 'page_lumen' ) !== false || stripos( $hook, 'page_lmn' ) !== false ) {
				wp_enqueue_style( 'lumen-welcome', plugins_url( 'dist/admin_welcome.css', LUMEN_FILE ), array(), LUMEN_VERSION );
				wp_enqueue_style( 'lmb-block-editor-css', plugins_url( 'dist/editor_blocks.css', LUMEN_FILE ), array(), LUMEN_VERSION );
				do_action( 'lumen_settings_admin_enqueue_styles' );
			}

			// For the options page, load our options script.
			if ( 'settings_page_lumen' === $hook || stripos( $hook, 'page_lumen' ) !== false || 'toplevel_page_lumen' === $hook ) {

				wp_enqueue_script( 'wp-i18n' );
				wp_enqueue_script( 'wp-element' );
				wp_enqueue_script( 'wp-hooks' );
				wp_enqueue_script( 'wp-util' ); // Need wp.ajax.
				wp_enqueue_script( 'wp-components' ); // Need Spinner.
				wp_enqueue_style( 'wp-components' ); // Need Spinner.

				do_action( 'lumen_settings_admin_enqueue_scripts' );

				wp_enqueue_script( 'lumen-welcome', plugins_url( 'dist/admin_welcome.js', LUMEN_FILE ), array( 'wp-i18n', 'wp-element', 'wp-hooks', 'wp-util', 'wp-components', 'wp-api', 'wp-editor', 'lodash' ), LUMEN_VERSION );

				// Add translations.
				wp_set_script_translations( 'lumen-welcome', LUMEN_I18N );
				lumen_load_js_translations(); // This is needed for the translation strings to be loaded.

				$args = apply_filters( 'lumen_localize_settings_script', array(
					'srcUrl' => untrailingslashit( plugins_url( '/', LUMEN_FILE ) ),
					'welcomeSrcUrl' => untrailingslashit( plugins_url( '/', __FILE__ ) ),
					'i18n' => LUMEN_I18N,
					'cdnUrl' => LUMEN_DESIGN_LIBRARY_URL,
					'isPro' => apply_filters( 'lumen_is_pro', false ),
					'showProNotice' => lumen_should_show_pro_notices(),
					'contactURL' => '',
					'planName' => '',
					'showProNoticesOption' => LUMEN_SHOW_PRO_NOTICES,
				) );
				wp_localize_script( 'lumen-welcome', 'lumen', $args );
			}
		}

		public static function print_tabs() {
			$screen = get_current_screen();

			$display_account_tab = true;
			$display_contact_tab = true;
			$account_url = '';
			$contact_url = admin_url( 'admin.php?page=lumen-contact' );

			// If network activated and in multisite, the accounts page is in a different URL.
			if ( LUMEN_BUILD === 'free' ) {
				$display_account_tab = false;
				$display_contact_tab = false;
			}

			?>
			<div class="s-body s-tabs">
				<a class="s-tab <?php echo $screen->base === 'toplevel_page_lumen' ? 's-active' : '' ?>"
					href="<?php echo admin_url( 'admin.php?page=lumen' ) ?>">
					<span><?php _e( 'Getting Started', LUMEN_I18N ) ?></span>
				</a>

				<a class="s-tab <?php echo $screen->base === 'lumen_page_lumen-settings' ? 's-active' : '' ?>"
					href="<?php echo admin_url( 'admin.php?page=lumen-settings' ) ?>">
					<span><?php _e( 'Settings', LUMEN_I18N ) ?></span>
				</a>

				<?php if ( $display_account_tab && LUMEN_BUILD !== 'free' ) { ?>
					<a class="s-tab <?php echo $screen->base === 'lumen_page_lumen-account' ? 's-active' : '' ?>"
						href="<?php echo $account_url ?>">
						<span><?php _e( 'Account', LUMEN_I18N ) ?></span>
					</a>
				<?php } ?>

				<?php if ( false ) { ?>
					<a class="s-tab <?php echo $screen->base === 'lumen_page_lumen-affiliation' ? 's-active' : '' ?>"
						href="<?php echo admin_url( 'options-general.php?page=lumen-affiliation' ) ?>">
						<span><?php _e( 'Affiliation', LUMEN_I18N ) ?></span>
					</a>
				<?php } ?>

				<?php if ( function_exists( 'lumen_is_custom_fields_enabled' ) ) { ?>
					<?php if ( lumen_is_custom_fields_enabled() && current_user_can( 'manage_lumen_custom_fields' ) ) { ?>
						<a class="s-tab <?php echo $screen->base === 'lumen_page_lmn-custom-fields' ? 's-active' : '' ?>"
							href="<?php echo admin_url( 'admin.php?page=lmn-custom-fields' ) ?>">
							<span><?php _e( 'Custom Fields', LUMEN_I18N ) ?></span>
						</a>
					<?php } ?>
				<?php } ?>

				<a class="s-tab <?php echo $screen->base === 'lumen_page_lumen-about' ? 's-active' : '' ?>"
					href="<?php echo admin_url( 'admin.php?page=lumen-about' ) ?>">
					<span><?php _e( 'About', LUMEN_I18N ) ?></span>
				</a>

				<?php if ( $display_contact_tab && LUMEN_BUILD !== 'free' ) { ?>
					<a class="s-tab <?php echo $screen->base === 'lumen_page_lumen-contact' ? 's-active' : '' ?>"
						href="<?php echo $contact_url ?>">
						<span><?php _e( 'Contact Us', LUMEN_I18N ) ?></span>
					</a>
				<?php } ?>

			</div>
			<?php
		}

		public static function print_header( $title = '', $image = 'logo' ) {
			?>
			<header class="s-header s-heading-1 <?php echo ! current_user_can( 'manage_options' ) ? 's-header-no-tabs' : '' ?> s-logo-<?php echo $image ?>" role="heading" aria-level="1" aria-labelledby="s-heading-<?php echo empty( $title ) ? 'logo' : 'title' ?>">
				<img id="s-heading-logo" src="<?php echo esc_url( plugins_url( 'images/lumen-' . $image . '.svg', __FILE__ ) ) ?>" alt="<?php esc_attr_e( 'Lumen', LUMEN_I18N ) ?>"/>
				<span id="s-heading-title"><?php echo $title ?></span>
			</header>
			<?php
		}

		public function lumen_settings_content() {
			?>
			<div class="wrap wrap-settings">
				<div class="s-header-wrap s-header-settings">
					<?php $this->print_header() ?>
					<?php echo $this->print_tabs() ?>
				</div>
				<h1 aria-hidden="true" class="s-admin-notice-marker"></h1>
				<section id="settings-notice">
					<div class="s-rest-settings-notice"></div>
					<div class="s-save-settings-notice"></div>
				</section>
				<?php lumen_welcome_notification() ?>
				<section class="s-body-container s-body-container-with-sidenav">
					<div class="s-body" id="settings-body">
						<?php do_action( 'lumen_settings_page' ) ?>

						<div class="s-content" id="settings-content"></div>
						<?php do_action( 'lumen_settings_page_mid' ); ?>
					</div>
				</section>
			</div>
			<?php
		}

		public function lumen_content($id) {
			?>
			<div class="wrap wrap-settings">
				<div class="s-header-wrap s-header-settings">
					<?php $this->print_header() ?>
					<?php echo $this->print_tabs() ?>
				</div>
				<h1 aria-hidden="true" class="s-admin-notice-marker"></h1>
				<section id="settings-notice">
					<div class="s-rest-settings-notice"></div>
					<div class="s-save-settings-notice"></div>
				</section>
				<?php lumen_welcome_notification() ?>
				<section class="s-body-container" id="<?php echo esc_attr( $id ); ?>">
				</section>
			</div>
			<?php
		}

		/**
		 * Gets the video URL. If we are in development mode, display the source video,
		 * if in an actual site, use the one in the CDN.
		 */
		private function get_video_url( $video_file ) {
			if ( file_exists( untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/videos/' . $video_file ) ) {
				return untrailingslashit( plugins_url( '/', LUMEN_FILE ) ) . '/src/dashboard/videos/' . $video_file;
			}
			$cdn_url = apply_filters( 'lumen_design_library_url', LUMEN_DESIGN_LIBRARY_URL );
			return empty( $cdn_url ) ? '' : untrailingslashit( $cdn_url ) . '/dist/videos/welcome/' . $video_file;
		}

		/**
		 * Getting Started Content
		 */
		public function lumen_getting_started_content() {
			?>
			<div class="wrap s-getting-started">
			<div class="s-header-wrap">
					<?php $this->print_header() ?>
					<?php echo $this->print_tabs() ?>
				</div>
				<h1 aria-hidden="true" class="s-admin-notice-marker"></h1>
				<section class="s-body-container s-body-container-center s-getting-started__body">
				</section>
			</div>
			<?php
		}

		/**
		 * Redirect to the Lumen Documentation/Premium page.
		*/
		public function redirect_submenus() {
			if ( empty( $_GET['page'] ) ) {
				return;
			}
		}

		public function redirect_submenus_newtab() {
			?>
			<script id='lmn-documentation-set-target'>
			document.addEventListener('DOMContentLoaded', function() {
				const docs = document.querySelector('a[href="admin.php?page=lumen-documentation"]');
				if (docs) docs.setAttribute('target', '_blank');
				const premium = document.querySelector('a[href="admin.php?page=lumen-go-premium"]');
				if (premium) premium.setAttribute('target', '_blank');
			});

			// Remove this script from the DOM after execution to clean up
			const currentScript = document.getElementById('lmn-documentation-set-target');
				if (currentScript) {
					currentScript.parentNode.removeChild(currentScript);
				}
			</script>
			<?php
		}

		/**
		 * Adds links to the plugins page entry.
		 *
		 * @param Array $links
		 *
		 * @return Array
		 */
		public function add_settings_link( $links ) {
			// Settings link.
			if ( current_user_can( 'manage_options' ) ) {
				$settings_link = sprintf( '<a href="%s">%s</a>',
					admin_url( 'admin.php?page=lumen-settings' ),
					__( 'Settings', LUMEN_I18N )
				);

				// Prevent warnings in PHP 7.0+ when a plugin uses this filter incorrectly.
				$links = (array) $links;
				array_unshift( $links, $settings_link );
			}

			return $links;
		}

		/**
		 * Adds a marker to remember to redirect after activation.
		 * Redirecting right away will not work.
		 */
		public static function start_redirect_to_welcome_page( $network_wide ) {
			if ( ! $network_wide && ! defined( 'LUMEN_NO_WELCOME_REDIRECT' ) ) {
				update_option( 'lumen_redirect_to_welcome', '1' );
			}
		}

		/**
		 * Redirect to the welcome screen if our marker exists.
		 */
		public function redirect_to_welcome_page() {

			if ( get_option( 'lumen_redirect_to_welcome' ) &&
				current_user_can( 'manage_options' ) &&
				true
			) {
				// Never go here again.
				delete_option( 'lumen_redirect_to_welcome' );

				// Allow others to bypass the welcome screen.
				if ( ! apply_filters( 'lumen_activation_screen_enabled', true ) ) {
					return;
				}

				// Or go to the getting started page.
				wp_redirect( esc_url( admin_url( 'admin.php?page=lumen' ) ) );

				die();
			}
		}
	}

	new Lumen_Welcome_Screen();
}

// This filter is used by the Freemius activation screen, we can disable redirection with this.
add_filter( 'fs_redirect_on_activation_lumen-blocks', function ( $redirect ) {
	return apply_filters( 'lumen_activation_screen_enabled', $redirect );
} );

// Redirect to the welcome screen.
register_activation_hook( LUMEN_FILE, array( 'Lumen_Welcome_Screen', 'start_redirect_to_welcome_page' ) );
