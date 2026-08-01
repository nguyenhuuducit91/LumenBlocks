/**
 * In `src/welcome` and `src/admin`, importing the base module/library via `~lumen/components` will unnecessarily import the entire library and will dramatically increase the compiled script. Instead, import the component that's needed directly:
 *
 * ```js
 * // Invalid:
 * // import { AdminToggleSetting } from '~lumen/ui'
 *
 * // Valid:
 * import AdminToggleSetting from '~lumen/ui/admin-toggle-setting'
 * ```
 *
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow importing of the whole library in plugin admin',
			recommended: true,
		},
	},
	create: context => {
		const fullPath = context.getPhysicalFilename()
		return ( {
			ImportDeclaration: node => { // AST Node Type
				if ( node.source && node.source.type === 'Literal' ) {
					if ( fullPath.includes( '/src/dashboard/' ) || fullPath.includes( '/src/admin/' ) ||
					     ( fullPath.includes( '/src/legacy/' ) && fullPath.includes( '/welcome/' ) )
					) {
						if ( node.source.value && node.source.value.startsWith( '~lumen/' ) ) {
							if ( node.source.value.match( /^~lumen\/[\w-]+\/?$/ ) ) {
								context.report( {
									node,
									message: 'Do not import the entire Lumen library via \'{{ identifier }}\', instead import only the component that you want to use via \'{{ identifier }}/the-component\'. See link for more details.',
									data: {
										identifier: node.source.value,
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
