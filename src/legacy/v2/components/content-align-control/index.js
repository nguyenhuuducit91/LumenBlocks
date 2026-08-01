/**
 * External dependencies
 */
import { AlignButtonsControl } from '~lumen/ui'
import ResponsiveControl from '../responsive-control'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { i18n } from 'lumen'
import classnames from 'classnames'

const ContentAlignControl = props => {
	return (
		<ResponsiveControl
			attrNameTemplate="%sContentAlign"
			setAttributes={ props.setAttributes }
			blockAttributes={ props.blockAttributes }
		>
			<AlignButtonsControl
				label={ props.label }
				className={ classnames( [ props.className, 'lmb--help-tip-alignment-all' ] ) }
			/>
		</ResponsiveControl>
	)
}

ContentAlignControl.defaultProps = {
	className: '',
	setAttributes: () => {},
	blockAttributes: {},
	label: __( 'Align', i18n ),
}

export default ContentAlignControl
