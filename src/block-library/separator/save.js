/**
 * External dependencies
 */
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import {
	BlockDiv,
	getResponsiveClasses,
} from '~lumen/features'
import { Separator2 } from '~lumen/ui'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	const {
		separatorDesign,
		separatorInverted,
	} = attributes

	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-separator',
		responsiveClass,
		'lmn--no-padding',
	] )

	const separatorClassNames = classnames( [
		'lmn-block-separator__inner',
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<div className={ separatorClassNames }>
				<Separator2.Content
					design={ separatorDesign }
					inverted={ separatorInverted }
				/>
				{ applyFilters( 'lumen.block.separator.save.output.layers', null, props ) }
			</div>
		</BlockDiv.Content>
	)
}

export default withVersion( VERSION )( Save )
