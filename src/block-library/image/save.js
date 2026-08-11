/**
 * External dependencies
 */
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	BlockLink,
	getResponsiveClasses,
	getAlignmentClasses,
	Image,
	Link,
	getTypographyClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const figcaptionClassnames = getTypographyClasses( attributes, 'figcaption%s' )

	const blockClassNames = classnames( [
		props.className,
		'lmn-block-image',
		responsiveClass,
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			{ ( props.attributes.imageUrl || props.attributes.imageExternalUrl ) &&
				<Image.Content
					hasWrapper={ true }
					version={ props.version }
					figcaptionClassnames={ figcaptionClassnames }
					attributes={ attributes }
					customWrapper={ props.attributes.linkUrl && ( props => (
						<Link.Content
							attributes={ attributes }
							{ ...props }
						/>
					) ) }
				/>
			}
			<BlockLink.Content attributes={ attributes } />
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
