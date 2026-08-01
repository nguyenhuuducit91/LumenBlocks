import { BLOCK_STATE } from '~lumen/utils'

export const substitute = {
	from: 'lumen/button',
	variants: [ 'lumen/button-group|button' ],
	transform: ( oldAttributes, innerBlocks, disabledBlocks ) => {
		if ( 'lumen/button-group|button' in disabledBlocks && disabledBlocks[ 'lumen/button-group|button' ] === BLOCK_STATE.DISABLED ) { // eslint-disable-line camelcase
			return [ 'core/button', {
				text: oldAttributes.text,
			} ]
		}
		return [ 'lumen/button', oldAttributes ]
	},
}

export default substitute
