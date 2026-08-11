/**
 * Internal dependencies
 */
import blockStyles from './style'

/***
 * External dependencies
 */
import classnames from 'classnames'
import { i18n, version as VERSION } from 'lumen'
import {
	InspectorTabs,
	InspectorStyleControls,
	PanelAdvancedSettings,
	AdvancedRangeControl,
	AdvancedToggleControl,
	IconControl,
	ColorPaletteControl,
	AdvancedToolbarControl,
	AdvancedSelectControl,
	AlignButtonsControl,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	withBlockAttributeContext, withBlockStyleContext,
	withBlockWrapperIsHovered, withQueryLoopContext,
} from '~lumen/hoc'
import {
	Typography,
	BlockDiv,
	Advanced,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	getTypographyClasses,
	ConditionalDisplay,
	MarginBottom,
	Alignment,
	getAlignmentClasses,
	Transform,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { sprintf, __ } from '@wordpress/i18n'
import { DEFAULT_SVG, IconSvgDef } from './util'
import { compose } from '@wordpress/compose'
import { useInnerBlocksProps } from '@wordpress/block-editor'
import { dispatch, useSelect } from '@wordpress/data'
import { addFilter } from '@wordpress/hooks'
import { memo } from '@wordpress/element'
import { useBlockLayoutDefaults } from '~lumen/hooks'
import { ToggleControl } from '@wordpress/components'

const ALLOWED_INNER_BLOCKS = [ 'lumen/icon-list-item' ]

const TEMPLATE = [
	[ 'lumen/icon-list-item', {	text: '' } ],
]

const listTypeOptions = [
	{
		label: __( 'Unordered List', i18n ),
		value: 'unordered',
	},
	{
		label: __( 'Ordered List', i18n ),
		value: 'ordered',
	},
]

const listDisplayOptions = [
	{
		label: __( 'List', i18n ), // uses  display: block & column-count
		value: '',
	},
	{
		label: __( 'Grid', i18n ), // uses display: grid & grid template columns
		value: 'grid',
	},
]

const listStyleTypeOptions = [
	{
		label: __( 'Number', i18n ),
		value: 'decimal',
	},
	{
		label: __( 'Padded Number', i18n ),
		value: 'decimal-leading-zero',
	},
	{
		label: __( 'Lowercase Roman', i18n ),
		value: 'lower-roman',
	},
	{
		label: __( 'Uppercase Roman', i18n ),
		value: 'upper-roman',
	},
	{
		label: __( 'Lowercase Letters', i18n ),
		value: 'lower-alpha',
	},
	{
		label: __( 'Uppercase Letters', i18n ),
		value: 'upper-alpha',
	},
]

const BORDER_CONTROLS = [
	{
		value: '',
		title: __( 'None', i18n ),
	},
	{
		value: 'solid',
		title: __( 'Solid', i18n ),
	},
	{
		value: 'dashed',
		title: __( 'Dashed', i18n ),
	},
	{
		value: 'dotted',
		title: __( 'Dotted', i18n ),
	},
]

const ICON_VERTICAL_ALIGN_OMIT = [ 'stretch' ]

const Edit = props => {
	const {
		attributes,
		setAttributes,
		className,
	} = props

	const {
		ordered,
		icon,
		listItemBorderStyle,
		listItemBorderColor,
		listDisplayStyle,
		listFullWidth,
		useCustomIconColor,
	} = attributes

	const wrapList = ! listFullWidth && listDisplayStyle !== 'grid'
	const TagName = ordered ? 'ol' : 'ul'
	const ParentTagName = wrapList ? 'div' : TagName

	const textClasses = getTypographyClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )
	const { innerBlocks } = useSelect( select => {
		const { getBlock } = select( 'core/block-editor' )
		return {
			innerBlocks: getBlock( props.clientId ).innerBlocks,
		}
	}, [ props.clientId ] )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-list',
		blockAlignmentClass,
		textClasses,
	], {
		'lmn__use-custom-icon-color': useCustomIconColor,
	} )

	const tagNameClassNames = classnames( [
		ordered ? 'lmn-block-icon-list__ol' : 'lmn-block-icon-list__ul',
		listDisplayStyle && listDisplayStyle === 'grid' ? 'lmn-block-icon-list--grid' : 'lmn-block-icon-list--column',
	] )

	const resetCustomIcons = () => {
		innerBlocks.forEach( block => {
			dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, { icon: '' } )
		} )
	}

	const innerBlocksProps = useInnerBlocksProps( {
		className: tagNameClassNames,
	}, {
		allowedBlocks: ALLOWED_INNER_BLOCKS,
		template: TEMPLATE,
		templateInsertUpdatesSelection: true,
		renderAppender: false,
		__experimentalCaptureToolbars: true,
	} )

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
				blockState={ props.blockState }
				setAttributes={ setAttributes }
				columns={ attributes.columns }
				ordered={ ordered }
				icon={ icon }
				listFullWidth={ listFullWidth }
				listItemBorderStyle={ listItemBorderStyle }
				listItemBorderColor={ listItemBorderColor }
				resetCustomIcons={ resetCustomIcons }
				useCustomIconColor={ useCustomIconColor }
			/>

			{ blockCss && <style key="block-css">{ blockCss }</style> }

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				{ ! ordered && <IconSvgDef icon={ icon } uniqueId={ attributes.uniqueId } /> }
				<ParentTagName className={ tagNameClassNames } >
					{ wrapList &&
						<TagName className="lmn-block-icon-list__group">
							{ innerBlocksProps.children }
						</TagName>
					}
					{ ! wrapList && innerBlocksProps.children }
				</ParentTagName>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	const { getPlaceholder } = useBlockLayoutDefaults()
	return (
		<>
			<InspectorTabs hasLayoutPanel={ false } />
			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'General', i18n ) }
					initialOpen={ true }
					id="general"
				>
					<AlignButtonsControl
						label={ sprintf( __( '%s Alignment', i18n ), __( 'List Item', i18n ) ) }
						attribute="listAlignment"
						responsive="all"
					/>
					<AdvancedToggleControl
						label={ __( 'Full Width', i18n ) }
						attribute="listFullWidth"
						defaultValue={ true }
						help={ __( 'More noticeable when using wide layouts or list item borders', i18n ) }
					/>
					{ ! props.listFullWidth && (
						<AlignButtonsControl
							label={ sprintf( __( '%s Alignment', i18n ), __( 'List', i18n ) ) }
							attribute="contentAlign"
							responsive="all"
							justified={ false }
						/>
					) }

					<AdvancedRangeControl
						label={ __( 'Columns', i18n ) }
						attribute="columns"
						min="1"
						sliderMax="4"
						step="1"
						placeholder="1"
						responsive="all"
					/>

					{ props.columns > 1 && (
						<AdvancedSelectControl
							label={ __( 'List Display Style', i18n ) }
							options={ listDisplayOptions }
							attribute="listDisplayStyle"
						/>
					) }

					{ props.columns > 1 && (
						<AdvancedRangeControl
							label={ __( 'Column Gap', i18n ) }
							attribute="columnGap"
							min="0"
							sliderMax="50"
							responsive="all"
							placeholder="16"
						/>
					) }

					<AdvancedRangeControl
						label={ __( 'Row Gap', i18n ) }
						attribute="rowGap"
						min="0"
						sliderMax="50"
						responsive="all"
						placeholder={ getPlaceholder( 'icon-list-row-gap' ) }
					/>

					<AdvancedRangeControl
						label={ __( 'Icon Gap', i18n ) }
						attribute="iconGap"
						min="0"
						sliderMax="20"
						responsive="all"
						placeholder={ getPlaceholder( 'icon-list-icon-gap' ) }
					/>

					<AdvancedRangeControl
						label={ __( 'Indentation', i18n ) }
						attribute="indentation"
						min="0"
						sliderMax="50"
						responsive="all"
						placeholder={ getPlaceholder( 'icon-list-indentation' ) }
					/>

				</PanelAdvancedSettings>
			</InspectorStyleControls>

			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'Icons & Numbers', i18n ) }
					initialOpen={ false }
					id="icon-and-markers"
				>
					<AdvancedSelectControl
						label={ __( 'List Type', i18n ) }
						options={ listTypeOptions }
						value={ props.ordered ? 'ordered' : 'unordered' }
						onChange={ v => props.setAttributes( { ordered: v === 'ordered' } ) }
						default="unordered"
					/>

					{ ! props.ordered && <>
						<IconControl
							label={ __( 'Icon', i18n ) }
							value={ props.icon }
							onChange={ icon => {
								props.setAttributes( { icon } )
								// Reset custom individual icons.
								props.resetCustomIcons()
							} }
							defaultValue={ DEFAULT_SVG }
						/>

						<ToggleControl
							className="lmn-control--attr-useCustomIconColor"
							label={ __( 'Use Custom Icon Color', i18n ) }
							checked={ props.useCustomIconColor }
							onChange={ useCustomIconColor => props.setAttributes( { useCustomIconColor } ) }
						/>
					</> }

					{ props.ordered && (
						<AdvancedSelectControl
							label={ __( 'List Type', i18n ) }
							attribute="listType"
							options={ listStyleTypeOptions }
						/>
					) }

					{ props.ordered && (
						<AdvancedToggleControl
							label={ __( 'With Period', i18n ) }
							attribute="hasPeriod"
							defaultValue={ true }
						/>
					) }

					<ColorPaletteControl
						label={ __( 'Color', i18n ) }
						attribute="markerColor"
						hover="all"
					/>

					<AdvancedRangeControl
						label={ sprintf( __( '%s Size', i18n ), ! props.ordered ? __( 'Icon', i18n ) : __( 'Number', i18n ) ) }
						attribute="iconSize"
						min={ 0 }
						max={ 50 }
						step={ 1 }
						allowReset={ true }
						responsive="all"
						placeholder={ getPlaceholder( 'icon-list-icon-size' ) }
					/>

					<AdvancedRangeControl
						label={ __( 'Icon Opacity', i18n ) }
						attribute="iconOpacity"
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
						allowReset={ true }
						placeholder="1.0"
						hover="all"
					/>

					<AdvancedRangeControl
						label={ __( 'Icon Rotation', i18n ) }
						attribute="iconRotation"
						min={ 0 }
						max={ 360 }
						allowReset={ true }
						placeholder="0"
					/>

					<AdvancedToolbarControl
						label={ __( 'Icon Vertical Alignment', i18n ) }
						controls="flex-vertical"
						omit={ ICON_VERTICAL_ALIGN_OMIT }
						attribute="iconVerticalAlignment"
						fullwidth={ true }
						responsive="all"
						help={ __( 'This is more visible if you have long text in your list.', i18n ) }
						placeholder="center"
					/>

					<AdvancedRangeControl
						label={ __( 'Icon Vertical Offset', i18n ) }
						attribute="iconVerticalOffset"
						min={ -1000 }
						sliderMin={ -50 }
						sliderMax={ 50 }
						step={ 1 }
						allowReset={ true }
						responsive="all"
						placeholder="0"
					/>
				</PanelAdvancedSettings>

				<PanelAdvancedSettings
					title={ __( 'Icon List Item Borders', i18n ) }
					initialOpen={ false }
					id="icon-list-item-borders"
				>
					<AdvancedToolbarControl
						label={ __( 'Borders', i18n ) }
						controls={ BORDER_CONTROLS }
						className="lmb-border-controls__border-type-toolbar"
						attribute="listItemBorderStyle"
						fullwidth={ true }
						isSmall={ true }
					/>

					{ props.listItemBorderStyle &&
						<AdvancedRangeControl
							label={ __( 'Border Width', i18n ) }
							attribute="listItemBorderWidth"
							responsive="all"
							min={ 0 }
							max={ 99 }
							step={ 1 }
							sliderMax={ 5 }
							defaultLocked={ true }
							placeholder="1"
						/>
					}

					{ props.listItemBorderStyle &&
						<ColorPaletteControl
							label={ __( 'Border Color', i18n ) }
							attribute="listItemBorderColor"
							value={ props.listItemBorderColor ? props.listItemBorderColor : '#00000066' }
							default="#00000066"
						/>
					}

				</PanelAdvancedSettings>
			</InspectorStyleControls>

			<Typography.InspectorControls
				{ ...props }
				isMultiline={ true }
				initialOpen={ false }
				hasTextTag={ false }
				hasTextContent={ false }
			/>

			<Alignment.InspectorControls
				enableContentAlign={ false }
			/>
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

addFilter( 'lumen.edit.margin-bottom.enable-handlers', 'lumen/icon-list', ( enabled, parentBlock ) => {
	return parentBlock?.name === 'lumen/icon-list-item' ? false : enabled
} )
