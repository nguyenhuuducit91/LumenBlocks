/**
 * The field a size control becomes when its unit is set to `fx`.
 *
 * Some widths cannot be written as a number and a suffix. "The rest of the row
 * beside a 200px sidebar" is `calc(100% - 200px)`; "between one and two rems,
 * scaling with the viewport" is `clamp(1rem, 2vw, 2rem)`. A slider has no way
 * to express either, so the control hands the value over to the author instead
 * — and the CSS generator, seeing `fx`, writes what they typed out verbatim
 * rather than appending a unit to it.
 *
 * Deliberately plain. It is one input standing in for a slider, inside the
 * wrapper that already carries the label, the unit toggle, the responsive and
 * hover switches and the reset.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import classnames from 'classnames'
import { useInternalValue } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components'
import { __, sprintf } from '@wordpress/i18n'

const CustomValueControl = props => {
	/*
	 * Tracked internally, or the value would be handed back on every render and
	 * the caret would jump to the end of the field between keystrokes.
	 */
	const [ internalValue, setInternalValue ] = useInternalValue( props.value )

	/*
	 * Prefixed on purpose. A bare `calc(100% - 200px)` sitting in an empty field
	 * reads as a value that is already set, rather than as an illustration of
	 * what may be typed. The expression itself is kept out of the translatable
	 * string — it is CSS, not prose.
	 */
	const placeholder = props.placeholder || sprintf(
		/* translators: %s: an example CSS value. */
		__( 'e.g. %s', i18n ),
		'calc(100% - 200px)'
	)

	return (
		<TextControl
			className={ classnames( 'lmn-custom-value-control', props.className ) }
			value={ internalValue ?? '' }
			placeholder={ placeholder }
			onChange={ value => {
				setInternalValue( value )
				props.onChange( value )
			} }
			__nextHasNoMarginBottom
		/>
	)
}

CustomValueControl.defaultProps = {
	className: '',
	value: '',
	placeholder: '',
	onChange: () => {},
}

export default CustomValueControl
