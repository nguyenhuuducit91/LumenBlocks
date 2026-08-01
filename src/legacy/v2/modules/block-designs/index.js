/**
 * Internal dependencies
 */
// import { DesignLibraryControl } from '../../components'

/**
 * External dependencies
 */
import { PanelAdvancedSettings } from '~lumen/ui'
// import { applyBlockDesign } from '~lumen/utils'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { addFilter, doAction } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'

const addDesignPanel = () => output => {
	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Designs', i18n ) }
				initialOpen={ true }
			>
				<p className="components-base-control__help">{ __( 'The designs for v2 blocks have been replaced with the new design library.', i18n ) }</p>
				{ /* <p className="components-base-control__help">{ __( 'You will not lose your block content when changing designs.', i18n ) }</p>
				<DesignLibraryControl
					block={ `lmb/${ blockName }` }
					onSelect={ designData => {
						applyBlockDesign( designData.attributes )
					} }
				/> */ }
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const blockDesigns = ( blockName, options = {} ) => {
	const optionsToPass = {
		...options,
	}

	addFilter( `lumen.${ blockName }.edit.inspector.layout.before`, `lumen/${ blockName }/block-designs`, addDesignPanel( blockName, optionsToPass ), 20 )
	doAction( `lumen.module.block-designs`, blockName )
}

export default blockDesigns
