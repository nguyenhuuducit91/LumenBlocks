/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	ContainerDiv,
	EffectsAnimations,
	MarginBottom,
	Separator,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )
ContainerDiv.addStyles( blockStyles, {
	sizeSelector: '.lmn-block-container__content',
	sizeHorizontalAlignRule: 'margin',
} )
MarginBottom.addStyles( blockStyles )
Separator.addStyles( blockStyles )

export default blockStyles
