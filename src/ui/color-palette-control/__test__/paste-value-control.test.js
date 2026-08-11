/**
 * The paste field accepts a value only if the browser parses it as one.
 *
 * That check is what keeps this from being the arbitrary-CSS field that had to
 * be removed: anything carrying a `;` or a `}` — the characters needed to close
 * this declaration and open a rule of its own — is not a valid property value,
 * so `CSS.supports()` rejects it and nothing is stored.
 */

jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

import { isValidColorValue } from '../paste-value-control'

// jsdom has no CSS.supports, so the real parser is stood in for by one that
// knows the same rule the browser applies: a value ends at the first `;`.
const realCSS = global.CSS

beforeAll( () => {
	global.CSS = {
		supports: ( property, value ) => {
			if ( /[;{}]/.test( value ) ) {
				return false
			}
			if ( property === 'color' ) {
				return /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|transparent$|currentcolor$|var\(|[a-z]+$)/i.test( value )
			}
			return /^(linear|radial|conic|repeating-)[a-z-]*\(/i.test( value ) || /^(none|url\()/i.test( value )
		},
	}
} )

afterAll( () => {
	global.CSS = realCSS
} )

describe( 'isValidColorValue', () => {
	it( 'takes the kind of gradient a design tool produces', () => {
		const pasted = 'linear-gradient(103.77deg, rgba(0, 178, 255, 0.84) -6.28%, rgba(23, 44, 231, 0.8) 20.51%, #061173 100.88%)'

		expect( isValidColorValue( pasted, true ) ).toBe( true )
	} )

	it( 'takes plain colours in the formats people copy', () => {
		[ '#061173', '#0611', 'rgba(23, 44, 231, 0.8)', 'hsl(210, 90%, 40%)', 'transparent' ]
			.forEach( value => expect( isValidColorValue( value, false ) ).toBe( true ) )
	} )

	it( 'takes a gradient on the single tab too, since that is what the picker stores', () => {
		expect( isValidColorValue( 'linear-gradient(90deg, #f00, #00f)', false ) ).toBe( true )
	} )

	it( 'refuses anything that would close the declaration', () => {
		[
			'red; } body { display: none } .x{ color: blue',
			'#fff}',
			'red;background:url(//evil.test)',
		].forEach( value => {
			expect( isValidColorValue( value, false ) ).toBe( false )
			expect( isValidColorValue( value, true ) ).toBe( false )
		} )
	} )

	it( 'refuses an empty or blank value', () => {
		[ '', '   ', undefined, null ].forEach( value => {
			expect( isValidColorValue( value, false ) ).toBe( false )
		} )
	} )

	it( 'refuses a gradient that is not one', () => {
		expect( isValidColorValue( 'not-a-gradient(1)', true ) ).toBe( false )
	} )

	it( 'falls back to rejecting the dangerous characters when CSS.supports is missing', () => {
		const saved = global.CSS
		global.CSS = undefined

		expect( isValidColorValue( 'linear-gradient(90deg, #f00, #00f)', true ) ).toBe( true )
		expect( isValidColorValue( 'red; } body {}', true ) ).toBe( false )

		global.CSS = saved
	} )
} )
