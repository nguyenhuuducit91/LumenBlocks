import { getCleanAttributes, LUMEN_FILTERS } from './blocks'

import { select } from '@wordpress/data'

const BLOCK_STYLES_FILTER = {
	'lumen/column': [ 'columnWidth', 'columnAdjacentCount' ],
	'lumen/table-of-contents': [ 'text', 'headings' ],
	'lumen/icon-list-item': [ 'parentUniqueId' ],
}

export const getBlockStyleAttributesFilter = ( blockName, additionalFilters = [] ) => {
	return [
		'uniqueId',
		'anchor',
		...( LUMEN_FILTERS[ blockName ] || [] ),
		...( BLOCK_STYLES_FILTER[ blockName ] || [] ),
		...additionalFilters,
	]
}

export const isBlockStyleAttributesModified = ( blockName, styleSlug, _blockAttrs ) => {
	const blockStyleAttrs = select( 'lumen/global-block-styles' ).getBlockStyles( blockName )?.find( item => item.slug === styleSlug )?.nonCssAttributes || {}
	const blockAttrs = getCleanAttributes( _blockAttrs, blockName )
	const filter = getBlockStyleAttributesFilter( blockName, [ 'generatedCss', 'blockStyle', 'modifiedBlockStyle' ] )

	const attrsToRemove = new Set( [ ...filter, ...Object.keys( blockStyleAttrs ) ] )

	attrsToRemove.forEach( attr => {
		if ( blockAttrs[ attr ] ) {
			delete blockAttrs[ attr ]
		}
	} )

	return Object.keys( blockAttrs ).length
}
