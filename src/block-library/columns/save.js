/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import classnames from 'classnames/dedupe'
import {
	BlockDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	getRowClasses,
	Separator,
	getSeparatorClasses,
	getContentAlignmentClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const {
		attributes,
	} = props

	const rowClass = getRowClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassName = classnames( [
		props.className,
		'lmn-block-columns',
		responsiveClass,
		separatorClass,
	] )

	const contentClassNames = classnames( applyFilters( 'lumen.columns.save.contentClassNames', [
		[
			rowClass,
			'lmn-inner-blocks',
			blockAlignmentClass,
			'lmn-block-content',
		],
		{
			'lmn--column-wrap-desktop': attributes.columnWrapDesktop,
		},
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
			<Separator.Content attributes={ attributes }>
				<div className={ contentClassNames }>
					<InnerBlocks.Content />
				</div>
			</Separator.Content>
		</BlockDiv.Content>
	)
}

export default withVersion( VERSION )( Save )
