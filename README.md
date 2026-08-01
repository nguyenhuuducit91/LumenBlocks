<div align="center">

<img src="src/dashboard/images/lumen-icon.svg" alt="Lumen Blocks" width="88" />

# Lumen Blocks

### A page builder that is just the block editor.

**47 blocks**, a global design system and a three-tab inspector for the WordPress
block editor — with the things a page builder is usually bought for included:
copy-and-paste styling, transforms, entrance animations, per-block custom CSS and
server-side conditional display. No upsell, no licence key, no phone-home.

![WordPress](https://img.shields.io/badge/WordPress-6.8.2%2B-21759b)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-777bb4)
![Blocks](https://img.shields.io/badge/blocks-47-f0a500)
![License](https://img.shields.io/badge/license-GPL--3.0--or--later-blue)
![Made in Vietnam](https://img.shields.io/badge/made%20in-Vietnam%20%F0%9F%87%BB%F0%9F%87%B3-red)

<img src="docs/assets/readme/library.png" alt="The Lumen block library in the inserter" width="880" />

</div>

---

## ✨ What you get

### The blocks

47 blocks, each one styleable down to the border of its hover state on a phone.
Turn off the ones you do not use from **Lumen → Settings** and they stop loading
altogether.

| | |
| --- | --- |
| **Layout** | Columns, Column, Card, Hero, Feature, Feature Grid, Icon Box, Image Box, Notification, Separator, Spacer, Divider |
| **Content** | Heading, Subtitle, Text, Blockquote, Icon List (+ Icon List Item), Icon Label, Table of Contents, Timeline, Team Member, Testimonial, Price, Pricing Box, Number Box |
| **Interactive** | Accordion, Tabs (+ Tab Labels, Tab Content), Carousel, Horizontal Scroller, Expand / Show More, Video Popup, Countdown, Count Up, Progress Bar, Progress Circle, Map |
| **Buttons & icons** | Button, Button Group, Icon Button, Call to Action, Icon |
| **Media & dynamic** | Image, Posts, Design Library |

Button Group ships variations for social buttons, and Columns for the usual
column splits, so the block count understates what is in the inserter.

### The design system

Style once, apply everywhere. Colour schemes, typography, spacing, borders,
buttons and icons are set globally and inherited by every block — including from
your theme's `theme.json`, so Lumen blocks look like the rest of the site
without being told twice.

### Finding things again

A block here carries around 357 attributes. Three features exist purely so that
number never becomes your problem:

- **Find a setting** — type in the box under the tab strip. It filters the panels
  as you type and, when the setting is on another tab, goes and gets it: *"1
  setting, on the Layout tab."*
- **Applied settings** — everything this block currently sets, in one list, with
  the viewport or state each value belongs to. Click a row to jump to its
  control, or remove that one value without disturbing the rest.
- **Copy & paste styling** — copies what you changed, never what you wrote. Paste
  it onto a different block type and the settings that do not apply are dropped
  rather than written into your post.

### Motion, CSS and conditions

- **Transform & transition** — move, rotate and scale, per device and per hover
  state. Stored as CSS, so a transform this UI does not offer can still be typed
  in and the sliders will leave it alone.
- **Motion effects** — ten entrance animations that run when a block is
  scrolled to, not when the page loads. Set them per device, and readers whose
  system asks for reduced motion get the content immediately with no movement.
- **Custom CSS** — per block, scoped to that block. `selector { … }` becomes
  `.lmn-abc1234 { … }`, and a bare `a:hover` is scoped too, so one block's CSS
  cannot quietly restyle the site. `@import`, `javascript:` and anything that
  could close the `<style>` element are stripped.
- **Conditional display** — show a block only to logged-in readers, only to a
  role, only between two dates, only on a phone. Decided when the page is built:
  a hidden block is never sent to the reader, rather than hidden with CSS after
  it arrives.

### Private by default

No licence server, no telemetry, no news feed, no upsell notices. The Design
Library reads from whatever CDN you point it at and ships pointing at nothing.

---

## 🚀 Install

**From a zip**

```bash
npm install && npm run build     # produces build/lumen-blocks.zip
```

Then **Plugins → Add New → Upload Plugin** and pick the zip.

**From a clone**

```bash
git clone <this repo> wp-content/plugins/lumen-blocks
cd wp-content/plugins/lumen-blocks
npm install
npm run build:js && npm run build:css
```

Activate **Lumen Blocks** in **Plugins**. Requires WordPress 6.8.2 and PHP 7.4.

**Optional — the Design Library.** It ships unconfigured. Point it at your own
endpoint in `wp-config.php`:

```php
define( 'LUMEN_DESIGN_LIBRARY_URL', 'https://cdn.example.com/lumen' );
```

or through the `lumen_design_library_url` filter.

---

## 📸 Screenshots

| The inspector, searching | Applied settings | About |
| --- | --- | --- |
| <img src="docs/assets/readme/editor.png" width="280" /> | <img src="docs/assets/readme/advanced.png" width="280" /> | <img src="docs/assets/readme/about.png" width="280" /> |

---

## 🛠️ Development

```bash
npm install
npm start                # webpack --watch + gulp watch
```

| Task | Command |
| --- | --- |
| Build the JavaScript | `npm run build:js` |
| Build the CSS | `npm run build:css` |
| Build everything and package a zip | `npm run build` |
| Lint | `npm run lint` |
| Lint and fix | `npm run lint:fix` |
| End-to-end tests | `npm test` |

### How the code is laid out

| Directory | What is in it |
| --- | --- |
| `src/block-library/` | One directory per block: `edit.js`, `save.js`, `schema.js`, `style.js` |
| `src/features/` | Cross-block behaviour — backgrounds, borders, transforms, motion, custom CSS, conditional display |
| `src/extensions/` | Editor-wide additions such as copy-and-paste styling |
| `src/ui/` | Controls and panels the inspector is built from |
| `src/hoc/`, `src/hooks/` | Shared React plumbing |
| `src/utils/` | Helpers with no React in them |
| `src/dashboard/` | The admin screens under **Lumen** |

### Two halves of a feature

Most features have a browser half and a server half, and it is worth knowing
which is which. Styling is generated in the browser and saved into the post, so
a page costs no PHP to render. Conditional display is the exception and is
decided in PHP — a rule about who may see something is not a rule if the markup
is already on the page.

---

## 🔌 Extending

Every panel is a filter and every stylesheet an action.

```php
// Decide for yourself whether a block is shown.
add_filter( 'lumen.conditional-display.show', function ( $show, $condition, $block ) {
    if ( 'my-own-rule' === $condition['type'] ) {
        return my_plugin_should_show();
    }
    return $show; // null leaves it to Lumen.
}, 10, 3 );
```

```js
// Add a control to any of the built-in panels.
addFilter( 'lumen.block-component.transform-transition.control', 'my-plugin', () => <MyControl /> )
```

---

## 📄 Licence and credits

Released under [GPL-3.0-or-later](LICENSE).

Lumen Blocks is a fork of [Stackable](https://github.com/gambitph/Stackable) by
Gambit Technologies, Inc., taken at version 3.19.10 and also GPL-3.0-or-later. Everything
that was changed, renamed or removed is listed in [NOTICE.md](NOTICE.md), as
section 5 of the licence requires.

---

## ❤️ Support

Lumen Blocks is free and always will be. If it saves you time, a coffee keeps it
improving.

<div align="center">

| Bank transfer | PayPal |
| --- | --- |
| <img src="src/dashboard/images/donate-bank.png" width="190" /> | <img src="src/dashboard/images/donate-paypal.png" width="190" /> |

</div>

<div align="center">

**Nguyễn Hữu Đức** · Software Developer, VIETIS
[nguyenhuuduc.it.91@gmail.com](mailto:nguyenhuuduc.it.91@gmail.com)

Made with ♥ in Vietnam

</div>
