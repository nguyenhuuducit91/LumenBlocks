/**
 * Copy the styling of one block onto another.
 *
 * Styling a block here means setting a few dozen of its several hundred
 * attributes. Reproducing that on the next block by hand is the single most
 * repetitive thing anyone does with this plugin, and "duplicate then rewrite
 * the content" only works while the two blocks are the same type.
 *
 * What travels is styling, never content: the text of a heading, the source of
 * an image and the block's identity all stay where they are. What is left out
 * is as much a part of the feature as what is carried.
 */

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'
import { createHigherOrderComponent } from '@wordpress/compose'
import { BlockControls } from '@wordpress/block-editor'
import {
	ToolbarGroup, ToolbarDropdownMenu, MenuGroup, MenuItem,
} from '@wordpress/components'
import { useState } from '@wordpress/element'
import { useDispatch } from '@wordpress/data'
import { store as noticesStore } from '@wordpress/notices'
import { __, sprintf } from '@wordpress/i18n'
import { getBlockType } from '@wordpress/blocks'

/**
 * External dependencies
 */
import { i18n } from 'lumen'

const STORAGE_KEY = 'lumen-blocks/style-clipboard'

// Bumped whenever the shape below changes, so an old clipboard is ignored
// rather than pasted as nonsense.
const SIGNATURE = 'lumen:style:1'

/**
 * Attributes that identify or fill a block rather than style it.
 *
 * Anything matching these is left behind: pasting a style must never move one
 * block's words, images or anchor onto another, and `uniqueId` must stay unique
 * or two blocks will share a stylesheet.
 */
const NEVER_COPY = [
	'uniqueId',
	'anchor',
	'className',
	'lock',
	'metadata',
	'text',
	'content',
	'title',
	'subtitle',
	'description',
	'linkUrl',
	'linkNewTab',
	'linkRel',
	'imageUrl',
	'imageId',
	'imageAlt',
	'mediaId',
	'mediaUrl',
	'videoUrl',
	'blockVersion',
	'generatedCss',
]

/**
 * Whether an attribute carries styling rather than content.
 *
 * @param {string} name Attribute name.
 * @return {boolean} Whether to copy it.
 */
const isStyleAttribute = name => {
	if ( NEVER_COPY.includes( name ) ) {
		return false
	}

	// Content-bearing names, in every responsive and state spelling they take.
	return ! /^(text|content|title|subtitle|description|image|media|video|link|icon|htmlTag)([A-Z]|$)/.test( name )
}

/**
 * Reads the stored style, if there is one worth using.
 *
 * @return {Object|null} Attributes.
 */
export const readClipboard = () => {
	try {
		const raw = window.localStorage.getItem( STORAGE_KEY )

		if ( ! raw ) {
			return null
		}

		const parsed = JSON.parse( raw )

		return parsed?.signature === SIGNATURE ? parsed : null
	} catch {
		// A blocked or full localStorage is not worth breaking the editor over.
		return null
	}
}

/**
 * Stores a block's styling.
 *
 * @param {string} blockName Block the style came from, for the paste label.
 * @param {Object} styles    Attributes to keep.
 * @return {boolean} Whether the write succeeded.
 */
const writeClipboard = ( blockName, styles ) => {
	try {
		window.localStorage.setItem( STORAGE_KEY, JSON.stringify( {
			signature: SIGNATURE,
			blockName,
			styles,
		} ) )

		return true
	} catch {
		return false
	}
}

/**
 * The styling attributes of a block, as they differ from its defaults.
 *
 * Only what was actually changed is carried. Copying every attribute would
 * paste a wall of defaults over the target and undo settings the author never
 * touched on the block they copied from.
 *
 * @param {string} name       Block name.
 * @param {Object} attributes Block attributes.
 * @return {Object} Attributes to copy.
 */
const collectStyles = ( name, attributes ) => {
	const blockType = getBlockType( name )
	const defaults = blockType?.attributes || {}

	return Object.keys( attributes )
		.filter( isStyleAttribute )
		.filter( key => {
			const value = attributes[ key ]
			const fallback = defaults[ key ]?.default

			if ( value === undefined || value === '' || value === null ) {
				return false
			}

			if ( typeof value === 'object' ) {
				return JSON.stringify( value ) !== JSON.stringify( fallback )
			}

			return value !== fallback
		} )
		.reduce( ( styles, key ) => ( { ...styles, [ key ]: attributes[ key ] } ), {} )
}

/**
 * Keeps only what the target block actually understands.
 *
 * Pasting a card's style onto a heading should bring the padding and the
 * background and quietly drop the rest, rather than writing attributes the
 * block has never heard of into the post.
 *
 * @param {string} name   Target block name.
 * @param {Object} styles Attributes from the clipboard.
 * @return {Object} Attributes the target accepts.
 */
const filterForBlock = ( name, styles ) => {
	const accepted = getBlockType( name )?.attributes || {}

	return Object.keys( styles )
		.filter( key => key in accepted )
		.reduce( ( kept, key ) => ( { ...kept, [ key ]: styles[ key ] } ), {} )
}

const CopyStyleToolbar = props => {
	const {
		attributes, setAttributes, name,
	} = props

	// Re-render after a copy, so the paste entry updates without a reselect.
	const [ , bump ] = useState( 0 )
	const { createNotice } = useDispatch( noticesStore ) || {}

	const stored = readClipboard()

	const notify = message => createNotice?.( 'info', message, {
		type: 'snackbar',
		isDismissible: true,
	} )

	const onCopy = () => {
		const styles = collectStyles( name, attributes )

		if ( writeClipboard( name, styles ) ) {
			bump( value => value + 1 )
			notify( sprintf(
				/* translators: %d: how many settings were copied. */
				__( 'Copied %d settings.', i18n ),
				Object.keys( styles ).length
			) )
		}
	}

	const onPaste = () => {
		if ( ! stored ) {
			return
		}

		const usable = filterForBlock( name, stored.styles )
		const dropped = Object.keys( stored.styles ).length - Object.keys( usable ).length

		setAttributes( usable )

		notify( dropped
			? sprintf(
				/* translators: 1: settings applied, 2: settings the block cannot use. */
				__( 'Pasted %1$d settings. %2$d did not apply to this block.', i18n ),
				Object.keys( usable ).length,
				dropped
			)
			: sprintf(
				/* translators: %d: how many settings were pasted. */
				__( 'Pasted %d settings.', i18n ),
				Object.keys( usable ).length
			) )
	}

	const onReset = () => {
		const defaults = getBlockType( name )?.attributes || {}

		// Back to the block type's own defaults, one attribute at a time —
		// there is no "clear all" that the block editor understands.
		const cleared = Object.keys( collectStyles( name, attributes ) )
			.reduce( ( reset, key ) => ( {
				...reset,
				[ key ]: defaults[ key ]?.default,
			} ), {} )

		setAttributes( cleared )
		notify( __( 'Styling reset.', i18n ) )
	}

	const copiedCount = stored ? Object.keys( stored.styles ).length : 0

	return (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon="admin-appearance"
					label={ __( 'Copy or paste styling', i18n ) }
				>
					{ () => (
						<MenuGroup>
							<MenuItem icon="admin-page" onClick={ onCopy }>
								{ __( 'Copy styling', i18n ) }
							</MenuItem>

							<MenuItem
								icon="clipboard"
								disabled={ ! stored }
								onClick={ onPaste }
							>
								{ stored
									? sprintf(
										/* translators: %d: how many settings are on the clipboard. */
										__( 'Paste styling (%d)', i18n ),
										copiedCount
									)
									: __( 'Paste styling', i18n ) }
							</MenuItem>

							<MenuItem
								icon="image-rotate"
								isDestructive
								onClick={ onReset }
							>
								{ __( 'Reset styling', i18n ) }
							</MenuItem>
						</MenuGroup>
					) }
				</ToolbarDropdownMenu>
			</ToolbarGroup>
		</BlockControls>
	)
}

/**
 * Adds the toolbar to every block of this plugin.
 */
const withCopyStyle = createHigherOrderComponent(
	BlockEdit => props => {
		if ( ! props.name?.startsWith( 'lumen/' ) || ! props.isSelected ) {
			return <BlockEdit { ...props } />
		}

		return (
			<>
				<BlockEdit { ...props } />
				<CopyStyleToolbar { ...props } />
			</>
		)
	},
	'withCopyStyle'
)

addFilter( 'editor.BlockEdit', 'lumen/copy-style', withCopyStyle )
