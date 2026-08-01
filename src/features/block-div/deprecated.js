import {
	deprecationBackgrounColorOpacity, deprecateShadowColor, deprecateSizeControlHeight,
} from '../helpers'

import { addFilter } from '@wordpress/hooks'
import { semverCompare } from '~lumen/utils'

addFilter( 'lumen.block-components.block-div.classnames.content', 'lumen/3.8.0', ( classes, props ) => {
	if ( semverCompare( props.version, '<', '3.8.0' ) ) {
		classes.push( {
			'lmn--block-margin-top-auto': false,
			'lmn--block-margin-bottom-auto': false,
		} )

		// Column arrangement before was added in the block class (for non-Columns & Featyre blocks)
		if ( ! props.className.includes( 'lmn-block-columns' ) && ! props.className.includes( 'lmn-block-feature' ) ) {
			classes.push( {
				'lmn--has-column-order': props.attributes.columnArrangementMobile || props.attributes.columnArrangementTablet,
			} )
		}
	}

	return classes
} )

export const deprecateBlockBackgroundColorOpacity = {
	isEligible: attributes => {
		return deprecationBackgrounColorOpacity.isEligible( 'block%s' )( attributes )
	},
	migrate: attributes => {
		return deprecationBackgrounColorOpacity.migrate( 'block%s' )( attributes )
	},
}

export const deprecateBlockShadowColor = {
	isEligible: attributes => {
		return deprecateShadowColor.isEligible( 'block%s' )( attributes )
	},
	migrate: attributes => {
		return deprecateShadowColor.migrate( 'block%s' )( attributes )
	},
}

export const deprecateBlockHeight = {
	isEligible: attributes => {
		return deprecateSizeControlHeight.isEligible( 'block%s' )( attributes )
	},
	migrate: attributes => {
		return deprecateSizeControlHeight.migrate( 'block%s' )( attributes )
	},
}
