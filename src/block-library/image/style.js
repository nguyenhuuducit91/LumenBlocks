/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	EffectsAnimations,
	Image,
	Transform,
	Typography,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'figcaptionAlignment', [ {
	selector: '.%s .lmn-img-figcaption',
	styleRule: 'textAlign',
	attrName: 'figcaptionAlignment',
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: '.lmn-img-figcaption',
	hoverSelector: '.lmn-img-figcaption:hover',
	attrNameTemplate: 'figcaption%s',
} )
EffectsAnimations.addStyles( blockStyles )
Image.addStyles( blockStyles )

export default blockStyles
