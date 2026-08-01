/**
 * Column widths and column order, stored as one string each.
 *
 * Both grids in this block — the grid of posts, and the grid inside one post —
 * need the same two things: a width per column and an order for the columns.
 * Each is kept as one comma-separated string per device rather than as an
 * attribute per column, because each becomes exactly one CSS declaration
 * (`grid-template-columns`), and because the number of columns changes: a
 * per-column attribute would leave orphans behind every time it did.
 *
 * A width carries its own unit, so one column can be `300px` beside another
 * that is `calc(100% - 300px)` without a separate unit attribute to keep in
 * step with it.
 */

/**
 * Internal dependencies
 */
import { isSafeWidth } from '~lumen/features'

/**
 * Reads a stored list.
 *
 * @param {string} value The stored string.
 * @return {string[]} One entry per column.
 */
export const parseList = value => String( value || '' )
	.split( ',' )
	.map( one => one.trim() )

/**
 * Writes a list back.
 *
 * A list of nothing but empty entries is stored as nothing at all, so that
 * clearing every column removes the attribute rather than leaving `,,` behind
 * for the next reader to interpret.
 *
 * @param {string[]} list One entry per column.
 * @return {string} The stored string.
 */
export const toList = list => {
	const cleaned = list.map( one => String( one ?? '' ).trim() )

	return cleaned.some( Boolean ) ? cleaned.join( ',' ) : ''
}

/**
 * The `grid-template-columns` for a set of widths.
 *
 * A column with nothing set takes an equal share of what is left, which is what
 * makes a half-filled setting useful: give one column `300px` and the others
 * arrange themselves around it.
 *
 * Every width is checked before it is used — these strings end up in a CSS
 * declaration, and one bad character breaks every rule after it.
 *
 * @param {string} value  The stored widths.
 * @param {number} count  How many columns there are.
 * @return {string|undefined} The template, or undefined when nothing is set.
 */
export const widthsToTemplate = ( value, count ) => {
	const list = parseList( value )

	if ( ! list.some( Boolean ) ) {
		return undefined
	}

	const columns = []

	for ( let i = 0; i < count; i++ ) {
		const width = list[ i ]

		columns.push( width && isSafeWidth( width ) ? width : '1fr' )
	}

	return columns.join( ' ' )
}

/**
 * The column each position should be placed in.
 *
 * Stored as the order the author dragged the columns into — `2,1` means "show
 * the second column first". Anything malformed is ignored rather than half
 * applied, because a partly-applied order is a layout nobody asked for.
 *
 * @param {string} value The stored order.
 * @param {number} count How many columns there are.
 * @return {number[]|undefined} The column for each position, or undefined.
 */
export const arrangementToColumns = ( value, count ) => {
	const list = parseList( value )
		.map( one => parseInt( one, 10 ) )
		.filter( one => one >= 1 && one <= count )

	if ( list.length !== count ) {
		return undefined
	}

	// Every column exactly once, or it is not an arrangement.
	if ( new Set( list ).size !== count ) {
		return undefined
	}

	// Already in order means there is nothing to write.
	return list.every( ( column, i ) => column === i + 1 ) ? undefined : list
}
