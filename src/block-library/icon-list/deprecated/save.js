/**
 * External dependencies
 */
import classnames from 'classnames'
import {
	getResponsiveClasses, BlockDiv, Typography, getTypographyClasses, getAlignmentClasses,
} from '~lumen/features'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes,
		className,
	} = props

	const responsiveClass = getResponsiveClasses( attributes )
	const textClasses = getTypographyClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )

	const tagName = attributes.ordered ? 'ol' : 'ul'

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-list',
		blockAlignmentClass,
		responsiveClass,
		textClasses,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<Typography.Content
				tagName={ tagName }
				attributes={ attributes }
				multiline="li"
			/>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
