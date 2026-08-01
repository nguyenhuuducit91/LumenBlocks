/**
 * Everything this block currently sets, in one list.
 *
 * The complaint that sinks a big inspector is not "too many settings", it is
 * "I cannot find the one I changed". A block here carries around 357
 * attributes; ten minutes into styling one there is no way to answer "what have
 * I actually changed" — or to undo one particular change — short of scrolling
 * every panel and comparing against memory. Undo does not help either: it walks
 * back everything in order, not the one value you regret.
 *
 * So each row answers three questions at once: what is set, at which viewport
 * or state, and what to do about it — go to the control that owns it, or remove
 * just this one value.
 *
 * The list is derived, never stored: an attribute appears when its value
 * differs from the block type's default, and disappears when it is put back.
 */

/**
 * WordPress dependencies
 */
import { useMemo, memo } from '@wordpress/element'
import { useSelect } from '@wordpress/data'
import { store as blockEditorStore, useBlockEditContext } from '@wordpress/block-editor'
import { getBlockType } from '@wordpress/blocks'
import { __, sprintf } from '@wordpress/i18n'
import { Button } from '@wordpress/components'

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import { startCase } from 'lodash'
import { useBlockSetAttributesContext } from '~lumen/hooks'
import { requestSearch } from '../inspector-search'

/**
 * Attributes that are plumbing rather than design decisions.
 *
 * `uniqueId` identifies the block, `className` and `anchor` belong to
 * WordPress, and the version fields exist so migrations can find their way.
 * Listing any of them as "something you changed" would be noise.
 */
const HIDDEN = [
	'uniqueId',
	'className',
	'anchor',
	'lock',
	'metadata',
	'blockVersion',
	'version',
	'hasBackground',
	'hasBorders',
	'modifiedBlockStyle',
	'customAttributes',
	'generatedCss',
]

// Suffixes that say which viewport or state an attribute belongs to.
const CONTEXTS = [
	{ suffix: 'TabletHover', label: __( 'Tablet · hover', i18n ) },
	{ suffix: 'MobileHover', label: __( 'Mobile · hover', i18n ) },
	{ suffix: 'ParentHover', label: __( 'Parent hover', i18n ) },
	{ suffix: 'Collapsed', label: __( 'Collapsed', i18n ) },
	{ suffix: 'Tablet', label: __( 'Tablet', i18n ) },
	{ suffix: 'Mobile', label: __( 'Mobile', i18n ) },
	{ suffix: 'Hover', label: __( 'Hover', i18n ) },
]

/**
 * Whether a value counts as "not set".
 *
 * An attribute can be empty in several shapes — an empty string, an object
 * whose sides are all undefined — and all of them mean the same thing here.
 *
 * @param {*} value Attribute value.
 * @return {boolean} Whether it is empty.
 */
const isEmpty = value => {
	if ( value === undefined || value === null || value === '' ) {
		return true
	}

	if ( Array.isArray( value ) ) {
		return value.length === 0
	}

	if ( typeof value === 'object' ) {
		return Object.values( value ).every( isEmpty )
	}

	return false
}

/**
 * Turns an attribute name into something a person would recognise.
 *
 * @param {string} name Attribute name.
 * @return {{label: string, context: string}} Label and the viewport or state.
 */
const readName = name => {
	const found = CONTEXTS.find( ( { suffix } ) => name.endsWith( suffix ) )
	const base = found ? name.slice( 0, -found.suffix.length ) : name

	return {
		label: startCase( base ),
		context: found ? found.label : '',
	}
}

/**
 * A short, readable rendering of a value.
 *
 * @param {*} value Attribute value.
 * @return {string} Something that fits on one line.
 */
const format = value => {
	if ( typeof value === 'boolean' ) {
		return value ? __( 'on', i18n ) : __( 'off', i18n )
	}

	if ( value && typeof value === 'object' ) {
		const parts = Object.entries( value )
			.filter( ( [ , item ] ) => ! isEmpty( item ) )
			.map( ( [ key, item ] ) => `${ key }: ${ item }` )

		return parts.join( ', ' )
	}

	return String( value )
}

/**
 * Everything the selected block sets, as a list.
 *
 * Exported so the panel's own title can carry the count without deriving it a
 * second time and risking the two disagreeing.
 *
 * @return {Array} One entry per applied setting.
 */
export const useAppliedSettings = () => {
	const { name, clientId } = useBlockEditContext()

	const attributes = useSelect(
		select => select( blockEditorStore ).getBlockAttributes( clientId ),
		[ clientId ]
	)

	return useMemo( () => {
		const blockType = getBlockType( name )

		if ( ! blockType || ! attributes ) {
			return []
		}

		return Object.keys( attributes )
			.filter( key => ! HIDDEN.includes( key ) )
			.filter( key => {
				const value = attributes[ key ]
				const fallback = blockType.attributes?.[ key ]?.default

				if ( isEmpty( value ) ) {
					return false
				}

				// Objects and arrays need comparing by content, not identity.
				if ( typeof value === 'object' ) {
					return JSON.stringify( value ) !== JSON.stringify( fallback )
				}

				return value !== fallback
			} )
			.map( key => ( {
				name: key,
				value: attributes[ key ],
				fallback: blockType.attributes?.[ key ]?.default,
				...readName( key ),
			} ) )
			.sort( ( a, b ) => a.label.localeCompare( b.label ) )
	}, [ attributes, name ] )
}

const BlockChangesPanel = () => {
	const setAttributes = useBlockSetAttributesContext()
	const applied = useAppliedSettings()

	if ( ! applied.length ) {
		return (
			<p className="lmn-block-changes__empty">
				{ __( 'Nothing is set on this block yet — everything is at its default.', i18n ) }
			</p>
		)
	}

	/**
	 * Puts every listed setting back to the block type's default.
	 */
	const clearAll = () => setAttributes( applied.reduce(
		( reset, setting ) => ( { ...reset, [ setting.name ]: setting.fallback } ),
		{}
	) )

	return (
		<div className="lmn-block-changes">
			<ul className="lmn-block-changes__list">
				{ applied.map( setting => (
					<li key={ setting.name } className="lmn-block-changes__row">
						{ /*
						 * Going to a setting is the search doing its job: it
						 * already knows how to walk the tabs and open the right
						 * panel, so the row hands it the label and stands back.
						 */ }
						<button
							type="button"
							className="lmn-block-changes__jump"
							onClick={ () => requestSearch( setting.label ) }
							aria-label={ sprintf(
								/* translators: %s: the name of the setting. */
								__( 'Go to %s', i18n ),
								setting.label
							) }
						>
							<span className="lmn-block-changes__label">
								{ setting.label }
								{ setting.context && (
									<span className="lmn-block-changes__context">
										{ setting.context }
									</span>
								) }
							</span>
							<span className="lmn-block-changes__value">
								{ format( setting.value ) }
							</span>
						</button>

						<Button
							className="lmn-block-changes__reset"
							icon="image-rotate"
							isSmall
							label={ sprintf(
								/* translators: %s: the name of the setting. */
								__( 'Reset %s', i18n ),
								setting.label
							) }
							showTooltip
							onClick={ () => setAttributes( {
								[ setting.name ]: setting.fallback,
							} ) }
						/>
					</li>
				) ) }
			</ul>

			<Button
				className="lmn-block-changes__clear"
				variant="tertiary"
				isDestructive
				isSmall
				onClick={ clearAll }
			>
				{ __( 'Clear everything', i18n ) }
			</Button>
		</div>
	)
}

export default memo( BlockChangesPanel )
