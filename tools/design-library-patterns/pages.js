/**
 * Full page templates for a company website.
 *
 * A pattern is one section; these are whole pages — five to seven sections in
 * the order a visitor reads them. They go to the design library's Pages tab,
 * which shipped empty because the library points at no CDN.
 *
 * Each page opens one kit and stays on it. Mixing palettes inside a page is
 * what makes a site look assembled from a library rather than designed, so the
 * variety lives across the set, not within a page.
 */

const { kit } = require( './kit' )
const S = require( './sections' )

const Pg = ( id, label, category, palette, dark, build ) => {
	const K = kit( palette, dark )
	return { id, label, category, plan: 'free', theme: K.THEME, blocks: build( K, S ).flat() }
}

module.exports = [

	/* ══════════════════════════ Home ══════════════════════════ */

	Pg( 'lumen-page-home-corporate', 'Home — corporate', 'Home', 'indigo', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Established 2009',
			title: 'Infrastructure the country runs on',
			body: 'We design, build and maintain the systems that keep utilities, transport and public services working.',
			cta: 'What we do', alt: 'Talk to us',
		} ),
		S.logoRow( K, [ K.ICON.layers, K.ICON.globe, K.ICON.bolt, K.ICON.chart, K.ICON.shield ] ),
		S.intro( K, { eyebrow: 'Capabilities', title: 'Three practices, one delivery team' } ),
		S.iconCards( K, [
			[ K.ICON.layers, 'Engineering', 'Structural, civil and systems work from feasibility through to commissioning.' ],
			[ K.ICON.chart, 'Advisory', 'Business cases and options appraisals that survive scrutiny.' ],
			[ K.ICON.shield, 'Assurance', 'Independent review, safety cases and regulatory submissions.' ],
		] ),
		S.stats( K, [ [ '640', 'People' ], [ '31', 'Countries' ], [ '2.4bn', 'Under management' ], [ '16', 'Years' ] ] ),
		S.ctaBanner( K, { title: 'Tell us what you are building', body: 'A paragraph is enough to start. We will come back with questions, not a brochure.', cta: 'Start a conversation' } ),
	] ),

	Pg( 'lumen-page-home-saas', 'Home — software company', 'Home', 'violet', false, ( K, S ) => [
		S.heroSplit( K, {
			eyebrow: 'Now with audit logging',
			title: 'The operations platform your finance team will actually use',
			body: 'Approvals, spend and reporting in one place, with an audit trail that satisfies your auditors the first time.',
			cta: 'Book a demo',
			panelIcon: K.ICON.chart, panelTitle: 'Month-end in a day',
			panelBody: 'Reconciliation runs continuously, so close is a review rather than a rebuild.',
		} ),
		S.logoRow( K, [ K.ICON.globe, K.ICON.bolt, K.ICON.layers, K.ICON.users ] ),
		S.intro( K, { eyebrow: 'Platform', title: 'Everything finance asks for, already built', bg: K.N.canvas } ),
		S.iconCards( K, [
			[ K.ICON.lock, 'Controls', 'Approval limits by role, entity and cost centre.' ],
			[ K.ICON.refresh, 'Reconciliation', 'Continuous matching against your ledger.' ],
			[ K.ICON.chart, 'Reporting', 'Board-ready packs generated, not assembled.' ],
		], { bg: K.N.canvas } ),
		S.testimonials( K, [
			[ 'Close went from nine days to two. Nobody has asked for the old spreadsheet back.', 'Priya Raman', 'Financial controller' ],
			[ 'The audit trail answered every question before it was asked.', 'Tom Reilly', 'Head of finance' ],
			[ 'We onboarded three entities in a week without help.', 'Hana Sato', 'Group accountant' ],
		] ),
		S.ctaBanner( K, { title: 'See it against your own numbers', body: 'Thirty minutes, your data, no slides.', cta: 'Book a demo' } ),
	] ),

	Pg( 'lumen-page-home-agency', 'Home — creative agency', 'Home', 'rose', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Brand and digital',
			title: 'We make the work the loudest thing in the room',
			body: 'A small studio that takes four projects a quarter and finishes all of them.',
			cta: 'See the work', alt: 'How we work',
		} ),
		S.intro( K, { eyebrow: 'Services', title: 'What we are hired for' } ),
		S.iconCards( K, [
			[ K.ICON.palette, 'Brand identity', 'Naming, marks, and the system that keeps them consistent.' ],
			[ K.ICON.layers, 'Digital product', 'Sites and apps designed to be handed over, not maintained by us forever.' ],
			[ K.ICON.spark, 'Campaign', 'Launches that hold together across every surface they land on.' ],
		] ),
		S.quote( K, {
			text: 'They argued with the brief in week one and were right. The work is better for it.',
			name: 'Mai Nguyen', role: 'Marketing director, Bến Group',
		} ),
		S.steps( K, [
			[ 'Discovery', 'We read what you have and agree what the work is for.' ],
			[ 'Design', 'Directions, then one direction, taken all the way.' ],
			[ 'Handover', 'A system your team can run without calling us.' ],
		], { bg: K.N.canvas } ),
		S.ctaPlain( K, { title: 'The next slot opens in March', body: 'Four projects a quarter, so we book early.', cta: 'Enquire', alt: 'See past work' } ),
	] ),

	Pg( 'lumen-page-home-consulting', 'Home — consultancy', 'Home', 'slate', false, ( K, S ) => [
		S.heroSplit( K, {
			eyebrow: 'Strategy and operations',
			title: 'Advice you can act on by Monday',
			body: 'We work inside your team, not beside it, and leave when the change is holding on its own.',
			cta: 'How we engage',
			panelIcon: K.ICON.clock, panelTitle: 'Twelve weeks, typically',
			panelBody: 'Long enough to change something, short enough that it stays urgent.',
		} ),
		S.stats( K, [ [ '140', 'Engagements' ], [ '92%', 'Repeat clients' ], [ '12', 'Weeks average' ] ] ),
		S.splitList( K, {
			eyebrow: 'Where we help',
			title: 'Problems that outlast a workshop',
			body: 'The kind that need someone in the room for a quarter, not a deck at the end of one.',
			list: [ 'Operating model redesign', 'Cost programmes that stick', 'Post-merger integration', 'Function build-out', 'Board and investor reporting' ],
			cta: 'Read our approach',
		} ),
		S.testimonials( K, [
			[ 'They left, and the change stayed. That is rarer than it should be.', 'Alex Moreau', 'COO' ],
			[ 'No deck theatre. They sat with the team and fixed the process.', 'Iris Kovács', 'Operations director' ],
			[ 'The board pack they built is still what we use two years on.', 'Marc Ellis', 'CFO' ],
		], { bg: K.N.canvas } ),
		S.ctaPlain( K, { title: 'Start with a conversation', cta: 'Get in touch', bg: K.P.wash } ),
	] ),

	Pg( 'lumen-page-home-industrial', 'Home — manufacturing', 'Home', 'orange', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Precision components since 1974',
			title: 'Built to tolerance, delivered to schedule',
			body: 'Machining, assembly and finishing for aerospace, medical and energy customers across three continents.',
			cta: 'Request a quote', alt: 'Our capabilities',
		} ),
		S.stats( K, [ [ '±0.002', 'mm tolerance' ], [ '99.4%', 'On-time delivery' ], [ '3', 'Plants' ], [ '50', 'Years' ] ] ),
		S.intro( K, { eyebrow: 'Capabilities', title: 'What runs on our floor' } ),
		S.iconCards( K, [
			[ K.ICON.layers, 'CNC machining', 'Five-axis milling and turning, prototype through to production volume.' ],
			[ K.ICON.shield, 'Quality', 'AS9100 and ISO 13485, with full material traceability.' ],
			[ K.ICON.globe, 'Logistics', 'Kanban and consignment stock into your line.' ],
		] ),
		S.faq( K, [
			[ 'What lead times should I plan for?', 'Eight weeks for new parts, four for repeats, and we hold safety stock for scheduled customers.' ],
			[ 'Do you take low-volume work?', 'Yes. Prototype runs are how most of our long-term programmes started.' ],
			[ 'Can you work to our drawings?', 'We work to your drawings or take a functional spec and produce them.' ],
		], { bg: K.N.canvas } ),
		S.ctaBanner( K, { title: 'Send us a drawing', body: 'We will come back with a price, a lead time and any manufacturability notes.', cta: 'Request a quote' } ),
	] ),

	Pg( 'lumen-page-home-startup', 'Home — startup, night', 'Home', 'emerald', true, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Backed by Sequoia and Index',
			title: 'Deploy to the edge without the ops team',
			body: 'Push once and your workload runs in thirty regions, with routing, failover and rollback handled for you.',
			cta: 'Start free', alt: 'Read the docs',
			bg: K.page,
		} ),
		S.stats( K, [ [ '30', 'Regions' ], [ '18ms', 'Median latency' ], [ '99.99%', 'Uptime' ] ], { bg: K.page } ),
		S.intro( K, { eyebrow: 'Why teams switch', title: 'Infrastructure that stops being a job' } ),
		S.iconCards( K, [
			[ K.ICON.bolt, 'Instant deploys', 'Ship in seconds, roll back in one.' ],
			[ K.ICON.globe, 'Global by default', 'No region config, no traffic manager.' ],
			[ K.ICON.lock, 'Secure by default', 'Isolation, secrets and audit built in.' ],
		] ),
		S.quote( K, {
			text: 'We deleted our entire Terraform repo the week we moved. Nobody misses it.',
			name: 'Samir Haddad', role: 'Platform lead, Kestrel', bg: K.page,
		} ),
		S.ctaPlain( K, { title: 'Free until you need a second region', cta: 'Start building', alt: 'Talk to engineering' } ),
	] ),

	/* ══════════════════════════ About ══════════════════════════ */

	Pg( 'lumen-page-about', 'About — company', 'About', 'teal', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'About us', title: 'A company built to outlast its founders', body: 'Sixteen years, four hundred people, and the same reason for existing as on day one.' } ),
		S.textColumns( K, [
			[ 'Why we started', 'Because the work we wanted to do kept being scoped out of projects for being unglamorous. So we built somewhere it could be the whole job.' ],
			[ 'How we are owned', 'Employee-owned since 2019. No external investors, no exit timetable, and decisions made by people who stay.' ],
		] ),
		S.timeline( K, [
			[ '2009', 'Founded', 'Three people and one client, working out of a rented back office.' ],
			[ '2014', 'First overseas office', 'Singapore, opened to follow a client rather than a market.' ],
			[ '2019', 'Employee ownership', 'The founders sold to a trust rather than to a competitor.' ],
			[ '2025', 'Four hundred people', 'Across eleven offices, still turning down work that does not fit.' ],
		] ),
		S.stats( K, [ [ '400', 'Employees' ], [ '11', 'Offices' ], [ '100%', 'Employee owned' ] ] ),
		S.ctaPlain( K, { title: 'We are usually hiring', body: 'Especially engineers who like the unglamorous parts.', cta: 'See open roles', alt: 'Contact us' } ),
	] ),

	Pg( 'lumen-page-about-values', 'About — values', 'About', 'sky', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'How we work', title: 'Four things we will not trade away' } ),
		S.iconCards( K, [
			[ K.ICON.check, 'We finish', 'We take on less than we could so that everything we start gets done properly.' ],
			[ K.ICON.users, 'We staff seniors', 'The people who sell the work do the work. No bait and switch.' ],
			[ K.ICON.shield, 'We say no', 'To projects we cannot do well, and to scope that would break the ones we can.' ],
		] ),
		S.splitList( K, {
			eyebrow: 'In practice',
			title: 'What that looks like on a Tuesday',
			body: 'Values are only visible in the small decisions, so here are the ones we actually make.',
			list: [ 'No project without a named senior', 'No estimate we would not commit to', 'No handover without a working session', 'No invoice for work we got wrong' ],
			flip: true, bg: K.N.canvas,
		} ),
		S.quote( K, { text: 'They told us the scope was wrong before they took the money. That is why we came back.', name: 'Noor Abbasi', role: 'Programme director' } ),
		S.ctaPlain( K, { title: 'Work with us', cta: 'Get in touch' } ),
	] ),

	Pg( 'lumen-page-team', 'About — leadership team', 'About', 'fuchsia', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Leadership', title: 'The people accountable for the work' } ),
		S.team( K, [
			[ 'Mai Nguyen', 'Chief executive', 'Joined as employee four. Runs the company on the principle that the work sells itself.' ],
			[ 'Duc Pham', 'Chief technology officer', 'Owns delivery. Writes the parts that have to keep working after everyone has gone home.' ],
			[ 'Linh Tran', 'Chief operating officer', 'Keeps four hundred people and eleven offices speaking the same language.' ],
		] ),
		S.team( K, [
			[ 'Ana Costa', 'Finance director', 'Twelve years in infrastructure finance before joining. Sceptical, usefully.' ],
			[ 'Yusuf Demir', 'People director', 'Built the apprenticeship programme that now supplies a third of our engineers.' ],
			[ 'Iris Kovács', 'Client services', 'The person clients call when something has gone wrong.' ],
		], { pad: K.PAD( 0, 88 ) } ),
		S.ctaPlain( K, { title: 'Join them', body: 'We hire for judgement and teach the rest.', cta: 'Open roles', bg: K.P.wash } ),
	] ),

	Pg( 'lumen-page-about-night', 'About — statement, night', 'About', 'indigo', true, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Who we are', title: 'A studio, not an agency', body: 'Twelve people, one floor, and no account management layer between you and the work.', bg: K.page } ),
		S.textColumns( K, [
			[ 'No pitch theatre', 'We do not do free creative. If you want to see how we think, we will walk you through a project we finished.' ],
			[ 'No junior hand-off', 'The people in the first meeting are the people doing the work. There is no bench to hide behind.' ],
			[ 'No retainer creep', 'Projects end. If you need us again you will hire us again, and both of us will know why.' ],
		] ),
		S.stats( K, [ [ '12', 'People' ], [ '4', 'Projects a quarter' ], [ '0', 'Account managers' ] ], { bg: K.page } ),
		S.ctaPlain( K, { title: 'Come and see the floor', body: 'Hà Nội, most weekday afternoons.', cta: 'Arrange a visit' } ),
	] ),

	/* ════════════════════════ Services ════════════════════════ */

	Pg( 'lumen-page-services', 'Services — overview', 'Services', 'emerald', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Services', title: 'What you can hire us for', body: 'Three practices that work as one team on anything larger than a single discipline.' } ),
		S.iconCards( K, [
			[ K.ICON.layers, 'Design and engineering', 'From feasibility through detailed design to site support.' ],
			[ K.ICON.chart, 'Programme advisory', 'Business cases, options appraisal and assurance.' ],
			[ K.ICON.refresh, 'Operations', 'Asset management, maintenance strategy and performance.' ],
		] ),
		S.splitList( K, {
			eyebrow: 'Sectors',
			title: 'Where we spend most of our time',
			list: [ 'Water and wastewater', 'Rail and transit', 'Power transmission', 'Ports and coastal', 'Public estate' ],
			bg: K.N.canvas,
		} ),
		S.steps( K, [
			[ 'Scope', 'A week agreeing what the problem actually is.' ],
			[ 'Deliver', 'A named senior and a fixed team, start to finish.' ],
			[ 'Hand over', 'Documentation your team can maintain without us.' ],
		] ),
		S.ctaBanner( K, { title: 'Not sure which practice you need?', body: 'Describe the problem and we will tell you — including if it is not us.', cta: 'Ask us' } ),
	] ),

	Pg( 'lumen-page-service-detail', 'Services — one service', 'Services', 'amber', false, ( K, S ) => [
		S.heroSplit( K, {
			eyebrow: 'Service',
			title: 'Asset management that pays for itself',
			body: 'We build the data, the model and the plan, then sit with your team until they are running it.',
			cta: 'Talk to the team',
			panelIcon: K.ICON.chart, panelTitle: 'Typical payback',
			panelBody: 'Fourteen months on the last nine engagements, measured against the client\'s own baseline.',
		} ),
		S.splitList( K, {
			eyebrow: 'What is included',
			title: 'Everything needed to make a decision',
			list: [ 'Asset register clean-up and validation', 'Condition and criticality scoring', 'Whole-life cost modelling', 'Intervention plan with funding profile', 'Handover training for your team' ],
			bg: K.N.canvas,
		} ),
		S.stats( K, [ [ '14', 'Months to payback' ], [ '23%', 'Average opex saving' ], [ '9', 'Engagements' ] ] ),
		S.faq( K, [
			[ 'What data do we need to have?', 'Less than you think. Half our work starts with an incomplete register, and cleaning it is part of the job.' ],
			[ 'How long does it take?', 'Sixteen to twenty weeks for a mid-sized portfolio, including the handover sessions.' ],
		] ),
		S.ctaPlain( K, { title: 'Start with a data health check', body: 'Two weeks, fixed fee, and you keep the output whether or not you continue.', cta: 'Book a health check' } ),
	] ),

	Pg( 'lumen-page-solutions', 'Services — by industry', 'Services', 'sky', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Industries', title: 'We work where the regulations are hardest', bg: K.N.canvas } ),
		S.iconCards( K, [
			[ K.ICON.globe, 'Utilities', 'Regulated asset bases where every decision needs a paper trail.' ],
			[ K.ICON.shield, 'Healthcare', 'Estates that cannot close while you work on them.' ],
			[ K.ICON.bolt, 'Energy', 'Grid connection, storage and the queue management around both.' ],
		], { bg: K.N.canvas } ),
		S.iconCards( K, [
			[ K.ICON.layers, 'Transport', 'Rail, road and interchange, in live operating environments.' ],
			[ K.ICON.lock, 'Defence', 'Cleared teams and facilities for classified programmes.' ],
			[ K.ICON.chart, 'Public sector', 'Business cases that survive Treasury scrutiny.' ],
		], { bg: K.N.canvas, pad: K.PAD( 0, 88 ) } ),
		S.quote( K, { text: 'They knew the regulator better than our own regulatory team did.', name: 'Sarah Whitfield', role: 'Asset director' } ),
		S.ctaPlain( K, { title: 'Tell us your sector', cta: 'Get in touch' } ),
	] ),

	Pg( 'lumen-page-services-night', 'Services — night', 'Services', 'violet', true, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Capabilities', title: 'Six things we do properly', body: 'And a long list we deliberately do not.', bg: K.page } ),
		S.iconCards( K, [
			[ K.ICON.palette, 'Brand systems', 'Marks, type and the rules that keep them alive.' ],
			[ K.ICON.layers, 'Design systems', 'Components your engineers will actually adopt.' ],
			[ K.ICON.code, 'Front-end build', 'Accessible, fast, and handed over documented.' ],
		] ),
		S.iconCards( K, [
			[ K.ICON.search, 'Research', 'Enough to decide, not enough to stall.' ],
			[ K.ICON.motion, 'Motion', 'Interface animation with a reason to exist.' ],
			[ K.ICON.users, 'Workshops', 'Run by the people who will do the work.' ],
		], { pad: K.PAD( 0, 88 ) } ),
		S.ctaBanner( K, { title: 'Four projects a quarter', body: 'We take on less than we could so everything gets finished.', cta: 'Check availability' } ),
	] ),

	/* ════════════════════════ Product ════════════════════════ */

	Pg( 'lumen-page-product', 'Product — overview', 'Product', 'indigo', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Product',
			title: 'One place for everything your operations team tracks',
			body: 'Assets, work orders, compliance and cost, in a system your field team will open on a phone in the rain.',
			cta: 'Start free trial', alt: 'Book a walkthrough',
		} ),
		S.intro( K, { eyebrow: 'Modules', title: 'Turn on what you need', bg: K.N.canvas } ),
		S.iconCards( K, [
			[ K.ICON.list, 'Asset register', 'Hierarchy, condition and history in one record.' ],
			[ K.ICON.refresh, 'Work orders', 'Raised, scheduled and closed from the field.' ],
			[ K.ICON.shield, 'Compliance', 'Inspections, certificates and the reminders for both.' ],
		], { bg: K.N.canvas } ),
		S.splitList( K, {
			eyebrow: 'Built for the field',
			title: 'Works when the signal does not',
			body: 'Offline first, syncing when it can, so a job is never lost because of a basement.',
			list: [ 'Offline capture and sync', 'Photo and signature on the job', 'Barcode and NFC asset lookup', 'One-handed on a phone', 'Works on the tablets you already own' ],
		} ),
		S.stats( K, [ [ '40k', 'Assets tracked' ], [ '99.9%', 'Uptime' ], [ '3 days', 'Average rollout' ] ] ),
		S.ctaBanner( K, { title: 'Try it on one site first', body: 'Free for thirty days, no card, and we help you load your register.', cta: 'Start free trial' } ),
	] ),

	Pg( 'lumen-page-product-features', 'Product — feature detail', 'Product', 'teal', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Features', title: 'The parts people mention unprompted' } ),
		S.splitList( K, {
			eyebrow: 'Scheduling',
			title: 'Plans that survive contact with the week',
			body: 'Drag a job and everything downstream re-plans, including the people and the parts.',
			list: [ 'Capacity by skill and certification', 'Parts reserved when the job is scheduled', 'Travel time in the plan, not after it', 'Reschedule cascades automatically' ],
		} ),
		S.splitList( K, {
			eyebrow: 'Reporting',
			title: 'Numbers your board will accept',
			body: 'Generated from the record, not re-keyed from it.',
			list: [ 'Cost per asset, per site, per year', 'Compliance position at a date', 'Backlog by criticality', 'Export to your finance system' ],
			flip: true, bg: K.N.canvas,
		} ),
		S.faq( K, [
			[ 'Can we import our existing register?', 'Yes, from spreadsheet or from most CMMS exports. We do the first load with you.' ],
			[ 'Does it integrate with our ERP?', 'There is a REST API and prebuilt connectors for the four common ones.' ],
			[ 'Who owns the data?', 'You do. Full export, any time, in a format you can read.' ],
		] ),
		S.ctaPlain( K, { title: 'See it with your own register', cta: 'Book a walkthrough', alt: 'Read the docs', bg: K.P.wash } ),
	] ),

	Pg( 'lumen-page-integrations', 'Product — integrations', 'Product', 'slate', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Integrations', title: 'It has to fit what you already run', body: 'A platform that needs you to replace everything else is not a platform.' } ),
		S.iconCards( K, [
			[ K.ICON.refresh, 'Finance systems', 'Two-way sync with the four common ERPs, and a REST API for the rest.' ],
			[ K.ICON.users, 'Identity', 'SAML and SCIM, so joiners and leavers are handled where you already handle them.' ],
			[ K.ICON.chart, 'Data warehouse', 'Scheduled exports to your lake in the format your analysts asked for.' ],
		] ),
		S.stats( K, [ [ '40+', 'Connectors' ], [ 'REST', 'Open API' ], [ '0', 'Middleware needed' ] ] ),
		S.panel( K, { icon: K.ICON.code, title: 'Nothing proprietary in the middle', body: 'Every connector is documented and every field is exportable. If you leave, you leave with everything.', cta: 'Read the API docs' } ),
		S.ctaPlain( K, { title: 'Ask about a connector', body: 'If it is not on the list, tell us — half of them started as a customer request.', cta: 'Ask us' } ),
	] ),

	/* ════════════════════════ Pricing ════════════════════════ */

	Pg( 'lumen-page-pricing', 'Pricing — three plans', 'Pricing', 'emerald', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Pricing', title: 'Priced per site, not per seat', body: 'Because charging you for adding your own team is a strange way to run a business.' } ),
		S.pricing( K, [
			{ name: 'Single site', price: '390', period: '/month', note: 'One location', cta: 'Start free trial',
				features: [ 'Up to 2,000 assets', 'Unlimited users', 'Email support' ] },
			{ name: 'Multi-site', price: '1,200', period: '/month', note: 'Up to ten locations', cta: 'Start free trial',
				features: [ 'Up to 25,000 assets', 'Unlimited users', 'Priority support', 'API access' ] },
			{ name: 'Enterprise', price: 'POA', currency: '', period: '', note: 'Unlimited locations', cta: 'Talk to sales',
				features: [ 'Unlimited assets', 'SSO and SCIM', 'Named success manager', 'Custom connectors' ] },
		] ),
		S.splitList( K, {
			eyebrow: 'Every plan',
			title: 'What you get regardless of what you pay',
			list: [ 'Unlimited users, always', 'Full data export, any time', 'Offline field app', 'Onboarding with a real person', 'No charge for API calls' ],
			bg: K.N.canvas,
		} ),
		S.faq( K, [
			[ 'Is there a setup fee?', 'No. Onboarding, including the first data load, is part of the subscription.' ],
			[ 'What happens if we grow past a tier?', 'We move you up mid-term and pro-rate it. Nothing stops working while that happens.' ],
			[ 'Can we pay annually?', 'Yes, at two months off.' ],
		] ),
		S.ctaBanner( K, { title: 'Thirty days, no card', body: 'Load one site, use it properly, then decide.', cta: 'Start free trial' } ),
	] ),

	Pg( 'lumen-page-pricing-night', 'Pricing — night', 'Pricing', 'fuchsia', true, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Plans', title: 'Simple enough to explain in a sentence', bg: K.page } ),
		S.pricing( K, [
			{ name: 'Starter', price: '29', period: '/month', note: 'For one project', cta: 'Start free',
				features: [ 'One workspace', '10GB storage', 'Community support' ] },
			{ name: 'Team', price: '99', period: '/month', note: 'For a working team', cta: 'Start free',
				features: [ 'Ten workspaces', '250GB storage', 'Priority support', 'SSO' ] },
			{ name: 'Scale', price: '299', period: '/month', note: 'For an organisation', cta: 'Talk to sales',
				features: [ 'Unlimited workspaces', '2TB storage', 'Named engineer', 'Audit logging' ] },
		] ),
		S.faq( K, [
			[ 'Do you charge per seat?', 'No. Price is by workspace, so adding people costs nothing.' ],
			[ 'Can we cancel mid-term?', 'Yes, and we refund the unused months.' ],
		] ),
		S.ctaPlain( K, { title: 'Start on the free tier', body: 'It stays free. There is no timer.', cta: 'Create an account' } ),
	] ),

	/* ════════════════════════ Contact ════════════════════════ */

	Pg( 'lumen-page-contact', 'Contact — company', 'Contact', 'sky', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Contact', title: 'Three ways in, all of them answered' } ),
		S.contactCards( K, [
			[ K.ICON.mail, 'Email', 'hello@example.com — weekdays, usually within the hour.' ],
			[ K.ICON.phone, 'Phone', '+84 24 1234 5678 — 9am to 6pm, Indochina time.' ],
			[ K.ICON.pin, 'Head office', '12 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội.' ],
		] ),
		S.splitList( K, {
			eyebrow: 'Before you write',
			title: 'What helps us answer properly',
			body: 'A paragraph is plenty. These four things let us come back with something useful rather than a meeting request.',
			list: [ 'What you are trying to achieve', 'Roughly when it needs to happen', 'Who else is involved', 'Any budget range you can share' ],
			bg: K.N.canvas,
		} ),
		S.textColumns( K, [
			[ 'Hà Nội', '12 Lý Thường Kiệt, Hoàn Kiếm.\nMon–Fri, 9am–6pm ICT.' ],
			[ 'Singapore', '80 Robinson Road, #08-01.\nMon–Fri, 9am–6pm SGT.' ],
			[ 'London', '4 Hardwick Street, EC1R.\nMon–Fri, 9am–5.30pm GMT.' ],
		] ),
		S.ctaPlain( K, { title: 'Or just call', body: 'Someone picks up. There is no phone tree.', cta: '+84 24 1234 5678', bg: K.P.wash } ),
	] ),

	Pg( 'lumen-page-demo', 'Contact — book a demo', 'Contact', 'violet', false, ( K, S ) => [
		S.heroSplit( K, {
			eyebrow: 'Book a demo',
			title: 'Thirty minutes, your data, no slides',
			body: 'We load a sample of your register before the call so you are looking at your own assets, not ours.',
			cta: 'Pick a time',
			panelIcon: K.ICON.clock, panelTitle: 'What happens on the call',
			panelBody: 'Ten minutes on your situation, fifteen in the product, five on what a rollout would look like.',
		} ),
		S.steps( K, [
			[ 'Pick a time', 'Slots are real; the calendar is our engineers\', not a sales team\'s.' ],
			[ 'Send a sample', 'A spreadsheet of fifty assets is enough for us to prepare.' ],
			[ 'See it working', 'On your data, with your terminology, on the call.' ],
		], { bg: K.N.canvas } ),
		S.quote( K, { text: 'It was the first demo where I did not have to imagine my own data in it.', name: 'Tom Reilly', role: 'Head of maintenance' } ),
		S.ctaBanner( K, { title: 'Book it now', body: 'Next available slot is usually within three working days.', cta: 'Pick a time' } ),
	] ),

	Pg( 'lumen-page-contact-night', 'Contact — studio, night', 'Contact', 'amber', true, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Say hello', title: 'Tell us what you are building', body: 'A paragraph is plenty. We answer everything, including the ones we turn down.', bg: K.page } ),
		S.contactCards( K, [
			[ K.ICON.mail, 'Email', 'studio@example.com' ],
			[ K.ICON.phone, 'Phone', '+84 24 1234 5678' ],
			[ K.ICON.pin, 'Studio', 'Hoàn Kiếm, Hà Nội' ],
		] ),
		S.panel( K, { icon: K.ICON.clock, title: 'Availability', body: 'We take four projects a quarter. The next opening is in March, and we book two months ahead.', cta: 'Check availability' } ),
		S.ctaPlain( K, { title: 'Come and see the floor', body: 'Most weekday afternoons, no appointment needed.', cta: 'Get directions' } ),
	] ),

	/* ════════════════════════ Careers ════════════════════════ */

	Pg( 'lumen-page-careers', 'Careers — overview', 'Careers', 'orange', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Careers',
			title: 'We hire for judgement and teach the rest',
			body: 'Employee-owned, no bench, and the person who sells the work does the work.',
			cta: 'See open roles', alt: 'How we hire',
		} ),
		S.stats( K, [ [ '400', 'People' ], [ '92%', 'Stay past year three' ], [ '100%', 'Employee owned' ], [ '11', 'Offices' ] ] ),
		S.intro( K, { eyebrow: 'What you get', title: 'The parts people ask about' } ),
		S.iconCards( K, [
			[ K.ICON.users, 'A share of it', 'Everyone is an owner from day one, not after a vesting cliff.' ],
			[ K.ICON.clock, 'Time to learn', 'Ten days a year, and the training budget is not the first thing cut.' ],
			[ K.ICON.globe, 'Move around', 'Eleven offices and an internal market that is actually used.' ],
		] ),
		S.steps( K, [
			[ 'Apply', 'A CV and a paragraph. No cover letter theatre.' ],
			[ 'Two conversations', 'One about the work, one with the team you would join.' ],
			[ 'Decision in a week', 'And a real answer either way.' ],
		], { bg: K.N.canvas } ),
		S.ctaBanner( K, { title: 'Nothing open that fits?', body: 'Write anyway. Half our hires came in before the role existed.', cta: 'Send an open application' } ),
	] ),

	Pg( 'lumen-page-job', 'Careers — one role', 'Careers', 'teal', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Hà Nội · Full time · Hybrid', title: 'Senior structural engineer', body: 'Joining the water practice, working on treatment assets across two regions.' } ),
		S.splitList( K, {
			eyebrow: 'The role',
			title: 'What you would actually be doing',
			list: [ 'Lead design on two to three concurrent schemes', 'Own the technical relationship with the client', 'Supervise two graduates and sign their reviews', 'Contribute to bids you would then deliver' ],
		} ),
		S.splitList( K, {
			eyebrow: 'You',
			title: 'What we need you to bring',
			list: [ 'Chartered, or close enough to see it', 'Water or heavy civil experience', 'Comfortable being the senior in the room', 'Willing to be wrong in front of a client' ],
			flip: true, bg: K.N.canvas,
		} ),
		S.faq( K, [
			[ 'What is the salary?', 'Between 45m and 62m VND monthly depending on experience, plus profit share. We publish the band because hiding it wastes everyone\'s time.' ],
			[ 'How hybrid is hybrid?', 'Two days in, three wherever. Site weeks happen and we plan around them.' ],
		] ),
		S.ctaPlain( K, { title: 'Apply for this role', body: 'A CV and a paragraph about a project you are proud of.', cta: 'Apply now', alt: 'Ask a question' } ),
	] ),

	/* ══════════════════════ Case studies ══════════════════════ */

	Pg( 'lumen-page-work', 'Case studies — index', 'Case Studies', 'rose', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Selected work', title: 'Projects we can talk about', body: 'A third of what we do is under NDA. This is the rest.' } ),
		S.iconCards( K, [
			[ K.ICON.globe, 'National water utility', 'Asset strategy across 4,000 sites, delivered in eleven months.' ],
			[ K.ICON.bolt, 'Grid operator', 'Connection queue redesign that cleared a two-year backlog.' ],
			[ K.ICON.layers, 'Metro authority', 'Station upgrade programme, live throughout.' ],
		] ),
		S.iconCards( K, [
			[ K.ICON.shield, 'Hospital trust', 'Estate condition survey and funded intervention plan.' ],
			[ K.ICON.chart, 'Port authority', 'Whole-life cost model now used for every capital decision.' ],
			[ K.ICON.refresh, 'Regional council', 'Maintenance transformation across five depots.' ],
		], { pad: K.PAD( 0, 88 ) } ),
		S.quote( K, { text: 'The plan they wrote is still the plan we are following four years later.', name: 'Alex Moreau', role: 'Director of assets' } ),
		S.ctaPlain( K, { title: 'Want the ones we cannot publish?', body: 'We can talk through them under NDA.', cta: 'Arrange a call' } ),
	] ),

	Pg( 'lumen-page-case-study', 'Case studies — one project', 'Case Studies', 'indigo', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Case study · Water', title: 'Clearing a two-year connection backlog', body: 'National grid operator · 11 months · Asset strategy and process redesign' } ),
		S.stats( K, [ [ '2 yrs', 'Backlog cleared' ], [ '−63%', 'Time to connect' ], [ '4,000', 'Sites in scope' ] ] ),
		S.textColumns( K, [
			[ 'The problem', 'Connection applications were queuing for two years. The queue was not a capacity problem — it was a sequencing problem nobody owned.' ],
			[ 'What we did', 'Rebuilt the assessment process around parallel rather than serial review, then sat with the team for four months while it bedded in.' ],
		] ),
		S.timeline( K, [
			[ 'Month 1', 'Diagnosis', 'Two weeks shadowing the assessment team rather than interviewing them.' ],
			[ 'Month 3', 'Redesign', 'New process agreed with the regulator before it was built.' ],
			[ 'Month 7', 'Pilot', 'One region, running both processes in parallel.' ],
			[ 'Month 11', 'Rollout', 'All regions, with the client\'s own team leading it.' ],
		], { bg: K.N.canvas } ),
		S.quote( K, { text: 'They did not hand us a report. They handed us a working process and then left.', name: 'Iris Kovács', role: 'Head of connections' } ),
		S.ctaPlain( K, { title: 'Similar problem?', cta: 'Talk to the team that did it', bg: K.P.wash } ),
	] ),

	/* ════════════════════════ Resources ════════════════════════ */

	Pg( 'lumen-page-faq', 'Resources — FAQ', 'Resources', 'slate', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Support', title: 'Questions we get most weeks' } ),
		S.faq( K, [
			[ 'How quickly do you respond?', 'Weekdays, usually within the hour, always the same day. Out of hours goes to an on-call engineer for platform issues only.' ],
			[ 'Do you have a status page?', 'Yes, and it updates automatically rather than when somebody remembers.' ],
			[ 'Can we get a named contact?', 'On multi-site and enterprise plans, yes. On single site you get whoever is on, which is a team of six.' ],
			[ 'What are your maintenance windows?', 'Sunday 02:00–04:00 ICT, announced a week ahead. Most releases need no window at all.' ],
			[ 'How do we escalate?', 'Reply to any ticket with the word urgent and it moves to the front of the queue with a person attached.' ],
		] ),
		S.panel( K, { icon: K.ICON.mail, title: 'Nothing here matching?', body: 'Support answers on weekdays and reads everything. There is no tier one filter to get past.', cta: 'Contact support' } ),
		S.ctaPlain( K, { title: 'Or browse the documentation', body: 'Searchable, versioned, and written by the people who built it.', cta: 'Open the docs' } ),
	] ),

	Pg( 'lumen-page-press', 'Resources — newsroom', 'Resources', 'sky', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Newsroom', title: 'Announcements, and how to reach us', bg: K.N.canvas } ),
		S.timeline( K, [
			[ 'March', 'Employee ownership milestone', 'Trust reaches full ownership six years after the founders began the transfer.' ],
			[ 'January', 'Singapore office expands', 'Second floor taken to house the growing advisory practice.' ],
			[ 'November', 'Framework appointment', 'Named on a four-year national water framework.' ],
		] ),
		S.contactCards( K, [
			[ K.ICON.mail, 'Press enquiries', 'press@example.com — we answer the same day.' ],
			[ K.ICON.layers, 'Brand assets', 'Logos, photography and boilerplate, ready to use.' ],
			[ K.ICON.users, 'Spokespeople', 'Availability and areas, on request.' ],
		], { bg: K.N.canvas } ),
		S.ctaPlain( K, { title: 'On deadline?', body: 'Call the press line and someone will pick up.', cta: '+84 24 1234 5678' } ),
	] ),

	Pg( 'lumen-page-partners', 'Resources — partners', 'Resources', 'emerald', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Partners', title: 'The people we build with' } ),
		S.logoRow( K, [ K.ICON.layers, K.ICON.globe, K.ICON.bolt, K.ICON.chart, K.ICON.shield ], { label: 'Technology and delivery partners' } ),
		S.iconCards( K, [
			[ K.ICON.code, 'Technology partners', 'Products we integrate with and are certified on.' ],
			[ K.ICON.users, 'Delivery partners', 'Firms we team with on programmes larger than either of us.' ],
			[ K.ICON.globe, 'Academic', 'Research partnerships that feed into how we work.' ],
		] ),
		S.splitList( K, {
			eyebrow: 'Becoming one',
			title: 'What we look for',
			list: [ 'Complementary rather than overlapping', 'Willing to be jointly accountable', 'A track record we can check', 'Comfortable with our clients talking to yours' ],
			bg: K.N.canvas,
		} ),
		S.ctaPlain( K, { title: 'Think there is a fit?', cta: 'Start the conversation' } ),
	] ),

	Pg( 'lumen-page-sustainability', 'Resources — sustainability', 'Resources', 'teal', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Responsibility', title: 'What we measure and publish', body: 'Targets with dates on them, and last year\'s numbers whether or not we hit them.' } ),
		S.stats( K, [ [ '−48%', 'Emissions since 2019' ], [ '2032', 'Net zero target' ], [ '100%', 'Renewable electricity' ] ] ),
		S.splitList( K, {
			eyebrow: 'Commitments',
			title: 'The four we report against',
			body: 'Audited annually and published in full, including the ones we are behind on.',
			list: [ 'Net zero across scopes 1 and 2 by 2032', 'Scope 3 baseline published by 2027', 'Living wage across the whole supply chain', 'Pay gap reported by gender and region' ],
			bg: K.N.canvas,
		} ),
		S.timeline( K, [
			[ '2019', 'Baseline set', 'Independently verified, and the figure we still measure against.' ],
			[ '2023', 'Renewable switch complete', 'All eleven offices on certified renewable supply.' ],
			[ '2025', 'Scope 3 work begins', 'Supplier engagement across the top hundred by spend.' ],
		] ),
		S.ctaPlain( K, { title: 'Read the full report', body: 'Sixty pages, audited, including the parts that did not go well.', cta: 'Download the report' } ),
	] ),

	/* ════════════════════════ Landing ════════════════════════ */

	Pg( 'lumen-page-webinar', 'Landing — event', 'Landing', 'violet', false, ( K, S ) => [
		S.heroSplit( K, {
			eyebrow: 'Live · 24 March · 40 minutes',
			title: 'What the new connection rules actually change',
			body: 'A working session for asset and connections teams, run by the engineers who wrote our response to the consultation.',
			cta: 'Reserve a place',
			panelIcon: K.ICON.clock, panelTitle: 'Format',
			panelBody: 'Twenty-five minutes of content, fifteen of questions, and the recording sent to everyone registered.',
		} ),
		S.splitList( K, {
			eyebrow: 'You will leave with',
			title: 'Three things you can use on Monday',
			list: [ 'What changed, in plain terms', 'Which of your applications are affected', 'A checklist for the transition period' ],
			bg: K.N.canvas,
		} ),
		S.team( K, [
			[ 'Duc Pham', 'Speaker · Connections lead', 'Wrote our consultation response and sits on the industry working group.' ],
			[ 'Linh Tran', 'Speaker · Regulatory', 'Fifteen years across two regulators before joining.' ],
			[ 'Mai Nguyen', 'Host', 'Runs the advisory practice and will keep it to time.' ],
		] ),
		S.ctaBanner( K, { title: 'Reserve a place', body: 'Free, and the recording goes to everyone who registers whether or not you make it.', cta: 'Register now' } ),
	] ),

	Pg( 'lumen-page-launch', 'Landing — coming soon', 'Landing', 'fuchsia', true, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Launching in spring',
			title: 'Something we have wanted to build for six years',
			body: 'Leave an address and we will tell you once, when it is ready. Nothing else.',
			cta: 'Notify me',
			bg: K.page,
		} ),
		S.iconCards( K, [
			[ K.ICON.spark, 'One email', 'Sent when it launches. Not a sequence.' ],
			[ K.ICON.lock, 'Nothing shared', 'Your address goes nowhere else, ever.' ],
			[ K.ICON.check, 'One click out', 'Unsubscribe works, first time.' ],
		] ),
		S.ctaPlain( K, { title: 'Be told once', cta: 'Notify me' } ),
	] ),

	Pg( 'lumen-page-thanks', 'Landing — thank you', 'Landing', 'emerald', false, ( K, S ) => [
		S.heroCentred( K, {
			eyebrow: 'Received',
			title: 'Thank you — that has reached a person',
			body: 'Not an autoresponder queue. Someone reads every one of these and you will hear back the same working day.',
			cta: 'Back to the site',
		} ),
		S.steps( K, [
			[ 'Today', 'Someone reads it and works out who should answer.' ],
			[ 'Within a day', 'You get a real reply, even if the reply is that we are not right for it.' ],
			[ 'If it fits', 'We suggest a call, with an agenda attached.' ],
		], { bg: K.N.canvas } ),
		S.panel( K, { icon: K.ICON.clock, title: 'Urgent?', body: 'Call +84 24 1234 5678. Someone picks up between 9am and 6pm ICT, and there is no phone tree.', cta: 'Call us' } ),
	] ),

	Pg( 'lumen-page-legal', 'Legal — policy page', 'Legal', 'slate', false, ( K, S ) => [
		S.pageHeader( K, { eyebrow: 'Last updated 1 August 2026', title: 'Privacy notice', body: 'What we collect, why, and how to make us stop.' } ),
		S.textColumns( K, [
			[ 'What we collect', 'Contact details you give us, and standard server logs. No advertising trackers, no third-party analytics, no session recording.' ],
			[ 'Why we keep it', 'To answer you, to run the contract, and to meet our legal obligations. Nothing is used to build a profile of you.' ],
		] ),
		S.splitList( K, {
			eyebrow: 'Your rights',
			title: 'What you can ask us to do',
			body: 'Any of these, by email, and we act within thirty days without asking why.',
			list: [ 'Send you everything we hold', 'Correct anything wrong', 'Delete it', 'Stop processing it', 'Send it somewhere else in a readable format' ],
			bg: K.N.canvas,
		} ),
		S.faq( K, [
			[ 'Do you use cookies?', 'One, to keep you signed in. It is not used for anything else and there is no banner because there is nothing to consent to.' ],
			[ 'Where is data held?', 'Singapore and Frankfurt. Never transferred outside those without a mechanism you can inspect.' ],
			[ 'Who do you share it with?', 'Our hosting and email providers, both listed in the full notice. Nobody else.' ],
		] ),
		S.ctaPlain( K, { title: 'Questions about any of this?', body: 'The data protection lead answers directly.', cta: 'privacy@example.com' } ),
	] ),
]
