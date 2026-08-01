/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	Column,
	EffectsAnimations,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'iconGap', [ {
	selector: '.lmn-block-icon',
	attrName: 'iconGap',
	key: 'iconGap',
	styleRule: 'flexBasis',
	format: '%spx',
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Column.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
