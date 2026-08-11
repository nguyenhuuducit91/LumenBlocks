/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'lumen'
import classnames from 'classnames'
import {
	InspectorTabs,
	InspectorStyleControls,
	PanelAdvancedSettings,
	AdvancedRangeControl,
	InspectorBottomTip,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	BlockDiv,
	MarginBottom,
	getRowClasses,
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
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'

export const TEMPLATE = [
	[ 'lumen/icon', { contentAlign: 'left' } ],
	[ 'lumen/heading', {
		text: __( 'Icon Label', i18n ), hasP: true, textTag: 'h4',
	} ],
]

const Edit = props => {
	const {
		className,
		attributes,
		clientId,
	} = props

	const rowClass = getRowClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-label',
		rowClass,
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

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<div className={ contentClassNames }>
					<InnerBlocks
						orientation="horizontal"
						template={ TEMPLATE }
						templateLock="insert"
						templateInsertUpdatesSelection={ true }
					/>
				</div>
			</BlockDiv>
			{ /* Hack, somehow the icon list doesn't have a uniqueId when it's just added, so the data-block-id isn't populated and isn't detected, this fixes that. */ }
			{ props.isHovered && <MarginBottom previewSelector={ `[data-block="${ clientId }"] > .lmn-block` } /> }
		</>
	)
}

const InspectorControls = memo( () => {
	return (
		<>
			<InspectorTabs hasLayoutPanel={ false } />

			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'General', i18n ) }
					id="general"
					initialOpen={ true }
				>
					<AdvancedRangeControl
						label={ __( 'Icon Gap', i18n ) }
						attribute="iconGap2"
						responsive="all"
						min={ 0 }
						sliderMax={ 300 }
						placeholder="28"
					/>
				</PanelAdvancedSettings>

			</InspectorStyleControls>
			<BlockDiv.InspectorControls />
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

// Disable bottom margins for child blocks.
addFilter( 'lumen.edit.margin-bottom.enable-handlers', 'lumen/icon-label', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/icon-label' ? false : enabled
} )

// Disable top and bottom line of heading block.
addFilter( 'lumen.heading.edit.top-bottom-line.enable-handlers', 'lumen/icon-label', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/icon-label' ? false : enabled
} )
