/**
 * Internal dependencies
 */
import { AdvancedRangeControl } from '~lumen/ui'
import { BaseControl } from '../base-control2'
import { ResetButton } from '../base-control2/reset-button'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n } from 'lumen'
import { range } from 'lodash'

const ColumnsWidthMultiControl = props => {
	// Empty means per cent, which is what these widths have always been.
	const unit = props.unit || props.units?.[ 0 ] || '%'
	const isPercent = unit === '%'

	return (
		<BaseControl
			label={ props.label }
			help={ props.help }
			className={ classnames( [ 'lmb-columns-width-multi-control', props.className ] ) }
			responsive={ props.responsive }
			hasTabletValue={ props.hasTabletValue }
			hasMobileValue={ props.hasMobileValue }
			units={ props.units }
			unit={ unit }
			onChangeUnit={ props.onChangeUnit }
		>
			{ range( props.columns ).map( i => {
				return (
					<div key={ i } className="lmn-columns-width-multi-control__range">
						<span className="lmn-columns-width-multi-control__range__icon">{ i + 1 }</span>
						<div className="lmn-columns-width-multi-control__range__range-control">
							<AdvancedRangeControl
								className="lmn--no-padding"
								value={ props.values[ i ] }
								/*
								 * A percentage stops at 100; a fixed width does
								 * not, and a slider that stopped there would put
								 * a ceiling on a perfectly ordinary 320px column.
								 */
								max={ isPercent ? 100 : 1200 }
								sliderMax={ isPercent ? 100 : 600 }
								min={ 0 }
								onChange={ value => {
									const newValues = [ ...props.values ]
									newValues[ i ] = value
									props.onChange( newValues )
								} }
								allowReset={ false }
								placeholder={ props.placeholders ? props.placeholders[ i ] : '' }
								forcePlaceholder={ true }
							/>
							{ props.allowReset && (
								<ResetButton
									allowReset={ props.allowReset }
									value={ props.values[ i ] }
									default=""
									onChange={ value => {
										const newValues = [ ...props.values ]
										newValues[ i ] = value
										props.onChange( newValues )
									} }
								/>
							) }
						</div>
						<span className="lmn-columns-width-multi-control__range__suffix">{ unit }</span>
					</div>
				)
			} ) }
		</BaseControl>
	)
}

ColumnsWidthMultiControl.defaultProps = {
	columns: 2,
	values: [ '', '' ],
	onChange: () => {},
	help: '',
	label: __( 'Column Widths', i18n ),
	className: '',
	responsive: false,
	placeholders: null,

	units: null, // e.g. [ '%', 'px' ]. Null keeps the control on percentages.
	unit: '',
	onChangeUnit: null,

	hasTabletValue: undefined, // If true, then the responsive toggle for tablet will be highlighted to show that the tablet value has been set.
	hasMobileValue: undefined, // If true, then the responsive toggle for mobile will be highlighted to show that the mobile value has been set.
}

export default ColumnsWidthMultiControl
