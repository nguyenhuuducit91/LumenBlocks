/**
 * Internal dependencies
 */
import ControlIconToggle from '../control-icon-toggle'
import ResponsiveToggle from '~lumen/ui/responsive-toggle'
import { i18n } from 'lumen'
import LabelTooltip from '../base-control2/label-tooltip'

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n'

const BaseControlMultiLabel = props => {
	const screens = props.screens === 'all' ? [ 'desktop', 'tablet', 'mobile' ] : props.screens

	const units = props.units?.map( unit => {
		return { value: unit }
	} ) || []

	return (
		<div className="lmb-base-control-multi-label">
			<LabelTooltip
				label={ props.label }
				{ ...props.helpTooltip }
			/>
			<ResponsiveToggle screens={ screens } />
			<div className="lmb-base-control-multi-label__units">
				<ControlIconToggle
					className="lmn-control-unit-toggle"
					value={ props.unit }
					options={ units }
					onChange={ unit => props.onChangeUnit( unit ) }
					labelPosition="left"
					buttonLabel={ __( 'Unit', i18n ) }
					hasLabels={ false }
					hasColors={ false }
				/>
				{ props.afterButton }
			</div>
		</div>
	)
}

BaseControlMultiLabel.defaultProps = {
	label: '',
	units: [ 'px' ],
	unit: 'px',
	onChangeUnit: () => {},
	screens: [ 'desktop' ], // You can pass "all" as shortcut for all devices.
	afterButton: null,
}

export default BaseControlMultiLabel
