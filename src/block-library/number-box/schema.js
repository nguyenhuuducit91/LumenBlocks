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
	Typography,
	Alignment,
	MarginBottom,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	addBackgroundAttributes,
	addBorderAttributes,
	Transform,
} from '~lumen/features'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	Alignment.addAttributes( attrObject )
	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	Typography.addAttributes( attrObject, '.lmn-block-number-box__text' )

	addBackgroundAttributes( attrObject, 'shape%s' )
	addBorderAttributes( attrObject, 'shape%s' )

	attrObject.add( {
		attributes: {
			hasShape: {
				type: 'boolean',
				default: true,
			},
			shapeSize: {
				type: 'number',
				lmnResponsive: true,
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
