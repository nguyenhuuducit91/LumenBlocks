/**
 * The `fx` unit.
 *
 * Choosing it means the author writes the whole value — `calc(100% - 200px)` —
 * instead of a number the control then suffixes. The part that has to know is
 * the CSS generator: everywhere else `px` or `%` is appended to what the slider
 * produced, and doing that here would emit `calc(100% - 200px)custom`.
 */

jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

import { BlockStyleGenerator } from '~lumen/ui'
import { CUSTOM_UNIT, isCustomUnit } from '~lumen/utils'

const VERSION = '3.19.10'

const generate = attributes => {
	const blockStyles = new BlockStyleGenerator( {
		versionAdded: '3.0.0',
		versionDeprecated: '',
	} )

	blockStyles.addBlockStyles( 'containerWidth', [ {
		selector: '.lmn-block-content',
		styleRule: 'maxWidth',
		attrName: 'containerWidth',
		key: 'containerWidth',
		hasUnits: 'px',
		responsive: 'all',
	} ] )

	const merged = { uniqueId: 'abc1234', ...attributes }
	const names = blockStyles.getAttributesWithValues( merged )

	return blockStyles.generateBlockStylesForEditor( merged, blockStyles.getBlockStyles( names ), {
		version: VERSION,
		uniqueId: merged.uniqueId,
	} )
}

describe( 'the fx unit', () => {
	it( 'is recognised by name', () => {
		expect( CUSTOM_UNIT ).toBe( 'custom' )
		expect( isCustomUnit( 'custom' ) ).toBe( true )
		expect( isCustomUnit( 'px' ) ).toBe( false )
		expect( isCustomUnit( '' ) ).toBe( false )
	} )

	it( 'writes the value out as the author typed it', () => {
		const css = generate( {
			containerWidth: 'calc(100% - 200px)',
			containerWidthUnit: 'custom',
		} )

		expect( css ).toContain( 'max-width: calc(100% - 200px)' )
		expect( css ).not.toContain( 'custom' )
	} )

	it( 'takes any css expression, not only calc', () => {
		const css = generate( {
			containerWidth: 'clamp(20rem, 50vw, 60rem)',
			containerWidthUnit: 'custom',
		} )

		expect( css ).toContain( 'max-width: clamp(20rem, 50vw, 60rem)' )
	} )

	it( 'still appends a real unit when one is chosen', () => {
		expect( generate( { containerWidth: 800, containerWidthUnit: 'px' } ) )
			.toContain( 'max-width: 800px' )
		expect( generate( { containerWidth: 50, containerWidthUnit: '%' } ) )
			.toContain( 'max-width: 50%' )
	} )

	it( 'falls back to the default unit when none is set', () => {
		expect( generate( { containerWidth: 800 } ) ).toContain( 'max-width: 800px' )
	} )

	it( 'keeps each viewport on its own unit', () => {
		const css = generate( {
			containerWidth: 800,
			containerWidthUnit: 'px',
			containerWidthTablet: 'calc(100% - 40px)',
			containerWidthUnitTablet: 'custom',
		} )

		expect( css ).toContain( 'max-width: 800px' )
		expect( css ).toContain( 'max-width: calc(100% - 40px)' )
		expect( css ).not.toContain( 'custom' )
	} )
} )
