// The icons module renders an SVG on domReady, which the test env's
// @wordpress/element cannot do. Nothing here needs it.
jest.mock( '@wordpress/dom-ready', () => ( { __esModule: true, default: () => {} } ) )

// `useBlockEditContext` reads a context that only a mounted block provides, and
// `BlockControls` is a slot fill with no slot in a bare render. Both are
// WordPress' side of the boundary — stub them and test our side.
const blockEditContext = {
	clientId: null, name: null, isSelected: true,
}
jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	useBlockEditContext: () => blockEditContext,
	BlockControls: ( { children } ) => <div data-testid="block-controls">{ children }</div>,
} ) )

import {
	render, screen, fireEvent,
} from '@testing-library/react'
import { registerBlockType, createBlock } from '@wordpress/blocks'
import { dispatch, select } from '@wordpress/data'
import { store as blockEditorStore } from '@wordpress/block-editor'
import {
	FocusParentBlockBreadcrumb,
	FocusParentBlockToolbar,
	useBlockAncestors,
} from '../index'

const simpleBlock = title => ( {
	title,
	category: 'text',
	attributes: {},
	edit: () => null,
	save: () => null,
} )

let inner, middle, outer

const setCurrentBlock = ( clientId, name ) => {
	blockEditContext.clientId = clientId
	blockEditContext.name = name
}

beforeAll( () => {
	registerBlockType( 'test/outer', simpleBlock( 'Outer Columns' ) )
	registerBlockType( 'test/middle', simpleBlock( 'Middle Container' ) )
	registerBlockType( 'test/inner', simpleBlock( 'Inner Heading' ) )

	inner = createBlock( 'test/inner' )
	middle = createBlock( 'test/middle', {}, [ inner ] )
	outer = createBlock( 'test/outer', {}, [ middle ] )

	dispatch( blockEditorStore ).resetBlocks( [ outer ] )
} )

// The hook is only callable from a component.
const Probe = ( { clientId, onResult } ) => {
	onResult( useBlockAncestors( clientId ) )
	return null
}

describe( 'useBlockAncestors', () => {
	it( 'returns ancestors outermost first, with names and titles', () => {
		let result
		render( <Probe clientId={ inner.clientId } onResult={ r => ( result = r ) } /> )

		expect( result.map( a => a.title ) ).toEqual( [ 'Outer Columns', 'Middle Container' ] )
		expect( result.map( a => a.clientId ) ).toEqual( [ outer.clientId, middle.clientId ] )
		expect( result[ 0 ].name ).toBe( 'test/outer' )
	} )

	it( 'returns nothing for a top-level block', () => {
		let result
		render( <Probe clientId={ outer.clientId } onResult={ r => ( result = r ) } /> )
		expect( result ).toEqual( [] )
	} )

	it( 'hands back the same array on rerender, so consumers do not churn', () => {
		const results = []
		const { rerender } = render( <Probe clientId={ inner.clientId } onResult={ r => results.push( r ) } /> )
		rerender( <Probe clientId={ inner.clientId } onResult={ r => results.push( r ) } /> )

		expect( results.length ).toBeGreaterThan( 1 )
		expect( results[ results.length - 1 ] ).toBe( results[ 0 ] )
	} )
} )

describe( 'FocusParentBlockBreadcrumb', () => {
	it( 'shows the whole trail, with the current block last and not a button', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )

		const nav = screen.getByLabelText( 'Block hierarchy' )
		expect( nav.textContent ).toBe( 'Outer ColumnsMiddle ContainerInner Heading' )

		const buttons = nav.querySelectorAll( 'button' )
		expect( Array.from( buttons ).map( b => b.textContent ) ).toEqual( [ 'Outer Columns', 'Middle Container' ] )
	} )

	it( 'renders nothing for a top-level block', () => {
		setCurrentBlock( outer.clientId, 'test/outer' )
		const { container } = render( <FocusParentBlockBreadcrumb /> )
		expect( container ).toBeEmptyDOMElement()
	} )

	it( 'selects the ancestor that is clicked, not the immediate parent', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )

		fireEvent.click( screen.getByText( 'Outer Columns' ) )
		expect( select( blockEditorStore ).getSelectedBlockClientId() ).toBe( outer.clientId )
	} )

	it( 'highlights the ancestor while it is hovered, and clears it on leave', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )
		const button = screen.getByText( 'Middle Container' ).closest( 'button' )

		fireEvent.mouseEnter( button )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( true )

		fireEvent.mouseLeave( button )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( false )
	} )

	it( 'clears the highlight it left behind when it unmounts', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		const { unmount } = render( <FocusParentBlockBreadcrumb /> )

		fireEvent.mouseEnter( screen.getByText( 'Middle Container' ).closest( 'button' ) )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( true )

		unmount()
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( false )
	} )
} )

describe( 'FocusParentBlockToolbar', () => {
	it( 'names the immediate parent and selects it when clicked', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		dispatch( blockEditorStore ).clearSelectedBlock()
		render( <FocusParentBlockToolbar /> )

		const button = screen.getByLabelText( 'Select parent block: Middle Container' )
		expect( button.textContent ).toBe( 'Middle Container' )

		fireEvent.click( button )
		expect( select( blockEditorStore ).getSelectedBlockClientId() ).toBe( middle.clientId )
	} )

	it( 'renders nothing for a top-level block', () => {
		setCurrentBlock( outer.clientId, 'test/outer' )
		const { container } = render( <FocusParentBlockToolbar /> )
		expect( container ).toBeEmptyDOMElement()
	} )
} )
