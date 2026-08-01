import {
	BlockDiv,
	CustomCSS,
	getResponsiveClasses,
	getTypographyClasses,
	getAlignmentClasses,
	Icon,
} from '~lumen/features'
import { RichText } from '~lumen/ui'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-tab-labels',
		responsiveClass,
		{
			'lmn-block-tab-labels--wrap-mobile': ! props.attributes.scrollableOnMobile,
		},
	] )

	const textClassNames = classnames( [
		'lmn-block-tab-labels__text',
		textClasses,
		blockAlignmentClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			<div
				className="lmn-block-tab-labels__wrapper"
				role="tablist"
			>
				{ props.attributes.tabLabels.map( ( tab, index ) => {
					return (
						<button
							className="lmn-block-tabs__tab"
							role="tab"
							key={ index }
							id={ props.attributes.tabLabels[ index ].anchor ?? undefined }
						>
							{ props.attributes.showIcon && (
								<Icon.Content
									attributes={ attributes }
									value={ props.attributes.tabLabels[ index ].icon }
								/>
							) }
							<div className={ textClassNames }>
								<RichText.Content
									tagName="span"
									value={ tab.label }
								/>
							</div>
						</button>
					)
				} ) }
			</div>

		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
