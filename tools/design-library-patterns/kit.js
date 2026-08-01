/**
 * The palette system and the section vocabulary every pattern is built from.
 *
 * The first set of patterns was all one amber. A library where every card is
 * the same hue reads as one pattern shown sixty times, and gives nobody a
 * starting point that is not a recolour job. So each pattern picks a palette,
 * and a third of them run on a dark surface — which is the single biggest
 * source of variety, because it changes the type colour, the border, the button
 * and the card all at once.
 *
 * A kit is a palette plus a surface. It returns the same helpers either way, so
 * a pattern is written once and reads the same whether it is light or dark.
 */

/** Neutrals. Zinc for light surfaces, slate for dark — slate is cooler and sits better under saturated accents. */
const N = {
	ink: '#18181b',
	muted: '#52525b',
	faint: '#71717a',
	border: '#e4e4e7',
	hairline: '#f4f4f5',
	canvas: '#fafafa',
	white: '#ffffff',

	night: '#0f172a',
	nightRaised: '#1e293b',
	nightBorder: '#334155',
	nightInk: '#f8fafc',
	nightMuted: '#94a3b8',
}

/**
 * Ten palettes. `base` is the mid tone used on dark surfaces where a dark
 * accent would disappear; `dark` and `deep` are for type and buttons on light.
 */
const PALETTES = {
	amber: { base: '#fbbf24', brand: '#f59e0b', dark: '#d97706', deep: '#b45309', wash: '#fffbeb', tint: '#fef3c7' },
	orange: { base: '#fb923c', brand: '#f97316', dark: '#ea580c', deep: '#c2410c', wash: '#fff7ed', tint: '#ffedd5' },
	rose: { base: '#fb7185', brand: '#f43f5e', dark: '#e11d48', deep: '#be123c', wash: '#fff1f2', tint: '#ffe4e6' },
	fuchsia: { base: '#e879f9', brand: '#d946ef', dark: '#c026d3', deep: '#a21caf', wash: '#fdf4ff', tint: '#fae8ff' },
	violet: { base: '#a78bfa', brand: '#8b5cf6', dark: '#7c3aed', deep: '#6d28d9', wash: '#f5f3ff', tint: '#ede9fe' },
	indigo: { base: '#818cf8', brand: '#6366f1', dark: '#4f46e5', deep: '#4338ca', wash: '#eef2ff', tint: '#e0e7ff' },
	sky: { base: '#38bdf8', brand: '#0ea5e9', dark: '#0284c7', deep: '#0369a1', wash: '#f0f9ff', tint: '#e0f2fe' },
	teal: { base: '#2dd4bf', brand: '#14b8a6', dark: '#0d9488', deep: '#0f766e', wash: '#f0fdfa', tint: '#ccfbf1' },
	emerald: { base: '#34d399', brand: '#10b981', dark: '#059669', deep: '#047857', wash: '#ecfdf5', tint: '#d1fae5' },
	slate: { base: '#94a3b8', brand: '#64748b', dark: '#475569', deep: '#334155', wash: '#f8fafc', tint: '#f1f5f9' },
}

const PAD = ( top, bottom = top, x = 24 ) => ( { top, right: x, bottom, left: x } )
const EDGE = n => ( { top: n, right: n, bottom: n, left: n } )

const svg = d => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${ d }"/></svg>`

/** Simple single-path glyphs. Drawn here rather than pulled from a set so they share a weight. */
const ICON = {
	palette: svg( 'M12 3a9 9 0 1 0 0 18 1.5 1.5 0 0 0 1.16-2.46 1.5 1.5 0 0 1 1.15-2.46h1.77A4.92 4.92 0 0 0 21 11.2C21 6.65 16.97 3 12 3zM6.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' ),
	sliders: svg( 'M4 6h9v2H4zm11 0h5v2h-5zM4 16h5v2H4zm7 0h9v2h-9zM13 3h2v8h-2zM9 13h2v8H9z' ),
	copy: svg( 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11z' ),
	search: svg( 'M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z' ),
	list: svg( 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' ),
	motion: svg( 'M12 2 4 6v12l8 4 8-4V6zm0 2.2 5.5 2.8L12 9.8 6.5 7zM6 8.6l5 2.5v7.3l-5-2.5zm7 9.8v-7.3l5-2.5v7.3z' ),
	shield: svg( 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm0 2.2 6 2.2V11c0 4-2.6 7.8-6 9-3.4-1.2-6-5-6-9V6.4z' ),
	code: svg( 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z' ),
	bolt: svg( 'M13 2 4 14h6l-1 8 9-12h-6z' ),
	clock: svg( 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5 3 .8-1.3-4.3-2.5z' ),
	globe: svg( 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7 6h-3a15 15 0 0 0-1.3-3.4A8 8 0 0 1 19 8zM12 4c.8 1.1 1.4 2.4 1.8 4h-3.6c.4-1.6 1-2.9 1.8-4zM4.3 14A8 8 0 0 1 4 12c0-.7.1-1.4.3-2h3.4a17 17 0 0 0 0 4zm.7 2h3a15 15 0 0 0 1.3 3.4A8 8 0 0 1 5 16zm3-8H5a8 8 0 0 1 4.3-3.4A15 15 0 0 0 8 8zm4 12c-.8-1.1-1.4-2.4-1.8-4h3.6c-.4 1.6-1 2.9-1.8 4zm2.2-6H9.8a15 15 0 0 1 0-4h4.4a15 15 0 0 1 0 4zm.5 5.4A15 15 0 0 0 16 16h3a8 8 0 0 1-4.3 3.4zM16.3 14a17 17 0 0 0 0-4h3.4a8 8 0 0 1 0 4z' ),
	lock: svg( 'M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9zm9 14H6V10h12z' ),
	spark: svg( 'M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7zM19 3l.9 2.6 2.6.9-2.6.9L19 10l-.9-2.6-2.6-.9 2.6-.9zM5 15l.7 2 2 .7-2 .7L5 20.4l-.7-2-2-.7 2-.7z' ),
	chart: svg( 'M4 20h16v2H4zM6 10h3v8H6zm5-5h3v13h-3zm5 8h3v5h-3z' ),
	users: svg( 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z' ),
	mail: svg( 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z' ),
	phone: svg( 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z' ),
	pin: svg( 'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z' ),
	check: svg( 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' ),
	layers: svg( 'M12 2 2 8l10 6 10-6zm0 2.3L18.5 8 12 11.7 5.5 8zM2 12l10 6 10-6-1.9-1.1L12 15.7 3.9 10.9zm0 4.5 10 6 10-6-1.9-1.1L12 20.2l-8.1-4.8z' ),
	refresh: svg( 'M17.6 6.4A8 8 0 1 0 19.7 14h-2.1a6 6 0 1 1-1.4-6.2L13 11h7V4z' ),
}

/**
 * Builds the helper set for one palette on one surface.
 *
 * @param {string}  name Palette key.
 * @param {boolean} dark Whether the section sits on a night surface.
 */
function kit( name = 'amber', dark = false ) {
	const P = PALETTES[ name ]
	if ( ! P ) { throw new Error( `unknown palette: ${ name }` ) }

	// On a dark surface the deep tones vanish, so the accent moves up the ramp
	// and the "wash" becomes a raised panel rather than a tint.
	const ink = dark ? N.nightInk : N.ink
	const muted = dark ? N.nightMuted : N.muted
	const accent = dark ? P.base : P.dark
	const surface = dark ? N.nightRaised : N.white
	const border = dark ? N.nightBorder : N.border
	const page = dark ? N.night : N.white
	const btnBg = dark ? P.brand : P.dark
	const btnInk = dark ? N.night : N.white

	const h = ( text, a = {} ) => ( { n: 'lumen/heading', a: { text, showTopLine: false, textColor1: ink, ...a }, c: [] } )
	const sub = ( text, a = {} ) => ( { n: 'lumen/subtitle', a: { text, textColor1: accent, ...a }, c: [] } )
	const p = ( text, a = {} ) => ( { n: 'lumen/text', a: { text, textColor1: muted, ...a }, c: [] } )
	const btn = ( text, a = {} ) => ( { n: 'lumen/button', a: { text, buttonBackgroundColor: btnBg, textColor1: btnInk, ...a }, c: [] } )
	const ghost = ( text, a = {} ) => btn( text, { buttonBackgroundColor: 'transparent', textColor1: accent, ...a } )
	const btns = ( buttons, a = {} ) => ( { n: 'lumen/button-group', a, c: buttons } )

	const section = ( children, { bg = page, pad = PAD( 80 ), ...rest } = {} ) => ( {
		n: 'lumen/columns',
		a: {
			align: 'full',
			blockPadding: pad,
			// Sections in one pattern must butt together. The default block margin
			// leaves a gap between two full-width bands, and the page background
			// shows through it — invisible on a white pattern, a white stripe
			// across a night one.
			blockMargin: { top: 0, right: 0, bottom: 0, left: 0 },
			...( bg ? { hasBackground: true, blockBackgroundColor: bg } : {} ),
			...rest,
		},
		c: children,
	} )

	const col = ( children, a = {} ) => ( { n: 'lumen/column', a, c: children } )

	/** Container styling for a card. Shared so a column card and a self-boxed composite match. */
	const CARD = ( o = {} ) => ( {
		hasContainer: true,
		containerBackgroundColor: surface,
		containerBorderType: 'solid',
		containerBorderColor: border,
		containerBorderWidth: EDGE( 1 ),
		containerBorderRadius: 14,
		containerPadding: EDGE( 30 ),
		...o,
	} )

	/** The same, minus `hasContainer`, for composites that already draw one. */
	const OWN = ( o = {} ) => {
		const c = CARD( o )
		delete c.hasContainer
		return c
	}

	const card = ( children, a = {} ) => col( children, CARD( a ) )

	/** A card that carries the accent: one per section at most, or it stops meaning anything. */
	const featured = ( children, a = {} ) => col( children, CARD( {
		containerBackgroundColor: dark ? N.night : P.wash,
		containerBorderColor: P.brand,
		containerBorderWidth: EDGE( 2 ),
		...a,
	} ) )

	const items = list => list.map( t => ( {
		n: 'lumen/icon-list-item',
		a: { text: t, textColor1: muted },
		c: [],
	} ) )

	/**
	 * A ticked list.
	 *
	 * `useCustomIconColor` has to be on or `iconColor1` is ignored outright —
	 * which is why every tick stayed the stock dark glyph, invisible on a night
	 * surface and off-palette on a light one. The colour lives on the list, not
	 * on the items; icon-list-item has no icon attributes at all.
	 */
	const checks = ( list, a = {} ) => ( {
		n: 'lumen/icon-list',
		a: { useCustomIconColor: true, iconColor1: accent, ...a },
		c: items( list ),
	} )

	const icon = ( glyph, a = {} ) => ( { n: 'lumen/icon', a: { icon: glyph, iconColor1: accent, iconSize: 40, ...a }, c: [] } )

	/** Icon box is the one composite that draws no container of its own. */
	const iconCard = ( glyph, title, body, a = {} ) => card( [ {
		n: 'lumen/icon-box',
		aa: { 'lumen/icon': { icon: glyph, iconColor1: accent } },
		t: [ title, body ],
	} ], a )

	/** Eyebrow, title, optional standfirst — centred. */
	const intro = ( eyebrow, title, standfirst, tag = 'h2' ) => col( [
		...( eyebrow ? [ sub( eyebrow, { textAlign: 'center' } ) ] : [] ),
		h( title, { textTag: tag, textAlign: 'center' } ),
		...( standfirst ? [ p( standfirst, { textAlign: 'center' } ) ] : [] ),
	], { contentAlign: 'center' } )

	/** A figure with a caption under it. */
	const stat = ( figure, label ) => col( [
		{ n: 'lumen/count-up', a: { text: figure, textColor1: accent, textAlign: 'center' }, c: [] },
		p( label, { textAlign: 'center' } ),
	], { contentAlign: 'center' } )

	/** Deep overrides applied to every inherited example tree in the pattern. */
	const THEME = {
		'lumen/button': { buttonBackgroundColor: btnBg, textColor1: btnInk },
		'lumen/icon': { iconColor1: accent },
		'lumen/icon-label': { iconColor1: accent },
		'lumen/icon-list': { useCustomIconColor: true, iconColor1: accent },
		'lumen/icon-list-item': { textColor1: muted },
		'lumen/heading': { textColor1: ink, showTopLine: false },
		'lumen/subtitle': { textColor1: accent },
		'lumen/text': { textColor1: muted },
	}

	return {
		P, N, dark, ink, muted, accent, surface, border, page,
		PAD, EDGE, ICON,
		h, sub, p, btn, ghost, btns, section, col, card, featured, CARD, OWN,
		items, checks, icon, iconCard, intro, stat, THEME,
	}
}

module.exports = { kit, PALETTES, N, ICON, PAD, EDGE, svg }
