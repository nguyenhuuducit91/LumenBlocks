/**
 * External dependencies
 */
import classnames from 'classnames'

const InspectorPanelControls = props => {
	const mainClasses = classnames( [
		'lmb-inspector-panel-controls',
		`lmb-panel-${ props.tab }`,
	] )

	return (
		<div className={ mainClasses }>
			{ props.children }
		</div>
	)
}

InspectorPanelControls.defaultProps = {
	tab: 'layout',
}

export default InspectorPanelControls
