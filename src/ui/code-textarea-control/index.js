/**
 * Internal dependencies
 */
import { BaseControlMultiLabel, CodeTextarea } from '..'

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { BaseControl } from '@wordpress/components'

const CodeTextareaControl = props => {
	return (
		<BaseControl
			help={ props.help }
			className={ classnames( 'lmn-code-textarea-control', 'lmn-control', props.className, {
				// So the applied-settings list can find this control by the
				// attribute it edits, like every other control.
				[ `lmn-control--attr-${ props.attribute }` ]: !! props.attribute,
			} ) }
			__nextHasNoMarginBottom
		>
			<BaseControlMultiLabel
				label={ props.label }
				screens={ props.screens }
			/>
			<CodeTextarea
				value={ props.value }
				onChange={ props.onChange }
			/>

		</BaseControl>
	)
}

CodeTextareaControl.defaultProps = {
	attribute: '',
	help: '',
	className: '',
	value: '',
	label: '',
	screens: [],
	onChange: () => {},
}

export default CodeTextareaControl
