import { addAttributes } from './attributes'
import { Edit } from './edit'
import { compileCustomCss } from './css'

import { applyFilters } from '@wordpress/hooks'
import { useBlockAttributesContext } from '~lumen/hooks'

/**
 * The block's custom CSS while editing.
 *
 * Rendered as a plain style element rather than pushed into the canvas
 * document, so it is torn down with the block and cannot outlive it.
 *
 * @param {Object} props Component props.
 * @return {Element|null} Element.
 */
export const CustomCSS = props => {
	const [ customCSS, uniqueId ] = useBlockAttributesContext( attributes => [
		attributes.customCSS,
		attributes.uniqueId,
	] )

	const css = compileCustomCss( customCSS, uniqueId )

	return (
		<>
			{ !! css && <style>{ css }</style> }
			{ applyFilters( 'lumen.block-component.custom-css', null, props ) }
		</>
	)
}

CustomCSS.defaultProps = {
	mainBlockClass: '',
}

/**
 * The same stylesheet, saved into the post.
 *
 * Compiled from the source rather than from the minified copy, so a post saved
 * by an older version still comes out scoped.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {Element|null} Element.
 */
CustomCSS.Content = props => {
	const { attributes = {} } = props
	const css = compileCustomCss( attributes.customCSS, attributes.uniqueId )

	return (
		<>
			{ !! css && <style>{ css }</style> }
			{ applyFilters( 'lumen.block-component.custom-css.content', null, props ) }
		</>
	)
}

CustomCSS.Content.defaultProps = {
	attributes: {},
}

CustomCSS.InspectorControls = Edit

CustomCSS.addAttributes = addAttributes
