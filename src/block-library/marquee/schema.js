/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	ConditionalDisplay,
	ContentAlign,
	CustomAttributes,
	EffectsAnimations,
	MarginBottom,
	Responsive,
	Style,
	Transform,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
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
			// '' scrolls to the left, 'right' scrolls to the right.
			marqueeDirection: {
				type: 'string',
				default: '',
			},
			// Seconds for one full set of items to travel past. Not "speed":
			// the distance covered depends on how much the author put in, so a
			// duration is the part that stays predictable as content changes.
			marqueeDuration: {
				type: 'number',
				default: '',
			},
			// Carries a unit so the gap can be written as `fx` — a marquee whose
			// spacing is `calc(2rem + 2vw)` keeps its rhythm across viewports
			// without a value per breakpoint.
			marqueeGap: {
				type: 'number',
				default: '',
				lmnResponsive: true,
				lmnUnits: 'px',
			},
			marqueePauseOnHover: {
				type: 'boolean',
				default: '',
			},
			marqueeFade: {
				type: 'boolean',
				default: '',
			},
			marqueeFadeWidth: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
		},
		versionAdded: '3.19.10',
		versionDeprecated: '',
	} )

	attrObject.addDefaultValues( {
		attributes: {
			marqueePauseOnHover: true,
			version: 1,
		},
		versionAdded: '3.19.10',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
