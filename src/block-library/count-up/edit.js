/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import {
	BlockDiv,
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
	Transform,
} from '~lumen/features'
import { version as VERSION, i18n } from 'lumen'
import classnames from 'classnames'
import {
	InspectorTabs, InspectorStyleControls, PanelAdvancedSettings, AdvancedRangeControl, useBlockCssGenerator,
} from '~lumen/ui'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { memo }	from '@wordpress/element'

const Edit = props => {
	const {
		className,
	} = props

	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const blockClassNames = classnames( [
		className,
		'lmn-block-count-up',
	] )

	const textClassNames = classnames( [
		'lmn-block-count-up__text',
		textClasses,
		blockAlignmentClass,
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

			<InspectorControls blockState={ props.blockState } />
			{ blockCss && <style key="block-css">{ blockCss }</style> }

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<Typography
					tagName="div"
					placeholder={ __( '1,234.56', i18n ) }
					className={ textClassNames }
				/>
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
					title={ __( 'Counter', i18n ) }
					id="count-up"
					initialOpen={ true }
				>
					<AdvancedRangeControl
						label={ __( 'Duration (ms)', i18n ) }
						attribute="duration"
						min={ 100 }
						sliderMax={ 5000 }
						step={ 100 }
						placeholder="1000"
					>

					</AdvancedRangeControl>
				</PanelAdvancedSettings>
			</InspectorStyleControls>
			<Typography.InspectorControls
				{ ...props }
				hasTextTag={ false }
				hasTextShadow={ true }
				initialOpen={ false }
			/>
			<Alignment.InspectorControls />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
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
