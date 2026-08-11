/**
 * Internal dependencies
 */
import SVGCloseIcon from './images/close-icon.svg'

/**
 * External dependencies
 */
import { version as VERSION, i18n } from 'lumen'
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames/dedupe'
import {
	BlockDiv,
	ContainerDiv,
	BlockLink,
	getAlignmentClasses,
	getResponsiveClasses,
	getContentAlignmentClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
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
		'lmn-block-notification',
		responsiveClass,
	], {
		'lmn--is-dismissible': attributes.isDismissible,
		[ `lmn--is-${ props.attributes.notificationType }` ]: props.attributes.notificationType,
	} )

	const contentClassNames = classnames( [
		'lmn-block-notification__content',
	], getContentAlignmentClasses( attributes ) )

	const innerClassNames = classnames( applyFilters( 'lumen.notification.save.innerClassNames',
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
			<ContainerDiv.Content
				className={ contentClassNames }
				attributes={ attributes }
			>
				<div className={ innerClassNames }>
					<InnerBlocks.Content />
				</div>
				<BlockLink.Content attributes={ attributes } />
				{ attributes.isDismissible &&
					<button
						className="lmn-block-notification__close-button"
						aria-label={ __( 'Close', i18n ) }
						{ ...applyFilters( 'lumen.notification.save.close-button-props', {}, props ) }
					>
						<SVGCloseIcon
							width={ attributes.dismissibleSize || 16 }
							height={ attributes.dismissibleSize || 16 }
						/>
					</button>
				}
			</ContainerDiv.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
