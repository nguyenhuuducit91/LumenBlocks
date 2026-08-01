/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	BlockDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	getRowClasses,
	getTypographyClasses,
	// Separator,
	getSeparatorClasses,
	getContentAlignmentClasses,
	Typography,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes,
	} = props

	const rowClass = getRowClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const typographyClass = getTypographyClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const dateClassNames = classnames( [
		typographyClass,
		'lmn-block-timeline__date',
	] )

	const blockClassName = classnames( [
		props.className,
		'lmn-block-timeline',
		responsiveClass,
		separatorClass,
		{
			'lmn-block-timeline--left': props.attributes.timelinePosition !== 'right',
			'lmn-block-timeline--right': props.attributes.timelinePosition === 'right',
			'lmn-is-last': props.attributes.timelineIsLast,
		},
	] )

	const contentClassNames = classnames( applyFilters( 'lumen.new-block.save.contentClassNames', [
		[
			rowClass,
			'lmn-inner-blocks',
			blockAlignmentClass,
			'lmn-block-content',
		],
		getContentAlignmentClasses( props.attributes ),
	], props ) )

	return (
		<BlockDiv.Content
			className={ blockClassName }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			{ /* <Separator.Content attributes={ attributes }> */ }
			<div className={ contentClassNames }>
				<Typography.Content
					tagName="div"
					className={ dateClassNames }
					attributes={ attributes }
					// onMerge={ mergeBlocks }
					// onRemove={ onRemove }
					// onReplace={ onReplace }
					// onSplit={ onSplit }
				/>
				<div className="lmn-block-timeline__middle"></div>
				<div className="lmn-block-timeline__content">
					<InnerBlocks.Content />
				</div>
			</div>
			{ /* </Separator.Content> */ }
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
