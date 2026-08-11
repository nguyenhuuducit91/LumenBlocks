/**
 * Internal dependencies
 */
import { blockStyles } from './block-styles'

import {
	BlockDiv,
	getResponsiveClasses,
	getAlignmentClasses,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { getBlockStyle } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const responsiveClass = getResponsiveClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const { name: blockStyle } = getBlockStyle( blockStyles, className || attributes.className ) || {}

	const blockClassNames = classnames( [
		className,
		'lmn-block-divider',
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
			{ [ 'dots', 'asterisks' ].includes( blockStyle ) ? (
				<div className="lmn-block-divider__dots" aria-hidden="true">
					<div className="lmn-block-divider__dot" />
					<div className="lmn-block-divider__dot" />
					<div className="lmn-block-divider__dot" />
				</div>
			) : <hr className="lmn-block-divider__hr" /> }
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
