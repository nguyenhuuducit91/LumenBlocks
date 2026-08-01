<?php
/**
 * Conditional display.
 *
 * Decides on the server whether a block is rendered at all. That distinction
 * matters: hiding a block with CSS still sends its markup to every reader, so
 * anything meant only for logged-in members, or only after a launch date, is
 * still sitting in the page source for anyone who looks.
 *
 * The conditions an author can express are deliberately a short, closed list.
 * Post content is not a place from which arbitrary queries or PHP should be
 * reachable, so nothing here evaluates anything the author typed — each
 * condition is a named case with its own comparison.
 *
 * @package Lumen
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Lumen_Conditional_Display' ) ) {

	/**
	 * Renders or withholds blocks according to their display conditions.
	 */
	class Lumen_Conditional_Display {

		/**
		 * Attaches the render filter.
		 */
		public function __construct() {
			add_filter( 'render_block', array( $this, 'maybe_hide_block' ), 10, 2 );
		}

		/**
		 * Drops a block's markup when its conditions are not met.
		 *
		 * @param string $block_content The rendered block.
		 * @param array  $block         The parsed block.
		 * @return string The block, or an empty string.
		 */
		public function maybe_hide_block( $block_content, $block ) {
			if ( empty( $block['blockName'] ) || 0 !== strpos( $block['blockName'], 'lumen/' ) ) {
				return $block_content;
			}

			$condition = isset( $block['attrs']['displayCondition'] )
				? $block['attrs']['displayCondition']
				: array();

			if ( ! is_array( $condition ) || empty( $condition['type'] ) ) {
				return $block_content;
			}

			/**
			 * Filters the decision for one block.
			 *
			 * @since 1.1.0
			 *
			 * @param bool|null $show      Whether to show it, or null to decide here.
			 * @param array     $condition The condition as stored.
			 * @param array     $block     The parsed block.
			 */
			$show = apply_filters( 'lumen.conditional-display.show', null, $condition, $block );

			if ( null === $show ) {
				$show = $this->evaluate( $condition );
			}

			return $show ? $block_content : '';
		}

		/**
		 * Whether one condition is currently satisfied.
		 *
		 * An unrecognised condition shows the block. Failing the other way
		 * would mean a plugin update that renamed a condition could empty
		 * somebody's published page without warning.
		 *
		 * @param array $condition The condition as stored.
		 * @return bool Whether to render.
		 */
		private function evaluate( array $condition ) {
			$type = isset( $condition['type'] ) ? (string) $condition['type'] : '';
			$show = $this->matches( $type, $condition );

			// "Hide when" is the same test, read the other way round.
			$hide_when_matched = ! empty( $condition['hideWhenMatched'] );

			return $hide_when_matched ? ! $show : $show;
		}

		/**
		 * Whether the named condition matches right now.
		 *
		 * @param string $type      Condition name.
		 * @param array  $condition The condition as stored.
		 * @return bool Whether it matches.
		 */
		private function matches( $type, array $condition ) {
			switch ( $type ) {
				case 'logged-in':
					return is_user_logged_in();

				case 'logged-out':
					return ! is_user_logged_in();

				case 'user-role':
					return $this->user_has_role(
						isset( $condition['role'] ) ? (string) $condition['role'] : ''
					);

				case 'date-after':
					return $this->now() >= $this->timestamp( $condition, 'dateFrom' );

				case 'date-before':
					return $this->now() <= $this->timestamp( $condition, 'dateTo' );

				case 'date-between':
					return $this->now() >= $this->timestamp( $condition, 'dateFrom' )
						&& $this->now() <= $this->timestamp( $condition, 'dateTo' );

				case 'post-type':
					return get_post_type() === ( isset( $condition['postType'] ) ? $condition['postType'] : '' );

				case 'front-page':
					return is_front_page();

				case 'singular':
					return is_singular();

				case 'archive':
					return is_archive();

				case 'search':
					return is_search();

				case 'mobile':
					return wp_is_mobile();

				case 'desktop':
					return ! wp_is_mobile();
			}

			// Unknown condition: show the block.
			return true;
		}

		/**
		 * Whether the current user holds a role.
		 *
		 * @param string $role Role slug.
		 * @return bool Whether they hold it.
		 */
		private function user_has_role( $role ) {
			if ( '' === $role || ! is_user_logged_in() ) {
				return false;
			}

			$user = wp_get_current_user();

			return in_array( $role, (array) $user->roles, true );
		}

		/**
		 * The current time, in the site's own timezone.
		 *
		 * @return int Timestamp.
		 */
		private function now() {
			return (int) current_time( 'timestamp' ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested -- compared against dates read in the same timezone.
		}

		/**
		 * Reads one of the condition's dates as a timestamp.
		 *
		 * A missing or unreadable date is treated as "no limit in that
		 * direction" rather than as now, so half-finished settings do not hide
		 * a block the author is still configuring.
		 *
		 * @param array  $condition The condition as stored.
		 * @param string $key       Which date to read.
		 * @return int Timestamp.
		 */
		private function timestamp( array $condition, $key ) {
			$value = isset( $condition[ $key ] ) ? (string) $condition[ $key ] : '';

			if ( '' === $value ) {
				return 'dateFrom' === $key ? 0 : PHP_INT_MAX;
			}

			$parsed = strtotime( $value );

			if ( false === $parsed ) {
				return 'dateFrom' === $key ? 0 : PHP_INT_MAX;
			}

			return (int) $parsed;
		}
	}

	new Lumen_Conditional_Display();
}
