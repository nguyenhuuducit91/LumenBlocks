/**
 * Somewhere to paste a colour or a gradient that was written elsewhere.
 *
 * The pickers can build a gradient, but they cannot accept one. A value copied
 * out of Figma or a design system —
 * `linear-gradient(103.77deg, rgba(0, 178, 255, .84) -6.28%, #061173 100.88%)`
 * — has angles to one decimal place, stops at negative and past-100
 * percentages, and per-stop alpha. Rebuilding that by dragging handles is not
 * realistic, and the result would not be the same gradient.
 *
 * **Why this is not the arbitrary-CSS field that was removed.** What goes in
 * here is one property's value, not a rule, and it is checked by the browser's
 * own CSS parser before it is accepted. `CSS.supports()` returns false for
 * anything containing `;` or `}` — they make the declaration invalid — so a
 * value that would close this declaration and start a rule of its own cannot
 * get in. Rejected input is never stored.
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
import {
	BaseControl, Button, TextControl,
} from '@wordpress/components'
import { closeSmall } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

/**
 * Whether the browser would accept this as the value of the property it is for.
 *
 * @param {string}  value      The pasted text.
 * @param {boolean} isGradient Whether it is going into `background-image`.
 * @return {boolean} True when the browser parses it as a valid value.
 */
export const isValidColorValue = ( value, isGradient ) => {
	const trimmed = ( value || '' ).trim()

	if ( ! trimmed ) {
		return false
	}

	// Old browsers without CSS.supports would otherwise reject everything.
	if ( typeof CSS === 'undefined' || typeof CSS.supports !== 'function' ) {
		return ! /[;}{]/.test( trimmed )
	}

	return isGradient
		? CSS.supports( 'background-image', trimmed )
		: CSS.supports( 'color', trimmed ) || CSS.supports( 'background-image', trimmed )
}

export const PasteValueControl = props => {
	/*
	 * Seeded with what the block is already using, and kept in step with it, so
	 * the field reads as the value rather than as an empty box beside it —
	 * picking a swatch above updates the text here, and editing the text
	 * updates the block.
	 */
	const [ value, setValue ] = useInternalValue( props.value || '' )

	const trimmed = value.trim()
	const isValid = isValidColorValue( value, props.isGradient )

	/*
	 * Applied as it is typed, not on a button press.
	 *
	 * A half-typed `linear-gradient(90deg, #f00` is not a value the browser
	 * accepts, so nothing is written while it is being built; the block updates
	 * on the keystroke that completes it. That is also what keeps an invalid
	 * value from ever reaching the block — the check is the same one that used
	 * to guard the button.
	 */
	const onChange = newValue => {
		setValue( newValue )

		if ( isValidColorValue( newValue, props.isGradient ) ) {
			props.onChange( newValue.trim() )
		}
	}

	// Nothing typed yet is not an error; a value that will not parse is.
	const showError = !! trimmed && ! isValid

	return (
		<BaseControl
			className="lmn-color-palette-control__paste"
			id="lmn-color-palette-paste"
			label={ props.isGradient
				? __( 'Gradient value', i18n )
				: __( 'Colour value', i18n ) }
			help={ showError
				? __( 'Not a value the browser recognises — the block keeps the last one that worked.', i18n )
				: undefined }
			__nextHasNoMarginBottom
		>
			<div
				className={ classnames( 'lmn-color-palette-control__paste-field', {
					'lmn-color-palette-control__paste-field--invalid': showError,
				} ) }
			>
				<TextControl
					value={ value }
					placeholder={ props.isGradient
						? 'linear-gradient(90deg, #f00, #00f)'
						: 'rgba(6, 17, 115, 0.8)' }
					onChange={ onChange }
					__nextHasNoMarginBottom
				/>
				{ !! trimmed && (
					<Button
						className="lmn-color-palette-control__paste-clear"
						icon={ closeSmall }
						size="small"
						label={ __( 'Clear', i18n ) }
						showTooltip={ true }
						onClick={ () => {
							setValue( '' )
							props.onChange( '' )
						} }
					/>
				) }
			</div>
		</BaseControl>
	)
}

PasteValueControl.defaultProps = {
	value: '',
	isGradient: false,
	onChange: () => {},
}

export default PasteValueControl
