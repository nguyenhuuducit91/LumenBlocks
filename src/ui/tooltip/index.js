import classnames from 'classnames'
import { Tooltip as _Tooltip } from '@wordpress/components'

const Tooltip = props => {
	return (
		<_Tooltip
			{ ...props }
			className={ classnames( [ props.className, 'lmn-tooltip' ] ) }
			text={
				<span className="lmn-tooltip__text">
					{ props.text }
				</span>
			}
		/>
	)
}

Tooltip.defaultProps = {
	className: '',
}

export default Tooltip
