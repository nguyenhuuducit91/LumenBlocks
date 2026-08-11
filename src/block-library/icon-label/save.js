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
	getRowClasses,
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

	const rowClass = getRowClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-label',
		responsiveClass,
	] )

	const contentClassNames = classnames( [
		rowClass,
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-content',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<div className={ contentClassNames }>
				<InnerBlocks.Content />
			</div>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
