/**
 * External dependencies
 */
import {
	Advanced,
	BlockDiv,
	Style,
	Responsive,
	Button,
	Typography,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

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
	Button.addAttributes( attrObject, {
		selector: '.lmn-button',
	} )

	Typography.addAttributes( attrObject, '.lmn-button__inner-text', {
		hasTextTag: false,
		hasColor: false,
	} )

	attrObject.add( {
		attributes: {
			contentAlign: {
				lmnResponsive: true,
				type: 'string',
				default: '',
			},
			anchorId: {
				type: 'string',
				selector: 'a.lmn-button',
				source: 'attribute',
				attribute: 'id',
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
