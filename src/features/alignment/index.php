<?php
/**
 * In charge of loading the frontend polyfill for alignment :has() selector
 * support
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$lumen_user_agent = ! empty( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';
$lumen_load_fallback = false;

// Safari <= 15.3
if ( stripos( $lumen_user_agent, 'Version/' ) !== false && stripos( $lumen_user_agent, 'Safari/' ) !== false ) {
	$lumen_version_start = stripos( $lumen_user_agent, 'Version/' ) + 8;
	$lumen_version_end = strpos( $lumen_user_agent, ' ', $lumen_version_start );
	$lumen_safari_version = substr( $lumen_user_agent, $lumen_version_start, $lumen_version_end - $lumen_version_start );

	// Convert version string to an array of parts
	$lumen_version_parts = explode( '.', $lumen_safari_version );

	if (
		// Safari < 15
		( isset( $lumen_version_parts[ 0 ] ) && intval( $lumen_version_parts[ 0 ] ) < 15 ) ||
		// Safari <= 15.3
		( isset( $lumen_version_parts[ 0 ] ) && intval( $lumen_version_parts[ 0 ] ) == 15 &&
			(
				( isset( $lumen_version_parts[ 1 ] ) && intval( $lumen_version_parts[ 1 ] ) <= 3 ) ||
				! isset( $lumen_version_parts[ 1 ] )
			)
		)
	) {
		$lumen_load_fallback = true;
	}
} else if ( stripos( $lumen_user_agent, 'Firefox/' ) !== false ) {
	$lumen_load_fallback = true;
}

if ( ! empty( $lumen_user_agent ) && $lumen_load_fallback ) {
	if ( ! function_exists( 'lumen_render_block_alignment_frontend_polyfill' ) ) {

		function lumen_render_block_alignment_flex_frontend_polyfill ( $block_content, $block ) {
			if ( ! isset( $block['blockName'] ) || strpos( $block['blockName'], 'lumen/' ) === false ) {
				return $block_content;
			}

			if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
				return $block_content;
			}

			// The polyfill is only for containers that use column flex.
			if ( ! strpos( $block_content, 'lmn-container' ) && ! strpos( $block_content, 'lmn--column-flex' ) ) {
				return $block_content;
			}

			if ( strpos( $block_content, 'lmn-container--has-child-column-flex-polyfill' ) !== false ) {
				return $block_content;
			}

			return preg_replace( '/lmn-container\s(.*?<.*?lmn--column-flex)/i', 'lmn-container lmn-container--has-child-column-flex-polyfill $1', $block_content );
		}

		if ( lumen_is_frontend() ) {
			add_filter( 'render_block', 'lumen_render_block_alignment_flex_frontend_polyfill', 10, 2 );
		}

		function lumen_render_block_alignment_frontend_polyfill ( $block_content, $block ) {
			if ( ! isset( $block['blockName'] ) || strpos( $block['blockName'], 'lumen/' ) === false ) {
				return $block_content;
			}

			if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
				return $block_content;
			}

			// The polyfill is only for containers that use column flex.
			if ( ! strpos( $block_content, 'lmn--block-margin-top-auto' ) && ! strpos( $block_content, 'lmn--block-margin-bottom-auto' ) ) {
				return $block_content;
			}

			$added_polyfill = false;

			$tag = new WP_HTML_Tag_Processor( $block_content );
			$tag->next_tag();
			$content = $tag->set_bookmark( 'block_content' );

			if ( $tag->next_tag( array( 'class_name' => 'lmn-block-content' ) ) ) {
				$classes = $tag->get_attribute( 'class' );
				if ( strpos( $classes, 'lmn--column-flex' ) === false ) {
					$tag->set_bookmark( 'not_lmn--column-flex' );

					$add_polyfill_class = false;
					if ( $tag->next_tag( array( 'class_name' => 'lmn--block-margin-top-auto' ) ) ) {
						$add_polyfill_class = true;
					}

					$tag->seek( 'not_lmn--column-flex' );
					if ( $tag->next_tag( array( 'class_name' => 'lmn--block-margin-bottom-auto' ) ) ) {
						$add_polyfill_class = true;
					}

					if ( $add_polyfill_class ) {
						$added_polyfill = true;
						$tag->seek( 'not_lmn--column-flex' );
						$tag->add_class( 'lmn--height-100-polyfill' );
					}
					$tag->release_bookmark( 'not_lmn--column-flex' );
				}
			}

			$tag->seek( 'block_content' );
			if ( $tag->next_tag( array( 'class_name' => 'lmn-inner-blocks' ) ) ) {
				$classes = $tag->get_attribute( 'class' );
				if ( strpos( $classes, 'lmn--column-flex' ) === false ) {
					$tag->set_bookmark( 'not_lmn--column-flex' );

					$add_polyfill_class = false;
					if ( $tag->next_tag( array( 'class_name' => 'lmn--block-margin-top-auto' ) ) ) {
						$add_polyfill_class = true;
					}

					$tag->seek( 'not_lmn--column-flex' );
					if ( $tag->next_tag( array( 'class_name' => 'lmn--block-margin-bottom-auto' ) ) ) {
						$add_polyfill_class = true;
					}

					if ( $add_polyfill_class ) {
						$added_polyfill = true;
						$tag->seek( 'not_lmn--column-flex' );
						$tag->add_class( 'lmn--height-100-polyfill' );
					}
					$tag->release_bookmark( 'not_lmn--column-flex' );
				}
			}

			$tag->release_bookmark( 'block_content' );
			if ( $added_polyfill ) {
				return $tag->get_updated_html();
			}

			return $block_content;
		}

		if ( lumen_is_frontend() ) {
			add_filter( 'render_block', 'lumen_render_block_alignment_frontend_polyfill', 10, 2 );
		}
	}
}
