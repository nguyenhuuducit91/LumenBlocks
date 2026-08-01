/**
 * Turning what an author typed into CSS that is safe to put on a page.
 *
 * Two jobs, and the order matters.
 *
 * **Scoping.** Rules are rewritten so they can only reach inside this block.
 * `selector { … }` becomes `.lmn-abc1234 { … }`, and a bare `a:hover` becomes
 * `.lmn-abc1234 a:hover`. Without this, one block's custom CSS silently
 * restyles the whole site and the author has no idea which block did it.
 *
 * **Filtering.** The CSS ends up inside a `<style>` element in post content,
 * so anything that can close that element, fetch a remote file or execute has
 * to go. This is a small denylist rather than a CSS parser, and it is written
 * to fail closed: when a construct cannot be understood, it is dropped.
 */

/**
 * The token an author writes to mean "this block".
 */
export const SELECTOR_TOKEN = 'selector'

/**
 * Constructs that must never survive into a page.
 *
 * `</style` ends the element early and lets arbitrary HTML follow, which is the
 * one that actually matters. The rest cannot execute in any browser this
 * plugin supports, but they fetch remote resources or resurrect old IE
 * behaviours, and none of them belong in a block's styling.
 */
const FORBIDDEN = [
	// Whole statements, not just their names: deleting the words `@import`
	// and leaving `url(https://…);` behind is worse than useless — the debris
	// runs into the next rule and derails the scoping of everything after it.
	/@import[^;}]*;?/gi,
	/@charset[^;}]*;?/gi,
	// Elements go with their contents. Removing `<script>` and `</script>`
	// but leaving `alert(2)` behind turns the leftover into a selector, and a
	// stray selector swallows the rule that follows it.
	/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi,
	/<\s*\/?\s*(style|script)[^>]*>?/gi,
	/javascript\s*:/gi,
	/expression\s*\(/gi,
	/behaviou?r\s*:/gi,
	/-moz-binding/gi,
]

/**
 * Removes anything from the denylist.
 *
 * @param {string} css What the author typed.
 * @return {string} CSS with the dangerous parts gone.
 */
export const filterCss = css => FORBIDDEN.reduce(
	( safe, pattern ) => safe.replace( pattern, '' ),
	String( css || '' )
)

/**
 * Rewrites one selector so it cannot reach outside the block.
 *
 * @param {string} selector One selector from a rule.
 * @param {string} blockClass The block's unique class, with its dot.
 * @return {string} Scoped selector.
 */
const scopeSelector = ( selector, blockClass ) => {
	const trimmed = selector.trim()

	if ( ! trimmed ) {
		return ''
	}

	// `selector` on its own, or leading a descendant path, means the block.
	if ( trimmed === SELECTOR_TOKEN ) {
		return blockClass
	}

	if ( trimmed.includes( SELECTOR_TOKEN ) ) {
		return trimmed.replace( new RegExp( `\\b${ SELECTOR_TOKEN }\\b`, 'g' ), blockClass )
	}

	// Anything else is treated as being inside the block, so a bare `a` cannot
	// restyle every link on the site.
	return `${ blockClass } ${ trimmed }`
}

/**
 * Scopes every rule in a stylesheet to one block.
 *
 * At-rules that carry nested rules — media and container queries, `@supports`
 * — have their contents scoped and their own line left alone. Anything else
 * beginning with `@` is dropped, because a font-face or a keyframes block
 * belongs to the document rather than to a block, and scoping it is meaningless.
 *
 * @param {string} css        Filtered CSS.
 * @param {string} blockClass The block's unique class, with its dot.
 * @return {string} Scoped CSS.
 */
export const scopeCss = ( css, blockClass ) => {
	if ( ! css || ! blockClass ) {
		return ''
	}

	const out = []
	let rest = css
	// Guards against a malformed stylesheet spinning this loop forever.
	let guard = 0

	while ( rest.trim() && guard++ < 500 ) {
		const open = rest.indexOf( '{' )

		if ( open === -1 ) {
			break
		}

		const prelude = rest.slice( 0, open ).trim()

		// Find the matching close brace, counting nesting.
		let depth = 0
		let close = -1

		for ( let i = open; i < rest.length; i++ ) {
			if ( rest[ i ] === '{' ) {
				depth++
			}

			if ( rest[ i ] === '}' ) {
				depth--

				if ( depth === 0 ) {
					close = i
					break
				}
			}
		}

		if ( close === -1 ) {
			break
		}

		const body = rest.slice( open + 1, close )
		rest = rest.slice( close + 1 )

		/*
		 * An at-rule anywhere in the prelude — not only at its start. Filtering
		 * can leave debris in front of one, and scoping `junk @font-face` as if
		 * it were a selector would put the at-rule back on the page.
		 */
		if ( prelude.includes( '@' ) ) {
			if ( /^@(media|supports|container|layer)\b/i.test( prelude ) ) {
				out.push( `${ prelude }{${ scopeCss( body, blockClass ) }}` )
			}

			// Every other at-rule is dropped on purpose: a font-face or a
			// keyframes belongs to the document, not to one block.
			continue
		}

		const selectors = prelude
			.split( ',' )
			.map( one => scopeSelector( one, blockClass ) )
			.filter( Boolean )
			.join( ',' )

		if ( selectors ) {
			out.push( `${ selectors }{${ body.trim() }}` )
		}
	}

	return out.join( '' )
}

/**
 * The finished stylesheet for one block.
 *
 * @param {string} css      What the author typed.
 * @param {string} uniqueId The block's unique id.
 * @return {string} CSS ready to put in a `style` element.
 */
export const compileCustomCss = ( css, uniqueId ) => {
	if ( ! css || ! uniqueId ) {
		return ''
	}

	return scopeCss( filterCss( css ), `.lmn-${ uniqueId }` )
}
