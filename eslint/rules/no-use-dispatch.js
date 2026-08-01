/**
 * Using `const { foo } = useDispatch( 'core/bar' )` in a component can cause rerenders. Instead, just call the `dispatch` directly `dispatch( 'core/bar' ).foo()` where you are going to call the function.
 *
 * ```js
 * // const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( 'core/block-editor' )
 * // __unstableMarkNextChangeAsNotPersistent()
 * // New usage
 * dispatch( 'core/block-editor' ).__unstableMarkNextChangeAsNotPersistent()
 * ```
 *
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow useDispatch hook',
			recommended: true,
		},
	},
	create: context => ( {
		CallExpression: node => { // AST Node Type
			if ( node.callee.name === 'useBlockAttributes' ) {
				context.report( node, 'Do not use `const { foo } = useDispatch( \'core/bar\' )`, call the dispatched function directly `dispatch( \'core/bar\' ).foo()` instead. See link for more details.' )
			}
		},
	} ),
}
