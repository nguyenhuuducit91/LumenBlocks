/**
 * External dependencies
 */
import {
	Advanced,
	BlockDiv,
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

blockStyles.addBlockStyles( 'tabPanelOffset', [ {
	selector: '',
	styleRule: '--tabs-gap',
	attrName: 'tabPanelOffset',
	key: 'tabPanelOffset',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'equalTabHeight', [ {
	selector: '.%s .lmn-block-tab-content .lmn-block-content .lmn-block-column[hidden]',
	renderIn: 'save',
	styleRule: 'display',
	attrName: 'equalTabHeight',
	key: 'equalTabHeight',
	valueCallback: value => {
		return value ? undefined : 'none'
	},
	responsive: 'all',
} ] )

BlockDiv.addStyles( blockStyles )
MarginBottom.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )
Separator.addStyles( blockStyles )

export default blockStyles
