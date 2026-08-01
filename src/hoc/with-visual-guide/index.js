/**
 * Internal dependencies
 */
import VisualGuideer from './visual-guide'

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose'
import {
	createContext, useContext, useEffect,
} from '@wordpress/element'
import classNames from 'classnames'
import { useRafState } from '~lumen/hooks'
import { createUniqueClass } from '~lumen/utils'

const VisualGuideContext = createContext( null )

export const useVisualGuideContext = () => {
	return useContext( VisualGuideContext )
}

const withVisualGuideContext = createHigherOrderComponent(
	WrappedComponent => props => {
		/*
		 * A block that has never been saved has no `uniqueId` yet — it renders
		 * with a temporary class derived from its client id instead (see
		 * `block-div`). Reading the attribute alone produced the selector
		 * `.lmn-` for every unsaved block, so the visual guide highlighted
		 * nothing at all until the post had been saved once.
		 */
		const uniqueId = props.attributes.uniqueId || createUniqueClass( props.clientId )
		const [ highlightStyles, setHighlightStyles ] = useRafState( null )

		useEffect( () => {
			if ( ! props.isSelected ) {
				setHighlightStyles( null )
			}
		}, [ props.isSelected ] )

		return (
			<VisualGuideContext.Provider value={ setHighlightStyles }>
				{ highlightStyles && <VisualGuideer uniqueId={ uniqueId } { ...( highlightStyles || {} ) } /> }
				<WrappedComponent
					className={ classNames(
						props.className,
						{ 'lmn-has-visual-guide': !! highlightStyles }
					) }
					{ ...props }
				/>
			</VisualGuideContext.Provider>
		)
	},
	'withVisualGuideContext'
)

export default withVisualGuideContext

