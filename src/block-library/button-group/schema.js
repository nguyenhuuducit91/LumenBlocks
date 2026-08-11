import { addDeprecatedAttributes } from './deprecated/attributes'
import {
	Advanced,
	Alignment,
	BlockDiv,
	Style,
	ConditionalDisplay,
	CustomAttributes,
	EffectsAnimations,
	MarginBottom,
	Responsive,
	Row,
	addFlexGapAttributes,
	Transform,
} from '~lumen/features'
import { AttributeObject } from '~lumen/utils'
import { version as VERSION } from 'lumen'

export const attributes = ( version = VERSION ) => {
	const attrObject = new AttributeObject()

	BlockDiv.addAttributes( attrObject )
	Style.addAttributes( attrObject )
	MarginBottom.addAttributes( attrObject )
	Row.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	attrObject.add( {
		attributes: {
			flexWrap: {
				type: 'string',
				lmnResponsive: true,
				default: '',
			},
		},
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )
	attrObject.add( {
		attributes: {
			buttonAlign: {
				type: 'string',
				lmnResponsive: true,
				default: '',
			},
			buttonFullWidth: {
				type: 'boolean',
				default: '',
			},
		},
		versionAdded: '3.4.3',
		versionDeprecated: '',
	} )
	addFlexGapAttributes( attrObject )

	addDeprecatedAttributes( attrObject )

	return attrObject.getMerged( version )
}

export default attributes( VERSION )
