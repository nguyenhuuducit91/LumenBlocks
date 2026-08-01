/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import classnames from 'classnames'
import { PanelAdvancedSettings } from '~lumen/ui'

const PanelSpacingBody = props => {
	const { blockProps } = props
	return (
		<PanelAdvancedSettings
			title={ __( 'Spacing', i18n ) }
			{ ...props }
			className={ classnames( [ 'lmb--help-tip-spacing', props.className ] ) }
		>
			{ applyFilters( 'lumen.panel-spacing-body.edit.before', null, blockProps ) }
			{ props.children }
			{ applyFilters( 'lumen.panel-spacing-body.edit.after', null, blockProps ) }
		</PanelAdvancedSettings>
	)
}

PanelSpacingBody.defaultProps = {
	className: '',
	blockProps: {},
}

export default PanelSpacingBody
