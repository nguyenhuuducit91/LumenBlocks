/**
 * Internal dependencies
 */
import blockStyles from './style'

/**
 * External dependencies
k*/
import {
	BlockDiv,
	Responsive,
	Advanced,
	Typography,
	getTypographyClasses,
	getAlignmentClasses,
	Alignment,
	MarginBottom,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Transform,
} from '~lumen/features'
import { version as VERSION, i18n } from 'lumen'
import classnames from 'classnames'
import { InspectorTabs, useBlockCssGenerator } from '~lumen/ui'
import {
	withBlockAttributeContext,
	withBlockStyleContext,
	withBlockWrapperIsHovered,
	withQueryLoopContext,
} from '~lumen/hoc'
import { createBlockCompleter } from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { addFilter } from '@wordpress/hooks'
import { sprintf, __ } from '@wordpress/i18n'
import { memo } from '@wordpress/element'

/**
 * Add `autocompleters` support for lumen/subtitle
 *
 * @see ~lumen/util/blocks#createBlockCompleter
 */
addFilter( 'editor.Autocomplete.completers', 'lumen/subtitle', ( filteredCompleters, name ) => {
	if ( name === 'lumen/subtitle' ) {
		return [ ...filteredCompleters, createBlockCompleter() ]
	}
	return filteredCompleters
} )

const Edit = props => {
	const {
		className,
		onReplace,
		onRemove,
		mergeBlocks,
	} = props

	const textClasses = getTypographyClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-subtitle',
	] )

	const textClassNames = classnames( [
		'lmn-block-subtitle__text',
		'lmn-subtitle',
		textClasses,
		blockAlignmentClass,
	] )

	// Generate the CSS styles for the block.
	const blockCss = useBlockCssGenerator( {
		attributes: props.attributes,
		blockStyles,
		clientId: props.clientId,
		context: props.context,
		setAttributes: props.setAttributes,
		blockState: props.blockState,
		version: VERSION,
	} )

	return (
		<>
			<InspectorControls blockState={ props.blockState } />

			{ blockCss && <style key="block-css">{ blockCss }</style> }

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
			>
				<Typography
					tagName="p"
					className={ textClassNames }
					placeholder={ __( 'Type / to choose a block', i18n ) }
					onMerge={ mergeBlocks }
					onRemove={ onRemove }
					onReplace={ onReplace }
				/>
			</BlockDiv>
			{ props.isHovered && <MarginBottom /> }
		</>
	)
}

const InspectorControls = memo( props => {
	return (
		<>
			<InspectorTabs />

			<Typography.InspectorControls
				{ ...props }
				hasTextTag={ false }
				isMultiline={ false }
				initialOpen={ true }
				hasTextShadow={ true }
			/>

			<Alignment.InspectorControls labelContentAlign={ sprintf( __( '%s Alignment', i18n ), __( 'Text', i18n ) ) } />
			<BlockDiv.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />
		</>
	)
} )

export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles ),
)( Edit )
