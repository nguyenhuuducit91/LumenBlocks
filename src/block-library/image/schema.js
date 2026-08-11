import {
	Advanced,
	Alignment,
	BlockDiv,
	BlockLink,
	Style,
	ConditionalDisplay,
	CustomAttributes,
	EffectsAnimations,
	Image,
	Responsive,
	Transform,
	Link,
	Typography,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	Image.addAttributes( attrObject )
	Link.addAttributes( attrObject, { selector: 'a.lmn-link' } )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	BlockLink.addAttributes( attrObject )

	Typography.addAttributes( attrObject, '.lmn-img-figcaption', {
		hasTextContent: true,
		attrNameTemplate: 'figcaption%s',
	} )

	attrObject.add( {
		attributes: {
			figcaptionShow: {
				type: 'boolean',
				default: false,
			},
			figcaptionAlignment: {
				type: 'string',
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
