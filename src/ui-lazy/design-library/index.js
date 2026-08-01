/**
 * Internal deprendencies
 */
import HelpSVG from './images/help.svg'
import BlockList from './block-list'
import { HeaderActions, PLAN_OPTIONS } from './header-actions'
import DesignLibraryList from './design-library-list'
import { DesignLibraryContext } from './context'

/**
 * External deprendencies
 */
import { i18n } from 'lumen'
import classnames from 'classnames'
import { useLocalStorage } from '~lumen/utils'
import { useBlockColorSchemes } from '~lumen/hooks'
import {
	GuidedModalTour, Button, ColorSchemePreview, ColorSchemesHelp, Tooltip,
} from '~lumen/ui'
import { getDesigns, filterDesigns } from '~lumen/design-library'

/**
 * WordPress deprendencies
 */
import {
	BaseControl,
	Dropdown,
	Modal,
	Spinner,
	ToggleControl,
} from '@wordpress/components'
import {
	useEffect, useState, useCallback,
	useMemo,
} from '@wordpress/element'
import { sprintf, __ } from '@wordpress/i18n'

const popoverProps = {
	className: 'lmb-design-library__color-scheme-popover',
	placement: 'right-start',
	shift: true,
}

// Reset the local storage values for the design library block list.
// This is to make sure that the design library shows "all" at the start.
localStorage?.setItem( 'lmn__design_library__block-list__selected', '' )

const ModalDesignLibrary = props => {
	const {
		backgroundModeColorScheme, containerModeColorScheme, colorSchemesCollection,
	} = useBlockColorSchemes()
	const [ isBusy, setIsBusy ] = useState( true )
	const [ doReset, setDoReset ] = useState( false )

	const [ selectedDesignIds, setSelectedDesignIds ] = useState( [] )
	const [ selectedDesignData, setSelectedDesignData ] = useState( [] )

	const [ isMultiSelectBusy, setIsMultiSelectBusy ] = useState( false )

	const [ selectedTab, setSelectedTab ] = useLocalStorage( 'lmn__design_library__block-list__view_by', 'patterns' )
	const [ selectedCategory, setSelectedCategory ] = useLocalStorage( 'lmn__design_library__block-list__selected', '' )
	const [ selectedPlan, setSelectedPlan ] = useLocalStorage( 'lmn__design_library__view-plan', PLAN_OPTIONS[ 0 ] )

	// The sidebar designs are used to update the list of blocks in the sidebar.
	const [ sidebarDesigns, setSidebarDesigns ] = useState( [] )
	// The display designs are used to list the available designs the user can choose.
	const [ displayDesigns, setDisplayDesigns ] = useState( [] )

	const [ errors, setErrors ] = useState( null )

	const [ enableBackground, setEnableBackground ] = useState( false )
	const [ selectedContainerScheme, setSelectedContainerScheme ] = useState( '' )
	const [ selectedBackgroundScheme, setSelectedBackgroundScheme ] = useState( '' )

	// For version 4, the default tab is now 'patterns' and for category, we use '' instead of 'All'.
	// So we need to update the local storage values here.
	useEffect( () => {
		const version = window.localStorage.getItem( 'lmn__design_library__version' )
		if ( ! version ) {
			window.localStorage.setItem( 'lmn__design_library__version', 'v4' )
			setSelectedTab( 'patterns' )
			setSelectedCategory( '' )
		}
	}, [] )

	// Update the designs on the sidebar. (this will trigger the display designs update next)
	useEffect( () => {
		setIsBusy( true )
		setSidebarDesigns( [] )
		setErrors( null )

		getDesigns( {
			reset: doReset,
			type: selectedTab,
		} ).then( designs => {
			let _designs = designs

			if ( typeof designs === 'object' && designs.error ) {
				_designs = []
				setErrors( designs.error )
			}

			setSidebarDesigns( _designs )
			setSelectedCategory( '' )
		} ).finally( () => {
			setDoReset( false )
			setIsBusy( false )
		} )
	}, [ doReset, selectedTab ] )

	// This updates the displayed designs the user can pick.
	useEffect( () => {
		filterDesigns( {
			library: sidebarDesigns,
			category: selectedCategory,
			plan: selectedPlan.key,
		} ).then( designs => {
			setDisplayDesigns( designs )
		} )
	}, [ sidebarDesigns, selectedPlan, selectedCategory ] )

	const colorSchemeHelpCallback = () => {
		if ( selectedDesignIds.length ) {
			// eslint-disable-next-line no-alert
			const confirmClose = window.confirm( sprintf( __( 'You have one or more designs selected. Navigating to %s will close the Design Library and your current selection will be lost. Do you want to continue?', i18n ), __( 'Color Schemes', i18n ) ) )
			if ( ! confirmClose ) {
				return true
			}
		}
		props.onClose()
		return false
	}

	const addDesign = designs => {
		setIsMultiSelectBusy( true )
		const cb = () => setIsMultiSelectBusy( false )
		props.onSelect( designs, cb, selectedTab )
	}

	const onSelectDesign = useCallback( ( designId, category, parsedBlocks, blocksForSubstitution, selectedPreviewSize ) => {
		if ( selectedTab === 'pages' ) {
			const selectedDesign = [ {
				designId, category, designData: parsedBlocks, blocksForSubstitution, selectedPreviewSize,
			} ]
			addDesign( selectedDesign )

			return
		}

		// Use functional updates to avoid depending on current state values
		setSelectedDesignIds( currentSelectedDesigns => {
			const newSelectedDesigns = [ ...currentSelectedDesigns ]

			if ( newSelectedDesigns.includes( designId ) ) {
				const i = newSelectedDesigns.indexOf( designId )
				newSelectedDesigns.splice( i, 1 )
			} else {
				newSelectedDesigns.push( designId )
			}

			return newSelectedDesigns
		} )

		setSelectedDesignData( currentSelectedDesignData => {
			const newSelectedDesignData = [ ...currentSelectedDesignData ]

			if ( currentSelectedDesignData.some( design => design.designId === designId ) ) {
				const i = newSelectedDesignData.findIndex( design => design.designId === designId )
				newSelectedDesignData.splice( i, 1 )
			} else {
				newSelectedDesignData.push( {
					designId, category, designData: parsedBlocks, blocksForSubstitution, selectedPreviewSize,
				} )
			}

			return newSelectedDesignData
		} )
	}, [ selectedTab ] )

	const headerActions = useMemo( () => {
		return <HeaderActions
			selectedTab={ selectedTab }
			setSelectedTab={ setSelectedTab }
			selectedPlan={ selectedPlan }
			setSelectedPlan={ setSelectedPlan }
			setDoReset={ setDoReset }
			onClose={ props.onClose }
		/>
	}, [ selectedTab, selectedPlan, setSelectedTab, setSelectedPlan, setDoReset, props.onClose ] )

	// Memoize the context value to prevent unnecessary rerenders
	const contextValue = useMemo(
		() => [
			selectedTab,
			selectedDesignIds,
			selectedDesignData,
			onSelectDesign,
			isMultiSelectBusy,
			selectedContainerScheme,
			selectedBackgroundScheme,
			enableBackground,
		],
		[
			selectedTab,
			selectedDesignIds,
			selectedDesignData,
			onSelectDesign,
			isMultiSelectBusy,
			selectedContainerScheme,
			selectedBackgroundScheme,
			enableBackground,
		]
	)

	return (
		<Modal
			title={ __( 'Lumen Design Library', i18n ) }
			headerActions={ headerActions }
			className={ classnames( 'lmb-modal-design-library', 'lmb-modal-design-library--is-multiselect' ) }
			onRequestClose={ props.onClose }
		>
			<DesignLibraryContext.Provider value={ contextValue }>
				<div className={ classnames( 'lmb-modal-design-library__wrapper', { 'lmb-modal-design-library__full-pages': selectedTab === 'pages' } ) }>

					<GuidedModalTour tourId="design-library" />

					<aside className="lmb-modal-design-library__sidebar">
						<div className="lmb-modal-design-library__filters">
							<BlockList
								designs={ sidebarDesigns }
								viewBy={ selectedTab }
								plan={ selectedPlan.key }
								selected={ selectedCategory }
								onSelect={ id => setSelectedCategory( id ) }
								isBusy={ isBusy }
							/>
						</div>
						<div className="lmb-modal-design-library__style-options">
							<div>
								<h4>{ __( 'Style Options', i18n ) }</h4>
								<Tooltip className="lmb-modal-design-library__style-options-tooltip" placement="top" text={ <>
									{ __( 'Customize patterns using the options below.', i18n ) }
								</> }>
									<HelpSVG height="14px" width="14px" />
								</Tooltip>
							</div>
							{ selectedTab === 'patterns' && <ToggleControl
								className="lmb-modal-design-library__enable-background"
								label={ __( 'Section Background', i18n ) }
								checked={ enableBackground }
								onChange={ value => {
									setEnableBackground( value )
								} }
								__nextHasNoMarginBottom
							/> }
							<BaseControl
								label={ __( 'Background Scheme', i18n ) }
								className="lmb-modal-design-library__color-scheme-label lmb-modal-design-library__background-scheme"
								__nextHasNoMarginBottom
							>
								<Dropdown
									className="lmb-modal-design-library__color-scheme-dropdown"
									popoverProps={ popoverProps }
									focusOnMount="container"
									renderToggle={ ( { onToggle } ) => (
										<Button
											onClick={ onToggle }
											className="lmb-modal-design-library__lmn-color-scheme lmn-color-scheme__toggle"
										>
											{ selectedBackgroundScheme !== ''
												? <ColorSchemePreview isCollapsed={ true } colors={ colorSchemesCollection[ selectedBackgroundScheme || backgroundModeColorScheme ].normal } />
												: <ColorSchemeTextItem label={ __( 'Default', i18n ) } />
											}
										</Button>
									) }
									renderContent={ ( { onClose } ) => (
										<div>
											<div className="lmb-modal-design-library__lmn-color-scheme-list-header">
												<p> { __( 'Background Scheme', i18n ) }</p>
												<Button
													icon="no"
													className="lmb-modal-design-library__color-scheme-close-button"
													onClick={ () => {
														onClose()
													} }
												/>
											</div>
											<div className="lmb-modal-design-library__lmn-color-scheme-list">
												<Button
													className={ `lmb-modal-design-library__lmn-color-scheme${ selectedBackgroundScheme === '' ? ' lmn-color-scheme__selected' : '' }` }
													onClick={ () => {
														if ( ! enableBackground ) {
															setEnableBackground( true )
														}
														setSelectedBackgroundScheme( '' )
													} }
												>
													<span className="lmn-color-scheme-name lmn-color-scheme__none"> { __( 'Default', i18n ) } </span>
												</Button>
												{ Object.entries( colorSchemesCollection ).map( ( [ key, scheme ], i ) => {
													return <Button
														key={ i }
														className={ `lmb-modal-design-library__lmn-color-scheme${ selectedBackgroundScheme === key ? ' lmn-color-scheme__selected' : '' }` }
														onClick={ () => {
															if ( ! enableBackground ) {
																setEnableBackground( true )
															}
															setSelectedBackgroundScheme( key )
														} }
													>
														<ColorSchemePreview colors={ scheme.normal } isCollapsed={ true } />
														<span className="lmn-color-scheme-name"> { scheme.name }</span>
													</Button>
												} ) }
												{ Object.keys( colorSchemesCollection ).length
													? <ColorSchemesHelp customText="" callback={ colorSchemeHelpCallback } className="lmb-design-library__manage-scheme" />
													: <ColorSchemesHelp customText={ __( 'You do not have any color schemes.', i18n ) } callback={ colorSchemeHelpCallback } />
												}
											</div>
										</div>
									) }
								/>
							</BaseControl>
							<BaseControl
								label={ __( 'Container Scheme', i18n ) }
								className="lmb-modal-design-library__color-scheme-label"
								__nextHasNoMarginBottom
							>
								<Dropdown
									popoverProps={ popoverProps }
									focusOnMount="container"
									renderToggle={ ( { onToggle } ) => (
										<Button
											onClick={ onToggle }
											className="lmb-modal-design-library__lmn-color-scheme lmn-color-scheme__toggle"
										>
											{ selectedContainerScheme !== ''
												? <ColorSchemePreview isCollapsed={ true } colors={ colorSchemesCollection[ selectedContainerScheme || containerModeColorScheme ].normal } />
												: <ColorSchemeTextItem label={ __( 'Default', i18n ) } />
											}
										</Button>
									) }
									renderContent={ ( { onClose } ) => (
										<div>
											<div className="lmb-modal-design-library__lmn-color-scheme-list-header">
												<p> { __( 'Container Scheme', i18n ) }</p>
												<Button
													icon="no"
													onClick={ () => {
														onClose()
													} }
												/>
											</div>
											<div className="lmb-modal-design-library__lmn-color-scheme-list">
												<Button
													className={ `lmb-modal-design-library__lmn-color-scheme${ selectedContainerScheme === '' ? ' lmn-color-scheme__selected' : '' }` }
													onClick={ () => {
														setSelectedContainerScheme( '' )
													} }
												>
													<span className="lmn-color-scheme-name lmn-color-scheme__none"> { __( 'Default', i18n ) } </span>
												</Button>
												{ Object.entries( colorSchemesCollection ).map( ( [ key, scheme ], i ) => {
													return <Button
														key={ i }
														className={ `lmb-modal-design-library__lmn-color-scheme${ selectedContainerScheme === key ? ' lmn-color-scheme__selected' : '' }` }
														onClick={ () => {
															setSelectedContainerScheme( key )
														} }
													>
														<ColorSchemePreview colors={ scheme.normal } isCollapsed={ true } />
														<span className="lmn-color-scheme-name"> { scheme.name } </span>
													</Button>
												} ) }
												{ Object.keys( colorSchemesCollection ).length
													? <ColorSchemesHelp customText="" callback={ colorSchemeHelpCallback } className="lmb-design-library__manage-scheme" />
													: <ColorSchemesHelp customText={ __( 'You do not have any color schemes.', i18n ) } callback={ colorSchemeHelpCallback } />
												}
											</div>
										</div>
									) }
								/>
							</BaseControl>

						</div>
					</aside>

					<DesignLibraryList
						className={ `lmn-design-library__item-${ selectedTab }` }
						isBusy={ isBusy }
						designs={ displayDesigns }
						errors={ errors }
					/>

					{ selectedTab === 'patterns' && <aside className="lmb-modal-design-library__footer">
						<div>{ sprintf( __( `(%d) Selected`, i18n ), selectedDesignIds.length ) }</div>
						<Button
							label={ __( 'Add Designs', i18n ) }
							className="lmb-modal-design-library__add-multi"
							disabled={ ! selectedDesignIds.length || isMultiSelectBusy }
							onClick={ () => addDesign( selectedDesignData ) }
						>
							{ __( 'Add Designs', i18n ) }
							{ isMultiSelectBusy && <Spinner /> }
						</Button>
					</aside> }
				</div>
			</DesignLibraryContext.Provider>
		</Modal>
	)
}

ModalDesignLibrary.defaultProps = {
	search: '',
	onClose: () => {},
	onSelect: () => {},

	hasVersionSwitcher: false,
	apiVersion: '',
	onChangeApiVersion: () => {},
}

export default ModalDesignLibrary

const ColorSchemeTextItem = props => {
	return <div style={ { position: 'relative' } }>
		<div style={ { opacity: '0' } }><ColorSchemePreview isCollapsed={ true } /></div>
		<span className="lmn-color-scheme-name lmn-color-scheme__none"> { props.label } </span>
	</div>
}
