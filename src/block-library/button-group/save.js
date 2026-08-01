/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import classnames from 'classnames/dedupe'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import {
	BlockDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	getRowClasses,
} from '~lumen/features'

export const Save = props => {
	const {
		attributes,
	} = props

	const {
		collapseOn = '',
	} = attributes

	const rowClass = getRowClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassName = classnames( [
		props.className,
		'lmn-block-button-group',
		responsiveClass,
	] )

	const contentClassNames = classnames( [
		rowClass,
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-content',
		'lmn-button-group',
		{
			[ `lmn--collapse-on-${ collapseOn }` ]: collapseOn,
		},
	] )

	return (
		<BlockDiv.Content
			className={ blockClassName }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			<div className={ contentClassNames }>
				<InnerBlocks.Content />
			</div>
		</BlockDiv.Content>
	)
}

export default withVersion( VERSION )( Save )
