/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	CustomCSS,
	getResponsiveClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		attributes,
		...propsToPass
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassNames = classnames( [
		propsToPass.className,
		'lmn-block-spacer',
		responsiveClass,
		'lmn--no-padding',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ props.attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ props.attributes } />
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
