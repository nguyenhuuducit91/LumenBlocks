/**
 * External dependencies
 */
import { ProControl } from '~lumen/ui'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element'

const ProControlButton = props => {
	const {
		initialOpen,
		...propsToPass
	} = props

	const [ isOpen, setIsOpen ] = useState( initialOpen )

	const wrapperClasses = classnames( [
		'lmb-pro-control-button__wrapper',
	], {
		'lmb-pro-control-button--hidden': ! isOpen,
	} )

	return (
		<div className="components-base-control lmb-pro-control-button">
			<button className="lmb-pro-control-more-dots" onClick={ () => setIsOpen( v => ! v ) }>
				<div className="lmb-pro-control-more-dots__dot lmn-pulsating-circle"></div>
				<div className="lmb-pro-control-more-dots__dot lmn-pulsating-circle"></div>
				<div className="lmb-pro-control-more-dots__dot lmn-pulsating-circle"></div>
			</button>
			<div className={ wrapperClasses } >
				<ProControl { ...propsToPass } />
			</div>
		</div>
	)
}

ProControlButton.defaultProps = {
	initialOpen: false,
}

export default ProControlButton
