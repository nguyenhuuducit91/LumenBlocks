/**
 * Lumen exposes its component library in `window.lmn`, this is aliased as `~lumen/*`. For scripts other than the main script, use aliased imports to use this library.
 *
 * ```js
 * // Invalid
 * // import SortControl from '~lumen/ui/sort-control'
 *
 * // Valid
 * import { SortControl } from '~lumen/ui'
 * ```
 *
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow embedding of individual components, use the exposed Lumen library instead',
			recommended: true,
		},
	},
	create: context => {
		const fullPath = context.getPhysicalFilename()
		return ( {
			ImportDeclaration: node => { // AST Node Type
				if ( node.source && node.source.type === 'Literal' ) {
					if ( fullPath.includes( '/pro__premium_only/src/' ) && ! fullPath.includes( '/pro__premium_only/src/legacy/' ) && ! fullPath.includes( '/pro__premium_only/src/dashboard/' ) && ! fullPath.includes( '/pro__premium_only/src/admin/' ) ) {
						if ( node.source.value && node.source.value.startsWith( '~lumen/' ) ) {
							if ( node.source.value.match( /^~lumen\/[\w-]+\// ) ) {
								context.report( {
									node,
									message: 'Do not import Lumen components directly, use the exposed Lumen library via \'{{ identifier }}\', instead import only the component that you want to use via \'{{ identifier }}\'. See link for more details.',
									data: {
										identifier: node.source.value.replace( /^(~lumen\/[\w-]+).*$/, '$1' ),
									},
								} )
							}
						}
					}
				}
			},
		} )
	},
}
