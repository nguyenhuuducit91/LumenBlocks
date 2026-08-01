/**
 * Global preset controls.
 *
 * The CSS side of this is real and shipped — `index.php` turns the stored
 * presets into `--lmn--preset--*` custom properties for both the editor and the
 * page. What never existed is the panel for editing them: there is no store
 * behind `lumen/global-preset-controls.custom` and the setting it would save to
 * is not registered, so the panel here was an advertisement and nothing else.
 *
 * The advertisement is gone. The styles loader stays, because presets that come
 * from the theme or from `presets.json` are still applied.
 */

/**
 * Internal dependencies
 */
import { GlobalPresetControlsStyles } from './editor-loader'

export { GlobalPresetControlsStyles }
