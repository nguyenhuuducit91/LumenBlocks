/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames/dedupe'
import {
	BlockDiv,
	ContainerDiv,
	getAlignmentClasses,
	getResponsiveClasses,
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
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const separatorClass = getSeparatorClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-hero',
		responsiveClass,
		separatorClass,
	] )

	const contentClassNames = classnames( [
		'lmn-block-hero__content',
	], getContentAlignmentClasses( attributes ) )

	const innerClassNames = classnames( applyFilters( 'lumen.hero.save.innerClassNames',
		[
			'lmn-block-content',
			'lmn-inner-blocks',
			blockAlignmentClass,
			`lmn-${ attributes.uniqueId }-inner-blocks`,
		],
		props
	) )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
			data-v={ props.attributes.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<Separator.Content attributes={ attributes }>
				<ContainerDiv.Content
					className={ contentClassNames }
					attributes={ attributes }
				>
					<div className={ innerClassNames }>
						<InnerBlocks.Content />
					</div>
				</ContainerDiv.Content>
			</Separator.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
