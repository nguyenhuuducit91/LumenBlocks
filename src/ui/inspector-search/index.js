/**
 * Find a setting by typing.
 *
 * A single block puts 62 controls and 978 pixels of scrolling in front of the
 * author, spread across three tabs and panels whose titles do not always
 * contain the word being looked for. Searching answers "where is the border
 * radius" in one step instead of "open the right tab, guess the right panel,
 * scroll".
 *
 * Two things make this harder than filtering a list.
 *
 * **The panels are not a list.** Every panel arrives through a slot filled by
 * whichever block is selected, so there is nothing to filter at the source —
 * but there is a single piece of DOM, and hiding the rows that do not match is
 * both accurate and cheap. What the author had open is restored on clearing.
 *
 * **Only the open tab exists.** `InspectorStyleControls` and its siblings
 * return null unless their tab is active, so the other tabs' panels are not
 * hidden — they are not rendered at all. A search that only looked at the open
 * tab would search the one place the author has already looked. So when the
 * open tab yields nothing, the search walks the other tabs and settles on the
 * one that has the answer, leaving any tab it merely passed through as it
 * found it.
 */

/**
 * WordPress dependencies
 */
import {
	useState, useEffect, useRef, memo,
} from '@wordpress/element'
import {
	__, _n, sprintf,
} from '@wordpress/i18n'
import { Icon } from '@wordpress/components'
import { search, closeSmall } from '@wordpress/icons'
import { addFilter, removeFilter } from '@wordpress/hooks'

/**
 * External dependencies
 */
import { i18n } from 'lumen'

// Two characters is where matching stops being noise.
const MIN_LENGTH = 2

// Long enough that walking the tabs does not happen on every keystroke.
const DEBOUNCE = 350

// A tab needs about this long to mount its panels after being clicked.
const TAB_SETTLE = 220

/*
 * Opening a panel normally closes the others — the inspector behaves like an
 * accordion. While searching, several panels have to be open at once, and the
 * restore afterwards has to be able to close panels without that closing the
 * ones it just reopened. This suppresses the behaviour for exactly as long as
 * the search is doing the opening, using the filter the panels already offer.
 */
let suppressAutoClose = false

/**
 * Words that should find a control whose label says something else.
 *
 * Keyed by the word an author is likely to type, not by the label — nobody
 * looking for rounded corners types "border radius" first.
 */
const SYNONYMS = {
	rounded: 'radius',
	corner: 'radius',
	shadow: 'shadow',
	space: 'padding margin gap',
	spacing: 'padding margin gap',
	gap: 'gap column row',
	font: 'typography size weight family',
	text: 'typography color align',
	size: 'size width height font',
	colour: 'color',
	image: 'image background',
	hide: 'responsive visibility',
	mobile: 'responsive tablet',
	animation: 'motion transition transform effect',
}

const TAB_LABELS = {
	layout: __( 'Layout', i18n ),
	style: __( 'Style', i18n ),
	advanced: __( 'Advanced', i18n ),
}

/**
 * The inspector element the search applies to.
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
 * Which tab a button selects.
 *
 * @param {Element} button A tab button.
 * @return {string} Tab name.
 */
const tabOf = button => ( button.className.match( /lmb-tab--(\w+)/ ) || [] )[ 1 ] || ''

/**
 * Waits for the editor to catch up with a click.
 *
 * @param {number} ms How long.
 * @return {Promise} Resolves when the time is up.
 */
const settle = ms => new Promise( resolve => window.setTimeout( resolve, ms ) )

/**
 * Expands the query with any synonyms of the words in it.
 *
 * @param {string} query What was typed.
 * @return {string[]} Terms to match against.
 */
const expand = query => {
	const words = query.toLowerCase().trim().split( /\s+/ ).filter( Boolean )

	return words.reduce( ( terms, word ) => {
		terms.push( word )

		Object.keys( SYNONYMS ).forEach( key => {
			if ( key.startsWith( word ) || word.startsWith( key ) ) {
				terms.push( ...SYNONYMS[ key ].split( ' ' ) )
			}
		} )

		return terms
	}, [] )
}

/*
 * Anything else in the sidebar that knows the name of a setting can ask for it
 * to be found — the applied-settings list uses this for its "go to" buttons.
 * The work of locating a setting already lives here, including the part that
 * walks the tabs, so the alternative would be a second copy of it.
 */
const listeners = new Set()

/**
 * Searches for a setting from outside the search box.
 *
 * @param {string} query What to look for.
 */
export const requestSearch = query => listeners.forEach( listener => listener( query ) )

const InspectorSearch = () => {
	const [ query, setQuery ] = useState( '' )

	// What the last completed search found: how many controls, and on which
	// tab. Null while nothing is being searched for.
	const [ result, setResult ] = useState( null )

	// Which panels the author had open before searching started, for the tab
	// the results were found on.
	const previouslyOpen = useRef( null )

	// The search box itself, so the filtering can be told to leave it alone.
	const root = useRef( null )

	// Set while this component is the one driving the DOM, so the observer
	// below does not react to its own work.
	const busy = useRef( false )

	useEffect( () => {
		addFilter(
			'lumen.panel.tabs.panel-auto-close',
			'lumen/inspector-search',
			autoClose => ( suppressAutoClose ? false : autoClose )
		)

		return () => removeFilter( 'lumen.panel.tabs.panel-auto-close', 'lumen/inspector-search' )
	}, [] )

	useEffect( () => {
		listeners.add( setQuery )

		return () => listeners.delete( setQuery )
	}, [] )

	/**
	 * Whether a panel must stay visible whatever the query is.
	 *
	 * The search box and the tab strip share a panel. Hiding that one takes the
	 * search box off the screen mid-word, which is what happened before this
	 * check existed.
	 *
	 * @param {Element} panel A panel body.
	 * @return {boolean} Whether to leave it alone.
	 */
	const isFurniture = panel => panel.contains( root.current ) ||
		panel.classList.contains( 'lmb-panel-tabs' )

	/**
	 * The panels of the tab currently on screen.
	 *
	 * @return {Element[]} Panel bodies.
	 */
	const getPanels = () => {
		const inspector = getInspector()

		return inspector
			? Array.from( inspector.querySelectorAll( '.components-panel__body' ) )
				.filter( panel => ! isFurniture( panel ) )
			: []
	}

	/**
	 * Puts every panel and row of the open tab back on screen.
	 *
	 * @param {boolean[]|null} openState Which panels to leave open, by position.
	 */
	const restore = openState => {
		getPanels().forEach( ( panel, index ) => {
			panel.style.display = ''

			Array.from( panel.querySelectorAll( '.components-base-control, .lmn-control' ) )
				.forEach( control => {
					control.style.display = ''
				} )

			if ( ! openState ) {
				return
			}

			if ( !! openState[ index ] !== panel.classList.contains( 'is-opened' ) ) {
				panel.querySelector( '.components-panel__body-toggle' )?.click()
			}
		} )
	}

	/**
	 * Hides the panels and rows of the open tab that do not match.
	 *
	 * @param {string} value The query.
	 * @return {number} How many controls matched.
	 */
	const filterOpenTab = value => {
		const terms = expand( value )
		let found = 0

		/*
		 * Everything comes back before anything is hidden. Each run only writes
		 * to the rows it walks, and the editor hands out fresh panels as tabs
		 * and blocks change — so without this, a row hidden by an earlier query
		 * can stay hidden under a later one that ought to have matched it.
		 */
		getPanels().forEach( panel => {
			panel.style.display = ''

			Array.from( panel.querySelectorAll( '.components-base-control, .lmn-control' ) )
				.forEach( control => {
					control.style.display = ''
				} )
		} )

		/*
		 * With the inline styles cleared, anything the stylesheet still hides
		 * belongs to a tab that is not on screen — Gutenberg's own Advanced
		 * panel is in the markup on every tab but only shown on one. Counting
		 * those as results produced a search that reported matches while the
		 * sidebar sat empty.
		 */
		const visiblePanels = getPanels().filter(
			panel => window.getComputedStyle( panel ).display !== 'none'
		)

		visiblePanels.forEach( panel => {
			const title = ( panel.querySelector( '.components-panel__body-title' )?.textContent || '' ).toLowerCase()
			const titleMatches = terms.some( term => title.includes( term ) )

			// A panel has to be open for its controls to be in the DOM at all.
			if ( ! panel.classList.contains( 'is-opened' ) ) {
				panel.querySelector( '.components-panel__body-toggle' )?.click()
			}

			const controls = Array.from(
				panel.querySelectorAll( ':scope .components-base-control, :scope .lmn-control' )
			).filter( control => ! control.parentElement?.closest( '.components-base-control, .lmn-control' ) )

			let panelMatches = titleMatches

			controls.forEach( control => {
				const label = ( control.textContent || '' ).toLowerCase().slice( 0, 120 )
				const hit = titleMatches || terms.some( term => label.includes( term ) )

				control.style.display = hit ? '' : 'none'

				if ( hit ) {
					panelMatches = true
					found++
				}
			} )

			panel.style.display = panelMatches ? '' : 'none'
		} )

		return found
	}

	/**
	 * Runs a search, following it across tabs if it has to.
	 *
	 * The open tab is tried first, so a search for something in front of the
	 * author never moves them. Only when that finds nothing do the other tabs
	 * get their turn, and a tab that turns out to have no answer is closed back
	 * up before moving on — walking past a tab should not leave it rearranged.
	 *
	 * @param {string} value The query.
	 */
	const run = async value => {
		const searching = value.trim().length >= MIN_LENGTH

		busy.current = true
		suppressAutoClose = true

		if ( ! searching ) {
			restore( previouslyOpen.current )
			previouslyOpen.current = null
			setResult( null )
			suppressAutoClose = false
			busy.current = false

			return
		}

		const buttons = getTabButtons()
		const startedOn = buttons.find( button => button.classList.contains( 'is-active' ) )

		// The open tab, using whatever the author already had open.
		if ( ! previouslyOpen.current ) {
			previouslyOpen.current = getPanels().map( panel => panel.classList.contains( 'is-opened' ) )
		}

		let found = filterOpenTab( value )

		if ( found ) {
			setResult( {
				found, tab: startedOn ? tabOf( startedOn ) : '', moved: false,
			} )
			suppressAutoClose = false
			busy.current = false

			return
		}

		// Nothing here. Try the others, in the order they are shown.
		const others = buttons.filter( button => button !== startedOn )

		for ( const button of others ) {
			button.click()
			await settle( TAB_SETTLE )

			const wasOpen = getPanels().map( panel => panel.classList.contains( 'is-opened' ) )

			found = filterOpenTab( value )

			if ( found ) {
				previouslyOpen.current = wasOpen
				setResult( {
					found, tab: tabOf( button ), moved: true,
				} )
				suppressAutoClose = false
				busy.current = false

				return
			}

			// A tab the answer was not on is left exactly as it was.
			restore( wasOpen )
		}

		// No tab had it. Go back to where the author was.
		if ( startedOn ) {
			startedOn.click()
			await settle( TAB_SETTLE )
		}

		restore( previouslyOpen.current )
		previouslyOpen.current = null
		setResult( {
			found: 0, tab: '', moved: false,
		} )
		suppressAutoClose = false
		busy.current = false
	}

	// Typing is debounced: each run may click through three tabs, which is not
	// something to do between two keystrokes.
	useEffect( () => {
		const timer = window.setTimeout( () => run( query ), DEBOUNCE )

		return () => window.clearTimeout( timer )
	}, [ query ] )

	/*
	 * Selecting another block, or switching tabs by hand, replaces the panels
	 * with a fresh set that has never been filtered. Without this the search box
	 * still says it is searching while the inspector quietly shows everything.
	 */
	useEffect( () => {
		const inspector = getInspector()

		if ( ! inspector || query.trim().length < MIN_LENGTH ) {
			return
		}

		let pending = null

		const observer = new window.MutationObserver( () => {
			if ( busy.current || pending ) {
				return
			}

			pending = window.setTimeout( () => {
				pending = null
				busy.current = true
				const found = filterOpenTab( query )
				busy.current = false

				// Only the count is refreshed. Which tab the search landed on is
				// what the author is being told, and re-rendering a panel is not
				// news about that.
				setResult( previous => ( { ...previous, found } ) )
			}, 150 )
		} )

		observer.observe( inspector, { childList: true, subtree: true } )

		return () => {
			observer.disconnect()
			window.clearTimeout( pending )
		}
	}, [ query ] )

	// Leaving the block, or unmounting, must not leave rows hidden.
	useEffect( () => () => {
		const inspector = getInspector()

		Array.from( inspector?.querySelectorAll( '.components-panel__body, .components-base-control, .lmn-control' ) || [] )
			.forEach( element => {
				element.style.display = ''
			} )
	}, [] )

	const status = () => {
		if ( ! result ) {
			return ''
		}

		if ( ! result.found ) {
			return __( 'Nothing matches. Clear the search to see everything.', i18n )
		}

		if ( result.moved && TAB_LABELS[ result.tab ] ) {
			return sprintf(
				/* translators: 1: how many settings matched, 2: the name of a tab. */
				_n(
					'%1$d setting, on the %2$s tab.',
					'%1$d settings, on the %2$s tab.',
					result.found,
					i18n
				),
				result.found,
				TAB_LABELS[ result.tab ]
			)
		}

		return sprintf(
			/* translators: %d: how many settings matched. */
			_n( '%d matching setting.', '%d matching settings.', result.found, i18n ),
			result.found
		)
	}

	return (
		<div className="lmn-inspector-search" ref={ root }>
			<Icon className="lmn-inspector-search__icon" icon={ search } />

			<input
				type="search"
				className="lmn-inspector-search__input"
				value={ query }
				placeholder={ __( 'Find a setting…', i18n ) }
				aria-label={ __( 'Find a setting', i18n ) }
				onChange={ event => setQuery( event.target.value ) }
			/>

			{ !! query && (
				<button
					type="button"
					className="lmn-inspector-search__clear"
					aria-label={ __( 'Clear the search', i18n ) }
					onClick={ () => setQuery( '' ) }
				>
					<Icon icon={ closeSmall } />
				</button>
			) }

			{ !! status() && (
				<p className="lmn-inspector-search__status" aria-live="polite">
					{ status() }
				</p>
			) }
		</div>
	)
}

export default memo( InspectorSearch )
