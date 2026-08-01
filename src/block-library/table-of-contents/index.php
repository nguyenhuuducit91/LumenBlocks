<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter to add our plugin to the list of compatible plugins in rank math.
 *
 * @param array TOC plugins.
 */
add_filter( 'rank_math/researches/toc_plugins', function( $toc_plugins ) {
	$toc_plugins['lumen-blocks-premium/plugin.php'] = 'Lumen';
	$toc_plugins['lumen-blocks/plugin.php'] = 'Lumen';
 	return $toc_plugins;
} );
