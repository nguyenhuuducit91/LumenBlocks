/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { InspectorTabs, useBlockCssGenerator } from '~lumen/ui'
import {
	BlockDiv,
	MarginBottom,
	getRowClasses,
	Alignment,
	getAlignmentClasses,
	Advanced,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~lumen/features'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { InnerBlocks } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'
import { memo } from '@wordpress/element'

export const defaultIcon = '<svg data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>'

const TEMPLATE = [
	[ 'lumen/text', {
		text: '$', htmlTag: 'span', innerTextTag: 'span',
	} ],
	[ 'lumen/text', {
		text: '99', htmlTag: 'span', innerTextTag: 'span', className: 'lmn-block-price__price',
	} ],
	[ 'lumen/text', {
		text: '.00', htmlTag: 'span', innerTextTag: 'span',
	} ],
]

const Edit = props => {
	const {
		className,
		attributes,
	} = props

	const rowClass = getRowClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-price',
		rowClass,
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
			<InspectorControls />

			{ blockCss && <style key="block-css">{ blockCss }</style> }

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<InnerBlocks
					template={ TEMPLATE }
					templateLock="all"
				/>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs />

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

// Disable bottom margins for child blocks.
addFilter( 'lumen.edit.margin-bottom.enable-handlers', 'lumen/price', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/price' ? false : enabled
} )

// Disable columns for child text blocks.
addFilter( 'lumen.text.edit.enable-column', 'lumen/price', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/price' ? false : enabled
} )

// Add custom text placeholders
addFilter( 'lumen.text.edit.placeholder', 'lumen/price', ( placeholder, {
	parentBlock, isFirstBlock, isLastBlock,
} ) => {
	if ( parentBlock?.name !== 'lumen/price' ) {
		return placeholder
	}

	if ( isFirstBlock ) {
		return '$'
	}

	if ( isLastBlock ) {
		return '.00'
	}

	return '100'
} )

