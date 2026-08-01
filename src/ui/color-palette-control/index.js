/**
 * Internal dependencies
 */
import AdvancedControl, { extractControlProps } from '../base-control2'
import { ResetButton } from '../base-control2/reset-button'
import { useControlHandlers } from '../base-control2/hooks'
import { ColorPalettePopup } from './color-palette-popup'

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n'
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor'
import { memo } from '@wordpress/element'
import {
	Button,
	ColorIndicator,
	Dropdown,
	FlexItem,
	__experimentalHStack as HStack, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components'
import { useSelect, select } from '@wordpress/data'
import { applyFilters, addFilter } from '@wordpress/hooks'

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash'
import { i18n } from 'lumen'
import classnames from 'classnames'
import { useBlockColorSchemes } from '~lumen/hooks'

const popoverProps = {
	placement: 'left-start',
	offset: 36,
	shift: true,
}

const PASSTHRUOP = v => v

addFilter( 'lumen.color-palette-control.colors', 'lumen/global-color-schemes-color-palette-control', ( { colors: _colors, gradients: _gradients } ) => {
	// Get colors from the color schemes.
	const { getColorGroups } = useBlockColorSchemes()
	const { colorSchemeColors, colorSchemeGradients } = getColorGroups()

	let colors = cloneDeep( _colors )
	let gradients = cloneDeep( _gradients )

	gradients = [
		...colorSchemeGradients,
		...gradients,
	]

	colors = [
		...colorSchemeColors,
		..._colors,
	]

	return { colors, gradients }
} )

addFilter( 'lumen.color-palette-control.colors', 'lumen/color-palette-control', ( { colors: _colors, gradients: _gradients } ) => {
	const {
		lumenColors,
		lumenGradients,
	} = select( 'lumen/global-colors' ).getSettings()

	let colors = cloneDeep( _colors )
	let gradients = cloneDeep( _gradients )

	if ( lumenGradients && lumenGradients.length ) {
		gradients = [
			{
				name: __( 'Global Gradients', i18n ),
				gradients: cloneDeep( lumenGradients ),
				id: 'lmn-global-gradients',
			},
			...gradients,
		]
	}
	if ( lumenColors && lumenColors.length ) {
		colors = [
			{
				name: __( 'Global Colors', i18n ),
				colors: cloneDeep( lumenColors ),
				id: 'lmn-global-colors',
			},
			...colors,
		]
	}

	return { colors, gradients }
} )

addFilter( 'lumen.color-palette-control.color-value', 'lumen/color-palette-control', value => {
	if ( typeof value === 'string' && value.includes( '--lmn-global-color' ) && value.match( /#[\d\w]{6,}/ ) ) {
		return value.match( /#[\d\w]{6,}/ )[ 0 ]
	}
	return value
} )

const ColorPaletteControl = memo( props => {
	const {
		label,
		className = '',
	} = props
	const [ _value, _onChange ] = useControlHandlers( props.attribute, props.responsive, props.hover, props.valueCallback, props.changeCallback )
	const [ _propsToPass, controlProps ] = extractControlProps( props )

	const {
		hideThemeColors,
		hideDefaultColors,
		hideSiteEditorColors,
	} = useSelect( 'lumen/global-colors' ).getSettings()

	let { colors, gradients } = applyFilters( 'lumen.color-palette-control.colors', useMultipleOriginColorsAndGradients() )

	// Filter the colors.
	colors = colors.filter( group => {
		// Since there are no identifying properties for the groups, we'll just use the same names used in Gutenberg.
		if ( hideThemeColors && group.name === _x( 'Theme', 'Indicates this palette comes from the theme.' ) ) {
			return false
		}

		if ( hideDefaultColors && group.name === _x( 'Default', 'Indicates this palette comes from WordPress.' ) ) {
			return false
		}

		if ( hideSiteEditorColors && group.name === _x( 'Custom', 'Indicates this palette comes from the theme.' ) ) {
			return false
		}

		return true
	} )
	gradients = gradients.filter( group => {
		// Since there are no identifying properties for the groups, we'll just use the same names used in Gutenberg.
		if ( hideThemeColors && group.name === _x( 'Theme', 'Indicates this palette comes from the theme.' ) ) {
			return false
		}

		if ( hideDefaultColors && group.name === _x( 'Default', 'Indicates this palette comes from WordPress.' ) ) {
			return false
		}

		if ( hideSiteEditorColors && group.name === _x( 'Custom', 'Indicates this palette comes from the theme.' ) ) {
			return false
		}

		return true
	} )

	const allColors = ( [ ...colors, ...gradients ] ).reduce( ( colors, group ) => {
		return [
			...colors,
			...( group.colors || group.gradients ),
		]
	}, [] )

	let value = typeof props.value === 'undefined' ? _value : props.value
	const onChange = typeof props.onChange === 'undefined' ? _onChange : props.onChange

	value = applyFilters( 'lumen.color-palette-control.color-value', value )

	let colorLabel,
		colorName = value,
		popupPickerValue = value // We assign a value to this so that the popup picker will show a "check" on the selected color.

	allColors.some( color => {
		if ( color.color === value || color.gradient === value ) {
			colorName = color.name
			colorLabel = color.name
			return true
		}

		// For Lumen global colors to have a correct name label.
		if ( color.slug ) {
			if ( `var(--${ color.slug })` === value ) {
				colorName = color.name
				colorLabel = color.name
				popupPickerValue = color.color
				return true
			}
		}
		return false
	} )

	colorLabel = colorName || ( value === 'transparent' ? 'Transparent' : value )

	const toggleSettings = {
		colorValue: value,
		label: props.colorLabel || colorLabel,
		additionalToggleProps: props.additionalToggleProps,
	}

	const colorPalette = (
		<ColorPalettePopup
			value={ popupPickerValue }
			onChange={ onChange }
			preOnChange={ props.preOnChange }
			colors={ props.isGradient ? gradients : colors }
			isGradient={ props.isGradient }
			hasGradientPicker={ props.hasGradientPicker }
			enableGradient={ props.hasGradientPicker && props.enableGradient }
			gradients={ gradients }
		/>
	)

	return (
		<AdvancedControl
			{ ...controlProps }
			className={ classnames( [ className, 'editor-color-palette-control', 'lmn-color-palette-control' ] ) }
			label={ label }
			data-attribute={ props.attribute }
		>
			{ props.isExpanded && colorPalette }
			{ ! props.isExpanded && (
				<Dropdown
					popoverProps={ popoverProps }
					className="block-editor-tools-panel-color-gradient-settings__dropdown"
					renderToggle={ renderToggle( toggleSettings ) }
					renderContent={ () => (
						<div className="lmn-color-palette-control__popover-content">
							{ colorPalette }
						</div>
					) }
				/>
			) }
			<ResetButton
				allowReset={ props.allowReset }
				value={ value }
				default={ props.default }
				onChange={ onChange }
			/>
		</AdvancedControl>
	)
} )

ColorPaletteControl.defaultProps = {
	allowReset: true,
	default: '',

	attribute: '',

	value: undefined,
	colorLabel: undefined,
	onChange: undefined,
	preOnChange: PASSTHRUOP,
	isExpanded: false,
	isGradient: false,

	hasGradientPicker: false,
	enableGradient: false,
	additionalToggleProps: {},
}

export default ColorPaletteControl

const renderToggle =
	settings =>
		( { onToggle, isOpen } ) => {
			const {
				colorValue,
				label,
				additionalToggleProps,
			} = settings

			const toggleProps = {
				onClick: onToggle,
				className: classnames(
					'block-editor-panel-color-gradient-settings__dropdown',
					{ 'is-open': isOpen }
				),
				'aria-expanded': isOpen,
				...additionalToggleProps,
			}

			return (
				<Button { ...toggleProps }>
					<LabeledColorIndicator
						colorValue={ colorValue }
						label={ label }
					/>
				</Button>
			)
		}

const LabeledColorIndicator = ( { colorValue, label } ) => (
	<HStack justify="flex-start">
		<ColorIndicator
			className="lmn-color-indicator block-editor-panel-color-gradient-settings__color-indicator"
			colorValue={ colorValue }
		/>
		<FlexItem
			className="lmn-color-name block-editor-panel-color-gradient-settings__color-name"
			title={ label }
		>
			{ label }
		</FlexItem>
	</HStack>
)
