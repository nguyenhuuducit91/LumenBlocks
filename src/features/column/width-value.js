/**
 * Column widths that an author writes out in full.
 *
 * A number and a unit cannot say "everything that is left after the 200px
 * column", which is the one layout people actually come here wanting: a fixed
 * sidebar beside a column that takes the rest. `calc(100% - 200px)` says it in
 * one line, so the widths can be typed rather than picked.
 *
 * What is typed goes straight into a CSS declaration, so it is checked first.
 * Not because an author is an attacker — they can already write CSS in the
 * Custom CSS panel — but because a stray `;` or `}` silently breaks every rule
 * after it in the block's stylesheet, and the author would have no idea which
 * of their columns did it.
 */

/**
 * Characters that would end the declaration, or start something else.
 *
 * `;` and `}` close it; `{` and `<` start a rule or a tag; `@` starts an
 * at-rule; quotes and backslashes are how those get smuggled past a naive
 * check. None of them appear in a length.
 */
const FORBIDDEN = /[;{}<>@\\"']/

/**
 * What a width is allowed to be made of.
 *
 * Digits, the arithmetic `calc` understands, the length units the rest of the
 * plugin uses, and `var(--…)` so a width can follow a design token. Anything
 * else — `url(`, `expression(`, a bare word — is not a length.
 */
const ALLOWED = /^[\d\s.+\-*/()%a-z_,]+$/i

const ALLOWED_FUNCTIONS = /(^|[^a-z-])(calc|min|max|clamp|var)\s*\(/gi

/**
 * Whether a width can be put into a stylesheet as it stands.
 *
 * @param {string} value What the author typed.
 * @return {boolean} Whether to use it.
 */
export const isSafeWidth = value => {
	const width = String( value || '' ).trim()

	if ( ! width || FORBIDDEN.test( width ) || ! ALLOWED.test( width ) ) {
		return false
	}

	// Brackets have to balance, or the declaration runs into the next one.
	let depth = 0

	for ( const character of width ) {
		if ( character === '(' ) {
			depth++
		}

		if ( character === ')' ) {
			depth--

			if ( depth < 0 ) {
				return false
			}
		}
	}

	if ( depth !== 0 ) {
		return false
	}

	/*
	 * Every function call has to be one this list knows. `ALLOWED` lets letters
	 * through so that `px` and `calc` work, which on its own would also let
	 * `url(…)` through.
	 */
	const functions = width.match( /[a-z-]+\s*\(/gi ) || []

	return functions.every( call => {
		ALLOWED_FUNCTIONS.lastIndex = 0

		return /^(calc|min|max|clamp|var)\s*\($/i.test( call.trim() )
	} )
}

/**
 * A width ready to be put in a declaration, or nothing.
 *
 * Returning nothing for a value that does not pass leaves the column with no
 * width of its own rather than with a broken rule: the layout falls back to
 * even columns, which reads as "that did not work" instead of quietly breaking
 * the styles of everything after it.
 *
 * @param {string} value What the author typed.
 * @return {string|undefined} The width, or undefined.
 */
export const safeWidth = value => ( isSafeWidth( value ) ? String( value ).trim() : undefined )
