/**
 * The options that are switches rather than numbers.
 *
 * Kept as classes and shared by `edit` and `save` instead of being generated as
 * CSS: they are the same for every marquee on the page, so a class costs one
 * rule in the stylesheet where a generated declaration costs one per block.
 */

/**
 * External dependencies
 */
import classnames from 'classnames'

export const getMarqueeClasses = attributes => classnames( {
	'lmn-block-marquee--reverse': attributes.marqueeDirection === 'right',
	'lmn-block-marquee--pause-on-hover': attributes.marqueePauseOnHover,
	'lmn-block-marquee--fade': attributes.marqueeFade,
} )
