/**
 * The `select( 'core/block-editor' ).getBlockParents( clientId )` can causes rerenders. Instead use our hook `const { parentTree } = useBlockContext( clientId )` instead since this is faster.
 *
 * ```js
 * // const parents = select( 'core/block-editor' ).getBlockParents( clientId )
 * // New usage
 * const { parentTree } = useBlockContext( clientId )
 * const parents = parentTree.map( block => block.clientId )
 * ```
 *
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow getBlockParents from wp.data.select',
			recommended: true,
		},
	},
	create: context => ( {
		CallExpression: node => { // AST Node Type
			if ( node.callee.name === 'getBlockParents' ) {
				context.report( node, 'Do not use `getBlockParents( clientId )`, instead use `const { parentTree } = useBlockContext( clientId )` or `const { parentTree } = select( \'lumen/block-context\' ).getBlockContext( clientId )` for a faster alternative. See link for more details.' )
			}
			if ( node.callee.type === 'MemberExpression' && node.callee.property?.name === 'getBlockParents' ) {
				context.report( node, 'Do not use `getBlockParents( clientId )`, instead use `const { parentTree } = useBlockContext( clientId )` or `const { parentTree } = select( \'lumen/block-context\' ).getBlockContext( clientId )` for a faster alternative. See link for more details.' )
			}
		},
	} ),
}
