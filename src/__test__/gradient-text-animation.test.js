/**
 * An animated gradient is two declarations that only work together.
 *
 * `background-size: 200% 200%` gives the background somewhere to move to, and
 * the animation moves it. Either one on its own does nothing visible, so both
 * are written from the same control — and neither is written unless the text is
 * actually a gradient, or the block would carry CSS that can never apply.
 */

jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

import headingStyles from '~lumen/block-library/heading/style'
import textStyles from '~lumen/block-library/text/style'
import { attributes as headingAttributes } from '~lumen/block-library/heading/schema'

const VERSION = '3.19.10'

// The shape of value this exists for: straight out of a design tool.
const GRADIENT = 'linear-gradient(103.77deg, rgba(0, 178, 255, 0.84) -6.28%, rgba(23, 44, 231, 0.8) 20.51%, #061173 100.88%)'

const css = ( blockStyles, attrs ) => {
	const merged = { uniqueId: 'abc1234', ...attrs }
	const names = blockStyles.getAttributesWithValues( merged )

	return blockStyles.generateBlockStylesForEditor( merged, blockStyles.getBlockStyles( names ), {
		version: VERSION,
		uniqueId: merged.uniqueId,
	} )
}

describe( 'animated gradient text', () => {
	it( 'is a block attribute', () => {
		expect( Object.keys( headingAttributes( VERSION ) ) ).toContain( 'textGradientAnimation' )
	} )

	it.each( [ [ 'heading', headingStyles ], [ 'text', textStyles ] ] )( 'writes both declarations on %s', ( name, styles ) => {
		const out = css( styles, {
			textColorType: 'gradient',
			textColor1: GRADIENT,
			textGradientAnimation: true,
		} )

		expect( out ).toContain( `background-image: ${ GRADIENT }` )
		expect( out ).toContain( 'background-size: 200% 200%' )
		expect( out ).toContain( 'animation: gradient_text_animation 3s infinite alternate' )
	} )

	it( 'writes neither while the animation is off', () => {
		const out = css( headingStyles, { textColorType: 'gradient', textColor1: GRADIENT } )

		expect( out ).toContain( 'background-image' )
		expect( out ).not.toContain( 'background-size' )
		expect( out ).not.toContain( 'animation:' )
	} )

	it( 'writes neither on a flat colour, however the switch was left', () => {
		const out = css( headingStyles, { textColor1: '#ff0000', textGradientAnimation: true } )

		expect( out ).toContain( 'color: #ff0000' )
		expect( out ).not.toContain( 'background-size' )
		expect( out ).not.toContain( 'animation:' )
	} )
} )
