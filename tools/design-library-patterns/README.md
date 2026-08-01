# Design library pattern harness

Generates the designs that ship with the plugin, so the design library has
something in it on a fresh install — where `LUMEN_DESIGN_LIBRARY_URL` is empty
and there is no CDN to read from.

Two sets, one mechanism:

| Set        | Source        | Output                              | Library tab |
| ---------- | ------------- | ----------------------------------- | ----------- |
| `patterns` | `patterns.js` | `src/design-library/patterns.php`   | Patterns    |
| `pages`    | `pages.js`    | `src/design-library/pages.php`      | Pages       |

A pattern is one section. A page is five to seven sections in the order a
visitor reads them, composed from the shared factories in `sections.js` — thirty
hand-copied heroes would drift apart within a release.

## Why it is a harness and not a folder of markup

Lumen blocks save static markup whose class names are derived from dozens of
attributes, and the output is version-gated by `withVersion( LUMEN_BLOCK_VERSION )`.
Hand-written templates drift from what `save()` would produce and the editor
reports *"this block contains unexpected or invalid content"* on insert.

So nothing here writes block markup. A pattern is declared as a tree of block
names and a little copy; a real editor instantiates it, the plugin's own
`serialize()` produces the string, and the string is parsed back with every
block checked for `isValid`. A pattern that would break never gets exported —
`export-php.js` refuses to write if any pattern failed.

## Running it

Needs a WordPress install with this plugin active, and an admin login:

```sh
export LUMEN_SITE=http://localhost:8004
export LUMEN_USER=admin
export LUMEN_PASS=…

# Sections (Patterns tab)
node build.js          # spec -> markup, validates each block, writes built.json
node preview.js        # renders built.json with the real frontend CSS -> shots/
node export-php.js     # built.json -> ../../src/design-library/patterns.php

# Whole pages (Pages tab) — same scripts, --set=pages
node build.js      --set=pages   # -> built-pages.json
node preview.js    --set=pages
node export-php.js --set=pages   # -> ../../src/design-library/pages.php

node verify.js         # opens the actual Design Library modal and photographs it
```

`build.js <id> <id>` builds a subset while iterating, and merges the result into
the existing JSON rather than replacing it — building one page used to discard
the other thirty-three and force a full rebuild.

A build of the full page set takes roughly forty minutes: every page mounts in a
real editor and waits for its generated CSS to settle. A pattern that throws is
reported as `✗ THREW` and the run carries on, so one mistyped attribute no
longer costs the whole run.

## Editing the sets

`patterns.js` and `pages.js` hold the specs; `kit.js` holds the palette system
and `sections.js` the reusable page sections. A node is:

| key    | meaning                                                          |
| ------ | ---------------------------------------------------------------- |
| `n`    | block name                                                        |
| `a`    | attribute overrides                                               |
| `c`    | children, replacing the example's tree outright                   |
| `t`    | copy swaps into the inherited tree, in document order             |
| `aa`   | attribute overrides applied to inherited inner blocks, by name    |
| `ac`   | replace the children of an inherited inner block, by name         |
| `drop` | remove inherited inner blocks by name                             |
| `ex`   | `false` to not inherit the block's registered example             |

Anything not overridden comes from `getBlockType( name ).example`, so the
styling is the block authors' own and only the copy, the palette and the
section frame are ours.

`t` runs before `ac` on purpose: grafting children adds text slots, and doing
that first shifts every index past the graft point.

### The Pages tab needed a plugin change

Upstream, `use-preview-renderer.js` branched on which **tab** was open: patterns
were treated as markup, anything else as an array of `{ designId }` references
that get fetched from the patterns catalogue and concatenated. So a page could
only ever be assembled from patterns already published, and a page shipping its
own markup died with `_content.map is not a function` and span forever.

That branch now tests the **template's shape** instead, so both forms work. The
reference form behaves exactly as before.

### Deploying a change to the library UI

The Design Library is a content-hashed lazy chunk. `dist/chunks/design-library.<hash>.js`
holds the code and **`dist/lmn.js` holds the mapping to that hash** — copying
`editor_blocks.js` alone changes nothing, and the old chunk keeps loading. Sync
the whole `dist/` directory.

### Two rules the stock examples break

- **No remote assets.** The examples point images at `source.unsplash.com`,
  which Unsplash retired, and the library ships pointing at no CDN. Use `drop`
  to remove inherited images; colour, spacing and icons carry the set instead.
- **Do not wrap a composite in a card.** `pricing-box`, `testimonial`,
  `team-member`, `call-to-action`, `notification` and `blockquote` already draw
  their own container — wrapping them in a card column gives a box in a box.
  Style them with `OWN_CARD` instead. `icon-box` is the exception; it draws none.

## Exploring the block vocabulary

```sh
node dump-examples.js                         # every block's example + content attrs
node find-attrs.js '^(blockPadding|align)$' lumen/columns lumen/column
```
