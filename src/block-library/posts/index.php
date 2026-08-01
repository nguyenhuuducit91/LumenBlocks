<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_generate_render_item_from_posts_block' ) ) {
	/**
	 * Given a post array, attributes,
	 * and a template, generate a post
	 * item markup
	 *
	 * @param array $post
	 * @param array $attribute
	 * @param string $template
	 *
	 * @return string the generated markup
	 */

	function lumen_generate_render_item_from_posts_block( $post, $attributes, $template ) {
		$image_size = $attributes['imageSize'];
		$excerpt_length = $attributes['excerptLength'];
		// Missing means an older post saved before this setting existed. Those
		// were rendered with whatever markup the excerpt carried, but the
		// default is to strip it, so they follow the default too.
		$excerpt_strip_html = ! isset( $attributes['excerptStripHtml'] ) || $attributes['excerptStripHtml'];
		$readmore_text = $attributes['readmoreText'];
		$meta_separator = $attributes['metaSeparator'];
		$category_highlighted = $attributes['categoryHighlighted'];
		$post_id = $post['ID'];

		$new_template = $template;

		// Featured Image.
		if ( strpos( $new_template, '<img' ) !== false || strpos( $new_template, '<figure' ) !== false ) {
			$featured_image = '';

			$thumbnail = get_the_post_thumbnail( $post_id, $image_size );
			if ( ! empty( $thumbnail ) ) {
				// Get the image tag in the thumbnail markup.
				preg_match( "/<img[^\>]*>/", $thumbnail, $match );

				// Remove the built in style attribute in the image.
				if ( is_array( $match ) && count( $match ) > 0 ) {
					// Only remove the style tag inside the image tag.
					$new_img = preg_replace( '/style=\"[^\"]*\"\s?/', "", $match[ 0 ] );
					$featured_image = preg_replace( "/<img[^\>]*>/", $new_img, $thumbnail );
				}
			}

			/*
			 * A post with no picture of its own.
			 *
			 * The author can ask for a placeholder instead of a gap — without
			 * one, a single post missing its featured image makes a whole grid
			 * go ragged. Only the `src` of the image already in the template is
			 * replaced, so it keeps the classes and sizing the block gave it.
			 */
			if ( empty( $featured_image ) && ! empty( $attributes['imageFallbackShow'] ) ) {
				$fallback = ! empty( $attributes['imageFallbackUrl'] )
					? $attributes['imageFallbackUrl']
					: lumen_posts_no_image_src();

				$new_template = preg_replace_callback(
					'/<img[^>]*>/',
					function ( $match ) use ( $fallback ) {
						$img = preg_replace( '/\ssrc="[^"]*"/', '', $match[0] );
						$img = preg_replace( '/\salt="[^"]*"/', '', $img );

						/*
						 * `esc_url` is the wrong tool for the built-in
						 * placeholder: `data:` is not one of the protocols it
						 * allows, so it returns an empty string and the image
						 * silently breaks. An author's own URL still goes
						 * through it.
						 */
						$src = 0 === strpos( $fallback, 'data:image/svg+xml' )
							? esc_attr( $fallback )
							: esc_url( $fallback );

						return str_replace(
							'<img',
							'<img src="' . $src . '" alt=""',
							$img
						);
					},
					$new_template
				);
			} elseif ( empty( $featured_image ) ) {
				$new_template = preg_replace( '/<figure[^>]*>(.*)<\/figure>/', '', $new_template );

				/*
				 * And the link that wrapped it.
				 *
				 * The figure sits inside an anchor when the image links to the
				 * post, and removing only the figure left an empty `<a>` behind:
				 * a link with nothing in it for a screen reader to announce, and
				 * — now that a post can be laid out as a grid — an invisible
				 * element occupying a cell and pushing the real content sideways.
				 */
				$new_template = preg_replace(
					'/<a[^>]*class="[^"]*lmn-block-posts__image-link[^"]*"[^>]*>\s*<\/a>/',
					'',
					$new_template
				);
			} else {
				$new_template = preg_replace( '/<img[^>]*>/', $featured_image, $new_template );
			}
		}

		// Title.
		if ( strpos( $new_template, '!#title!#' ) !== false ) {
			$title = $post['post_title'];
			if ( empty( $title ) ) {
				$title = __( '(Untitled)', 'lumen-blocks' );
			}

			// Escape title output to prevent XSS
			$title = esc_html( $title );

			$new_template = str_replace( '!#title!#', $title, $new_template );
		}

		// Category.
		if ( strpos( $new_template, '!#category!#' ) !== false ) {
			// If taxonomyTypeToDisplay is set, display that taxonomy instead of category.
			$taxonomy_type = isset( $attributes['taxonomyTypeToDisplay'] ) ? $attributes['taxonomyTypeToDisplay'] : 'category';
			$category = Lumen_Posts_Block::get_taxonomy_term_list_by_id( $post_id, $taxonomy_type );
			
			if ( $category_highlighted ) {
				preg_match_all( '/<a href="([^"]*)"[^>]*>([^<]*)<\/a>/', $category, $matches );
				foreach ( $matches[0] as $i=>$match ) {
					$original_href = $matches[1][$i];
					$original_title = $matches[2][$i];
					// Escape values to prevent XSS
					$escaped_href = esc_url( $original_href );
					$escaped_title = esc_html( $original_title );
					$category = str_replace( "<a href=\"$original_href\"", "<a class=\"lmn-button\" href=\"$escaped_href\"", $category );
					$category = str_replace( ">$original_title<", "><span class=\"lmn-button__inner-text\">$escaped_title</span><", $category );
				}
			}

			$new_template = str_replace( '!#category!#', $category, $new_template );
		}

		// Separator.
		if ( strpos( $new_template, '!#metaSeparator!#' ) !== false ) {
			$separator = Lumen_Posts_Block::meta_separators[ $meta_separator ];
			// Escape separator output to prevent XSS
			$separator = esc_html( $separator );
			$new_template = str_replace( '!#metaSeparator!#', $separator, $new_template );
		}

		// Author.
		if ( strpos( $new_template, '!#authorName!#' ) !== false ) {
			$author = esc_html( get_the_author_meta( 'display_name', $post['post_author'] ) );
			$new_template = str_replace( '!#authorName!#', $author, $new_template );
		}

		// Date.
		if ( strpos( $new_template, '!#dateTime!#' ) !== false || strpos( $new_template, '!#date!#' ) !== false ) {
			$timezone = new DateTimeZone( wp_timezone_string() );
			$post_date = new DateTime( $post['post_date'], $timezone );

			$datetime = wp_date( 'c', $post_date->getTimestamp() );
			$date_format = get_option( 'date_format' );
			if ( empty( $date_format ) ) {
				$date_format = 'F j, Y';
			}
			$date = wp_date( $date_format, $post_date->getTimestamp() );
			// Escape date output to prevent XSS
			$datetime = esc_attr( $datetime );
			$date = esc_html( $date );
			$new_template = str_replace( '!#dateTime!#', $datetime, $new_template );
			$new_template = str_replace( '!#date!#', $date, $new_template );
		}

		// Comments.
		if ( strpos( $new_template, '!#commentsNum!#' ) !== false ) {
			$num = get_comments_number( $post_id );
			/* translators: %d: number of comments on the post */
			$num = sprintf( _n( '%d comment', '%d comments', $num, 'lumen-blocks' ), $num );
			// Escape comments number output to prevent XSS
			$num = esc_html( $num );
			$new_template = str_replace( '!#commentsNum!#', $num, $new_template );
		}

		// Excerpt.
		if ( strpos( $new_template, '!#excerpt!#' ) !== false ) {
			$excerpt = Lumen_Posts_Block::get_excerpt_by_post_id( $post_id, $post, (int) $excerpt_length );

			/*
			 * Plain text, if that is what was asked for.
			 *
			 * `the_excerpt` wraps what it is given in a paragraph and leaves any
			 * links and formatting in place, and inside this block that markup
			 * brings its own margins and colours to a card whose typography is
			 * set in the inspector.
			 */
			if ( $excerpt_strip_html && ! empty( $excerpt ) ) {
				$excerpt = trim( preg_replace( '/\s+/', ' ', wp_strip_all_tags( $excerpt ) ) );
			}

			// Trim the excerpt.
			if ( ! empty( $excerpt ) ) {
				$excerpt = wp_kses_post( $excerpt );
				$new_template = str_replace( '!#excerpt!#', $excerpt, $new_template );
			} else {
				// If the excerpt is empty, remove the markup.
				$new_template = preg_replace( '/<div class="lmn-block-posts__excerpt[^>]*>!#excerpt!#<\/div>/', '', $new_template );
			}
		}

		// Post Link.
		if ( strpos( $new_template, '!#postLink!#' ) !== false ) {
			$new_template = str_replace( '!#postLink!#', esc_url( get_permalink( $post_id ) ), $new_template );
		}

		// Read More Link.
		if ( strpos( $new_template, '!#readmoreText!#' ) !== false ) {
			$new_template = str_replace( '!#readmoreText!#', wp_kses_post( $readmore_text ), $new_template );
		}

		return $new_template;
	}
}

if ( ! function_exists( 'lumen_posts_no_image_src' ) ) {
	/**
	 * The picture a post gets when it has none of its own.
	 *
	 * A data URI rather than a file: the build packages only the PHP out of
	 * `src/`, so an SVG shipped there would resolve while developing and 404
	 * once installed — a bug the way we work would never show us.
	 *
	 * `src/block-library/posts/no-image.js` carries the same drawing for the
	 * editor. If one changes, change the other.
	 *
	 * @return {string} A data URI.
	 */
	function lumen_posts_no_image_src() {
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-hidden="true">'
			. '<rect width="400" height="300" fill="#f0f0f1"/>'
			. '<g fill="none" stroke="#c3c4c7" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">'
			. '<rect x="90" y="80" width="220" height="150" rx="10"/>'
			. '<path d="M110 205l55-55 40 40 30-30 55 45"/>'
			. '</g>'
			. '<circle cx="250" cy="120" r="16" fill="#c3c4c7"/>'
			. '</svg>';

		return 'data:image/svg+xml;charset=utf-8,' . rawurlencode( $svg );
	}
}

if ( ! function_exists( 'lumen_posts_to_ids' ) ) {
	/**
	 * Reads a comma-separated list of post ids.
	 *
	 * Anything that is not a positive number is dropped rather than passed on.
	 * WP_Query turns a stray word into `0`, and a query for post 0 comes back
	 * empty — which an author reads as "there are no posts" rather than as a
	 * typo in the field above.
	 *
	 * @param string $value What was typed.
	 * @return array Post ids.
	 */
	function lumen_posts_to_ids( $value ) {
		if ( empty( $value ) ) {
			return array();
		}

		$ids = array_map( 'intval', explode( ',', (string) $value ) );

		return array_values( array_filter( $ids, function ( $id ) {
			return $id > 0;
		} ) );
	}
}

if ( ! function_exists( 'lumen_generate_post_query_from_posts_block' ) ) {
	/**
	 * Query generator for 'lumen/posts' block.
	 *
	 * @since 3.0.0
	 * @param WP_Query | array $block_or_attribute
	 * @param string | number $page
	 *
	 * @return array post query which will be used for WP_Query.
	 */
	function lumen_generate_post_query_from_posts_block( $block_or_attribute, $query_string = '' ) {
		$is_wp_block = ! is_array( $block_or_attribute ) && get_class( $block_or_attribute ) === 'WP_Block';
		/**
		 * If the passed object is an instance of
		 * WP_Block, it is assumed that the block
		 * uses the provided context of the posts block.
		 *
		 * Otherwise, the block using this function
		 * is a posts block, and the passed object is
		 * an attribute object.
		 */
		$context = Lumen_Posts_Block::generate_defaults( $is_wp_block ? $block_or_attribute->context : $block_or_attribute );
		$post_query = array(
				'post_type' => $context['type'],
				'post_status' => 'publish',
				'order' => $context['order'],
				'orderby' => $context['orderBy'],
				'numberposts' => $context['numberOfItems'],
				'suppress_filters' => false,
		);

		/**
		 * Which posts to skip, name and take.
		 *
		 * The attributes for these have always existed; only the controls were
		 * missing. The ids are filtered to integers rather than passed through:
		 * WP_Query turns a stray word into `0`, and a query for post 0 comes
		 * back empty, which reads as "there are no posts" rather than as a typo.
		 */
		if ( ! empty( $context['postOffset'] ) ) {
			$post_query['offset'] = absint( $context['postOffset'] );
		}

		$include = lumen_posts_to_ids( $context['postInclude'] );

		if ( ! empty( $include ) ) {
			$post_query['post__in'] = $include;
		}

		$exclude = lumen_posts_to_ids( $context['postExclude'] );

		// The post being read is only meaningful on a singular view; anywhere
		// else there is nothing to leave out.
		if ( ! empty( $context['excludeCurrentPost'] ) && is_singular() ) {
			$exclude[] = get_the_ID();
		}

		if ( ! empty( $exclude ) ) {
			// A handful of ids at most: the current post and anything the editor chose
			// to leave out of this block.
			// phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
			$post_query['post__not_in'] = array_values( array_unique( $exclude ) );
		}

		if ( ! empty( $context['taxonomy'] ) && ! empty( $context['taxonomyType'] ) ) {
			// Categories.
			if ( $context['taxonomyType'] === 'category' ) {
				$post_query[ 'category' . $context['taxonomyFilterType'] ] = explode( ',', $context['taxonomy'] );
			// Tags.
			} else if ( $context['taxonomyType'] === 'post_tag' ) { $post_query[ 'tag' . $context['taxonomyFilterType'] ] = explode( ',', $context['taxonomy'] );
			// Custom taxonomies.
			} else {
				// The taxonomy and terms are chosen by the editor in the block's own
				// settings; there is no way to express that filter without tax_query.
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				$post_query['tax_query'] = array(
					array(
						'taxonomy' => $context['taxonomyType'],
						'field' => 'term_id',
						'terms' => explode( ',', $context['taxonomy'] ),
						'operator' => $context['taxonomyFilterType'] === '__in' ? 'IN' : 'NOT IN',
					),
				);
			}
		}

		return apply_filters( 'lumen/posts/post_query',
			$post_query,
			$context,
			$query_string
		);
	}
}

if ( ! class_exists( 'Lumen_Posts_Block' ) ) {
	class Lumen_Posts_Block {

		const meta_separators = array(
			'dot' => '·',
			'space' => ' ',
			'comma' => ',',
			'dash' => '—',
			'pipe' => '|',
		);

		function __construct() {
			add_filter( 'lumen.register-blocks.options', array( $this, 'register_block_type' ), 1, 3 );
			add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );
		}

		/**
		 * Add more data in the REST API that we'll use in the posts block
		 *
		 * @since 3.0.0
		 */
		public function register_rest_fields() {
			// API endpoint for getting all the terms/taxonomies.
			register_rest_route( 'lumen/v3', '/terms', array(
				'methods' => 'GET',
				'callback' => array( 'Lumen_Posts_Block', 'get_terms' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			) );
			register_rest_route( 'lumen/v3', '/get_posts', array(
				'methods' => 'GET',
				'callback' => array( $this, 'get_posts' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			) );
		}

		/**
		 * Some of the attribute keys are not defined,
		 * especially when those attributes are not modified.
		 * Give them default values.
		 *
		 * @param array $attributes
		 * @return array $attributes with default values
		 */
		public static function generate_defaults( $attributes ) {
			/**
			 * List of default attribute values.
			 * Ideally, we only need attributes
			 * related to post render function
			 * since block styles are already
			 * handled by the JS save function.
			 */
			$default_attributes = array(
				'type' => 'post',
				'numberOfItems' => 6,
				'orderBy' => 'date',
				'order' => 'desc',
				'taxonomyType' => 'category',
				'taxonomy' => '',
				'taxonomyFilterType' => '__in',
				'postOffset' => 0,
				'postExclude' => '',
				'postInclude' => '',
				'imageSize' => 'full',
				'excerptLength' => 55,
				'excerptStripHtml' => true,
				'readmoreText' => __( 'Continue Reading', 'lumen-blocks' ),
				'metaSeparator' => 'dot',
				'categoryHighlighted' => false,
				'excludeCurrentPost' => false,
			);

			// Make sure we have the default values.
			foreach ( $default_attributes as $name => $default_value ) {
				$attributes[ $name ] = isset( $attributes[ $name ] ) && $attributes[ $name ] !== '' ? $attributes[ $name ] : $default_value;
			}

			return $attributes;
		}

		/**
		 * Modify the register_options of the
		 * posts block.
		 *
		 * @param array $register_options
		 * @param string $name
		 * @param array $metadata
		 *
		 * @return array new register options.
		 */
		public function register_block_type( $register_options, $name, $metadata ) {
			if ( $name !== 'lumen/posts' ) {
				return $register_options;
			}

			$register_options[ 'render_callback' ] = array( $this, 'render_callback' );

			return $register_options;
		}

		/**
		 * The dynamic render method of the posts block.
		 *
		 * @param array $attributes
		 * @param string $content
		 * @param array $block
		 *
		 * @param string new content.
		 */
		public function render_callback( $attributes, $content, $block = null ) {
			// We have the odd "–" string here because we have incorrectly used this in previous versions.
			// Sometimes the "<" & ">" characters get converted into "&lt;" & "&gt;"
			preg_match( '/(\&lt;|<)[!–\-\s\/]+lmn-start:posts\/template[^>;]+(\&gt;|>)(.*?)(\&lt;|<)[!–\-\s\/]+lmn-end:post\/template[^>;]+(\&gt;|>)/', $content, $match );
			if ( ! isset( $match[3] ) ) {
				return $content;
			}
			$matched = $match[0];
			$single_post_template = $match[3];
			$query_string = '';

			$attributes = $this->generate_defaults( $attributes );
			foreach ( $block->inner_blocks as $inner_block ) {
				if ( $inner_block->name === 'lumen/pagination' ) {
					$query_string = isset( $inner_block->attributes['queryString'] ) ? $inner_block->attributes['queryString'] : '';
					break;
				}
			}
			$content = $this->render_post_items( $matched, $single_post_template, $content, $attributes, $query_string );
			$content = apply_filters( 'lumen.posts.output',
				$content,
				$attributes,
				$block,
				$single_post_template
			);
			return $content;
		}

		/**
		 * Render the post items
		 */
		public function render_post_items( $to_replace, $template, $content, $attributes, $query_string ) {
			$post_query = lumen_generate_post_query_from_posts_block( $attributes, $query_string );
			$recent_posts = wp_get_recent_posts( $post_query );

			// Manually slice the array based on the number of posts per page.
			if ( is_array( $recent_posts ) && count( $recent_posts ) > (int) $post_query['numberposts'] ) {
				$recent_posts = array_slice( $recent_posts, 0, (int) $post_query['numberposts'] );
			}

			$posts = array();
			foreach ( $recent_posts as $post ) {
				$posts[] = lumen_generate_render_item_from_posts_block( $post, $attributes, $template );
			}

			$new_content = str_replace( $to_replace, implode( '', $posts ), $content );
			return $new_content;
		}

		/**
		 * Get the featured image URLs by attachment ID.
		 *
		 * @param string $attachment_id
		 *
		 * @return array featured image URLs
		 */
		public static function get_featured_image_urls_from_attachment_id( $attachment_id ) {
			$image = wp_get_attachment_image_src( $attachment_id, 'full', false );
			$sizes = get_intermediate_image_sizes();

			$image_sizes = array( 'full' => is_array( $image ) ? $image : '' );
			foreach ( $sizes as $size ) {
				$image_sizes[ $size ] = is_array( $image ) ? wp_get_attachment_image_src( $attachment_id, $size, false ) : '';
			}

			return $image_sizes;
		}

		/**
		 * Get the post excerpt by post ID
		 *
		 * @param string $post_id
		 * @param array $post
		 * @param int $max_excerpt Defaults to 55 (WordPress default)
		 *
		 * @return string the excerpt.
		 */
		public static function get_excerpt_by_post_id( $post_id, $post = null, $max_excerpt = 55 ) {
			// Remove jetpack sharing button.
			add_filter( 'sharing_show', '__return_false' );
			$excerpt = get_post_field( 'post_excerpt', $post_id, 'display' );
			// We need to check before running the filters since some plugins override it.
			if ( ! empty( $excerpt ) ) {
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core filter, applied on purpose so themes and plugins format the post text as they do in the loop.
				$excerpt = apply_filters( 'the_excerpt', $excerpt );
			}

			if ( empty( $excerpt ) ) {
				// If there's post content given to us, trim it and use that.
				if ( ! empty( $post['post_content'] ) ) {
					// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core filter, applied on purpose so themes and plugins format the post text as they do in the loop.
					$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post['post_content'], $max_excerpt ) );
				} else {
					// If there's no post content given to us, then get the content.
					$post_content = get_post_field( 'post_content', $post_id );
					if ( ! empty( $post_content ) ) {
						// Remove the jetpack sharing button filter.
						// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core filter, applied on purpose so themes and plugins format the post text as they do in the loop.
						$post_content = apply_filters( 'the_content', $post_content );
						// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core filter, applied on purpose so themes and plugins format the post text as they do in the loop.
						$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post_content, $max_excerpt ) );
					}
				}
			}
			// Remove the jetpack sharing button filter.
			remove_filter( 'sharing_show', '__return_false' );

			// Trim the excerpt if it's too long.
			if ( ! empty( $excerpt ) ) {
				$exploded_excerpt = explode( ' ', $excerpt );
				$trim_to_length = (int) $max_excerpt;
				if ( count( $exploded_excerpt ) > $trim_to_length ) {
					$excerpt = wp_trim_words( $excerpt, $trim_to_length, '' );
					// If last word does not contain '…' or '...', add it
					if ( substr( $excerpt, -1 ) !== '…' && substr( $excerpt, -3 ) !== '...' && substr( $excerpt, -3 ) !== '…' ) {
						$excerpt .= '...';
					}
				}
			}

			return empty( $excerpt ) ? "" : $excerpt;
		}

		/**
		 * Get the taxonomy term list by post id
		 *
		 * @param string $post_id
		 * @param string $taxonomy
		 *
		 * @return string the taxonomy term list
		 */
		public static function get_taxonomy_term_list_by_id( $post_id, $taxonomy ) {
			if ( $taxonomy === 'category' ) {
				return get_the_category_list( esc_html__( ', ', 'lumen-blocks' ), '', $post_id );
			}

			$terms = get_the_terms( $post_id, $taxonomy );
			
			if ( is_wp_error( $terms ) || empty( $terms ) ) {
				return '';
			}
			
			$separator = esc_html__( ', ', 'lumen-blocks' );
			$term_links = array();
			
			foreach ( $terms as $term ) {
				$term_link = get_term_link( $term, $taxonomy );
				if ( ! is_wp_error( $term_link ) ) {
					$term_links[] = '<a href="' . esc_url( $term_link ) . '">' . esc_html( $term->name ) . '</a>';
				}
			}
			
			return implode( $separator, $term_links );
		}

		/**
		 * Get the author info
		 *
		 * @param array post object
		 *
		 * @return author info.
		 */
		public static function get_author_info( $object ) {
			if ( ! isset( $object['post_author'] ) ) {
				return array(
					'name' => '',
					'url' => ''
				);
			}

			return array(
				'name' => get_the_author_meta( 'display_name', $object['post_author'] ),
				'url' => get_author_posts_url( $object['post_author'] )
			);
		}

		/**
		 * Get the post's comments number
		 *
		 * @param array post object
		 *
		 * @return comments number.
		 */
		public static function get_comments_number( $object ) {
			$num = 0;
			if ( isset( $object['comment_count'] ) ) {
				$num = $object['comment_count'];
			}
			/* translators: %d: number of comments on the post */
			return sprintf( _n( '%d comment', '%d comments', $num, 'lumen-blocks' ), $num );
		}

		/**
		 * REST Callback. Get all the terms registered for all post types.
		 *
		 * @return array
		 */
		public static function get_terms() {
			$args = array(
				'public' => true,
			);
			$taxonomies = get_taxonomies( $args, 'objects' );

			$return = array();

			$post_types = get_post_types( array( 'public' => true ), 'objects' );
			foreach ( $post_types as $post_type => $data ) {
				// Don't include attachments.
				if ( $post_type === 'attachment' ) {
					continue;
				}
				$return[ $post_type ] = array(
					'label' => $data->label,
					'taxonomies' => array(),
				);
			}

			foreach ( $taxonomies as $taxonomy_slug => $taxonomy ) {
				foreach ( $taxonomy->object_type as $post_type ) {

					// Don't include post formats.
					if ( $post_type === 'post' && $taxonomy_slug === 'post_format' ) {
						continue;
					}

					$return[ $post_type ]['taxonomies'][ $taxonomy_slug ] = array(
						'label' => $taxonomy->label,
						'terms' => get_terms( $taxonomy->name ),
					);
				}
			}

			return new WP_REST_Response( $return, 200 );
		}

		/**
		 * Response handler for getting the queried posts
		 *
		 * @param WP_Request $request
		 * @return string the API response
		 */
		public function get_posts( $request ) {
			$args = $request->get_query_params();

			// Enforce safe defaults to avoid exposing sensitive content.
			// 1) Force post status to publish only (non-sensitive).
			$args['post_status'] = 'publish';
			// 2) Exclude password-protected content explicitly.
			$args['has_password'] = false;

			$query = new WP_Query( $args );

			foreach ( $query->posts as $key=>$post ) {
				$post_array = $post->to_array();

				if ( isset($args['max_excerpt'] ) && is_int( $args['max_excerpt'] ) ) {
					$query->posts[$key]->post_excerpt_lumen = $this->get_excerpt_by_post_id( $post->ID, $post_array, $args['max_excerpt'] );
				} else {
					$query->posts[$key]->post_excerpt_lumen = $this->get_excerpt_by_post_id( $post->ID, $post_array );
				}

				$query->posts[$key]->comments_num = $this->get_comments_number( $post_array );
				$query->posts[$key]->author_info = $this->get_author_info( $post_array );
				
				// If taxonomy_type_to_display is set, get terms from that taxonomy instead of category.
				$taxonomy_type = isset( $args['taxonomy_type_to_display'] ) ? $args['taxonomy_type_to_display'] : 'category';
				$query->posts[$key]->category_list = $this->get_taxonomy_term_list_by_id( $post->ID, $taxonomy_type );

				$query->posts[$key]->featured_image_urls = $this->get_featured_image_urls_from_attachment_id( get_post_thumbnail_id($post->ID) );
			}

			return new WP_REST_Response( $query->posts, 200 );
		}
	}

	new Lumen_Posts_Block();
}
