/**
 * Internal dependencies
 */
import { AdvancedRangeControl, AdvancedTextControl } from '~lumen/ui'
import { isSafeWidth } from '~lumen/features/column/width-value'
import { BaseControl } from '../base-control2'
import { ResetButton } from '../base-control2/reset-button'
import ControlIconToggle from '../control-icon-toggle'

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
	/*
	 * The unit can be given either as one string for the whole row, which puts
	 * a single picker beside the label, or as one string per column, which puts
	 * a picker on every row in place of the suffix. Which one the caller passes
	 * is what decides where the picker goes.
	 */
	const hasUnitPerColumn = Array.isArray( props.unit )

	// Empty means per cent, which is what these widths have always been.
	const unitAt = i => ( hasUnitPerColumn ? props.unit[ i ] : props.unit ) || props.units?.[ 0 ] || '%'

	/*
	 * "custom" is not a unit but a mode: the author writes the whole width, so
	 * the toggle shows `fx` rather than the word, which would not fit and would
	 * read as a unit alongside px and rem.
	 */
	const unitOptions = ( props.units || [] ).map( unit => (
		unit === 'custom' ? { value: unit, label: __( 'fx', i18n ) } : { value: unit }
	) )

	return (
		<BaseControl
			label={ props.label }
			help={ props.help }
			className={ classnames( [ 'lmb-columns-width-multi-control', props.className ] ) }
			responsive={ props.responsive }
			hasTabletValue={ props.hasTabletValue }
			hasMobileValue={ props.hasMobileValue }
			units={ hasUnitPerColumn ? null : props.units }
			unit={ hasUnitPerColumn ? '' : unitAt( 0 ) }
			onChangeUnit={ hasUnitPerColumn ? null : props.onChangeUnit }
		>
			{ range( props.columns ).map( i => {
				const unit = unitAt( i )
				const isPercent = unit === '%'

				// Not a unit but the absence of one: the width is written out in
				// full, so a slider cannot express it and a suffix would be wrong.
				const isCustom = unit === 'custom'

				return (
					<div key={ i } className="lmn-columns-width-multi-control__range">
						<span className="lmn-columns-width-multi-control__range__icon">{ i + 1 }</span>
						<div className="lmn-columns-width-multi-control__range__range-control">
							{ isCustom ? (
								<AdvancedTextControl
									className={ classnames( 'lmn--no-padding', {
										'lmn-columns-width-multi-control__invalid':
											props.values[ i ] && ! isSafeWidth( props.values[ i ] ),
									} ) }
									value={ props.values[ i ] }
									placeholder="calc(100% - 200px)"
									onChange={ value => {
										const newValues = [ ...props.values ]
										newValues[ i ] = value
										props.onChange( newValues )
									} }
									allowReset={ false }
									hasPanelModifiedIndicator={ false }
								/>
							) : (
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
							) }
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
						{ hasUnitPerColumn && props.onChangeUnit && unitOptions.length > 1
							? (
								<ControlIconToggle
									className="lmn-columns-width-multi-control__range__units"
									value={ unit }
									options={ unitOptions }
									onChange={ newUnit => props.onChangeUnit( newUnit, i ) }
									buttonLabel={ __( 'Unit', i18n ) }
									hasLabels={ false }
									hasColors={ false }
									labelPosition="left"
								/>
							)
							: (
								! isCustom &&
									<span className="lmn-columns-width-multi-control__range__suffix">{ unit }</span>
							)
						}
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
	unit: '', // A string puts one picker beside the label; an array of one unit per column puts a picker on each row.
	onChangeUnit: null, // ( unit, index ). The index is only given when the units are per column.

	hasTabletValue: undefined, // If true, then the responsive toggle for tablet will be highlighted to show that the tablet value has been set.
	hasMobileValue: undefined, // If true, then the responsive toggle for mobile will be highlighted to show that the mobile value has been set.
}

export default ColumnsWidthMultiControl
