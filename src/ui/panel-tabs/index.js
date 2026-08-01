/**
 * Internal dependencies
 */
import './browser-fallback'

/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n, settings } from 'lumen'
import { applyFilters } from '@wordpress/hooks'
import { Icon } from '@wordpress/components'

const TABS = [
	{
		value: 'layout',
		title: __( 'Layout', i18n ),
		label: __( 'Layout Tab', i18n ),
		icon: 'align-left',
	},
	{
		value: 'style',
		title: __( 'Style', i18n ),
		label: __( 'Style Tab', i18n ),
		icon: 'admin-appearance',
	},
	{
		value: 'advanced',
		title: __( 'Advanced', i18n ),
		label: __( 'Advanced Tab', i18n ),
		icon: 'admin-generic',
	},
]

const DEFAULT_TABS = [ 'layout', 'style', 'advanced' ]

export const closeAllOpenPanels = clickedEl => {
	[].forEach.call( document.querySelector( '.edit-post-sidebar, .edit-widgets-sidebar, .block-editor-block-inspector' )?.querySelectorAll( '.components-panel__body .components-panel__body-toggle.lmn-panel' ) || [], el => {
		if ( el.offsetHeight === 0 ) {
			return
		}
		if ( el.parentElement.parentElement.classList.contains( 'is-opened' ) ) {
			if ( clickedEl !== el ) {
				// Allow other panels to override the auto-closing behavior.
				if ( applyFilters( 'lumen.panel.tabs.panel-auto-close', true, el ) ) {
					el.click()
				}
			}
		}
	} )
}

class PanelTabs extends Component {
	constructor() {
		super( ...arguments )

		this.tabsToUse = this.props.tabs || DEFAULT_TABS

		this.state = {
			activeTab: this.props.initialTab ? this.props.initialTab : this.tabsToUse[ 0 ],
		}

		this.onButtonPanelClick = this.onButtonPanelClick.bind( this )
		this.updateSidebarPanelTab = this.updateSidebarPanelTab.bind( this )
		this.select = this.select.bind( this )
		this.onKeyDown = this.onKeyDown.bind( this )
		this.containerDiv = createRef()

		// Auto-closing panels also re-triggers click listeners, this flag prevents that.
		this.suspendClickListener = false

		this.props.onTabFirstOpen( this.state.activeTab )
	}

	updateSidebarPanelTab( tab ) {
		const sidebarPanel = this.containerDiv.current.closest( '.components-panel' )
		if ( sidebarPanel ) {
			setTimeout( () => {
				if ( sidebarPanel ) {
					sidebarPanel.setAttribute( 'data-lmb-tab', tab )
					sidebarPanel.closest( '.edit-post-sidebar, .edit-widgets-sidebar, .interface-complementary-area' )?.classList.add( 'lmb--has-panel-tabs' )
				}
			}, 1 )
		}
	}

	componentDidMount() {
		this.updateSidebarPanelTab( this.state.activeTab )

		// Listen to panel closes
		if ( this.props.closeOtherPanels && settings.lumen_auto_collapse_panels ) {
			document.body.addEventListener( 'click', this.onButtonPanelClick )
		}
	}

	componentWillUnmount() {
		const sidebarPanel = document.querySelector( '[data-lmb-tab]' )
		if ( sidebarPanel ) {
			sidebarPanel.removeAttribute( 'data-lmb-tab' )
			sidebarPanel.closest( '.edit-post-sidebar, .edit-widgets-sidebar, .interface-complementary-area' ).classList.remove( 'lmb--has-panel-tabs' )
		}

		// Remove listener to panel closes
		if ( this.props.closeOtherPanels && settings.lumen_auto_collapse_panels ) {
			document.body.removeEventListener( 'click', this.onButtonPanelClick )
		}
	}

	onButtonPanelClick( ev ) {
		const toggle = ev.target.closest( '.components-panel__body-toggle.lmn-panel' )
		if ( ! toggle ) {
			return
		}

		// Allow other panels to override the auto-closing behavior.
		if ( ! applyFilters( 'lumen.panel.tabs.panel-auto-close', true, toggle ) ) {
			return
		}

		// Prevent re-triggering of this click listener when closing other panels below.
		if ( this.suspendClickListener ) {
			return
		}
		this.suspendClickListener = true

		closeAllOpenPanels( toggle )

		// Resume click handler.
		this.suspendClickListener = false
	}

	select( tab ) {
		this.setState( { activeTab: tab } )
		this.updateSidebarPanelTab( tab )
		this.props.onClick( tab )
	}

	// Left/right arrows move between tabs, matching how tab strips behave
	// elsewhere in the editor.
	onKeyDown( ev ) {
		if ( ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' ) {
			return
		}

		const buttons = Array.from( ev.currentTarget.parentElement.children )
		const index = buttons.indexOf( ev.currentTarget )
		if ( index === -1 ) {
			return
		}

		ev.preventDefault()
		const offset = ev.key === 'ArrowRight' ? 1 : -1
		const next = buttons[ ( index + offset + buttons.length ) % buttons.length ]
		next.focus()
		next.click()
	}

	render() {
		const classNames = classnames( [
			this.props.className,
			'components-panel__body',
			'lmb-panel-tabs',
		] )
		return (
			<div
				className={ classNames }
				style={ this.props.style }
				ref={ this.containerDiv }
			>
				<div className="lmb-panel-tabs__wrapper">
					{ applyFilters( 'lumen.inspector.tabs', TABS ).map( ( {
						value, title, label, icon,
					}, i ) => {
						if ( ! this.tabsToUse.includes( value ) ) {
							return null
						}
						return (
							<button
								key={ i }
								type="button"
								onClick={ () => this.select( value ) }
								onKeyDown={ this.onKeyDown }
								className={ classnames(
									[
										'edit-post-sidebar__panel-tab',
										`lmb-tab--${ value }`,
									],
									{
										'is-active': this.state.activeTab === value,
									}
								) }
								aria-label={ label }
								// The label is visually hidden in narrow sidebars.
								title={ title }
								aria-current={ this.state.activeTab === value ? 'true' : undefined }
								data-label={ label }
							>
								<Icon icon={ icon } />
								{ title }
							</button>
						)
					} ) }
				</div>

			</div>
		)
	}
}

PanelTabs.defaultProps = {
	className: '',
	style: {},
	closeOtherPanels: true,
	initialTab: '',
	onClickPanel: () => {},
	onClick: () => {},
	tabs: null,
	onTabFirstOpen: () => {},
}

export default PanelTabs
