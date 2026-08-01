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

blockStyles.addBlockStyles( 'iconGap2', [ {
	renderIn: 'save',
	selector: '.lmn-inner-blocks',
	attrName: 'iconGap2',
	key: 'iconGap-save',
	styleRule: 'gap',
	format: '%spx',
	responsive: 'all',
}, {
	renderIn: 'edit',
	selector: '.lmn-inner-blocks .block-editor-block-list__layout',
	attrName: 'iconGap2',
	key: 'iconGap',
	styleRule: 'gap',
	format: '%spx',
	responsive: 'all',
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Column.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
