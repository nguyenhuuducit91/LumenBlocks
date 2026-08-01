
/**
 * External dependencies
 */
import { createButtonAttributes } from '~lumen/utils'

export default {
	design: {
		type: 'string',
		default: 'basic',
	},
	borderRadius: {
		type: 'number',
		default: '',
	},
	collapseOn: {
		type: 'string',
		default: '',
	},
	showButton2: {
		type: 'boolean',
		default: false,
	},
	showButton3: {
		type: 'boolean',
		default: false,
	},
	...createButtonAttributes( 'button1%s', { selector: '.lmb-button1' } ),
	...createButtonAttributes( 'button2%s', { selector: '.lmb-button2' } ),
	...createButtonAttributes( 'button3%s', { selector: '.lmb-button3' } ),
}
