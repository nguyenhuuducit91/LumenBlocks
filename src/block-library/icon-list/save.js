/**
 * Internal dependencies
 */
import { IconSvgDef } from './util'

/**
 * External dependencies
 */
import classnames from 'classnames'
import {
	getResponsiveClasses, BlockDiv, getTypographyClasses, getAlignmentClasses,
} from '~lumen/features'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { InnerBlocks } from '@wordpress/block-editor'

export const Save = props => {
	const {
		attributes,
		className,
	} = props

	const responsiveClass = getResponsiveClasses( attributes )
	const textClasses = getTypographyClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )

	const wrapList = ! attributes.listFullWidth && attributes.listDisplayStyle !== 'grid'
	const TagName = attributes.ordered ? 'ol' : 'ul'
	const ParentTagName = wrapList ? 'div' : TagName

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-list',
		blockAlignmentClass,
		responsiveClass,
		textClasses,
	], {
		'lmn__use-custom-icon-color': attributes.useCustomIconColor,
	} )
	const tagNameClassNames = classnames( [
		attributes.ordered ? 'lmn-block-icon-list__ol' : 'lmn-block-icon-list__ul',
		attributes.listDisplayStyle && attributes.listDisplayStyle === 'grid' ? 'lmn-block-icon-list--grid' : 'lmn-block-icon-list--column',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			{ ! attributes.ordered && <IconSvgDef icon={ attributes.icon } uniqueId={ attributes.uniqueId } /> }
			<ParentTagName className={ tagNameClassNames } >
				{ wrapList &&
					<TagName className="lmn-block-icon-list__group">
						<InnerBlocks.Content />
					</TagName>
				}
				{ ! wrapList && <InnerBlocks.Content /> }
			</ParentTagName>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
