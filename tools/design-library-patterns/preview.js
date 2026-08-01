/**
 * Renders every built pattern on one page with the plugin's real frontend CSS,
 * then screenshots it. Validity was already proved by the parser; this is the
 * separate question of whether the things look like anything.
 */
const fs = require( 'fs' )
const { chromium } = require( '/media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/node_modules/playwright-core' )

const DIST = '/media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/dist'
const built = require( './built.json' )
const only = process.argv.slice( 2 )
const list = only.length ? built.filter( b => only.includes( b.id ) ) : built

const page = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="file://${ DIST }/frontend_blocks.css">
<link rel="stylesheet" href="file://${ DIST }/frontend_blocks_responsive.css">
<style>
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; color:#18181b; }
  .qa-label { font:600 12px/1 ui-monospace,monospace; letter-spacing:.06em; text-transform:uppercase;
              color:#a1a1aa; background:#18181b; padding:10px 16px; }
  .qa-frame { border-bottom:2px solid #18181b; }
  /* Stand-in for the theme's content width, which a bare page has none of. */
  .entry-content { --wp--style--global--content-size: 840px; --wp--style--global--wide-size: 1100px; }
  .alignfull { width:100%; }
</style></head><body>
${ list.map( b => `<div class="qa-frame"><div class="qa-label">${ b.id } — ${ b.category }</div>
<div class="entry-content">${ b.markup }</div></div>` ).join( '\n' ) }
</body></html>`

const out = __dirname + '/preview.html'
fs.writeFileSync( out, page )

;( async () => {
	const browser = await chromium.launch( { channel: 'chrome' } )
	const p = await browser.newPage( { viewport: { width: 1280, height: 1000 } } )
	await p.goto( 'file://' + out, { waitUntil: 'load' } )
	await p.waitForTimeout( 800 )

	// One image per pattern keeps each one readable at a glance.
	for ( const b of list ) {
		const el = await p.$( `.qa-frame:has(.qa-label:text-is("${ b.id } — ${ b.category }"))` )
		if ( el ) { await el.screenshot( { path: `${ __dirname }/shots/${ b.id }.png` } ) }
	}
	console.log( 'wrote', list.length, 'shots' )
	await browser.close()
} )()
