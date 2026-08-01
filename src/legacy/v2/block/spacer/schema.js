/**
 * External dependencies
 */
import { createResponsiveAttributes } from '~lumen/utils'
import {
	createBackgroundAttributes,
} from '../../util'

export default {
	...createResponsiveAttributes( '%sHeight', {
		type: 'number',
		default: '',
	} ),
	...createResponsiveAttributes( '%sHeightUnit', {
		type: 'string',
		default: 'px',
	} ),

	// Background.
	...createBackgroundAttributes( '%s' ),
}
