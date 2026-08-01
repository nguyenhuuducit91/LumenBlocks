import './store'

/**
 * Internal dependencies
 */
import ColorSchemePicker from './color-scheme-picker'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	AdvancedSelectControl,
	AdvancedToggleControl,
	HelpTooltip,
	PanelAdvancedSettings,
	SectionSettings,
} from '~lumen/ui'
import { useBlockColorSchemes } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'
import { Fragment, useState } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { useSelect, dispatch } from '@wordpress/data'
import { models } from '@wordpress/api'

export { GlobalColorSchemeStyles } from './editor-loader'

let saveTimeout = null

const COLOR_SCHEME_OPTION_NAMES = {
	baseColorScheme: 'lumen_global_base_color_scheme',
	backgroundModeColorScheme: 'lumen_global_background_mode_color_scheme',
	containerModeColorScheme: 'lumen_global_container_mode_color_scheme',
}

addFilter( 'lumen.global-settings.inspector', 'lumen/global-color-schemes', output => {
	const [ itemInEdit, setItemInEdit ] = useState( null )
	const [ isOpen, setIsOpen ] = useState( false )
	const [ displayHoverNotice, setDisplayHoverNotice ] = useState( false )

	const {
		COLOR_SCHEME_OPTIONS,
		baseColorScheme,
		backgroundModeColorScheme,
		containerModeColorScheme,
	} = useBlockColorSchemes()

	const onChangeDefaultColorScheme = ( mode, colorSchemeKey ) => {
		clearTimeout( saveTimeout )
		saveTimeout = setTimeout( () => {
			const settings = new models.Settings( {
				[ COLOR_SCHEME_OPTION_NAMES[ mode ] ]: colorSchemeKey, // eslint-disable-line camelcase
				lumen_global_color_scheme_generated_css: '', // eslint-disable-line camelcase
			} )
			settings.save()
		}, 300 )

		// Update our store.
		dispatch( 'lumen/global-color-schemes' ).updateSettings( { [ mode ]: colorSchemeKey } )
	}

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Global Color Schemes', i18n ) }
				className="lmb-global-color-schemes__panel"
				onToggle={ isOpen => setIsOpen( isOpen ) }
			>
				{ isOpen && displayHoverNotice && <span className="lmn-global-block-layouts-help-tooltip">
					<HelpTooltip
						title={ __( 'Hover States', i18n ) }
						description={ __( 'When editing color schemes in the hover states, select a block to view the applied colors.', i18n ) }
						closeOnEscape={ false }
						showTooltipCheckbox={ false }
						onClose={ () => {
							setDisplayHoverNotice( false )
							localStorage.setItem( 'lmn-disable-global-block-color-schemes-hover-notice', true )
						} }
					/>
				</span>
				}
				{ ! itemInEdit && <p className="components-base-control__help">
					{ __( 'Color schemes are applied to all blocks and sections of your entire website.', i18n ) }
				</p>
				}
				<ColorSchemePicker
					label={ __( 'Color Schemes', i18n ) }
					itemInEdit={ itemInEdit }
					setItemInEdit={ setItemInEdit }
					setDisplayHoverNotice={ setDisplayHoverNotice }
				/>
				{ ! itemInEdit && <>
					<SectionSettings title={ __( 'Default Block Colors', i18n ) }>
						<AdvancedSelectControl
							label={ __( 'Base Color Scheme', i18n ) }
							value={ baseColorScheme }
							options={ COLOR_SCHEME_OPTIONS }
							default="scheme-default-1"
							onChange={ colorScheme => onChangeDefaultColorScheme( 'baseColorScheme', colorScheme ) }
							help={ __( 'Default color scheme to use for all blocks when no special options are enabled.', i18n ) }
						/>
						<AdvancedSelectControl
							label={ __( 'Background Mode Color Scheme', i18n ) }
							value={ backgroundModeColorScheme }
							options={ COLOR_SCHEME_OPTIONS }
							default="scheme-default-2"
							onChange={ colorScheme => onChangeDefaultColorScheme( 'backgroundModeColorScheme', colorScheme ) }
							help={ __( 'Colors applied when the background option is enabled for a block.', i18n ) }
						/>
						<AdvancedSelectControl
							label={ __( 'Container Mode Color Scheme', i18n ) }
							value={ containerModeColorScheme }
							options={ COLOR_SCHEME_OPTIONS }
							default="scheme-default-1"
							onChange={ colorScheme => onChangeDefaultColorScheme( 'containerModeColorScheme', colorScheme ) }
							help={ __( 'Colors applied when the container option is enabled for a block.', i18n ) }
						/>
					</SectionSettings>
				</> }
			</PanelAdvancedSettings>
		</Fragment>
	)
}, 2 )

addFilter( 'lumen.global-settings.inspector.global-colors.toggle-controls', 'lumen/global-color-schemes', output => {
	const { hideColorSchemeColors } = useSelect( select => select( 'lumen/global-color-schemes' ).getSettings() )

	const onChange = value => {
		dispatch( 'lumen/global-color-schemes' ).updateSettings( {
			hideColorSchemeColors: value,
		} )

		const settings = new models.Settings( { lumen_global_hide_color_scheme_colors: value } ) // eslint-disable-line camelcase
		settings.save()
	}

	return <>
		{ output }
		<AdvancedToggleControl
			label={ __( 'Show Global Color Schemes', i18n ) }
			checked={ ! hideColorSchemeColors }
			onChange={ value => onChange( ! value ) }
			allowReset={ false }
		/>

	</>
} )
