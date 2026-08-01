
/**
 * External dependencies
 */
import {
	Advanced,
	Button,
	BlockDiv,
	EffectsAnimations,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Button.addStyles( blockStyles, {
	selector: '.lmn-button',
	hoverSelector: '.lmn-button:hover',
	textSelector: '.lmn-button__inner-text',
	textHoverSelector: '.lmn-button:hover .lmn-button__inner-text',
} )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
