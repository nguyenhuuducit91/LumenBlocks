/**
 * Conditional display.
 *
 * Whether a block appears at all — decided on the server, so a block meant for
 * members only never reaches anyone else's page source. See
 * `src/conditional-display.php` for the half that does the deciding.
 *
 * The conditions are a short closed list on purpose. Post content is not a
 * place from which arbitrary queries should be reachable, so an author picks
 * from named cases rather than writing an expression.
 */

/**
 * External dependencies
 */
import { i18n } from 'lumen'
import {
	AdvancedSelectControl,
	AdvancedTextControl,
	AdvancedToggleControl,
	InspectorAdvancedControls,
	PanelAdvancedSettings,
} from '~lumen/ui'
import { useBlockAttributesContext, useBlockSetAttributesContext } from '~lumen/hooks'

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'

const CONDITIONS = [
	{ value: '', label: __( 'Always show', i18n ) },
	{ value: 'logged-in', label: __( 'Reader is logged in', i18n ) },
	{ value: 'logged-out', label: __( 'Reader is logged out', i18n ) },
	{ value: 'user-role', label: __( 'Reader has a role', i18n ) },
	{ value: 'date-after', label: __( 'On or after a date', i18n ) },
	{ value: 'date-before', label: __( 'On or before a date', i18n ) },
	{ value: 'date-between', label: __( 'Between two dates', i18n ) },
	{ value: 'post-type', label: __( 'Post type is', i18n ) },
	{ value: 'front-page', label: __( 'On the front page', i18n ) },
	{ value: 'singular', label: __( 'On a single post or page', i18n ) },
	{ value: 'archive', label: __( 'On an archive', i18n ) },
	{ value: 'search', label: __( 'On a search results page', i18n ) },
	{ value: 'mobile', label: __( 'Reader is on a phone', i18n ) },
	{ value: 'desktop', label: __( 'Reader is not on a phone', i18n ) },
]

const ROLES = [
	{ value: 'administrator', label: __( 'Administrator', i18n ) },
	{ value: 'editor', label: __( 'Editor', i18n ) },
	{ value: 'author', label: __( 'Author', i18n ) },
	{ value: 'contributor', label: __( 'Contributor', i18n ) },
	{ value: 'subscriber', label: __( 'Subscriber', i18n ) },
	{ value: 'customer', label: __( 'Customer', i18n ) },
]

const NEEDS_DATE_FROM = [ 'date-after', 'date-between' ]
const NEEDS_DATE_TO = [ 'date-before', 'date-between' ]

export const Edit = () => {
	const condition = useBlockAttributesContext( attributes => attributes.displayCondition ) || {}
	const setAttributes = useBlockSetAttributesContext()

	const update = next => setAttributes( {
		displayCondition: { ...condition, ...next },
	} )

	const type = condition.type || ''

	return (
		<Fragment>
			<InspectorAdvancedControls>
				<PanelAdvancedSettings
					title={ __( 'Conditional Display', i18n ) }
					id="conditional-display"
					showModifiedIndicator={ !! type }
				>
					<AdvancedSelectControl
						/*
						 * Every control in this panel edits one key of the same
						 * `displayCondition` object, so none of them can claim
						 * the attribute through the usual `attribute` prop. The
						 * first one carries the marker on behalf of the panel,
						 * which is where a jump should land anyway.
						 */
						className="lmn-control--attr-displayCondition"
						label={ __( 'Show this block when', i18n ) }
						options={ CONDITIONS }
						value={ type }
						onChange={ value => update( { type: value } ) }
						help={ __(
							'Checked when the page is built, so a hidden block is never sent to the reader at all.',
							i18n
						) }
					/>

					{ 'user-role' === type && (
						<AdvancedSelectControl
							label={ __( 'Role', i18n ) }
							options={ ROLES }
							value={ condition.role || '' }
							onChange={ value => update( { role: value } ) }
						/>
					) }

					{ NEEDS_DATE_FROM.includes( type ) && (
						<AdvancedTextControl
							label={ __( 'From', i18n ) }
							type="datetime-local"
							value={ condition.dateFrom || '' }
							onChange={ value => update( { dateFrom: value } ) }
							help={ __( 'Read in the site’s own timezone.', i18n ) }
						/>
					) }

					{ NEEDS_DATE_TO.includes( type ) && (
						<AdvancedTextControl
							label={ __( 'Until', i18n ) }
							type="datetime-local"
							value={ condition.dateTo || '' }
							onChange={ value => update( { dateTo: value } ) }
						/>
					) }

					{ 'post-type' === type && (
						<AdvancedTextControl
							label={ __( 'Post type', i18n ) }
							value={ condition.postType || '' }
							onChange={ value => update( { postType: value } ) }
							placeholder="post"
						/>
					) }

					{ !! type && (
						<AdvancedToggleControl
							label={ __( 'Hide instead of show', i18n ) }
							checked={ !! condition.hideWhenMatched }
							onChange={ value => update( { hideWhenMatched: value } ) }
							help={ __(
								'Turns the rule around: the block is hidden exactly when the condition is met.',
								i18n
							) }
						/>
					) }

					{ !! type && (
						<p className="components-base-control__help">
							{ __(
								'The block always shows while you are editing, so you can still work on it.',
								i18n
							) }
						</p>
					) }

					{ applyFilters( 'lumen.block-component.conditional-display.control', null ) }
				</PanelAdvancedSettings>
			</InspectorAdvancedControls>
		</Fragment>
	)
}

Edit.defaultProps = {
}
