/**
 * The picture a post gets when it has none of its own.
 *
 * Written out as a data URI rather than shipped as a file: the build packages
 * only the PHP from `src/`, so an SVG here would resolve in a development
 * install and 404 in a real one — the worst kind of asset bug, because the way
 * you work is the way you never see it.
 *
 * `src/block-library/posts/index.php` carries the same drawing for the front
 * end. If one changes, change the other; they are meant to be the same picture.
 */

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-hidden="true">
	<rect width="400" height="300" fill="#f0f0f1"/>
	<g fill="none" stroke="#c3c4c7" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
		<rect x="90" y="80" width="220" height="150" rx="10"/>
		<path d="M110 205l55-55 40 40 30-30 55 45"/>
	</g>
	<circle cx="250" cy="120" r="16" fill="#c3c4c7"/>
</svg>`

/**
 * The placeholder as something an `img` can point at.
 *
 * @return {string} A data URI.
 */
export const getNoImageSrc = () => `data:image/svg+xml;charset=utf-8,${ encodeURIComponent( SVG.replace( /\s+/g, ' ' ) ) }`
