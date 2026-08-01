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
				'title' => __( 'Accordion', LUMEN_I18N ),
				'description' => __( 'A title that your visitors can toggle to view more text.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Toggle', LUMEN_I18N ),
					__( 'Faq', LUMEN_I18N )
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
				'title' => __( 'Blockquote', LUMEN_I18N ),
				'description' => __( 'Display a quote in style', LUMEN_I18N ),
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
				'title' => __( 'Button', LUMEN_I18N ),
				'description' => __( 'Add a customizable button.', LUMEN_I18N ),
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
					__( 'Link', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden',
				'lmn-block-dependency' => 'lumen/button-group|button'
			],
			'lumen/button-group' => [
				'api_version' => '3',
				'name' => 'lumen/button-group',
				'title' => __( 'Button Group', LUMEN_I18N ),
				'description' => __( 'Add a customizable button.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Link', LUMEN_I18N )
				],
				'lmn-variants' => [
					[
						'name' => 'icon-button',
						'title' => __( 'Icon Button', LUMEN_I18N ),
						'description' => __( 'Add a customizable button.', LUMEN_I18N ),
						'category' => 'lumen',
						'lmn-type' => 'essential'
					],
					[
						'name' => 'button',
						'title' => __( 'Button', LUMEN_I18N ),
						'description' => __( 'Add a customizable button.', LUMEN_I18N ),
						'category' => 'lumen',
						'lmn-type' => 'essential'
					],
					[
						'name' => 'social-buttons',
						'title' => __( 'Social Buttons', LUMEN_I18N ),
						'description' => __( 'Add social buttons.', LUMEN_I18N ),
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
				'title' => __( 'Call to Action', LUMEN_I18N ),
				'description' => __( 'A small section you can use to call the attention of your visitors. Great for calling attention to your products or deals.', LUMEN_I18N ),
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
					__( 'CTA', LUMEN_I18N )
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
				'title' => __( 'Card', LUMEN_I18N ),
				'description' => __( 'Describe a single subject in a small card. You can use this to describe your product, service or a person.', LUMEN_I18N ),
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
				'title' => __( 'Carousel', LUMEN_I18N ),
				'description' => __( 'A carousel slider.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Slider', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/column' => [
				'api_version' => '3',
				'name' => 'lumen/column',
				'title' => __( 'Inner Column', LUMEN_I18N ),
				'description' => __( 'A single column with advanced layout options.', LUMEN_I18N ),
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
					__( 'Section rows', LUMEN_I18N )
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
				'title' => __( 'Columns', LUMEN_I18N ),
				'description' => __( 'Multiple columns with advanced layout options.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId'
				],
				'keywords' => [
					__( 'Section rows', LUMEN_I18N ),
					__( 'Container', LUMEN_I18N )
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
			'lumen/count-up' => [
				'api_version' => '3',
				'name' => 'lumen/count-up',
				'title' => __( 'Count Up', LUMEN_I18N ),
				'description' => __( 'Showcase your stats. Display how many customers you have or the number of downloads of your app.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Number', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/countdown' => [
				'api_version' => '3',
				'name' => 'lumen/countdown',
				'title' => __( 'Countdown', LUMEN_I18N ),
				'description' => __( 'Display a countdown timer on your website.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Timer', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/design-library' => [
				'api_version' => '3',
				'name' => 'lumen/design-library',
				'title' => __( 'Design Library', LUMEN_I18N ),
				'description' => __( 'Choose a layout or block from the Lumen Design Library.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Template', LUMEN_I18N )
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
				'title' => __( 'Divider', LUMEN_I18N ),
				'description' => __( 'Add a pause between your content.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Horizontal Rule', LUMEN_I18N ),
					__( 'HR', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/expand' => [
				'api_version' => '3',
				'name' => 'lumen/expand',
				'title' => __( 'Expand / Show More', LUMEN_I18N ),
				'description' => __( 'Display a small snippet of text. Your readers can toggle it to show more information.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Hide', LUMEN_I18N ),
					__( 'Less', LUMEN_I18N )
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
				'title' => __( 'Feature', LUMEN_I18N ),
				'description' => __( 'Display a product feature or a service in a large area.', LUMEN_I18N ),
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
				'title' => __( 'Feature Grid', LUMEN_I18N ),
				'description' => __( 'Display multiple product features or services. You can use Feature Grids one after another.', LUMEN_I18N ),
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
				'title' => __( 'Heading', LUMEN_I18N ),
				'description' => __( 'Introduce new sections of your content in style.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Title', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/hero' => [
				'api_version' => '3',
				'name' => 'lumen/hero',
				'title' => __( 'Hero', LUMEN_I18N ),
				'description' => __( 'A large hero area. Typically used at the very top of a page.', LUMEN_I18N ),
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
					__( 'Header', LUMEN_I18N )
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
				'title' => __( 'Horizontal Scroller', LUMEN_I18N ),
				'description' => __( 'A slider that scrolls horizontally.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Slider', LUMEN_I18N ),
					__( 'Carousel', LUMEN_I18N )
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
				'title' => __( 'Icon', LUMEN_I18N ),
				'description' => __( 'Pick an icon or upload your own SVG icon to decorate your content.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'SVG', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/icon-box' => [
				'api_version' => '3',
				'name' => 'lumen/icon-box',
				'title' => __( 'Icon Box', LUMEN_I18N ),
				'description' => __( 'A small text area with an icon that can be used to summarize features or services', LUMEN_I18N ),
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
				'title' => __( 'Icon Button', LUMEN_I18N ),
				'description' => __( 'Add a customizable button.', LUMEN_I18N ),
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
					__( 'Link', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'hidden',
				'lmn-block-dependency' => 'lumen/button-group|icon-button'
			],
			'lumen/icon-label' => [
				'api_version' => '3',
				'name' => 'lumen/icon-label',
				'title' => __( 'Icon Label', LUMEN_I18N ),
				'description' => __( 'An Icon and Heading paired together.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'SVG', LUMEN_I18N )
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
				'title' => __( 'Icon List', LUMEN_I18N ),
				'description' => __( 'An unordered list with icons. You can use this as a list of features or benefits.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Checklist', LUMEN_I18N ),
					__( 'Bullets', LUMEN_I18N ),
					__( 'Number list', LUMEN_I18N )
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
				'title' => __( 'Icon List Item', LUMEN_I18N ),
				'description' => __( 'A single list entry in the Icon List block', LUMEN_I18N ),
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
				'title' => __( 'Image', LUMEN_I18N ),
				'description' => __( 'An image with advanced controls to make a visual statement.', LUMEN_I18N ),
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
				'title' => __( 'Image Box', LUMEN_I18N ),
				'description' => __( 'Display an image that shows more information when hovered on. Can be used as a fancy link to other pages.', LUMEN_I18N ),
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
				'title' => __( 'Map', LUMEN_I18N ),
				'description' => __( 'Embedded Google Map with advanced controls.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'textdomain' => 'lumen-blocks',
				'keywords' => [
					__( 'location', LUMEN_I18N ),
					__( 'address', LUMEN_I18N )
				],
				'lmn-type' => 'special'
			],
			'lumen/notification' => [
				'api_version' => '3',
				'name' => 'lumen/notification',
				'title' => __( 'Notification', LUMEN_I18N ),
				'description' => __( 'Show a notice to your readers. People can dismiss the notice to permanently hide it.', LUMEN_I18N ),
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
					__( 'Notice', LUMEN_I18N ),
					__( 'Alert', LUMEN_I18N )
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
				'title' => __( 'Number Box', LUMEN_I18N ),
				'description' => __( 'Display steps or methods that your users will do in your service.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Steps', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/posts' => [
				'api_version' => '3',
				'name' => 'lumen/posts',
				'title' => __( 'Posts', LUMEN_I18N ),
				'description' => __( 'Your latest blog posts. Use this to showcase a few of your posts in your landing pages.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Blog Posts', LUMEN_I18N ),
					__( 'Lastest Posts', LUMEN_I18N ),
					__( 'Query Loop', LUMEN_I18N )
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
				'title' => __( 'Price', LUMEN_I18N ),
				'description' => __( 'Show a price of a product or service with currency and a suffix styled with different weights', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Currency', LUMEN_I18N ),
					__( 'Pricing', LUMEN_I18N ),
					__( 'Number', LUMEN_I18N )
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
				'title' => __( 'Pricing Box', LUMEN_I18N ),
				'description' => __( 'Display the different pricing tiers of your business.', LUMEN_I18N ),
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
					__( 'Currency', LUMEN_I18N ),
					__( 'Price', LUMEN_I18N ),
					__( 'Pricing Table', LUMEN_I18N )
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
				'title' => __( 'Progress Bar', LUMEN_I18N ),
				'description' => __( 'Visualize a progress value or percentage in a bar.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'percentage status', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/progress-circle' => [
				'api_version' => '3',
				'name' => 'lumen/progress-circle',
				'title' => __( 'Progress Circle', LUMEN_I18N ),
				'description' => __( 'Visualize a progress value or percentage in a circle.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'percentage status', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/separator' => [
				'api_version' => '3',
				'name' => 'lumen/separator',
				'title' => __( 'Separator', LUMEN_I18N ),
				'description' => __( 'A fancy separator to be placed between content.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Svg Divider', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/spacer' => [
				'api_version' => '3',
				'name' => 'lumen/spacer',
				'title' => __( 'Spacer', LUMEN_I18N ),
				'description' => __( 'Sometimes you just need some space.', LUMEN_I18N ),
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
				'title' => __( 'Subtitle', LUMEN_I18N ),
				'description' => __( 'Subtitle text that you can add custom styling to from the global settings.', LUMEN_I18N ),
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
				'title' => __( 'Tab Content', LUMEN_I18N ),
				'description' => __( 'A wrapper for tab panels.', LUMEN_I18N ),
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
				'title' => __( 'Tab Labels', LUMEN_I18N ),
				'description' => __( 'Create interactive navigation within tabs.', LUMEN_I18N ),
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
				'title' => __( 'Table of Contents', LUMEN_I18N ),
				'description' => __( 'Automatically generated table of contents based on Heading blocks.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'ToC', LUMEN_I18N ),
					__( 'Index', LUMEN_I18N ),
					__( 'Outline', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/tabs' => [
				'api_version' => '3',
				'name' => 'lumen/tabs',
				'title' => __( 'Tabs', LUMEN_I18N ),
				'description' => __( 'Organize and display content in multiple tabs.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'toggle', LUMEN_I18N )
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
				'title' => __( 'Team Member', LUMEN_I18N ),
				'description' => __( 'Display members of your team or your office. Use multiple Team Member blocks if you have a large team.', LUMEN_I18N ),
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
				'title' => __( 'Testimonial', LUMEN_I18N ),
				'description' => __( 'Showcase what your users say about your product or service.', LUMEN_I18N ),
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
				'title' => __( 'Text', LUMEN_I18N ),
				'description' => __( 'Start with the building block of all page layouts.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'Paragraph', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'essential'
			],
			'lumen/timeline' => [
				'api_version' => '3',
				'name' => 'lumen/timeline',
				'title' => __( 'Timeline', LUMEN_I18N ),
				'description' => __( 'Show events in chronological order', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'history', LUMEN_I18N ),
					__( 'milestone', LUMEN_I18N )
				],
				'textdomain' => 'lumen-blocks',
				'lmn-type' => 'special'
			],
			'lumen/video-popup' => [
				'api_version' => '3',
				'name' => 'lumen/video-popup',
				'title' => __( 'Video Popup', LUMEN_I18N ),
				'description' => __( 'Display a large thumbnail that your users can click to play a video full-screen. Great for introductory or tutorial videos.', LUMEN_I18N ),
				'category' => 'lumen',
				'uses_context' => [
					'postId',
					'postType',
					'queryId',
					'lumen/innerBlockOrientation'
				],
				'keywords' => [
					__( 'YouTube', LUMEN_I18N ),
					__( 'Vimeo', LUMEN_I18N ),
					__( 'Embed Mp4', LUMEN_I18N )
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