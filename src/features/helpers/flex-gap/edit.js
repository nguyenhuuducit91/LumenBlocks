/**
 * External dependencies
 */
import { i18n } from 'lumen'
import { AdvancedRangeControl } from '~lumen/ui'
import { useBlockLayoutDefaults } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export const FlexGapControls = props => {
	const { placeholderTemplate = undefined } = props
	const { getPlaceholder } = useBlockLayoutDefaults()

	return (
		<>
			<AdvancedRangeControl
				label={ __( 'Column Gap', i18n ) }
				attribute="columnGap"
				responsive="all"
				min="0"
				sliderMax="50"
				placeholder={ placeholderTemplate ? getPlaceholder( `${ placeholderTemplate }-column-gap` ) : '' }
			/>
			<AdvancedRangeControl
				label={ __( 'Row Gap', i18n ) }
				attribute="rowGap"
				responsive="all"
				min="0"
				sliderMax="50"
				placeholder={ placeholderTemplate ? getPlaceholder( `${ placeholderTemplate }-row-gap` ) : '' }
			/>
		</>
	)
}
