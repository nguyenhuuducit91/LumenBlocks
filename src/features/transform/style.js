/**
 * Transform and transition, as CSS.
 *
 * The attributes for this have been declared since 3.0.0 but nothing ever read
 * them: the panel was a placeholder and the styles were left to an action that
 * only the paid plugin filled in. This is that missing half, written for the
 * fork.
 *
 * `transform` is responsive and has hover states, so a block can sit still and
 * lift on hover, or lift on a desktop and stay put on a phone where there is no
 * hover to speak of.
 */

/**
 * WordPress dependencies
 */
import { doAction } from '@wordpress/hooks'

export const addStyles = ( blockStyleGenerator, props = {} ) => {
	const propsToPass = {
		...props,
		version: props.version,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	}

	const {
		selector = '',
		attrNameTemplate = '%s',
		hoverSelector,
	} = props

	blockStyleGenerator.addBlockStyles( 'transform', [ {
		...propsToPass,
		selector,
		styleRule: 'transform',
		attrName: 'transform',
		key: 'transform',
		attrNameTemplate,
		responsive: 'all',
		hover: 'all',
		hoverSelector,
	} ] )

	blockStyleGenerator.addBlockStyles( 'transformOrigin', [ {
		...propsToPass,
		selector,
		styleRule: 'transformOrigin',
		attrName: 'transformOrigin',
		key: 'transformOrigin',
		attrNameTemplate,
	} ] )

	/*
	 * A duration on its own does nothing, so the shorthand is written whole.
	 * `all` rather than `transform` alone, because the same setting is what
	 * makes a hover colour fade rather than snap — which is what an author
	 * means when they set a transition on a block.
	 */
	blockStyleGenerator.addBlockStyles( 'transitionDuration', [ {
		...propsToPass,
		selector,
		styleRule: 'transition',
		attrName: 'transitionDuration',
		key: 'transitionDuration',
		attrNameTemplate,
		valueCallback: ( value, getAttribute ) => {
			if ( value === '' || value === undefined || value === null ) {
				return undefined
			}

			const easing = getAttribute( 'transitionFunction' ) || 'ease-in-out'

			return `all ${ value }s ${ easing }`
		},
		dependencies: [ 'transitionFunction' ],
	} ] )

	// Kept so anything that hooked onto this before still runs.
	doAction( 'lumen.block-component.transform.style.addStyles', blockStyleGenerator, props )
}
