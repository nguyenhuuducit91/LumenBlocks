/**
 * Internal dependencies
 */
import { getMarqueeClasses } from './classes'

/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames/dedupe'
import {
	BlockDiv,
	getAlignmentClasses,
	getContentAlignmentClasses,
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
		className,
	} = props

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-marquee',
		responsiveClass,
	], getMarqueeClasses( attributes ) )

	const groupClassNames = classnames( applyFilters( 'lumen.marquee.save.groupClassNames',
		[
			'lmn-block-marquee__group',
			'lmn-block-content',
			'lmn-inner-blocks',
			blockAlignmentClass,
			`lmn-${ attributes.uniqueId }-inner-blocks`,
		],
		props
	), getContentAlignmentClasses( attributes ) )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
			data-v={ props.attributes.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			{ /*
			  * One set of the items is saved. The frontend script repeats this
			  * group until the row is wider than the screen, which is what
			  * makes the loop seamless — see `frontend-marquee.js`. Saving the
			  * repeats instead is not possible: `InnerBlocks.Content` marks
			  * where the inner blocks go, and marking it twice leaves the
			  * parser with more slots than blocks.
			  */ }
			<div className="lmn-block-marquee__viewport">
				<div className="lmn-block-marquee__track">
					<div className={ groupClassNames }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
