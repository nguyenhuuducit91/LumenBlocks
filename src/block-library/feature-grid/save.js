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
	Separator,
	getSeparatorClasses,
	getContentAlignmentClasses,
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

	const rowClass = getRowClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassNames = classnames(
		applyFilters( 'lumen.feature-grid.save.blockClassNames', [
			[
				props.className,
				'lmn-block-feature-grid',
				'lmn-block-columns', // We need to add the columns class to make fit all and column gap to work properly.
				responsiveClass,
				separatorClass,
			],
		], props )
	)

	// The wrap marker belongs on the flex wrapper so justified wrapped columns
	// keep their configured widths, matching the Columns block behavior.
	const contentClassNames = classnames(
		applyFilters( 'lumen.feature-grid.save.contentClassNames', [
			[
				rowClass,
				'lmn-inner-blocks',
				blockAlignmentClass,
				'lmn-block-content',
			],
			{
				'lmn--column-wrap-desktop': attributes.columnWrapDesktop,
			},
			getContentAlignmentClasses( attributes ),
		], props )
	)

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<Separator.Content attributes={ attributes }>
				<div className={ contentClassNames }>
					<InnerBlocks.Content />
				</div>
			</Separator.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
