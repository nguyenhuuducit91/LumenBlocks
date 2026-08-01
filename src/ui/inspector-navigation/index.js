/**
 * Going to one particular setting.
 *
 * The applied-settings list knows an attribute name and nothing else. Getting
 * from that to the control an author can actually turn means answering four
 * questions in order: which tab is it on, which panel, where on screen, and —
 * for a value that belongs to a tablet or a hover state — which view has to be
 * showing for the control to hold that value at all.
 *
 * This used to be done by typing the setting's name into the search box. That
 * was guesswork: labels are worded for people rather than derived from
 * attribute names, one word can match a dozen controls, and the author was left
 * looking at a filtered panel rather than at their setting. Controls now carry
 * the attribute they edit in their class list, so the right one can simply be
 * looked up.
 */

/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data'

// How long the found control stays highlighted. Long enough to catch the eye
// after a scroll, short enough not to become part of the furniture.
const FLASH = 1600

// A tab needs about this long to mount its panels after being clicked.
const TAB_SETTLE = 220

/**
 * Suffixes that say which viewport or state a value belongs to.
 *
 * Longest first: `blockPaddingTabletHover` has to be recognised as tablet and
 * hover rather than as hover alone.
 */
const CONTEXTS = [
	{
		suffix: 'TabletHover', device: 'Tablet', state: 'hover',
	},
	{
		suffix: 'MobileHover', device: 'Mobile', state: 'hover',
	},
	{
		suffix: 'ParentHover', device: '', state: 'parent-hover',
	},
	{
		suffix: 'Collapsed', device: '', state: '',
	},
	{
		suffix: 'Tablet', device: 'Tablet', state: '',
	},
	{
		suffix: 'Mobile', device: 'Mobile', state: '',
	},
	{
		suffix: 'Hover', device: '', state: 'hover',
	},
]

/**
 * Splits an attribute name into the control that owns it and where it applies.
 *
 * @param {string} name Attribute name.
 * @return {{base: string, device: string, state: string}} The parts.
 */
export const readAttributeName = name => {
	const found = CONTEXTS.find( ( { suffix } ) => name.endsWith( suffix ) )

	return {
		base: found ? name.slice( 0, -found.suffix.length ) : name,
		/*
		 * A name with no viewport suffix is the desktop value. Saying so, rather
		 * than saying "no opinion", matters: an author who has just looked at a
		 * tablet setting and then clicks a desktop one would otherwise land on a
		 * control still showing the tablet value.
		 */
		device: found ? found.device : 'Desktop',
		state: found?.state || '',
	}
}

/**
 * The inspector element.
 *
 * @return {Element|null} Container.
 */
const getInspector = () => document.querySelector(
	'.block-editor-block-inspector, .edit-post-sidebar, .edit-widgets-sidebar'
)

/**
 * The tab strip's buttons, in the order they are shown.
 *
 * @return {Element[]} Buttons.
 */
const getTabButtons = () => Array.from(
	document.querySelectorAll( '.lmb-panel-tabs__wrapper > button' )
)

/**
 * Waits for the editor to catch up with a click.
 *
 * @param {number} ms How long.
 * @return {Promise} Resolves when the time is up.
 */
const settle = ms => new Promise( resolve => window.setTimeout( resolve, ms ) )

/**
 * The control that edits an attribute, if it is on screen.
 *
 * @param {string} base Attribute name, without any device or state suffix.
 * @return {Element|null} The control.
 */
const findControl = base => {
	const inspector = getInspector()
	const selector = `.lmn-control--attr-${ base }`

	return inspector ? inspector.querySelector( selector ) : null
}

/**
 * Opens every collapsed panel of the tab on screen.
 *
 * A control inside a collapsed panel is not in the page at all, so there is
 * nothing to find until the panels are open.
 */
const openPanels = () => {
	const inspector = getInspector()

	if ( ! inspector ) {
		return
	}

	Array.from( inspector.querySelectorAll( '.components-panel__body' ) )
		.filter( panel => ! panel.classList.contains( 'is-opened' ) )
		.forEach( panel => panel.querySelector( '.components-panel__body-toggle' )?.click() )
}

/**
 * Leaves only the panel holding the control open.
 *
 * Opening every panel to search through them leaves the sidebar in a worse
 * state than it started in, so everything that turned out not to hold the
 * answer is closed again.
 *
 * @param {Element} control The control that was found.
 */
const closeOtherPanels = control => {
	const inspector = getInspector()
	const keep = control.closest( '.components-panel__body' )

	Array.from( inspector?.querySelectorAll( '.components-panel__body' ) || [] )
		.filter( panel => panel !== keep &&
			panel.classList.contains( 'is-opened' ) &&
			! panel.classList.contains( 'lmb-panel-tabs' ) &&
			! panel.contains( keep ) )
		.forEach( panel => panel.querySelector( '.components-panel__body-toggle' )?.click() )
}

/**
 * Scrolls a control into view and marks it briefly.
 *
 * @param {Element} control The control.
 */
const reveal = control => {
	control.scrollIntoView( { block: 'center', behavior: 'smooth' } )
	control.classList.add( 'lmn-control--found' )

	window.setTimeout( () => control.classList.remove( 'lmn-control--found' ), FLASH )
}

/**
 * Switches the editor's preview width.
 *
 * A tablet value is not shown by a control that is displaying the desktop
 * value, so landing on the control without this would show the author the
 * wrong number and invite them to change the wrong one.
 *
 * @param {string} device 'Tablet', 'Mobile', or '' to leave it alone.
 */
const setDevice = device => {
	if ( ! device ) {
		return
	}

	const editor = dispatch( 'core/editor' )

	if ( editor?.setDeviceType ) {
		editor.setDeviceType( device )

		return
	}

	// Older editors kept the preview width in the post editor's own store.
	dispatch( 'core/edit-post' )?.__experimentalSetPreviewDeviceType?.( device )
}

/**
 * Whether the editor is already showing this device.
 *
 * @param {string} device Device name.
 * @return {boolean} Whether it matches.
 */
const isDevice = device => {
	const current = select( 'core/editor' )?.getDeviceType?.() ||
		select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.()

	return current === device
}

/**
 * Goes to the control that edits an attribute.
 *
 * Tries the tab on screen first, so a setting the author is already looking at
 * never moves them. Only then does it walk the other tabs, and a tab that turns
 * out not to have the control is closed back up before moving on.
 *
 * @param {string} attributeName The attribute, including any device or state suffix.
 * @return {Promise<boolean>} Whether the control was found.
 */
export const goToAttribute = async attributeName => {
	const { base, device } = readAttributeName( attributeName )

	// A hover-only attribute (`…Hover`) has no viewport of its own; leave the
	// preview where the author had it.
	if ( device && ! isDevice( device ) ) {
		setDevice( device )
		await settle( TAB_SETTLE )
	}

	const buttons = getTabButtons()
	const startedOn = buttons.find( button => button.classList.contains( 'is-active' ) )

	const tryHere = () => {
		let control = findControl( base )

		if ( ! control ) {
			openPanels()
			control = findControl( base )
		}

		return control
	}

	let control = tryHere()

	if ( control ) {
		closeOtherPanels( control )
		reveal( control )

		return true
	}

	for ( const button of buttons.filter( one => one !== startedOn ) ) {
		button.click()
		await settle( TAB_SETTLE )

		control = tryHere()

		if ( control ) {
			closeOtherPanels( control )
			reveal( control )

			return true
		}
	}

	// Nowhere to go. Put the author back where they were rather than leaving
	// them on whichever tab was tried last.
	if ( startedOn ) {
		startedOn.click()
		await settle( TAB_SETTLE )
	}

	return false
}
