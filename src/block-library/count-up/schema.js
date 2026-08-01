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
	Typography.addAttributes( attrObject, '.lmn-block-count-up__text' )

	attrObject.add( {
		attributes: {
			duration: {
				type: 'number',
				default: '',
			},
		},
		versionAdded: '3.4.2',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
