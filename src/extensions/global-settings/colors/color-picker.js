/**
 * Internal dependencies
 */
import {
	getRgb,
	createColor,
	convertGlobalColorBlockAttributesToStatic,
} from './util'

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash'
import { i18n } from 'lumen'
import { SortablePicker } from '~lumen/ui'

import { useRef } from '@wordpress/element'
import {
	select, dispatch, useSelect,
} from '@wordpress/data'
import { models } from '@wordpress/api'
import { __, sprintf } from '@wordpress/i18n'
import { ColorIndicator, ColorPicker } from '@wordpress/components'

let saveTimeout = null

const ItemPickerColor = ( { item, onChange } ) => {
	return <div className="lmn-color-palette-control__popover-content">
		<ColorPicker
			onChange={ value => onChange( {
				...item,
				color: value,
			} ) }
			color={ item.color }
			enableAlpha={ true }
		/>
	</div>
}

const ColorPickers = props => {
	const ref = useRef()
	const {
		colors,
	} = useSelect( select => {
		const lmnSettings = select( 'lumen/global-colors' ).getSettings()
		return {
			colors: cloneDeep( lmnSettings.lumenColors ),
		}
	} )

	/**
	 * Function used to update the colors in @wordpress/data,
	 *
	 * @param {Array} newColors colors passed.
	 */
	const updateColors = newColors => {
		// NOTE: Removed this because it is slow to update all blocks.
		// Update the blocks in our page.
		// updateFallbackBlockAttributes( newColors )

		// Save settings.
		clearTimeout( saveTimeout )
		saveTimeout = setTimeout( () => {
			const settings = new models.Settings( { lumen_global_colors: [ newColors ] } ) // eslint-disable-line camelcase
			settings.save()
		}, 300 )

		// Update our store.
		dispatch( 'lumen/global-colors' ).updateSettings( {
			lumenColors: newColors,
		} )
	}

	// Called when updating a color.
	const onChangeColor = color => {
		const updatedColors = cloneDeep( colors )

		const selectedIndex = colors.findIndex( c => c.slug === color.slug )
		updatedColors[ selectedIndex ] = { ...color }

		// Update the colors.
		updateColors( updatedColors )
	}

	// Called when deleting a color.
	const onColorDelete = color => {
		// Open a confirm box
		// eslint-disable-next-line no-alert
		const confirmDelete = window.confirm( __( 'Any blocks that use this color will become unlinked with this global color. Delete this color?', i18n ) )
		if ( ! confirmDelete ) {
			return
		}

		const selectedIndex = colors.findIndex( c => c.slug === color.slug )
		const updatedColors = cloneDeep( colors )

		// Delete the specific color based on the selected index.
		updatedColors.splice( selectedIndex, 1 )

		// Revert the global color attributes to hex color.
		convertGlobalColorBlockAttributesToStatic( [ colors[ selectedIndex ] ] )

		// Update the colors.
		updateColors( updatedColors )
	}

	// Called when adding a new color.
	const handleAddIcon = () => {
		const newIndex = ( colors && Array.isArray( colors ) ) ? colors.length + 1 : 1
		const slugId = Math.floor( Math.random() * new Date().getTime() ) % 100000
		const color = createColor()

		const updatedColors = [
			...select( 'lumen/global-colors' ).getSettings().lumenColors,
			{
				name: sprintf( __( 'Custom Color %s', i18n ), newIndex ),
				slug: `lmn-global-color-${ slugId }`,
				color,
				rgb: getRgb( color ),
			},
		]

		// Update the colors.
		updateColors( updatedColors )

		// Open the new color picker.
		setTimeout( () => {
			ref.current?.querySelector( '.lmn-global-settings-color-picker__color-indicator-wrapper:last-child .block-editor-panel-color-gradient-settings__dropdown' )?.click()
		}, 1 )
	}

	const onSortEnd = ( {
		oldIndex, newIndex, setIsSorting,
	} ) => {
		const updatedColors = cloneDeep( colors )
		// Move the color to the new index.
		updatedColors.splice( newIndex, 0, updatedColors.splice( oldIndex, 1 )[ 0 ] )

		updateColors( updatedColors )
		setIsSorting( false )
	}

	const ItemPreview = ( { item } ) => {
		return <ColorIndicator
			className="lmn-color-indicator block-editor-panel-color-gradient-settings__color-indicator"
			colorValue={ item.color }
		/>
	}

	return (
		<SortablePicker
			ref={ ref }
			items={ colors }
			itemType="color"
			onChangeItem={ onChangeColor }
			onDeleteItem={ onColorDelete }
			handleAddItem={ handleAddIcon }
			onSortEnd={ onSortEnd }
			ItemPreview={ ItemPreview }
			ItemPicker={ ItemPickerColor }
			{ ...props }
		/>
	)
}

ColorPickers.defaultProps = {
	className: '',
	label: '',
	onReset: () => {},
}

export default ColorPickers
