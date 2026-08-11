import {
	BlockDiv,
	Typography,
	getResponsiveClasses,
	getTypographyClasses,
	getAlignmentClasses,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-count-up',
		responsiveClass,
	] )

	const textClassNames = classnames( [
		'lmn-block-count-up__text',
		textClasses,
		blockAlignmentClass,
	] )

	const duration = attributes.duration === '' ? null : attributes.duration

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<Typography.Content
				tagName="div"
				attributes={ attributes }
				className={ textClassNames }
				data-duration={ duration }
			/>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
