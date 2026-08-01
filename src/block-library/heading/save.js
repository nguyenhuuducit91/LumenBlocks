/**
 * External dependencies
 */
import {
	BlockDiv,
	CustomCSS,
	Typography,
	getResponsiveClasses,
	getTypographyClasses,
	getAlignmentClasses,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( applyFilters( 'lumen.heading.save.blockClassNames', [
		className,
		'lmn-block-heading',
		responsiveClass,
		'lmn-block-heading--v2',
	], props ) )

	const textClassNames = classnames( [
		'lmn-block-heading__text',
		textClasses,
		blockAlignmentClass,
	], {
		'lmn-block-heading--use-theme-margins': attributes.useThemeTextMargins,
	} )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			{ props.attributes.showTopLine && <div className="lmn-block-heading__top-line" /> }
			<Typography.Content
				attributes={ attributes }
				className={ textClassNames }
				defaultTag="h2"
			/>
			{ props.attributes.showBottomLine && <div className="lmn-block-heading__bottom-line" /> }
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
