/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { version as VERSION, i18n } from 'lumen'
import {
	InspectorBlockControls, InspectorBottomTip, InspectorTabs,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	BlockDiv,
	getAlignmentClasses,
	Alignment,
	Advanced,
	CustomCSS,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	MarginBottom,
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

const TEMPLATE = [
	[ 'lumen/text', {
		text: __( 'Some short text that can be expanded to show more details.', i18n ),
		className: 'lmn-block-expand__short-text',
		customAttributes: [ [ 'aria-hidden', 'false' ] ],
	} ],
	[ 'lumen/button', {
		text: __( 'Show more', i18n ),
		linkUrl: '#',
		className: 'is-style-link lmn-block-expand__show-button',
		customAttributes: [ [ 'aria-hidden', 'false' ], [ 'role', 'button' ], [ 'aria-expanded', 'false' ] ],
	} ],
	[ 'lumen/text', {
		text: __( 'Some long text that will be expanded when the show more button is clicked by the visitor.', i18n ),
		className: 'lmn-block-expand__more-text',
		customAttributes: [ [ 'aria-hidden', 'true' ] ],
	} ],
	[ 'lumen/button', {
		text: __( 'Show less', i18n ),
		linkUrl: '#',
		className: 'is-style-link lmn-block-expand__hide-button',
		customAttributes: [ [ 'aria-hidden', 'true' ], [ 'role', 'button' ], [ 'aria-expanded', 'true' ] ],
	} ],
]

const Edit = props => {
	const {
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-expand',
	] )

	const contentClassNames = classnames( [
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-content',
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
			<CustomCSS mainBlockClass="lmn-block-expand" />

			<style>{ `.lmn-block.lmn-block-expand .lmn-block-expand__short-text::before { content: "${ __( 'Less text', i18n ) }" !important; }` }</style>
			<style>{ `.lmn-block.lmn-block-expand .lmn-block-expand__more-text::before { content: "${ __( 'More text', i18n ) }" !important; }` }</style>
			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<div className={ contentClassNames }>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock="all"
						orientation="horizontal"
					/>
				</div>
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
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-expand" />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<InspectorBlockControls>
				<InspectorBottomTip />
			</InspectorBlockControls>
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
addFilter( 'lumen.edit.margin-bottom.enable-handlers', 'lumen/expand', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/expand' ? false : enabled
} )

// Disable link for button blocks.
addFilter( 'lumen.edit.button.enable-link', 'lumen/expand', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/expand' ? false : enabled
} )

// Disable link popup for button blocks.
addFilter( 'lumen.edit.link.enable-link-popup', 'lumen/expand', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/expand' ? false : enabled
} )

// Prevent the expand block link from being being styled with a saved default style.
addFilter( 'lumen.block-default-styles.use-saved-style', 'lumen/expand', ( enabled, block, parentBlockNames ) => {
	if ( block.name === 'lumen/button' && parentBlockNames.length >= 1 && parentBlockNames[ parentBlockNames.length - 1 ] === 'lumen/expand' ) {
		return false
	}
	return enabled
} )
