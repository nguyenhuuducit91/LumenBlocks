/**
 * External dependencies
 */
import classnames from 'classnames/dedupe'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	BlockLink,
	ContainerDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	Image,
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
	const {
		hasContainer,
	} = props.attributes

	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassNames = classnames( [
		props.className,
		'lmn-block-card',
		responsiveClass,
	] )

	const contentClassNames = classnames(
		applyFilters( 'lumen.card.save.contentClassNames', {
			'lmn--no-padding': true,
		}, props ) )

	const wrapperClassNames = classnames(
		applyFilters( 'lumen.card.save.wrapperClassNames', {
			'lmn-container-padding': hasContainer,
			'lmn-block-card__content': true,
		}, props )
	)

	const innerClassNames = classnames(
		applyFilters( 'lumen.card.save.innerClassNames', [
			{
				'lmn-block-content': true,
				'lmn-inner-blocks': true,
				[ blockAlignmentClass ]: blockAlignmentClass,
			},
			`lmn-${ attributes.uniqueId }-inner-blocks`,
		], props ) )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
			data-v={ props.attributes.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			{ attributes.uniqueId && <ContainerDiv.Content
				className={ contentClassNames }
				attributes={ attributes }
			>
				{ ( props.attributes.imageUrl || props.attributes.imageExternalUrl ) &&
					<Image.Content
						className="lmn-block-card__image"
						attributes={ attributes }
					/>
				}
				{ applyFilters( 'lumen.card.save.container-div.content', (
					<div className={ wrapperClassNames }>
						<div className={ innerClassNames }>
							<InnerBlocks.Content />
						</div>
					</div>
				), props, innerClassNames ) }
				<BlockLink.Content attributes={ attributes } />
			</ContainerDiv.Content> }
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
