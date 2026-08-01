/**
 * External dependencies
 */
import {
	Advanced,
	BlockDiv,
	EffectsAnimations,
	Transform,
} from '~lumen/features'

import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'height', [ {
	renderIn: 'edit',
	selector: '.lmn-block-map__canvas',
	styleRule: 'height',
	attrName: 'height',
	key: 'height',
	format: '%spx',
	responsive: 'all',
}, {
	renderIn: 'save',
	selector: '.lmn-block-map__canvas, iframe',
	styleRule: 'height',
	attrName: 'height',
	key: 'height-save',
	format: '%spx',
	responsive: 'all',
} ] )

BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
