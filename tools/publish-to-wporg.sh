#!/usr/bin/env bash
#
# Publishes the built plugin to the WordPress.org SVN repository.
#
# Run this only after the plugin has been approved — the repository does not
# exist before that, and the URL arrives in the approval email.
#
#   ./tools/publish-to-wporg.sh --user ducnguyenhuu
#   ./tools/publish-to-wporg.sh --user ducnguyenhuu --version 1.0.1
#
# What it does, in order:
#   1. checks that the version is the same in all three places
#   2. checks out (or updates) the SVN working copy
#   3. syncs build/lumen-blocks/ into trunk/ and docs/assets/wporg/ into assets/
#   4. stages adds and deletes, shows you the diff summary, asks before commit
#   5. copies trunk to tags/<version> and commits that too
#
# The zip you upload to the review form is NOT what users download. What they
# download is tags/<version>, which is why the tag step matters.

set -euo pipefail

PLUGIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
SVN_URL="https://plugins.svn.wordpress.org/lumen-blocks/"
SVN_USER=""
VERSION=""
CHECKOUT="${HOME}/lumen-blocks-svn"
ASSUME_YES="no"

while [[ $# -gt 0 ]]; do
	case "$1" in
		--user) SVN_USER="$2"; shift 2 ;;
		--version) VERSION="$2"; shift 2 ;;
		--url) SVN_URL="$2"; shift 2 ;;
		--checkout) CHECKOUT="$2"; shift 2 ;;
		--yes) ASSUME_YES="yes"; shift ;;
		-h|--help) sed -n '2,26p' "$0"; exit 0 ;;
		*) echo "Unknown option: $1" >&2; exit 1 ;;
	esac
done

if [[ -z "$SVN_USER" ]]; then
	echo "Missing --user <your wordpress.org username>" >&2
	exit 1
fi

# ---------------------------------------------------------------------------
# 1. The three version numbers have to agree, or WordPress.org serves the wrong
#    thing: the readme decides which tag is published, the header decides what
#    the update check compares against.
# ---------------------------------------------------------------------------
header_version=$( grep -m1 -oP '^\s*\*\s*Version:\s*\K[0-9.]+' "$PLUGIN_DIR/lumen-blocks.php" )
readme_version=$( grep -m1 -oP '^Stable tag:\s*\K[0-9.]+' "$PLUGIN_DIR/readme.txt" )
pkg_version=$( grep -m1 -oP '"version":\s*"\K[0-9.]+' "$PLUGIN_DIR/package.json" )

echo "Version in lumen-blocks.php : $header_version"
echo "Version in readme.txt       : $readme_version"
echo "Version in package.json     : $pkg_version"

if [[ "$header_version" != "$readme_version" || "$header_version" != "$pkg_version" ]]; then
	echo "ERROR: the three versions differ. Fix them before publishing." >&2
	exit 1
fi

VERSION="${VERSION:-$header_version}"
echo "Publishing version $VERSION"

# ---------------------------------------------------------------------------
# 2. The build has to exist and be current.
# ---------------------------------------------------------------------------
BUILD="$PLUGIN_DIR/build/lumen-blocks"
if [[ ! -f "$BUILD/lumen-blocks.php" ]]; then
	echo "ERROR: $BUILD is missing. Run: npm run build:no-translate" >&2
	exit 1
fi

built_version=$( grep -m1 -oP '^\s*\*\s*Version:\s*\K[0-9.]+' "$BUILD/lumen-blocks.php" )
if [[ "$built_version" != "$VERSION" ]]; then
	echo "ERROR: build/ holds $built_version, not $VERSION. Rebuild first." >&2
	exit 1
fi

ASSETS="$PLUGIN_DIR/docs/assets/wporg"

# ---------------------------------------------------------------------------
# 3. Check out or update the working copy.
# ---------------------------------------------------------------------------
if [[ -d "$CHECKOUT/.svn" ]]; then
	echo "Updating $CHECKOUT"
	svn update "$CHECKOUT" --username "$SVN_USER"
else
	echo "Checking out $SVN_URL into $CHECKOUT"
	svn checkout "$SVN_URL" "$CHECKOUT" --username "$SVN_USER"
fi

mkdir -p "$CHECKOUT/trunk" "$CHECKOUT/assets" "$CHECKOUT/tags"

# ---------------------------------------------------------------------------
# 4. Sync. --delete matters: files removed from the plugin have to disappear
#    from trunk too, otherwise they keep shipping to users.
# ---------------------------------------------------------------------------
rsync -a --delete --exclude='.svn/' "$BUILD/" "$CHECKOUT/trunk/"
rsync -a --exclude='.svn/' "$ASSETS/" "$CHECKOUT/assets/"

cd "$CHECKOUT"

# Stage new files, then stage deletions.
svn add --force trunk assets --auto-props --parents --depth infinity -q
svn status | awk '/^!/ {print $2}' | while read -r missing; do
	svn rm --force "$missing" -q
done

echo
echo "----- pending changes -----"
svn status | head -40
total=$( svn status | wc -l )
echo "(${total} entries changed)"
echo

if [[ "$ASSUME_YES" != "yes" ]]; then
	read -r -p "Commit trunk + assets for $VERSION? [y/N] " reply
	[[ "$reply" =~ ^[Yy]$ ]] || { echo "Stopped. Nothing committed."; exit 0; }
fi

svn commit -m "Version $VERSION" --username "$SVN_USER"

# ---------------------------------------------------------------------------
# 5. Tag. This is the copy users actually download.
# ---------------------------------------------------------------------------
if svn info "tags/$VERSION" >/dev/null 2>&1; then
	echo "tags/$VERSION already exists — skipping the tag step."
else
	svn cp trunk "tags/$VERSION"
	svn commit -m "Tagging version $VERSION" --username "$SVN_USER"
	echo "Tagged $VERSION"
fi

echo
echo "Done. https://wordpress.org/plugins/lumen-blocks/ refreshes within 5-30 minutes."
echo "Check that the download button offers $VERSION and that the screenshots show up."
