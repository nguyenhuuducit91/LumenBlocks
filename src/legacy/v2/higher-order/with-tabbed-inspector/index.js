/**
 * Internal dependencies
 */
import withMemory from './with-memory'

/**
 * External dependencies
 */
import { InspectorPanelControls, PanelTabs as _PanelTabs } from '~lumen/ui'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import {
	Fragment, useState,
} from '@wordpress/element'
import { addFilter, applyFilters } from '@wordpress/hooks'
import { InspectorControls } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

const PanelTabs = withMemory( _PanelTabs )

// Add the layout tab.
addFilter( 'lumen.inspector.tabs', 'lumen/v2', tabs => {
	if ( tabs.find( ( { value } ) => value === 'layout' ) ) {
		return tabs
	}
	return [
		{
			value: 'layout',
			title: __( 'Layout', i18n ),
			label: __( 'Layout Tab', i18n ),
			icon: 'admin-settings',
		},
		...tabs,
	]
} )

const withTabbedInspector = ( tabs = null ) => WrappedComponent => {
	const NewComp = props => {
		const { blockName } = props
		const [ activeTab, setActiveTab ] = useState( null )
		const blockStyleControls = applyFilters( `lumen.${ blockName }.edit.inspector.style.block`, null, props )

		return (
			<Fragment>
				{ applyFilters( `lumen.edit.inspector.before`, null, props ) }
				{ applyFilters( `lumen.${ blockName }.edit.inspector.before`, null, props ) }

				<InspectorControls>
					<PanelTabs
						tabs={ tabs || [ 'layout', 'style', 'advanced' ] }
						onTabFirstOpen={ setActiveTab }
						onClick={ setActiveTab }
					/>

					{ ( ! activeTab || activeTab === 'layout' ) &&
						<InspectorPanelControls>
							{ applyFilters( `lumen.${ blockName }.edit.inspector.layout.before`, null, props ) }
							{ applyFilters( `lumen.${ blockName }.edit.inspector.layout.after`, null, props ) }
						</InspectorPanelControls>
					}

					{ ( ! activeTab || activeTab === 'style' ) &&
						<InspectorPanelControls tab="style">
							{ applyFilters( `lumen.${ blockName }.edit.inspector.style.before`, null, props ) }
							{ applyFilters( `lumen.${ blockName }.edit.inspector.style.after`, null, props ) }
							{ blockStyleControls && <div className="lmb-panel-controls-separator" role="presentation">— — —</div> }
							{ blockStyleControls }
						</InspectorPanelControls>
					}

					{ ( ! activeTab || activeTab === 'advanced' ) &&
						<InspectorPanelControls tab="advanced">
							{ applyFilters( `lumen.${ blockName }.edit.inspector.advanced.before`, null, props ) }
							{ applyFilters( `lumen.${ blockName }.edit.inspector.advanced.after`, null, props ) }
						</InspectorPanelControls>
					}
				</InspectorControls>

				<WrappedComponent { ...props } />
			</Fragment>
		)
	}

	NewComp.defaultProps = {
		...( WrappedComponent.defaultProps || {} ),
		attributes: {},
		blockName: '',
	}

	return NewComp
}

export default withTabbedInspector
