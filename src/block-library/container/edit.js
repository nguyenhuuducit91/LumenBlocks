/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	InspectorBottomTip,
	InspectorStyleControls,
	InspectorTabs,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	Advanced,
	Alignment,
	BlockDiv,
	BlockLink,
	ConditionalDisplay,
	ContainerDiv,
	ContentAlign,
	CustomAttributes,
	CustomCSS,
	EffectsAnimations,
	MarginBottom,
	Responsive,
	Separator,
	Transform,
	getAlignmentClasses,
	getBlockOrientation,
	getContentAlignmentClasses,
	getSeparatorClasses,
} from '~lumen/features'
import {
	withBlockAttributeContext,
	withBlockStyleContext,
	withBlockWrapperIsHovered,
	withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { memo } from '@wordpress/element'
import { useSelect } from '@wordpress/data'

const ButtonBlockAppender = memo( props => {
	return <InnerBlocks.ButtonBlockAppender { ...props } />
} )

const Edit = props => {
	const {
		className,
		clientId,
	} = props

	const hasInnerBlocks = useSelect( select => {
		return select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0
	}, [ clientId ] )

	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockOrientation = getBlockOrientation( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-container',
		separatorClass,
	] )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-container__content',
		`lmn-${ props.attributes.uniqueId }-inner-blocks`,
	], getContentAlignmentClasses( props.attributes ) )

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
			<InspectorControls />
			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				{ blockCss && <style key="block-css">{ blockCss }</style> }
				<CustomCSS mainBlockClass="lmn-block-container" />

				<Separator>
					<ContainerDiv className={ contentClassNames }>
						<InnerBlocks
							templateLock={ props.attributes.templateLock || false }
							orientation={ blockOrientation }
							renderAppender={ hasInnerBlocks ? undefined : ButtonBlockAppender }
						/>
					</ContainerDiv>
				</Separator>
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

// Inspector controls for the block, it's important that we only pass only the
// props used by controls to prevent rerenders of all the inspector controls.
const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs />

			<ContentAlign.InspectorControls />
			<Alignment.InspectorControls hasContainerSize={ true } hasBlockAlignment={ true } />
			<BlockDiv.InspectorControls />
			<ContainerDiv.InspectorControls sizeSelector=".lmn-block-content" />
			<BlockLink.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<Separator.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-container" />
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
