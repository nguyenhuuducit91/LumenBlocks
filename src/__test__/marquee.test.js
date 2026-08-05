/**
 * The marquee, on both sides of the save boundary.
 *
 * Lives here rather than beside the block because `jest.config.js` excludes
 * `src/block-library` from its test paths.
 *
 * What is worth pinning down is the arithmetic the seamless loop rests on. The
 * block saves one set of items; the frontend repeats that set until the row is
 * wider than the strip and reports the count, and the keyframes step the row
 * forward by `(100% + gap) / count` — which is one set exactly, only as long as
 * the count really is the number of sets in the row.
 */

jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

import {
	registerBlockType, createBlock, serialize, parse,
} from '@wordpress/blocks'
import { settings } from '~lumen/block-library/marquee'
import { attributes as marqueeAttributes } from '~lumen/block-library/marquee/schema'
import { Save } from '~lumen/block-library/marquee/save'
import blockStyles from '~lumen/block-library/marquee/style'
import '~lumen/block-library/marquee/frontend-marquee'

// The `lumen` global is mocked in tests and carries no version, so the version
// blocks are saved with has to be supplied by hand.
const VERSION = '3.19.10'

const GAP = 32
const GROUP_WIDTH = 200
const VIEWPORT_WIDTH = 500

/**
 * jsdom lays nothing out, so every width it reports is zero. The measurements
 * the script takes are stubbed instead, which is the whole of what it needs
 * from a layout engine.
 *
 * @param {HTMLElement} el    Element to measure.
 * @param {number}      width Width to report.
 */
const stubWidth = ( el, width ) => {
	el.getBoundingClientRect = () => ( { width } )
}

const buildMarquee = ( { items = 2, groupWidth = GROUP_WIDTH } = {} ) => {
	document.body.innerHTML = `
		<div class="lmn-block-marquee">
			<div class="lmn-block-marquee__viewport">
				<div class="lmn-block-marquee__track" style="column-gap: ${ GAP }px">
					<div class="lmn-block-marquee__group">
						${ Array.from( { length: items }, ( _, i ) => (
		`<div id="item-${ i }"><a href="#x">Item ${ i }</a></div>`
	) ).join( '' ) }
					</div>
				</div>
			</div>
		</div>
	`

	const marquee = document.querySelector( '.lmn-block-marquee' )
	stubWidth( marquee.querySelector( '.lmn-block-marquee__viewport' ), VIEWPORT_WIDTH )
	stubWidth( marquee.querySelector( '.lmn-block-marquee__group' ), groupWidth )

	return marquee
}

describe( 'marquee frontend', () => {
	afterEach( () => {
		document.body.innerHTML = ''
	} )

	it( 'repeats the set until it covers the strip, with one to spare', () => {
		const marquee = buildMarquee()
		window.lumenMarquee.init()

		// A set plus its gap is 232px, so it takes three to cover 500px, and a
		// fourth so there is always one waiting off the edge.
		const groups = marquee.querySelectorAll( '.lmn-block-marquee__group' )
		expect( groups ).toHaveLength( 4 )
		expect( marquee.querySelector( '.lmn-block-marquee__track' ).style.getPropertyValue( '--lmn-marquee-copies' ) ).toBe( '4' )
	} )

	it( 'never makes fewer than two, however wide the set is', () => {
		const marquee = buildMarquee( { groupWidth: 5000 } )
		window.lumenMarquee.init()

		expect( marquee.querySelectorAll( '.lmn-block-marquee__group' ) ).toHaveLength( 2 )
	} )

	it( 'leaves the copies out of the accessibility tree and out of the tab order', () => {
		const marquee = buildMarquee()
		window.lumenMarquee.init()

		const clones = marquee.querySelectorAll( '.lmn-block-marquee__group--clone' )
		expect( clones ).toHaveLength( 3 )

		clones.forEach( clone => {
			expect( clone.getAttribute( 'aria-hidden' ) ).toBe( 'true' )
			expect( clone.querySelectorAll( '[id]' ) ).toHaveLength( 0 )
			clone.querySelectorAll( 'a' ).forEach( link => {
				expect( link.getAttribute( 'tabindex' ) ).toBe( '-1' )
			} )
		} )

		// The original keeps its ids and stays reachable.
		const original = marquee.querySelector( '.lmn-block-marquee__group:not(.lmn-block-marquee__group--clone)' )
		expect( original.querySelectorAll( '[id]' ) ).toHaveLength( 2 )
		expect( original.querySelector( 'a' ).getAttribute( 'tabindex' ) ).toBeNull()
	} )

	it( 'measures the original alone when it runs again, rather than the row it built last time', () => {
		const marquee = buildMarquee()
		window.lumenMarquee.init()
		expect( marquee.querySelectorAll( '.lmn-block-marquee__group' ) ).toHaveLength( 4 )

		// A second pass — an image finishing, or a resize. Counting the clones
		// as part of the set would make it look four times as wide and collapse
		// the row to the two-copy minimum.
		window.lumenMarquee.fill( marquee )
		expect( marquee.querySelectorAll( '.lmn-block-marquee__group' ) ).toHaveLength( 4 )
	} )

	it( 'does nothing at all when the strip has not been laid out yet', () => {
		const marquee = buildMarquee( { groupWidth: 0 } )
		window.lumenMarquee.init()

		expect( marquee.querySelectorAll( '.lmn-block-marquee__group' ) ).toHaveLength( 1 )
		expect( marquee.querySelector( '.lmn-block-marquee__track' ).style.getPropertyValue( '--lmn-marquee-copies' ) ).toBe( '' )
	} )
} )

describe( 'marquee block', () => {
	beforeAll( () => {
		registerBlockType( 'core/paragraph', {
			title: 'Paragraph',
			category: 'text',
			attributes: { content: { type: 'string', default: '' } },
			edit: () => null,
			save: ( { attributes } ) => <p>{ attributes.content }</p>,
		} )
		registerBlockType( settings.name, {
			...settings,
			category: 'text',
			attributes: marqueeAttributes( VERSION ),
			save: props => <Save { ...props } version={ VERSION } />,
		} )
	} )

	it( 'registers with the expected metadata', () => {
		expect( settings.name ).toBe( 'lumen/marquee' )
		expect( settings.title ).toBe( 'Marquee' )
		expect( marqueeAttributes( VERSION ).marqueePauseOnHover.default ).toBe( true )
	} )

	it( 'round-trips through serialize -> parse as a valid block', () => {
		const block = createBlock( 'lumen/marquee', { uniqueId: 'abc1234' }, [
			createBlock( 'core/paragraph', { content: 'Scrolling by' } ),
		] )

		const serialized = serialize( block )
		expect( serialized ).toContain( 'lmn-block-marquee__viewport' )
		expect( serialized ).toContain( 'lmn-block-marquee__track' )
		expect( serialized ).toContain( 'Scrolling by' )

		// One set is saved. Two would leave the parser with more inner-block
		// slots than there are inner blocks.
		expect( serialized.match( /lmn-block-marquee__group/g ) ).toHaveLength( 1 )

		const [ parsed ] = parse( serialized )
		expect( parsed.isValid ).toBe( true )
		expect( parsed.innerBlocks ).toHaveLength( 1 )
	} )

	it( 'turns the switches into classes and the numbers into css', () => {
		const attributes = {
			uniqueId: 'abc1234',
			marqueeDirection: 'right',
			marqueePauseOnHover: true,
			marqueeFade: true,
			marqueeDuration: 12,
			marqueeGap: 48,
			marqueeFadeWidth: 80,
		}

		const block = createBlock( 'lumen/marquee', attributes )
		const serialized = serialize( block )
		expect( serialized ).toContain( 'lmn-block-marquee--reverse' )
		expect( serialized ).toContain( 'lmn-block-marquee--pause-on-hover' )
		expect( serialized ).toContain( 'lmn-block-marquee--fade' )

		const names = blockStyles.getAttributesWithValues( attributes )
		const css = blockStyles.generateBlockStylesForEditor( attributes, blockStyles.getBlockStyles( names ), {
			version: VERSION, uniqueId: attributes.uniqueId,
		} )

		expect( css ).toContain( 'animation-duration: 12s' )
		expect( css ).toContain( '--lmn-marquee-gap: 48px' )
		expect( css ).toContain( '--lmn-marquee-fade: 80px' )
	} )
} )
