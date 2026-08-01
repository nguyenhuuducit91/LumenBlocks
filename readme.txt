=== Lumen Blocks ===
Tags: blocks, gutenberg, gutenberg blocks, page builder, WordPress blocks
Requires at least: 6.8.2
Tested up to: 7.0.2
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

The complete website builder for the WordPress block editor. Build professional sites faster with powerful blocks, block styles, and a global design system.

== Description ==

**A page builder toolkit for the WordPress Block Editor**

Lumen Blocks turns the WordPress Block Editor into a full page builder. Build dynamic
websites with lightweight custom blocks, a global design system, global settings and
advanced customization options, without writing a line of code.

## Global Design System

Design faster with global controls: style once, apply everywhere.

- Inherit styles from your Block Theme
- Theme.json support
- Pattern Library
- Full Page Templates
- Global Design System
- Global Color Schemes
- Global Typography
- Global Spacing, Borders, Buttons and Icons

## Design Library

The Design Library loads ready-made patterns from a CDN of your choosing. It ships
unconfigured; point the `LUMEN_DESIGN_LIBRARY_URL` constant or the
`lumen_design_library_url` filter at your own endpoint to enable it.

## Powerful Custom Blocks

Over 40 flexible custom blocks that are feature-rich out of the box. Enable only the
blocks you need and disable the rest from the settings screen.

**Essential Blocks**

- Advanced Columns Block
- Advanced Heading Block
- Advanced Text Block
- Advanced Image Block
- Icon List Block
- Button Block
- Icon Button Block
- Icon Block

**Special Blocks**

- Carousel Block
- Horizontal Scroller Block
- Tabs Block
- Countdown Block
- Timeline Block
- Table of Contents Block
- Posts Block
- Image Box Block
- Video Popup Block
- Progress Circle Block
- Progress Bar Block
- Accordion Block
- Map Block
- Icon Label Block
- Social Buttons Block
- Card Block
- Count Up Block
- Number Box Block
- Notification Block
- Expand / Show More Block
- Separator Block
- Subtitle Block
- Price Block
- Divider Block
- Spacer Block

**Section Blocks**

- Hero Block
- Call to Action Block
- Feature Block
- Feature Grid Block
- Pricing Box Block
- Icon Box Block
- Testimonial Block
- Team Members Block
- Blockquote Block

## Page Builder-like Design Options

Turn the WordPress Block Editor into a page builder. Fine-tune your creations with a wide range of familiar web design options.

- Block Theme & Theme.json Support
- Global Design System
- Multiple Block Layouts
- Flexbox Controls
- Image and Video Lightbox
- Save Block Defaults
- Customize block hover styles
- Block Background and Image Color Settings
- Block Typography Settings
- Image Shapes and Settings
- Advanced Gradient Color Picker
- Advanced Icon Options
- Advanced Column and Spacing Settings
- Global Colors & Typography Settings
- Responsiveness
    - Tablet and Mobile Column Arrangement
    - Live Responsive Editing
    - Ability to tweak designs for Tablet and Mobile views
    - Specify how Columns collapse in Tablet and Mobile
    - Hide / Show Specific Blocks on Desktop, Tablet or Mobile
    - Custom Tablet and Mobile breakpoints
- Custom `data-*` attributes

## Finding Your Way Around a Big Inspector

A block carries hundreds of settings. These exist so that number never becomes your problem:

- Find a setting — a search box under the tab strip that filters the panels as you type, and follows the setting onto another tab when that is where it lives
- Applied settings — everything the block currently sets, in one list, with the viewport or state each value belongs to, a jump to its control and a reset for that one value
- Copy & paste styling — carries what you changed, never what you wrote; settings the target block does not have are dropped rather than written into your post

## Motion, CSS and Conditions

- Transform & Transition — move, rotate and scale per device and per hover state, stored as CSS so hand-written transforms survive
- Motion Effects — ten entrance animations that start when the block is scrolled to, set per device, and skipped entirely for readers who ask for reduced motion
- Custom CSS — per block and scoped to that block, so one block's CSS cannot restyle the site; unsafe constructs are stripped
- Conditional Display — show a block by login state, role, date range, post type, page context or device, decided on the server so a hidden block is never sent to the reader

## Fast Page Loading Speed

Optimize your website’s performance, and get lightning fast page loading to make your site visitors stay. Have the chance to maximize your page speed insights and achieve high Core Web Vitals and higher SEO rankings.

- Loads the smallest file size possible of CSS and JS files in the frontend, ~ only 7.8kb total
- Adds almost no PHP server overhead for fast page loads
- Zero Bloat, no jQuery, no dependencies
- Optimized page loading with focus on Core Web Vitals
- Responsive image loading for faster browsing speeds in mobile devices
- Compatible with Optimization Plugins and use optimization techniques such as combining CSS and JS files and minification

## Integrations & Compatibility

Make your page building experience more well-rounded by using other popular tools. We've seamlessly integrated with these essential third-party plugins and tools:

- WPML
- Weglot
- Blocksy
- Toolset
- Font Awesome
- Google Fonts
- see our full list of integrations and compatibility

== Installation ==

= Minimum Requirements =

* WordPress 6.8.2 or greater
* PHP version 7.4 or greater

1. Upload the plugin folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the *Plugins* screen in WordPress.
3. Open the Block Editor and look for the Lumen blocks in the inserter.

== Frequently Asked Questions ==

**Do I need to know how to code to use Lumen Blocks?**

No. Every block is configured visually from the block inspector.

**What are Blocks?**

Blocks are the building elements of the WordPress Block Editor: buttons, cards, videos,
columns and so on. Lumen Blocks adds an extensive collection of them so you can build
landing pages and front pages without a page builder plugin.

**What themes can I use with Lumen Blocks?**

Any theme. A block theme gives the best experience because the plugin can inherit its
styles through theme.json.

**Can I disable blocks that I do not use?**

Yes. Every block can be toggled on or off from the plugin settings screen.

**Can I use this plugin with other block plugins?**

Yes, Lumen blocks coexist with other block plugins.

**Why is the Design Library empty?**

The Design Library reads its patterns from an external CDN, which is not configured by
default. Define `LUMEN_DESIGN_LIBRARY_URL` in `wp-config.php` or hook the
`lumen_design_library_url` filter to point it at your own endpoint.

== Credits ==

Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc., distributed
under GPL-3.0-or-later. See NOTICE.md in the plugin folder for the list of changes.

== Changelog ==

= 1.0.0 =
* Initial release of Lumen Blocks.
