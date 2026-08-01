import './store'

/**
 * Internal dependencies
 */
import ColorPicker from './color-picker'
import { GlobalColorStyles } from './editor-loader'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import { AdvancedToggleControl, PanelAdvancedSettings } from '~lumen/ui'
import rgba from 'color-rgba'

/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { dispatch, useSelect } from '@wordpress/data'
import { models } from '@wordpress/api'

export { GlobalColorStyles }

// TODO: Do we still need this because opacity is now included in the picker???
addFilter( 'lumen.util.hex-to-rgba', 'lumen/global-colors', ( output, hexColor, opacity ) => {
	// Only do this for Lumen global colors.
	if ( ! hexColor.includes( '--lmn-global-color' ) ) {
		return output
	}

	const colorVarID = hexColor.match( /--lmn-global-color-(\S*?(?=,))/ )
	if ( colorVarID ) {
		const colorRegex = /( )(.*)/g

		// Get the fallback value of the global color.
		const colorMatch = hexColor.match( colorRegex )[ 0 ].trim().slice( 0, -1 )

		// If the fallback value is a hex, convert to rgba.
		if ( colorMatch && colorMatch[ 0 ] === '#' ) {
			const rgbaColor = rgba( colorMatch )
			if ( rgbaColor ) {
				rgbaColor.splice( 3, 1 )
				return `rgba(var(--lmn-global-color-${ colorVarID[ 1 ] }-rgba, ${ rgbaColor.join( ', ' ) }), ${ opacity !== null ? opacity : 1 })`
			}
		}
	}

	return output
} )

addFilter( 'lumen.util.is-dark-color', 'lumen/global-colors', color => {
	if ( color.match( /--lmn-global-color/ ) ) {
		const colorVarID = color.match( /--lmn-global-color-(\S*?(?=,))/ )
		if ( colorVarID ) {
			const colorRegex = /( )(.*)/g
			// Get the fallback value of the global color.
			const colorMatch = color.match( colorRegex )[ 0 ].trim().slice( 0, -1 )
			if ( colorMatch && colorMatch[ 0 ] === '#' ) {
				return colorMatch
			}
		}
	}

	return color
} )

addFilter( 'lumen.global-settings.inspector', 'lumen/global-colors', output => {
	const {
		lumenColors,
		hideThemeColors,
		hideDefaultColors,
		hideSiteEditorColors,
	} = useSelect( select => select( 'lumen/global-colors' ).getSettings() )

	const onChangeHideThemeColors = value => {
		dispatch( 'lumen/global-colors' ).updateSettings( {
			hideThemeColors: value,
		} )

		const settings = new models.Settings( { lumen_global_hide_theme_colors: value } ) // eslint-disable-line camelcase
		settings.save()
	}

	const onChangeHideDefaultColors = value => {
		dispatch( 'lumen/global-colors' ).updateSettings( {
			hideDefaultColors: value,
		} )

		const settings = new models.Settings( { lumen_global_hide_default_colors: value } ) // eslint-disable-line camelcase
		settings.save()
	}

	const onChangeHideSiteEditorColors = value => {
		dispatch( 'lumen/global-colors' ).updateSettings( {
			hideSiteEditorColors: value,
		} )

		const settings = new models.Settings( { lumen_global_hide_site_editor_colors: value } ) // eslint-disable-line camelcase
		settings.save()
	}

	const ColorToggleControls = applyFilters( 'lumen.global-settings.inspector.global-colors.toggle-controls', Fragment )

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Global Color Palette', i18n ) }
				showModifiedIndicator={ !! lumenColors?.length }
			>
				<p className="components-base-control__help">
					{ __( 'Change your color palette for all your blocks across your site.', i18n ) }
				</p>
				<ColorPicker label={ __( 'Global Colors', i18n ) } />
				{ /* <ColorPicker
					label={ __( 'Global Gradients', i18n ) }
					onReset={ () => onChangeUseLumenColorsOnly( false ) }
				/> */ }
				{ ColorToggleControls }
				<AdvancedToggleControl
					label={ __( 'Show Theme Colors', i18n ) }
					checked={ ! hideThemeColors }
					onChange={ value => onChangeHideThemeColors( ! value ) }
					allowReset={ false }
				/>
				<AdvancedToggleControl
					label={ __( 'Show Default Colors', i18n ) }
					checked={ ! hideDefaultColors }
					onChange={ value => onChangeHideDefaultColors( ! value ) }
					allowReset={ false }
				/>
				<AdvancedToggleControl
					label={ __( 'Show Site Editor Custom Colors', i18n ) }
					checked={ ! hideSiteEditorColors }
					onChange={ value => onChangeHideSiteEditorColors( ! value ) }
					allowReset={ false }
				/>
			</PanelAdvancedSettings>
		</Fragment>
	)
}, 4 )

// Convert hex colors to global colors in Lumen blocks.
addFilter( 'lumen.color-palette-control.change', 'lumen/global-colors', ( value, colorObject ) => {
	if ( colorObject && colorObject.slug.includes( 'lmn-global-color' ) ) {
		return `var(--${ colorObject.slug }, ${ colorObject.color })`
	}

	return value
} )
