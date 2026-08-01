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

if ( ! function_exists( 'lumen_get_all_v2_blocks_json_paths' ) ) {
	function lumen_get_all_v2_blocks_json_paths() {
		// Blocks directory may not exist if working from a fresh clone.
		$blocks_dir = dirname( __FILE__ ) . '/block';
		if ( ! file_exists( $blocks_dir ) ) {
			return;
		}

		$block_folders = array(
			'accordion',
			'blockquote',
			'blog-posts',
			'button',
			'call-to-action',
			'card',
			'column',
			'columns',
			'container',
			'count-up',
			'design-library',
			'divider',
			'expand',
			'feature',
			'feature-grid',
			'header',
			'heading',
			'icon',
			'icon-list',
			'image-box',
			'notification',
			'number-box',
			'pricing-box',
			'separator',
			'spacer',
			'team-member',
			'testimonial',
			'text',
			'video-popup',
		);

		$paths = array();
		foreach ( $block_folders as $folder_name ) {
			$block_json_file = $blocks_dir . '/' . $folder_name . '/block.json';
			if ( file_exists( $block_json_file ) ) {
				$paths[] = $block_json_file;
			}
		}

		return $paths;
	}
}

if ( ! function_exists( 'lumen_register_blocks_v2' ) ) {
	function lumen_register_blocks_v2() {
		$block_json_files = lumen_get_all_v2_blocks_json_paths();

		$registry = WP_Block_Type_Registry::get_instance();
		foreach ( $block_json_files as $block_json_file ) {
			$metadata = json_decode( file_get_contents( $block_json_file ), true );

			if ( $registry->is_registered( $metadata['name'] ) ) {
				$registry->unregister( $metadata['name'] );
			}

			$register_options = apply_filters( 'lumen.v2.register-blocks.options',
				// This automatically enqueues all our styles and scripts.
				array(
					'style' => 'lmb-style-css-v2', // Frontend styles.
					'script' => 'lmb-block-frontend-js-v2', // Frontend scripts.
					'editor_script' => 'lmb-block-js-v2', // Editor scripts.
					'editor_style' => 'lmb-block-editor-css-v2', // Editor styles.
				),
				$metadata['name'],
				$metadata
			);

			register_block_type_from_metadata( $block_json_file, $register_options );
		}
	}

	/**
	 * Checks whether we're editing a post in Gutenberg, then loads the v2
	 * scripts only when there are v2 blocks present in the content.
	 *
	 * @return void
	 */
	function lumen_load_editor_blocks_v2() {
		$current_screen = get_current_screen();
		if ( $current_screen->base === 'post' && $current_screen->is_block_editor() ) {
			$content = get_the_content();
			if ( stripos( $content, '<!-- wp:lmb/' ) !== false ) {
				lumen_register_blocks_v2();
				return;
			}

			// If we can't find it, maybe another plugin changed the output
			// of get_the_content(), try getting it again.
			global $post;
			$content = ! empty( $post ) ? $post->post_content : $content;
			if ( stripos( $content, '<!-- wp:lmb/' ) !== false ) {
				lumen_register_blocks_v2();
				return;
			}

			// If no v2 blocks found, check for any reusable blocks in the
			// current content.
			if ( stripos( $content, '<!-- wp:block' ) !== false ) {
				// Find all reusable block reference Ids.
				if ( preg_match_all( '#wp:block(.*?)[\'"]ref[\'"]*:(\d+)#', $content, $matches ) ) {
					if ( count( $matches ) >= 3 ) {
						foreach ( $matches[2] as $reusable_id ) {

							// Reusable block Ids are post ids.
							$resuable_post = get_post( (int) $reusable_id );
							$reusable_content = ! empty( $resuable_post ) ? $resuable_post->post_content : '';

							// Check if the reusable block uses a v2 block.
							if ( stripos( $reusable_content, '<!-- wp:lmb/' ) !== false ) {
								lumen_register_blocks_v2();
								return;
							}
						}
					}
				}
			}

		}
	}

	if ( lumen_has_v2_frontend_compatibility() && ! is_admin() ) {
		// Load the scripts normally in the frontend.
		add_action( 'init', 'lumen_register_blocks_v2' );
	} else if ( lumen_has_v2_editor_compatibility() ) {
		if ( ! is_admin() || ! lumen_has_v2_editor_compatibility_usage() ) {
			// Load the block scripts normally in the editor.
			add_action( 'init', 'lumen_register_blocks_v2' );
		} else {
			// This only loads v2 lumen blocks in the editor if there are v2
			// blocks existing in the content.
			add_action( 'enqueue_block_editor_assets', 'lumen_load_editor_blocks_v2' );
		}
	}
}

/**
 * Allow our blocks to display post excerpts
 * when calling `get_the_excerpt` function.
 *
 * @see https://developer.wordpress.org/reference/hooks/excerpt_allowed_blocks/
 */
if ( ! function_exists( 'lumen_add_excerpt_wrapper_blocks_v2' ) ) {
	/**
	 * Register lumen blocks with inner blocks.
	 */
	function lumen_add_excerpt_wrapper_blocks_v2( $allowed_wrapper_blocks ) {
		$allowed_lumen_wrapper_blocks = [
			// lmb blocks.
			'lmb/accordion',
			'lmb/column',
			'lmb/columns',
			'lmb/container',
		];

		return array_merge( $allowed_lumen_wrapper_blocks, $allowed_wrapper_blocks );
	}

	if ( lumen_has_v2_frontend_compatibility() || lumen_has_v2_editor_compatibility() ) {
		add_filter( 'excerpt_allowed_wrapper_blocks', 'lumen_add_excerpt_wrapper_blocks_v2' );
	}
}

if ( ! function_exists( 'lumen_add_excerpt_blocks_v2' ) ) {
	/**
	 * Register "unit" lumen blocks (blocks without inner blocks)
	 */
	function lumen_add_excerpt_blocks_v2( $allowed_blocks ) {
		$allowed_lumen_blocks = [
			// lmb blocks.
			'lmb/blockquote',
			'lmb/blog-posts',
			'lmb/button',
			'lmb/cta',
			'lmb/card',
			'lmb/count-up',
			'lmb/expand',
			'lmb/feature-grid',
			'lmb/feature',
			'lmb/header',
			'lmb/heading',
			'lmb/icon-list',
			'lmb/icon',
			'lmb/image-box',
			'lmb/notification',
			'lmb/number-box',
			'lmb/pricing-box',
			'lmb/team-member',
			'lmb/testimonial',
			'lmb/text',
		];

		return array_merge( $allowed_lumen_blocks, $allowed_blocks );
	}

	if ( lumen_has_v2_frontend_compatibility() || lumen_has_v2_editor_compatibility() ) {
		add_filter( 'excerpt_allowed_blocks', 'lumen_add_excerpt_blocks_v2' );
	}
}
