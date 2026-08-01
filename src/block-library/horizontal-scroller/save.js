/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	 BlockDiv,
	 CustomCSS,
	 getRowClasses,
	 getAlignmentClasses,
	 getResponsiveClasses,
	 getContentAlignmentClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	 const {
		 attributes,
	 } = props

	 const rowClass = getRowClasses( props.attributes )
	 const blockAlignmentClass = getAlignmentClasses( props.attributes )
	 const responsiveClass = getResponsiveClasses( props.attributes )

	 const blockClassName = classnames( [
		 props.className,
		 'lmn-block-horizontal-scroller',
		 responsiveClass,
	 ] )

	 const contentClassNames = classnames( applyFilters( 'lumen.horizontal-scroller.save.contentClassNames', [
		 [
			rowClass,
			 'lmn-inner-blocks',
			 blockAlignmentClass,
			 'lmn-block-content',
		 ],
		 getContentAlignmentClasses( props.attributes, 'horizontal-scroller' ),
	 ], props ), {
		'lmn--with-scrollbar': attributes.showScrollbar,
	 } )

	 return (
		 <BlockDiv.Content
			 className={ blockClassName }
			 attributes={ attributes }
			 version={ props.version }
		 >
			 { attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			 <CustomCSS.Content attributes={ attributes } />
			<div
				className={ contentClassNames }
				tabIndex={ 0 }
				{ ...applyFilters( 'lumen.horizontal-scroller.save.scroller-props', {}, props ) }
			>
				<InnerBlocks.Content />
			</div>
		 </BlockDiv.Content>
	 )
}

export default withVersion( VERSION )( Save )
