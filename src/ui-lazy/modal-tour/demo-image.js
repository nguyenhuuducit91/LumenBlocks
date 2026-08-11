/**
 * The picture the guided tours drop into the post.
 *
 * The tours build real blocks in the author's own content to demonstrate a
 * control, and those blocks need something to show. This used to be a
 * `picsum.photos` URL, which made the demonstration — and then the author's
 * saved post, if they kept it — depend on a third-party service being up and
 * on the reader's browser being allowed to reach it.
 *
 * So it is one of the images already shipped with the plugin, addressed
 * absolutely: `file-loader` hands back a path relative to the plugin root, and
 * a relative path inside a block attribute would be resolved against whatever
 * page the block ends up on.
 */

/**
 * External dependencies
 */
import { srcUrl } from 'lumen'
import demoImage from '../style-guide/images/media-text.webp'

export const TOUR_DEMO_IMAGE_URL = `${ srcUrl }/${ demoImage }`
