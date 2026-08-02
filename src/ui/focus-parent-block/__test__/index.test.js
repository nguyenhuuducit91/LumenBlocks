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

// A separate, deeper tree: L1 > L2 > L3 > L4 > L5 > deepest, so the breadcrumb
// has five ancestors to fold.
let deepest
const DEEP_LEVELS = [ 'L1', 'L2', 'L3', 'L4', 'L5' ]
const deepChain = [] // The L1..L5 blocks themselves, outermost first.

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

	DEEP_LEVELS.forEach( level => registerBlockType( `test/${ level.toLowerCase() }`, simpleBlock( level ) ) )
	registerBlockType( 'test/deepest', simpleBlock( 'Deepest' ) )

	deepest = createBlock( 'test/deepest' )
	const deepTree = DEEP_LEVELS.reduceRight( ( child, level ) => {
		const block = createBlock( `test/${ level.toLowerCase() }`, {}, [ child ] )
		deepChain.unshift( block )
		return block
	}, deepest )

	dispatch( blockEditorStore ).resetBlocks( [ outer, deepTree ] )
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
	it( 'names only the current block, and gives each ancestor an icon that says what it is', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )

		const nav = screen.getByLabelText( 'Block hierarchy' )

		// The one crumb with a word on it is the block being edited.
		expect( nav.textContent ).toBe( 'Inner Heading' )

		const buttons = Array.from( nav.querySelectorAll( 'button' ) )
		expect( buttons.map( b => b.getAttribute( 'title' ) ) ).toEqual( [ 'Outer Columns', 'Middle Container' ] )
		expect( buttons.every( b => b.textContent === '' ) ).toBe( true )
	} )

	it( 'keeps every level when the trail is short enough to fit', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )

		expect( screen.queryByRole( 'button', { name: /levels? in between/ } ) ).toBeNull()
	} )

	it( 'renders nothing for a top-level block', () => {
		setCurrentBlock( outer.clientId, 'test/outer' )
		const { container } = render( <FocusParentBlockBreadcrumb /> )
		expect( container ).toBeEmptyDOMElement()
	} )

	it( 'selects the ancestor that is clicked, not the immediate parent', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )

		fireEvent.click( screen.getByRole( 'button', { name: 'Select Outer Columns' } ) )
		expect( select( blockEditorStore ).getSelectedBlockClientId() ).toBe( outer.clientId )
	} )

	it( 'highlights the ancestor while it is hovered, and clears it on leave', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		render( <FocusParentBlockBreadcrumb /> )
		const button = screen.getByRole( 'button', { name: 'Select Middle Container' } )

		fireEvent.mouseEnter( button )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( true )

		fireEvent.mouseLeave( button )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( false )
	} )

	it( 'clears the highlight it left behind when it unmounts', () => {
		setCurrentBlock( inner.clientId, 'test/inner' )
		const { unmount } = render( <FocusParentBlockBreadcrumb /> )

		fireEvent.mouseEnter( screen.getByRole( 'button', { name: 'Select Middle Container' } ) )
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( true )

		unmount()
		expect( select( blockEditorStore ).isBlockHighlighted( middle.clientId ) ).toBe( false )
	} )
} )

describe( 'FocusParentBlockBreadcrumb when nested deeply', () => {
	beforeEach( () => {
		setCurrentBlock( deepest.clientId, 'test/deepest' )
	} )

	it( 'never grows past four crumbs, folding the outermost levels away', () => {
		render( <FocusParentBlockBreadcrumb /> )

		const nav = screen.getByLabelText( 'Block hierarchy' )
		expect( nav.querySelectorAll( '.lmn-focus-parent__crumb' ) ).toHaveLength( 4 )

		// The fold takes a slot, so the two nearest ancestors keep theirs.
		const icons = Array.from( nav.querySelectorAll( '.lmn-focus-parent__button--icon' ) )
		expect( icons.map( b => b.getAttribute( 'title' ) ) ).toEqual( [ 'L4', 'L5' ] )
		expect( nav.textContent ).toBe( 'Deepest' )

		// L1, L2 and L3 are the three that went into the fold.
		expect( screen.getByRole( 'button', { name: '3 levels in between' } ) ).toBeInTheDocument()
	} )

	it( 'lists the folded levels outermost first, and selects the one that is clicked', () => {
		render( <FocusParentBlockBreadcrumb /> )

		fireEvent.click( screen.getByRole( 'button', { name: '3 levels in between' } ) )

		const items = screen.getAllByRole( 'menuitem' ).map( item => item.textContent )
		expect( items ).toEqual( [ 'L1', 'L2', 'L3' ] )

		fireEvent.click( screen.getByRole( 'menuitem', { name: 'L2' } ) )

		const selected = select( blockEditorStore ).getSelectedBlockClientId()
		expect( select( blockEditorStore ).getBlockName( selected ) ).toBe( 'test/l2' )
	} )

	it( 'highlights a folded level while its menu row is hovered', () => {
		render( <FocusParentBlockBreadcrumb /> )
		fireEvent.click( screen.getByRole( 'button', { name: '3 levels in between' } ) )

		const row = screen.getByRole( 'menuitem', { name: 'L3' } )
		const l3ClientId = deepChain[ 2 ].clientId

		fireEvent.mouseEnter( row )
		expect( select( blockEditorStore ).isBlockHighlighted( l3ClientId ) ).toBe( true )

		fireEvent.mouseLeave( row )
		expect( select( blockEditorStore ).isBlockHighlighted( l3ClientId ) ).toBe( false )
	} )

	it( 'shows all three ancestors without a fold at exactly four levels', () => {
		// L3 sits three levels down: L1 > L2 > L3.
		setCurrentBlock( deepChain[ 2 ].clientId, 'test/l3' )
		render( <FocusParentBlockBreadcrumb /> )

		const nav = screen.getByLabelText( 'Block hierarchy' )
		expect( screen.queryByRole( 'button', { name: /levels? in between/ } ) ).toBeNull()

		const icons = Array.from( nav.querySelectorAll( '.lmn-focus-parent__button--icon' ) )
		expect( icons.map( b => b.getAttribute( 'title' ) ) ).toEqual( [ 'L1', 'L2' ] )
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
