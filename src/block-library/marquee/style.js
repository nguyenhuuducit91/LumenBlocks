/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	EffectsAnimations,
	MarginBottom,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

const versionAdded = '3.19.10'

blockStyles.addBlockStyles( 'marqueeDuration', [ {
	selector: '.lmn-block-marquee__track',
	styleRule: 'animationDuration',
	attrName: 'marqueeDuration',
	key: 'marqueeDuration',
	format: '%ss',
	versionAdded,
} ] )

/*
 * The gap does two jobs from one value: it spaces the items inside a set, and
 * it spaces the sets from each other. It is written as a custom property rather
 * than as `gap` because the keyframes need the same number — the track steps by
 * exactly one set plus one gap, and it can only work that out if it knows the
 * gap.
 */
blockStyles.addBlockStyles( 'marqueeGap', [ {
	selector: '',
	styleRule: '--lmn-marquee-gap',
	attrName: 'marqueeGap',
	key: 'marqueeGap',
	responsive: 'all',
	format: '%spx',
	versionAdded,
} ] )

blockStyles.addBlockStyles( 'marqueeFadeWidth', [ {
	selector: '',
	styleRule: '--lmn-marquee-fade',
	attrName: 'marqueeFadeWidth',
	key: 'marqueeFadeWidth',
	responsive: 'all',
	format: '%spx',
	versionAdded,
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )
MarginBottom.addStyles( blockStyles )

export default blockStyles
