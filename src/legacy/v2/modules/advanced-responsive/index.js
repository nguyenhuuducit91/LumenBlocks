/**
 * WordPress dependencies
 */
import {
	addFilter, applyFilters, doAction,
} from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import { AdvancedToggleControl, PanelAdvancedSettings } from '~lumen/ui'

const responsivePanel = blockName => ( output, props ) => {
	const { setAttributes } = props
	const {
		hideDesktop = false,
		hideTablet = false,
		hideMobile = false,
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Responsive', i18n ) }
				initialOpen={ false }
			>
				{ applyFilters( `lumen.${ blockName }.edit.advanced.responsive.before`, null, props ) }
				<AdvancedToggleControl
					label={ __( 'Hide on Desktop', i18n ) }
					checked={ hideDesktop }
					onChange={ hideDesktop => setAttributes( { hideDesktop } ) }
				/>
				<AdvancedToggleControl
					label={ __( 'Hide on Tablet', i18n ) }
					checked={ hideTablet }
					onChange={ hideTablet => setAttributes( { hideTablet } ) }
				/>
				<AdvancedToggleControl
					label={ __( 'Hide on Mobile', i18n ) }
					checked={ hideMobile }
					onChange={ hideMobile => setAttributes( { hideMobile } ) }
				/>
				{ applyFilters( `lumen.${ blockName }.edit.advanced.responsive.after`, null, props ) }
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const addHideClasses = ( mainClasses, props ) => {
	const {
		hideDesktop = false,
		hideTablet = false,
		hideMobile = false,
	} = props.attributes

	return {
		...mainClasses,
		'lmb--hide-desktop': hideDesktop,
		'lmb--hide-tablet': hideTablet,
		'lmb--hide-mobile': hideMobile,
	}
}

const addAttributes = attributes => {
	return {
		...attributes,
		hideDesktop: {
			type: 'boolean',
			default: false,
		},
		hideTablet: {
			type: 'boolean',
			default: false,
		},
		hideMobile: {
			type: 'boolean',
			default: false,
		},
	}
}

const advancedResponsive = blockName => {
	addFilter( `lumen.${ blockName }.edit.inspector.advanced.before`, `lumen/${ blockName }/advanced-responsive`, responsivePanel( blockName ), 19 )
	addFilter( `lumen.${ blockName }.attributes`, `lumen/${ blockName }/advanced-responsive`, addAttributes )
	addFilter( `lumen.${ blockName }.main-block.classes`, `lumen/${ blockName }/advanced-responsive`, addHideClasses )
	doAction( `lumen.module.advanced-responsive`, blockName )
}

export default advancedResponsive
