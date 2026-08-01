import { useState } from '@wordpress/element'
import classnames from 'classnames'

let i = 1

const AdminBaseSetting = props => {
	const { showLabel = true } = props
	const [ uid ] = useState( `lmb-admin-setting-${ i++ }` )
	const isSearched = props.searchedSettings ? props.searchedSettings.includes( props.label ) : true
	const mainClasses = classnames( [
		'lmb-admin-setting',
		props.className,
	], {
		[ `lmb-admin-setting--${ props.size }` ]: props.size,
		'lmb-admin-setting--not-highlight': ! isSearched,
	} )

	return (
		<div className={ mainClasses } id={ uid }>
			<label // eslint-disable-line
				className="lmb-admin-setting__label-wrapper"
				htmlFor={ uid }
				onClick={ props.onClick }
			>
				{ !! props.label && showLabel && <span className="lmb-admin-setting__label">{ props.label }</span> }
				<div className="lmb-admin-setting__field">
					{ props.children }
				</div>
			</label>
			{ props.help && <p className="lmb-admin-setting__help">{ props.help }</p> }
		</div>
	)
}

AdminBaseSetting.defaultProps = {
	label: '',
	onClick: () => {},
}

export default AdminBaseSetting
