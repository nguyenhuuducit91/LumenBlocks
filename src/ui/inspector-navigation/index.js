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
import { addFilter } from '@wordpress/hooks'

// How long the found control stays highlighted. Long enough to catch the eye
// after a scroll, short enough not to become part of the furniture.
const FLASH = 1600

// A tab needs about this long to mount its panels after being clicked.
const TAB_SETTLE = 220

/*
 * Changing the preview width takes longer than changing tabs: the canvas
 * resizes and the inspector re-renders around the new device, which replaces
 * the very control being looked for. Waiting less meant landing on a node that
 * was about to be thrown away.
 */
const DEVICE_SETTLE = 450

// Long enough for a panel to render its contents after being opened.
const PANEL_SETTLE = 120

// The timer that will take the highlight off each control, so a second jump to
// the same one can cancel the first one's.
const pendingFlash = new WeakMap()

// When to look again in case the control was re-rendered out from under us.
const RE_CHECKS = [ 120, 420 ]

/*
 * The inspector is an accordion: opening a panel closes the others. Getting to
 * a setting means opening panels to look inside them, and every one of those
 * closed something else — including the applied-settings list the author had
 * just clicked a row in. This suspends that behaviour for exactly as long as a
 * jump is in progress, using the filter the panels already offer.
 */
let navigating = false

addFilter(
	'lumen.panel.tabs.panel-auto-close',
	'lumen/inspector-navigation',
	autoClose => ( navigating ? false : autoClose )
)

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

	if ( ! inspector ) {
		return null
	}

	const selector = `.lmn-control--attr-${ base }`
	const matches = Array.from( inspector.querySelectorAll( selector ) )

	/*
	 * The one that is actually on screen.
	 *
	 * An attribute can be rendered more than once — Gutenberg's own Advanced
	 * panel sits in the markup of every tab and is hidden by the tab
	 * stylesheet, and some features render a control per device. Taking the
	 * first match meant highlighting something invisible and scrolling to
	 * nothing, and there was no field to focus because none of it was laid out.
	 */
	return matches.find( control => control.getClientRects().length ) || null
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
			// The list the author just clicked a row in. Closing it would mean
			// reopening it to reach the next row, and it now sits above the tab
			// strip precisely so it stays within reach.
			! panel.querySelector( '.lmn-block-changes' ) &&
			! panel.contains( keep ) )
		.forEach( panel => panel.querySelector( '.components-panel__body-toggle' )?.click() )
}

/**
 * The field inside a control that an author would actually type in.
 *
 * Not simply the first focusable thing: a control's label row carries the
 * responsive and hover toggles and sometimes a reset button, all of which come
 * first in the markup. Landing on one of those would put the caret on a switch
 * rather than on the value, and the next keystroke would change the wrong
 * thing. Anything hidden is skipped too — a control can render a field for a
 * device that is not the one being shown.
 *
 * @param {Element} control The control.
 * @return {Element|null} What to focus.
 */
const firstField = control => {
	const candidates = Array.from( control.querySelectorAll(
		'input, select, textarea, [contenteditable="true"], button, [tabindex]'
	) ).filter( element => {
		if ( element.disabled || element.getAttribute( 'tabindex' ) === '-1' ) {
			return false
		}

		/*
		 * Client rects rather than offsetParent. The sidebar is positioned, and
		 * offsetParent is null for every descendant of a positioned ancestor —
		 * so that test called the whole inspector invisible and focused nothing
		 * at all. getClientRects is empty only for what is really not laid out,
		 * which is how the controls for the other devices sit in the page.
		 */
		if ( ! element.getClientRects().length ) {
			return false
		}

		return ! element.closest( '.lmn-control-label' )
	} )

	// A value first; a button only if the control has no field of its own,
	// which is how colour pickers and icon choosers are built.
	return candidates.find( element => /^(INPUT|SELECT|TEXTAREA)$/.test( element.tagName ) ) ||
		candidates[ 0 ] ||
		null
}

/**
 * Scrolls a control into view, focuses it and marks it briefly.
 *
 * @param {Element} control The control.
 * @param {string}  base    The attribute it edits, so it can be found again.
 */
const reveal = ( control, base ) => {
	control.scrollIntoView( { block: 'center', behavior: 'smooth' } )

	/*
	 * Focus goes to the field, not just the eye. The point of the jump is to
	 * change the value, and an author who has to click the box after being
	 * taken to it has been shown the setting rather than handed it.
	 * `preventScroll` keeps the browser from cancelling the smooth scroll above
	 * with a jump of its own.
	 */
	firstField( control )?.focus( { preventScroll: true } )

	/*
	 * Clearing the previous timer matters when the same control is asked for
	 * twice in a row — a desktop value and its tablet one live on one control,
	 * so that is the common case, not a corner. Without this the first jump's
	 * timer fires part-way through the second and takes the highlight with it.
	 */
	window.clearTimeout( pendingFlash.get( control ) )
	control.classList.add( 'lmn-control--found' )
	pendingFlash.set( control, window.setTimeout( () => {
		control.classList.remove( 'lmn-control--found' )
		pendingFlash.delete( control )
	}, FLASH ) )

	/*
	 * A re-render just after arriving replaces the node and takes both the
	 * highlight and the focus with it, leaving the author looking at a sidebar
	 * that scrolled for no visible reason. Checked twice because a change of
	 * preview width re-renders more than once: the canvas resizes, then the
	 * controls redraw for the new device.
	 */
	RE_CHECKS.forEach( delay => window.setTimeout( () => {
		const current = findControl( base )

		if ( current && current !== control && ! current.classList.contains( 'lmn-control--found' ) ) {
			reveal( current, base )
		}
	}, delay ) )
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
 * The panel whose header toggle switches an attribute on and off.
 *
 * A handful of settings are not controls at all: "Show Top Line", "Container",
 * "Background" and their kin are switches in a panel's title bar. There is
 * nothing in the panel body to scroll to, so the target is the switch itself.
 *
 * @param {string} base Attribute name.
 * @return {Element|null} The panel.
 */
const findTogglePanel = base => {
	const inspector = getInspector()

	if ( ! inspector ) {
		return null
	}

	const selector = `.lmn-panel--attr-${ base }`
	const matches = Array.from( inspector.querySelectorAll( selector ) )

	return matches.find( panel => panel.getClientRects().length ) || null
}

/**
 * Takes the author to a panel's header switch.
 *
 * The switch is marked rather than the panel body: the body may be collapsed,
 * and what was asked for is the switch.
 *
 * @param {Element} panel The panel.
 */
const revealToggle = panel => {
	const title = panel.querySelector( '.components-panel__body-title' )
	/*
	 * The checkbox, not its wrapper.
	 *
	 * A comma in querySelector does not mean "prefer the first one I wrote" —
	 * it returns whichever matches first in the document, and the wrapping span
	 * comes before the input it wraps. Focusing a span does nothing at all,
	 * which is exactly what happened.
	 */
	const toggle = panel.querySelector( '.lmb-toggle-panel-form-toggle input' ) ||
		panel.querySelector( '.components-panel__body-toggle' )

	panel.scrollIntoView( { block: 'center', behavior: 'smooth' } )

	if ( toggle && toggle.focus ) {
		toggle.focus( { preventScroll: true } )
	}

	const mark = title || panel

	window.clearTimeout( pendingFlash.get( mark ) )
	mark.classList.add( 'lmn-control--found' )
	pendingFlash.set( mark, window.setTimeout( () => {
		mark.classList.remove( 'lmn-control--found' )
		pendingFlash.delete( mark )
	}, FLASH ) )
}

/**
 * Reveals whichever of the two kinds of target was found.
 *
 * @param {Element} target A control, or a panel whose header switch it is.
 * @param {string}  base   The attribute.
 */
const revealFound = ( target, base ) => {
	if ( target.classList.contains( 'components-panel__body' ) ) {
		revealToggle( target )

		return
	}

	reveal( target, base )
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

	navigating = true

	try {
		return await find( base, device )
	} finally {
		navigating = false
	}
}

/**
 * Does the looking, with the accordion suspended around it.
 *
 * @param {string} base   Attribute name, without any device or state suffix.
 * @param {string} device Which viewport the value belongs to.
 * @return {Promise<boolean>} Whether the control was found.
 */
const find = async ( base, device ) => {
	// A hover-only attribute (`…Hover`) has no viewport of its own; leave the
	// preview where the author had it.
	if ( device && ! isDevice( device ) ) {
		setDevice( device )
		await settle( DEVICE_SETTLE )
	}

	const buttons = getTabButtons()
	const startedOn = buttons.find( button => button.classList.contains( 'is-active' ) )

	/*
	 * Opening a panel is a React state change, so its contents are not in the
	 * page until the next render. Looking in the same tick found nothing and
	 * sent the search off to the next tab for a control that was about to
	 * appear right here.
	 */
	const tryHere = async () => {
		const control = findControl( base )

		if ( control ) {
			return control
		}

		// A panel's header switch counts as having found it.
		const panel = findTogglePanel( base )

		if ( panel ) {
			return panel
		}

		openPanels()
		await settle( PANEL_SETTLE )

		return findControl( base ) || findTogglePanel( base )
	}

	let control = await tryHere()

	if ( control ) {
		closeOtherPanels( control )
		revealFound( control, base )

		return true
	}

	for ( const button of buttons.filter( one => one !== startedOn ) ) {
		button.click()
		await settle( TAB_SETTLE )

		control = await tryHere()

		if ( control ) {
			closeOtherPanels( control )
			revealFound( control, base )

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
