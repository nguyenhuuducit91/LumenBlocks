/**
 * External dependencies
 */
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	Style,
	Responsive,
	Advanced,
	MarginBottom,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Alignment,
	Transform,
} from '~lumen/features'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	attrObject.add( {
		attributes: {
			color: {
				type: 'string',
				default: '',
			},
			height: {
				lmnResponsive: true,
				type: 'number',
				default: '',
			},
			width: {
				lmnResponsive: true,
				type: 'number',
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
