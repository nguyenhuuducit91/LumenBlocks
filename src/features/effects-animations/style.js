/**
 * Motion effects, as CSS.
 *
 * The attributes for this have been declared since 3.0.0 but nothing ever read
 * them: the panel was a placeholder and the styles were left to an action that
 * only the paid plugin filled in. This is that missing half, written for the
 * fork.
 *
 * Nothing here writes an `animation` shorthand. Each block gets a few custom
 * properties and the shared stylesheet does the rest, which keeps the per-block
 * CSS to a few dozen bytes and — more usefully — makes the effect responsive
 * for free: `effectEntrance` already carries tablet and mobile values, so a
 * block can rise into view on a desktop and simply be there on a phone.
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
	} = props

	blockStyleGenerator.addBlockStyles( 'effectEntrance', [
		{
			...propsToPass,
			selector,
			styleRule: '--lmn-entrance',
			attrName: 'effectEntrance',
			key: 'effectEntrance',
			attrNameTemplate,
			responsive: 'all',
			valueCallback: value => ( value ? `lmn-${ value }` : undefined ),
		},
		/*
		 * What the block looks like before its animation runs. It travels with
		 * the effect rather than being a rule of its own, so a width that has
		 * no effect set also has nothing to hide it.
		 */
		{
			...propsToPass,
			selector,
			styleRule: '--lmn-entrance-start',
			attrName: 'effectEntrance',
			key: 'effectEntranceStart',
			attrNameTemplate,
			responsive: 'all',
			valueCallback: value => ( value ? '0' : undefined ),
		},
	] )

	blockStyleGenerator.addBlockStyles( 'effectEntranceDuration', [ {
		...propsToPass,
		selector,
		styleRule: '--lmn-entrance-duration',
		attrName: 'effectEntranceDuration',
		key: 'effectEntranceDuration',
		attrNameTemplate,
		format: '%ss',
	} ] )

	blockStyleGenerator.addBlockStyles( 'effectEntranceDelay', [ {
		...propsToPass,
		selector,
		styleRule: '--lmn-entrance-delay',
		attrName: 'effectEntranceDelay',
		key: 'effectEntranceDelay',
		attrNameTemplate,
		format: '%ss',
	} ] )

	/*
	 * "Smooth" is a gentler curve that eases out of the movement instead of
	 * stopping at it. A toggle rather than a curve picker: at these durations
	 * the difference between the other named curves is not worth a control.
	 */
	blockStyleGenerator.addBlockStyles( 'effectAnimationSmooth', [ {
		...propsToPass,
		selector,
		styleRule: '--lmn-entrance-easing',
		attrName: 'effectAnimationSmooth',
		key: 'effectAnimationSmooth',
		attrNameTemplate,
		valueCallback: value => ( value ? 'cubic-bezier(0.16, 1, 0.3, 1)' : undefined ),
	} ] )

	// Kept so anything that hooked onto this before still runs.
	doAction( 'lumen.block-component.effects-animations.style.addStyles', blockStyleGenerator, props )
}
