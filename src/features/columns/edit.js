/**
 * Internal dependencies
 */
import { ColumnsControl } from './column-settings-button'
import { getRowsFromColumns } from '../column/util'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	AdvancedRangeControl,
	AdvancedToggleControl,
	ColumnsWidthControl,
	ColumnsWidthMultiControl,
	ControlSeparator,
	InspectorLayoutControls,
	SortControl,
} from '~lumen/ui'
import { getAttributeName } from '~lumen/utils'
import {
	useBlockAttributesContext,
	useBlockSetAttributesContext,
	useDeviceType,
	useBlockLayoutDefaults,
	usePresetControls,
} from '~lumen/hooks'
import { range } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
	select, dispatch, useSelect,
} from '@wordpress/data'
import { useBlockEditContext } from '@wordpress/block-editor'
import { useState } from '@wordpress/element'

export const Controls = props => {
	// TODO: Get global default value for placeholder
	const [ , setColumnsUpdate ] = useState( 0 )
	const deviceType = useDeviceType()
	const { getPlaceholder } = useBlockLayoutDefaults()
	const { clientId } = useBlockEditContext()
	const {
		numInnerBlocks, innerBlocks,
	} = useSelect(
		select => {
			const { getBlock } = select( 'core/block-editor' )
			const innerBlocks = getBlock( clientId )?.innerBlocks

			return {
				innerBlocks,
				numInnerBlocks: innerBlocks.length,
			}
		},
		[ clientId ]
	)

	const {
		multiClientIds, multiInnerBlocks, hasMultiSelectedBlocks,
	} = useSelect( select => {
		const multiClientIds = select( 'core/block-editor' ).getMultiSelectedBlockClientIds()
		const multiInnerBlocks = {}

		multiClientIds.forEach( clientId => {
			const innerBlocks = select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
			multiInnerBlocks[ clientId ] = innerBlocks
		} )

		return {
			multiClientIds,
			multiInnerBlocks,
			hasMultiSelectedBlocks: multiClientIds.length > 1,
		}
	} )
	const attributes = useBlockAttributesContext( attributes => {
		return {
			columnArrangementTablet: attributes.columnArrangementTablet,
			columnArrangementMobile: attributes.columnArrangementMobile,
			columnWrapDesktop: attributes.columnWrapDesktop,
		}
	} )
	const setMultiBlockAttributes = ( _clientId, attrs ) => {
		dispatch( 'core/block-editor' ).updateBlockAttributes( multiClientIds, attrs ) // eslint-disable-line lumen/no-update-block-attributes
	}
	const setSingleBlockAttributes = useBlockSetAttributesContext()

	const setAttributes = attrs => {
		if ( multiClientIds.length ) {
			multiClientIds.forEach( _clientId => setMultiBlockAttributes( _clientId, attrs ) )
		} else {
			setSingleBlockAttributes( attrs )
		}
	}

	const columnWidths = []
	const columnWidthsTablet = []
	const columnWidthsMobile = []
	let hasTabletColumnWidths = false
	let hasMobileColumnWidths = false

	// Every column carries its own unit — `columnWidthUnit` has always been an
	// attribute of the column block and column/style.js reads it per column —
	// so the units are collected as a list, in the same order as the widths.
	const columnWidthUnits = []

	innerBlocks.forEach( ( { clientId } ) => {
		const attributes = select( 'core/block-editor' ).getBlockAttributes( clientId )
		if ( attributes ) {
			// check if attributes exist because there might be a delay in updating the inner blocks
			// e.g. a column block may not exist anymore but the inner blocks may still have its client id
			// this fixes the block error when adjusting the number of columns from higher to lower in shared controls
			columnWidths.push( attributes.columnWidth )
			columnWidthsTablet.push( attributes.columnWidthTablet )
			columnWidthsMobile.push( attributes.columnWidthMobile )

			columnWidthUnits.push( attributes[ getAttributeName( 'columnWidthUnit', deviceType ) ] || '%' )

			if ( attributes.columnWidthTablet ) {
				hasTabletColumnWidths = true
			}
			if ( attributes.columnWidthMobile ) {
				hasMobileColumnWidths = true
			}
		}
	} )

	const currentColumnWidths = deviceType === 'Desktop' ? columnWidths
		: deviceType === 'Tablet' ? columnWidthsTablet
			: columnWidthsMobile

	/*
	 * Which columns share a row is worked out by adding widths up until they
	 * pass 100 — arithmetic that only means something while every width in the
	 * row is a percentage. As soon as one column is measured in px, rem or em,
	 * the browser is the one deciding what fits, so the count is left unset for
	 * the whole row and the gap compensation in column/style.js never runs.
	 */
	const getAdjacentCounts = ( widths, units ) => {
		if ( units.some( unit => ( unit || '%' ) !== '%' ) ) {
			return widths.map( () => '' )
		}

		const columnRows = getRowsFromColumns( widths )
		return widths.map( ( _, i ) => columnRows.filter( n => n === columnRows[ i ] ).length )
	}

	// Writes per-index attributes to this block's columns, or to the columns of
	// every selected Columns block when there is a multi-selection.
	const updateColumnAttributes = getAttributesForIndex => {
		const clientIds = []
		const attributes = {}
		const blockLists = hasMultiSelectedBlocks ? Object.values( multiInnerBlocks ) : [ innerBlocks ]

		blockLists.forEach( blocks => {
			blocks.forEach( ( block, i ) => {
				clientIds.push( block.clientId )
				attributes[ block.clientId ] = getAttributesForIndex( i )
			} )
		} )

		dispatch( 'core/block-editor' ).updateBlockAttributes( clientIds, attributes, true ) // eslint-disable-line lumen/no-update-block-attributes
		setColumnsUpdate( Math.random() )
	}

	const defaultArrangement = range( numInnerBlocks ).map( i => ( i + 1 ).toString() ).join( ',' )
	const sortValues = deviceType === 'Desktop' ? defaultArrangement
		: deviceType === 'Tablet' ? ( attributes.columnArrangementTablet || defaultArrangement )
			: ( attributes.columnArrangementMobile || defaultArrangement )

	const presetMarks = usePresetControls( 'spacingSizes' )
		?.getPresetMarks( { addNonePreset: true } ) || null
	return (
		<>
			{ props.hasColumnsControl && <ColumnsControl /> }
			{ numInnerBlocks > 1 && deviceType === 'Desktop' &&
				<AdvancedToggleControl
					label={ __( 'Allow Column Wrapping', i18n ) }
					attribute="columnWrapDesktop"
				/>
			}
			{ numInnerBlocks > 1 && deviceType !== 'Tablet' && deviceType !== 'Mobile' && ! attributes.columnWrapDesktop &&
				<ColumnsWidthControl
					columns={ numInnerBlocks }
					values={ columnWidths }
					hasTabletValue={ hasTabletColumnWidths }
					hasMobileValue={ hasMobileColumnWidths }
					responsive="all"
					onChange={ columnWidths => {
						const clientIds = []
						const attributes = {}
						const columnWidthName = getAttributeName( 'columnWidth', deviceType )
						const columnAdjacentCount = getAttributeName( 'columnAdjacentCount', deviceType )
						if ( hasMultiSelectedBlocks ) {
							Object.values( multiInnerBlocks ).forEach( innerBlocks => {
								innerBlocks.forEach( ( block, i ) => {
									clientIds.push( block.clientId )
									attributes[ block.clientId ] = {
										[ columnWidthName ]: columnWidths[ i ],
										[ columnAdjacentCount ]: columnWidths.length,
									}
								} )
							} )
						} else {
							innerBlocks.forEach( ( block, i ) => {
								clientIds.push( block.clientId )
								attributes[ block.clientId ] = {
									[ columnWidthName ]: columnWidths[ i ],
									[ columnAdjacentCount ]: columnWidths.length,
								}
							} )
						}
						dispatch( 'core/block-editor' ).updateBlockAttributes( clientIds, attributes, true ) // eslint-disable-line lumen/no-update-block-attributes
						setColumnsUpdate( Math.random() )
					} }
				/>
			}
			{ numInnerBlocks > 1 && ( deviceType === 'Tablet' || deviceType === 'Mobile' || attributes.columnWrapDesktop ) &&
				<ColumnsWidthMultiControl
					columns={ numInnerBlocks }
					values={ currentColumnWidths }
					responsive="all"
					hasTabletValue={ hasTabletColumnWidths }
					hasMobileValue={ hasMobileColumnWidths }
					// A mobile column fills the row unless told otherwise, but
					// only a percentage can say "fills the row".
					placeholders={ deviceType === 'Mobile'
						? columnWidthUnits.map( unit => ( ( unit || '%' ) === '%' ? '100' : '' ) )
						: columnWidths }
					allowReset={ true }
					// `custom` is the odd one out: it means the author writes the
					// whole width, so a column can be `calc(100% - 200px)` — the
					// rest of what is left beside a fixed one.
					units={ [ '%', 'px', 'rem', 'em', 'custom' ] }
					unit={ columnWidthUnits }
					onChangeUnit={ ( unit, index ) => {
						const unitName = getAttributeName( 'columnWidthUnit', deviceType )
						const columnAdjacentCount = getAttributeName( 'columnAdjacentCount', deviceType )

						// One column leaving percentages changes what the row
						// adds up to, so the counts are recomputed for all of
						// them, not just for the column that was changed.
						const newUnits = [ ...columnWidthUnits ]
						newUnits[ index ] = unit
						const adjacentCounts = getAdjacentCounts( currentColumnWidths, newUnits )

						updateColumnAttributes( i => ( {
							[ columnAdjacentCount ]: adjacentCounts[ i ],
							// '%' is stored as empty, so a column that has never
							// left percentages keeps writing exactly the CSS it
							// wrote before units existed.
							...( i === index ? { [ unitName ]: unit === '%' ? '' : unit } : {} ),
						} ) )
					} }
					onChange={ columnWidths => {
						const columnWidthName = getAttributeName( 'columnWidth', deviceType )
						const columnAdjacentCount = getAttributeName( 'columnAdjacentCount', deviceType )
						const adjacentCounts = getAdjacentCounts( columnWidths, columnWidthUnits )

						updateColumnAttributes( i => ( {
							[ columnWidthName ]: columnWidths[ i ],
							[ columnAdjacentCount ]: adjacentCounts[ i ],
						} ) )
					} }
				/>
			}
			{ numInnerBlocks > 1 && (
				<SortControl
					responsive="all"
					attribute="columnArrangement"
					axis={ deviceType !== 'Mobile' ? 'x' : 'y' }
					values={ sortValues }
					num={ numInnerBlocks }
					allowReset={ true }
					onChange={ ( value, { oldIndex, newIndex } ) => {
						if ( deviceType !== 'Tablet' && deviceType !== 'Mobile' ) {
							if ( hasMultiSelectedBlocks ) {
								for ( const multiClientId in multiInnerBlocks ) {
									dispatch( 'core/block-editor' ).moveBlockToPosition(
										multiInnerBlocks[ multiClientId ][ oldIndex ].clientId,
										multiClientId,
										multiClientId,
										newIndex,
									)
								}
							} else {
								dispatch( 'core/block-editor' ).moveBlockToPosition(
									innerBlocks[ oldIndex ].clientId,
									clientId,
									clientId,
									newIndex,
								)
							}
						} else {
							const attrName = getAttributeName( 'columnArrangement', deviceType )
							setAttributes( { [ attrName ]: ( value || [] ).join( ',' ) } )
						}
					} }
				/>
			) }
			<ControlSeparator />
			{ props.hasGap && (
				<>
					<AdvancedRangeControl
						label={ __( 'Inner Column Spacing', i18n ) }
						attribute="columnSpacing"
						responsive="all"
						units={ [ 'px', 'em', 'vw', 'custom' ] }
						defaultLocked={ true }
						min={ [ 0, 0 ] }
						sliderMax={ [ 200, 30 ] }
						placeholder={ numInnerBlocks === 1 ? '0' : getPlaceholder( 'column-margin' ) }
						visualGuide={ {
							selector: '.lmn-%s-column > * > * > [data-type="lumen/column"] > * > .lmn-column > .lmn-inner-blocks',
							highlight: 'column-spacing',
							defaultValue: '12px',
						} }
						// TODO: Sample of how to use the new helpTooltip
						helpTooltip={ {
							// Add a working video
							description: __( 'Sets column paddings, the space inside the block between the block elements and the column container border', i18n ),
						} }
						marks={ presetMarks }
					/>
					<AdvancedRangeControl
						label={ __( 'Column Gap', i18n ) }
						attribute="columnGap"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder={ getPlaceholder( 'columns-column-gap' ) }
						visualGuide={ {
							selector: '.lmn-%s-column > * > *',
							highlight: 'columns:column-gap',
							responsive: [ 'desktop' ],
						} }
						helpTooltip={ {
							video: 'column-gap',
							description: __( 'Sets the distance between two or more columns', i18n ),
						} }
						marks={ presetMarks }
					/>
					<AdvancedRangeControl
						label={ __( 'Row Gap', i18n ) }
						attribute="rowGap"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder={ getPlaceholder( 'columns-row-gap' ) }
						helpTooltip={ {
							// TODO: Add a working video
							description: __( 'Sets the distance between two or more columns', i18n ),
						} }
						marks={ presetMarks }
					/>
				</>
			) }
		</>
	)
}

export const Edit = props => {
	return (
		<InspectorLayoutControls>
			<Controls { ...props } />
		</InspectorLayoutControls>
	)
}

Edit.defaultProps = {
	hasColumnsControl: true,
	hasGap: true,
}

Edit.Controls = Controls
