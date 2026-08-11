/**
 * Internal dependencies
 */
import blockStyles from './style'
import variations from './variations'

/**
 * External dependencies
 */
import classnames from 'classnames/dedupe'
import { version as VERSION } from 'lumen'
import { last } from 'lodash'
import {
	InspectorBottomTip,
	InspectorStyleControls,
	InspectorTabs,
	useBlockCssGenerator,
} from '~lumen/ui'
import { useBlockStyle, useDeviceType } from '~lumen/hooks'
import {
	withBlockAttributeContext,
	withBlockStyleContext,
	withBlockWrapperIsHovered,
	withQueryLoopContext,
} from '~lumen/hoc'
import {
	BlockDiv,
	Image,
	getAlignmentClasses,
	Alignment,
	Advanced,
	Responsive,
	ContainerDiv,
	CustomAttributes,
	EffectsAnimations,
	BlockLink,
	ConditionalDisplay,
	Transform,
	MarginBottom,
	getBlockOrientation,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'
import { useSelect } from '@wordpress/data'

const TEMPLATE = variations[ 0 ].innerBlocks

const widthUnit = [ 'px', 'vw' ]
const heightUnit = [ 'px', 'vh' ]

const Edit = props => {
	const {
		hasContainer,
	} = props.attributes

	const {
		className, //isHovered,
	} = props

	const { hasInnerBlocks, innerBlocks } = useSelect( select => {
		const { getBlock } = select( 'core/block-editor' )
		const innerBlocks = getBlock( props.clientId ).innerBlocks
		return {
			hasInnerBlocks: innerBlocks.length > 0,
			innerBlocks,
		}
	}, [ props.clientId ] )

	const blockOrientation = getBlockOrientation( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const blockStyle = useBlockStyle( variations )

	const blockClassNames = classnames( [
		className,
		'lmn-block-card',
	] )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn--no-padding',
	] )

	const innerClassNames = classnames( [
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-card__content',
		`lmn-${ props.attributes.uniqueId }-inner-blocks`,
	], {
		'lmn-container-padding': hasContainer,
	} )

	const lastBlockName = last( innerBlocks )?.name
	const renderAppender = hasInnerBlocks ? ( [ 'lumen/text', 'core/paragraph' ].includes( lastBlockName ) ? () => <></> : InnerBlocks.DefaultBlockAppender ) : InnerBlocks.ButtonBlockAppender

	let hasHeight = [ 'default', 'default-2' ].includes( blockStyle )
	const deviceType = useDeviceType()
	// In horizontal layout, show height if in mobile view.
	if ( blockStyle === 'horizontal' && deviceType === 'Mobile' ) {
		hasHeight = true
	}

	const imageWidthUnit = props.attributes.imageWidthUnit || 'px'
	const imageHeightUnit = props.attributes.imageHeightUnit || 'px'

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
				blockStyle={ blockStyle }
				hasHeight={ hasHeight }
			/>

			{ blockCss && <style key="block-css">{ blockCss }</style> }

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
				enableVariationPicker={ true }
			>
				{ props.attributes.uniqueId && <ContainerDiv className={ contentClassNames }>
					<Image
						showTooltips={ props.isHovered }
						className="lmn-block-card__image"
						enableWidth={ blockStyle === 'horizontal' }
						enableHeight={ hasHeight }
						enableDiagonal={ false }
						widthUnits={ widthUnit }
						heightUnits={ heightUnit }
						defaultWidth={ 250 }
						width={ blockStyle !== 'horizontal' ? 100 : undefined }
						widthUnit={ blockStyle !== 'horizontal' ? '%' : imageWidthUnit }
						height={ blockStyle !== 'horizontal' ? undefined : 100 }
						heightUnit={ blockStyle !== 'horizontal' ? imageHeightUnit : '%' }
						hasTooltip={ ! [ 'full', 'faded' ].includes( blockStyle ) }
					/>
					<div className={ innerClassNames }>
						<InnerBlocks
							template={ TEMPLATE }
							orientation={ blockOrientation }
							renderAppender={ renderAppender }
						/>
					</div>
				</ContainerDiv> }
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<Image.InspectorControls
				// { ...props }
				initialOpen={ true }
				hasWidth={ props.blockStyle === 'horizontal' }
				hasHeight={ props.hasHeight }
				widthUnits={ widthUnit }
				heightUnits={ heightUnit }
				hasBorderRadius={ false }
				hasShape={ false }
				hasShadow={ false }
				hasAspectRatio={ ! [ 'horizontal', 'full', 'faded' ].includes( props.blockStyle ) }
			/>
			<Alignment.InspectorControls hasContainerSize={ true } hasBlockAlignment={ true } />
			<BlockDiv.InspectorControls />
			<ContainerDiv.InspectorControls sizeSelector=".lmn-block-card__content" />
			<BlockLink.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<InspectorStyleControls>
				<InspectorBottomTip />
			</InspectorStyleControls>
		</>
	)
} )

export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles ),
)( Edit )
