import {
	BlockDiv,
	Typography,
	getResponsiveClasses,
	getTypographyClasses,
	getAlignmentClasses,
	Icon,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { getUseSvgDef } from '../icon-list/util'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( attributes )
	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-list-item',
		responsiveClass,
	] )

	const textClassNames = classnames( [
		'lmn-block-icon-list-item__text',
		textClasses,
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			blockHoverClass={ props.blockHoverClass }
			clientId={ props.clientId }
			attributes={ props.attributes }
			className={ blockClassNames }
			blockTag="li"
			renderHtmlTag={ false }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<div className="lmn-block-icon-list-item__content">
				{ ! attributes.ordered && attributes.icon &&
					<Icon.Content
						value={ attributes.icon }
						attributes={ attributes }
						hasLinearGradient={ false }
					/> }
				{ ! attributes.ordered && ! attributes.icon &&
					<Icon.Content
						attributes={ attributes }
						useSvgDef={ true }
						value={ getUseSvgDef(
							`#lmn-icon-list__icon-svg-def-${ attributes.parentUniqueId }`
						) }
						hasLinearGradient={ false }
					/> }
				{ attributes.ordered && <span className="lmn-block-icon-list-item__marker" aria-hidden="true"></span> }
				<Typography.Content
					attributes={ attributes }
					tagName="span"
					className={ textClassNames }
				/>
			</div>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
