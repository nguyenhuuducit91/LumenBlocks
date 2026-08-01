/**
 * External dependencies
 */
import { createAllCombinationAttributes, __getValue } from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { addFilter, doAction } from '@wordpress/hooks'
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor'
import deepmerge from 'deepmerge'
import { Fragment } from '@wordpress/element'

// Add contentAlign attributes
const addAttributes = attributes => {
	return {
		...attributes,
		...createAllCombinationAttributes(
			'%sContentAlign', {
				type: 'string',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ]
		),
	}
}

// Align all the block contents, including block titles.
const addStyles = ( styleObject, props ) => {
	const getValue = __getValue( props.attributes )

	const styles = [ styleObject ]
	styles.push( {
		'.lmb-inner-block': {
			textAlign: getValue( 'contentAlign' ),
		},
		tablet: {
			'.lmb-inner-block': {
				textAlign: getValue( 'tabletContentAlign' ),
			},
		},
		mobile: {
			'.lmb-inner-block': {
				textAlign: getValue( 'mobileContentAlign' ),
			},
		},
	} )

	return deepmerge.all( styles )
}

const addAlignToolbar = ( output, props ) => {
	const { setAttributes } = props
	const {
		contentAlign = '',
	} = props.attributes
	return (
		<Fragment>
			{ output }
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ contentAlign => setAttributes( { contentAlign } ) }
				/>
			</BlockControls>
		</Fragment>
	)
}

const contentAlign = blockName => {
	addFilter( `lumen.${ blockName }.edit.inspector.before`, `lumen/${ blockName }/content-align`, addAlignToolbar, 11 )
	addFilter( `lumen.${ blockName }.attributes`, `lumen/${ blockName }/content-align`, addAttributes )
	addFilter( `lumen.${ blockName }.styles`, `lumen/${ blockName }/content-align`, addStyles, 9 )
	doAction( `lumen.module.content-align`, blockName )
}

export default contentAlign
