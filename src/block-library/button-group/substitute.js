import { BLOCK_STATE } from '~lumen/utils'

export const substitute = {
	from: 'lumen/button-group',
	variants: [ 'lumen/button-group|icon-button', 'lumen/button-group|button' ],
	transform: ( oldAttributes, innerBlocks, disabledBlocks ) => {
		if ( 'lumen/button-group|icon-button' in disabledBlocks && disabledBlocks[ 'lumen/button-group|icon-button' ] === BLOCK_STATE.DISABLED && // eslint-disable-line camelcase
			innerBlocks.length &&
			innerBlocks[ 0 ][ 0 ] === 'lumen/icon-button'
		) {
			return [ 'core/social-links',
				{ align: oldAttributes.contentAlign },
				[
					[ 'core/social-link', { service: 'facebook' } ],
					[ 'core/social-link', { service: 'twitter' } ],
				],
			]
		}
		if ( 'lumen/button-group|button' in disabledBlocks && disabledBlocks[ 'lumen/button-group|button' ] === BLOCK_STATE.DISABLED ) { // eslint-disable-line camelcase
			return [ 'core/buttons', {}, innerBlocks ]
		}
		return [ 'lumen/button-group', oldAttributes, innerBlocks ]
	},
}

export default substitute
