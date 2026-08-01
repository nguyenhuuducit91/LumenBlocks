/**
 * Internal dependencies
 */
import dividerStyles from './style'
import { blockStyles } from './block-styles'

/**
 * External dependencies
k*/
import {
	BlockStyle,
	BlockDiv,
	CustomCSS,
	Responsive,
	Advanced,
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
	InspectorTabs,
	AdvancedRangeControl,
	ColorPaletteControl,
	useBlockCssGenerator,
} from '~lumen/ui'
import { useBlockStyle } from '~lumen/hooks'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'

const Edit = props => {
	const {
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const blockStyle = useBlockStyle( blockStyles )

	const blockClassNames = classnames( [
		className,
		'lmn-block-divider',
		blockAlignmentClass,
	] )

	// Generate the CSS styles for the block.
	const blockCss = useBlockCssGenerator( {
		attributes: props.attributes,
		blockStyles: dividerStyles,
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
			<CustomCSS mainBlockClass="lmn-block-divider" />

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				{ [ 'dots', 'asterisks' ].includes( blockStyle ) ? (
					<div className="lmn-block-divider__dots" aria-hidden="true">
						<div className="lmn-block-divider__dot" />
						<div className="lmn-block-divider__dot" />
						<div className="lmn-block-divider__dot" />
					</div>
				) : <hr className="lmn-block-divider__hr" /> }
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs />

			<BlockStyle.InspectorControls styles={ blockStyles } >
				<ColorPaletteControl
					label={ __( 'Color', i18n ) }
					attribute="color"
				/>
				<AdvancedRangeControl
					label={ __( 'Width', i18n ) + ' (%)' }
					responsive="all"
					attribute="width"
					min={ 1 }
					max={ 100 }
					placeholder=""
				/>
				<AdvancedRangeControl
					label={ __( 'Height / Size', i18n ) }
					responsive="all"
					attribute="height"
					min={ 1 }
					sliderMax={ 100 }
					placeholder=""
				/>
			</BlockStyle.InspectorControls>

			<Alignment.InspectorControls />
			<BlockDiv.InspectorControls />

			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-divider" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />
		</>
	)
} )
export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( dividerStyles ),
)( Edit )
