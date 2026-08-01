/**
 * An updated version of the BaseControlMultiLabel, which includes a reset button.
 */

/**
 * Internal dependencies
 */
import BaseControlMultiLabel from '../base-control-multi-label'
import Button from '../button'

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { BaseControl as _BaseControl, Dashicon } from '@wordpress/components'
import { i18n } from 'lumen'
import { __ } from '@wordpress/i18n'

const BaseControl = props => {
	/*
	 * The attribute a control edits, written into its class list.
	 *
	 * The same marker the newer base control carries, for the same reason: the
	 * applied-settings list holds an attribute name and needs to find the one
	 * control that owns it. Both base controls are still in use, so both have to
	 * carry it or half the settings would be unreachable — toggles among them.
	 */
	const className = classnames( [
		'lmn-inspector-control',
		'lmn-control',
		props.className,
	], {
		'lmn-inspector-control--allow-reset': props.allowReset,
		'lmn--is-small': props.isSmall,
		[ `lmn-control--attr-${ props.attribute }` ]: !! props.attribute,
	} )

	const showReset = props.showReset !== null
		? props.showReset
		: ( typeof props.value !== 'undefined' && props.value !== props.defaultValue && props.value !== props.placeholder )

	return (
		<_BaseControl
			help={ props.help }
			className={ className }
			__nextHasNoMarginBottom
			__next40pxDefaultSize
		>
			{ props.hasLabel &&
				<BaseControlMultiLabel
					label={ props.label }
					units={ props.units }
					unit={ props.unit }
					onChangeUnit={ props.onChangeUnit }
					screens={ props.screens }
					afterButton={ props.afterButton }
					helpTooltip={ props.helpTooltip }
				/>
			}
			{ props.children }
			{ props.allowReset && showReset &&
				<Button
					className={ classnames(
						'lmn-inspector-control__reset-button',
						{ 'lmn-control__reset-button--no-modified': ! props.hasPanelModifiedIndicator },
					) }
					isSmall
					isTertiary
					aria-label={ __( 'Reset', i18n ) }
					onClick={ () => {
						if ( props.onReset ) {
							props.onReset()
						} else {
							props.onChange( props.defaultValue )
						}
					} }
					icon={ (
						<Dashicon
							icon="image-rotate"
						/>
					) }
				/>
			}
		</_BaseControl>
	)
}

BaseControl.defaultProps = {
	className: '',
	attribute: '', // The attribute this control edits, so it can be navigated to.
	help: '',
	id: '',
	screens: [ 'desktop' ],
	units: null,
	unit: 'px',
	onChangeUnit: () => {},
	value: '',
	onChange: () => {},
	allowReset: false,
	showReset: null,
	defaultValue: '',
	onReset: null,
	isLinked: true,
	onLink: () => {},
	afterButton: null,
	isSmall: false,
	hasLabel: true,
	hasPanelModifiedIndicator: true,
}

export default BaseControl
