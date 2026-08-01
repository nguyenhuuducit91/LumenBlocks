/**
 * Pattern specs for the Lumen design library.
 *
 * Node shape: { n, a, c, t, aa, ac, drop, ex } — see README.
 *
 * Each pattern opens a kit: a palette plus a surface, light or night. The kit
 * returns the same helpers either way, so a section is written once and reads
 * correctly on both. That is what stops sixty-odd patterns from being one
 * pattern shown sixty-odd times.
 *
 * Two rules the stock block examples break, enforced by hand here:
 *   - No remote assets. The examples point images at source.unsplash.com, which
 *     Unsplash retired, and the library ships pointing at no CDN. `drop` the
 *     inherited images; colour, icons and spacing carry the set.
 *   - Never wrap a self-boxed composite in a card column. pricing-box,
 *     testimonial, team-member, call-to-action, notification and blockquote all
 *     draw their own container; use `OWN()` on them instead of `card()`.
 */

const { kit } = require( './kit' )

/** Every pattern is declared through this so the kit's theme map is attached. */
const P = ( id, label, category, palette, dark, build ) => {
	const K = kit( palette, dark )
	return { id, label, category, plan: 'free', theme: K.THEME, blocks: build( K ) }
}

const NO_IMG = [ 'lumen/image' ]

module.exports = [

	/* ═══════════════════════════ Hero ═══════════════════════════ */

	P( 'lumen-hero-centred', 'Hero — centred', 'Hero', 'amber', false, K => [
		K.section( [ K.col( [
			K.sub( 'Built for the block editor', { textAlign: 'center' } ),
			K.h( 'Ship a site your client can actually edit', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'Every section here is a Lumen block. Change the copy, set your colours once, and the rest keeps up on its own.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Start building' ), K.ghost( 'Browse the blocks' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 104, 96 ) } ),
	] ),

	P( 'lumen-hero-night', 'Hero — night', 'Hero', 'indigo', true, K => [
		K.section( [ K.col( [
			K.sub( 'Version 2 is out', { textAlign: 'center' } ),
			K.h( 'Build the page, not the stylesheet', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'Forty-seven blocks that share one set of controls. Learn one and you have learned the rest.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Get started free' ), K.ghost( 'Watch the tour' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 112, 104 ) } ),
	] ),

	P( 'lumen-hero-split', 'Hero — split with panel', 'Hero', 'violet', false, K => [
		K.section( [
			K.col( [
				K.sub( 'Design system included' ),
				K.h( 'One place to set the look of the whole site', { textTag: 'h1' } ),
				K.p( 'Colours, type and spacing live in one panel. Change them there and every block on every page follows.' ),
				K.btns( [ K.btn( 'Open the design system' ) ] ),
			] ),
			K.featured( [
				K.icon( K.ICON.palette, { iconSize: 48 } ),
				K.h( 'Styles that stay put', { textTag: 'h3' } ),
				K.p( 'Nothing is hard-coded per block, so a rebrand is one change rather than four hundred.' ),
			], { containerPadding: K.EDGE( 40 ) } ),
		], { pad: K.PAD( 96 ) } ),
	] ),

	P( 'lumen-hero-with-stats', 'Hero — with figures', 'Hero', 'teal', false, K => [
		K.section( [ K.col( [
			K.h( 'Everything your team needs to launch', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'One plugin, one set of controls, no page builder to learn.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Install now' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 88, 32 ) } ),
		K.section( [ K.stat( '47', 'Blocks' ), K.stat( '3', 'Breakpoints' ), K.stat( '10', 'Animations' ), K.stat( '0', 'Lines of CSS' ) ],
			{ bg: K.P.wash, pad: K.PAD( 0, 80 ) } ),
	] ),

	P( 'lumen-hero-minimal', 'Hero — minimal', 'Hero', 'slate', false, K => [
		K.section( [ K.col( [
			K.h( 'Less plugin, more page', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'A block library that gets out of the way once the page is built.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'See it work' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 120, 112 ) } ),
	] ),

	P( 'lumen-hero-badge-night', 'Hero — badge on night', 'Hero', 'emerald', true, K => [
		K.section( [ K.col( [
			K.featured( [ K.sub( 'Now with conditional display', { textAlign: 'center' } ) ],
				{ containerPadding: { top: 8, right: 20, bottom: 8, left: 20 }, containerBorderRadius: 999 } ),
			K.h( 'Decide what ships to the reader', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'Show a block by role, date, device or page context — resolved on the server, so a hidden block is never sent.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Read the docs' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 96 ) } ),
	] ),

	P( 'lumen-hero-checklist', 'Hero — with checklist', 'Hero', 'sky', false, K => [
		K.section( [
			K.col( [
				K.sub( 'For agencies' ),
				K.h( 'Hand it over without the handover call', { textTag: 'h1' } ),
				K.p( 'Your client gets controls they can use and cannot break.' ),
				K.btns( [ K.btn( 'Start a project' ) ] ),
			] ),
			K.card( [ K.checks( [
				'Global colours in one panel',
				'Spacing presets, not guesses',
				'Per-device controls on every value',
				'A reset beside every override',
			] ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 96 ) } ),
	] ),

	P( 'lumen-hero-rose-centred', 'Hero — soft wash', 'Hero', 'rose', false, K => [
		K.section( [ K.col( [
			K.sub( 'Portfolio ready', { textAlign: 'center' } ),
			K.h( 'Make the work the loudest thing on the page', { textTag: 'h1', textAlign: 'center' } ),
			K.p( 'Quiet type, generous spacing, and a palette you set once.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'View templates' ), K.ghost( 'Pricing' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 100 ) } ),
	] ),

	/* ═════════════════════════ Features ═════════════════════════ */

	P( 'lumen-features-three-up', 'Features — three up', 'Features', 'amber', false, K => [
		K.section( [ K.intro( 'What you get', 'Everything in one toolkit', 'Forty-seven blocks that share one set of controls.' ) ],
			{ bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.iconCard( K.ICON.palette, 'Global design system', 'Set colours, type and spacing once. Every block inherits them.' ),
			K.iconCard( K.ICON.sliders, 'Responsive by control', 'Every value can differ per device without touching CSS.' ),
			K.iconCard( K.ICON.copy, 'Copy and paste styling', 'Move what you changed onto another block, even a different type.' ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-features-four-grid', 'Features — four in a 2×2', 'Features', 'indigo', false, K => [
		K.section( [ K.intro( 'Built in', 'Small things you stop having to build' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.iconCard( K.ICON.search, 'Setting search', 'Filter the inspector as you type; it follows a setting onto whichever tab it lives on.' ),
			K.iconCard( K.ICON.list, 'Applied settings', 'Everything a block sets, in one list, with a reset for one value at a time.' ),
		], { pad: K.PAD( 24, 20 ) } ),
		K.section( [
			K.iconCard( K.ICON.motion, 'Motion effects', 'Entrance animations per device, skipped for readers who ask for reduced motion.' ),
			K.iconCard( K.ICON.shield, 'Conditional display', 'Show a block by role, date or device — decided on the server.' ),
		], { pad: K.PAD( 0, 88 ) } ),
	] ),

	P( 'lumen-features-six-night', 'Features — six on night', 'Features', 'violet', true, K => [
		K.section( [ K.intro( 'The whole surface', 'Six things worth the install' ) ], { pad: K.PAD( 88, 0 ) } ),
		K.section( [
			K.iconCard( K.ICON.palette, 'Design system', 'One panel drives the whole site.' ),
			K.iconCard( K.ICON.sliders, 'Per-device values', 'Three breakpoints on every control.' ),
			K.iconCard( K.ICON.code, 'Scoped CSS', 'Per-block, cannot leak outward.' ),
		], { pad: K.PAD( 24, 16 ) } ),
		K.section( [
			K.iconCard( K.ICON.motion, 'Motion', 'Ten entrance effects, reduced-motion aware.' ),
			K.iconCard( K.ICON.lock, 'Role manager', 'Hide styling from the people who should not see it.' ),
			K.iconCard( K.ICON.refresh, 'Reset anything', 'Every override undoes on its own.' ),
		], { pad: K.PAD( 0, 88 ) } ),
	] ),

	P( 'lumen-feature-alternating', 'Feature — text beside panel', 'Features', 'emerald', false, K => [
		K.section( [
			K.featured( [
				K.icon( K.ICON.code, { iconSize: 44 } ),
				K.h( 'Scoped custom CSS', { textTag: 'h3' } ),
				K.p( 'Write CSS for one block. It cannot restyle the rest of the site by accident.' ),
			], { containerPadding: K.EDGE( 44 ) } ),
			K.col( [
				K.sub( 'For the person who inherits it' ),
				K.h( 'Nothing here needs a developer to undo', { textTag: 'h2' } ),
				K.p( 'Every override is a control with a reset next to it. No theme file to edit, no stylesheet to hunt through.' ),
				K.btns( [ K.ghost( 'See how it works' ) ] ),
			] ),
		], { bg: K.N.canvas, pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-features-two-large', 'Features — two large', 'Features', 'sky', false, K => [
		K.section( [
			K.card( [
				K.icon( K.ICON.layers, { iconSize: 44 } ),
				K.h( 'Blocks that nest properly', { textTag: 'h3' } ),
				K.p( 'Columns inside columns inside containers, each keeping its own spacing scale rather than fighting the parent.' ),
				K.btns( [ K.ghost( 'Layout docs' ) ] ),
			], { containerPadding: K.EDGE( 40 ) } ),
			K.card( [
				K.icon( K.ICON.bolt, { iconSize: 44 } ),
				K.h( 'Styles compiled per block', { textTag: 'h3' } ),
				K.p( 'Only the CSS a page actually uses is written into it, so an unused block costs a reader nothing.' ),
				K.btns( [ K.ghost( 'Performance notes' ) ] ),
			], { containerPadding: K.EDGE( 40 ) } ),
		], { pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-features-checklist-split', 'Features — list beside copy', 'Features', 'teal', false, K => [
		K.section( [
			K.col( [
				K.sub( 'Inspector' ),
				K.h( 'Find the setting, not the documentation', { textTag: 'h2' } ),
				K.p( 'The panel filters as you type and follows a setting onto whichever tab it lives on.' ),
			] ),
			K.card( [ K.checks( [
				'Search across every panel',
				'Jump straight to the control',
				'See only what this block sets',
				'Reset one value without touching the rest',
				'Copy the whole set onto another block',
			] ) ] ),
		], { pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-features-numbered', 'Features — numbered cards', 'Features', 'orange', false, K => [
		K.section( [ K.intro( 'How it fits together', 'Three layers, one system' ) ], { bg: K.P.wash, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.card( [
				{ n: 'lumen/number-box', a: { text: '01', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'Theme', { textTag: 'h3' } ),
				K.p( 'Widths and colours are read from your theme first, so a fresh install already matches the site.' ),
			] ),
			K.card( [
				{ n: 'lumen/number-box', a: { text: '02', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'Design system', { textTag: 'h3' } ),
				K.p( 'Anything you set here overrides the theme, everywhere, in one move.' ),
			] ),
			K.card( [
				{ n: 'lumen/number-box', a: { text: '03', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'The block', { textTag: 'h3' } ),
				K.p( 'And anything set on a block wins over both — with a reset to hand it back.' ),
			] ),
		], { bg: K.P.wash, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-features-compact-row', 'Features — compact row', 'Features', 'fuchsia', false, K => [
		K.section( [
			K.col( [ K.icon( K.ICON.bolt, { iconSize: 32 } ), K.h( 'Fast', { textTag: 'h4' } ), K.p( 'Only the CSS you use.' ) ] ),
			K.col( [ K.icon( K.ICON.globe, { iconSize: 32 } ), K.h( 'Translated', { textTag: 'h4' } ), K.p( 'Every string is translatable.' ) ] ),
			K.col( [ K.icon( K.ICON.lock, { iconSize: 32 } ), K.h( 'Scoped', { textTag: 'h4' } ), K.p( 'Styles cannot leak sideways.' ) ] ),
			K.col( [ K.icon( K.ICON.refresh, { iconSize: 32 } ), K.h( 'Reversible', { textTag: 'h4' } ), K.p( 'Reset any value on its own.' ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 64 ) } ),
	] ),

	P( 'lumen-features-dark-cards', 'Features — cards on night', 'Features', 'sky', true, K => [
		K.section( [
			K.iconCard( K.ICON.spark, 'Start from a section', 'Insert a pattern and change the words. The styling is already decided.' ),
			K.iconCard( K.ICON.chart, 'Watch it hold up', 'Spacing is set by the system, so long copy does not break the layout.' ),
			K.iconCard( K.ICON.users, 'Hand it over', 'The next person finds the control where they would look for it.' ),
		], { pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-detail-tabs', 'Feature detail — tabs', 'Features', 'orange', false, K => [
		K.section( [ K.intro( 'One panel, three tabs', 'Style, layout, advanced' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [ { n: 'lumen/tabs', t: [ 'Everything a block can do sits behind three tabs, in the same order on every block, so the second block you learn takes no time at all.' ] } ] ) ],
			{ pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-detail-scroller', 'Feature detail — scroller', 'Features', 'fuchsia', false, K => [
		K.section( [ K.intro( 'At a glance', 'The controls you will use most' ) ], { bg: K.P.wash, pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [ { n: 'lumen/horizontal-scroller', t: [ 'Spacing', 'Colour', 'Motion' ] } ] ) ], { bg: K.P.wash, pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-detail-progress-circles', 'Feature detail — circles', 'Features', 'emerald', false, K => [
		K.section( [ K.intro( 'Coverage', 'Where the work has gone' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/progress-circle', a: { text: '100%', progressValue: '100', progressColor1: K.P.brand }, c: [] }, K.p( 'Blocks shipped', { textAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ { n: 'lumen/progress-circle', a: { text: '92%', progressValue: '92', progressColor1: K.P.brand }, c: [] }, K.p( 'Strings translated', { textAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ { n: 'lumen/progress-circle', a: { text: '78%', progressValue: '78', progressColor1: K.P.brand }, c: [] }, K.p( 'Docs written', { textAlign: 'center' } ) ], { contentAlign: 'center' } ),
		], { pad: K.PAD( 16, 88 ) } ),
	] ),

	/* ══════════════════════════ Stats ══════════════════════════ */

	P( 'lumen-stats-band', 'Stats — four figures', 'Stats', 'amber', false, K => [
		K.section( [ K.stat( '47', 'Blocks included' ), K.stat( '3', 'Breakpoints per control' ), K.stat( '10', 'Entrance animations' ), K.stat( '0', 'Lines of CSS required' ) ],
			{ bg: K.P.wash, pad: K.PAD( 64 ) } ),
	] ),

	P( 'lumen-stats-night', 'Stats — on night', 'Stats', 'emerald', true, K => [
		K.section( [ K.intro( 'By the numbers', 'What it adds up to' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.stat( '120k', 'Active installs' ), K.stat( '4.9', 'Average rating' ), K.stat( '11', 'Years shipping' ) ],
			{ pad: K.PAD( 24, 88 ) } ),
	] ),

	// `stat()` is itself a column, so it cannot go inside `card()` — a column
	// nested directly in a column is not a shape lumen/column will accept, and
	// the count-up inside it comes back invalid. The figure goes in directly.
	P( 'lumen-stats-cards', 'Stats — as cards', 'Stats', 'indigo', false, K => {
		const figure = ( n, label ) => K.card( [
			{ n: 'lumen/count-up', a: { text: n, textColor1: K.accent, textAlign: 'center' }, c: [] },
			K.p( label, { textAlign: 'center' } ),
		], { contentAlign: 'center' } )
		return [ K.section( [
			figure( '99.9%', 'Uptime last year' ),
			figure( '38ms', 'Median render time' ),
			figure( '2.1MB', 'Total page weight' ),
		], { bg: K.N.canvas, pad: K.PAD( 72 ) } ) ]
	} ),

	P( 'lumen-stats-three-large', 'Stats — three large', 'Stats', 'rose', false, K => [
		K.section( [ K.intro( null, 'Numbers worth putting on the page' ) ], { bg: K.P.wash, pad: K.PAD( 72, 0 ) } ),
		K.section( [ K.stat( '3×', 'Faster to build' ), K.stat( '80%', 'Fewer support tickets' ), K.stat( '1', 'Panel to learn' ) ],
			{ bg: K.P.wash, pad: K.PAD( 16, 80 ) } ),
	] ),

	/* ═════════════════════════ Pricing ═════════════════════════ */

	P( 'lumen-pricing-three-tier', 'Pricing — three tiers', 'Pricing', 'amber', false, K => [
		K.section( [ K.intro( 'Pricing', 'Pick a plan, change it whenever', 'Every plan includes the whole block library. The difference is how many sites you put it on.' ) ],
			{ pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN(), ac: { 'lumen/icon-list': K.items( [ 'All 47 blocks', 'Global design system', 'One year of updates' ] ) },
				t: [ 'Personal', '$', '49', '/year', 'One site', null, 'Choose Personal' ] } ] ),
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN( { containerBackgroundColor: K.P.wash, containerBorderColor: K.P.brand, containerBorderWidth: K.EDGE( 2 ) } ),
				ac: { 'lumen/icon-list': K.items( [ 'Everything in Personal', 'Copy styling between sites', 'Priority support' ] ) },
				t: [ 'Studio', '$', '99', '/year', 'Up to ten sites', null, 'Choose Studio' ] } ] ),
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN(), ac: { 'lumen/icon-list': K.items( [ 'Everything in Studio', 'Client handover mode', 'Role-based editing limits' ] ) },
				t: [ 'Agency', '$', '199', '/year', 'Unlimited sites', null, 'Choose Agency' ] } ] ),
		], { pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-pricing-two-tier', 'Pricing — two tiers', 'Pricing', 'indigo', false, K => [
		K.section( [ K.intro( 'Simple pricing', 'Two plans, no upsell path' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN(), ac: { 'lumen/icon-list': K.items( [ 'Every block', 'Design system', 'Email support' ] ) },
				t: [ 'Monthly', '$', '9', '/month', 'Cancel any time', null, 'Start monthly' ] } ] ),
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN( { containerBackgroundColor: K.P.wash, containerBorderColor: K.P.brand, containerBorderWidth: K.EDGE( 2 ) } ),
				ac: { 'lumen/icon-list': K.items( [ 'Everything monthly has', 'Two months free', 'Priority support' ] ) },
				t: [ 'Yearly', '$', '90', '/year', 'Best value', null, 'Start yearly' ] } ] ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-pricing-night', 'Pricing — on night', 'Pricing', 'violet', true, K => [
		K.section( [ K.intro( 'Plans', 'Priced per site, not per seat' ) ], { pad: K.PAD( 88, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN(), ac: { 'lumen/icon-list': K.items( [ 'One site', 'All blocks', 'Updates for a year' ] ) },
				t: [ 'Solo', '$', '59', '/year', 'For one project', null, 'Choose Solo' ] } ] ),
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN( { containerBackgroundColor: K.N.night, containerBorderColor: K.P.brand, containerBorderWidth: K.EDGE( 2 ) } ),
				ac: { 'lumen/icon-list': K.items( [ 'Ten sites', 'Shared style presets', 'Priority support' ] ) },
				t: [ 'Studio', '$', '129', '/year', 'For a small team', null, 'Choose Studio' ] } ] ),
			K.col( [ { n: 'lumen/pricing-box', a: K.OWN(), ac: { 'lumen/icon-list': K.items( [ 'Unlimited sites', 'Handover mode', 'Role limits' ] ) },
				t: [ 'Agency', '$', '249', '/year', 'For client work', null, 'Choose Agency' ] } ] ),
		], { pad: K.PAD( 24, 96 ) } ),
	] ),

	P( 'lumen-pricing-single', 'Pricing — one plan', 'Pricing', 'emerald', false, K => [
		K.section( [ K.col( [
			K.sub( 'One price', { textAlign: 'center' } ),
			K.h( 'Everything, for everyone, forever', { textTag: 'h2', textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 80, 24 ) } ),
		K.section( [ K.col( [ { n: 'lumen/pricing-box',
			a: K.OWN( { containerBorderColor: K.P.brand, containerBorderWidth: K.EDGE( 2 ), containerPadding: K.EDGE( 40 ) } ),
			ac: { 'lumen/icon-list': K.items( [ 'All 47 blocks', 'Global design system', 'Unlimited sites', 'Lifetime updates', 'Priority support' ] ) },
			t: [ 'Lifetime', '$', '299', 'once', 'No renewal, no seats', null, 'Buy once' ] } ] ) ],
		{ bg: K.P.wash, pad: K.PAD( 0, 88 ) } ),
	] ),

	/* ══════════════════════ Testimonials ══════════════════════ */

	P( 'lumen-testimonial-single', 'Testimonial — single quote', 'Testimonials', 'amber', false, K => [
		K.section( [ K.col( [
			{ n: 'lumen/blockquote', a: K.OWN( { containerBorderColor: K.P.tint, containerPadding: K.EDGE( 44 ) } ),
				t: [ 'We handed the site over on a Friday and heard nothing on Monday. For a client build, that is the highest praise there is.' ] },
			K.h( 'Mai Nguyen', { textTag: 'h4', textAlign: 'center' } ),
			K.sub( 'Creative director, Studio Bên', { textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-testimonials-three', 'Testimonials — three up', 'Testimonials', 'sky', false, K => [
		K.section( [ K.intro( 'From the people using it', 'What builders say' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/testimonial', a: K.OWN(), drop: NO_IMG, t: [ 'The inspector search alone saved us an afternoon a week.', 'Linh Tran', 'Front-end lead' ] } ] ),
			K.col( [ { n: 'lumen/testimonial', a: K.OWN(), drop: NO_IMG, t: [ 'Rebranding forty pages was one change. I had budgeted three days.', 'Duc Pham', 'Freelance designer' ] } ] ),
			K.col( [ { n: 'lumen/testimonial', a: K.OWN(), drop: NO_IMG, t: [ 'Our editors stopped filing tickets about spacing. That is the whole review.', 'Sarah Whitfield', 'Content manager' ] } ] ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-testimonial-night', 'Testimonial — on night', 'Testimonials', 'teal', true, K => [
		K.section( [ K.col( [
			{ n: 'lumen/blockquote', a: K.OWN( { containerBackgroundColor: K.N.nightRaised, containerBorderColor: K.N.nightBorder, containerPadding: K.EDGE( 48 ) } ),
				t: [ 'I have shipped page builders for a decade. This is the first one where the handover document is one page long.' ] },
			K.h( 'Alex Moreau', { textTag: 'h4', textAlign: 'center' } ),
			K.sub( 'Technical director, Fieldwork', { textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 96 ) } ),
	] ),

	P( 'lumen-testimonials-two', 'Testimonials — two up', 'Testimonials', 'rose', false, K => [
		K.section( [
			K.col( [ { n: 'lumen/testimonial', a: K.OWN( { containerPadding: K.EDGE( 36 ) } ), drop: NO_IMG,
				t: [ 'The reset beside every control is the feature nobody advertises and everybody needs.', 'Priya Raman', 'Design lead' ] } ] ),
			K.col( [ { n: 'lumen/testimonial', a: K.OWN( { containerPadding: K.EDGE( 36 ) } ), drop: NO_IMG,
				t: [ 'We stopped writing custom CSS for marketing pages entirely. That was the whole point.', 'Tom Reilly', 'Engineering manager' ] } ] ),
		], { pad: K.PAD( 88 ) } ),
	] ),

	/* ═══════════════════════════ Team ═══════════════════════════ */

	P( 'lumen-team-three', 'Team — three members', 'Team', 'amber', false, K => [
		K.section( [ K.intro( 'The team', 'Who you will actually talk to' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Mai Nguyen', 'Creative director', 'Sets the direction and argues for the reader when nobody else will.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Duc Pham', 'Lead engineer', 'Writes the parts that have to keep working after everyone has gone home.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Linh Tran', 'Design systems', 'Keeps four hundred components speaking the same language.' ] } ] ),
		], { pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-team-four', 'Team — four members', 'Team', 'indigo', false, K => [
		K.section( [ K.intro( 'People', 'Small team, long memory' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/team-member', a: K.OWN( { containerPadding: K.EDGE( 24 ) } ), drop: NO_IMG, t: [ 'Ana Costa', 'Founder', 'Started it after one handover too many.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN( { containerPadding: K.EDGE( 24 ) } ), drop: NO_IMG, t: [ 'Yusuf Demir', 'Blocks', 'Owns the parts you touch every day.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN( { containerPadding: K.EDGE( 24 ) } ), drop: NO_IMG, t: [ 'Hana Sato', 'Support', 'Answers before you finish typing.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN( { containerPadding: K.EDGE( 24 ) } ), drop: NO_IMG, t: [ 'Marc Ellis', 'Docs', 'Writes the page you find at 2am.' ] } ] ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-team-night', 'Team — on night', 'Team', 'fuchsia', true, K => [
		K.section( [ K.intro( 'Behind it', 'Three people and a long changelog' ) ], { pad: K.PAD( 88, 0 ) } ),
		K.section( [
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Iris Kovács', 'Product', 'Decides what not to build.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Samir Haddad', 'Engineering', 'Keeps the block markup backwards compatible.' ] } ] ),
			K.col( [ { n: 'lumen/team-member', a: K.OWN(), drop: NO_IMG, t: [ 'Noor Abbasi', 'Design', 'Owns the panel you spend all day in.' ] } ] ),
		], { pad: K.PAD( 24, 96 ) } ),
	] ),

	/* ═══════════════════════ Call to action ═══════════════════════ */

	P( 'lumen-cta-banner', 'Call to action — banner', 'Call to Action', 'amber', false, K => [
		K.section( [ K.col( [ {
			n: 'lumen/call-to-action',
			a: K.OWN( { containerBackgroundColor: K.P.deep, containerBorderWidth: K.EDGE( 0 ), containerBorderRadius: 16, containerPadding: { top: 56, right: 40, bottom: 56, left: 40 } } ),
			aa: {
				'lumen/heading': { textColor1: '#ffffff', showTopLine: false },
				'lumen/text': { textColor1: K.P.tint },
				'lumen/button': { buttonBackgroundColor: '#ffffff', textColor1: K.P.deep },
			},
			t: [ 'Start with a section, not a blank page', 'Insert any pattern from the library and change the words. The styling is already decided.', 'Open the design library' ],
		} ] ) ], { pad: K.PAD( 72 ) } ),
	] ),

	P( 'lumen-cta-night-band', 'Call to action — night band', 'Call to Action', 'sky', true, K => [
		K.section( [ K.col( [
			K.h( 'Ready to stop writing CSS for marketing pages?', { textTag: 'h2', textAlign: 'center' } ),
			K.p( 'Install it, open a page, insert a section. That is the whole onboarding.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Install Lumen Blocks' ), K.ghost( 'Read the docs' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-cta-split', 'Call to action — split', 'Call to Action', 'amber', false, K => [
		K.section( [
			K.col( [ K.h( 'Ready when you are', { textTag: 'h2' } ), K.p( 'No account, no trial timer. Install the plugin and the whole library is there.' ) ] ),
			K.col( [ K.btns( [ K.btn( 'Install Lumen Blocks' ), K.ghost( 'Read the docs' ) ], { innerBlockJustify: 'flex-end' } ) ], { contentAlign: 'right' } ),
		], { bg: K.P.wash, pad: K.PAD( 56 ) } ),
	] ),

	P( 'lumen-cta-newsletter', 'Call to action — newsletter', 'Call to Action', 'teal', false, K => [
		K.section( [ K.card( [
			K.icon( K.ICON.mail, { iconSize: 40, contentAlign: 'center' } ),
			K.h( 'One email when something ships', { textTag: 'h3', textAlign: 'center' } ),
			K.p( 'Release notes only. No drip sequence, no webinar invitations.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Subscribe' ) ], { innerBlockJustify: 'center' } ),
		], { containerPadding: K.EDGE( 44 ), contentAlign: 'center' } ) ], { bg: K.N.canvas, pad: K.PAD( 72 ) } ),
	] ),

	P( 'lumen-cta-with-checklist', 'Call to action — with checklist', 'Call to Action', 'emerald', false, K => [
		K.section( [
			K.col( [
				K.sub( 'Free to start' ),
				K.h( 'Everything in the library, from today', { textTag: 'h2' } ),
				K.btns( [ K.btn( 'Get the plugin' ) ] ),
			] ),
			K.card( [ K.checks( [ 'No account required', 'No usage limits', 'Works with any block theme', 'Uninstall leaves your content intact' ] ) ] ),
		], { bg: K.P.wash, pad: K.PAD( 80 ) } ),
	] ),

	P( 'lumen-cta-minimal', 'Call to action — minimal', 'Call to Action', 'slate', false, K => [
		K.section( [ K.col( [
			K.h( 'Try it on one page first', { textTag: 'h2', textAlign: 'center' } ),
			K.btns( [ K.btn( 'Install now' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 64 ) } ),
	] ),

	P( 'lumen-cta-violet-boxed', 'Call to action — boxed', 'Call to Action', 'violet', false, K => [
		K.section( [ K.featured( [
			K.sub( 'Limited', { textAlign: 'center' } ),
			K.h( 'Two months free on annual plans', { textTag: 'h2', textAlign: 'center' } ),
			K.p( 'Until the end of the month, then it goes back to the usual price.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Claim it' ) ], { innerBlockJustify: 'center' } ),
		], { containerPadding: K.EDGE( 48 ), contentAlign: 'center' } ) ], { pad: K.PAD( 72 ) } ),
	] ),

	/* ═══════════════════════════ FAQ ═══════════════════════════ */

	P( 'lumen-faq-accordion', 'FAQ — accordion', 'FAQ', 'amber', false, K => [
		K.section( [ K.intro( 'Questions', 'Before you ask' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [
			{ n: 'lumen/accordion', t: [ 'Does it work with my theme?', 'Yes. Lumen reads widths and colours from your theme first, and only overrides what you change.' ] },
			{ n: 'lumen/accordion', t: [ 'What happens if I deactivate it?', 'Your content stays. The blocks fall back to their saved markup, so pages keep rendering.' ] },
			{ n: 'lumen/accordion', t: [ 'Can I limit what editors can change?', 'Yes. The role manager can hide the styling tabs and leave only the content fields.' ] },
			{ n: 'lumen/accordion', t: [ 'Is there a page builder to learn?', 'No. Everything happens in the block editor you already use.' ] },
		] ) ], { pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-faq-two-column', 'FAQ — two columns', 'FAQ', 'indigo', false, K => [
		K.section( [ K.intro( 'Support', 'Common questions' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [
				{ n: 'lumen/accordion', t: [ 'How do updates work?', 'Through the normal plugin updater. Block markup stays backwards compatible across major versions.' ] },
				{ n: 'lumen/accordion', t: [ 'Is there a multisite licence?', 'Network activation counts as one site on Agency plans.' ] },
			] ),
			K.col( [
				{ n: 'lumen/accordion', t: [ 'Can I export my design system?', 'Yes, as JSON, and import it into another site.' ] },
				{ n: 'lumen/accordion', t: [ 'Do you offer refunds?', 'Thirty days, no questions, including on lifetime licences.' ] },
			] ),
		], { bg: K.N.canvas, pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-faq-night', 'FAQ — on night', 'FAQ', 'violet', true, K => [
		K.section( [ K.intro( 'Answers', 'The ones people actually ask' ) ], { pad: K.PAD( 88, 0 ) } ),
		K.section( [ K.col( [
			{ n: 'lumen/accordion', t: [ 'Will this slow my site down?', 'Only the CSS a page uses is written into it, so an unused block costs a reader nothing.' ] },
			{ n: 'lumen/accordion', t: [ 'Does it work with page caching?', 'Yes. Everything renders to static markup at save time.' ] },
			{ n: 'lumen/accordion', t: [ 'What about accessibility?', 'Motion respects reduced-motion, and every interactive block ships with roles and labels.' ] },
		] ) ], { pad: K.PAD( 16, 96 ) } ),
	] ),

	P( 'lumen-faq-with-cta', 'FAQ — with a way out', 'FAQ', 'sky', false, K => [
		K.section( [ K.intro( 'Still stuck?', 'Read these first' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [
			{ n: 'lumen/accordion', t: [ 'Where do I set global colours?', 'Lumen → Design System. Everything on the site follows what you set there.' ] },
			{ n: 'lumen/accordion', t: [ 'Why is my block wider than the page?', 'Check the Columns block content width. Lumen reads it from your theme by default.' ] },
		] ) ], { pad: K.PAD( 16, 24 ) } ),
		K.section( [ K.col( [
			K.p( 'Nothing here matching? Support answers on weekdays, usually the same hour.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Contact support' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 0, 80 ) } ),
	] ),

	/* ═════════════════════════ Process ═════════════════════════ */

	P( 'lumen-steps-numbered', 'Steps — numbered cards', 'Process', 'amber', false, K => [
		K.section( [ K.intro( 'How it goes', 'Three steps to a finished page' ) ], { bg: K.P.wash, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.card( [ { n: 'lumen/number-box', a: { text: '01', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'Insert a section', { textTag: 'h3' } ), K.p( 'Pick a pattern. It arrives styled, not as a wireframe you have to finish.' ) ] ),
			K.card( [ { n: 'lumen/number-box', a: { text: '02', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'Change the words', { textTag: 'h3' } ), K.p( 'Type over the copy. Nothing reflows into a mess.' ) ] ),
			K.card( [ { n: 'lumen/number-box', a: { text: '03', textColor1: '#ffffff', containerBackgroundColor: K.P.dark }, c: [] },
				K.h( 'Set your colours once', { textTag: 'h3' } ), K.p( 'Open the design system and every section updates together.' ) ] ),
		], { bg: K.P.wash, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-steps-timeline', 'Steps — timeline', 'Process', 'teal', false, K => [
		K.section( [ K.intro( 'The engagement', 'What the four weeks look like' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [
			{ n: 'lumen/timeline', a: { text: 'Week 1', textColor1: K.accent }, c: [ K.col( [ K.h( 'Discovery', { textTag: 'h4' } ), K.p( 'We read what you have and agree what the site is for.' ) ] ) ] },
			{ n: 'lumen/timeline', a: { text: 'Week 2', textColor1: K.accent }, c: [ K.col( [ K.h( 'Design system', { textTag: 'h4' } ), K.p( 'Colours, type and spacing, set once and signed off once.' ) ] ) ] },
			{ n: 'lumen/timeline', a: { text: 'Week 3', textColor1: K.accent }, c: [ K.col( [ K.h( 'Build', { textTag: 'h4' } ), K.p( 'Pages assembled from sections, not from scratch.' ) ] ) ] },
			{ n: 'lumen/timeline', a: { text: 'Week 4', textColor1: K.accent }, c: [ K.col( [ K.h( 'Handover', { textTag: 'h4' } ), K.p( 'One session, one page of notes, and it is yours.' ) ] ) ] },
		] ) ], { pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-steps-night', 'Steps — on night', 'Process', 'orange', true, K => [
		K.section( [ K.intro( 'Getting started', 'Three moves and you are building' ) ], { pad: K.PAD( 88, 0 ) } ),
		K.section( [
			K.card( [ { n: 'lumen/number-box', a: { text: '1', textColor1: K.N.night, containerBackgroundColor: K.P.base }, c: [] },
				K.h( 'Install', { textTag: 'h3' } ), K.p( 'From the plugin directory, like anything else.' ) ] ),
			K.card( [ { n: 'lumen/number-box', a: { text: '2', textColor1: K.N.night, containerBackgroundColor: K.P.base }, c: [] },
				K.h( 'Open a page', { textTag: 'h3' } ), K.p( 'The library button sits in the editor toolbar.' ) ] ),
			K.card( [ { n: 'lumen/number-box', a: { text: '3', textColor1: K.N.night, containerBackgroundColor: K.P.base }, c: [] },
				K.h( 'Insert', { textTag: 'h3' } ), K.p( 'Pick a section and start typing over it.' ) ] ),
		], { pad: K.PAD( 24, 96 ) } ),
	] ),

	P( 'lumen-steps-progress', 'Steps — with progress', 'Process', 'emerald', false, K => [
		K.section( [ K.intro( 'Where we are', 'The roadmap, honestly' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [ K.col( [
			K.h( 'Block library', { textTag: 'h4' } ),
			{ n: 'lumen/progress-bar', a: { text: '100%', progressValue: '100', progressColor1: K.P.brand }, c: [] },
			K.h( 'Design system export', { textTag: 'h4' } ),
			{ n: 'lumen/progress-bar', a: { text: '70%', progressValue: '70', progressColor1: K.P.brand }, c: [] },
			K.h( 'Pattern authoring', { textTag: 'h4' } ),
			{ n: 'lumen/progress-bar', a: { text: '35%', progressValue: '35', progressColor1: K.P.brand }, c: [] },
		] ) ], { bg: K.N.canvas, pad: K.PAD( 16, 88 ) } ),
	] ),

	/* ═════════════════════════ Content ═════════════════════════ */

	P( 'lumen-checklist-split', 'Checklist beside copy', 'Content', 'amber', false, K => [
		K.section( [
			K.col( [
				K.sub( 'Handover' ),
				K.h( 'What the client gets on day one', { textTag: 'h2' } ),
				K.p( 'A site they can change without breaking, and controls that stop them having to ask you first.' ),
			] ),
			K.card( [ K.checks( [
				'Every colour in one panel',
				'Spacing presets, not guesses',
				'Per-device controls on every value',
				'A reset beside every override',
				'Custom CSS scoped per block',
			] ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-content-two-column', 'Content — two columns', 'Content', 'slate', false, K => [
		K.section( [
			K.col( [ K.h( 'Why another block plugin', { textTag: 'h2' } ),
				K.p( 'Because most of them solve the first afternoon and none of them solve the second year. The controls that matter are the ones still legible when somebody else opens the site.' ) ] ),
			K.col( [ K.h( 'What we left out', { textTag: 'h3' } ),
				K.p( 'No shortcodes, no proprietary storage, no lock-in on deactivate. Everything saves as standard block markup, which is the only real guarantee a plugin can offer.' ) ] ),
		], { pad: K.PAD( 80 ) } ),
	] ),

	P( 'lumen-notice-highlight', 'Highlighted notice', 'Content', 'amber', false, K => [
		K.section( [ K.col( [ {
			n: 'lumen/notification',
			a: K.OWN( { containerBackgroundColor: K.P.wash, containerBorderColor: K.P.brand, containerBorderRadius: 12, containerPadding: K.EDGE( 32 ) } ),
			t: [ 'One thing to set before you publish', 'Point the design library at your own endpoint, or keep using the patterns that ship with the plugin.', 'Read the setup note' ],
		} ] ) ], { pad: K.PAD( 48 ) } ),
	] ),

	P( 'lumen-expand-longform', 'Long copy with read more', 'Content', 'slate', false, K => [
		K.section( [ K.col( [
			K.h( 'The honest version', { textTag: 'h2' } ),
			{ n: 'lumen/expand', t: [
				'Most block plugins are judged on the day they are installed. That is the wrong day to judge one.',
				'Read the rest',
				'The day that matters is eighteen months later, when somebody who has never met you opens the site to change a phone number. If that person can find the setting, the plugin worked. If they file a ticket, it did not — however good the first afternoon felt. Every control in Lumen is built for that second person: named plainly, grouped where you would look, and resettable one value at a time.',
				'Show less',
			] },
		] ) ], { pad: K.PAD( 80 ) } ),
	] ),

	P( 'lumen-content-quote-callout', 'Content — pull quote', 'Content', 'fuchsia', false, K => [
		K.section( [
			K.col( [ K.h( 'On restraint', { textTag: 'h2' } ),
				K.p( 'A block library is judged on what it refuses to add. Every control that ships is one more thing the next person has to understand before they can change a heading.' ) ] ),
			K.col( [ { n: 'lumen/blockquote', a: K.OWN( { containerBackgroundColor: K.P.wash, containerBorderColor: K.P.tint, containerPadding: K.EDGE( 36 ) } ),
				t: [ 'The best feature we shipped last year was the one we removed.' ] } ] ),
		], { pad: K.PAD( 80 ) } ),
	] ),

	P( 'lumen-content-icon-list-pair', 'Content — two lists', 'Content', 'sky', false, K => [
		K.section( [ K.intro( 'Scope', 'What it does and does not do' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.card( [ K.h( 'It does', { textTag: 'h3' } ), K.checks( [ 'Layout and spacing', 'Global colour and type', 'Per-device controls', 'Scoped custom CSS' ] ) ] ),
			K.card( [ K.h( 'It does not', { textTag: 'h3' } ), K.checks( [ 'Replace your theme', 'Manage your content model', 'Ship a form builder', 'Lock your markup in' ] ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-content-night-statement', 'Content — statement', 'Content', 'indigo', true, K => [
		K.section( [ K.col( [
			K.sub( 'Our one rule', { textAlign: 'center' } ),
			K.h( 'If the next person cannot find it, it does not count as built', { textTag: 'h2', textAlign: 'center' } ),
			K.p( 'Everything in this plugin is measured against somebody who has never met you opening the site eighteen months from now.', { textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 96 ) } ),
	] ),

	P( 'lumen-content-three-text', 'Content — three columns of copy', 'Content', 'teal', false, K => [
		K.section( [ K.intro( 'Principles', 'Three things we optimise for' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.col( [ K.h( 'Legibility', { textTag: 'h4' } ), K.p( 'A control named for what it does, not for how it is implemented.' ) ] ),
			K.col( [ K.h( 'Reversibility', { textTag: 'h4' } ), K.p( 'Every value can be handed back to the system it came from.' ) ] ),
			K.col( [ K.h( 'Portability', { textTag: 'h4' } ), K.p( 'Standard block markup, so deactivating costs you nothing.' ) ] ),
		], { pad: K.PAD( 16, 88 ) } ),
	] ),

	P( 'lumen-content-divider-lead', 'Content — lead with divider', 'Content', 'rose', false, K => [
		K.section( [ K.col( [
			K.sub( 'Editorial' ),
			K.h( 'Notes on building for somebody else', { textTag: 'h2' } ),
			{ n: 'lumen/divider', a: { height: 24, color: K.P.brand }, c: [] },
			K.p( 'The brief says one thing and the handover says another. This is about closing that gap with controls rather than documentation.' ),
			K.btns( [ K.ghost( 'Read the essay' ) ] ),
		] ) ], { pad: K.PAD( 80 ) } ),
	] ),

	P( 'lumen-content-featured-panel', 'Content — featured panel', 'Content', 'violet', false, K => [
		K.section( [ K.featured( [
			K.icon( K.ICON.spark, { iconSize: 40 } ),
			K.h( 'New in this release', { textTag: 'h3' } ),
			K.p( 'Applied settings now lists everything a block sets in one place, with a jump to each control and a reset for one value at a time.' ),
			K.btns( [ K.ghost( 'Full changelog' ) ] ),
		], { containerPadding: K.EDGE( 40 ) } ) ], { pad: K.PAD( 72 ) } ),
	] ),

	/* ═════════════════════════ Contact ═════════════════════════ */

	P( 'lumen-contact-details', 'Contact — three ways', 'Contact', 'sky', false, K => [
		K.section( [ K.intro( 'Get in touch', 'Three ways, all of them answered' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.iconCard( K.ICON.mail, 'Email', 'hello@example.com — weekdays, usually within the hour.' ),
			K.iconCard( K.ICON.phone, 'Phone', '+84 24 1234 5678 — 9am to 6pm, Indochina time.' ),
			K.iconCard( K.ICON.pin, 'Studio', '12 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội.' ),
		], { pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-contact-split', 'Contact — copy beside details', 'Contact', 'emerald', false, K => [
		K.section( [
			K.col( [
				K.sub( 'Say hello' ),
				K.h( 'Tell us what you are building', { textTag: 'h2' } ),
				K.p( 'A paragraph is plenty. We will come back with questions rather than a proposal template.' ),
				K.btns( [ K.btn( 'Start a conversation' ) ] ),
			] ),
			K.card( [ K.checks( [ 'hello@example.com', '+84 24 1234 5678', 'Mon–Fri, 9am–6pm ICT', 'Hà Nội, Việt Nam' ] ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 88 ) } ),
	] ),

	P( 'lumen-contact-night', 'Contact — on night', 'Contact', 'slate', true, K => [
		K.section( [ K.col( [
			K.h( 'Work with us', { textTag: 'h2', textAlign: 'center' } ),
			K.p( 'We take on four projects a quarter. The next slot opens in March.', { textAlign: 'center' } ),
			K.btns( [ K.btn( 'Enquire' ), K.ghost( 'See past work' ) ], { innerBlockJustify: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 88 ) } ),
	] ),

	/* ══════════════════════ Social proof ══════════════════════ */

	P( 'lumen-logos-row', 'Social proof — icon row', 'Social Proof', 'slate', false, K => [
		K.section( [ K.col( [ K.p( 'Used by teams at', { textAlign: 'center' } ) ], { contentAlign: 'center' } ) ],
			{ bg: K.N.canvas, pad: K.PAD( 56, 8 ) } ),
		K.section( [
			K.col( [ K.icon( K.ICON.layers, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ K.icon( K.ICON.globe, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ K.icon( K.ICON.bolt, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ K.icon( K.ICON.chart, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ),
			K.col( [ K.icon( K.ICON.shield, { iconSize: 34, contentAlign: 'center' } ) ], { contentAlign: 'center' } ),
		], { bg: K.N.canvas, pad: K.PAD( 0, 56 ) } ),
	] ),

	P( 'lumen-proof-quote-stats', 'Social proof — quote and figures', 'Social Proof', 'indigo', false, K => [
		K.section( [ K.col( [
			{ n: 'lumen/blockquote', a: K.OWN( { containerBackgroundColor: K.P.wash, containerBorderColor: K.P.tint, containerPadding: K.EDGE( 40 ) } ),
				t: [ 'We replaced three plugins with this one and the site got faster.' ] },
		] ) ], { pad: K.PAD( 80, 16 ) } ),
		K.section( [ K.stat( '3', 'Plugins removed' ), K.stat( '−41%', 'Page weight' ), K.stat( '2 days', 'Migration time' ) ],
			{ pad: K.PAD( 0, 80 ) } ),
	] ),

	P( 'lumen-proof-night-band', 'Social proof — night band', 'Social Proof', 'amber', true, K => [
		K.section( [ K.col( [
			K.sub( 'Trusted since 2014', { textAlign: 'center' } ),
			K.h( 'Twelve years of not breaking your markup', { textTag: 'h2', textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { pad: K.PAD( 72, 24 ) } ),
		K.section( [ K.stat( '120k', 'Sites' ), K.stat( '4.9★', 'Rating' ), K.stat( '340', 'Releases' ) ], { pad: K.PAD( 0, 80 ) } ),
	] ),

	/* ═══════════════════════ Comparison ═══════════════════════ */

	P( 'lumen-compare-two', 'Comparison — before and after', 'Comparison', 'rose', false, K => [
		K.section( [ K.intro( 'The difference', 'What changes on day one' ) ], { pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.card( [ K.h( 'Before', { textTag: 'h3' } ), K.checks( [ 'Colours pasted per block', 'Spacing eyeballed each time', 'CSS file nobody dares touch', 'Handover call every quarter' ] ) ],
				{ containerBackgroundColor: K.N.canvas } ),
			K.featured( [ K.h( 'After', { textTag: 'h3' } ), K.checks( [ 'One panel drives the palette', 'Spacing comes from presets', 'Per-block CSS, scoped', 'A handover that is one page' ] ) ] ),
		], { pad: K.PAD( 24, 88 ) } ),
	] ),

	P( 'lumen-compare-three-plans', 'Comparison — three columns', 'Comparison', 'teal', false, K => [
		K.section( [ K.intro( 'Which one', 'Pick by what you are building' ) ], { bg: K.N.canvas, pad: K.PAD( 80, 0 ) } ),
		K.section( [
			K.card( [ K.h( 'One site', { textTag: 'h4' } ), K.p( 'A blog, a portfolio, a shop you run yourself.' ), K.checks( [ 'All blocks', 'Design system' ] ) ] ),
			K.card( [ K.h( 'A few sites', { textTag: 'h4' } ), K.p( 'Freelance work where each client is separate.' ), K.checks( [ 'All blocks', 'Shared presets', 'Priority support' ] ) ] ),
			K.card( [ K.h( 'Client work', { textTag: 'h4' } ), K.p( 'Agencies handing sites to people who did not build them.' ), K.checks( [ 'Everything', 'Handover mode', 'Role limits' ] ) ] ),
		], { bg: K.N.canvas, pad: K.PAD( 24, 88 ) } ),
	] ),

	/* ═══════════════════════ Closing ═══════════════════════ */

	P( 'lumen-closing-links', 'Closing — link columns', 'Closing', 'slate', true, K => [
		K.section( [
			K.col( [ K.h( 'Product', { textTag: 'h4' } ), K.checks( [ 'Blocks', 'Design system', 'Pricing', 'Changelog' ] ) ] ),
			K.col( [ K.h( 'Learn', { textTag: 'h4' } ), K.checks( [ 'Documentation', 'Guided tours', 'Patterns', 'Support' ] ) ] ),
			K.col( [ K.h( 'Company', { textTag: 'h4' } ), K.checks( [ 'About', 'Contact', 'Licence', 'Privacy' ] ) ] ),
		], { pad: K.PAD( 72 ) } ),
	] ),

	P( 'lumen-closing-signoff', 'Closing — sign-off', 'Closing', 'amber', false, K => [
		K.section( [ K.col( [
			K.icon( K.ICON.spark, { iconSize: 36, contentAlign: 'center' } ),
			K.h( 'Built in Hà Nội, licensed GPL', { textTag: 'h3', textAlign: 'center' } ),
			K.p( 'Fork it, change it, ship it. The licence says so and we mean it.', { textAlign: 'center' } ),
		], { contentAlign: 'center' } ) ], { bg: K.P.wash, pad: K.PAD( 64 ) } ),
	] ),
]
