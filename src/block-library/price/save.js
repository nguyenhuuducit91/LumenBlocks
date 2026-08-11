/**
 * External dependencies
 */
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	getAlignmentClasses,
	getResponsiveClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes, className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-price',
		responsiveClass,
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			data-video={ attributes.videoLink }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<InnerBlocks.Content />
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
