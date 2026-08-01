const { withEditor } = require( './lib' )

const NEEDLE = new RegExp( process.argv[ 2 ] || '.', 'i' )
const BLOCKS = process.argv.slice( 3 )

;( async () => {
	const out = await withEditor( async page => page.evaluate( ( [ src, names ] ) => {
		const re = new RegExp( src, 'i' )
		const res = {}
		for ( const n of names ) {
			const t = wp.blocks.getBlockType( n )
			if ( ! t ) { res[ n ] = [ 'NOT REGISTERED' ]; continue }
			res[ n ] = Object.entries( t.attributes || {} )
				.filter( ( [ k ] ) => re.test( k ) )
				.map( ( [ k, v ] ) => `${ k }:${ v.type }${ v.default !== undefined && v.default !== '' ? '=' + JSON.stringify( v.default ) : '' }` )
		}
		return res
	}, [ NEEDLE.source, BLOCKS ] ) )

	for ( const [ n, list ] of Object.entries( out ) ) {
		console.log( `\n════ ${ n }` )
		console.log( '  ' + ( list.join( '\n  ' ) || '—' ) )
	}
} )()
