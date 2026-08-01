/**
 * Appends a string to the end of the Version in the lumen-blocks.php in the build
 * folder. Used by Github Actions to change the version post building.
 *
 * Usage:
 * node ./tools/append-build-version my-suffix
 */

const suffix = process.argv[ 2 ] || ''

if ( suffix ) {
	const replace = require( 'replace-in-file' )
	const suffixVersion = suffix => {
		replace( {
			files: 'build/lumen-blocks/lumen-blocks.php',
			from: /(\s*\*\s+Version:\s+.+)/,
			to: `\$1-${ suffix }`,
		} ).then( changes => {
			if ( changes.length ) {
				console.log( `Suffixed Version number with ${ suffix }...` ) // eslint-disable-line
			}
		} )
	}
	suffixVersion( suffix )
}
