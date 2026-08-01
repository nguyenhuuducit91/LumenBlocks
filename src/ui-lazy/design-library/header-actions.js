/**
 * External deprendencies
 */
import { i18n, devMode } from 'lumen'
import { AdvancedToolbarControl, Button } from '~lumen/ui'

/**
 * WordPress deprendencies
 */
import { ToggleControl } from '@wordpress/components'

import { __ } from '@wordpress/i18n'

/*
 * Kept as a single entry: the library is whatever the configured CDN serves,
 * and there is no tier to filter it by. The shape stays so the query the list
 * sends is unchanged.
 */
export const PLAN_OPTIONS = [ { key: '', label: __( 'All', i18n ) } ]

export const HeaderActions = props => {
	const {
		selectedTab,
		setSelectedTab,
		setDoReset,
		onClose,
	} = props
	return <>
		{ /* DEV NOTE: hide for now */ }
		<AdvancedToolbarControl
			className="lmn-design-library-tabs"
			fullwidth={ false }
			controls={ [
				{
					value: 'patterns',
					title: __( 'Patterns', i18n ),
				},
				{
					value: 'pages',
					title: __( 'Pages', i18n ),
				},
			] }
			value={ selectedTab }
			onChange={ setSelectedTab }
			isToggleOnly={ true }
			allowReset={ false }
		/>

		<div className="lmn-design-library__header-settings">
			{ devMode && (
				<ToggleControl
					label="Dev Mode"
					checked={ !! localStorage.getItem( 'lmn__design_library__dev_mode' ) || false }
					onChange={ value => {
						localStorage.setItem( 'lmn__design_library__dev_mode', value ? '1' : '' )
						setTimeout( () => {
							document?.querySelector( '.lmb-insert-library-button__wrapper .lmb-insert-library-button' )?.click()
						}, 100 )
						onClose()
					} }
					__nextHasNoMarginBottom
				/>
			) }
			<Button
				icon="image-rotate"
				iconSize={ 14 }
				label={ __( 'Refresh Library', i18n ) }
				className="lmb-modal-design-library__refresh"
				onClick={ () => setDoReset( true ) }
			/>
		</div>
	</>
}
