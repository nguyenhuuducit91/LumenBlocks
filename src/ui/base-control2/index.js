/**
 * A better version that handles value updating, responsive, hover & unit toggles.
 */

/**
 * Internal dependencies
 */
import ControlIconToggle from '../control-icon-toggle'
import ResponsiveToggle from '../responsive-toggle'
import HoverStateToggle from './hover-state-toggle'
import { VisualGuideer } from './use-visual-guide'
import { CUSTOM_UNIT } from '~lumen/utils'
import LabelTooltip from './label-tooltip'
import {
	useAttributeName, useBlockAttributesContext, useBlockSetAttributesContext, useDeviceType,
} from '~lumen/hooks'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n } from 'lumen'
import { pick, omit } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import { BaseControl as GutBaseControl } from '@wordpress/components'

// Expose useControlHandlers to our API.
export { useControlHandlers } from './hooks'

const ALL_SCREENS = [ 'desktop', 'tablet', 'mobile' ]
const EMPTY_OBJ = {}

export const BaseControl = props => {
	const deviceType = useDeviceType()

	/*
	 * The attribute a control edits, written into its class list.
	 *
	 * Nothing styles this. It exists so that something holding an attribute
	 * name — the applied-settings list, which knows `blockPadding` and nothing
	 * else — can find the one control that owns it. Matching on the label text
	 * instead was guesswork: labels are worded for people, several controls can
	 * share a word, and a humanised attribute name often matches none of them.
	 */
	const className = classnames( [
		'lmn-control',
		props.className,
	], {
		'lmn-control--disabled': ( props.disableTablet && deviceType === 'Tablet' ) || ( props.disableMobile && deviceType === 'Mobile' ),
		[ `lmn-control--attr-${ props.attribute }` ]: !! props.attribute,
	} )

	const hasResponsive = !! props.responsive?.length
	const hasHover = !! props.hover?.length
	const hasUnits = !! props.units?.length

	const responsive = props.responsive === 'all' ? ALL_SCREENS : props.responsive

	/*
	 * `custom` is not a unit but a mode: the author writes the whole value, so
	 * a control offering it can take `calc(100% - 200px)` where a number and a
	 * suffix could not. The toggle shows `fx` rather than the word, which would
	 * not fit and would read as a unit standing alongside px and rem.
	 */
	const units = ( props.units && props.units?.map( unit => (
		unit === CUSTOM_UNIT ? { value: unit, label: __( 'fx', i18n ) } : { value: unit }
	) ) ) || []

	const labelClassName = classnames( [
		'lmn-control-label',
	], {
		'lmn-control-label--bold': props.boldLabel,
	} )

	const label = props.boldLabel ? <h3>{ props.label }</h3> : props.label

	const VisualGuide = props.visualGuide !== EMPTY_OBJ ? VisualGuideer : Fragment

	return (
		<GutBaseControl
			help={ props.help }
			className={ className }
			__nextHasNoMarginBottom
		>
			<VisualGuide { ...props.visualGuide }>
				<div className={ labelClassName }>
					<LabelTooltip label={ label } { ...props.helpTooltip } />
					<div className="lmn-control-label__toggles">
						{ hasResponsive && (
							<ResponsiveToggle
								screens={ responsive }
								attribute={ props.attribute }
								hasTabletValue={ props.hasTabletValue }
								hasMobileValue={ props.hasMobileValue }
								valueCheckAttribute={ props.valueCheckAttribute }
							/>
						) }
						{ hasHover && (
							<HoverStateToggle
								hover={ props.hover }
								attribute={ props.attribute }
								hasResponsive={ hasResponsive }
								forceUpdateHoverState={ props.forceUpdateHoverState }
								hasHoverStateValue={ props.hasHoverStateValue }
							/>
						) }
					</div>
					<div className="lmn-control-label__after">
						{ hasUnits &&
							<ControlIconToggle
								className="lmn-control-label__units"
								value={ props.unit }
								options={ units }
								onChange={ unit => props.onChangeUnit( unit ) }
								buttonLabel={ __( 'Unit', i18n ) }
								hasLabels={ false }
								hasColors={ false }
								labelPosition="left"
							/>
						}
						{ props.after }
					</div>
				</div>
				<div className="lmn-control-content" data-attribute={ props.attribute }>
					{ props.children }
				</div>
			</VisualGuide>
		</GutBaseControl>
	)
}

BaseControl.defaultProps = {
	className: '',
	label: '',
	help: '',
	boldLabel: false,
	attribute: '',

	responsive: false,
	hover: false,

	units: false,
	unit: '',
	onChangeUnit: null,

	after: null,

	disableTablet: false, // If true, then the control will be disabled in tablet preview.
	disableMobile: false, // If true, then the control will be disabled in mobile preview.

	hasTabletValue: undefined, // If true, then the responsive toggle for tablet will be highlighted to show that the tablet value has been set.
	hasMobileValue: undefined, // If true, then the responsive toggle for mobile will be highlighted to show that the mobile value has been set.

	visualGuide: EMPTY_OBJ, // If supplied, displays a highlight on the block.
	helpTooltip: EMPTY_OBJ, // If supplied, displays a help tooltip when hovering on the label.

	forceUpdateHoverState: false,

	// If hasHoverStateValue is supplied, it should contain the following:
	// { hover: boolean, 'parent-hover': boolean }
	// If 'hover' or 'parent-hover' is true, then the hover toggle will be highlighted to show that the hover state value has been set
	hasHoverStateValue: undefined,
}

const AdvancedControl = props => {
	// Unit handles
	const unitAttrName = useAttributeName( `${ props.attribute }Unit`, props.responsive, props.hover )
	const unitAttribute = useBlockAttributesContext( attributes => attributes[ unitAttrName ] ) || ''

	const unit = props.unit ? props.unit : unitAttribute
	const setAttributes = useBlockSetAttributesContext()
	const onChangeUnit = unit => {
		if ( props.onChangeUnit ) {
			return props.onChangeUnit( unit, unitAttrName, unitAttribute )
		}
		setAttributes( { [ unitAttrName ]: unit } )
	}

	return (
		<BaseControl
			{ ...props }
			unit={ unit }
			onChangeUnit={ onChangeUnit }
		/>
	)
}

AdvancedControl.defaultProps = {
	// Control props
	className: '',
	label: '',
	help: '',

	attribute: '', // The name of the attribute to adjust.

	responsive: false,
	hover: false,
	units: false,

	onChangeUnit: null,
	unit: null,

	after: null,

	valueCheckAttribute: '', // Checks the value of different variations of the attribute name i.e. backgroundMedia -> backgroundMediaUrl. This is mainly used for the modified indicator.

	disableTablet: false, // If true, then the control will be disabled in tablet preview.
	disableMobile: false, // If true, then the control will be disabled in mobile preview.

	hasTabletValue: undefined, // If true, then the responsive toggle for tablet will be highlighted to show that the tablet value has been set.
	hasMobileValue: undefined, // If true, then the responsive toggle for mobile will be highlighted to show that the mobile value has been set.

	visualGuide: EMPTY_OBJ, // If supplied, displays a highlight on the block.
	helpTooltip: EMPTY_OBJ, // If supplied, displays a help tooltip when hovering on the label.

	forceUpdateHoverState: false,

	// If hasHoverStateValue is supplied, it should contain the following:
	// { hover: boolean, 'parent-hover': boolean }
	// If 'hover' or 'parent-hover' is true, then the hover toggle will be highlighted to show that the hover state value has been set
	hasHoverStateValue: undefined,
}

export default AdvancedControl

export const extractControlProps = props => {
	const advancedControlProps = [ ...Object.keys( AdvancedControl.defaultProps ), 'allowReset', 'screens' ]
	const controlProps = pick( props, advancedControlProps )
	if ( props.screens ) {
		controlProps.responsive = props.screens
	}

	return [
		omit( props, advancedControlProps ),
		controlProps,
	]
}
