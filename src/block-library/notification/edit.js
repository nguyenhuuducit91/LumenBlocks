/**
 * Internal dependencies
 */
import blockStyles from './style'
import SVGCloseIcon from './images/close-icon.svg'
import variations from './variations'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'lumen'
import { last } from 'lodash'
import classnames from 'classnames'
import {
	AdvancedRangeControl,
	ColorPaletteControl,
	InspectorStyleControls,
	InspectorTabs,
	PanelAdvancedSettings,
	AdvancedSelectControl,
	InspectorBottomTip,
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
	BlockLink,
	Transform,
	ContentAlign,
	getContentAlignmentClasses,
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
import { useSelect } from '@wordpress/data'

const TEMPLATE = variations[ 0 ].innerBlocks

const Edit = props => {
	const {
		className,
		attributes,
		setAttributes,
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
		'lmn-block-notification',
	], {
		'lmn--is-dismissible': attributes.isDismissible,
		[ `lmn--is-${ props.attributes.notificationType }` ]: props.attributes.notificationType,
	} )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-notification__content',
		`lmn-${ attributes.uniqueId }-inner-blocks`,
	], getContentAlignmentClasses( attributes ) )

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
			<InspectorControls setAttributes={ setAttributes } isDismissible={ attributes.isDismissible } />

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
				enableVariationPicker={ true }
			>
				{ blockCss && <style key="block-css">{ blockCss }</style> }
				<CustomCSS mainBlockClass="lmn-block-notification" />

				<ContainerDiv className={ contentClassNames }>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ renderAppender }
					/>
					{ attributes.isDismissible &&
						<span
							className="lmn-block-notification__close-button"
							role="button"
							tabIndex="0"
						>
							<SVGCloseIcon
								width={ attributes.dismissibleSize || 16 }
								height={ attributes.dismissibleSize || 16 }
							/>
						</span>
					}
				</ContainerDiv>
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<ContentAlign.InspectorControls />
			<Alignment.InspectorControls hasContainerSize={ true } hasBlockAlignment={ true } />

			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'General', i18n ) }
					id="general"
					initialOpen={ true }
				>
					<AdvancedSelectControl
						label={ __( 'Notification Type', i18n ) }
						attribute="notificationType"
						options={ [
							{
								label: __( 'Success', i18n ),
								value: '',
							},
							{
								label: __( 'Error', i18n ),
								value: 'error',
							},
							{
								label: __( 'Warning', i18n ),
								value: 'warning',
							},
							{
								label: __( 'Information', i18n ),
								value: 'info',
							},
						] }
					/>
				</PanelAdvancedSettings>
				<PanelAdvancedSettings
					title={ __( 'Dismissible', i18n ) }
					id="dismissible"
					hasToggle={ true }
					checked={ props.isDismissible }
					onChange={ value => props.setAttributes( { isDismissible: value } ) }
				>
					<AdvancedRangeControl
						label={ __( 'Icon Size', i18n ) }
						attribute="dismissibleSize"
						min="0"
						sliderMax="50"
						step="1"
						placeholder="16"
					/>
					<ColorPaletteControl
						label={ __( 'Icon Color', i18n ) }
						attribute="dismissibleColor"
					/>
				</PanelAdvancedSettings>
			</InspectorStyleControls>

			<BlockDiv.InspectorControls />
			<ContainerDiv.InspectorControls sizeSelector=".lmn-block-content" />
			<BlockLink.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<CustomCSS.InspectorControls mainBlockClass="lmn-block-notification" />
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

// Prevent the text from being being styled with a saved default style.
addFilter( 'lumen.block-default-styles.use-saved-style', 'lumen/notification', ( enabled, block, parentBlockNames ) => {
	if ( block.name === 'lumen/icon' && parentBlockNames.length >= 1 && parentBlockNames[ parentBlockNames.length - 1 ] === 'lumen/notification' ) {
		return false
	}
	return enabled
} )
