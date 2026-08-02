<?php
// This is a generated file by gulp generate-lmn-block-typesphp

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'lumen_get_blocks_array') ) {
	function lumen_get_blocks_array( $blocks = array() ) {
		$lmn_blocks = array(
			'lumen/accordion' => [
				'api_version' => '3',
				'name' => 'lumen/accordion',
				'title' => __( 'Accordion', 'lumen-blocks' ),
				'description' => __( 'A title that your visitors can toggle to view more text.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Toggle', 'lumen-blocks' ),
					__( 'Faq', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/icon-label',
					'lumen/heading',
					'lumen/icon'
				],
				'lmn-substitution-blocks' => [
					'lumen/text'
				]
			],
			'lumen/blockquote' => [
				'api_version' => '3',
				'name' => 'lumen/blockquote',
				'title' => __( 'Blockquote', 'lumen-blocks' ),
				'description' => __( 'Display a quote in style', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-required-blocks' => [
					'lumen/icon'
				],
				'lmn-substitution-blocks' => [
					'lumen/text'
				]
			],
			'lumen/button' => [
				'api_version' => '3',
				'name' => 'lumen/button',
				'title' => __( 'Button', 'lumen-blocks' ),
				'description' => __( 'Add a customizable button.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'parent' => [
					'lumen/button-group'
				],
				'keywords' => [
					__( 'Link', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden',
				'lmn-block-dependency' => 'lumen/button-group|button'
			],
			'lumen/button-group' => [
				'api_version' => '3',
				'name' => 'lumen/button-group',
				'title' => __( 'Button Group', 'lumen-blocks' ),
				'description' => __( 'Add a customizable button.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Link', 'lumen-blocks' )
				],
				'lmn-variants' => [
					[
						'name' => 'icon-button',
						'title' => __( 'Icon Button', 'lumen-blocks' ),
						'description' => __( 'Add a customizable button.', 'lumen-blocks' ),
						'category' => 'lumen',
						'lmn-type' => 'essential'
					],
					[
						'name' => 'button',
						'title' => __( 'Button', 'lumen-blocks' ),
						'description' => __( 'Add a customizable button.', 'lumen-blocks' ),
						'category' => 'lumen',
						'lmn-type' => 'essential'
					],
					[
						'name' => 'social-buttons',
						'title' => __( 'Social Buttons', 'lumen-blocks' ),
						'description' => __( 'Add social buttons.', 'lumen-blocks' ),
						'category' => 'lumen',
						'lmn-type' => 'special',
						'lmn-required-blocks' => [
							'lumen/button-group|icon-button'
						]
					]
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden'
			],
			'lumen/call-to-action' => [
				'api_version' => '3',
				'name' => 'lumen/call-to-action',
				'title' => __( 'Call to Action', 'lumen-blocks' ),
				'description' => __( 'A small section you can use to call the attention of your visitors. Great for calling attention to your products or deals.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'CTA', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/card' => [
				'api_version' => '3',
				'name' => 'lumen/card',
				'title' => __( 'Card', 'lumen-blocks' ),
				'description' => __( 'Describe a single subject in a small card. You can use this to describe your product, service or a person.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text',
					'lumen/subtitle',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/carousel' => [
				'api_version' => '3',
				'name' => 'lumen/carousel',
				'title' => __( 'Carousel', 'lumen-blocks' ),
				'description' => __( 'A carousel slider.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Slider', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/column' => [
				'api_version' => '3',
				'name' => 'lumen/column',
				'title' => __( 'Inner Column', 'lumen-blocks' ),
				'description' => __( 'A single column with advanced layout options.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation',
					'lumen/columnWrapDesktop'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'Section rows', 'lumen-blocks' )
				],
				'parent' => [
					'lumen/columns',
					'lumen/carousel',
					'lumen/feature',
					'lumen/feature-grid',
					'lumen/horizontal-scroller',
					'lumen/tab-content'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden',
				'lmn-available-states' => [
					'enabled',
					'hidden'
				]
			],
			'lumen/columns' => [
				'api_version' => '3',
				'name' => 'lumen/columns',
				'title' => __( 'Columns', 'lumen-blocks' ),
				'description' => __( 'Multiple columns with advanced layout options.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId'
				],
				'keywords' => [
					__( 'Section rows', 'lumen-blocks' ),
					__( 'Container', 'lumen-blocks' )
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'columnJustify',
					'lumen/columnWrapDesktop' => 'columnWrapDesktop'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential',
				'lmn-available-states' => [
					'enabled',
					'hidden'
				]
			],
			'lumen/container' => [
				'api_version' => '3',
				'name' => 'lumen/container',
				'title' => __( 'Container', 'lumen-blocks' ),
				'description' => __( 'A styled container that you can add other blocks inside. Use this to group content and give it a background, padding or borders.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'Group', 'lumen-blocks' ),
					__( 'Wrapper', 'lumen-blocks' ),
					__( 'Div', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/count-up' => [
				'api_version' => '3',
				'name' => 'lumen/count-up',
				'title' => __( 'Count Up', 'lumen-blocks' ),
				'description' => __( 'Showcase your stats. Display how many customers you have or the number of downloads of your app.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Number', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/countdown' => [
				'api_version' => '3',
				'name' => 'lumen/countdown',
				'title' => __( 'Countdown', 'lumen-blocks' ),
				'description' => __( 'Display a countdown timer on your website.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Timer', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/design-library' => [
				'api_version' => '3',
				'name' => 'lumen/design-library',
				'title' => __( 'Design Library', 'lumen-blocks' ),
				'description' => __( 'Choose a layout or block from the Lumen Design Library.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Template', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-available-states' => [
					'enabled',
					'hidden'
				]
			],
			'lumen/divider' => [
				'api_version' => '3',
				'name' => 'lumen/divider',
				'title' => __( 'Divider', 'lumen-blocks' ),
				'description' => __( 'Add a pause between your content.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Horizontal Rule', 'lumen-blocks' ),
					__( 'HR', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/expand' => [
				'api_version' => '3',
				'name' => 'lumen/expand',
				'title' => __( 'Expand / Show More', 'lumen-blocks' ),
				'description' => __( 'Display a small snippet of text. Your readers can toggle it to show more information.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Hide', 'lumen-blocks' ),
					__( 'Less', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/text',
					'lumen/button-group|button'
				]
			],
			'lumen/feature' => [
				'api_version' => '3',
				'name' => 'lumen/feature',
				'title' => __( 'Feature', 'lumen-blocks' ),
				'description' => __( 'Display a product feature or a service in a large area.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/columnWrapDesktop' => 'columnWrapDesktop'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-required-blocks' => [
					'lumen/image'
				],
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/feature-grid' => [
				'api_version' => '3',
				'name' => 'lumen/feature-grid',
				'title' => __( 'Feature Grid', 'lumen-blocks' ),
				'description' => __( 'Display multiple product features or services. You can use Feature Grids one after another.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/columnWrapDesktop' => 'columnWrapDesktop'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-substitution-blocks' => [
					'lumen/image',
					'lumen/heading',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/heading' => [
				'api_version' => '3',
				'name' => 'lumen/heading',
				'title' => __( 'Heading', 'lumen-blocks' ),
				'description' => __( 'Introduce new sections of your content in style.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Title', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/hero' => [
				'api_version' => '3',
				'name' => 'lumen/hero',
				'title' => __( 'Hero', 'lumen-blocks' ),
				'description' => __( 'A large hero area. Typically used at the very top of a page.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'Header', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/horizontal-scroller' => [
				'api_version' => '3',
				'name' => 'lumen/horizontal-scroller',
				'title' => __( 'Horizontal Scroller', 'lumen-blocks' ),
				'description' => __( 'A slider that scrolls horizontally.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Slider', 'lumen-blocks' ),
					__( 'Carousel', 'lumen-blocks' )
				],
				'provides_context' => [
					'lumen/columnFit' => 'columnFit'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/icon' => [
				'api_version' => '3',
				'name' => 'lumen/icon',
				'title' => __( 'Icon', 'lumen-blocks' ),
				'description' => __( 'Pick an icon or upload your own SVG icon to decorate your content.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'SVG', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/icon-box' => [
				'api_version' => '3',
				'name' => 'lumen/icon-box',
				'title' => __( 'Icon Box', 'lumen-blocks' ),
				'description' => __( 'A small text area with an icon that can be used to summarize features or services', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-required-blocks' => [
					'lumen/icon-label',
					'lumen/icon',
					'lumen/heading'
				]
			],
			'lumen/icon-button' => [
				'api_version' => '3',
				'name' => 'lumen/icon-button',
				'title' => __( 'Icon Button', 'lumen-blocks' ),
				'description' => __( 'Add a customizable button.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'parent' => [
					'lumen/button-group'
				],
				'keywords' => [
					__( 'Link', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden',
				'lmn-block-dependency' => 'lumen/button-group|icon-button'
			],
			'lumen/icon-label' => [
				'api_version' => '3',
				'name' => 'lumen/icon-label',
				'title' => __( 'Icon Label', 'lumen-blocks' ),
				'description' => __( 'An Icon and Heading paired together.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'SVG', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/icon',
					'lumen/heading'
				]
			],
			'lumen/icon-list' => [
				'api_version' => '3',
				'name' => 'lumen/icon-list',
				'title' => __( 'Icon List', 'lumen-blocks' ),
				'description' => __( 'An unordered list with icons. You can use this as a list of features or benefits.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Checklist', 'lumen-blocks' ),
					__( 'Bullets', 'lumen-blocks' ),
					__( 'Number list', 'lumen-blocks' )
				],
				'provides_context' => [
					'lumen/ordered' => 'ordered',
					'lumen/uniqueId' => 'uniqueId'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/icon-list-item' => [
				'api_version' => '3',
				'name' => 'lumen/icon-list-item',
				'title' => __( 'Icon List Item', 'lumen-blocks' ),
				'description' => __( 'A single list entry in the Icon List block', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation',
					'lumen/ordered',
					'lumen/uniqueId'
				],
				'keywords' => [

				],
				'parent' => [
					'lumen/icon-list'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden'
			],
			'lumen/image' => [
				'api_version' => '3',
				'name' => 'lumen/image',
				'title' => __( 'Image', 'lumen-blocks' ),
				'description' => __( 'An image with advanced controls to make a visual statement.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/image-box' => [
				'api_version' => '3',
				'name' => 'lumen/image-box',
				'title' => __( 'Image Box', 'lumen-blocks' ),
				'description' => __( 'Display an image that shows more information when hovered on. Can be used as a fancy link to other pages.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/image',
					'lumen/subtitle',
					'lumen/icon'
				],
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text'
				]
			],
			'lumen/map' => [
				'api_version' => '3',
				'name' => 'lumen/map',
				'title' => __( 'Map', 'lumen-blocks' ),
				'description' => __( 'Embedded Google Map with advanced controls.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'keywords' => [
					__( 'location', 'lumen-blocks' ),
					__( 'address', 'lumen-blocks' )
				],
				'lmn-type' => 'special'
			],
			'lumen/notification' => [
				'api_version' => '3',
				'name' => 'lumen/notification',
				'title' => __( 'Notification', 'lumen-blocks' ),
				'description' => __( 'Show a notice to your readers. People can dismiss the notice to permanently hide it.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'Notice', 'lumen-blocks' ),
					__( 'Alert', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/icon'
				],
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/number-box' => [
				'api_version' => '3',
				'name' => 'lumen/number-box',
				'title' => __( 'Number Box', 'lumen-blocks' ),
				'description' => __( 'Display steps or methods that your users will do in your service.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Steps', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/posts' => [
				'api_version' => '3',
				'name' => 'lumen/posts',
				'title' => __( 'Posts', 'lumen-blocks' ),
				'description' => __( 'Your latest blog posts. Use this to showcase a few of your posts in your landing pages.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Blog Posts', 'lumen-blocks' ),
					__( 'Lastest Posts', 'lumen-blocks' ),
					__( 'Query Loop', 'lumen-blocks' )
				],
				'provides_context' => [
					'type' => 'type',
					'orderBy' => 'orderBy',
					'order' => 'order',
					'taxonomyType' => 'taxonomyType',
					'taxonomy' => 'taxonomy',
					'taxonomyFilterType' => 'taxonomyFilterType',
					'postOffset' => 'postOffset',
					'postExclude' => 'postExclude',
					'postInclude' => 'postInclude',
					'numberOfItems' => 'numberOfItems',
					'lmnQueryId' => 'lmnQueryId'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/price' => [
				'api_version' => '3',
				'name' => 'lumen/price',
				'title' => __( 'Price', 'lumen-blocks' ),
				'description' => __( 'Show a price of a product or service with currency and a suffix styled with different weights', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Currency', 'lumen-blocks' ),
					__( 'Pricing', 'lumen-blocks' ),
					__( 'Number', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/text'
				]
			],
			'lumen/pricing-box' => [
				'api_version' => '3',
				'name' => 'lumen/pricing-box',
				'title' => __( 'Pricing Box', 'lumen-blocks' ),
				'description' => __( 'Display the different pricing tiers of your business.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'keywords' => [
					__( 'Currency', 'lumen-blocks' ),
					__( 'Price', 'lumen-blocks' ),
					__( 'Pricing Table', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-required-blocks' => [
					'lumen/price',
					'lumen/text',
					'lumen/icon-list'
				],
				'lmn-substitution-blocks' => [
					'lumen/heading',
					'lumen/subtitle',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/progress-bar' => [
				'api_version' => '3',
				'name' => 'lumen/progress-bar',
				'title' => __( 'Progress Bar', 'lumen-blocks' ),
				'description' => __( 'Visualize a progress value or percentage in a bar.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'percentage status', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/progress-circle' => [
				'api_version' => '3',
				'name' => 'lumen/progress-circle',
				'title' => __( 'Progress Circle', 'lumen-blocks' ),
				'description' => __( 'Visualize a progress value or percentage in a circle.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'percentage status', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/separator' => [
				'api_version' => '3',
				'name' => 'lumen/separator',
				'title' => __( 'Separator', 'lumen-blocks' ),
				'description' => __( 'A fancy separator to be placed between content.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Svg Divider', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/spacer' => [
				'api_version' => '3',
				'name' => 'lumen/spacer',
				'title' => __( 'Spacer', 'lumen-blocks' ),
				'description' => __( 'Sometimes you just need some space.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/subtitle' => [
				'api_version' => '3',
				'name' => 'lumen/subtitle',
				'title' => __( 'Subtitle', 'lumen-blocks' ),
				'description' => __( 'Subtitle text that you can add custom styling to from the global settings.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/tab-content' => [
				'api_version' => '3',
				'name' => 'lumen/tab-content',
				'title' => __( 'Tab Content', 'lumen-blocks' ),
				'description' => __( 'A wrapper for tab panels.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation',
					'lumen/tabPanelEffect',
					'lumen/equalTabHeight'
				],
				'keywords' => [

				],
				'parent' => [
					'lumen/tabs'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden'
			],
			'lumen/tab-labels' => [
				'api_version' => '3',
				'name' => 'lumen/tab-labels',
				'title' => __( 'Tab Labels', 'lumen-blocks' ),
				'description' => __( 'Create interactive navigation within tabs.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation',
					'lumen/initialTabOpen',
					'lumen/tabOrientation'
				],
				'keywords' => [

				],
				'parent' => [
					'lumen/tabs'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden'
			],
			'lumen/table-of-contents' => [
				'api_version' => '3',
				'name' => 'lumen/table-of-contents',
				'title' => __( 'Table of Contents', 'lumen-blocks' ),
				'description' => __( 'Automatically generated table of contents based on Heading blocks.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'ToC', 'lumen-blocks' ),
					__( 'Index', 'lumen-blocks' ),
					__( 'Outline', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/tabs' => [
				'api_version' => '3',
				'name' => 'lumen/tabs',
				'title' => __( 'Tabs', 'lumen-blocks' ),
				'description' => __( 'Organize and display content in multiple tabs.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'toggle', 'lumen-blocks' )
				],
				'provides_context' => [
					'lumen/initialTabOpen' => 'initialTabOpen',
					'lumen/tabOrientation' => 'tabOrientation',
					'lumen/tabPanelEffect' => 'tabPanelEffect',
					'lumen/equalTabHeight' => 'equalTabHeight'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/team-member' => [
				'api_version' => '3',
				'name' => 'lumen/team-member',
				'title' => __( 'Team Member', 'lumen-blocks' ),
				'description' => __( 'Display members of your team or your office. Use multiple Team Member blocks if you have a large team.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-substitution-blocks' => [
					'lumen/image',
					'lumen/heading',
					'lumen/subtitle',
					'lumen/text',
					'lumen/button-group',
					'lumen/button'
				]
			],
			'lumen/testimonial' => [
				'api_version' => '3',
				'name' => 'lumen/testimonial',
				'title' => __( 'Testimonial', 'lumen-blocks' ),
				'description' => __( 'Showcase what your users say about your product or service.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'provides_context' => [
					'lumen/innerBlockOrientation' => 'innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'section',
				'lmn-required-blocks' => [
					'lumen/image-box'
				],
				'lmn-substitution-blocks' => [
					'lumen/image',
					'lumen/heading',
					'lumen/subtitle',
					'lumen/text'
				]
			],
			'lumen/text' => [
				'api_version' => '3',
				'name' => 'lumen/text',
				'title' => __( 'Text', 'lumen-blocks' ),
				'description' => __( 'Start with the building block of all page layouts.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Paragraph', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/timeline' => [
				'api_version' => '3',
				'name' => 'lumen/timeline',
				'title' => __( 'Timeline', 'lumen-blocks' ),
				'description' => __( 'Show events in chronological order', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'history', 'lumen-blocks' ),
					__( 'milestone', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/video-popup' => [
				'api_version' => '3',
				'name' => 'lumen/video-popup',
				'title' => __( 'Video Popup', 'lumen-blocks' ),
				'description' => __( 'Display a large thumbnail that your users can click to play a video full-screen. Great for introductory or tutorial videos.', 'lumen-blocks' ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'YouTube', 'lumen-blocks' ),
					__( 'Vimeo', 'lumen-blocks' ),
					__( 'Embed Mp4', 'lumen-blocks' )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special',
				'lmn-required-blocks' => [
					'lumen/icon',
					'lumen/image'
				]
			]
		);

		return array_merge( $blocks, $lmn_blocks );
	}

	add_filter( 'lumen.blocks', 'lumen_get_blocks_array' );
}
?>