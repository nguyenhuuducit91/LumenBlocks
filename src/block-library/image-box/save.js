/**
 * External dependencies
 */
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	BlockLink,
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
		attributes,
	} = props

	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )
	const rowClass = getRowClasses( props.attributes )

	const blockClassNames = classnames( [
		props.className,
		'lmn-block-image-box',
		responsiveClass,
		'lmn-hover-parent', // Hover parent here to make sure the effect shows even with a block link.
	] )

	const contentClassNames = classnames( [
		'lmn-block-content',
		'lmn-inner-blocks',
		blockAlignmentClass,
		rowClass,
		'lmn-block-image-box__content',
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
			<BlockLink.Content attributes={ attributes } isHidden={ false } />
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
