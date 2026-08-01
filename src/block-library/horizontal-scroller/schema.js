import {
	Advanced,
	Alignment,
	BlockDiv,
	Style,
	ConditionalDisplay,
	CustomAttributes,
	CustomCSS,
	EffectsAnimations,
	MarginBottom,
	Responsive,
	Row,
	Transform,
	ContentAlign,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	attrObject.add( {
		attributes: {
			columnSpacing: {
				lmnResponsive: true,
				lmnUnits: 'px',
				type: 'number',
				default: '',
			},

			horizontalScrollerColumnWidth: {
				lmnResponsive: true,
				type: 'number',
				default: '',
				lmnUnits: 'px',
			},
			horizontalScrollerHeight: {
				type: 'number',
				default: '',
			},
			horizontalScrollerColumnGap: {
				lmnResponsive: true,
				type: 'number',
				default: '',
			},
			horizontalScrollerSnap: {
				type: 'string',
				default: '',
			},
			horizontalScrollerLeftOffset: {
				lmnResponsive: true,
				type: 'number',
				default: '',
				lmnUnits: 'px',
			},
			templateLock: {
				type: 'string',
				default: '',
			},
			columnArrangement: {
				lmnResponsive: true,
				type: 'string',
				default: '',
			},

			scrollbarHeight: {
				type: 'number',
				default: '',
			},
			scrollbarTrackColor: {
				type: 'string',
				default: '',
			},
			scrollbarThumbColor: {
				type: 'string',
				default: '',
			},
			scrollbarThumbRadius: {
				type: 'number',
				default: '',
				lmnUnits: 'px',
			},
			showScrollbar: {
				type: 'boolean',
				default: false,
			},
		},
		versionAdded: '3.6.4',
		versionDeprecated: '',
	} )

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	Row.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	CustomCSS.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	ContentAlign.addAttributes( attrObject )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
