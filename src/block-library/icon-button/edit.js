/**
 * External dependencies
 */
import classnames from 'classnames'
import { version as VERSION } from 'lumen'
import { InspectorTabs, useBlockCssGenerator } from '~lumen/ui'
import {
	BlockDiv,
	Advanced, CustomCSS,
	Responsive,
	Button,
	BlockStyle,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~lumen/features'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapper, withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'

/**
 * Internal dependencies
 */
import { defaultIcon } from './schema'
import iconButtonStyles from './style'
import { blockStyles } from './block-styles'

const Edit = props => {
	const {
		className,
	} = props

	const customAttributes = CustomAttributes.getCustomAttributes( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-button',
	] )

	// Generate the CSS styles for the block.
	const blockCss = useBlockCssGenerator( {
		attributes: props.attributes,
		blockStyles: iconButtonStyles,
		clientId: props.clientId,
		context: props.context,
		setAttributes: props.setAttributes,
		blockState: props.blockState,
		version: VERSION,
	} )

	return (
		<>
			<InspectorControls />

			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<CustomCSS mainBlockClass="lmn-block-icon-button" />

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
				applyCustomAttributes={ false }
			>
				<Button
					linkTrigger=".lmn--inner-svg"
					buttonProps={ {
						id: props.attributes.anchorId || undefined,
						...customAttributes,
					} }
				/>
			</BlockDiv>
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs hasLayoutPanel={ false } />

			<BlockStyle.InspectorControls styles={ blockStyles }>
				<Button.InspectorControls.HoverEffects />
			</BlockStyle.InspectorControls>
			<Button.InspectorControls.Link />
			<Button.InspectorControls.Colors
				hasTextColor={ false }
				hasIconColor={ true }
			/>
			<Button.InspectorControls.Icon hasColor={ false } defaultValue={ defaultIcon } />
			<Button.InspectorControls.Size hasWidth={ true } paddingPlaceholderName="icon-button-padding" />
			<Button.InspectorControls.Borders
				borderSelector=".lmn-button"
				placeholder="24"
			/>

			<BlockDiv.InspectorControls initialOpen="spacing" />

			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-icon-button" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />
		</>

	)
} )

export default compose(
	withBlockWrapper,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( iconButtonStyles ),
)( Edit )
