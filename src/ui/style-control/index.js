/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element'
import { ENTER, SPACE } from '@wordpress/keycodes'

const StyleControl = props => {
	const { options, value } = props

	return (
		<div className={ classnames( props.className, 'lmn-block-editor-block-styles' ) }>
			{ options.map( ( option, i ) => {
				return (
					<StyleControlOption
						key={ i }
						isActive={ value === option[ props.activeProperty ] }
						onSelect={ props.onSelect }
						option={ option }
					/>
				)
			} ) }
		</div>
	)
}

StyleControl.defaultProps = {
	className: '',
	onSelect: () => {}, // The selected option object is returned
	options: [], // An option has a value, icon or image, and a label
	value: '', // The value of the option
	activeProperty: 'value', // The property to compare the value with
}

export const StyleControlOption = memo( props => {
	const {
		option,
		isActive,
		onSelect: _onSelect,
	} = props

	const onSelect = value => {
		if ( ! option.disabled && ! isActive ) {
			_onSelect( value )
		}
	}

	const Image = option.icon

	return (
		<div
			className={ classnames( 'lmn-style-control__option', 'lmn-block-editor-block-styles__item', {
				'is-active': isActive,
				'is-disabled': option.disabled,
			} ) }
			onClick={ () => onSelect( option ) }
			onKeyDown={ event => {
				if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
					event.preventDefault()
					onSelect( option )
				}
			} }
			role="button"
			tabIndex="0"
			aria-label={ option.label || '' }
		>
			<div className="lmn-block-editor-block-styles__item-preview lmn-style-control__image">
				{ option.image || ( Image && <Image className="lmn-style-control__image__icon" /> ) }
			</div>
			{ option.label && (
				<div className="lmn-block-editor-block-styles__item-label">
					{ option.label }
				</div>
			) }
		</div>
	)
} )

StyleControlOption.defaultProps = {
	option: {},
	isActive: false,
	onSelect: () => {},
}

export default StyleControl
