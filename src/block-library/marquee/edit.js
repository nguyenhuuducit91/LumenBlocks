/**
 * Internal dependencies
 */
import blockStyles from './style'
import { getMarqueeClasses } from './classes'

/**
 * External dependencies
 */
import { i18n, version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	AdvancedRangeControl,
	AdvancedToggleControl,
	AdvancedToolbarControl,
	InspectorBottomTip,
	InspectorLayoutControls,
	InspectorStyleControls,
	InspectorTabs,
	PanelAdvancedSettings,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	Advanced,
	Alignment,
	BlockDiv,
	ConditionalDisplay,
	ContentAlign,
	CustomAttributes,
	EffectsAnimations,
	MarginBottom,
	Responsive,
	Transform,
	getAlignmentClasses,
	getContentAlignmentClasses,
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
import { __ } from '@wordpress/i18n'

const ButtonBlockAppender = memo( props => {
	return <InnerBlocks.ButtonBlockAppender { ...props } />
} )

const DIRECTION_CONTROLS = [
	{
		value: '',
		title: __( 'Left', i18n ),
	},
	{
		value: 'right',
		title: __( 'Right', i18n ),
	},
]

const Edit = props => {
	const {
		className,
		clientId,
	} = props

	const hasInnerBlocks = useSelect( select => {
		return select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0
	}, [ clientId ] )

	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-marquee',
	], getMarqueeClasses( props.attributes ) )

	const groupClassNames = classnames( [
		'lmn-block-marquee__group',
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
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
			<InspectorControls
				marqueeFade={ props.attributes.marqueeFade }
				setAttributes={ props.setAttributes }
			/>
			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				{ blockCss && <style key="block-css">{ blockCss }</style> }

				{ /*
				  * The editor shows one set of the items, standing still.
				  *
				  * A marquee only looks seamless because the same items are
				  * repeated until they are wider than the screen, and those
				  * repeats are made on the frontend from the saved markup —
				  * inner blocks cannot be serialised twice into one block
				  * without breaking its validation. Animating the single set
				  * that does exist here would show it slide off and jump back,
                  * which is not what the block does; and a row of items moving
				  * under the pointer is not a row anybody can edit.
				  */ }
				<div className="lmn-block-marquee__viewport">
					<div className="lmn-block-marquee__track">
						<div className={ groupClassNames }>
							<InnerBlocks
								orientation="horizontal"
								templateLock={ false }
								renderAppender={ hasInnerBlocks ? undefined : ButtonBlockAppender }
							/>
						</div>
					</div>
				</div>
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

// Inspector controls for the block, it's important that we only pass only the
// props used by controls to prevent rerenders of all the inspector controls.
const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<InspectorLayoutControls>
				<AdvancedToolbarControl
					label={ __( 'Scroll Direction', i18n ) }
					controls={ DIRECTION_CONTROLS }
					attribute="marqueeDirection"
					fullwidth={ true }
					isSmall={ true }
				/>

				<AdvancedRangeControl
					label={ __( 'Scroll Duration', i18n ) }
					attribute="marqueeDuration"
					min={ 1 }
					sliderMax={ 60 }
					step={ 1 }
					placeholder="20"
					help={ __( 'Seconds for one set of your items to travel past. A longer set at the same duration moves faster.', i18n ) }
				/>

				<AdvancedRangeControl
					label={ __( 'Gap', i18n ) }
					attribute="marqueeGap"
					responsive="all"
					units={ [ 'px', 'rem', 'vw', 'custom' ] }
					min={ [ 0, 0, 0 ] }
					sliderMax={ [ 200, 12, 20 ] }
					placeholder="32"
					help={ __( 'Spaces the items, and spaces each repeat of them from the next.', i18n ) }
				/>

				<AdvancedToggleControl
					label={ __( 'Pause on Hover', i18n ) }
					attribute="marqueePauseOnHover"
					defaultValue={ true }
				/>
			</InspectorLayoutControls>

			<Alignment.InspectorControls hasBlockAlignment={ true } />
			<ContentAlign.InspectorControls />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<InspectorStyleControls>
				<PanelAdvancedSettings
					attribute="marqueeFade"
					title={ __( 'Fade Edges', i18n ) }
					id="marquee-fade"
					hasToggle={ true }
					checked={ props.marqueeFade }
					onChange={ marqueeFade => props.setAttributes( { marqueeFade } ) }
				>
					<AdvancedRangeControl
						label={ __( 'Fade Width', i18n ) }
						attribute="marqueeFadeWidth"
						responsive="all"
						min={ 0 }
						sliderMax={ 300 }
						placeholder="64"
						help={ __( 'How far in from each end the items fade out instead of being cut off.', i18n ) }
					/>
				</PanelAdvancedSettings>

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
