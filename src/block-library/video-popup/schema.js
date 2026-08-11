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
	Advanced.addAttributes( attrObject )
	Transform.addAttributes( attrObject )
	Alignment.addAttributes( attrObject )
	EffectsAnimations.addAttributes( attrObject )
	CustomAttributes.addAttributes( attrObject )
	Responsive.addAttributes( attrObject )
	ConditionalDisplay.addAttributes( attrObject )
	attrObject.add( {
		attributes: {
			videoLink: {
				type: 'string',
				default: '',
			},
			videoId: {
				type: 'string',
				source: 'attribute',
				selector: '[data-video]',
				attribute: 'data-video',
				default: '',
			},
			ariaLabel: {
				type: 'string',
				source: 'attribute',
				selector: 'button',
				attribute: 'aria-label',
				default: '',
			},
			videoFullscreen: {
				type: 'boolean',
				default: true,
			},
			videoDownload: {
				type: 'boolean',
				default: true,
			},
			videoLoop: {
				type: 'boolean',
				default: false,
			},
			videoName: {
				type: 'string',
				default: '',
			},
			videoDescription: {
				type: 'string',
				default: '',
			},
			videoUploadDate: {
				type: 'string',
				default: '',
			},
			videoUploadDateTimezone: {
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
