/**
 * Writes the built designs into the plugin as PHP.
 *
 * PHP rather than JSON because gulpfile's buildInclude only packages
 * `src/**\/*.php` — a JSON data file would work in the repo and then vanish
 * from the built zip.
 */
const fs = require( 'fs' )
const SET = process.argv.includes( '--set=pages' ) ? 'pages' : 'patterns'
const built = require( SET === 'pages' ? './built-pages.json' : './built.json' )

const DEST = `/media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/src/design-library/${ SET }.php`

const bad = built.filter( b => ! b.ok )
if ( bad.length ) {
	console.error( 'refusing to export, invalid:', bad.map( b => b.id ).join( ', ' ) )
	process.exit( 1 )
}

const q = s => "'" + String( s ).replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" ) + "'"

const entries = built.map( b => `	${ q( b.id ) } => array(
		'id'       => ${ q( b.id ) },
		'label'    => ${ q( b.label ) },
		'category' => ${ q( b.category ) },
		'plan'     => ${ q( b.plan ) },
		'template' => ${ q( b.markup ) },
	),` ).join( '\n' )

const php = `<?php
/**
 * Built-in design library ${ SET === 'pages' ? 'page templates' : 'patterns' }.
 *
 * Generated, not hand-written. Every template here was produced by running the
 * plugin's own blocks through wp.blocks.serialize() in a real editor and then
 * parsed back to confirm each block reports isValid — so none of them can
 * trigger "this block contains unexpected or invalid content" on insert.
 *
 * Nothing here loads a remote asset. The library ships pointing at no CDN, and
 * the upstream examples pointed their images at source.unsplash.com, which no
 * longer resolves.
 *
 * To regenerate: tools/design-library-patterns/README.md
 *
 * @package Lumen
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
${ entries }
);
`

fs.writeFileSync( DEST, php )
console.log( `wrote ${ DEST }` )
console.log( `${ built.length } patterns, ${ ( php.length / 1024 ).toFixed( 0 ) } KB` )
const cats = {}
built.forEach( b => { cats[ b.category ] = ( cats[ b.category ] || 0 ) + 1 } )
console.log( 'categories:', Object.entries( cats ).map( ( [ k, v ] ) => `${ k }(${ v })` ).join( ', ' ) )
