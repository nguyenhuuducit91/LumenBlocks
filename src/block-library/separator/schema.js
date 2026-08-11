import {
	Advanced,
	BlockDiv,
	Style,
	BlockLink,
	ConditionalDisplay,
	CustomAttributes,
	EffectsAnimations,
	Responsive,
	createSeparatorAttributes,
	createSeparatorLayerAttributes,
	Transform,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	BlockLink.addAttributes( attrObject )
	Transform.addAttributes( attrObject )

	attrObject.add( {
		attributes: {
			align: {
				type: 'string',
				default: 'full',
			},
			...createSeparatorAttributes(),
			...createSeparatorLayerAttributes( '%s', 2 ),
			...createSeparatorLayerAttributes( '%s', 3 ),
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	attrObject.addDefaultValues( {
		attributes: {
			separatorShow: true,
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
