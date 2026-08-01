/**
 * External dependencies
 */
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const InspectorBottomTip = () => {
	return (
		<p className="lmn-inspector-bottom-tip">
			{ __( 'Click on any inner block in the editor to style it.', i18n ) }
		</p>
	)
}

export default InspectorBottomTip
