/**
 * External dependencies
 */
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	Style,
	CustomCSS,
	Responsive,
	Advanced,
	Typography,
	Alignment,
	MarginBottom,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~lumen/features'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	Alignment.addAttributes( attrObject )
	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	CustomCSS.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	Typography.addAttributes( attrObject, '.lmn-block-heading__text', {
		defaultTextTag: 'h2',
	} )

	attrObject.add( {
		attributes: {
			showTopLine: {
				type: 'boolean',
				default: '',
			},
			topLineWidth: {
				type: 'number',
				default: '',
				lmnUnits: 'px',
				lmnHover: true,
			},
			topLineHeight: {
				type: 'number',
				default: '',
			},
			topLineColor: {
				type: 'string',
				default: '',
				lmnHover: true,
			},
			topLineMargin: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
			topLineAlign: {
				type: 'string',
				default: '',
				lmnResponsive: true,
			},
			showBottomLine: {
				type: 'boolean',
				default: '',
			},
			bottomLineWidth: {
				type: 'number',
				default: '',
				lmnUnits: 'px',
				lmnHover: true,
			},
			bottomLineHeight: {
				type: 'number',
				default: '',
			},
			bottomLineColor: {
				type: 'string',
				default: '',
				lmnHover: true,
			},
			bottomLineMargin: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
			bottomLineAlign: {
				type: 'string',
				default: '',
				lmnResponsive: true,
			},
			useThemeTextMargins: {
				type: 'boolean',
				default: '',
			},
			// We need to put the anchor here because the deprecation will fail
			// without it (Gutenberg bug).
			anchor: {
				attribute: 'id',
				selector: '*',
				source: 'attribute',
				type: 'string',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	attrObject.add( {
		attributes: {
			topLineBorderStyle: {
				type: 'string',
				default: '',
			},
			topLineBorderWidth: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
			topLineBorderColor: {
				type: 'string',
				default: '',
				lmnHover: true,
			},
			topLineBorderRadius: {
				type: 'object',
				lmnResponsive: true,
			},
			bottomLineBorderStyle: {
				type: 'string',
				default: '',
			},
			bottomLineBorderWidth: {
				type: 'number',
				default: '',
				lmnResponsive: true,
			},
			bottomLineBorderColor: {
				type: 'string',
				default: '',
				lmnHover: true,
			},
			bottomLineBorderRadius: {
				type: 'object',
				lmnResponsive: true,
			},
		},
		versionAdded: '3.19.10',
		versionDeprecated: '',
	} )

	attrObject.add( {
		attributes: {
			textRemoveTextMargins: {
				type: 'boolean',
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '3.6.2',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
