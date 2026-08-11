/**
 * Internal dependencies
 */
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
		'lmn-block-text',
		responsiveClass,
	] )

	const textClassNames = classnames( [
		'lmn-block-text__text',
		textClasses,
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<Typography.Content
				attributes={ attributes }
				className={ textClassNames }
				tagName={ attributes.innerTextTag || 'p' }
			/>

		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
