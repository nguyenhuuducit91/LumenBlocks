/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components'

const SmallNumberControl = props => {
	return (
		<TextControl
			type="number"
			className="lmb-small-number-control"
			{ ...props }
			__next40pxDefaultSize
		/>
	)
}

export default SmallNumberControl
