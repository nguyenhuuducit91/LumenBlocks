=== Lumen Blocks ===
Contributors: ducnguyenhuu
Tags: blocks, gutenberg, page builder, block editor, patterns
Requires at least: 6.8
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Turn the block editor into a page builder: 40 blocks, 70 patterns, 34 page templates and one design system driving them all.

== Description ==

Lumen Blocks adds a page-builder toolkit to the WordPress block editor. You get forty
blocks that share one set of controls, a design library you can insert whole sections and
pages from, and a global design system so a colour or spacing change lands everywhere at
once.

There is no separate builder to learn. Everything happens in the editor you already use,
and everything saves as standard block markup.

= Insert a section, not a blank page =

The Design Library ships with content, so it is useful on the first day:

* **70 patterns** — heroes, feature grids, pricing tables, testimonials, team sections,
FAQs and call-to-action bands, across ten colour palettes with light and dark variants.
* **34 full page templates** — home, about, services, product, pricing, contact, careers,
case studies, resources and landing pages for a company website.

Every one is built from Lumen blocks, so once inserted it is yours to edit like anything
else. No remote images, no external requests, nothing to configure. You can point the
library at your own endpoint as well — see the FAQ.

= One design system, applied everywhere =

Set colours, typography and spacing once and every block follows.

* Inherits from your block theme and theme.json first, so a fresh install already matches
your site
* Global colour schemes and typography
* Global spacing, borders, buttons and icons
* Change the system and every page updates together

= Forty blocks in the inserter =

**Essential** — Columns, Heading, Text, Image, Icon, Icon List, Button Group

**Layout and content** — Accordion, Card, Carousel, Countdown, Count Up, Divider,
Expand / Show More, Horizontal Scroller, Icon Label, Image Box, Map, Notification,
Number Box, Posts, Price, Progress Bar, Progress Circle, Separator, Spacer, Subtitle,
Table of Contents, Tabs, Timeline, Video Popup, Design Library

**Sections** — Hero, Call to Action, Feature, Feature Grid, Pricing Box, Icon Box,
Testimonial, Team Member, Blockquote

Seven further blocks — Button, Icon Button, Inner Column, Tab Labels, Tab Content and
friends — exist as inner blocks of the ones above. Any block you do not want can be
turned off from the settings screen.

= Design controls without the CSS =

* Block theme and theme.json support
* Flexbox and multiple block layouts
* Background, image and gradient controls
* Typography, borders, shadows and hover styles
* Image shapes, lightbox and focal point
* Save block defaults
* Custom `data-*` attributes

= Responsive by control, not by breakpoint hunting =

Every value can differ per device without writing a media query.

* Live responsive editing for tablet and mobile
* Per-device column arrangement and collapse order
* Show or hide any block per device
* Custom tablet and mobile breakpoints

= Finding your way around a large inspector =

A block carries hundreds of settings. These exist so that number never becomes your
problem:

* **Find a setting** — a search box that filters the panels as you type, and follows a
setting onto another tab when that is where it lives
* **Applied settings** — everything the block currently sets, in one list, with the
viewport or state each value belongs to, a jump to its control, and a reset for that one
value
* **Copy and paste styling** — carries what you changed, never what you wrote; settings
the target block does not have are dropped rather than written into your post

= Motion, CSS and conditions =

* **Transform and transition** — move, rotate and scale per device and per hover state
* **Motion effects** — ten entrance animations that start when the block is scrolled to,
set per device, and skipped entirely for readers who ask for reduced motion
* **Custom CSS** — written per block and scoped to that block, so one block's CSS cannot
restyle the rest of the site
* **Conditional display** — show a block by login state, role, date range, post type,
page context or device, decided on the server so a hidden block is never sent to the
reader

= Built to be handed over =

* Every override is a control with a reset beside it
* No shortcodes and no proprietary storage — content is standard block markup
* Deactivating the plugin leaves your content in place
* The role manager can hide the styling tabs from editors who only need content fields

= Performance =

* Only the CSS a page actually uses is written into that page, so an unused block costs a
reader nothing
* No jQuery and no front-end framework
* Works with page caching and with CSS/JS combining plugins

= Integrations =

WPML, Weglot, Blocksy, Toolset, Font Awesome and Google Fonts.

== Installation ==

= Minimum requirements =

* WordPress 6.8 or greater
* PHP 7.4 or greater

= Installing =

1. Upload the plugin folder to `/wp-content/plugins/`, or install it from the WordPress
plugins screen.
2. Activate the plugin through the *Plugins* screen.
3. Open a page in the block editor and look for the Lumen blocks in the inserter, or open
the Design Library to insert a ready-made section or page.

== Frequently Asked Questions ==

= Do I need to know how to code? =

No. Every block is configured visually from the block inspector, and anything you change
has a reset next to it.

= What themes does it work with? =

Any theme. A block theme gives the best result, because Lumen reads widths, colours and
typography from your theme's theme.json before applying anything of its own.

= What happens to my content if I deactivate the plugin? =

It stays. Blocks fall back to their saved markup, so pages keep rendering. There are no
shortcodes left behind.

= Can I turn off blocks I do not use? =

Yes. Every block can be toggled on or off from the plugin settings screen.

= Does it work alongside other block plugins? =

Yes. Lumen blocks are namespaced and coexist with other block libraries.

= Can I point the Design Library at my own patterns? =

Yes. The library ships with 70 patterns and 34 page templates built in, and no CDN is
required. To add your own, define `LUMEN_DESIGN_LIBRARY_URL` in `wp-config.php` or hook
the `lumen_design_library_url` filter. Designs from your endpoint are merged with the
built-in ones, and yours win on an id clash.

= Will this slow my site down? =

Only the CSS a page uses is written into it, so blocks you do not place on a page cost
nothing. Everything renders to static markup at save time, so page caching works
normally.

= Is it accessible? =

Motion effects respect `prefers-reduced-motion`, and interactive blocks ship with the
roles and labels a screen reader needs.

== Support the project ==

Lumen Blocks is free software under the GPL and will stay that way. There is no paid
tier, no licence key and no upsell inside the plugin.

If it saves you time and you would like to put something back, there are QR codes for
bank transfer and PayPal on the **Lumen → About** screen in your WordPress admin.

Contributions are as welcome as money. Bug reports, translations and patches all help,
and the licence guarantees you can fork the plugin if you would rather go your own way.

== Screenshots ==

1. The Design Library, with 70 patterns across ten colour palettes.
2. Full page templates for a company website.
3. The global design system — set colours, type and spacing once.
4. Block settings, with setting search and the applied-settings list.
5. Responsive controls: a different value per device on any setting.

== External services ==

The plugin works without contacting anyone. The services below are reached only by the
features that need them, and only when you use those features.

= Google Fonts =

Reached when you pick a Google font in the typography settings. The stylesheet is then
requested from fonts.googleapis.com by the reader's browser on the front end, and by the
editor while previewing the font, so Google receives the reader's IP address, user agent
and the address of the page. Pick no Google font and nothing is requested.
Terms: https://policies.google.com/terms — Privacy: https://policies.google.com/privacy

= Google Maps =

The Map block embeds a map from maps.google.com, loaded by the reader's browser on pages
that contain the block, which sends their IP address and the address shown on the map to
Google. If you save a Google Maps API key in the plugin settings, the editor also loads
the Maps JavaScript API from maps.googleapis.com so you can search for an address.
Without a key that request never happens.
Terms: https://cloud.google.com/maps-platform/terms — Privacy: https://policies.google.com/privacy

= Font Awesome =

The icon picker searches the Font Awesome catalogue. Typing in the icon search field
sends your search term and the Font Awesome version to api.fontawesome.com and gets back
matching icon names. This happens in the editor only, while searching.
Terms: https://fontawesome.com/support/terms — Privacy: https://fontawesome.com/privacy

= Unsplash =

A few of the older blocks show placeholder photos from source.unsplash.com in their
inserter preview. Requested by the editor's browser when the preview is displayed, never
on the front end.
Terms: https://unsplash.com/terms — Privacy: https://unsplash.com/privacy

= Design Library endpoint =

The 70 patterns and 34 templates are built into the plugin and need no connection. If you
define LUMEN_DESIGN_LIBRARY_URL or hook the lumen_design_library_url filter, the plugin
downloads pattern definitions and preview images from the address you chose. Which
endpoint that is, and what terms apply to it, is entirely your decision.

== Development ==

Lumen Blocks is developed in the open. The unminified JavaScript and SCSS behind
everything in the plugin's dist folder, along with the build tooling, lives at
https://github.com/nguyenhuuducit91/LumenBlocks

Build it yourself with `npm ci && npm run build:no-translate` — the compiled assets land
in dist/ and the packaged plugin in build/lumen-blocks.zip.

== Credits ==

Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc., distributed under
GPL-3.0-or-later. The full list of changes is in NOTICE.txt inside the plugin folder.

== Changelog ==

= 1.0.0 =
* Initial release.
* 40 blocks in the inserter, plus inner blocks.
* Design Library with 70 built-in patterns and 34 full page templates, no CDN required.
* Global design system with theme.json inheritance.
* Setting search, applied-settings list and copy/paste styling in the block inspector.
* Motion effects, scoped custom CSS and conditional display.

== Upgrade Notice ==

= 1.0.0 =
First public release.
