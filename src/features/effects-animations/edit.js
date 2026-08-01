/**
 * Motion Effects.
 *
 * How a block arrives on the page. The panel already existed but held an
 * advertisement; these are the controls it was advertising.
 *
 * The list of effects is short on purpose. Twenty entrance animations is a menu
 * nobody reads to the end of, and the ones past the first few are the same
 * movement from a different corner. Every effect here ends at the block's real
 * position — one that leaves a block offset from where it belongs is a layout
 * bug waiting to be reported.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	AdvancedRangeControl,
	AdvancedSelectControl,
	AdvancedToggleControl,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { useAttributeEditHandlers } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

const ENTRANCES = [
	{ value: '', label: __( 'None', i18n ) },
	{ value: 'fade-in', label: __( 'Fade in', i18n ) },
	{ value: 'fade-up', label: __( 'Fade up', i18n ) },
	{ value: 'fade-down', label: __( 'Fade down', i18n ) },
	{ value: 'fade-left', label: __( 'Fade in from the right', i18n ) },
	{ value: 'fade-right', label: __( 'Fade in from the left', i18n ) },
	{ value: 'zoom-in', label: __( 'Zoom in', i18n ) },
	{ value: 'zoom-out', label: __( 'Zoom out', i18n ) },
	{ value: 'flip-up', label: __( 'Flip up', i18n ) },
	{ value: 'flip-left', label: __( 'Flip sideways', i18n ) },
	{ value: 'rise', label: __( 'Rise', i18n ) },
]

export const Edit = props => {
	const { getAttribute } = useAttributeEditHandlers()

	const hasEffect = !! getAttribute( 'effectEntrance' )

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Motion Effects', i18n ) }
					id="effects-animations"
					showModifiedIndicator={ hasEffect }
				>
					<AdvancedSelectControl
						label={ __( 'Entrance', i18n ) }
						options={ ENTRANCES }
						attribute="effectEntrance"
						responsive="all"
						help={ __(
							'Plays once, when the block is first scrolled to. Set it per device — a phone can skip the movement.',
							i18n
						) }
					/>

					{ hasEffect && (
						<Fragment>
							<AdvancedRangeControl
								label={ __( 'Duration', i18n ) }
								attribute="effectEntranceDuration"
								min={ 0.1 }
								max={ 3 }
								step={ 0.1 }
								allowReset={ true }
								placeholder="0.7"
								help={ __( 'Seconds.', i18n ) }
							/>

							<AdvancedRangeControl
								label={ __( 'Delay', i18n ) }
								attribute="effectEntranceDelay"
								min={ 0 }
								max={ 2 }
								step={ 0.1 }
								allowReset={ true }
								placeholder="0"
								help={ __(
									'Seconds to wait before it starts. Give the blocks in a row different delays and they arrive one after another.',
									i18n
								) }
							/>

							<AdvancedToggleControl
								label={ __( 'Smooth', i18n ) }
								attribute="effectAnimationSmooth"
								help={ __( 'Eases out of the movement instead of stopping at it.', i18n ) }
							/>

							<p className="components-base-control__help">
								{ __(
									'The effect runs on the published page, not while you edit. Readers whose system asks for reduced motion see the block straight away.',
									i18n
								) }
							</p>
						</Fragment>
					) }

					{ applyFilters( 'lumen.block-component.effects-animations.control', null, {
						mainBlockClass: props.mainBlockClass,
					} ) }
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}

Edit.defaultProps = {
	mainBlockClass: '',
}
