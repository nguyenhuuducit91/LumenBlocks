import { i18n } from 'lumen'

import { Button, BaseControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import classnames from 'classnames'

export const COLOR_SCHEME_PROPERTY_LABELS = {
	backgroundColor: __( 'Background Color', i18n ),
	headingColor: __( 'Heading Color', i18n ),
	textColor: __( 'Text Color', i18n ),
	linkColor: __( 'Link Color', i18n ),
	accentColor: __( 'Accent Color', i18n ),
	buttonBackgroundColor: __( 'Button Color', i18n ),
	buttonTextColor: __( 'Button Text Color', i18n ),
	buttonOutlineColor: __( 'Button Outline Color', i18n ),
}

export const DEFAULT_COLOR_SCHEME_COLORS = {
	backgroundColor: { desktop: '' },
	headingColor: { desktop: '' },
	textColor: { desktop: '' },
	linkColor: { desktop: '' },
	accentColor: { desktop: '' },
	buttonBackgroundColor: { desktop: '' },
	buttonTextColor: { desktop: '' },
	buttonOutlineColor: { desktop: '' },
}

export const ALTERNATE_COLOR_SCHEME_COLORS = {
	backgroundColor: { desktop: '#0f0e17' },
	headingColor: { desktop: '#fffffe' },
	textColor: { desktop: '#fffffe' },
	linkColor: { desktop: '#f59e0b' },
	accentColor: { desktop: '#f59e0b' },
	buttonBackgroundColor: { desktop: '#f59e0b' },
	buttonTextColor: { desktop: '#fffffe' },
	buttonOutlineColor: { desktop: '#fffffe' },
}

const NOOP = () => {}

const ColorSchemePreview = ( {
	colors,
	withWrapper = false,
	onClick = NOOP,
	isDisabled = false,
	isCollapsed = false,
} ) => {
	const TagName = onClick === NOOP ? 'div' : Button
	const additionalProps = onClick === NOOP ? {} : { onClick }

	const classNames = classnames( 'lmn-global-color-scheme__preview__background', {
		'lmn-scheme--is-disabled': isDisabled,
		'lmn-scheme--is-collapsed': isCollapsed,
	} )

	return (
		<div className="lmn-global-color-scheme__preview">
			<TagName
				className={ classNames }
				style={ withWrapper ? {} : { background: colors?.backgroundColor } }
				{ ...additionalProps }
			>
				<div className="lmn-global-color-scheme__preview__typography">
					<span style={ { color: colors?.headingColor } }>A</span>
					<span style={ { color: colors?.textColor } }>a</span>
				</div>
				<div>
					<div
						className="lmn-global-color-scheme__preview__button"
						style={ { background: `${ colors?.buttonBackgroundColor || 'var(--lmn-button-background-color)' }` } }
					/>
					<div
						className="lmn-global-color-scheme__preview__button"
						style={ {
							borderStyle: 'solid',
							borderWidth: '1px',
							borderColor: `${ colors?.buttonOutlineColor || colors?.buttonBackgroundColor || 'var(--lmn-button-background-color)' }`,
						} }
					/>
					<div
						className="lmn-global-color-scheme__preview__circle"
						style={ { backgroundColor: `${ colors?.linkColor || colors?.textColor || 'var(--lmn-container-color)' }` } }
					/>
					<div
						className="lmn-global-color-scheme__preview__circle"
						style={ { backgroundColor: `${ colors?.accentColor || 'var(--lmn-icon-color)' }` } }
					/>
				</div>
			</TagName>
		</div>
	)
}

export const ColorSchemePresetPicker = ( {
	label, presets, onPresetClick,
} ) => {
	return (
		<BaseControl label={ label } className="lmn-preset-color-schemes__control" __nextHasNoMarginBottom>
			<div className="lmn-preset-color-schemes__preset-wrapper">
				{ presets.map( ( colors, index ) => {
					return <ColorSchemePreview
						key={ index }
						colors={ colors }
						onClick={ () => onPresetClick( colors ) }
					/>
				} ) }
			</div>

		</BaseControl>
	)
}

export default ColorSchemePreview
