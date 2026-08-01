/**
 * Updates the build type constant LUMEN_BUILD in the main plugin file. This
 * constant is used to decide whether certain (premium) files are loaded.
 */

const path = require( 'path' )
const replace = require( 'replace-in-file' )

const replaceConstant = build => {
	replace( {
		files: path.resolve( __dirname, '../lumen-blocks.php' ),
		from: /define\((.*)?LUMEN_BUILD(.*)?,(.*)?['"]?([a-zA-Z\d\-.])*['"]?(.*)?\)/,
		to: `define( 'LUMEN_BUILD', '${ build }' )`,
	} ).then( changes => {
		if ( changes.length ) {
			console.log( `Updated LUMEN_BUILD const to ${ build }...` ) // eslint-disable-line
		}
	} )
}

replaceConstant( process.argv[ 2 ] || 'free' )
