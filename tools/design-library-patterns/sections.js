/**
 * Reusable page sections.
 *
 * A pattern is one section; a page is six or seven of them in a row. Writing
 * those out per page would mean thirty copies of the same hero drifting apart
 * over time, so the sections live here once and pages pass content in.
 *
 * Every factory takes the kit first, so a section renders correctly on whatever
 * palette and surface the page opened with.
 */

const NO_IMG = [ 'lumen/image' ]

/* ─────────────────────────── Openers ─────────────────────────── */

/** Centred hero: eyebrow, headline, standfirst, up to two buttons. */
const heroCentred = ( K, { eyebrow, title, body, cta, alt, bg } ) => K.section( [ K.col( [
	...( eyebrow ? [ K.sub( eyebrow, { textAlign: 'center' } ) ] : [] ),
	K.h( title, { textTag: 'h1', textAlign: 'center' } ),
	...( body ? [ K.p( body, { textAlign: 'center' } ) ] : [] ),
	...( cta ? [ K.btns( [ K.btn( cta ), ...( alt ? [ K.ghost( alt ) ] : [] ) ], { innerBlockJustify: 'center' } ) ] : [] ),
], { contentAlign: 'center' } ) ], { bg: bg || K.P.wash, pad: K.PAD( 104, 96 ) } )

/** Hero with the copy on the left and a tinted panel on the right. */
const heroSplit = ( K, { eyebrow, title, body, cta, panelIcon, panelTitle, panelBody } ) => K.section( [
	K.col( [
		...( eyebrow ? [ K.sub( eyebrow ) ] : [] ),
		K.h( title, { textTag: 'h1' } ),
		...( body ? [ K.p( body ) ] : [] ),
		...( cta ? [ K.btns( [ K.btn( cta ) ] ) ] : [] ),
	] ),
	K.featured( [
		K.icon( panelIcon, { iconSize: 48 } ),
		K.h( panelTitle, { textTag: 'h3' } ),
		K.p( panelBody ),
	], { containerPadding: K.EDGE( 40 ) } ),
], { pad: K.PAD( 96 ) } )

/** A short banner for interior pages — no call to action, just a title. */
const pageHeader = ( K, { eyebrow, title, body, bg } ) => K.section( [ K.col( [
	...( eyebrow ? [ K.sub( eyebrow, { textAlign: 'center' } ) ] : [] ),
	K.h( title, { textTag: 'h1', textAlign: 'center' } ),
	...( body ? [ K.p( body, { textAlign: 'center' } ) ] : [] ),
], { contentAlign: 'center' } ) ], { bg: bg || K.P.wash, pad: K.PAD( 80, 72 ) } )

/* ─────────────────────────── Body ─────────────────────────── */

/** Centred section intro, for stacking above a grid. */
const intro = ( K, { eyebrow, title, body, bg, pad } ) => K.section(
	[ K.intro( eyebrow, title, body ) ],
	{ bg, pad: pad || K.PAD( 80, 0 ) }
)

/** A row of icon cards. Three or four reads best; more should be two rows. */
const iconCards = ( K, cards, { bg, pad } = {} ) => K.section(
	cards.map( c => K.iconCard( c[ 0 ], c[ 1 ], c[ 2 ] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** Copy on one side, ticked list on the other. `flip` puts the list first. */
const splitList = ( K, { eyebrow, title, body, list, cta, flip, bg } ) => {
	const copy = K.col( [
		...( eyebrow ? [ K.sub( eyebrow ) ] : [] ),
		K.h( title, { textTag: 'h2' } ),
		...( body ? [ K.p( body ) ] : [] ),
		...( cta ? [ K.btns( [ K.ghost( cta ) ] ) ] : [] ),
	] )
	const panel = K.card( [ K.checks( list ) ] )
	return K.section( flip ? [ panel, copy ] : [ copy, panel ], { bg, pad: K.PAD( 88 ) } )
}

/** Two or three columns of plain copy. */
const textColumns = ( K, cols, { bg, pad } = {} ) => K.section(
	cols.map( c => K.col( [ K.h( c[ 0 ], { textTag: 'h4' } ), K.p( c[ 1 ] ) ] ) ),
	{ bg, pad: pad || K.PAD( 80 ) }
)

/** A band of figures. */
const stats = ( K, figures, { bg, pad } = {} ) => K.section(
	figures.map( f => K.stat( f[ 0 ], f[ 1 ] ) ),
	{ bg: bg || K.P.wash, pad: pad || K.PAD( 64 ) }
)

/** Numbered cards — a process, in order. */
const steps = ( K, list, { bg, pad } = {} ) => K.section(
	list.map( ( s, i ) => K.card( [
		{ n: 'lumen/number-box', a: {
			text: String( i + 1 ).padStart( 2, '0' ),
			textColor1: K.dark ? K.N.night : '#ffffff',
			containerBackgroundColor: K.dark ? K.P.base : K.P.dark,
		}, c: [] },
		K.h( s[ 0 ], { textTag: 'h3' } ),
		K.p( s[ 1 ] ),
	] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** A dated timeline. */
const timeline = ( K, entries, { bg, pad } = {} ) => K.section( [ K.col(
	entries.map( e => ( {
		n: 'lumen/timeline',
		a: { text: e[ 0 ], textColor1: K.accent },
		c: [ K.col( [ K.h( e[ 1 ], { textTag: 'h4' } ), K.p( e[ 2 ] ) ] ) ],
	} ) )
) ], { bg, pad: pad || K.PAD( 16, 88 ) } )

/** Three quotes. */
const testimonials = ( K, quotes, { bg, pad } = {} ) => K.section(
	quotes.map( q => K.col( [ {
		n: 'lumen/testimonial', a: K.OWN(), drop: NO_IMG, t: [ q[ 0 ], q[ 1 ], q[ 2 ] ],
	} ] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** One large quote, centred, with attribution under it. */
const quote = ( K, { text, name, role, bg } ) => K.section( [ K.col( [
	{ n: 'lumen/blockquote', a: K.OWN( { containerBorderColor: K.dark ? K.N.nightBorder : K.P.tint, containerPadding: K.EDGE( 44 ) } ), t: [ text ] },
	K.h( name, { textTag: 'h4', textAlign: 'center' } ),
	K.sub( role, { textAlign: 'center' } ),
], { contentAlign: 'center' } ) ], { bg: bg || K.P.wash, pad: K.PAD( 88 ) } )

/** People. */
const team = ( K, people, { bg, pad } = {} ) => K.section(
	people.map( m => K.col( [ {
		n: 'lumen/team-member', a: K.OWN( { containerPadding: K.EDGE( 26 ) } ), drop: NO_IMG, t: [ m[ 0 ], m[ 1 ], m[ 2 ] ],
	} ] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** Plans. `featured` marks which index carries the accent. */
const pricing = ( K, tiers, { bg, pad, featured = 1 } = {} ) => K.section(
	tiers.map( ( t, i ) => K.col( [ {
		n: 'lumen/pricing-box',
		a: i === featured
			? K.OWN( { containerBackgroundColor: K.dark ? K.N.night : K.P.wash, containerBorderColor: K.P.brand, containerBorderWidth: K.EDGE( 2 ) } )
			: K.OWN(),
		ac: { 'lumen/icon-list': K.items( t.features ) },
		t: [ t.name, t.currency || '$', t.price, t.period || '/year', t.note, null, t.cta ],
	} ] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** Questions. */
const faq = ( K, qa, { bg, pad } = {} ) => K.section(
	[ K.col( qa.map( x => ( { n: 'lumen/accordion', t: [ x[ 0 ], x[ 1 ] ] } ) ) ) ],
	{ bg, pad: pad || K.PAD( 16, 88 ) }
)

/** A row of glyphs standing in for client logos. */
const logoRow = ( K, icons, { label = 'Trusted by teams at', bg } = {} ) => [
	K.section( [ K.col( [ K.p( label, { textAlign: 'center' } ) ], { contentAlign: 'center' } ) ],
		{ bg: bg || K.N.canvas, pad: K.PAD( 56, 8 ) } ),
	K.section( icons.map( g => K.col( [ K.icon( g, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ) ),
		{ bg: bg || K.N.canvas, pad: K.PAD( 0, 56 ) } ),
]

/** Contact routes as icon cards. */
const contactCards = ( K, cards, { bg, pad } = {} ) => K.section(
	cards.map( c => K.iconCard( c[ 0 ], c[ 1 ], c[ 2 ] ) ),
	{ bg, pad: pad || K.PAD( 24, 88 ) }
)

/** A single highlighted panel — for a notice or an offer. */
const panel = ( K, { icon, title, body, cta } ) => K.section( [ K.featured( [
	...( icon ? [ K.icon( icon, { iconSize: 40 } ) ] : [] ),
	K.h( title, { textTag: 'h3' } ),
	K.p( body ),
	...( cta ? [ K.btns( [ K.ghost( cta ) ] ) ] : [] ),
], { containerPadding: K.EDGE( 40 ) } ) ], { pad: K.PAD( 72 ) } )

/* ─────────────────────────── Closers ─────────────────────────── */

/** Solid accent band. The loudest thing on a page, so one per page. */
const ctaBanner = ( K, { title, body, cta } ) => K.section( [ K.col( [ {
	n: 'lumen/call-to-action',
	a: K.OWN( {
		containerBackgroundColor: K.dark ? K.P.deep : K.P.deep,
		containerBorderWidth: K.EDGE( 0 ),
		containerBorderRadius: 16,
		containerPadding: { top: 56, right: 40, bottom: 56, left: 40 },
	} ),
	aa: {
		'lumen/heading': { textColor1: '#ffffff', showTopLine: false },
		'lumen/text': { textColor1: K.P.tint },
		'lumen/button': { buttonBackgroundColor: '#ffffff', textColor1: K.P.deep },
	},
	t: [ title, body, cta ],
} ] ) ], { pad: K.PAD( 72 ) } )

/** A quieter close: heading, line of copy, two buttons. */
const ctaPlain = ( K, { title, body, cta, alt, bg } ) => K.section( [ K.col( [
	K.h( title, { textTag: 'h2', textAlign: 'center' } ),
	...( body ? [ K.p( body, { textAlign: 'center' } ) ] : [] ),
	K.btns( [ K.btn( cta ), ...( alt ? [ K.ghost( alt ) ] : [] ) ], { innerBlockJustify: 'center' } ),
], { contentAlign: 'center' } ) ], { bg, pad: K.PAD( 80 ) } )

/** Three columns of links, as a footer would have. */
const footerLinks = ( K, groups, { bg } = {} ) => K.section(
	groups.map( g => K.col( [ K.h( g[ 0 ], { textTag: 'h4' } ), K.checks( g[ 1 ] ) ] ) ),
	{ bg, pad: K.PAD( 72 ) }
)

module.exports = {
	heroCentred, heroSplit, pageHeader,
	intro, iconCards, splitList, textColumns, stats, steps, timeline,
	testimonials, quote, team, pricing, faq, logoRow, contactCards, panel,
	ctaBanner, ctaPlain, footerLinks,
}
