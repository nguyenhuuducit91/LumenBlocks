/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames'
import {
	BlockDiv,
	ContainerDiv,
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
		attributes,
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-blockquote',
		responsiveClass,
	] )

	const contentClassNames = classnames( [
		blockAlignmentClass,
		'lmn-block-blockquote__content',
	] )

	const innerClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
			data-v={ props.attributes.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<ContainerDiv.Content
				className={ contentClassNames }
				attributes={ attributes }
			>
				<div className={ innerClassNames }>
					<InnerBlocks.Content />
				</div>
			</ContainerDiv.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
