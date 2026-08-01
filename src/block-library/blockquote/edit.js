/**
 * Internal dependencies
 */
import blockStyles from './style'
import SVGDefaultQuote from './images/round-thin.svg'
import { QUOTE_ICONS } from './quotes'
import variations from './variations'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'lumen'
import classnames from 'classnames'
import {
	AdvancedToolbarControl,
	InspectorBottomTip,
	InspectorStyleControls,
	InspectorTabs,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	BlockDiv,
	ContainerDiv,
	ConditionalDisplay,
	Alignment,
	getAlignmentClasses,
	EffectsAnimations,
	CustomAttributes,
	CustomCSS,
	Responsive,
	Advanced,
	MarginBottom,
	Transform,
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
import { InnerBlocks, useBlockEditContext } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { renderToString, memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'
import { useSelect } from '@wordpress/data'

export const defaultIcon = renderToString( <SVGDefaultQuote /> )

const TEMPLATE = variations[ 0 ].innerBlocks

const Edit = props => {
	const {
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const { hasInnerBlocks } = useSelect( select => {
		const { getBlockOrder } = select( 'core/block-editor' )
		return {
			hasInnerBlocks: getBlockOrder( props.clientId ).length > 0,
		}
	}, [ props.clientId ] )

	const blockClassNames = classnames( [
		className,
		'lmn-block-blockquote',
	] )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-blockquote__content',
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
			<InspectorControls />
			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
				enableVariationPicker={ true }
			>
				{ blockCss && <style key="block-css">{ blockCss }</style> }
				<CustomCSS mainBlockClass="lmn-block-blockquote" />

				<ContainerDiv className={ contentClassNames }>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock="all"
					/>
				</ContainerDiv>
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs />

			<Alignment.InspectorControls />
			<BlockDiv.InspectorControls />
			<ContainerDiv.InspectorControls
				sizeSelector=".lmn-block-content"
				hasContentVerticalAlign={ true }
			/>
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-blockquote" />
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

// Disable bottom margins for child blocks.
addFilter( 'lumen.edit.margin-bottom.enable-handlers', 'lumen/blockquote', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/blockquote' ? false : enabled
} )

// Add more quotation mark icons in the Icon Block if it's inside the blockquote block.
addFilter( 'lumen.block-component.icon.after', 'lumen/blockquote', output => {
	const { clientId } = useBlockEditContext()
	const { parentBlock } = useSelect( select => {
		const { getBlockRootClientId, getBlock } = select( 'core/block-editor' )
		const parentClientId = getBlockRootClientId( clientId )
		return {
			parentBlock: getBlock( parentClientId ),
		}
	}, [ clientId ] )
	if ( parentBlock?.name === 'lumen/blockquote' ) {
		return (
			<>
				<AdvancedToolbarControl
					label={ __( 'Quotation Mark Icons', i18n ) }
					multiline={ true }
					controls={ Object.values( QUOTE_ICONS ) }
					attribute="icon"
					default={ QUOTE_ICONS[ 'round-thin' ].value }
				/>
			</>
		)
	}
	return output
} )

// Change the icon picker label for the Icon Block if it's inside the blockquote block.
addFilter( 'lumen.block-component.icon.label', 'lumen/blockquote', label => {
	const { clientId } = useBlockEditContext()
	const { parentBlock } = useSelect( select => {
		const { getBlockRootClientId, getBlock } = select( 'core/block-editor' )
		const parentClientId = getBlockRootClientId( clientId )
		return {
			parentBlock: getBlock( parentClientId ),
		}
	}, [ clientId ] )
	if ( parentBlock?.name === 'lumen/blockquote' ) {
		return __( 'Pick another icon', i18n )
	}
	return label
} )

// Prevent the icon from being being styled with a saved default style.
addFilter( 'lumen.block-default-styles.use-saved-style', 'lumen/blockquote', ( enabled, block, parentBlockNames ) => {
	if ( block.name === 'lumen/icon' && parentBlockNames.length >= 1 && parentBlockNames[ parentBlockNames.length - 1 ] === 'lumen/blockquote' ) {
		return false
	}
	return enabled
} )
