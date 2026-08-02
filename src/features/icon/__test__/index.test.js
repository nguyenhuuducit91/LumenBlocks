/**
 * Icons are deduplicated by putting one copy in a shared `<defs>` and pointing
 * every instance at it with `<use>`. CSS cannot select into the shadow tree a
 * `<use>` renders, so the generated colour rule — which targets the icon's own
 * `path`/`g`/`rect` elements — matches nothing there, while on the frontend,
 * where the icon is inlined, it matches. A recoloured icon therefore changed on
 * the site but not in the editor.
 *
 * These pin the rule that fixes it: an icon that is recoloured keeps its own
 * markup in the editor too.
 */

jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

const blockEditContext = {
	clientId: 'x', name: 'lumen/icon', isSelected: false,
}
jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	useBlockEditContext: () => blockEditContext,
} ) )

import { render } from '@testing-library/react'
import { select } from '@wordpress/data'
import { Icon } from '~lumen/features'
import { BlockAttributesProvider } from '~lumen/hooks'
import '~lumen/extensions/page-icons/store'

// A two-tone icon whose paths carry their own fill, which is the ordinary case
// and the one that breaks: an explicit fill outranks an inherited one.
const SVG = '<svg viewBox="0 0 24 24"><path fill="#111111" d="M0 0h10v10H0z"/><path fill="#999999" d="M10 10h10v10H10z"/></svg>'
const OTHER_SVG = '<svg viewBox="0 0 24 24"><path fill="#222222" d="M2 2h6v6H2z"/></svg>'

const renderIcon = attributes => render(
	<BlockAttributesProvider attributes={ attributes } setAttributes={ () => {} }>
		<Icon />
	</BlockAttributesProvider>
)

const pageIcons = () => select( 'lumen/page-icons' ).getPageIcons()

describe( 'Icon in the editor', () => {
	it( 'shares an uncoloured icon through the page-icons defs', () => {
		const { container } = renderIcon( { uniqueId: 'aaa0001', icon: SVG } )

		expect( container.querySelector( 'use' ) ).not.toBeNull()
		expect( container.querySelectorAll( '.lmn--inner-svg path' ) ).toHaveLength( 0 )
	} )

	it( 'keeps its own paths when the icon is recoloured, so the colour rule can reach them', () => {
		const { container } = renderIcon( {
			uniqueId: 'aaa0002', icon: SVG, iconColor1: '#ff0000',
		} )

		expect( container.querySelector( 'use' ) ).toBeNull()
		expect( container.querySelectorAll( '.lmn--inner-svg path' ) ).toHaveLength( 2 )
	} )

	it( 'does the same for a colour that only applies on hover', () => {
		const { container } = renderIcon( {
			uniqueId: 'aaa0003', icon: SVG, iconColor1Hover: '#00ff00',
		} )

		expect( container.querySelector( 'use' ) ).toBeNull()
		expect( container.querySelectorAll( '.lmn--inner-svg path' ) ).toHaveLength( 2 )
	} )

	it( 'matches what the frontend renders once a colour is set', () => {
		const attributes = {
			uniqueId: 'aaa0004', icon: SVG, iconColor1: '#ff0000',
		}
		const { container: editor } = renderIcon( attributes )
		const { container: saved } = render( <Icon.Content attributes={ attributes } /> )

		expect( editor.querySelector( '.lmn--inner-svg' ).innerHTML )
			.toBe( saved.querySelector( '.lmn--inner-svg' ).innerHTML )
	} )

	it( 'switches back to its own markup when a colour is added to a shared icon', () => {
		const { container, rerender } = renderIcon( { uniqueId: 'aaa0005', icon: OTHER_SVG } )
		expect( container.querySelector( 'use' ) ).not.toBeNull()

		rerender(
			<BlockAttributesProvider
				attributes={ {
					uniqueId: 'aaa0005', icon: OTHER_SVG, iconColor1: '#ff0000',
				} }
				setAttributes={ () => {} }
			>
				<Icon />
			</BlockAttributesProvider>
		)

		expect( container.querySelector( 'use' ) ).toBeNull()
		expect( container.querySelectorAll( '.lmn--inner-svg path' ) ).toHaveLength( 1 )
	} )

	it( 'hands its shared copy back on unmount, and only its own', () => {
		const shared = renderIcon( { uniqueId: 'aaa0006', icon: OTHER_SVG } )
		const coloured = renderIcon( {
			uniqueId: 'aaa0007', icon: OTHER_SVG, iconColor1: '#ff0000',
		} )

		const countAfterBoth = pageIcons().get( OTHER_SVG )?.count

		// The recoloured one never took a copy out, so unmounting it must not
		// give one back.
		coloured.unmount()
		expect( pageIcons().get( OTHER_SVG )?.count ).toBe( countAfterBoth )

		shared.unmount()
		expect( pageIcons().has( OTHER_SVG ) ).toBe( false )
	} )
} )
