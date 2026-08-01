/**
 * Shared harness: log into a running site and hand a booted block editor to a
 * callback.
 *
 * The point of driving a real editor is that the plugin's own save() runs
 * there, so the markup that comes out is markup the plugin itself produced.
 * Writing Lumen block markup by hand is not viable: the class names derive from
 * dozens of attributes and the output is version-gated by
 * `withVersion( LUMEN_BLOCK_VERSION )`, so a hand-written template turns into
 * "this block contains unexpected or invalid content" the moment it is inserted.
 *
 * Credentials come from the environment; none are committed.
 *
 *   LUMEN_SITE=http://localhost:8004 LUMEN_USER=admin LUMEN_PASS=secret node build.js
 */
const path = require( 'path' )
const { chromium } = require( path.resolve( __dirname, '../../node_modules/playwright-core' ) )

const SITE = process.env.LUMEN_SITE || 'http://localhost:8004'
const USER = process.env.LUMEN_USER
const PASS = process.env.LUMEN_PASS

if ( ! USER || ! PASS ) {
	console.error( 'Set LUMEN_USER and LUMEN_PASS (LUMEN_SITE defaults to http://localhost:8004).' )
	process.exit( 1 )
}

async function withEditor( fn, { headless = true } = {} ) {
	const browser = await chromium.launch( { channel: 'chrome', headless } )
	const page = await browser.newPage( { viewport: { width: 1600, height: 1000 } } )

	try {
		await page.goto( `${ SITE }/wp-login.php`, { waitUntil: 'domcontentloaded' } )
		if ( await page.$( '#user_login' ) ) {
			await page.fill( '#user_login', USER )
			await page.fill( '#user_pass', PASS )
			await page.click( '#wp-submit' )
			await page.waitForLoadState( 'domcontentloaded' )
		}

		await page.goto( `${ SITE }/wp-admin/post-new.php?post_type=page`, { waitUntil: 'domcontentloaded' } )
		await page.waitForFunction( () => window.wp?.blocks?.getBlockTypes?.().length > 0, { timeout: 60000 } )
		await page.waitForTimeout( 3000 )

		return await fn( page )
	} finally {
		await browser.close()
	}
}

module.exports = { withEditor, SITE }
