/**
 * External dependencies
 */
import { PanelTabs, PanelAdvancedSettings } from '~lumen/ui'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element'
import { createSlotFill } from '@wordpress/components'
import { InspectorControls, useBlockEditContext } from '@wordpress/block-editor'
import { useGlobalState } from '~lumen/utils/global-state'
import { __, sprintf } from '@wordpress/i18n'
import { getBlockSupport } from '@wordpress/blocks'
import { useSelect } from '@wordpress/data'
import { BlockStylesControl } from '../block-styles-control'
import BlockChangesPanel, { useAppliedSettings } from '../block-changes-panel'
import InspectorSearch from '../inspector-search'

/**
 * The applied-settings panel, with the count in its own title.
 *
 * A separate component because the count comes from a hook, and the panel is
 * rendered inside `InspectorTabs` where calling it directly would run on every
 * tab rather than only the one that shows the list.
 *
 * @return {Element} The panel.
 */
const AppliedSettingsPanel = () => {
	const applied = useAppliedSettings()

	return (
		<PanelAdvancedSettings
			title={ applied.length
				? sprintf(
					/* translators: %d: how many settings are set on this block. */
					__( 'Applied settings (%d)', i18n ),
					applied.length
				)
				: __( 'Applied settings', i18n ) }
			id="applied-settings"
			initialOpen={ false }
			showModifiedIndicator={ !! applied.length }
		>
			<BlockChangesPanel />
		</PanelAdvancedSettings>
	)
}

const { Slot: LayoutPanelSlot, Fill: LayoutPanelFill } = createSlotFill( 'LumenLayoutPanel' )

const InspectorLayoutControls = ( { children } ) => {
	return <InspectorControls>
		<LayoutPanelFill>{ children }</LayoutPanelFill>
	</InspectorControls>
}

const InspectorBlockControls = ( { children } ) => {
	const { name } = useBlockEditContext()
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, 'layout' )

	if ( activeTab !== 'layout' ) {
		return null
	}

	return <InspectorControls>{ children }</InspectorControls>
}

const InspectorStyleControls = ( { children } ) => {
	const { name } = useBlockEditContext()
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, 'layout' )

	if ( activeTab !== 'style' ) {
		return null
	}

	return <InspectorControls>{ children }</InspectorControls>
}

const InspectorAdvancedControls = ( { children } ) => {
	const { name } = useBlockEditContext()
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, 'layout' )

	if ( activeTab !== 'advanced' ) {
		return null
	}

	return <InspectorControls>{ children }</InspectorControls>
}

export {
	InspectorLayoutControls,
	InspectorBlockControls,
	InspectorStyleControls,
	InspectorAdvancedControls,
}

const InspectorTabs = props => {
	const { name, clientId } = useBlockEditContext()
	const hasBlockStyles = useSelect(
		select => !! select( 'lumen/global-block-styles' )?.getBlockStyles( name )?.length,
		[ name ]
	)
	const defaultTab = getBlockSupport( name, 'lmnDefaultTab' ) || 'style'
	const [ activeTab, setActiveTab ] = useGlobalState( `tabCache-${ name }`, props.tabs.includes( defaultTab ) ? defaultTab : 'style' )

	return (
		<>
			<InspectorControls>
				{ /*
				 * Only when there is something to choose. Saving a new style
				 * still needs a naming dialog that this build does not have, so
				 * with no styles stored the control would be a menu containing
				 * "Default" and a button that does nothing.
				 */ }
				{ !! hasBlockStyles && <BlockStylesControl blockName={ name } clientId={ clientId } /> }

				{ /*
				 * What this block currently sets, above the tabs rather than on
				 * one of them.
				 *
				 * It used to sit on Advanced, which put the answer to "what have
				 * I changed on this block" behind a tab — and the settings it
				 * lists are spread across all three. Above the strip it belongs
				 * to the block rather than to a tab, and the row you click can
				 * take you to any of them without you having navigated back
				 * first.
				 */ }
				<AppliedSettingsPanel />

				{ /*
				 * The search sits between the list and the tabs, and belongs to
				 * neither. It used to be rendered inside the tab strip, which
				 * tied a box that searches all three tabs to the one thing on
				 * screen that is about choosing between them.
				 */ }
				<InspectorSearch />

				<PanelTabs
					tabs={ props.tabs }
					initialTab={ activeTab }
					onClick={ setActiveTab }
				/>
			</InspectorControls>

			{ /* Make sure the layout panel is the very first one */ }
			<InspectorBlockControls>
				{ props.hasLayoutPanel && (
					<PanelAdvancedSettings
						title={ __( 'Layout', i18n ) }
						id="layout"
						initialOpen={ true }
					>
						<LayoutPanelSlot />
					</PanelAdvancedSettings>
				) }
			</InspectorBlockControls>

		</>
	)
}

InspectorTabs.defaultProps = {
	tabs: [ 'layout', 'style', 'advanced' ],
	hasLayoutPanel: true,
}

export default memo( InspectorTabs )
