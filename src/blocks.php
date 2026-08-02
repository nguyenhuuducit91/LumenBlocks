<?php
/**
 * Blocks Loader
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	2.17.2
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_register_blocks' ) ) {
	function lumen_register_blocks() {
		$blocks_array = apply_filters( 'lumen.blocks', array() );

		$registry = WP_Block_Type_Registry::get_instance();
		foreach ( $blocks_array as $name => $metadata ) {
			if ( $registry->is_registered( $name ) ) {
				$registry->unregister( $name );
			}

			$register_options = apply_filters( 'lumen.register-blocks.options',
				// This automatically enqueues all our styles and scripts.
				array(
					'style' => 'lmb-style-css', // Frontend styles.
					// 'script' => 'lmb-block-frontend-js', // Frontend scripts.
					'editor_script' => 'lmb-block-js', // Editor scripts.
					'editor_style' => 'lmb-block-editor-css', // Editor styles.
				),
				$metadata['name'],
				$metadata
			);

			$block_args = array_merge( $metadata, $register_options );
			register_block_type( $metadata['name'], $block_args );
		}
	}
	add_action( 'init', 'lumen_register_blocks' );
}

/**
 * Allow our blocks to display post excerpts
 * when calling `get_the_excerpt` function.
 *
 * @see https://developer.wordpress.org/reference/hooks/excerpt_allowed_blocks/
 */
if ( ! function_exists( 'lumen_add_excerpt_wrapper_blocks' ) ) {
	/**
	 * Register lumen blocks with inner blocks.
	 */
	function lumen_add_excerpt_wrapper_blocks( $allowed_wrapper_blocks ) {
		return array_merge( $allowed_wrapper_blocks,  array(
			'lumen/accordion',
			'lumen/blockquote',
			'lumen/button-group',
			'lumen/call-to-action',
			'lumen/card',
			'lumen/column',
			'lumen/columns',
			'lumen/container',
			'lumen/expand',
			'lumen/feature-grid',
			'lumen/feature',
			'lumen/hero',
			'lumen/icon-box',
			'lumen/icon-label',
			'lumen/image-box',
			'lumen/notification',
			'lumen/posts',
			'lumen/price',
			'lumen/tabs',
			'lumen/tab-content',
			'lumen/pricing-box',
			'lumen/team-member',
			'lumen/testimonial',
			'lumen/timeline',
			'lumen/video-popup',
			'lumen/horizontal-scroller',
			)
	 	);
	}

	add_filter( 'excerpt_allowed_wrapper_blocks', 'lumen_add_excerpt_wrapper_blocks' );
}

if ( ! function_exists( 'lumen_add_excerpt_blocks' ) ) {
	/**
	 * Register "unit" lumen blocks (blocks without inner blocks)
	 */
	function lumen_add_excerpt_blocks( $allowed_blocks ) {
		return array_merge( $allowed_blocks, array(
			'lumen/button',
			'lumen/count-up',
			'lumen/countdown',
			'lumen/divider',
			'lumen/heading',
			'lumen/icon-button',
			'lumen/icon-list',
			'lumen/icon',
			'lumen/image',
			'lumen/number-box',
			'lumen/map',
			'lumen/progress-bar',
			'lumen/progress-circle',
			'lumen/separator',
			'lumen/spacer',
			'lumen/subtitle',
			'lumen/table-of-contents',
			'lumen/tab-labels',
			'lumen/text',
			)
		);
	}

	add_filter( 'excerpt_allowed_blocks', 'lumen_add_excerpt_blocks' );
}
