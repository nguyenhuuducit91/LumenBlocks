const { withEditor } = require( './lib' )

;( async () => {
	await withEditor( async page => {
		// 1. Does the REST route now hand back the built-in patterns?
		const api = await page.evaluate( async () => {
			const res = await wp.apiFetch( { path: '/lumen/v2/design_library/patterns', method: 'GET' } )
			const v4 = res.v4 || {}
			const list = Object.values( v4 )
			const cats = {}
			list.forEach( d => { cats[ d.category ] = ( cats[ d.category ] || 0 ) + 1 } )
			return {
				errorKeys: Object.keys( res ).filter( k => k.includes( 'error' ) ),
				count: list.length,
				cats,
				sample: list[ 0 ] ? { id: list[ 0 ].id, label: list[ 0 ].label, tpl: ( list[ 0 ].template || '' ).slice( 0, 70 ) } : null,
			}
		} )
		console.log( 'PATTERNS:', JSON.stringify( api, null, 1 ) )

		// 2. And the pages tab, which used to surface a cached fetch failure.
		const pages = await page.evaluate( async () => {
			const res = await wp.apiFetch( { path: '/lumen/v2/design_library/pages', method: 'GET' } )
			return { keys: Object.keys( res ), errorKeys: Object.keys( res ).filter( k => k.includes( 'error' ) ) }
		} )
		console.log( 'PAGES:', JSON.stringify( pages ) )

		// 3. Open the library for real and photograph it.
		await page.evaluate( () => {
			const b = wp.blocks.createBlock( 'lumen/design-library' )
			wp.data.dispatch( 'core/block-editor' ).resetBlocks( [ b ] )
		} )
		await page.waitForTimeout( 5000 )

		// The block renders a button that opens the modal; it lives in the
		// editor canvas iframe, so reach in and click it.
		const frame = page.frames().find( f => f.name() === 'editor-canvas' ) || page.mainFrame()
		const buttons = await frame.$$( 'button' )
		console.log( 'buttons in canvas:', buttons.length )
		for ( const b of buttons ) {
			const label = ( await b.textContent() || '' ).trim()
			if ( /librar|design|browse|pattern/i.test( label ) ) {
				console.log( 'clicking:', JSON.stringify( label ) )
				await b.click().catch( () => {} )
				break
			}
		}
		await page.waitForTimeout( 6000 )

		const modal = await page.$( '.lmb-modal-design-library' )
		console.log( 'modal open:', !! modal )
		if ( ! modal ) {
			const labels = []
			for ( const b of buttons ) { labels.push( ( await b.textContent() || '' ).trim().slice( 0, 40 ) ) }
			console.log( 'canvas button labels:', JSON.stringify( labels.filter( Boolean ) ) )
		}
		await page.screenshot( { path: __dirname + '/shots/_library.png', fullPage: false } )
	}, { headless: false } )
} )()
