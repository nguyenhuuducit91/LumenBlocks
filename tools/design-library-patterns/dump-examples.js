const { withEditor } = require( './lib' )
const fs = require( 'fs' )

;( async () => {
	const out = await withEditor( async page => page.evaluate( () => {
		const res = {}
		for ( const t of wp.blocks.getBlockTypes() ) {
			if ( ! t.name.startsWith( 'lumen/' ) ) { continue }

			// Which attributes actually carry copy: anything sourced out of the
			// markup (RichText et al) is content, everything else is styling.
			const contentAttrs = Object.entries( t.attributes || {} )
				.filter( ( [ , v ] ) => v.source )
				.map( ( [ k, v ] ) => `${ k }(${ v.source }${ v.selector ? ' @' + v.selector : '' })` )

			res[ t.name ] = {
				title: t.title,
				parent: t.parent || null,
				hasExample: !! t.example,
				example: t.example || null,
				variations: ( t.variations || [] ).map( v => ( {
					name: v.name, title: v.title, innerBlocks: v.innerBlocks,
				} ) ),
				contentAttrs,
			}
		}
		return res
	} ) )

	fs.writeFileSync( __dirname + '/examples.json', JSON.stringify( out, null, 1 ) )

	for ( const [ name, i ] of Object.entries( out ) ) {
		console.log( `${ i.hasExample ? '●' : '○' } ${ name.padEnd( 28 ) } ${ i.parent ? 'child-of ' + i.parent : '' } | content: ${ i.contentAttrs.join( ', ' ) || '—' }` )
	}
} )()
