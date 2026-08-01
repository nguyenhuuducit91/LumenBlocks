import heroBg from './images/hero-bg.webp'
import profile from './images/profile.webp'
import { blockStyleGenerators } from './block-style-generators'

import {
	i18n, srcUrl, version as VERSION,
} from 'lumen'

import { CssSaveCompiler } from '../../ui/block-css'
import {
	cleanSerializedBlock,
	createUniqueClass,
} from '~lumen/utils'
import { PLACEHOLDER_INNER_BLOCKS } from './block-templates'

import { __, sprintf } from '@wordpress/i18n'
import { RawHTML } from '@wordpress/element'
import {
	createBlock, serialize,
	createBlocksFromInnerBlocksTemplate,
	getBlockVariations,
} from '@wordpress/blocks'
import { DEFAULT_CONTENT, addPlaceholderForPostsBlock } from '../design-library/util'

export const DUMMY_COLOR_SCHEMES = [
	{
		name: 'Base Color Scheme',
		key: 'color-scheme-1',
		normal: {
			backgroundColor: '#fff',
			headingColor: '#1e1e1e',
			textColor: '#1e1e1e',
			linkColor: '#1e1e1e',
			accentColor: '#39414d',
			buttonBackgroundColor: '#008de4',
			buttonTextColor: '#fff',
			buttonOutlineColor: '#008de4',
		},
		hover: {},
		parentHover: {},
	},
	{
		name: 'Background Color Scheme',
		key: 'color-scheme-2',
		normal: {
			backgroundColor: '#f1f1f1',
			headingColor: '#1e1e1e',
			textColor: '#1e1e1e',
			linkColor: '#1e1e1e',
			accentColor: '#39414d',
			buttonBackgroundColor: '#008de4',
			buttonTextColor: '#fff',
			buttonOutlineColor: '#008de4',
		},
		hover: {},
		parentHover: {},
	},
]

const SERIALIZE_CALLBACKS = {
	'lumen/tabs': serialized => serialized.replace( '"lmn-block-tabs__tab"', '"lmn-block-tabs__tab lmn-block-tabs__tab--active"' ),
	'lumen/countdown': serialized => serialized.replace(
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-day"></div>',
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-day">10</div>'
	).replace(
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-hour"></div>',
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-hour">12</div>'
	).replace(
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-minute"></div>',
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-minute">30</div>'
	).replace(
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-second"></div>',
		'<div class="lmn-block-countdown__digit lmn-block-countdown__digit-second">45</div>',
	),
	'lumen/icon-list': ( serialized, attributes ) => serialized.replace(
		/#lmn-icon-list__icon-svg-def-[^"]*/g,
		`#lmn-icon-list__icon-svg-def-${ attributes.uniqueId }`
	),
}

const ADDITIONAL_ATTRIBUTES = {
	'lumen/heading': { text: __( 'Heading', i18n ) },
	'lumen/text': { text: __( 'Text', i18n ) },
	'lumen/subtitle': { text: __( 'Subtitle', i18n ) },
	'lumen/card': { imageExternalUrl: `${ srcUrl }/${ heroBg }` },
	'lumen/count-up': { text: '1,234.56' },
	'lumen/icon-list-item': { text: __( 'List Item', i18n ) },
	'lumen/number-box': { text: __( '1', i18n ) },
	'lumen/table-of-contents': {
		headings: [
			{
				content: sprintf( __( 'Heading %s', i18n ), 1 ),
				level: 1,
				anchor: 'heading-1',
				clientId: '72dfd683-3844-47a3-af9d-76eddbf6d51c',
				tag: 1,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 2 ),
				level: 2,
				anchor: 'heading-2-1',
				clientId: 'd9208411-5aef-4446-893b-f41226ba7858',
				tag: 2,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 3 ),
				level: 3,
				anchor: 'heading-3',
				clientId: 'fb915b6c-f956-44dc-8c50-44ccbb8e430c',
				tag: 3,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 4 ),
				level: 4,
				anchor: 'heading-4',
				clientId: '350dd450-77f6-430d-a9f3-0be449c64235',
				tag: 4,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 5 ),
				level: 5,
				anchor: 'heading-5',
				clientId: '41cde9d8-2585-47ea-a6ba-a3a208a0ede3',
				tag: 5,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 6 ),
				level: 6,
				anchor: 'heading-6',
				clientId: '375f0cb3-2aa1-478b-a3a7-de5dedd3dd38',
				tag: 6,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 2 ),
				level: 2,
				anchor: 'heading-2-2',
				clientId: '642f3b01-8ead-4813-a092-22d9995610c0',
				tag: 2,
				isExcluded: false,
			},
			{
				content: sprintf( __( 'Heading %s', i18n ), 2 ),
				level: 2,
				anchor: 'heading-2-3',
				clientId: 'f0ad1cb6-332f-406b-9f3f-d41e08725740',
				tag: 2,
				isExcluded: false,
			},
		],
	},
}

const INNER_BLOCK_CALLBACKS = {
	'lumen/team-member': innerBlocks => {
		if ( innerBlocks?.[ 0 ]?.attributes ) {
			innerBlocks[ 0 ].attributes.imageExternalUrl = `${ srcUrl }/${ profile }`
		}

		return innerBlocks
	},
	'lumen/testimonial': innerBlocks => {
		if ( innerBlocks?.[ 1 ]?.attributes ) {
			innerBlocks[ 1 ].attributes.imageExternalUrl = `${ srcUrl }/${ profile }`
		}

		return innerBlocks
	},
}

/* eslint-disable jsx-a11y/anchor-is-valid */
export const DefaultButton = ( {
	text, dataDevice = 'desktop', style = '',
} ) => {
	return <>
		<div className="wp-block-lumen-button lmn-block-button lmn-block lmn-5609083" data-block-id="5609083">
			{ style && <style> { style } </style> }
			<a className="lmn-link lmn-button lmn--hover-effect-darken" href="" onClick={ e => e.preventDefault() }>
				<span className="lmn-button__inner-text lmb-style-guide__typography-preview" data-device={ dataDevice }>{ text }</span>
			</a>
		</div>
	</>
}

export const DefaultOutlineButton = ( {
	text, dataDevice = 'desktop', style = '',
} ) => {
	return <>

		<div className="wp-block-lumen-button lmn-block-button is-style-ghost lmn-block lmn-3f9ae3c" data-block-id="3f9ae3c">
			<style>{ '.lmn-3f9ae3c .lmn-button{background:transparent !important;}.lmn-3f9ae3c .lmn-button:hover:after{background:transparent !important;opacity:1 !important;}:where(.lmn-hover-parent:hover,  .lmn-hover-parent.lmn--is-hovered) .lmn-3f9ae3c .lmn-button:after{background:transparent !important;opacity:1 !important;}.lmn-3f9ae3c .lmn-button:before{border-style:solid !important;}' }</style>
			{ style && <style> { style } </style> }
			<a className="lmn-link lmn-button lmn--hover-effect-darken" href="" onClick={ e => e.preventDefault() }>
				<span className="lmn-button__inner-text lmb-style-guide__typography-preview" data-device={ dataDevice }>{ text }</span>
			</a>
		</div>

	</>
}

const getGeneratedCss = ( blocks, generateForInnerBlocks = false ) => {
	const list = Array.isArray( blocks ) ? blocks : []
	return list.map( block => {
		if ( ! block.attributes.uniqueId ) {
			block.attributes.uniqueId = createUniqueClass( block.clientId )
		}

		const blockStyleGenerator = blockStyleGenerators[ block.name ]
		const attrNamesWithValues = blockStyleGenerator.getAttributesWithValues( block.attributes )
		const blockStyleDefs = blockStyleGenerator.getBlockStyles( attrNamesWithValues )

		const cssCompiler = new CssSaveCompiler()
		const saveCss = blockStyleGenerator.generateBlockStylesForSave(
			cssCompiler,
			block.attributes,
			blockStyleDefs,
			{
				version: VERSION,
			}
		)

		block.attributes.generatedCss = saveCss

		if ( generateForInnerBlocks && Array.isArray( block.innerBlocks ) ) {
			block.innerBlocks = getGeneratedCss( block.innerBlocks, generateForInnerBlocks )
		}

		return block
	} )
}

const getSerializedBlock = props => {
	const {
		blockName: _blockName, attributes, innerBlocks,
	} = props

	let blockName = _blockName

	let block = createBlock( blockName, attributes, innerBlocks )
	let newBlock = getGeneratedCss( [ block ] )
	let serialized = serialize( newBlock )

	if ( blockName === 'lumen/timeline' ) {
		const _block = createBlock( blockName, attributes, innerBlocks )
		_block.attributes.timelineIsLast = true
		const duplicateBlock = getGeneratedCss( [ _block ] )
		serialized += '\n' + serialize( duplicateBlock )
	}

	if ( blockName === 'lumen/accordion' ) {
		const _block = createBlock( blockName, attributes, innerBlocks )
		_block.attributes.startOpen = true
		_block.attributes.blockMargin = {
			top: 24, bottom: 0, left: 0, right: 0,
		}
		const duplicateBlock = getGeneratedCss( [ _block ] )
		serialized += '\n' + serialize( duplicateBlock )
	}

	if ( blockName === 'lumen/column' ) {
		block = createBlock( 'lumen/columns', {}, [ block ] )
		newBlock = getGeneratedCss( [ block ] )
		serialized = serialize( newBlock )
		blockName = 'lumen/columns'
	}

	if ( blockName === 'lumen/icon-list-item' ) {
		block = createBlock( 'lumen/icon-list', {}, [ block ] )
		newBlock = getGeneratedCss( [ block ] )
		serialized = serialize( newBlock )
		blockName = 'lumen/icon-list'
	}

	if ( blockName === 'lumen/posts' ) {
		const defaultValues = DEFAULT_CONTENT[ 'post-loop' ]
		serialized = addPlaceholderForPostsBlock( serialized, defaultValues.posts_placeholder, defaultValues, `${ srcUrl }/${ heroBg }` )
	}

	return {
		serialized, blockName, attributes: block.attributes,
	}
}

export const RenderBlock = props => {
	const {
		name = __( 'Default', i18n ), ...propsToPass
	} = props

	const {
		serialized, blockName, attributes,
	} = getSerializedBlock( propsToPass )

	return (
		<>
			{ /* Insert the label as a string inside RawHTML so that it appears within
			the <div> wrapper that RawHTML generates, ensuring proper structure. */ }
			<RawHTML>
				{ cleanSerializedBlock( serialized, SERIALIZE_CALLBACKS[ blockName ], attributes ) }
				{ `<p>${ name }</p>` }
			</RawHTML>
		</>
	)
}

export const getPlaceholders = blockName => {
	let innerBlocks = []
	let attributes = {}

	const variations = getBlockVariations( blockName )

	if ( blockName in PLACEHOLDER_INNER_BLOCKS ) {
		innerBlocks = createBlocksFromInnerBlocksTemplate( PLACEHOLDER_INNER_BLOCKS[ blockName ] )
	} else if ( variations.length && variations[ 0 ].innerBlocks?.length ) {
		innerBlocks = createBlocksFromInnerBlocksTemplate( variations[ 0 ].innerBlocks )

		if ( blockName in INNER_BLOCK_CALLBACKS ) {
			innerBlocks = INNER_BLOCK_CALLBACKS[ blockName ]( innerBlocks )
		}
	}

	if ( innerBlocks.length ) {
		innerBlocks = getGeneratedCss( innerBlocks, true )
	}

	if ( variations.length && variations[ 0 ].attributes ) {
		attributes = variations[ 0 ].attributes
	}

	if ( blockName in ADDITIONAL_ATTRIBUTES ) {
		attributes = {
			...attributes,
			...ADDITIONAL_ATTRIBUTES[ blockName ],
		}
	}

	return {
		attributes, innerBlocks,
	}
}
