/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import {
	BlockDiv,
	CustomCSS,
	Responsive,
	Advanced,
	Typography,
	getTypographyClasses,
	getAlignmentClasses,
	Alignment,
	MarginBottom,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	BorderControls,
	BackgroundControls,
	Transform,
} from '~lumen/features'
import { version as VERSION, i18n } from 'lumen'
import classnames from 'classnames'
import {
	AdvancedRangeControl,
	InspectorStyleControls,
	InspectorTabs,
	PanelAdvancedSettings,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

const Edit = props => {
	const {
		className,
		attributes,
		setAttributes,
	} = props

	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const blockClassNames = classnames( [
		className,
		'lmn-block-number-box',
	], {
		'lmn--has-shape': props.attributes.hasShape,
	} )

	const containerClassNames = classnames( [
		'lmn-block-number-box__container',
		blockAlignmentClass,
	] )

	const textClassNames = classnames( [
		'lmn-block-number-box__text',
		textClasses,
	] )

	// Generate the CSS styles for the block.
	const blockCss = useBlockCssGenerator( {
		attributes: props.attributes,
		blockStyles,
		clientId: props.clientId,
		context: props.context,
		setAttributes: props.setAttributes,
		blockState: props.blockState,
		version: VERSION,
	} )

	return (
		<>
			<InspectorControls
				setAttributes={ setAttributes }
				blockState={ props.blockState }
				hasShape={ attributes.hasShape }
			/>

			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<CustomCSS mainBlockClass="lmn-block-number-box" />

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<div className={ containerClassNames }>
					<Typography
						tagName="span"
						placeholder="1"
						className={ textClassNames }
					/>
				</div>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'Shape', i18n ) }
					id="shape"
					initialOpen={ true }
					hasToggle={ true }
					checked={ props.hasShape }
					onChange={ hasShape => props.setAttributes( { hasShape } ) }
				>
					<AdvancedRangeControl
						label={ __( 'Size', i18n ) }
						attribute="shapeSize"
						responsive="all"
						min="0"
						sliderMax="200"
						placeholder="96"
					/>
					<BackgroundControls
						attrNameTemplate="shape%s"
						hasGradient={ false }
						hasBackgroundImage={ false }
						hasBackgroundGradientBlendMode={ false }
					/>
					<BorderControls
						attrNameTemplate="shape%s"
						borderSliderMax="100"
					/>
				</PanelAdvancedSettings>
			</InspectorStyleControls>
			<Typography.InspectorControls
				{ ...props }
				initialOpen={ false }
				hasTextTag={ false }
				sizePlaceholder="56"
			/>

			<Alignment.InspectorControls />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-number-box" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

		</>
	)
} )

export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles ),
)( Edit )
