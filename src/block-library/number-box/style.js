/**
 * External dependencies
 */
import {
	BlockDiv,
	Advanced,
	Typography,
	Alignment,
	EffectsAnimations,
	addBackgroundStyles,
	addBorderStyles,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'shapeSize', [ {
	selector: '.lmn-block-number-box__container',
	styleRule: 'height',
	attrName: 'shapeSize',
	key: 'shapeSize',
	responsive: 'all',
	hasUnits: 'px',
	enabledCallback: getAttribute => getAttribute( 'hasShape' ),
	dependencies: [ 'hasShape' ],
}, {
	selector: '.lmn-block-number-box__container',
	styleRule: 'width',
	attrName: 'shapeSize',
	key: 'shapeSize-width',
	responsive: 'all',
	hasUnits: 'px',
	enabledCallback: getAttribute => getAttribute( 'hasShape' ),
	dependencies: [ 'hasShape' ],
} ] )

addBackgroundStyles( blockStyles, {
	attrNameTemplate: 'shape%s',
	selector: '.lmn-block-number-box__container',
	renderCondition: 'hasShape',
} )
addBorderStyles( blockStyles, {
	attrNameTemplate: 'shape%s',
	selector: '.lmn-block-number-box__container',
	renderCondition: 'hasShape',
} )
Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
Typography.addStyles( blockStyles, {
	selector: '.lmn-block-number-box__text',
	hoverSelector: '.lmn-block-number-box__text:hover',
} )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
