/**
 * External dependencies
 */
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { i18n, version as VERSION } from 'lumen'
import {
	BlockDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	getRowClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { applyFilters } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'

export const Save = props => {
	const {
		attributes, className,
	} = props

	const rowClass = getRowClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )
	const responsiveClass = getResponsiveClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-video-popup',
		responsiveClass,
	] )

	const contentClassNames = classnames( [
		'lmn-block-video-popup__overlay',
		rowClass,
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-content',
		'lmn-hover-parent',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			data-video={ attributes.videoLink }
			version={ props.version }
			data-nofullscreen={ attributes.videoFullscreen ? null : '' }
			data-nodownload={ attributes.videoDownload ? null : '' }
			data-loop={ attributes.videoLoop ? '' : null }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			{ applyFilters( 'lumen.video-popup.save.div.content', (
				<div
					className={ contentClassNames }
					aria-label={ attributes.ariaLabel || __( 'Play Video', i18n ) }
					tabIndex="0"
					role="button"
				>
					<InnerBlocks.Content />
				</div>
			), props, contentClassNames ) }

		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
