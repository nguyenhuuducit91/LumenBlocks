/**
 * Transform & Transition.
 *
 * Move, rotate and scale a block, and decide how long it takes to get there.
 * The attributes were already declared and the panel already existed — it just
 * held an advertisement instead of controls. This fills it in.
 *
 * `transform` is stored as the CSS string it will become, rather than as four
 * separate numbers. That keeps one source of truth, survives being copied onto
 * another block, and lets somebody type a transform this UI does not offer.
 * The cost is parsing it back to fill the sliders, which is the small half of
 * that trade.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	AdvancedRangeControl,
	AdvancedSelectControl,
	AdvancedTextControl,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { useAttributeEditHandlers } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

const EASINGS = [
	{ value: '', label: __( 'Ease in out', i18n ) },
	{ value: 'linear', label: __( 'Linear', i18n ) },
	{ value: 'ease-in', label: __( 'Ease in', i18n ) },
	{ value: 'ease-out', label: __( 'Ease out', i18n ) },
	{ value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: __( 'Overshoot', i18n ) },
]

const ORIGINS = [
	{ value: '', label: __( 'Centre', i18n ) },
	{ value: 'top left', label: __( 'Top left', i18n ) },
	{ value: 'top', label: __( 'Top', i18n ) },
	{ value: 'top right', label: __( 'Top right', i18n ) },
	{ value: 'left', label: __( 'Left', i18n ) },
	{ value: 'right', label: __( 'Right', i18n ) },
	{ value: 'bottom left', label: __( 'Bottom left', i18n ) },
	{ value: 'bottom', label: __( 'Bottom', i18n ) },
	{ value: 'bottom right', label: __( 'Bottom right', i18n ) },
]

const PARTS = [
	{
		key: 'translateX',
		label: __( 'Move sideways', i18n ),
		pattern: /translateX\(\s*(-?[\d.]+)px\s*\)/,
		write: value => `translateX(${ value }px)`,
		min: -200,
		max: 200,
		step: 1,
	},
	{
		key: 'translateY',
		label: __( 'Move up or down', i18n ),
		pattern: /translateY\(\s*(-?[\d.]+)px\s*\)/,
		write: value => `translateY(${ value }px)`,
		min: -200,
		max: 200,
		step: 1,
	},
	{
		key: 'rotate',
		label: __( 'Rotate', i18n ),
		pattern: /rotate\(\s*(-?[\d.]+)deg\s*\)/,
		write: value => `rotate(${ value }deg)`,
		min: -180,
		max: 180,
		step: 1,
	},
	{
		key: 'scale',
		label: __( 'Scale', i18n ),
		pattern: /scale\(\s*([\d.]+)\s*\)/,
		write: value => `scale(${ value })`,
		min: 0.1,
		max: 3,
		step: 0.05,
	},
]

/**
 * Reads one part out of a transform string.
 *
 * @param {string} transform The whole value.
 * @param {Object} part      One entry of PARTS.
 * @return {number|string} The number, or an empty string when it is not set.
 */
const readPart = ( transform, part ) => {
	const match = ( transform || '' ).match( part.pattern )

	return match ? parseFloat( match[ 1 ] ) : ''
}

/**
 * Writes one part back, leaving the rest of the value alone.
 *
 * Anything the author typed by hand that this UI does not understand stays
 * exactly where it was, which is the whole reason the value is a string.
 *
 * @param {string} transform The whole value.
 * @param {Object} part      One entry of PARTS.
 * @param {*}      value     New value, or empty to remove that part.
 * @return {string} The new transform.
 */
const writePart = ( transform, part, value ) => {
	const without = ( transform || '' )
		.replace( part.pattern, '' )
		.trim()
		.replace( /\s+/g, ' ' )

	if ( value === '' || value === undefined || value === null ) {
		return without
	}

	return `${ without } ${ part.write( value ) }`.trim()
}

export const Edit = () => {
	const { getAttribute, updateAttribute } = useAttributeEditHandlers()

	const transform = getAttribute( 'transform' ) || ''

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Transform & Transition', i18n ) }
					id="transform-transition"
				>
					{ PARTS.map( part => (
						<AdvancedRangeControl
							key={ part.key }
							/*
							 * All four sliders edit the one `transform` value, so
							 * they all carry its name: an applied-settings row for
							 * `transform` lands on the first of them, which is the
							 * right place to arrive.
							 */
							className="lmn-control--attr-transform"
							label={ part.label }
							value={ readPart( transform, part ) }
							min={ part.min }
							max={ part.max }
							step={ part.step }
							allowReset={ true }
							onChange={ value => updateAttribute(
								'transform',
								writePart( transform, part, value )
							) }
						/>
					) ) }

					<AdvancedSelectControl
						label={ __( 'Transform Origin', i18n ) }
						options={ ORIGINS }
						attribute="transformOrigin"
						help={ __( 'The point a rotation or a scale happens around.', i18n ) }
					/>

					<AdvancedRangeControl
						label={ __( 'Transition Duration', i18n ) }
						attribute="transitionDuration"
						min={ 0 }
						max={ 3 }
						step={ 0.05 }
						allowReset={ true }
						placeholder="0.3"
						help={ __( 'Seconds. Applies to every change on this block, hover colours included.', i18n ) }
					/>

					<AdvancedSelectControl
						label={ __( 'Transition Speed Curve', i18n ) }
						options={ EASINGS }
						attribute="transitionFunction"
					/>

					{ /*
					 * The value as CSS, for transforms this UI does not offer —
					 * a skew, a 3D rotation, a matrix. Editing it here and then
					 * moving a slider keeps whatever the sliders do not manage.
					 */ }
					<AdvancedTextControl
						label={ __( 'Transform (CSS)', i18n ) }
						attribute="transform"
						responsive="all"
						hover="all"
						placeholder="translateY(-4px) scale(1.02)"
					/>

					{ applyFilters( 'lumen.block-component.transform-transition.control', null ) }
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}

Edit.defaultProps = {
}
