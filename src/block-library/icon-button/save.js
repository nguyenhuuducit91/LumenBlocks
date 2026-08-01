/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	CustomCSS,
	Button,
	getResponsiveClasses,
	CustomAttributes,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		className,
		...propsToPass
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const customAttributes = CustomAttributes.getCustomAttributes( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-icon-button',
		responsiveClass,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ props.attributes }
			applyCustomAttributes={ false }
			version={ props.version }
		>
			{ props.attributes.generatedCss && <style>{ props.attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ props.attributes } />
			<Button.Content
				{ ...propsToPass }
				attributes={ props.attributes }
				buttonProps={ {
					id: props.attributes.anchorId || undefined,
					...customAttributes,
				} }
			>
			</Button.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
