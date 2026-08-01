# NOTICE

Lumen Blocks is a derivative work ("fork") of **Stackable – Page Builder Gutenberg Blocks**.

    Stackable
    Copyright (c) Gambit Technologies, Inc.
    https://github.com/gambitph/Stackable
    Licensed under the GNU General Public License v3.0 or later.

Lumen Blocks is distributed under the same license, GPL-3.0-or-later. The full
licence text is in [LICENSE](LICENSE).

Section 5 of the GPL requires modified files to carry prominent notices stating
that they were changed. This file records those changes at the project level.

## Changes from the upstream project

Forked at upstream version 3.19.10.

**Renamed throughout** — plugin slug, text domain, PHP constants and functions,
block namespaces, REST routes, option keys, CSS class prefixes and the JavaScript
global. No functional change; identifiers only.

**Removed** — the Freemius SDK and all licensing/upsell integration; the news
feed, update-article fetcher, rating notice and cross-marketing plugin installer;
all links to the upstream vendor's website, documentation and video tutorials.

**Changed** — the Design Library CDN is no longer hard-coded and now reads from
the `LUMEN_DESIGN_LIBRARY_URL` constant / `lumen_design_library_url` filter,
defaulting to empty; brand colour palette; logo and icon artwork (original work);
inspector tab strip layout and styling; plugin version numbering (see below).

**Version numbering** — the plugin version restarts at 1.0.0. The block data
format version is tracked separately by `LUMEN_BLOCK_VERSION` and deliberately
retains the upstream 3.19.10 lineage, because the block deprecation and attribute
migration chains compare against it.

## Third-party components

Runtime and build dependencies retain their own licences; see `package.json` and
`composer.json`. Everything under `src/` that is not listed as changed above
remains the work of the upstream authors.
