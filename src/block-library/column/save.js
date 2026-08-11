/**
 * External dependencies
 */
import classnames from 'classnames/dedupe'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	BlockLink,
	ContainerDiv,
	getAlignmentClasses,
	getColumnClasses,
	getResponsiveClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const {
		attributes,
	} = props

	const [ columnClass, columnWrapperClass ] = getColumnClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassNames = classnames( applyFilters( 'lumen.column.save.blockClassNames', [
		props.className,
		'lmn-block-column',
		columnClass,
		responsiveClass,
	], props ) )

	const contentClassNames = classnames( [
		columnWrapperClass,
		'lmn-block-column__content',
	] )

	const innerClassNames = applyFilters( 'lumen.column.save.innerClassNames',
		classnames( [
			blockAlignmentClass,
			'lmn-block-content',
			'lmn-inner-blocks',
			`lmn-${ attributes.uniqueId }-inner-blocks`,
			{ 'lmn--align-last-block-to-bottom': props.attributes.alignLastBlockToBottom },
		] ),
		props
	)

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
				<BlockLink.Content attributes={ attributes } />
			</ContainerDiv.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
