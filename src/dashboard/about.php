<?php
/**
 * About.
 *
 * Who wrote this, how to reach them, and — for anyone who wants to — how to
 * say thank you. A plugin given away for free still has a person behind it,
 * and this is the page that says so.
 *
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Lumen_About_Page' ) ) {

	/**
	 * The About screen under the Lumen menu.
	 */
	class Lumen_About_Page {

		/**
		 * How to reach the author.
		 *
		 * Kept in one place so the page and any future screen say the same
		 * thing rather than drifting apart.
		 */
		public const AUTHOR       = 'Nguyễn Hữu Đức';
		public const AUTHOR_ROLE  = 'Software Developer';
		public const AUTHOR_EMAIL = 'nguyenhuuduc.it.91@gmail.com';
		public const AUTHOR_PHONE = '0964 589 910';

		/**
		 * Registers the page and its tab.
		 */
		public function __construct() {
			add_action( 'lumen_submenu_register', array( $this, 'add_page' ) );
		}

		/**
		 * Adds About to the Lumen menu.
		 */
		public function add_page() {
			add_submenu_page(
				'lumen',
				__( 'About', LUMEN_I18N ),
				__( 'About', LUMEN_I18N ),
				'manage_options',
				'lumen-about',
				array( $this, 'render' )
			);
		}

		/**
		 * The URL of one of this screen's images.
		 *
		 * @param string $file File name inside `images/`.
		 * @return string URL.
		 */
		private function image( $file ) {
			return esc_url( plugins_url( 'images/' . $file, __FILE__ ) );
		}

		/**
		 * One line of the contact card.
		 *
		 * @param string $icon  Dashicon suffix.
		 * @param string $main  The line itself.
		 * @param string $sub   A quieter second line, or ''.
		 * @param string $href  Where the line goes, or '' for plain text.
		 */
		private function row( $icon, $main, $sub = '', $href = '' ) {
			$tag  = $href ? 'a' : 'div';
			$attr = $href ? ' href="' . esc_url( $href ) . '"' : '';

			// Only outbound links get a new tab; mailto and tel should not.
			if ( $href && 0 === strpos( $href, 'http' ) ) {
				$attr .= ' target="_blank" rel="noopener noreferrer"';
			}

			?>
			<<?php echo esc_html( $tag ) . $attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built above. ?> class="lmn-about__row">
				<span class="lmn-about__row-icon dashicons dashicons-<?php echo esc_attr( $icon ); ?>"></span>
				<span class="lmn-about__row-text">
					<span class="lmn-about__row-main"><?php echo esc_html( $main ); ?></span>
					<?php if ( $sub ) { ?>
						<span class="lmn-about__row-sub"><?php echo esc_html( $sub ); ?></span>
					<?php } ?>
				</span>
			</<?php echo esc_html( $tag ); ?>>
			<?php
		}

		/**
		 * Renders the page.
		 */
		public function render() {
			// Counted rather than hard-coded, so the number cannot go stale.
			$block_dirs = glob( untrailingslashit( plugin_dir_path( LUMEN_FILE ) ) . '/src/block-library/*', GLOB_ONLYDIR );
			$blocks     = is_array( $block_dirs ) ? count( $block_dirs ) : 0;

			// The block count is already one of the figures in the hero, so it
			// is not repeated here.
			$highlights = array(
				__( 'Global design system', LUMEN_I18N ),
				__( 'Responsive controls', LUMEN_I18N ),
				__( 'Copy & paste styling', LUMEN_I18N ),
				__( 'Motion effects', LUMEN_I18N ),
				__( 'Custom CSS', LUMEN_I18N ),
				__( 'Conditional display', LUMEN_I18N ),
			);
			?>
			<div class="wrap wrap-settings lmn-about">
				<div class="s-header-wrap s-header-settings">
					<?php Lumen_Welcome_Screen::print_header(); ?>
					<?php Lumen_Welcome_Screen::print_tabs(); ?>
				</div>

				<h1 aria-hidden="true" class="s-admin-notice-marker"></h1>

				<section class="s-body-container s-body-container-center">
					<div class="lmn-about__card">

						<header class="lmn-about__hero">
							<div class="lmn-about__logo-tile">
								<img
									class="lmn-about__logo"
									src="<?php echo $this->image( 'lumen-icon.svg' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in image(). ?>"
									alt=""
								/>
							</div>
							<h2 class="lmn-about__title"><?php esc_html_e( 'Lumen Blocks', LUMEN_I18N ); ?></h2>
							<p class="lmn-about__tagline">
								<?php esc_html_e( 'A page builder that is just the block editor.', LUMEN_I18N ); ?>
							</p>

							<?php /* Three facts worth knowing before anything else. */ ?>
							<dl class="lmn-about__stats">
								<div class="lmn-about__stat">
									<dt><?php esc_html_e( 'Blocks', LUMEN_I18N ); ?></dt>
									<dd><?php echo esc_html( $blocks ); ?></dd>
								</div>
								<div class="lmn-about__stat">
									<dt><?php esc_html_e( 'Version', LUMEN_I18N ); ?></dt>
									<dd><?php echo esc_html( LUMEN_VERSION ); ?></dd>
								</div>
								<div class="lmn-about__stat">
									<dt><?php esc_html_e( 'Licence', LUMEN_I18N ); ?></dt>
									<dd>GPL-3.0</dd>
								</div>
							</dl>
						</header>

						<div class="lmn-about__body">
							<div class="lmn-about__chips">
								<?php foreach ( $highlights as $highlight ) { ?>
									<span class="lmn-about__chip"><?php echo esc_html( $highlight ); ?></span>
								<?php } ?>
							</div>

							<?php /*
							 * Two columns on a wide screen: who made it beside how
							 * to thank them. They stack below 900px, where a QR
							 * code and a contact list side by side stop fitting.
							 */ ?>
							<div class="lmn-about__columns">
								<section class="lmn-about__panel">
									<h3 class="lmn-about__heading"><?php esc_html_e( 'Developer', LUMEN_I18N ); ?></h3>
									<div class="lmn-about__rows">
										<?php
										$this->row( 'admin-users', self::AUTHOR, self::AUTHOR_ROLE );
										$this->row( 'email-alt', self::AUTHOR_EMAIL, __( 'Email', LUMEN_I18N ), 'mailto:' . self::AUTHOR_EMAIL );
										$this->row( 'phone', self::AUTHOR_PHONE, __( 'Phone', LUMEN_I18N ), 'tel:' . preg_replace( '/\s+/', '', self::AUTHOR_PHONE ) );
										?>
									</div>
								</section>

								<section class="lmn-about__panel lmn-about__panel--donate">
									<h3 class="lmn-about__heading">
										<span class="dashicons dashicons-heart"></span>
										<?php esc_html_e( 'Support the developer', LUMEN_I18N ); ?>
									</h3>
									<p class="lmn-about__donate-text">
										<?php esc_html_e( 'Lumen Blocks is free and always will be. If it saves you time, a coffee keeps it improving.', LUMEN_I18N ); ?>
									</p>
									<div class="lmn-about__qr-row">
										<figure class="lmn-about__qr-item">
											<img
												class="lmn-about__qr"
												src="<?php echo $this->image( 'donate-bank.png' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in image(). ?>"
												alt="<?php esc_attr_e( 'Bank transfer QR code', LUMEN_I18N ); ?>"
											/>
											<figcaption><?php esc_html_e( 'Bank transfer', LUMEN_I18N ); ?></figcaption>
										</figure>
										<figure class="lmn-about__qr-item">
											<img
												class="lmn-about__qr"
												src="<?php echo $this->image( 'donate-paypal.png' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in image(). ?>"
												alt="<?php esc_attr_e( 'PayPal QR code', LUMEN_I18N ); ?>"
											/>
											<figcaption><?php esc_html_e( 'PayPal', LUMEN_I18N ); ?></figcaption>
										</figure>
									</div>
								</section>
							</div>

							<section class="lmn-about__licence-note">
								<?php
								printf(
									/* translators: %s: the licence name, linked. */
									esc_html__( 'Released under %s. Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc., also under GPL-3.0. The changes are listed in NOTICE.md.', LUMEN_I18N ),
									'<a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">GPL-3.0-or-later</a>'
								);
								?>
							</section>
						</div>

						<footer class="lmn-about__foot">
							<?php esc_html_e( 'Made with ♥ in Vietnam', LUMEN_I18N ); ?>
						</footer>
					</div>
				</section>
			</div>
			<?php
		}
	}

	new Lumen_About_Page();
}
