/**
 * Ensures that the Version number declared in the main plugin PHP file
 * is used for the LUMEN_VERSION PHP constant and the
 * Stable tag in the readme file.
 *
 * Also syncs readme.txt "Tested up to" with the latest WordPress release from
 * api.wordpress.org (without downgrading), and sets "Requires at least" to
 * two minor versions below the effective tested version when the tested line updates.
 *
 * Also syncs readme.txt "Requires PHP" with the latest WordPress release minimum
 * PHP requirement from the API (without downgrading).
 *
 * Also updates the Playwright matrix in GitHub workflow files so CI tests only
 * supported WordPress and PHP version combinations.
 */

const fs = require( 'fs' )
const replace = require( 'replace-in-file' )
const compareVersions = require( 'compare-versions' )
const {
	fetchWordPressReleases,
	subtractMinorVersions,
	syncPlaywrightTestMatrix,
} = require( './playwright-test-matrix' )

/*
 * The plugin header is written as aligned columns — `Version:` and then enough
 * spaces to line its value up with `Requires at least:` below it. These used to
 * ask for a single space after the colon, matched nothing, and took `[ 1 ]` of
 * null, which is the whole of why the build would not start.
 *
 * Anchored to a docblock line as well as loosened, so that the version can only
 * be read from the plugin header and never from a stray "Version:" elsewhere in
 * the file.
 */
const HEADER_VERSION = /^\s*\*\s*Version:\s*([\d.]+)/m
const HEADER_FULL_VERSION = /^\s*\*\s*Version:\s*([\d\w\-_.]+)/m

const readHeaderVersion = pattern => {
	const content = fs.readFileSync( 'lumen-blocks.php', 'utf8' )
	const match = content.match( pattern )

	if ( ! match ) {
		throw new Error(
			'Could not read "Version:" from the plugin header in lumen-blocks.php. ' +
			'The build sets the LUMEN_VERSION constant, the readme stable tag and the ' +
			'package version from it, so it cannot carry on without it.'
		)
	}

	return match[ 1 ]
}

const getVersion = () => readHeaderVersion( HEADER_VERSION )

const getFullVersion = () => readHeaderVersion( HEADER_FULL_VERSION )

const getReadmeTestedUpTo = () => {
	const content = fs.readFileSync( 'readme.txt', 'utf8' )
	const m = content.match( /^Tested up to:\s*(\S+)/m )
	return m ? m[ 1 ] : null
}

const getReadmeRequiresPhp = () => {
	const content = fs.readFileSync( 'readme.txt', 'utf8' )
	const m = content.match( /^Requires PHP:\s*(\S+)/m )
	return m ? m[ 1 ] : null
}

const replaceConstant = async version => {
	const changes = await replace( {
		files: 'lumen-blocks.php',
		from: /define\((.*)?LUMEN_VERSION(.*)?,(.*)?['"]?([a-zA-Z\d-.])*['"]?(.*)?\)/,
		to: `define( 'LUMEN_VERSION', '${ version }' )`,
	} )
	if ( changes.length ) {
		console.log( `Bumped LUMEN_VERSION number to ${ version }...` ) // eslint-disable-line
	}
}

const replaceReadmeStableTag = async version => {
	const changes = await replace( {
		files: 'readme.txt',
		from: /Stable tag: ([\S]+)/,
		to: `Stable tag: ${ version }`,
	} )
	if ( changes.length ) {
		console.log( `Bumped Stable tag number to ${ version }...` ) // eslint-disable-line
	}
}

const replacePackageJson = async version => {
	const changes = await replace( {
		files: 'package.json',
		from: /"version": "([\S]+)"/,
		to: `"version": "${ version }"`,
	} )
	if ( changes.length ) {
		console.log( `Bumped package version number to ${ version }...` ) // eslint-disable-line
	}
}

const replaceReadmeTestedAndRequires = async ( testedVersion, requiresAtLeast ) => {
	const testedChanges = await replace( {
		files: 'readme.txt',
		from: /^Tested up to:\s*(\S+)/m,
		to: `Tested up to: ${ testedVersion }`,
	} )
	const requiresChanges = await replace( {
		files: 'readme.txt',
		from: /^Requires at least:\s*(\S+)/m,
		to: `Requires at least: ${ requiresAtLeast }`,
	} )
	if ( testedChanges.length ) {
		console.log( `Updated Tested up to: ${ testedVersion }...` ) // eslint-disable-line
	}
	if ( requiresChanges.length ) {
		console.log( `Updated Requires at least: ${ requiresAtLeast }...` ) // eslint-disable-line
	}
}

const replaceReadmeRequiresPhp = async requiresPhp => {
	const changes = await replace( {
		files: 'readme.txt',
		from: /^Requires PHP:\s*(\S+)/m,
		to: `Requires PHP: ${ requiresPhp }`,
	} )
	if ( changes.length ) {
		console.log( `Updated Requires PHP: ${ requiresPhp }...` ) // eslint-disable-line
	}
}

const main = async () => {
	const version = getVersion()
	const fullVersion = getFullVersion()
	await replaceConstant( fullVersion )
	await replaceReadmeStableTag( version )
	await replacePackageJson( version )

	let testedUpTo = getReadmeTestedUpTo()
	if ( ! testedUpTo ) {
		console.warn( 'Could not read Tested up to from readme.txt; skipping WordPress sync.' ) // eslint-disable-line
		return
	}

	let requiresPhp = getReadmeRequiresPhp()
	if ( ! requiresPhp ) {
		console.warn( 'Could not read Requires PHP from readme.txt; skipping WordPress sync.' ) // eslint-disable-line
		return
	}

	try {
		const releases = await fetchWordPressReleases()
		const latestRelease = releases[ 0 ]
		const latestWp = latestRelease.version
		const latestMinPhp = latestRelease.phpVersion

		// Only bump when the API reports a newer stable than readme (never downgrade).
		if ( compareVersions( latestWp, testedUpTo ) > 0 ) {
			const requiresAtLeast = subtractMinorVersions( latestWp, 2 )
			await replaceReadmeTestedAndRequires( latestWp, requiresAtLeast )
			testedUpTo = latestWp
		}

		// Only bump when the latest WordPress release requires a higher PHP (never downgrade).
		if ( compareVersions( latestMinPhp, requiresPhp ) > 0 ) {
			await replaceReadmeRequiresPhp( latestMinPhp )
			requiresPhp = latestMinPhp
		}

		await syncPlaywrightTestMatrix( {
			testedUpTo,
			minPhp: requiresPhp,
			releases,
		} )
	} catch ( err ) {
		console.warn( `Skipped WordPress readme sync: ${ err.message }` ) // eslint-disable-line
	}
}

main().catch( err => {
	console.error( err ) // eslint-disable-line
	process.exit( 1 )
} )
