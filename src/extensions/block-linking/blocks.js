/**
 * These are the blocks that support block-linking.
 */

import { addFilter } from '@wordpress/hooks'

addFilter( 'lumen.block-linking.blocks', 'lumen', blocks => {
	return {
		...blocks,
		'lumen/button': { filterAttributes: [ 'text', 'linkUrl', 'linkRel', 'linkNewTab', 'icon' ] },
		'lumen/icon-button': { filterAttributes: [ 'linkUrl', 'linkRel', 'linkNewTab', 'icon' ] },
		'lumen/button-group': {},
		'lumen/blockquote': {},
		'lumen/call-to-action': {},
		'lumen/card': { filterAttributes: [ 'imageUrl', 'imageId', 'imageAlt', 'imageTitle' ] },
		'lumen/card-group': {},
		'lumen/column': {},
		'lumen/columns': {},
		'lumen/expand': {},
		'lumen/feature': {},
		'lumen/feature-grid': {},
		'lumen/hero': {},
		'lumen/heading': { filterAttributes: [ 'text' ] },
		'lumen/icon': { filterAttributes: [ 'icon', 'ariaLabel' ] },
		'lumen/icon-box': {},
		'lumen/icon-label': {},
		'lumen/icon-list': { filterAttributes: [ 'text' ] },
		'lumen/image': { filterAttributes: [ 'imageUrl', 'imageId', 'imageAlt' ] },
		'lumen/notification': {},
		'lumen/price': {},
		'lumen/pricing-box': {},
		'lumen/text': { filterAttributes: [ 'text' ] },
		'lumen/subtitle': { filterAttributes: [ 'text' ] },
	}
} )

// These attributes are essential to be not linked across all Lumen blocks.
addFilter( 'lumen.block-linking.blocks', 'lumen-essentials', blocks => {
	Object.keys( blocks ).forEach( blockType => {
		if ( blockType.startsWith( 'lumen/' ) ) {
			if ( ! blocks[ blockType ].filterAttributes ) {
				blocks[ blockType ].filterAttributes = []
			}
			blocks[ blockType ].filterAttributes.push(
				'uniqueId', // This should always be unique
				'templateLock', // Column blocks can be template locked through attributes.
				'columnWidth', 'columnWidthTablet', 'columnWidthMobile', 'isFirstBlock', 'isLastBlock', // Columns
				'blockLinkUrl', // Block link url
			)
		}
	} )
	return blocks
}, 99 )

addFilter( 'lumen.block-linking.blocks', 'core', blocks => {
	return {
		...blocks,
		'core/archives': {},
		'core/audio': { filterAttributes: [ 'src', 'caption', 'id' ] },
		'core/block': { filterAttributes: [ 'ref' ] },
		'core/button': { filterAttributes: [ 'url', 'title', 'text', 'linkTarget', 'rel', 'placeholder' ] },
		'core/buttons': {},
		'core/calendar': {},
		'core/categories': {},
		'core/freeform': { filterAttributes: [ 'content' ] },
		'core/code': { filterAttributes: [ 'content' ] },
		'core/column': {},
		'core/columns': {},
		'core/cover': { filterAttributes: [ 'url', 'id' ] },
		'core/file': { filterAttributes: [ 'id', 'href', 'fileName', 'textLinkHref', 'downloadButtonText' ] },
		'core/gallery': { filterAttributes: [ 'images', 'ids', 'caption' ] },
		'core/group': {},
		'core/heading': { filterAttributes: [ 'content', 'level', 'placeholder' ] },
		'core/html': { filterAttributes: [ 'content' ] },
		'core/image': { filterAttributes: [ 'url', 'capion', 'title', 'href', 'rel', 'id', 'linkDestination', 'linkTarget' ] },
		'core/latest-comments': {},
		'core/latest-posts': { filterAttributes: [ 'categories' ] },
		'core/legacy-widget': { filterAttributes: [ 'id', 'idBase', 'instance' ] },
		'core/list': { filterAttributes: [ 'values' ] },
		'core/media-text': { filterAttributes: [ 'mediaAlt', 'mediaId', 'mediaUrl', 'mediaLink', 'linkDestination', 'linkTarget', 'href', 'rel' ] },
		'core/missing': { filterAttributes: [ 'content' ] },
		'core/navigation': {},
		'core/paragraph': { filterAttributes: [ 'content', 'placeholder' ] },
		'core/post-author': {},
		'core/post-date': {},
		'core/post-excerpt': {},
		'core/preformatted': { filterAttributes: [ 'content' ] },
		'core/pullquote': { filterAttributes: [ 'value', 'citation' ] },
		'core/quote': { filterAttributes: [ 'value', 'citation' ] },
		'core/rss': { filterAttributes: [ 'feedURL' ] },
		'core/search': { filterAttributes: [ 'label', 'placeholder', 'buttonText' ] },
		'core/separator': {},
		'core/site-title': { filterAttributes: [ 'level' ] },
		'core/social-links': {},
		'core/spacer': {},
		'core/subhead': { filterAttributes: [ 'content' ] },
		'core/table': { filterAttributes: [ 'caption', 'head', 'body', 'foot' ] },
		'core/tag-cloud': { filterAttributes: [ 'taxonomy' ] },
		'core/text-columns': { filterAttributes: [ 'content' ] },
		'core/verse': { filterAttributes: [ 'content' ] },
		'core/video': { filterAttributes: [ 'caption', 'id', 'poster', 'src' ] },
	}
} )

addFilter( 'lumen.block-linking.blocks', 'common', blocks => {
	Object.keys( blocks ).forEach( blockType => {
		if ( ! blocks[ blockType ].filterAttributes ) {
			blocks[ blockType ].filterAttributes = []
		}
		if ( ! blocks[ blockType ].filterAttributes.includes( 'id' ) ) {
			blocks[ blockType ].filterAttributes.push( 'id' )
		}
		if ( ! blocks[ blockType ].filterAttributes.includes( 'anchor' ) ) {
			blocks[ blockType ].filterAttributes.push( 'anchor' )
		}
	} )
	return blocks
}, 99 )
