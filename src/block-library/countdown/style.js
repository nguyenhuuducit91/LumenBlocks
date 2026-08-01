import { Divider } from './divider'

/**
 * External dependencies
 */
import {
	BlockDiv,
	ContainerDiv,
	Advanced,
	Alignment,
	EffectsAnimations,
	Transform,
	Typography,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'contentAlignment', [ {
	selector: '.%s.lmn-block-countdown .lmn-block-countdown__container',
	styleRule: 'display',
	responsive: 'all',
	attrName: 'contentAlignment',
	valueCallback: () => {
		return 'flex'
	},
}, {
	selector: '.%s.lmn-block-countdown .lmn-block-countdown__container',
	styleRule: 'justifyContent',
	attrName: 'contentAlignment',
	key: 'contentAlignment',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'boxGap', [ {
	selector: '.%s.lmn-block-countdown .lmn-block-countdown__container',
	styleRule: 'gap',
	attrName: 'boxGap',
	key: 'boxGap',
	responsive: 'all',
	hasUnits: 'px',
} ] )

blockStyles.addBlockStyles( 'labelMarginTop', [ {
	selector: '.lmn-block-countdown__label',
	styleRule: 'marginTop',
	attrName: 'labelMarginTop',
	key: 'labelMarginTop',
	responsive: 'all',
	hasUnits: 'px',
} ] )

Divider.addStyles( blockStyles )
ContainerDiv.addStyles( blockStyles )
Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-countdown__digit',
	hoverSelector: '.lmn-block-countdown__digit:hover',
	attrNameTemplate: 'digit%s',
} )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-countdown__label',
	hoverSelector: '.lmn-block-countdown__label:hover',
	attrNameTemplate: 'label%s',
} )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-countdown__message',
	hoverSelector: '.lmn-block-countdown__message:hover',
	attrNameTemplate: 'message%s',
} )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
