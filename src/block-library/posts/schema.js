/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	Style,
	ConditionalDisplay,
	ContainerDiv,
	CustomAttributes,
	CustomCSS,
	EffectsAnimations,
	Image,
	Responsive,
	Typography,
	addFlexGapAttributes,
	Transform,
	ContentAlign,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION, i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const postsAttributes = {
	// General.
	lmnQueryId: {
		type: 'number',
	},
	columns: {
		type: 'number',
		default: '',
		lmnResponsive: true,
	},
	contentOrder: {
		type: 'array',
		default: '',
	},

	/*
	 * Where the featured image sits inside a post.
	 *
	 * `contentOrder` can only stack the parts of a post one above another, so
	 * until now every layout was a column: there was no way to say "image on
	 * the left, words on the right", which is what a list of posts usually
	 * wants. Empty is the stack that every existing Posts block already has, so
	 * saved posts keep the CSS they were saved with.
	 *
	 * Responsive on purpose — a two-column post that reads well on a desktop is
	 * usually a stack on a phone.
	 */
	itemLayout: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemMediaWidth: {
		type: 'number',
		default: '',
		lmnResponsive: true,
		lmnUnits: '%',
	},
	itemMediaGap: {
		type: 'number',
		default: '',
		lmnResponsive: true,
	},
	itemMediaVerticalAlign: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},

	/*
	 * The grid of posts.
	 *
	 * `columns` on its own divides the row equally. These three give the same
	 * control the Columns block has: a width per column, and the order they are
	 * shown in. The widths apply to the column positions, so they repeat down
	 * every row — a first column of 60% makes every leading post the wide one.
	 *
	 * Nothing set means the flex layout the block has always used, so no saved
	 * post changes.
	 */
	postsColumnWrap: {
		type: 'boolean',
		default: false,
	},
	postsColumnWidths: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	postsColumnArrangement: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	/*
	 * The unit each column's width is written in.
	 *
	 * Kept apart from the widths rather than read back out of them. A column
	 * with no width yet still has a unit the author chose — and inferring it
	 * from an empty string meant picking one did nothing at all, because there
	 * was nowhere for the choice to live until a number was typed.
	 */
	postsColumnUnits: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},

	/*
	 * A grid the author lays out themselves.
	 *
	 * With `itemLayout` set to `custom` a post becomes a grid of this many
	 * columns and each part is given one to sit in — so a title can run across
	 * the top while an image and an excerpt sit side by side underneath. The
	 * two named layouts above are the two arrangements people ask for most;
	 * this is for everything else.
	 */
	itemColumns: {
		type: 'number',
		default: '',
		lmnResponsive: true,
	},
	itemColumnFeaturedImage: {
		type: 'string',
		default: '',
	},
	itemColumnCategory: {
		type: 'string',
		default: '',
	},
	itemColumnTitle: {
		type: 'string',
		default: '',
	},
	itemColumnMeta: {
		type: 'string',
		default: '',
	},
	itemColumnExcerpt: {
		type: 'string',
		default: '',
	},
	itemColumnReadmore: {
		type: 'string',
		default: '',
	},

	// The same two settings for the grid inside one post.
	itemColumnWidths: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemColumnArrangement: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemColumnUnits: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},

	/*
	 * How each grid arranges what is inside it.
	 *
	 * The same four settings for both grids — the grid of posts, and the grid
	 * inside one post. Direction is written as both `flex-direction` and
	 * `grid-auto-flow` because the container is one or the other depending on
	 * whether the author has given the columns widths of their own.
	 */
	postsInnerDirection: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	postsInnerJustify: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	postsInnerAlign: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemInnerDirection: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemInnerJustify: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemInnerAlign: {
		type: 'string',
		default: '',
		lmnResponsive: true,
	},
	itemInnerColumnGap: {
		type: 'number',
		default: '',
		lmnResponsive: true,
	},
	itemInnerRowGap: {
		type: 'number',
		default: '',
		lmnResponsive: true,
	},

	innerBlockContentWidth: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'number',
		default: '',
	},
	innerBlockAlign: {
		type: 'string',
		default: '',
	},
	// Query.
	numberOfItems: {
		type: 'number',
		default: 6,
	},
	order: {
		type: 'string',
		default: 'desc',
	},
	orderBy: {
		type: 'string',
		default: 'date',
	},
	type: {
		type: 'string',
		default: 'post',
	},
	taxonomyType: {
		type: 'string',
		default: 'category',
	},
	taxonomy: {
		type: 'string',
		default: '',
	},
	taxonomyFilterType: {
		type: 'string',
		default: '__in',
	},
	postOffset: {
		type: 'number',
		default: '',
	},
	postExclude: {
		type: 'string',
		default: '',
	},
	excludeCurrentPost: {
		type: 'boolean',
		default: '',
	},
	postInclude: {
		type: 'string',
		default: '',
	},
	readmoreText: {
		type: 'string',
		default: '',
	},

	// Spacing.
	imageSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	titleSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	categorySpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	excerptSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	metaSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},
	readmoreSpacing: {
		lmnResponsive: true,
		type: 'number',
		default: '',
	},

	/*
	 * Space around each part of a post.
	 *
	 * `<part>Spacing` above is only a bottom margin — enough to separate the
	 * parts of a stacked post, and not enough for anything else. Now that a post
	 * can be laid out in columns, a title may want room on its left and an
	 * excerpt padding of its own, which needs all four sides.
	 */
	imageMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	imagePadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	categoryMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	categoryPadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	titleMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	titlePadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	metaMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	metaPadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	excerptMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	excerptPadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	readmoreMargin: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},
	readmorePadding: {
		lmnResponsive: true,
		lmnUnits: 'px',
		type: 'object',
	},

	// Panels.
	titleShow: {
		type: 'boolean',
		default: true,
	},
	categoryShow: {
		type: 'boolean',
		default: true,
	},
	excerptShow: {
		type: 'boolean',
		default: true,
	},
	metaShow: {
		type: 'boolean',
		default: true,
	},
	readmoreShow: {
		type: 'boolean',
		default: true,
	},

	// Misc.
	authorShow: {
		type: 'boolean',
		default: '',
	},
	dateShow: {
		type: 'boolean',
		default: '',
	},
	commentsShow: {
		type: 'boolean',
		default: '',
	},
	excerptLength: {
		type: 'number',
		default: '',
	},
	/*
	 * Whether the excerpt is shown as plain text.
	 *
	 * A hand-written excerpt goes through `the_excerpt`, so it arrives wrapped
	 * in a paragraph and may carry links and formatting from wherever it was
	 * written. Inside a card that is styled by this block, that markup fights
	 * the typography settings above it — a stray `<p>` brings its own margins,
	 * a link its own colour. Stripping it is what almost everyone wants, so it
	 * is on unless it is turned off.
	 */
	excerptStripHtml: {
		type: 'boolean',
		default: true,
	},
	metaSeparator: {
		type: 'string',
		default: '',
	},

	// Addition Typography Options.
	titleHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	categoryHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	categoryHighlighted: {
		type: 'boolean',
		default: '',
	},
	categoryHighlightColor: {
		lmnHover: true,
		type: 'string',
		default: '',
	},
	excerptHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	metaHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	readmoreHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	imageHoverStateInContainer: {
		type: 'boolean',
		default: '',
	},
	/*
	 * What to show when a post has no featured image.
	 *
	 * Off by default: turning it on for every site that already uses this block
	 * would put a picture on pages that deliberately have none. An author who
	 * wants a tidy grid rather than a ragged one turns it on and, if they like,
	 * points it at an image of their own.
	 */
	imageFallbackShow: {
		type: 'boolean',
		default: false,
	},
	imageFallbackUrl: {
		type: 'string',
		default: '',
	},
	imageFallbackId: {
		type: 'number',
		default: '',
	},

	imageHasLink: {
		type: 'boolean',
		default: true,
	},
}

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	ContainerDiv.addAttributes( attrObject )
	Image.addAttributes( attrObject, { imageWidthUnitDefault: 'px' } )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	CustomCSS.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Typography.addAttributes( attrObject, 'lmn-block-posts__title', {
		hasTextContent: false,
		attrNameTemplate: 'title%s',
	} )
	Typography.addAttributes( attrObject, 'lmn-block-posts__category', {
		hasTextTag: false,
		hasTextContent: false,
		attrNameTemplate: 'category%s',
	} )
	Typography.addAttributes( attrObject, 'lmn-block-posts__excerpt', {
		hasTextTag: false,
		hasTextContent: false,
		attrNameTemplate: 'excerpt%s',
	} )
	Typography.addAttributes( attrObject, 'lmn-block-posts__meta', {
		hasTextTag: false,
		hasTextContent: false,
		attrNameTemplate: 'meta%s',
	} )
	Typography.addAttributes( attrObject, 'lmn-block-posts__readmore', {
		hasTextTag: false,
		hasTextContent: false,
		attrNameTemplate: 'readmore%s',
	} )
	Transform.addAttributes( attrObject )
	ContentAlign.addAttributes( attrObject )

	attrObject.add( {
		attributes: {
			// This keeps track of the version of the block, just when we need
			// to force update the block with new attributes and the save markup
			// doesn't change.
			version: {
				type: 'number',
				source: 'attribute',
				attribute: 'data-v',
				default: undefined,
			},
			...postsAttributes,
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	addFlexGapAttributes( attrObject )

	attrObject.addDefaultValues( {
		attributes: {
			readmoreText: __( 'Continue Reading', i18n ),
			commentsShow: true,
			authorShow: true,
			dateShow: true,
			titleShow: true,
			titleTextTag: 'h3',
			postType: 'post',
			numberOfItems: 6,
			orderBy: 'date',
			order: 'desc',
			taxonomyType: 'category',
			taxonomy: '',
			taxonomyFilterType: '__in',
			contentOrder: [
				'category',
				'featured-image',
				'title',
				'meta',
				'excerpt',
				'readmore',
			],
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	attrObject.addDefaultValues( {
		attributes: {
			version: 2,
		},
		versionAdded: '3.8.0',
		versionDeprecated: '',
	} )

	attrObject.add( {
		attributes: {
			taxonomyTypeToDisplay: {
				type: 'string',
				default: 'category',
			},
		},
		versionAdded: '3.19.7',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
