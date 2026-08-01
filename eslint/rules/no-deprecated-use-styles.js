/**
 * The `useStyles` method inside `style.js` block scripts no longer need an `attributes` object to be passed to it - this is already done using context.
 *
 * ```js
 * // New usage
 * // const { clientId } = useBlockEditContext()
 * // const attributes = useBlockAttributes( clientId )
 * // const styles = useStyles( attributes, getStyleParams( props ) )
 * const styles = useStyles( getStyleParams( props ) )
 * ```
 *
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow deprecated useStyles usage',
			recommended: true,
		},
	},
	create: context => ( {
		CallExpression: node => { // AST Node Type
			if ( node.callee.name === 'useStyles' && node.arguments.length === 2 ) {
				context.report( node, 'The new usage is `useStyles( params )`. No need to pass an `attributes` object, the hook now uses the attributes of the block on its own. See link for more details.' )
			}
		},
	} ),
}
