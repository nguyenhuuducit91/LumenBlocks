/**
 * External dependencies
 */
import {
	Advanced,
	Typography,
	Alignment,
	EffectsAnimations,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

Alignment.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-icon-list-item__text',
	hoverSelector: '.lmn-block-icon-list-item__text:hover',
} )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
