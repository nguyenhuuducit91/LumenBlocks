/**
 * Internal dependencies
 */
import blockStyles from './style'
import { generateRenderPostItem, CONTENTS } from './util'
import { parseList, toList } from './grid-value'
import variations from './variations'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { version as VERSION, i18n } from 'lumen'
import {
	stack as stackIcon,
	pullLeft as pullLeftIcon,
	pullRight as pullRightIcon,
	grid as gridIcon,
	row as rowIcon,
	column as columnIcon,
	justifyTop as justifyTopIcon,
	justifyCenterVertical as justifyCenterVerticalIcon,
	justifyBottom as justifyBottomIcon,
	justifyStretchVertical as justifyStretchVerticalIcon,
} from '@wordpress/icons'
import {
	first, isEqual, range,
} from 'lodash'
import {
	InspectorTabs,
	PanelAdvancedSettings,
	AdvancedRangeControl,
	AdvancedSelectControl,
	AdvancedTextControl,
	AdvancedToolbarControl,
	SortControl,
	ColumnsWidthMultiControl,
	TaxonomyControl,
	AdvancedToggleControl,
	ColorPaletteControl,
	FourRangeControl,
	ImageControl2,
	ImageSizeControl,
	InspectorBlockControls,
	InspectorLayoutControls,
	InspectorStyleControls,
	ControlSeparator,
	useBlockCssGenerator,
} from '~lumen/ui'
import {
	useBlockStyle,
	usePostsQuery,
	useBlockAttributesContext,
	useBlockSetAttributesContext,
	useDeviceType,
} from '~lumen/hooks'
import {
	withBlockAttributeContext,
	withBlockStyleContext,
	withBlockWrapperIsHovered,
	withQueryLoopContext,
} from '~lumen/hoc'
import {
	getAlignmentClasses,
	BlockDiv,
	Image,
	Alignment,
	Advanced,
	Responsive,
	ContainerDiv,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Typography,
	FlexGapControls,
	MarginBottom,
	Transform,
	ContentAlign,
	getContentAlignmentClasses,
} from '~lumen/features'
import { getAttrName, getAttributeName } from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { Placeholder, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { applyFilters, addFilter } from '@wordpress/hooks'
import { InnerBlocks, useBlockEditContext } from '@wordpress/block-editor'
import {
	useMemo, useEffect, memo,
} from '@wordpress/element'
import { useSelect } from '@wordpress/data'
import { compose, useInstanceId } from '@wordpress/compose'

const ALLOWED_INNER_BLOCKS = [
	'lumen/load-more',
	'lumen/pagination',
]

export const DEFAULT_ORDER = [
	'title',
	'featured-image',
	'meta',
	'category',
	'excerpt',
	'readmore',
]

const Edit = props => {
	const {
		clientId,
		attributes,
		name,
		className,
		setAttributes,
	} = props

	const {
		lmnQueryId,
		imageSize,
		type = 'post',
		orderBy = 'date',
		order = 'desc',
		taxonomyType = 'category',
		taxonomy = '',
		taxonomyFilterType = '__in',
		taxonomyTypeToDisplay = 'category',
		contentOrder = DEFAULT_ORDER,
		uniqueId,
	} = attributes

	const blockAlignmentClass = getAlignmentClasses( attributes )
	const blockStyle = useBlockStyle( variations )
	const { getActiveBlockVariation } = useSelect( 'core/blocks' )

	const {
		posts, isRequesting, hasPosts,
	} = usePostsQuery( attributes )

	const instanceId = useInstanceId( Edit )

	const wrapperClassNames = classnames(
		'lmn-inner-blocks',
		getContentAlignmentClasses( attributes ),
	)

	const blockClassNames = classnames( [
		className,
		'lmn-block-posts',
		blockAlignmentClass,
	], {
		'lmn--has-container': attributes.hasContainer,
	} )

	const contentClassNames = classnames( [
		'lmn-block-posts__items',
	] )

	const innerClassNames = classnames( [
		'lmn-inner-blocks',
	] )

	const contentOrderOptions = contentOrder.map( value => CONTENTS.find( content => content.value === value )?.label )

	const focalPointPlaceholder = useMemo( () => first( posts )?.featured_image_urls?.[ imageSize || 'full' ]?.[ 0 ],
		[ posts?.length ]
	)

	const editorPostItems = useMemo( () => {
		return generateRenderPostItem( attributes, { isHovered: props.isHovered } )
	}, [ attributes, props.isHovered ] )

	useEffect( () => {
		// Set a unique instance ID for the posts block.
		// This is used to give unique identifier to our
		// queries.
		if ( lmnQueryId !== instanceId ) {
			setAttributes( { lmnQueryId: instanceId } )
		}
	}, [ lmnQueryId, instanceId ] )

	const activeVariation = getActiveBlockVariation( name, attributes )
	const defaultContentOrder = activeVariation?.attributes?.contentOrder || DEFAULT_ORDER

	// Generate the CSS styles for the block.
	const blockCss = useBlockCssGenerator( {
		attributes: props.attributes,
		blockStyles,
		clientId: props.clientId,
		context: props.context,
		setAttributes: props.setAttributes,
		blockState: props.blockState,
		version: VERSION,
	} )

	return (
		<>
			<InspectorControls
				setAttributes={ setAttributes }
				blockState={ props.blockState }
				contentOrderOptions={ contentOrderOptions }
				contentOrder={ contentOrder }
				DefaultContentOrder={ defaultContentOrder }
				orderBy={ orderBy }
				order={ order }
				type={ type }
				taxonomyType={ taxonomyType }
				taxonomy={ taxonomy }
				taxonomyFilterType={ taxonomyFilterType }
				taxonomyTypeToDisplay={ taxonomyTypeToDisplay }
				blockStyle={ blockStyle }
				focalPointPlaceholder={ focalPointPlaceholder }
			/>

			{ blockCss && <style key="block-css">{ blockCss }</style> }

			{ ( isRequesting || ! hasPosts ) ? (
				<Placeholder
					icon="admin-post"
					label={ __( 'Posts', i18n ) }
				>
					{ ( ! Array.isArray( posts ) || isRequesting ) ? (
						<Spinner />
					) : (
						__( 'No posts found.', i18n )
					) }
				</Placeholder>
			) : (
				<BlockDiv
					blockHoverClass={ props.blockHoverClass }
					clientId={ props.clientId }
					attributes={ props.attributes }
					className={ blockClassNames }
					enableVariationPicker={ true }
				>
					<div className={ wrapperClassNames } key={ `posts-wrapper-${ clientId }` }>
						<div className={ contentClassNames } key={ `posts-content-${ clientId }` }>
							{ ( posts || [] ).map( editorPostItems ) }
						</div>
						<div className={ innerClassNames } key={ `posts-inner-${ clientId }` }>
							<InnerBlocks
								allowedBlocks={ ALLOWED_INNER_BLOCKS }
							/>
						</div>
					</div>
				</BlockDiv>
			) }
			{ props.isHovered && ! isRequesting && hasPosts && uniqueId && <MarginBottom /> }
		</>
	)
}

/**
 * Which column a part of a post sits in.
 *
 * `Auto` leaves it where the grid puts it, which is what every part does today.
 * `Full width` is the one that is not a column number: a title or an excerpt
 * that runs across the whole post above or below the columns.
 */
const COLUMN_OPTIONS = [
	{ value: '', label: __( 'Auto', i18n ) },
	{ value: '1', label: __( 'Column 1', i18n ) },
	{ value: '2', label: __( 'Column 2', i18n ) },
	{ value: '3', label: __( 'Column 3', i18n ) },
	{ value: '4', label: __( 'Column 4', i18n ) },
	{ value: 'full', label: __( 'Full width', i18n ) },
]

/**
 * The widths of a set of columns, split into what the control wants.
 *
 * The attribute holds `60%,300px,calc(100% - 300px)` — one string, because it
 * becomes one CSS declaration. The width control wants a number and a unit per
 * column, with `custom` standing for a width that is written out in full.
 *
 * @param {string} value  The stored widths.
 * @param {string} units  The stored units, one per column.
 * @param {number} count  How many columns there are.
 * @return {{values: Array, units: Array}} What the control needs.
 */
const splitWidths = ( value, units, count ) => {
	const widths = parseList( value )
	const stored = parseList( units )
	const values = []
	const unitList = []

	for ( let i = 0; i < count; i++ ) {
		const width = widths[ i ] || ''
		const unit = stored[ i ] || ''
		const simple = width.match( /^(-?[\d.]+)(%|px|rem|em)$/ )

		if ( unit === 'custom' ) {
			values.push( width )
			unitList.push( 'custom' )
		} else if ( simple ) {
			values.push( simple[ 1 ] )
			unitList.push( unit || simple[ 2 ] )
		} else {
			values.push( width )
			unitList.push( unit || '%' )
		}
	}

	return { values, units: unitList }
}

/**
 * Puts the numbers and units back together.
 *
 * @param {Array} values One per column.
 * @param {Array} units  One per column.
 * @return {string} The stored string.
 */
const joinWidths = ( values, units ) => toList( values.map( ( value, i ) => {
	if ( value === '' || value === undefined || value === null ) {
		return ''
	}

	return units[ i ] === 'custom' ? String( value ) : `${ value }${ units[ i ] || '%' }`
} ) )

/**
 * The four settings that decide how a grid arranges what is inside it.
 *
 * Shared by both grids — the grid of posts and the grid inside one post —
 * because they are the same four questions in both places.
 */
const DIRECTIONS = [
	{
		value: '', title: __( 'Row', i18n ), icon: rowIcon,
	},
	{
		value: 'column', title: __( 'Column', i18n ), icon: columnIcon,
	},
]

/**
 * The four controls, for whichever grid asks for them.
 *
 * @param {Object} props          Component props.
 * @param {string} props.prefix   Which grid — `posts` or `item`.
 * @return {Element} The controls.
 */
/**
 * Margin and padding for one part of a post.
 *
 * The same pair for every part, so it is written once. It goes inside that
 * part's own panel — the place an author is already looking when they are
 * styling it.
 *
 * @param {Object} props        Component props.
 * @param {string} props.prefix Which part — `title`, `excerpt`, and so on.
 * @return {Element} The controls.
 */
const PartSpacing = ( { prefix } ) => (
	<>
		<FourRangeControl
			label={ __( 'Margins', i18n ) }
			attribute={ `${ prefix }Margin` }
			responsive="all"
			units={ [ 'px', 'em', '%' ] }
			defaultLocked={ false }
			sliderMin={ [ -200, -30, -100 ] }
			sliderMax={ [ 200, 30, 100 ] }
			placeholder="0"
		/>
		<FourRangeControl
			label={ __( 'Paddings', i18n ) }
			attribute={ `${ prefix }Padding` }
			responsive="all"
			units={ [ 'px', 'em', '%' ] }
			defaultLocked={ true }
			min={ [ 0, 0, 0 ] }
			sliderMax={ [ 200, 30, 100 ] }
			placeholder="0"
		/>
	</>
)

/**
 * Direction, justify and alignment for one of the two grids.
 *
 * @param {Object}  props          Component props.
 * @param {string}  props.prefix   Which grid — `posts` or `item`.
 * @param {boolean} props.hasGaps  Whether this grid owns its own gap settings.
 * @return {Element} The controls.
 */
const InnerBlockControls = ( { prefix, hasGaps = false } ) => (
	<>
		<AdvancedToolbarControl
			label={ __( 'Inner Block Direction', i18n ) }
			attribute={ `${ prefix }InnerDirection` }
			responsive="all"
			controls={ DIRECTIONS }
			default=""
		/>

		{ /*
		 * The plugin's own icon sets rather than a list of words: these are the
		 * same two questions the Columns block asks, and an author who has
		 * learned the pictures there should not have to read them here.
		 */ }
		<AdvancedToolbarControl
			label={ __( 'Inner Block Justify', i18n ) }
			attribute={ `${ prefix }InnerJustify` }
			responsive="all"
			controls="flex-horizontal"
		/>
		<AdvancedToolbarControl
			label={ __( 'Inner Block Alignment', i18n ) }
			attribute={ `${ prefix }InnerAlign` }
			responsive="all"
			controls="flex-vertical"
		/>

		{ /*
		 * The grid of posts is not given gaps here.
		 *
		 * It already has Column Gap and Row Gap further up the same panel, and
		 * they write the same two declarations onto the same element — a second
		 * pair would be two controls for one thing, with whichever was set last
		 * silently winning. The columns inside a post have no such pair, so they
		 * do get theirs here.
		 */ }
		{ hasGaps && (
			<>
				<AdvancedRangeControl
					label={ __( 'Item Column Gap', i18n ) }
					attribute={ `${ prefix }InnerColumnGap` }
					responsive="all"
					min={ 0 }
					sliderMax={ 100 }
					allowReset={ true }
					help={ __( 'The space between the columns of one post.', i18n ) }
				/>
				<AdvancedRangeControl
					label={ __( 'Item Row Gap', i18n ) }
					attribute={ `${ prefix }InnerRowGap` }
					responsive="all"
					min={ 0 }
					sliderMax={ 100 }
					allowReset={ true }
				/>
			</>
		) }
	</>
)

const InspectorControls = memo( props => {
	const deviceType = useDeviceType()
	const itemLayout = useBlockAttributesContext(
		attributes => attributes[ getAttributeName( 'itemLayout', deviceType ) ] ||
			attributes.itemLayout
	)
	const isBesideLayout = itemLayout === 'media-left' || itemLayout === 'media-right'
	const isCustomLayout = itemLayout === 'custom'

	const setAttributes = useBlockSetAttributesContext()
	const {
		columns, postsColumnWrap, postsColumnWidths, postsColumnArrangement, postsColumnUnits,
		itemColumns, itemColumnWidths, itemColumnArrangement, itemColumnUnits,
		imageFallbackShow,
	} = useBlockAttributesContext( attributes => ( {
		columns: attributes[ getAttributeName( 'columns', deviceType ) ] || attributes.columns || 2,
		postsColumnWrap: attributes.postsColumnWrap,
		postsColumnWidths: attributes[ getAttributeName( 'postsColumnWidths', deviceType ) ],
		postsColumnArrangement: attributes[ getAttributeName( 'postsColumnArrangement', deviceType ) ],
		postsColumnUnits: attributes[ getAttributeName( 'postsColumnUnits', deviceType ) ],
		itemColumns: attributes[ getAttributeName( 'itemColumns', deviceType ) ] || attributes.itemColumns || 2,
		itemColumnWidths: attributes[ getAttributeName( 'itemColumnWidths', deviceType ) ],
		itemColumnArrangement: attributes[ getAttributeName( 'itemColumnArrangement', deviceType ) ],
		itemColumnUnits: attributes[ getAttributeName( 'itemColumnUnits', deviceType ) ],
		imageFallbackShow: attributes.imageFallbackShow,
	} ) )

	const postsWidths = splitWidths( postsColumnWidths, postsColumnUnits, columns )
	const itemWidths = splitWidths( itemColumnWidths, itemColumnUnits, itemColumns )

	/**
	 * The order the columns are in, as the sort control wants it.
	 *
	 * @param {string} value Stored order.
	 * @param {number} count How many columns.
	 * @return {string} A comma list, defaulting to 1,2,3…
	 */
	const orderValues = ( value, count ) => (
		value || range( count ).map( i => i + 1 ).join( ',' )
	)

	return (
		<>
			<InspectorTabs />

			<InspectorLayoutControls>
				<AdvancedRangeControl
					label={ __( 'Columns', i18n ) }
					attribute="columns"
					responsive="all"
					min={ 1 }
					sliderMax={ 4 }
					placeholder="2"
				/>
				<FlexGapControls />

				{ /*
				 * The same three settings the Columns block has, for the grid of
				 * posts. They apply to the column positions, so they repeat down
				 * every row: a first column of 60% makes every leading post the
				 * wide one.
				 */ }
				<AdvancedToggleControl
					label={ __( 'Allow Column Wrapping', i18n ) }
					attribute="postsColumnWrap"
					help={ __( 'Gives each column a width of its own instead of dividing the row equally.', i18n ) }
				/>

				{ !! postsColumnWrap && (
					<>
						<ColumnsWidthMultiControl
							label={ __( 'Column Widths', i18n ) }
							columns={ columns }
							values={ postsWidths.values }
							unit={ postsWidths.units }
							units={ [ '%', 'px', 'rem', 'em', 'custom' ] }
							responsive="all"
							allowReset={ true }
							onChange={ values => setAttributes( {
								[ getAttributeName( 'postsColumnWidths', deviceType ) ]:
									joinWidths( values, postsWidths.units ),
							} ) }
							onChangeUnit={ ( unit, index ) => {
								const units = [ ...postsWidths.units ]
								units[ index ] = unit

								/*
								 * The unit is written on its own. A column with
								 * no width yet still has a unit the author has
								 * chosen, and there would be nowhere to keep it
								 * if it lived only inside the width string.
								 */
								setAttributes( {
									[ getAttributeName( 'postsColumnUnits', deviceType ) ]: toList( units ),
									[ getAttributeName( 'postsColumnWidths', deviceType ) ]:
										joinWidths( postsWidths.values, units ),
								} )
							} }
						/>

						<InnerBlockControls prefix="posts" />

						<SortControl
							label={ __( 'Column Arrangement', i18n ) }
							axis="x"
							values={ orderValues( postsColumnArrangement, columns ) }
							num={ columns }
							allowReset={ !! postsColumnArrangement }
							onChange={ order => setAttributes( {
								[ getAttributeName( 'postsColumnArrangement', deviceType ) ]:
									order ? order.join( ',' ) : '',
							} ) }
						/>
					</>
				) }

				<ControlSeparator />

			</InspectorLayoutControls>

			{ /*
			 * A panel of its own rather than more of the Layout group.
			 *
			 * This is where a post's own shape is decided — the image beside the
			 * words, or a grid the author lays out. With the widths, gaps and
			 * per-part columns under it, it had grown longer than everything else
			 * on the tab put together.
			 *
			 * `InspectorBlockControls` rather than `InspectorLayoutControls`:
			 * the latter fills a slot *inside* the Layout panel, so a panel put
			 * there becomes a panel within a panel rather than a sibling of it.
			 */ }
			<InspectorBlockControls>
				<PanelAdvancedSettings
					title={ __( 'Post Layout', i18n ) }
					id="post-layout"
					initialOpen={ false }
					showModifiedIndicator={ !! itemLayout }
				>
					{ /*
					 * Where the image sits. `Content Arrangement` below can only
					 * stack the parts of a post; this is the one thing it cannot
					 * say — that the image belongs beside the words rather than
					 * above them.
					 */ }
					<AdvancedToolbarControl
						label={ __( 'Post Layout', i18n ) }
						attribute="itemLayout"
						responsive="all"
						/*
						 * "Stacked" carries a value of its own rather than an empty
						 * one. Empty means "inherit what the wider screen said", so
						 * with an empty stacked option a post laid out side by side
						 * on a desktop could never be stacked on a phone — which is
						 * the main reason to set this per device at all.
						 */
						default=""
						/*
						 * Icons rather than words. Four labels — one of them "Image
						 * right" — wrapped onto two lines and took more height than
						 * the control they belong to; the name survives as the
						 * button's tooltip and its accessible label.
						 */
						controls={ [
							{
								value: 'stacked', title: __( 'Stacked', i18n ), icon: stackIcon,
							},
							{
								value: 'media-left', title: __( 'Image left', i18n ), icon: pullLeftIcon,
							},
							{
								value: 'media-right', title: __( 'Image right', i18n ), icon: pullRightIcon,
							},
							{
								value: 'custom', title: __( 'Custom grid', i18n ), icon: gridIcon,
							},
						] }
						help={ __( 'Set it per device — a post that reads well in two columns on a desktop is usually a stack on a phone.', i18n ) }
					/>

					{ isBesideLayout && (
						<>
							<AdvancedRangeControl
								label={ __( 'Image Width', i18n ) }
								attribute="itemMediaWidth"
								responsive="all"
								units={ [ '%', 'px', 'custom' ] }
								min={ [ 10, 40 ] }
								sliderMax={ [ 80, 500 ] }
								allowReset={ true }
								placeholder="40"
							/>

							<AdvancedRangeControl
								label={ __( 'Image Gap', i18n ) }
								attribute="itemMediaGap"
								responsive="all"
								min={ 0 }
								sliderMax={ 100 }
								allowReset={ true }
								placeholder="24"
								help={ __( 'The space between the image and the words beside it.', i18n ) }
							/>

							<AdvancedToolbarControl
								label={ __( 'Image Vertical Align', i18n ) }
								attribute="itemMediaVerticalAlign"
								responsive="all"
								controls={ [
									{
										value: '', title: __( 'Top', i18n ), icon: justifyTopIcon,
									},
									{
										value: 'center', title: __( 'Middle', i18n ), icon: justifyCenterVerticalIcon,
									},
									{
										value: 'end', title: __( 'Bottom', i18n ), icon: justifyBottomIcon,
									},
									{
										value: 'stretch', title: __( 'Fill', i18n ), icon: justifyStretchVerticalIcon,
									},
								] }
							/>
						</>
					) }

					{ isCustomLayout && (
						<>
							<AdvancedRangeControl
								label={ __( 'Item Columns', i18n ) }
								attribute="itemColumns"
								responsive="all"
								min={ 1 }
								sliderMax={ 4 }
								allowReset={ true }
								placeholder="2"
								help={ __( 'How many columns one post is divided into. Each part below is then put in one of them.', i18n ) }
							/>

							<AdvancedSelectControl
								label={ __( 'Featured Image', i18n ) }
								attribute="itemColumnFeaturedImage"
								options={ COLUMN_OPTIONS }
							/>

							<AdvancedSelectControl
								label={ __( 'Category', i18n ) }
								attribute="itemColumnCategory"
								options={ COLUMN_OPTIONS }
							/>

							<AdvancedSelectControl
								label={ __( 'Title', i18n ) }
								attribute="itemColumnTitle"
								options={ COLUMN_OPTIONS }
							/>

							<AdvancedSelectControl
								label={ __( 'Meta', i18n ) }
								attribute="itemColumnMeta"
								options={ COLUMN_OPTIONS }
							/>

							<AdvancedSelectControl
								label={ __( 'Excerpt', i18n ) }
								attribute="itemColumnExcerpt"
								options={ COLUMN_OPTIONS }
							/>

							<AdvancedSelectControl
								label={ __( 'Read More Button', i18n ) }
								attribute="itemColumnReadmore"
								options={ COLUMN_OPTIONS }
							/>

							{ /*
							 * The same two settings the grid of posts has, for the
							 * columns inside one post: a width each, and the order
							 * they are shown in.
							 */ }
							<ColumnsWidthMultiControl
								label={ __( 'Item Column Widths', i18n ) }
								columns={ itemColumns }
								values={ itemWidths.values }
								unit={ itemWidths.units }
								units={ [ '%', 'px', 'rem', 'em', 'custom' ] }
								responsive="all"
								allowReset={ true }
								onChange={ values => setAttributes( {
									[ getAttributeName( 'itemColumnWidths', deviceType ) ]:
										joinWidths( values, itemWidths.units ),
								} ) }
								onChangeUnit={ ( unit, index ) => {
									const units = [ ...itemWidths.units ]
									units[ index ] = unit

									/*
									 * The unit is written on its own. A column with
									 * no width yet still has a unit the author has
									 * chosen, and there would be nowhere to keep it
									 * if it lived only inside the width string.
									 */
									setAttributes( {
										[ getAttributeName( 'itemColumnUnits', deviceType ) ]: toList( units ),
										[ getAttributeName( 'itemColumnWidths', deviceType ) ]:
											joinWidths( itemWidths.values, units ),
									} )
								} }
							/>

							<InnerBlockControls prefix="item" hasGaps={ true } />

							<SortControl
								label={ __( 'Item Column Arrangement', i18n ) }
								axis="x"
								values={ orderValues( itemColumnArrangement, itemColumns ) }
								num={ itemColumns }
								allowReset={ !! itemColumnArrangement }
								onChange={ order => setAttributes( {
									[ getAttributeName( 'itemColumnArrangement', deviceType ) ]:
										order ? order.join( ',' ) : '',
								} ) }
							/>
						</>
					) }

				</PanelAdvancedSettings>
			</InspectorBlockControls>

			<InspectorLayoutControls>
				<ControlSeparator />
				<SortControl
					className="lmn-control--attr-contentOrder"
					label={ __( 'Content Arrangement', i18n ) }
					axis="y"
					values={ props.contentOrderOptions }
					num={ props.contentOrderOptions.length }
					allowReset={ ! isEqual( props.contentOrder, props.defaultContentOrder ) }
					onChange={ order => {
						if ( order ) {
							props.setAttributes( { contentOrder: order.map( label => CONTENTS.find( content => content.label === label )?.value ) } )
						} else {
							props.setAttributes( { contentOrder: props.defaultContentOrder } )
						}
					} }
					helpTooltip={ {
						video: 'posts-content-order',
						description: __( 'Sets the order of the items displayed (category, title, meta, excerpt, read more button, image) for each post', i18n ),
					} }
				/>
				<ControlSeparator />
			</InspectorLayoutControls>

			<ContentAlign.InspectorControls />
			<Alignment.InspectorControls />

			<InspectorStyleControls>
				<PanelAdvancedSettings
					title={ __( 'Query', i18n ) }
					id="query"
					initialOpen={ true }
				>
					<AdvancedRangeControl
						label={ __( 'Number of items', i18n ) }
						min={ 1 }
						max={ 100 }
						allowReset={ true }
						attribute="numberOfItems"
						placeholder="6"
						default={ 6 }
					/>
					<AdvancedSelectControl
						className="lmn-control--attr-orderBy"
						label={ __( 'Order by', i18n ) }
						options={ [
							{ label: __( 'Newest to Oldest', i18n ), value: 'date,desc' },
							{ label: __( 'Oldest to Newest', i18n ), value: 'date,asc' },
							{ label: __( 'A → Z', i18n ), value: 'title,asc' },
							{ label: __( 'Z → A', i18n ), value: 'title,desc' },
							{ label: __( 'Last Modified to Oldest', i18n ), value: 'modified,desc' },
							{ label: __( 'Oldest Modified to Last', i18n ), value: 'modified,asc' },
							{ label: __( 'Menu Order', i18n ), value: 'menu_order,asc' },
							{ label: __( 'Random', i18n ), value: 'rand,desc' },
						] }
						value={ `${ props.orderBy },${ props.order }` }
						onChange={ value => {
							const [ orderBy, order ] = value.split( ',' )
							props.setAttributes( {
								orderBy,
								order,
							} )
						} }
						default="date,desc"
					/>
					<TaxonomyControl
						allowReset={ true }
						postType={ props.type }
						onChangePostType={ type => props.setAttributes( { type } ) }
						taxonomyType={ props.taxonomyType }
						onChangeTaxonomyType={ taxonomyType => props.setAttributes( { taxonomyType } ) }
						taxonomy={ props.taxonomy }
						onChangeTaxonomy={ taxonomy => props.setAttributes( { taxonomy } ) }
						taxonomyFilterType={ props.taxonomyFilterType }
						onChangeTaxonomyFilterType={ taxonomyFilterType => props.setAttributes( { taxonomyFilterType } ) }
						taxonomyTypeToDisplay={ props.taxonomyTypeToDisplay }
						onChangeTaxonomyTypeToDisplay={ taxonomyTypeToDisplay => props.setAttributes( { taxonomyTypeToDisplay } ) }
						lmnVersion="3"
					/>
					<AdvancedRangeControl
						label={ __( 'Skip the first', i18n ) }
						attribute="postOffset"
						min={ 0 }
						sliderMax={ 20 }
						allowReset={ true }
						placeholder="0"
						help={ __( 'Leaves out the newest few, so a second list can carry on where the first one stopped.', i18n ) }
					/>

					<AdvancedToggleControl
						label={ __( 'Leave out the post being viewed', i18n ) }
						attribute="excludeCurrentPost"
						help={ __( 'Only has an effect on a single post or page — useful for a "read next" list.', i18n ) }
					/>

					<AdvancedTextControl
						label={ __( 'Only these posts', i18n ) }
						attribute="postInclude"
						placeholder="12, 34, 56"
						help={ __( 'Post IDs, separated by commas. Leave empty for all of them.', i18n ) }
					/>

					<AdvancedTextControl
						label={ __( 'Never these posts', i18n ) }
						attribute="postExclude"
						placeholder="78, 90"
						help={ __( 'Post IDs, separated by commas.', i18n ) }
					/>

					{ applyFilters( 'lumen.posts.edit.inspector.style.query', null ) }
				</PanelAdvancedSettings>
				<PanelAdvancedSettings
					title={ __( 'Spacing', i18n ) }
					id="spacing"
				>
					<AdvancedRangeControl
						label={ __( 'Featured Image', i18n ) }
						attribute="imageSpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
					<AdvancedRangeControl
						label={ __( 'Title', i18n ) }
						attribute="titleSpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
					<AdvancedRangeControl
						label={ __( 'Category', i18n ) }
						attribute="categorySpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
					<AdvancedRangeControl
						label={ __( 'Excerpt', i18n ) }
						attribute="excerptSpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
					<AdvancedRangeControl
						label={ __( 'Meta', i18n ) }
						attribute="metaSpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
					<AdvancedRangeControl
						label={ __( 'Read More Link', i18n ) }
						attribute="readmoreSpacing"
						responsive="all"
						min={ 0 }
						sliderMax={ 100 }
						placeholder=""
					/>
				</PanelAdvancedSettings>
			</InspectorStyleControls>

			<BlockDiv.InspectorControls />
			<ContainerDiv.InspectorControls hasContentVerticalAlign={ true } />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<Image.InspectorControls
				{ ...props }
				label={ __( 'Featured Image', i18n ) }
				hasHeight={ ! [ 'portfolio', 'portfolio-2', 'horizontal', 'horizontal-2' ].includes( props.blockStyle ) }
				hasBorderRadius={ ! [ 'portfolio', 'portfolio-2', 'horizontal', 'horizontal-2' ].includes( props.blockStyle ) }
				hasShape={ false }
				hasWidth={ [ 'list', 'horizontal', 'horizontal-2' ].includes( props.blockStyle ) }
				hasAlt={ false }
				hasSelector={ false }
				src={ props.focalPointPlaceholder }
				hasToggle={ true }
				hasAspectRatio={ ! [ 'list', 'horizontal', 'horizontal-2', 'portfolio', 'portfolio-2', 'vertical-card-2' ].includes( props.blockStyle ) }
			>
				<AdvancedToggleControl
					label={ __( 'Show a placeholder when there is no image', i18n ) }
					attribute="imageFallbackShow"
					help={ __( 'One post without a featured image makes the whole grid ragged. This keeps the shape.', i18n ) }
				/>

				{ !! imageFallbackShow && (
					<ImageControl2
						label={ __( 'Placeholder Image', i18n ) }
						attribute="imageFallbackUrl"
						allowReset={ true }
						help={ __( 'Leave it empty for the plain grey placeholder.', i18n ) }
					/>
				) }

				<PartSpacing prefix="image" />
			</Image.InspectorControls>
			<Typography.InspectorControls
				{ ...props }
				label={ __( 'Title', i18n ) }
				hasToggle={ true }
				attrNameTemplate="title%s"
				hasTextContent={ false }
				hasAlign={ true }
				initialOpen={ false }
			>
				<PartSpacing prefix="title" />
			</Typography.InspectorControls>
			<Typography.InspectorControls
				{ ...props }
				label={ __( 'Category', i18n ) }
				hasToggle={ true }
				attrNameTemplate="category%s"
				hasTextContent={ false }
				hasAlign={ true }
				hasTextTag={ false }
				initialOpen={ false }
			>
				<PartSpacing prefix="category" />
			</Typography.InspectorControls>
			<Typography.InspectorControls
				{ ...props }
				label={ __( 'Excerpt', i18n ) }
				hasToggle={ true }
				attrNameTemplate="excerpt%s"
				hasTextTag={ false }
				hasTextContent={ false }
				hasAlign={ true }
				initialOpen={ false }
			>
				<PartSpacing prefix="excerpt" />
			</Typography.InspectorControls>
			<Typography.InspectorControls
				{ ...props }
				label={ __( 'Meta', i18n ) }
				hasToggle={ true }
				attrNameTemplate="meta%s"
				hasTextTag={ false }
				hasTextContent={ false }
				hasAlign={ true }
				initialOpen={ false }
			>
				<PartSpacing prefix="meta" />
			</Typography.InspectorControls>
			<Typography.InspectorControls
				{ ...props }
				label={ __( 'Read More Link', i18n ) }
				attrNameTemplate="readmore%s"
				hasTextTag={ false }
				hasToggle={ true }
				hasAlign={ true }
				initialOpen={ false }
			>
				<PartSpacing prefix="readmore" />
			</Typography.InspectorControls>
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />
		</>
	)
} )

export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles ),
)( Edit )

// Add hover selector control
addFilter( 'lumen.block-component.typography.color.after', 'lumen/posts', ( output, props ) => {
	const { name } = useBlockEditContext()

	if ( name !== 'lumen/posts' ) {
		return output
	}

	return (
		<>
			{ output }
			<AdvancedToggleControl
				label={ __( 'Apply hover effect when container is hovered', i18n ) }
				attribute={ getAttrName( props.attrNameTemplate, 'hoverStateInContainer' ) }
			/>
		</>
	)
} )

addFilter( 'lumen.block-component.typography.color.after', 'lumen/posts', ( output, props ) => {
	const { name } = useBlockEditContext()
	const categoryHighlighted = useBlockAttributesContext( attributes => attributes.categoryHighlighted )

	if ( name !== 'lumen/posts' ) {
		return output
	}

	if ( props.attrNameTemplate !== 'category%s' ) {
		return output
	}

	return (
		<>
			<AdvancedToggleControl
				label={ __( 'Highlighted', i18n ) }
				attribute="categoryHighlighted"
			/>
			{ categoryHighlighted && (
				<ColorPaletteControl
					label={ __( 'Highlight Color', i18n ) }
					hover="all"
					attribute="categoryHighlightColor"
				/>
			) }
			{ output }
		</>
	)
} )

// Add excerpt controls.
addFilter( 'lumen.block-component.typography.before', 'lumen/posts', ( output, props ) => {
	const { name } = useBlockEditContext()
	if ( name !== 'lumen/posts' ) {
		return output
	}

	if ( props.attrNameTemplate !== 'excerpt%s' ) {
		return output
	}

	return (
		<>
			<AdvancedRangeControl
				label={ __( 'Excerpt Length', i18n ) }
				attribute="excerptLength"
				placeholder="55"
				min={ 1 }
				sliderMax={ 100 }
			/>
			<AdvancedToggleControl
				label={ __( 'Remove HTML', i18n ) }
				attribute="excerptStripHtml"
				defaultValue={ true }
				help={ __( 'Shows the excerpt as plain text, so the typography settings below decide how it looks.', i18n ) }
			/>
		</>
	)
} )

// Add meta controls.
addFilter( 'lumen.block-component.typography.before', 'lumen/posts', ( output, props ) => {
	const { name } = useBlockEditContext()
	if ( name !== 'lumen/posts' ) {
		return output
	}

	if ( props.attrNameTemplate !== 'meta%s' ) {
		return output
	}

	return (
		<>
			<AdvancedToggleControl
				label={ __( 'Show Author', i18n ) }
				attribute="authorShow"
			/>
			<AdvancedToggleControl
				label={ __( 'Show Date', i18n ) }
				attribute="dateShow"
			/>
			<AdvancedToggleControl
				label={ __( 'Show Comments', i18n ) }
				attribute="commentsShow"
			/>
			<AdvancedSelectControl
				label={ __( 'Separator', i18n ) }
				options={ [
					{ label: __( 'Default (Dot)', i18n ), value: '' },
					{ label: __( 'Space', i18n ), value: 'space' },
					{ label: __( 'Comma', i18n ), value: 'comma' },
					{ label: __( 'Dash', i18n ), value: 'dash' },
					{ label: __( 'Pipe', i18n ), value: 'pipe' },
				] }
				attribute="metaSeparator"
				helpTooltip={ {
					video: 'posts-meta-separator',
					description: __( 'Sets the separators between meta items (dot, space, comma, dash, pipe)', i18n ),
				} }
			/>
		</>
	)
} )

// Add additional image options.
addFilter( 'lumen.block-component.image.before', 'lumen/posts', output => {
	const { name } = useBlockEditContext()
	const imageSize = useBlockAttributesContext( attributes => attributes.imageSize )
	const setAttributes = useBlockSetAttributesContext()

	if ( name !== 'lumen/posts' ) {
		return output
	}

	return (
		<>
			<AdvancedToggleControl
				label={ __( 'Add post links to images', i18n ) }
				attribute="imageHasLink"
			/>
			<ImageSizeControl
				className="lmn-control--attr-imageSize"
				label={ __( 'Image Size', i18n ) }
				value={ imageSize }
				onChange={ imageSize => setAttributes( { imageSize } ) }
				default="full"
				helpTooltip={ {
					video: 'image-size',
					description: __( 'Sets the image display size to thumbnail, medium, large or full size. A smaller image size will also load faster.', i18n ),
				} }
			/>
			<AdvancedToggleControl
				label={ __( 'Apply hover effect when container is hovered', i18n ) }
				attribute="imageHoverStateInContainer"
			/>
		</>
	)
} )
