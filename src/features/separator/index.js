export * from './get-separator-classes'
/**
 * External dependencies
 */
import { useBlockAttributesContext } from '~lumen/hooks'
import { Separator2 } from '~lumen/ui'

/**
 * Internal dependencies
 */
import { addStyles, addSeparatorStyles } from './style'
import { Edit } from './edit'
import {
	addAttributes, createSeparatorAttributes, createSeparatorLayerAttributes,
} from './attributes'
export {
	createSeparatorAttributes, createSeparatorLayerAttributes, addSeparatorStyles,
}

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

export const Separator = ( { children } ) => {
	const separatorAttributes = useBlockAttributesContext( attributes => {
		return {
			// Top attributes.
			topSeparatorShow: attributes.topSeparatorShow,
			topSeparatorDesign: attributes.topSeparatorDesign,
			topSeparatorInverted: attributes.topSeparatorInverted,
			topSeparatorLayer2Show: attributes.topSeparatorLayer2Show,
			topSeparatorLayer3Show: attributes.topSeparatorLayer3Show,
			// Bottom attributes.
			bottomSeparatorShow: attributes.bottomSeparatorShow,
			bottomSeparatorDesign: attributes.bottomSeparatorDesign,
			bottomSeparatorInverted: attributes.bottomSeparatorInverted,
			bottomSeparatorLayer2Show: attributes.bottomSeparatorLayer2Show,
			bottomSeparatorLayer3Show: attributes.bottomSeparatorLayer3Show,
		}
	} )

	return (
		<>
			{ separatorAttributes.topSeparatorShow && (
				<>
					<div className="lmn-separator lmn-separator__top">
						<div className="lmn-separator__wrapper">
							<Separator2
								design={ separatorAttributes.topSeparatorDesign }
								inverted={ separatorAttributes.topSeparatorInverted }
							/>
							{ applyFilters( 'lumen.block-component.separator.output.top.after', null, separatorAttributes ) }
						</div>
					</div>
				</>
			) }
			{ children }
			{ separatorAttributes.bottomSeparatorShow && (
				<>
					<div className="lmn-separator lmn-separator__bottom">
						<div className="lmn-separator__wrapper">
							<Separator2
								design={ separatorAttributes.bottomSeparatorDesign }
								inverted={ separatorAttributes.bottomSeparatorInverted }
							/>
							{ applyFilters( 'lumen.block-component.separator.output.bottom.after', null, separatorAttributes ) }
						</div>
					</div>
				</>
			) }
		</>
	)
}

Separator.Content = ( { children, attributes } ) => {
	return (
		<>
			{ attributes.topSeparatorShow && (
				<div className="lmn-separator lmn-separator__top">
					<div className="lmn-separator__wrapper">
						<Separator2
							design={ attributes.topSeparatorDesign }
							inverted={ attributes.topSeparatorInverted }
						/>
						{ applyFilters( 'lumen.block-component.separator.output.top.after', null, attributes ) }
					</div>
				</div>
			) }
			{ children }
			{ attributes.bottomSeparatorShow && (
				<div className="lmn-separator lmn-separator__bottom">
					<div className="lmn-separator__wrapper">
						<Separator2
							design={ attributes.bottomSeparatorDesign }
							inverted={ attributes.bottomSeparatorInverted }
						/>
						{ applyFilters( 'lumen.block-component.separator.output.bottom.after', null, attributes ) }
					</div>
				</div>
			) }
		</>
	)
}

Separator.Content.defaultProps = {
	attributes: {},
}

Separator.InspectorControls = Edit

Separator.addAttributes = addAttributes

Separator.addStyles = addStyles
