/**
 * External dependencies
 */
import {
	Advanced,
	Alignment,
	BlockDiv,
	EffectsAnimations,
	MarginBottom,
	Transform,
} from '~lumen/features'
// import { useBlockAttributesContext } from '~lumen/hooks'
import { BlockStyleGenerator } from '~lumen/ui'

/**
 * WordPress dependencies
 */
// import { applyFilters } from '@wordpress/hooks'

const blockStyles = new BlockStyleGenerator( {
	versionAdded: '3.0.0',
	versionDeprecated: '',
} )

blockStyles.addBlockStyles( 'columnSpacing', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-columns-spacing',
	attrName: 'columnSpacing',
	key: 'columnSpacing',
	hasUnits: 'px',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'horizontalScrollerColumnGap', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-column-gap',
	attrName: 'horizontalScrollerColumnGap',
	key: 'horizontalScrollerColumnGap-save',
	format: '%spx',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'horizontalScrollerColumnWidth', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-column-width',
	attrName: 'horizontalScrollerColumnWidth',
	key: 'horizontalScrollerColumnWidth-save',
	hasUnits: 'px',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'horizontalScrollerHeight', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-column-height',
	attrName: 'horizontalScrollerHeight',
	key: 'horizontalScrollerHeight-save',
	format: '%spx',
} ] )

blockStyles.addBlockStyles( 'horizontalScrollerLeftOffset', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-left-offset',
	attrName: 'horizontalScrollerLeftOffset',
	key: 'horizontalScrollerLeftOffset-save',
	hasUnits: 'px',
	responsive: 'all',
} ] )

blockStyles.addBlockStyles( 'horizontalScrollerSnap', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-snapping',
	attrName: 'horizontalScrollerSnap',
	key: 'horizontalScrollerSnap-save',
} ] )

blockStyles.addBlockStyles( 'scrollbarHeight', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-scrollbar-height',
	attrName: 'scrollbarHeight',
	key: 'scrollbarHeight',
	format: '%spx',
	enabledCallback: getAttribute => getAttribute( 'showScrollbar' ),
	dependencies: [ 'showScrollbar' ],
}, {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-scrollbar-height-firefox',
	attrName: 'scrollbarHeight',
	key: 'scrollbarHeightFirefox',
	valueCallback: value => {
		return value === 0 ? 'none' : ( value < 10 ? 'thin' : 'auto' )
	},
	enabledCallback: getAttribute => getAttribute( 'showScrollbar' ),
	dependencies: [ 'showScrollbar' ],
} ] )

blockStyles.addBlockStyles( 'scrollbarTrackColor', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-scrollbar-track-color',
	attrName: 'scrollbarTrackColor',
	key: 'scrollbarTrackColor',
	enabledCallback: getAttribute => getAttribute( 'showScrollbar' ),
	dependencies: [ 'showScrollbar' ],
} ] )

blockStyles.addBlockStyles( 'scrollbarThumbColor', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-scrollbar-thumb-color',
	attrName: 'scrollbarThumbColor',
	key: 'scrollbarThumbColor',
	enabledCallback: getAttribute => getAttribute( 'showScrollbar' ),
	dependencies: [ 'showScrollbar' ],
} ] )

blockStyles.addBlockStyles( 'scrollbarThumbRadius', [ {
	selector: '.%s-horizontal-scroller',
	styleRule: '--lmn-scrollbar-thumb-radius',
	attrName: 'scrollbarThumbRadius',
	key: 'scrollbarThumbRadius',
	hasUnits: 'px',
	enabledCallback: getAttribute => getAttribute( 'showScrollbar' ),
	dependencies: [ 'showScrollbar' ],
} ] )

Alignment.addStyles( blockStyles, {
	editorSelectorCallback: getAttribute => `.lmn--block-align-${ getAttribute( 'uniqueId' ) } > .block-editor-inner-blocks > .block-editor-block-list__layout`,
} )
BlockDiv.addStyles( blockStyles )
MarginBottom.addStyles( blockStyles )
Advanced.addStyles( blockStyles )
Transform.addStyles( blockStyles )
EffectsAnimations.addStyles( blockStyles )

export default blockStyles
