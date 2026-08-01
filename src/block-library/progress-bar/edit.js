/**
 * Internal dependencies
 */
import blockStyles from './style'
import { DEFAULT_PROGRESS } from './schema'

/**
 * External dependencies
 */
import {
	InspectorTabs, useDynamicContent, useBlockCssGenerator,
} from '~lumen/ui'
import {
	BlockDiv,
	Advanced,
	Responsive,
	MarginBottom,
	Transform,
	EffectsAnimations,
	CustomAttributes,
	CustomCSS,
	ConditionalDisplay,
	ProgressBar,
	Typography,
	getTypographyClasses,
	getAlignmentClasses,
	Alignment,
} from '~lumen/features'
import { version as VERSION, i18n } from 'lumen'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'

const Edit = props => {
	const {
		className,
		attributes,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const textClasses = getTypographyClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-progress-bar',
	] )

	const containerClassNames = classnames( [
		'lmn-block-progress-bar__container',
		blockAlignmentClass,
	] )

	const textClassNames = classnames( [
		'lmn-progress-bar__inner-text',
		textClasses,
	] )

	const barClassNames = classnames( 'lmn-progress-bar__bar', {
		'lmn--has-background-overlay': attributes.progressColorType === 'gradient' && attributes.progressColor2,
	} )

	const progressValue = attributes.progressValue || ''

	// parsing string to number since progress value is of a string type to support dynamic content
	const parsedProgressValue = parseFloat( useDynamicContent( progressValue ).replace( /,/g, '' ) )
	const derivedProgressValue = isNaN( parsedProgressValue ) ? DEFAULT_PROGRESS : parsedProgressValue
	const derivedValue = `${ attributes.progressValuePrefix }${ derivedProgressValue }${ attributes.progressValueSuffix }`.trim()

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

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				{ blockCss && <style key="block-css">{ blockCss }</style> }
				<CustomCSS mainBlockClass="lmn-block-progress-bar" />
				<div className={ containerClassNames }>
					<div className="lmn-progress-bar lmn-animate">
						<div className={ barClassNames }>
							{ attributes.showText && (
								<>
									<Typography
										tagName="span"
										className={ classnames( [ textClassNames, 'lmn-progress-bar__text' ] ) }
										value={ attributes.text }
									/>
									<Typography
										tagName="span"
										className={ classnames( [ textClassNames, 'lmn-progress-bar__progress-value-text' ] ) }
										value={ derivedValue }
										editable={ false }
									/>
								</>
							) }
						</div>
					</div>
				</div>
				{ /* Add our progress style here because we're adjusting the value using a hook */ }
				<style>
					{ `.editor-styles-wrapper .lmn-${ props.attributes.uniqueId } .lmn-progress-bar { --progress-value:${ derivedProgressValue }% !important; }` }
				</style>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<Alignment.InspectorControls />
			<ProgressBar.InspectorControls />
			<Typography.InspectorControls
				{ ...props }
				initialOpen={ false }
				hasTextTag={ false }
				hasTextContent={ false }
				hasTextShadow
				hasToggle
				label={ __( 'Label', i18n ) }
			/>

			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-progress-bar" />
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
