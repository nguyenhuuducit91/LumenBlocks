import { i18n } from 'lumen'

import {
	__, _x, sprintf,
} from '@wordpress/i18n'

export const LONG_TEXT = [
	// Translators: This is placeholder text used in the style guide.
	__( 'They didn\'t plan to build a life around shared walls and hand-me-down furniture, but somehow, it worked.', i18n ),
	// Translators: This is placeholder text used in the style guide.
	__( 'Morning routines bled into late-night talks, and even the silence felt familiar.', i18n ),
	// Translators: This is placeholder text used in the style guide.
	__( 'Careers shifted, relationships changed, and expectations rarely lined up with reality.', i18n ),
	// Translators: This is placeholder text used in the style guide.
	__( 'But there was always time for inside jokes, spontaneous distractions, and someone to show up, even without being asked.', i18n ),
	// Translators: This is placeholder text used in the style guide.
	__( 'Each of them brought something different—quiet patience, loud opinions, unexpected wisdom.', i18n ),
	// Translators: This is placeholder text used in the style guide.
	__( 'Change arrived slowly, then all at once. Some said goodbye, some stayed longer, and some simply evolved.', i18n ),
]

const BUTTON_GROUP_TEMPLATE = [
	[ 'lumen/button', { text: __( 'Button', i18n ) } ],
	[ 'lumen/button', { text: __( 'Button', i18n ) } ],
]

const CAROUSEL_TEMPLATE = [
	[ 'lumen/column', {}, [
		[ 'lumen/heading', { text: __( 'Slide', i18n ) } ],
		[ 'lumen/text', { text: LONG_TEXT[ 2 ] } ],
	] ],
]

const COLUMN_TEMPLATE = [
	[ 'lumen/heading', { text: __( 'Column', i18n ) } ],
	[ 'lumen/text', { text: LONG_TEXT[ 1 ] } ],
]

const HORIZONTAL_SCROLLER_TEMPLATE = [
	[ 'lumen/column', {}, [
		[ 'lumen/heading', { text: __( 'Heading', i18n ) } ],
		[ 'lumen/text', { text: LONG_TEXT[ 5 ] } ],
	] ],
	[ 'lumen/column', {}, [
		[ 'lumen/heading', { text: __( 'Heading', i18n ) } ],
		[ 'lumen/text', { text: LONG_TEXT[ 4 ] } ],
	] ],
	[ 'lumen/column', {}, [
		[ 'lumen/heading', { text: __( 'Heading', i18n ) } ],
		[ 'lumen/text', { text: LONG_TEXT[ 3 ] } ],
	] ],
]

const COLUMNS_TEMPLATE = [
	HORIZONTAL_SCROLLER_TEMPLATE[ 2 ],
	HORIZONTAL_SCROLLER_TEMPLATE[ 0 ],
]

const ICON_BOX_TEMPLATE = [
	[ 'lumen/icon-label', { blockMargin: { bottom: 0 } }, [
		[ 'lumen/icon', { contentAlign: 'left' } ],
		[ 'lumen/heading', {
			text: __( 'Icon Box', i18n ), hasP: true, textTag: 'h4',
		} ],
	] ],
	[ 'lumen/text', { text: __( 'Description for this block.', i18n ) } ],
]

const ICON_LABEL_TEMPLATE = [
	[ 'lumen/icon', { contentAlign: 'left' } ],
	[ 'lumen/heading', {
		text: __( 'Icon Label', i18n ), hasP: true, textTag: 'h4',
	} ],
]

const ICON_LIST_TEMPLATE = [
	[ 'lumen/icon-list-item', { text: __( 'List Item', i18n ) } ],
	[ 'lumen/icon-list-item', { text: __( 'List Item', i18n ) } ],
	[ 'lumen/icon-list-item', { text: __( 'List Item', i18n ) } ],
]

const PRICE_TEMPLATE = [
	[ 'lumen/text', {
		text: '$', htmlTag: 'span', innerTextTag: 'span',
	} ],
	[ 'lumen/text', {
		text: '99', htmlTag: 'span', innerTextTag: 'span', className: 'lmn-block-price__price',
	} ],
	[ 'lumen/text', {
		text: '.00', htmlTag: 'span', innerTextTag: 'span',
	} ],
]

const PRICING_BOX_TEMPLATE = [
	[ 'lumen/heading', {
		text: __( 'Title for This Block', i18n ), textTag: 'h3',
	} ],
	[ 'lumen/price', {}, PRICE_TEMPLATE ],
	[ 'lumen/subtitle', { text: __( 'Subtitle for This Block', i18n ) } ],
	[ 'lumen/icon-list', {}, [
		[ 'lumen/icon-list-item', { text: sprintf( __( 'Package inclusion %s', i18n ), __( 'one', i18n ) ) } ],
		[ 'lumen/icon-list-item', { text: sprintf( __( 'Package inclusion %s', i18n ), __( 'two', i18n ) ) } ],
		[ 'lumen/icon-list-item', { text: sprintf( __( 'Package inclusion %s', i18n ), __( 'three', i18n ) ) } ],
	] ],
	[ 'lumen/button-group', {}, [
		[ 'lumen/button', {
			text: __( 'Button', i18n ),
		} ],
	] ],
]

const TABS_TEMPLATE = [
	[ 'lumen/tab-labels', {
		tabLabels: [
			{ label: sprintf( __( 'Tab %d', i18n ), 1 ), icon: '' },
			{ label: sprintf( __( 'Tab %d', i18n ), 2 ), icon: '' },
			{ label: sprintf( __( 'Tab %d', i18n ), 3 ), icon: '' },
		],
		blockShadow: 'inset 0px -1px 0px 0px rgba(0,0,0, 0.1)',
		tabBorderType: 'solid',
		tabBorderColor: 'transparent',
		tabBorderWidth: {
			top: 0,
			right: 0,
			bottom: 2,
			left: 0,
		},
		activeTabBorderColor: '#000000',
		tabTextColor1: '#999999',
		activeTabTextColor: '#000000',
		tabTextColorHover: '#000000',
		tabIconColor1: '#909090',
		activeTabIconColor1: '#000000',
		tabIconColor1Hover: '#909090',
		activeTabIconColor1Hover: '#000000',
		tabBackgroundColor: 'transparent',
	} ],
	[ 'lumen/tab-content', {}, [
		[ 'lumen/text', { text: LONG_TEXT[ 0 ] } ],
	] ],
]

const TIMELINE_TEMPLATE = [
	[ 'lumen/column', {
		columnSpacing: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	}, [
		[ 'lumen/text', { text: _x( 'Description for this block. Use this space for describing your block. Any text will do.', 'Content placeholder', i18n ) } ],
	] ],
]

const playIcon = '<svg data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>'

const VIDEO_POPUP_TEMPLATE = [
	[ 'lumen/icon', {
		contentAlign: 'center', icon: playIcon, linkHasLink: false,
	} ],
	[ 'lumen/image', { enableHandles: false } ],
]

export const PLACEHOLDER_INNER_BLOCKS = {
	'lumen/button-group': BUTTON_GROUP_TEMPLATE,
	'lumen/carousel': CAROUSEL_TEMPLATE,
	'lumen/column': COLUMN_TEMPLATE,
	'lumen/columns': COLUMNS_TEMPLATE,
	'lumen/horizontal-scroller': HORIZONTAL_SCROLLER_TEMPLATE,
	'lumen/icon-box': ICON_BOX_TEMPLATE,
	'lumen/icon-label': ICON_LABEL_TEMPLATE,
	'lumen/icon-list': ICON_LIST_TEMPLATE,
	'lumen/price': PRICE_TEMPLATE,
	'lumen/pricing-box': PRICING_BOX_TEMPLATE,
	'lumen/tabs': TABS_TEMPLATE,
	'lumen/timeline': TIMELINE_TEMPLATE,
	'lumen/video-popup': VIDEO_POPUP_TEMPLATE,
}
