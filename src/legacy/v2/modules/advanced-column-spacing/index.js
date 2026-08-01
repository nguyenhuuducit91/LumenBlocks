/**
 * External dependencies
 */
import {
	ProControl,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { createAllCombinationAttributes } from '~lumen/utils'
import { i18n, showProNotice } from 'lumen'

/**
 * WordPress dependencies
 */
import { addFilter, doAction } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'

const fineGrainedProPanel = output => {
	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Column Spacing & More', i18n ) }
				initialOpen={ false }
				className="lmb--help-tip-advanced-column-spacing"
			>
				<ProControl
					// Generic label, no translations to keep old text out of the translation files.
					title="Upgrade to Premium"
					description="Get more layouts, effects, designs and options for this block if you upgrade to Lumen Premium."
				/>
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const addAttributes = attributes => {
	return {
		...attributes,

		...createAllCombinationAttributes(
			'%sColumnPadding%s',
			{
				type: 'number',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ],
			[ 'Top', 'Right', 'Bottom', 'Left' ]
		),

		...createAllCombinationAttributes(
			'%sColumnPaddingUnit',
			{
				type: 'string',
				default: 'px',
			},
			[ '', 'Tablet', 'Mobile' ],
		),

		...createAllCombinationAttributes(
			'%sColumnGap',
			{
				type: 'number',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ]
		),

		...createAllCombinationAttributes(
			'%sColumnHeight',
			{
				type: 'number',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ]
		),

		...createAllCombinationAttributes(
			'%sColumnContent%sAlign',
			{
				type: 'string',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ],
			[ 'Vertical', 'Horizontal' ]
		),
		...createAllCombinationAttributes(
			'%sColumn%sAlign',
			{
				type: 'string',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ],
			[ 'Vertical', 'Horizontal' ]
		),
	}
}

const advancedColumnSpacing = ( blockName, options = {} ) => {
	if ( showProNotice ) {
		addFilter( `lumen.${ blockName }.edit.inspector.advanced.before`, `lumen/${ blockName }/fine-grained`, fineGrainedProPanel, 6 )
	}
	addFilter( `lumen.${ blockName }.attributes`, `lumen/${ blockName }/advanced-column-spacing`, addAttributes )
	doAction( `lumen.module.advanced-column-spacing`, blockName, options )
}

export default advancedColumnSpacing
