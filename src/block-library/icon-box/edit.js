/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'lumen'
import { last } from 'lodash'
import classnames from 'classnames'
import {
	InspectorBottomTip,
	InspectorStyleControls,
	InspectorTabs,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	BlockDiv,
	ContainerDiv,
	ConditionalDisplay,
	getAlignmentClasses,
	EffectsAnimations,
	CustomAttributes,
	Responsive,
	Advanced,
	MarginBottom,
	BlockLink,
	Transform,
} from '~lumen/features'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'
import { substituteCoreIfDisabled } from '~lumen/utils'
import { substitutionRules } from '../../blocks'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { InnerBlocks } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'
import { useSelect } from '@wordpress/data'

export const TEMPLATE = [
	[ 'lumen/icon-label', { blockMargin: { bottom: 0 } }, [
		[ 'lumen/icon', { contentAlign: 'left' } ],
		[ 'lumen/heading', {
			text: __( 'Icon Box', i18n ), hasP: true, textTag: 'h4',
		} ],
	] ],
	substituteCoreIfDisabled(
		'lumen/text',
		{ text: 'Description for this block.' },
		[],
		substitutionRules,
	),
]

const Edit = props => {
	const {
		className,
	} = props

	const { hasInnerBlocks, innerBlocks } = useSelect( select => {
		const { getBlock } = select( 'core/block-editor' )
		const innerBlocks = getBlock( props.clientId ).innerBlocks
		return {
			hasInnerBlocks: innerBlocks.length > 0,
			innerBlocks,
		}
	}, [ props.clientId ] )

	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-box',
	] )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-icon-box__content',
	] )

	const lastBlockName = last( innerBlocks )?.name
	const renderAppender = hasInnerBlocks ? ( [ 'lumen/text', 'core/paragraph' ].includes( lastBlockName ) ? () => <></> : InnerBlocks.DefaultBlockAppender ) : InnerBlocks.ButtonBlockAppender

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

				<ContainerDiv className={ contentClassNames }>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ renderAppender }
					/>
				</ContainerDiv>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs hasLayoutPanel={ false } />

			<BlockDiv.InspectorControls />
			<BlockLink.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<ContainerDiv.InspectorControls
				sizeSelector=".lmn-block-content"
				hasContentVerticalAlign={ true }
			/>

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
