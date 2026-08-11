<?php
/**
 * Sanitizers shared by every setting this plugin registers.
 *
 * The settings here are not flat text fields. They are nested structures — a
 * colour palette, a typography scale for ten selectors, a set of block styles
 * with the CSS they compile to — and they arrive over the REST API from the
 * editor. `register_setting()`'s schema validates their *shape*; it does not
 * clean their *contents*, and every one of these callbacks used to do no more
 * than check that the outer value was an array before storing it whole.
 *
 * That mattered because most of what is stored here is eventually written into
 * the CSS of the site's front end.
 *
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_sanitize_setting_value' ) ) {
	/**
	 * Clean a setting without flattening it.
	 *
	 * Walks the structure and sanitizes the leaves, leaving the arrangement of
	 * the value alone: the editor reads these settings back and expects the
	 * same shape it sent.
	 *
	 * Numbers and booleans are kept as they are — they cannot carry a payload,
	 * and casting them to text would change the type the editor gets back.
	 * Strings go through `sanitize_text_field()`, which is right for the things
	 * actually stored here: colour values, font names, slugs, lengths such as
	 * `12px` or `calc(100% - 2rem)`. Anything else is dropped.
	 *
	 * @since 1.0.1
	 *
	 * @param mixed $value    The value to clean.
	 * @param int   $depth    Guards against a structure nested deep enough to
	 *                        exhaust the stack; settings here are three or four
	 *                        levels at most.
	 * @return mixed The cleaned value.
	 */
	function lumen_sanitize_setting_value( $value, $depth = 0 ) {
		if ( $depth > 10 ) {
			return null;
		}

		if ( is_array( $value ) ) {
			$sanitized = array();

			foreach ( $value as $key => $item ) {
				// Keys reach the CSS too, as block names and selector
				// fragments, so they are cleaned alongside the values.
				$sanitized_key = is_int( $key ) ? $key : sanitize_text_field( (string) $key );
				$sanitized[ $sanitized_key ] = lumen_sanitize_setting_value( $item, $depth + 1 );
			}

			return $sanitized;
		}

		if ( is_bool( $value ) || is_int( $value ) || is_float( $value ) || is_null( $value ) ) {
			return $value;
		}

		if ( is_string( $value ) ) {
			return sanitize_text_field( $value );
		}

		// Objects and resources have no business in an option this plugin
		// writes, and storing one would mean unserializing it again later.
		return null;
	}
}

if ( ! function_exists( 'lumen_sanitize_array_setting' ) ) {
	/**
	 * The shared body of every `sanitize_array_setting` callback.
	 *
	 * @since 1.0.1
	 *
	 * @param mixed $input The submitted setting.
	 * @return array The cleaned setting, or an empty array if it was not one.
	 */
	function lumen_sanitize_array_setting( $input ) {
		if ( ! is_array( $input ) ) {
			return array();
		}

		return lumen_sanitize_setting_value( $input );
	}
}

if ( ! function_exists( 'lumen_sanitize_css' ) ) {
	/**
	 * Clean a stylesheet that will be printed into the page.
	 *
	 * CSS cannot go through `sanitize_text_field()` — that would collapse it
	 * onto one line and strip the characters it is written with. What it does
	 * need is to be unable to stop being CSS:
	 *
	 * - `</style` ends the element it is printed inside, and whatever follows
	 *   is parsed as HTML. There is no legitimate reason for it to appear in a
	 *   stylesheet.
	 * - `@import` fetches a stylesheet from somewhere else, which is both a
	 *   remote dependency and a way to bring in rules nothing here has seen.
	 * - `expression()`, `behavior:` and `-moz-binding` are the old routes from
	 *   a stylesheet to running script. Long dead in current browsers, but the
	 *   readers of a site are not all on current browsers.
	 *
	 * @since 1.0.1
	 *
	 * @param mixed $css The stylesheet.
	 * @return string The cleaned stylesheet.
	 */
	function lumen_sanitize_css( $css ) {
		if ( ! is_string( $css ) ) {
			return '';
		}

		$css = wp_strip_all_tags( $css );
		$css = preg_replace( '#</\s*style#i', '', $css );
		$css = preg_replace( '/@import\b/i', '', $css );
		$css = preg_replace( '/\b(expression|behaviou?r|-moz-binding)\s*[\(:]/i', '', $css );
		$css = preg_replace( '/javascript\s*:/i', '', $css );

		return (string) $css;
	}
}

if ( ! function_exists( 'lumen_sanitize_svg' ) ) {
	/**
	 * Clean an inline SVG before it is stored.
	 *
	 * The icon library holds icon markup that is printed into pages, so it is
	 * held to an allowlist of the shape-drawing elements and the attributes
	 * that describe them — no `<script>`, no `<foreignObject>`, no event
	 * handlers, no `href`.
	 *
	 * @since 1.0.1
	 *
	 * @param mixed $svg The icon markup.
	 * @return string The cleaned markup.
	 */
	function lumen_sanitize_svg( $svg ) {
		if ( ! is_string( $svg ) ) {
			return '';
		}

		$common = array(
			'class' => true,
			'style' => true,
			'fill' => true,
			'fill-rule' => true,
			'fill-opacity' => true,
			'stroke' => true,
			'stroke-width' => true,
			'stroke-linecap' => true,
			'stroke-linejoin' => true,
			'stroke-dasharray' => true,
			'stroke-opacity' => true,
			'opacity' => true,
			'transform' => true,
			'clip-rule' => true,
		);

		$allowed = array(
			'svg' => array_merge( $common, array(
				'xmlns' => true,
				'viewbox' => true,
				'width' => true,
				'height' => true,
				'role' => true,
				'aria-hidden' => true,
				'aria-label' => true,
				'preserveaspectratio' => true,
			) ),
			'g' => $common,
			'path' => array_merge( $common, array( 'd' => true ) ),
			'circle' => array_merge( $common, array( 'cx' => true, 'cy' => true, 'r' => true ) ),
			'ellipse' => array_merge( $common, array( 'cx' => true, 'cy' => true, 'rx' => true, 'ry' => true ) ),
			'rect' => array_merge( $common, array( 'x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true ) ),
			'line' => array_merge( $common, array( 'x1' => true, 'y1' => true, 'x2' => true, 'y2' => true ) ),
			'polygon' => array_merge( $common, array( 'points' => true ) ),
			'polyline' => array_merge( $common, array( 'points' => true ) ),
			'title' => array(),
			'desc' => array(),
		);

		return wp_kses( $svg, $allowed );
	}
}
