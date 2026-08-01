/**
 * External dependencies
 */
import { compileCSS, minifyCSS } from '~lumen/utils'
import { PanelAdvancedSettings, ProControl } from '~lumen/ui'

/**
 * WordPress dependencies
 */
import { addFilter, doAction } from '@wordpress/hooks'
import {
	i18n, isPro, showProNotice,
} from 'lumen'
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'

const customCSSProPanel = output => {
	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				initialOpen={ false }
				title={ __( 'Custom CSS', i18n ) }
			>
				<ProControl type="custom-css" />
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const addAttributes = attributes => {
	return {
		...attributes,
		customCSS: {
			type: 'string',
			default: '',
		},
		// Dynamic blocks may need to have JS write their CSS.
		customCSSCompiled: {
			type: 'string',
			default: '',
		},
		customCSSUniqueID: {
			type: 'string',
			default: '',
		},
	}
}

// Mimic how the Lumen Premium renders custom CSS.
const outputStyle = ( output, design, props ) => {
	const mainClass = props.mainClassName
	const {
		customCSS = '',
		uniqueClass = props.attributes.customCSSUniqueID || '',
	} = props.attributes

	const minified = minifyCSS( compileCSS( customCSS, mainClass, uniqueClass ), true )

	return (
		<Fragment>
			{ output }
			{ minified && <style>{ minified }</style> }
		</Fragment>
	)
}

const customCSS = blockName => {
	if ( showProNotice ) {
		addFilter( `lumen.${ blockName }.edit.inspector.advanced.after`, `lumen/${ blockName }/custom-css`, customCSSProPanel, 20 )
	}
	addFilter( `lumen.${ blockName }.attributes`, `lumen/${ blockName }/custom-css`, addAttributes )

	// If there's some custom CSS, but we're in the free version (user downgraded),
	// still render the custom CSS so as not produce a block error.
	if ( ! isPro ) {
		addFilter( `lumen.${ blockName }.save.output.outer`, `lumen/pro/${ blockName }/custom-css/downgrade`, outputStyle )
	}

	doAction( `lumen.module.custom-css`, blockName )
}

export default customCSS
