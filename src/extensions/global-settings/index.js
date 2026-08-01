/**
 * Internal dependencies
 */
import './editor-loader'
import './color-schemes'
import './buttons-and-icons'
import './spacing-and-borders'
import './block-styles'
import './preset-controls'

/**
 * External dependencies
 */
import { SVGLumenIcon } from '~lumen/icons'
import {
	i18n,
	isContentOnlyMode,
	settings,
} from 'lumen'
import { GuidedModalTour, StyleGuidePopover } from '~lumen/ui'
import { currentUserHasCapability } from '~lumen/utils'

/** WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins'
import { __ } from '@wordpress/i18n'
import { applyFilters, addAction } from '@wordpress/hooks'
import {
	memo, useEffect, useState,
} from '@wordpress/element'
import {
	dispatch, select, useSelect,
} from '@wordpress/data'
import { Icon, layout as layoutIcon } from '@wordpress/icons'
import { Button, PanelBody } from '@wordpress/components'

// Action used to toggle the global settings panel.
addAction( 'lumen.global-settings.toggle-sidebar', 'toggle', () => {
	const lumenSidebar = 'lumen-global-settings/sidebar'
	const currentlyOpenedSidebar = select( 'core/edit-post' ).getActiveGeneralSidebarName()

	if ( currentlyOpenedSidebar === lumenSidebar ) {
		dispatch( 'core/edit-post' ).closeGeneralSidebar( lumenSidebar )
	} else {
		dispatch( 'core/edit-post' ).openGeneralSidebar( lumenSidebar )
	}
} )

// Separate the design system inspector controls into their own component to minimize unnecessary parent re-renders
const GlobalSettingsInspector = memo( () => {
	const panels = applyFilters( 'lumen.global-settings.inspector', null )

	return <> { panels } </>
} )

const GlobalSettings = () => {
	const [ userCanManageOptions, setUserCanManageOptions ] = useState( false )
	const id = useSelect( select => select( 'core' ).getCurrentUser()?.id, [] )

	const [ isStyleGuideOpen, setIsStyleGuideOpen ] = useState( false )

	useEffect( () => {
		const checkCapabilities = async () => {
			const capabilities = await currentUserHasCapability( 'manage_options' )
			setUserCanManageOptions( capabilities )
		}

		checkCapabilities()
	}, [ id ] )
	// For older WP versions (<6.6), wp.editor.PluginSidebar is undefined,
	// use wp.editSite.PluginSidebar and wp.editPost.PluginSidebar as fallback
	const PluginSidebar = window.wp.editor.PluginSidebar || window.wp.editSite?.PluginSidebar || window.wp.editPost?.PluginSidebar

	return (
		<>
			{ PluginSidebar && userCanManageOptions &&
				<PluginSidebar
					name="sidebar"
					title={ __( 'Lumen Design System', i18n ) }
					className="lmb-global-settings__inspector"
					icon={ <SVGLumenIcon /> }
				>
					<PanelBody>
						<p>
							{ __( 'Set global styles and settings for your Lumen blocks to create a consistent design across your site. All the settings below will apply globally.', i18n ) }
							{ /* &nbsp;
							<a href="" target="_docs">{ __( 'Learn more', i18n ) }</a> */ }
						</p>
						<Button
							isSecondary
							className="lmb-global-settings__preview-button"
							onClick={ () => setIsStyleGuideOpen( isOpen => ! isOpen ) }
							icon={ <Icon icon={ layoutIcon } /> }
						>
							{ isStyleGuideOpen ? __( 'Close Preview', i18n ) : __( 'Preview Design System', i18n ) }
						</Button>
					</PanelBody>
					{ isStyleGuideOpen && (
						<StyleGuidePopover onClose={ () => setIsStyleGuideOpen( false ) } />
					) }
					<GlobalSettingsInspector />
					<GuidedModalTour tourId="design-system" />
				</PluginSidebar>
			}
		</>
	)
}

if ( ! isContentOnlyMode && settings.lumen_enable_global_settings ) {
	registerPlugin( 'lumen-global-settings', {
		render: GlobalSettings,
	} )
}
