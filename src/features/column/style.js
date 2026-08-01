/**
 * Internal dependencies
 */
import { safeWidth } from './width-value'

/**
 * External dependencies
 */
import { __getValue } from '~lumen/utils'

/**
 * The unit a column's width is measured in, and what that implies.
 *
 * Per cent is the default and the only unit the surrounding arithmetic works
 * for. A width of `33.33%` has to have its share of the column gap subtracted
 * or three of them overflow their row; a width of `300px` must not, because
 * flex already accounts for the gap when it decides what fits. So the unit does
 * not just change a suffix — it decides whether the `calc()` happens at all.
 *
 * @param {Function} getAttribute Attribute reader.
 * @param {string}   device       Which viewport.
 * @return {{unit: string, isPercent: boolean}} The unit and whether it is a percentage.
 */
const readWidthUnit = ( getAttribute, device ) => {
	const unit = getAttribute( 'columnWidthUnit', device ) || '%'

	return {
		unit,
		isPercent: unit === '%',
		isCustom: unit === 'custom',
	}
}

/**
 * Appends the unit to a width that has been formatted as a percentage.
 *
 * The style rules are declared with `%` in their format string, which is what
 * every column used before units existed. Rather than make three format strings
 * dynamic — and change the CSS of every existing column in the process — the
 * suffix is swapped here, only when it is not a percentage.
 *
 * @param {string} value The formatted value, ending in `%`.
 * @param {string} unit  The unit to use.
 * @return {string} The value in the right unit.
 */
const withUnit = ( value, unit ) => {
	if ( unit === '%' ) {
		return value
	}

	/*
	 * A written-out width already carries its own units, so the `%` the format
	 * string appended is taken off and nothing is put in its place.
	 */
	return value.replace( /%$/, unit === 'custom' ? '' : unit )
}

/**
 * Whether a written-out width is usable, and what it is.
 *
 * @param {Function} getAttribute Attribute reader.
 * @param {string}   device       Which viewport.
 * @return {string|undefined} The width, or undefined when it will not do.
 */
const readCustomWidth = ( getAttribute, device ) => safeWidth( getAttribute( 'columnWidth', device ) )

export const addStyles = ( blockStyleGenerator, props = {} ) => {
	const propsToPass = {
		...props,
		version: props.version,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	}

	const {
		selector = '',
		dependencies = [],
	} = props

	blockStyleGenerator.addBlockStyles( 'columnWidth', [ {
		...propsToPass,
		renderIn: 'edit',
		selectorCallback: ( getAttributes, attributes, clientId ) => `[data-block="${ clientId }"]`,
		styleRule: 'flex',
		attrName: 'columnWidth',
		key: 'columnWidth-flex',
		responsive: [ 'desktopTablet', 'tabletOnly', 'mobile' ],
		format: '1 1 %s%',
		dependencies: [
			'columnAdjacentCount',
			'columnWidthUnit',
			...dependencies,
		],
		valueCallback: ( value, getAttribute, device ) => {
			const {
				unit, isPercent, isCustom,
			} = readWidthUnit( getAttribute, device )

			if ( isCustom && ! readCustomWidth( getAttribute, device ) ) {
				return undefined
			}

			if ( device === 'desktop' ) {
				return withUnit( value, unit )
			}

			const adjacentCount = getAttribute( 'columnAdjacentCount', device )

			if ( adjacentCount && isPercent ) {
				return value.replace( /([\d\.]+%)$/, `calc($1 - var(--lmn-column-gap, 0px) * ${ adjacentCount - 1 } / ${ adjacentCount } )` )
			}

			return withUnit( value, unit )
		},
	} ] )

	// We need to add a maxWidth in the editor since the re-resizable box
	// can mess up the snapping if the column width is too small, then
	// resizes to a larger size.
	blockStyleGenerator.addBlockStyles( 'columnWidth', [ {
		...propsToPass,
		renderIn: 'edit',
		selectorCallback: ( getAttributes, attributes, clientId ) => `[data-block="${ clientId }"]`,
		styleRule: 'maxWidth',
		attrName: 'columnWidth',
		key: 'columnWidth-maxwidth',
		responsive: [ 'desktopTablet', 'tabletOnly', 'mobile' ],
		format: '%s%',
		dependencies: [
			'columnAdjacentCount',
			'columnWidthUnit',
			...dependencies,
		],
		valueCallback: ( value, getAttribute, device ) => {
			const {
				unit, isPercent, isCustom,
			} = readWidthUnit( getAttribute, device )

			if ( isCustom && ! readCustomWidth( getAttribute, device ) ) {
				return undefined
			}

			const adjacentCount = getAttribute( 'columnAdjacentCount', device )

			if ( adjacentCount && isPercent ) {
				return value.replace( /([\d\.]+%)$/, `calc($1 - var(--lmn-column-gap, 0px) * ${ adjacentCount - 1 } / ${ adjacentCount } )` )
			}

			return withUnit( value, unit )
		},
	} ] )

	blockStyleGenerator.addBlockStyles( 'columnWidth', [ {
		...propsToPass,
		renderIn: 'save',
		selector,
		styleRule: 'flex',
		attrName: 'columnWidth',
		key: 'columnWidth-save-flex',
		responsive: [ 'desktopTablet', 'tabletOnly', 'mobile' ],
		format: 'var(--lmn-flex-grow, 1) 1 %s%',
		dependencies: [
			'columnAdjacentCount',
			'columnWidthUnit',
			...dependencies,
		 ],
		valueCallback: ( _value, getAttribute, device ) => {
			// Flex grow should be turned on in desktop, so negative margins
			// can make the columns expand. (e.g. 50% 50% then -200px margin
			// left on 2nd column).
			//
			// In tablet/mobile, don't allow expanding since columns would
			// always expand to the available space (so you can't do a 30%
			// 30% columns in tablet/mobile, they will expand to 50% 50%)
			//
			// No need to do this in the editor since it already does this.
			const value = device === 'desktop' && ! getAttribute( 'columnWrapDesktop' ) ? _value : _value.replace( /^var(--lmn-flex-grow, 1) 1/, '0 1' )

			const {
				unit, isPercent, isCustom,
			} = readWidthUnit( getAttribute, device )

			if ( isCustom && ! readCustomWidth( getAttribute, device ) ) {
				return undefined
			}

			const adjacentCount = getAttribute( 'columnAdjacentCount', device )

			if ( adjacentCount && isPercent ) {
				return value.replace( /([\d\.]+%)$/, `calc($1 - var(--lmn-column-gap, 0px) * ${ adjacentCount - 1 } / ${ adjacentCount } )` )
			}

			return withUnit( value, unit )
		},
	} ] )
}
