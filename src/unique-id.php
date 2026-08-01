<?php
/**
 * Rendering of the blocks based on the display condition.
 *
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $lumen_unique_ids;
$lumen_unique_ids = array();

if ( ! function_exists( 'lumen_prevent_duplicate_unique_ids' ) ) {
	function lumen_prevent_duplicate_unique_ids( $block_content, $block ) {
		if ( ! isset( $block['blockName'] ) || strpos( $block['blockName'], 'lumen/' ) === false ) {
			return $block_content;
		}

		if ( ! isset( $block['attrs']['uniqueId'] ) ) {
			return $block_content;
		}

		$unique_id = $block['attrs']['uniqueId'];
		if ( empty( $unique_id ) ) {
			return $block_content;
		}

		global $lumen_unique_ids;

		if ( isset( $lumen_unique_ids[ $unique_id ] ) ) {
			// A pseudo-random unique ID is generated to replace the duplicate unique ID.
			$random_unique_id = substr( str_shuffle( '0123456789abcdefghijklmnopqrstuvwxyz0123456789abcdefghijklmnopqrstuvwxyz' ), 0, 7 );
			$lumen_unique_ids[ $random_unique_id ] = true;
			$block_content = str_replace( $unique_id, $random_unique_id, $block_content );
		} else {
			$lumen_unique_ids[ $unique_id ] = true;
		}

		return $block_content;
	}

	// Only do this in the frontend.
	if ( lumen_is_frontend() ) {
		add_filter( 'render_block', 'lumen_prevent_duplicate_unique_ids', 9, 2 );
	}
}
