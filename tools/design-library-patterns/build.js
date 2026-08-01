/**
 * Turns pattern specs into markup, using the running editor to do it.
 *
 * Nothing here writes block markup by hand. A spec is a tree of block names and
 * a handful of content attributes; the editor instantiates it, its own effects
 * fill in the generated CSS, and its own serialiser produces the string. Then
 * the string is parsed back and every block checked for validity, so a pattern
 * that would show "unexpected or invalid content" never reaches the library.
 */
const fs = require( 'fs' )
const { withEditor } = require( './lib' )
const PATTERNS = require( './patterns' )

const ONLY = process.argv.slice( 2 )
const selected = ONLY.length ? PATTERNS.filter( p => ONLY.includes( p.id ) ) : PATTERNS

;( async () => {
	const results = await withEditor( async page => {
		page.on( 'console', m => {
			if ( m.type() === 'error' ) { console.log( '  browser error:', m.text().slice( 0, 160 ) ) }
		} )

		const out = []
		for ( const p of selected ) {
			process.stdout.write( `• ${ p.id.padEnd( 26 ) }` )
			const r = await page.evaluate( async spec => {
				const { createBlock, getBlockType, serialize, parse } = wp.blocks
				const { dispatch, select } = wp.data

				const rid = () => Math.random().toString( 16 ).slice( 2, 9 )

				// Start from the block's own registered example so every styling
				// attribute is one the plugin authors already chose, then layer the
				// spec's content on top. uniqueId must be re-rolled or two copies of
				// a block would share generated CSS.
				const build = node => {
					const type = getBlockType( node.n )
					if ( ! type ) { throw new Error( `unregistered block: ${ node.n }` ) }

					let base = {}
					if ( node.ex !== false && type.example?.attributes ) {
						base = JSON.parse( JSON.stringify( type.example.attributes ) )
					}
					delete base.generatedCss
					delete base.customCSSMinified

					const attrs = { ...base, ...( node.a || {} ), uniqueId: rid() }

					let inner = []
					let fromExample = false
					if ( node.c ) {
						inner = node.c.map( build )
					} else if ( node.ex !== false && type.example?.innerBlocks?.length ) {
						fromExample = true
						inner = type.example.innerBlocks.map( ib => build( {
							n: ib.name,
							a: ( () => {
								const a = JSON.parse( JSON.stringify( ib.attributes || {} ) )
								delete a.generatedCss
								delete a.customCSSMinified
								return a
							} )(),
							ex: false,
							c: ( ib.innerBlocks || [] ).length
								? ib.innerBlocks.map( function conv( x ) {
									const a = JSON.parse( JSON.stringify( x.attributes || {} ) )
									delete a.generatedCss
									delete a.customCSSMinified
									return { n: x.name, a, ex: false, c: ( x.innerBlocks || [] ).map( conv ) }
								} )
								: undefined,
						} ) )
					}

					const block = createBlock( node.n, attrs, inner )

					// `drop` removes inherited inner blocks by name. The stock
					// examples point their images at source.unsplash.com, which
					// Unsplash retired, so an inherited avatar is a broken box.
					if ( node.drop ) {
						const prune = b => {
							b.innerBlocks = ( b.innerBlocks || [] ).filter( x => ! node.drop.includes( x.name ) )
							b.innerBlocks.forEach( prune )
						}
						prune( block )
					}

					/**
					 * Recolour inherited inner blocks by name.
					 *
					 * The pattern's `theme` only applies to a tree that came from the
					 * block's example, because those carry the stock palette and would
					 * otherwise leave a blue button inside an amber section. It must
					 * NOT touch children the spec wrote out by hand: doing that painted
					 * over every deliberate choice, which is how a ghost button came
					 * back filled solid. `aa` is per-node and explicit, so it always
					 * applies.
					 */
					const themed = {
						...( fromExample ? spec.theme || {} : {} ),
						...( node.aa || {} ),
					}
					if ( Object.keys( themed ).length ) {
						const paint = b => {
							if ( themed[ b.name ] ) { Object.assign( b.attributes, themed[ b.name ] ) }
							;( b.innerBlocks || [] ).forEach( paint )
						}
						;( block.innerBlocks || [] ).forEach( paint )
					}

					// `t` swaps the copy of a composite block that was inherited from
					// its example, in document order, without having to restate the
					// example's whole inner tree just to change three strings.
					//
					// It has to run before `ac`: grafting children adds text slots of
					// its own, and doing that first shifts every index after the graft
					// point — which is how a button label ended up inside a price list.
					if ( node.t ) {
						const slots = []
						const collect = b => {
							if ( typeof b.attributes?.text === 'string' ) { slots.push( b ) }
							;( b.innerBlocks || [] ).forEach( collect )
						}
						;( block.innerBlocks || [] ).forEach( collect )
						node.t.forEach( ( txt, i ) => {
							if ( txt != null && slots[ i ] ) { slots[ i ].attributes.text = txt }
						} )
						if ( node.t.length > slots.length ) {
							throw new Error( `${ node.n }: ${ node.t.length } text slots given, only ${ slots.length } exist` )
						}
					}

					// `ac` replaces the children of an inherited inner block. The icon
					// list migrates its `text` attribute into child blocks when it
					// mounts, so setting that attribute is not a reliable way to say
					// what is in the list; handing it real children is.
					if ( node.ac ) {
						const graft = b => {
							if ( node.ac[ b.name ] ) {
								b.innerBlocks = node.ac[ b.name ].map( build )
								return
							}
							;( b.innerBlocks || [] ).forEach( graft )
						}
						;( block.innerBlocks || [] ).forEach( graft )
					}

					return block
				}

				const blocks = spec.blocks.map( build )

				// Put them in the real editor. The generated CSS is written by a
				// hook inside each block's edit(), so the blocks have to actually
				// mount in the canvas — landing them in the store is not enough.
				dispatch( 'core/block-editor' ).resetBlocks( blocks )

				const countCss = () => {
					let n = 0
					const w = bs => bs.forEach( b => { if ( b.attributes?.generatedCss ) { n++ } w( b.innerBlocks || [] ) } )
					w( select( 'core/block-editor' ).getBlocks() )
					return n
				}

				// Wait for the css count to stop climbing rather than for a fixed
				// delay: nested blocks mount in waves.
				let last = -1, stable = 0
				for ( let i = 0; i < 60 && stable < 4; i++ ) {
					await new Promise( r => setTimeout( r, 500 ) )
					const now = countCss()
					stable = now === last ? stable + 1 : 0
					last = now
				}

				const live = select( 'core/block-editor' ).getBlocks()
				const markup = serialize( live )

				// Validate by round-tripping through the parser.
				const parsed = parse( markup )
				const bad = []
				const walk = ( bs, path = '' ) => bs.forEach( ( b, i ) => {
					if ( b.isValid === false ) { bad.push( `${ path }${ b.name }[${ i }]` ) }
					walk( b.innerBlocks || [], `${ path }${ b.name }[${ i }] > ` )
				} )
				walk( parsed )

				const count = ( bs => { let n = 0; const w = x => x.forEach( b => { n++; w( b.innerBlocks || [] ) } ); w( bs ); return n } )( parsed )
				const withCss = ( bs => { let n = 0; const w = x => x.forEach( b => { if ( b.attributes?.generatedCss ) { n++ } w( b.innerBlocks || [] ) } ); w( bs ); return n } )( parsed )

				return { markup, invalid: bad, blockCount: count, withCss }
			}, p ).catch( err => ( {
				// One bad pattern used to take the whole run down with it, which on
				// a set this size means losing an hour to a single mistyped
				// attribute. Report it and carry on; the exporter refuses to write
				// while any pattern is failing, so nothing broken can slip through.
				markup: '', invalid: [], blockCount: 0, withCss: 0,
				error: String( err.message || err ).split( '\n' )[ 0 ].slice( 0, 160 ),
			} ) )

			const ok = ! r.error && r.invalid.length === 0
			console.log( r.error
				? `✗ THREW: ${ r.error }`
				: ok
					? `✓ ${ r.blockCount } blocks, ${ r.withCss } with css, ${ r.markup.length }b`
					: `✗ INVALID: ${ r.invalid.join( ', ' ) }` )

			out.push( { ...p, blocks: undefined, ...r, ok } )
		}
		return out
	} )

	// Merge rather than overwrite: building a subset to check one fix used to
	// throw away the other sixty-nine and force a full rebuild.
	let merged = results
	if ( ONLY.length ) {
		let prior = []
		try { prior = JSON.parse( fs.readFileSync( __dirname + '/built.json', 'utf8' ) ) } catch ( e ) {}
		const byId = new Map( prior.map( r => [ r.id, r ] ) )
		results.forEach( r => byId.set( r.id, r ) )
		// Keep the order patterns.js declares, so the library reads in that order.
		merged = PATTERNS.map( p => byId.get( p.id ) ).filter( Boolean )
	}
	fs.writeFileSync( __dirname + '/built.json', JSON.stringify( merged, null, 1 ) )
	const bad = results.filter( r => ! r.ok )
	console.log( `\n${ results.length - bad.length }/${ results.length } hợp lệ` )
	if ( bad.length ) { process.exitCode = 1 }
} )()
