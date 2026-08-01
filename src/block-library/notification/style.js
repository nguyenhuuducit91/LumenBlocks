/**
 * External dependencies
 */
import {
	BlockDiv,
	Alignment,
	Advanced,
	EffectsAnimations,
	ContainerDiv,
	MarginBottom,
	Transform,
} from '~lumen/features'
import { BlockStyleGenerator } from '~lumen/ui'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'dismissibleSize', [ {
	selector: '.lmn-container',
	attrName: 'dismissibleSize',
	key: 'dismissibleSize',
	styleRule: 'paddingInlineEnd',
	enabledCallback: getAttribute => getAttribute( 'isDismissible' ) && getAttribute( 'dismissibleSize' ),
	valuePreCallback: value => value + 44,
	// 44 is an arbitrary number based on the size of the container paddings vs the close button size.
	format: '%spx',
	dependencies: [ 'isDismissible' ],
} ] )

blockStyles.addBlockStyles( 'dismissibleColor', [ {
	selector: '.lmn-block-notification__close-button svg',
	attrName: 'dismissibleColor',
	key: 'dismissibleColor',
	styleRule: 'fill',
	enabledCallback: getAttribute => getAttribute( 'isDismissible' ),
	dependencies: [ 'isDismissible' ],
} ] )

Alignment.addStyles( blockStyles )
BlockDiv.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )
ContainerDiv.addStyles( blockStyles, {
	sizeSelector: '.lmn-block-notification__content',
	sizeHorizontalAlignRule: 'margin',
} )
MarginBottom.addStyles( blockStyles )

export default blockStyles
