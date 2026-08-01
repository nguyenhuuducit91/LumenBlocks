/**
 * External dependencies
 */
import {
	Alignment,
	Advanced,
	BlockDiv,
	EffectsAnimations,
	Transform,
	ProgressBar,
	Typography,
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
ProgressBar.addStyles( blockStyles, {
	isCircle: true,
} )
Typography.addStyles( blockStyles, {
	selector: '.lmn-progress-circle__inner-text',
	hoverSelector: '.lmn-progress-circle__inner-text:hover',
} )

export default blockStyles
