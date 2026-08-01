# Design library pattern harness

Generates `src/design-library/patterns.php` — the sections that ship with the
plugin so the design library has something in it on a fresh install, where
`LUMEN_DESIGN_LIBRARY_URL` is empty and there is no CDN to read from.

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

node build.js          # spec -> markup, validates each block, writes built.json
node preview.js        # renders built.json with the real frontend CSS -> shots/
node export-php.js     # built.json -> ../../src/design-library/patterns.php
node verify.js         # opens the actual Design Library modal and photographs it
```

`build.js <id> <id>` builds a subset while iterating.

## Editing the set

`patterns.js` holds the specs. A node is:

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
