import {
	Advanced,
	Alignment,
	BlockDiv,
	Style,
	ConditionalDisplay,
	CustomAttributes,
	EffectsAnimations,
	Responsive,
	Row,
	Transform,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	Row.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )

	attrObject.addDefaultValues( {
		attributes: {
			customAttributes: [ [ 'aria-expanded', 'false' ] ],
		},
		versionAdded: '3.0.0',
		versionDeprecated: '3.9.1',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
