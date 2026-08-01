/**
 * WordPress dependencies
 */
import { doAction } from '@wordpress/hooks'

export const addStyles = ( blockStyleGenerator, props = {} ) => {
	doAction( 'lumen.block-component.effects-animations.style.addStyles', blockStyleGenerator, props )
}
