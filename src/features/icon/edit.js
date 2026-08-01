/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * Internal dependencies
 */
import {
	InspectorStyleControls,
	PanelAdvancedSettings,
	AdvancedToolbarControl,
	ColorPaletteControl,
	IconControl,
	AdvancedSelectControl,
	AdvancedRangeControl,
	AdvancedToggleControl,
	FourRangeControl,
} from '~lumen/ui'
import { getAttrNameFunction } from '~lumen/utils'
import {
	useBlockAttributesContext, useBlockSetAttributesContext, useBlockLayoutDefaults,
} from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Fragment, useMemo } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks'
import { dispatch } from '@wordpress/data'

/**
 * The shapes that can sit behind an icon.
 *
 * The same three the plugin ships for image masks; a site that adds its own
 * through `lumen.image.shape.svgs` gets them here too.
 */
const BACKGROUND_SHAPES = [
	{ value: '', label: __( 'Blob', i18n ) },
	{ value: 'circle', label: __( 'Circle', i18n ) },
	{ value: 'square', label: __( 'Square', i18n ) },
]

export const Edit = props => {
	const {
		hasShape,
		hasIconGap,
		hasIconPosition,
		hideControlsIfIconIsNotSet = false,
		iconSizeProps = {},
		iconControlHelp,
		initialOpen,
		hasGradient,
		hasShapeGradient,
		wrapInPanels = true,
		responsive = 'all',
		hover = 'all',
		defaultValue,
		onChangeIcon,
		iconGapPlaceholder = '0',
		iconSizePlaceholderName = 'icon-size',
		attrNameTemplate,
	} = props

	const attributeName = getAttrNameFunction( attrNameTemplate )

	const PremiumColorControls = useMemo( () => applyFilters( 'lumen.block-component.icon.color-controls', null ), [] )
	const PremiumShapeColorControls = useMemo( () => applyFilters( 'lumen.block-component.icon.shape-color-controls', null ), [] )
	const PremiumBackgroundShapeControls = useMemo( () => applyFilters( 'lumen.block-component.icon.edit.background-shape', null ), [] )

	const attributes = useBlockAttributesContext( attributes => {
		return {
			icon: attributes.icon,
			iconColorType: attributes.iconColorType,
			shapeColorType: attributes.shapeColorType,
			showBackgroundShape: attributes.showBackgroundShape,
		}
	} )
	const setAttributes = useBlockSetAttributesContext()
	const { getPlaceholder } = useBlockLayoutDefaults()

	const showIconControl = hideControlsIfIconIsNotSet ? !! attributes.icon : true

	/*
	 * Gradient has always generated correct CSS — `style.js` writes the two
	 * stops and the direction into the `<linearGradient>` this feature already
	 * renders — but it was not offered as a choice. Multi-colour is deliberately
	 * still absent: nothing generates per-path colours, so listing it would put
	 * ten colour pickers in front of an author and change nothing on the page.
	 */
	const filteredColorTypes = applyFilters( 'lumen.block-component.icon.color-types', [
		{
			value: '',
			title: __( 'Single', i18n ),
		},
		...( hasGradient ? [ {
			value: 'gradient',
			title: __( 'Gradient', i18n ),
		} ] : [] ),
	], props )

	const filteredShapeColorTypes = applyFilters( 'lumen.block-component.icon.shape-color-types', [
		{
			value: '',
			title: __( 'Single', i18n ),
		},
		...( hasShapeGradient ? [ {
			value: 'gradient',
			title: __( 'Gradient', i18n ),
		} ] : [] ),
	], props )

	const iconControls = (
		<>
			<IconControl
				label={ applyFilters( 'lumen.block-component.icon.label', __( 'Icon', i18n ) ) }
				value={ attributes.icon }
				defaultValue={ defaultValue }
				onChange={ icon => {
					dispatch( 'lumen/page-icons' ).removePageIcon( attributes.icon )

					if ( onChangeIcon ) {
						onChangeIcon( icon )
					} else {
						setAttributes( { icon } )
					}
				} }
				help={ iconControlHelp }
				hasPanelModifiedIndicator={ false }
			/>

			{ props.children }

			{ applyFilters( 'lumen.block-component.icon.after', null ) }

			{ filteredColorTypes.length > 1 && (
				<AdvancedToolbarControl
					controls={ filteredColorTypes }
					isSmall={ true }
					fullwidth={ false }
					attribute="iconColorType"
				/>
			) }

			{ /* { showIconControl && colorControls } */ }
			{ showIconControl && (
				<>
					{ ( attributes.iconColorType || '' ) === '' && (
						<ColorPaletteControl
							label={ __( 'Icon Color', i18n ) }
							attribute={ attributeName( 'iconColor1' ) }
							hover={ hover }
						/>
					) }
					{ ( attributes.iconColorType || '' ) === 'gradient' && (
						<>
							<ColorPaletteControl
								label={ __( 'Icon Color #1', i18n ) }
								attribute={ attributeName( 'iconColor1' ) }
								hover={ hover }
							/>
							<ColorPaletteControl
								label={ __( 'Icon Color #2', i18n ) }
								attribute={ attributeName( 'iconColor2' ) }
								hover={ hover }
							/>
							<AdvancedRangeControl
								label={ __( 'Gradient Direction (degrees)', i18n ) }
								attribute={ attributeName( 'iconColorGradientDirection' ) }
								min={ 0 }
								max={ 360 }
								step={ 10 }
								allowReset={ true }
								placeholder="0"
								hover={ hover }
							/>
						</>
					) }
					{ PremiumColorControls && <PremiumColorControls { ...props } /> }
				</>
			) }

			{ showIconControl && <AdvancedRangeControl
				label={ __( 'Icon Size', i18n ) }
				attribute="iconSize"
				min={ 0 }
				sliderMax={ 100 }
				step={ 1 }
				allowReset={ true }
				placeholder={ getPlaceholder( iconSizePlaceholderName ) || '' }
				responsive={ responsive }
				{ ...iconSizeProps }
			/> }

			{ showIconControl && <AdvancedRangeControl
				label={ __( 'Icon Opacity', i18n ) }
				attribute="iconOpacity"
				min={ 0 }
				max={ 1 }
				step={ 0.1 }
				allowReset={ true }
				placeholder="1.0"
				hover={ hover }
			/> }

			{ showIconControl && <AdvancedRangeControl
				label={ __( 'Icon Rotation', i18n ) }
				attribute="iconRotation"
				min={ 0 }
				max={ 360 }
				allowReset={ true }
				placeholder="0"
				hover={ hover }
			/> }

			{ hasIconPosition && (
				<AdvancedSelectControl
					label={ __( 'Icon Position', i18n ) }
					attribute="iconPosition"
					options={ [
						{ value: '', label: __( 'Left', i18n ) },
						{ value: 'right', label: __( 'Right', i18n ) },
					] }
				/>
			) }

			{ hasIconGap && (
				<AdvancedRangeControl
					label={ __( 'Icon Gap', i18n ) }
					attribute="iconGap"
					min={ 0 }
					sliderMax={ 50 }
					allowReset={ true }
					placeholder={ props.iconGapPlaceholderName ? getPlaceholder( props.iconGapPlaceholderName ) : iconGapPlaceholder }
				/>
			) }
		</>
	)

	const iconShapeControls = (
		<>
			{ filteredShapeColorTypes.length > 1 && (
				<AdvancedToolbarControl
					controls={ filteredShapeColorTypes }
					isSmall={ true }
					fullwidth={ false }
					attribute="shapeColorType"
				/>
			) }

			{ ( attributes.shapeColorType || '' ) === '' && (
				<ColorPaletteControl
					label={ __( 'Shape Color', i18n ) }
					attribute="shapeColor1"
					hover="all"
				/>
			) }
			{ ( attributes.shapeColorType || '' ) === 'gradient' && (
				<>
					<ColorPaletteControl
						label={ __( 'Shape Color #1', i18n ) }
						attribute="shapeColor1"
						hover="all"
					/>
					<ColorPaletteControl
						label={ __( 'Shape Color #2', i18n ) }
						attribute="shapeColor2"
						hover="all"
					/>
					<AdvancedRangeControl
						label={ __( 'Gradient Direction (degrees)', i18n ) }
						attribute="shapeColorGradientDirection"
						min={ 0 }
						max={ 360 }
						step={ 10 }
						allowReset={ true }
						placeholder="0"
						hover="all"
					/>
				</>
			) }
			{ PremiumShapeColorControls && <PremiumShapeColorControls { ...props } /> }

			<AdvancedRangeControl
				label={ __( 'Shape Border Radius', i18n ) }
				attribute="shapeBorderRadius"
				hover={ hover }
				min={ 0 }
				sliderMax={ 100 }
				step={ 1 }
				allowReset={ true }
				placeholder={ 50 }
			/>

			<AdvancedRangeControl
				label={ __( 'Shape Padding', i18n ) }
				attribute="shapePadding"
				min={ 0 }
				sliderMax={ 150 }
				step={ 1 }
				allowReset={ true }
				placeholder={ 20 }
			/>

			<FourRangeControl
				label={ __( 'Shape Outline Width', i18n ) }
				units={ [ 'px' ] }
				min={ 0 }
				step={ 1 }
				sliderMax={ 20 }
				defaultLocked={ true }
				attribute="shapeOutlineWidth"
				responsive={ responsive }
				default="1"
			/>

			<ColorPaletteControl
				label={ __( 'Shape Outline Color', i18n ) }
				attribute="shapeOutlineColor"
				hover={ hover }
			/>
		</>
	)

	/*
	 * A shape drawn behind the icon. Everything except these controls already
	 * existed — the SVG was rendered, the stylesheet positioned it, and seven
	 * attributes were declared for it; only the panel was an advertisement.
	 * The shapes on offer are the three the plugin ships, shared with the image
	 * mask control, and can be added to through `lumen.image.shape.svgs`.
	 */
	const iconBackgroundShapeControls = (
		<>
			<AdvancedToggleControl
				label={ __( 'Show Background Shape', i18n ) }
				attribute="showBackgroundShape"
			/>

			{ attributes.showBackgroundShape && (
				<>
					<AdvancedSelectControl
						label={ __( 'Shape', i18n ) }
						attribute="backgroundShape"
						options={ BACKGROUND_SHAPES }
					/>

					<ColorPaletteControl
						label={ __( 'Shape Color', i18n ) }
						attribute="backgroundShapeColor"
						hover="all"
					/>

					<AdvancedRangeControl
						label={ __( 'Shape Opacity', i18n ) }
						attribute="backgroundShapeOpacity"
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
						allowReset={ true }
						placeholder="1.0"
						hover="all"
					/>

					<AdvancedRangeControl
						label={ __( 'Shape Size', i18n ) }
						attribute="backgroundShapeSize"
						min={ 50 }
						max={ 300 }
						step={ 5 }
						allowReset={ true }
						placeholder="100"
						help={ __( 'Per cent of the icon.', i18n ) }
					/>

					<AdvancedRangeControl
						label={ __( 'Horizontal Offset', i18n ) }
						attribute="backgroundShapeOffsetHorizontal"
						min={ -50 }
						max={ 50 }
						allowReset={ true }
						placeholder="0"
					/>

					<AdvancedRangeControl
						label={ __( 'Vertical Offset', i18n ) }
						attribute="backgroundShapeOffsetVertical"
						min={ -50 }
						max={ 50 }
						allowReset={ true }
						placeholder="0"
					/>
				</>
			) }
		</>
	)

	const Wrapper = wrapInPanels ? InspectorStyleControls : Fragment

	return (
		<Wrapper>
			{ wrapInPanels
				? <PanelAdvancedSettings title={ __( 'Icon', i18n ) } id="icon" initialOpen={ initialOpen }>{ iconControls }</PanelAdvancedSettings>
				: iconControls
			}
			{ hasShape && ( wrapInPanels
				? <PanelAdvancedSettings title={ __( 'Icon Shape', i18n ) } id="icon-shape" >{ iconShapeControls }</PanelAdvancedSettings>
				: iconShapeControls
			) }

			{ props.hasBackgroundShape &&
				<>
					{ wrapInPanels
						? (
							<PanelAdvancedSettings
								title={ __( 'Background Shape', i18n ) }
								id="icon-background-shape"
								showModifiedIndicator={ !! attributes.showBackgroundShape }
							>
								{ iconBackgroundShapeControls }
							</PanelAdvancedSettings>
						)
						: iconBackgroundShapeControls
					}

					{ PremiumBackgroundShapeControls && <PremiumBackgroundShapeControls { ...props } /> }
				</>
			}
		</Wrapper>
	)
}

Edit.defaultProps = {
	label: __( 'Icon', i18n ),
	hasColor: true,
	hasGradient: true,
	hasShape: true,
	hasShapeGradient: true,
	hasBackgroundShape: true,
	initialOpen: false,
	hasIconGap: false,
	hasIconPosition: false,
	hasMultiColor: false,
	defaultValue: '',
	onChangeIcon: null,
	attrNameTemplate: '%s',
}
