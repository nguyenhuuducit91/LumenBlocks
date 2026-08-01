/**
 * External dependencies
 */
import {
	AdvancedSelectControl,
	DesignPanelBody,
	ImageUploadPlaceholder,
	ProControlButton,
	BlockContainer,
	ColorPaletteControl,
	PanelAdvancedSettings,
	AlignButtonsControl,
	HeadingButtonsControl,
	AdvancedRangeControl,
	AdvancedToolbarControl,
	UrlInputPopover,
	BorderControlsHelper,
} from '~lumen/ui'
import {
	ContentAlignControl,
	ResponsiveControl,
	BackgroundControlsHelper,
	ColumnPaddingControl,
	ImageBackgroundControlsHelper,
	PanelSpacingBody,
	TypographyControlHelper,
} from '../../components'
import {
	createTypographyAttributeNames,
	createResponsiveAttributeNames,
	cacheImageData,
	getImageUrlFromCache,
} from '~lumen/utils'
import { createBackgroundAttributeNames } from '../../util'
import {
	withUniqueClass,
	withSetAttributeHook,
	withGoogleFont,
	withTabbedInspector,
	withContentAlignReseter,
	withBlockStyles,
	withClickOpenInspector,
} from '../../higher-order'
import classnames from 'classnames'
import { i18n, showProNotice } from 'lumen'
import { range } from 'lodash'

/**
 * Internal dependencies
 */
import SVGArrow from './images/arrow.svg'
import ImageDesignBasic from './images/basic.png'
import ImageDesignPlain from './images/plain.png'
import ImageDesignBox from './images/box.png'
import ImageDesignCaptioned from './images/captioned.png'
import ImageDesignFade from './images/fade.png'
import ImageDesignLine from './images/line.png'
import createStyles from './style'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor'
import { withFocusOutside } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { addFilter, applyFilters } from '@wordpress/hooks'
import { Component, Fragment } from '@wordpress/element'
import { compose } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'

addFilter( 'lumen.image-box.edit.layouts', 'default', layouts => {
	const newLayouts = [
		{
			image: ImageDesignBasic, label: __( 'Basic', i18n ), value: 'basic',
		},
		{
			image: ImageDesignPlain, label: __( 'Plain', i18n ), value: 'plain',
		},
		{
			label: __( 'Box', i18n ), value: 'box', image: ImageDesignBox, premium: true,
		},
		{
			label: __( 'Captioned', i18n ), value: 'captioned', image: ImageDesignCaptioned, premium: true,
		},
		{
			label: __( 'Fade', i18n ), value: 'fade', image: ImageDesignFade, premium: true,
		},
		{
			label: __( 'Line', i18n ), value: 'line', image: ImageDesignLine, premium: true,
		},
	]

	return [
		...layouts,
		...newLayouts,
	]
} )

addFilter( 'lumen.image-box.edit.inspector.layout.before', 'lumen/image-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		design = 'basic',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<DesignPanelBody
				initialOpen={ true }
				selected={ design }
				options={ applyFilters( 'lumen.image-box.edit.layouts', [] ) }
				onChange={ design => {
					setAttributes( { design } )
				} }
			>
				{ showProNotice && <ProControlButton
					// Generic label, no translations to keep old text out of the translation files.
					title="Upgrade to Premium"
					description="Get more layouts, effects, designs and options for this block if you upgrade to Lumen Premium."
				/> }
			</DesignPanelBody>
		</Fragment>
	)
} )

addFilter( 'lumen.image-box.edit.inspector.style.before', 'lumen/image-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		design = 'basic',
		columns = 3,
		titleColor,
		descriptionColor,
		borderRadius = '',
		shadow = '',
		showTitle = true,
		showDescription = true,
		titleTag = '',
		image1Id = '',
		image2Id = '',
		image3Id = '',
		image4Id = '',
		imageHoverEffect = '',
		showOverlay = false,
		showOverlayHover = true,
		overlayOpacity = 0.7,
		overlayHoverOpacity = 0.7,
		showSubtitle = true,
		subtitleColor = '',
		lineColor = '',
		lineSize = '',
		showArrow = false,
		arrowColor = '',
	} = props.attributes

	const show = showOptions( props )

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'General', i18n ) }
				initialOpen={ true }
			>
				<AdvancedRangeControl
					label={ __( 'Columns', i18n ) }
					value={ columns }
					onChange={ columns => setAttributes( { columns } ) }
					min={ 1 }
					max={ 4 }
					className="lmb--help-tip-general-columns"
					default={ 3 }
				/>
				{

				/**
				 * The "height" option is really the "columnHeight" option. @see edit.js
				 * But we need to use height instead of min-height. @see index.js
				 */
				}
				<ResponsiveControl
					attrNameTemplate="%sColumnHeight"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Height', i18n ) }
						min="100"
						max="700"
						allowReset={ true }
						placeholder="350"
						className="lmb--help-tip-image-box-height"
					/>
				</ResponsiveControl>

				{ show.border &&
					<BorderControlsHelper
						attrNameTemplate="column%s"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					/>
				}

				{ show.borderRadius &&
					<AdvancedRangeControl
						label={ __( 'Border Radius', i18n ) }
						value={ borderRadius }
						onChange={ borderRadius => setAttributes( { borderRadius } ) }
						min={ 0 }
						max={ 50 }
						allowReset={ true }
						placeholder="12"
						className="lmb--help-tip-general-border-radius"
					/>
				}

				{ show.shadow &&
					<AdvancedRangeControl
						label={ __( 'Shadow / Outline', i18n ) }
						value={ shadow }
						onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 9 }
						allowReset={ true }
						placeholder="3"
						className="lmb--help-tip-general-shadow"
					/>
				}
				<ResponsiveControl
					attrNameTemplate="columnContent%sVerticalAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedToolbarControl
						label={ __( 'Content Vertical Align', i18n ) }
						controls="__flex-vertical"
						className="lmb--help-tip-advanced-column-content-vertical-align"
					/>
				</ResponsiveControl>
				<ContentAlignControl
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
			</PanelAdvancedSettings>

			<PanelSpacingBody initialOpen={ false } blockProps={ props }>
				<ColumnPaddingControl
					label={ __( 'Paddings', i18n ) }
					setAttributes={ setAttributes }
					attributes={ props.attributes }
				/>
				{ show.subtitleSpacing && (
					<ResponsiveControl
						attrNameTemplate="subtitle%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Subtitle', i18n ) }
							min={ -50 }
							max={ 100 }
							placeholder="6"
							allowReset={ true }
							className="lmb--help-tip-image-box-subtitle-spacing"
						/>
					</ResponsiveControl>
				) }
				{ show.titleSpacing && (
					<ResponsiveControl
						attrNameTemplate="title%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Title', i18n ) }
							min={ -50 }
							max={ 100 }
							placeholder="16"
							allowReset={ true }
							className="lmb--help-tip-image-box-title-spacing"
						/>
					</ResponsiveControl>
				) }
				{ show.lineSpacing && (
					<ResponsiveControl
						attrNameTemplate="line%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Line', i18n ) }
							min={ -50 }
							max={ 100 }
							placeholder="0"
							allowReset={ true }
							className="lmb--help-tip-image-box-line-spacing"
						/>
					</ResponsiveControl>
				) }
				{ show.descriptionSpacing && (
					<ResponsiveControl
						attrNameTemplate="description%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Description', i18n ) }
							min={ -50 }
							max={ 100 }
							placeholder="0"
							allowReset={ true }
							className="lmb--help-tip-image-box-description-spacing"
						/>
					</ResponsiveControl>
				) }
				{ show.arrowSpacing && (
					<ResponsiveControl
						attrNameTemplate="arrow%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Arrow', i18n ) }
							min={ -50 }
							max={ 100 }
							allowReset={ true }
							className="lmb--help-tip-image-box-arrow-spacing"
						/>
					</ResponsiveControl>
				) }
			</PanelSpacingBody>

			<PanelAdvancedSettings
				title={ __( 'Image', i18n ) }
				initialOpen={ false }
			>
				<ImageBackgroundControlsHelper
					attrNameTemplate="image%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					onChangeImage={ null }
					onChangeSize={ size => {
						setAttributes( {
							imageSize: size,
							image1Url: getImageUrlFromCache( image1Id, size || 'large' ),
							image2Url: getImageUrlFromCache( image2Id, size || 'large' ),
							image3Url: getImageUrlFromCache( image3Id, size || 'large' ),
							image4Url: getImageUrlFromCache( image4Id, size || 'large' ),
						} )
					} }
				/>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Overlay Color', i18n ) }
				checked={ showOverlay }
				onChange={ showOverlay => setAttributes( { showOverlay } ) }
				toggleOnSetAttributes={ [
					...createBackgroundAttributeNames( 'overlay%s' ),
					'overlayOpacity',
				] }
				hasToggle
				toggleAttributeName="showOverlay"
				className="lmb--help-tip-image-box-overlay"
			>
				<BackgroundControlsHelper
					attrNameTemplate="overlay%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					labelBackgroundColorType={ __( 'Overlay Color Type', i18n ) }
					labelBackgroundColor={ __( 'Overlay Color', i18n ) }
					onChangeImage={ null }
					onChangeBackgroundMedia={ null }
					onChangeBackgroundColorOpacity={ null }
				/>
				<AdvancedRangeControl
					label={ __( 'Opacity', i18n ) }
					value={ overlayOpacity }
					onChange={ overlayOpacity => setAttributes( { overlayOpacity } ) }
					min={ 0 }
					max={ 1 }
					step={ 0.1 }
					allowReset={ true }
					placeholder="0.7"
					className="lmb--help-tip-background-color-opacity"
				/>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Overlay Hover Color', i18n ) }
				checked={ showOverlayHover }
				onChange={ showOverlayHover => setAttributes( { showOverlayHover } ) }
				toggleOnSetAttributes={ [
					...createBackgroundAttributeNames( 'overlayHover%s' ),
					'overlayHoverOpacity',
				] }
				hasToggle
				toggleAttributeName="showOverlayHover"
				className="lmb--help-tip-image-box-overlay-hover"
			>
				<BackgroundControlsHelper
					attrNameTemplate="overlayHover%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					labelBackgroundColorType={ __( 'Overlay Color Type', i18n ) }
					labelBackgroundColor={ __( 'Overlay Color', i18n ) }
					onChangeImage={ null }
					onChangeBackgroundMedia={ null }
					onChangeBackgroundColorOpacity={ null }
				/>
				<AdvancedRangeControl
					label={ __( 'Opacity', i18n ) }
					value={ overlayHoverOpacity }
					onChange={ overlayHoverOpacity => setAttributes( { overlayHoverOpacity } ) }
					min={ 0 }
					max={ 1 }
					step={ 0.1 }
					allowReset={ true }
					placeholder="0.7"
					className="lmb--help-tip-background-color-opacity"
				/>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Effects', i18n ) }
				initialOpen={ false }
			>
				<AdvancedSelectControl
					label={ __( 'Image Hover Effect', i18n ) }
					options={ applyFilters( 'lumen.image-box.edit.image-hover-effects', [
						{ label: __( 'None', i18n ), value: '' },
						{ label: __( 'Zoom In', i18n ), value: 'zoom-in' },
						{ label: __( 'Zoom Out', i18n ), value: 'zoom-out' },
					] ) }
					value={ imageHoverEffect }
					onChange={ imageHoverEffect => setAttributes( { imageHoverEffect } ) }
					className="lmb--help-tip-image-box-hover-effect"
				/>
				{ applyFilters( 'lumen.image-box.edit.panel.image-hover-effects', null, props ) }
				{ showProNotice && <ProControlButton
					// Generic label, no translations to keep old text out of the translation files.
					title="Upgrade to Premium"
					description="Get more layouts, effects, designs and options for this block if you upgrade to Lumen Premium."
				/> }
			</PanelAdvancedSettings>

			{ show.line &&
				<PanelAdvancedSettings
					title={ __( 'Line', i18n ) }
				>
					<ColorPaletteControl
						value={ lineColor }
						onChange={ lineColor => setAttributes( { lineColor } ) }
						label={ __( 'Color', i18n ) }
					/>
					<AdvancedRangeControl
						label={ __( 'Size', i18n ) }
						min="0"
						max="10"
						value={ lineSize }
						onChange={ lineSize => setAttributes( { lineSize } ) }
						allowReset={ true }
						placeholder={ design === 'box' ? 1 : 12 }
					/>
				</PanelAdvancedSettings>
			}

			<PanelAdvancedSettings
				title={ __( 'Subtitle', i18n ) }
				id="subtitle"
				checked={ showSubtitle }
				onChange={ showSubtitle => setAttributes( { showSubtitle } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'subtitle%s' ),
					'subtitleColor',
					...createResponsiveAttributeNames( 'subtitle%sAlign' ),
				] }
				hasToggle
				toggleAttributeName="showSubtitle"
			>
				<TypographyControlHelper
					attrNameTemplate="subtitle%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					placeholder={ size => size * 0.8 } // 0.8em
				/>
				<ColorPaletteControl
					value={ subtitleColor }
					onChange={ subtitleColor => setAttributes( { subtitleColor } ) }
					label={ __( 'Subtitle Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="subtitle%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl
						label={ __( 'Align', i18n ) }
						className="lmb--help-tip-image-box-subtitle-align"
					/>
				</ResponsiveControl>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Title', i18n ) }
				id="title"
				checked={ showTitle }
				onChange={ showTitle => setAttributes( { showTitle } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'title%s' ),
					'titleTag',
					'titleColor',
					...createResponsiveAttributeNames( 'Title%sAlign' ),
				] }
				hasToggle
				toggleAttributeName="showTitle"
			>
				<HeadingButtonsControl
					value={ titleTag || 'h4' }
					defaultValue="h4"
					onChange={ titleTag => setAttributes( { titleTag } ) }
				/>
				<TypographyControlHelper
					attrNameTemplate="title%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					htmlTag={ titleTag || 'h4' }
				/>
				<ColorPaletteControl
					value={ titleColor }
					onChange={ titleColor => setAttributes( { titleColor } ) }
					label={ __( 'Title Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="Title%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl
						label={ __( 'Align', i18n ) }
						className="lmb--help-tip-image-box-title-align"
					/>
				</ResponsiveControl>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Description', i18n ) }
				id="description"
				checked={ showDescription }
				onChange={ showDescription => setAttributes( { showDescription } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'description%s' ),
					'descriptionColor',
					...createResponsiveAttributeNames( 'description%sAlign' ),
				] }
				hasToggle
				toggleAttributeName="showDescription"
			>
				<TypographyControlHelper
					attrNameTemplate="description%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
				<ColorPaletteControl
					value={ descriptionColor }
					onChange={ descriptionColor => setAttributes( { descriptionColor } ) }
					label={ __( 'Description Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="description%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl
						label={ __( 'Align', i18n ) }
						className="lmb--help-tip-image-box-description-align"
					/>
				</ResponsiveControl>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Arrow', i18n ) }
				id="arrow"
				checked={ showArrow }
				onChange={ showArrow => setAttributes( { showArrow } ) }
				toggleOnSetAttributes={ [
					'arrowColor',
					...createResponsiveAttributeNames( 'Arrow%sSize' ),
					...createResponsiveAttributeNames( 'Arrow%sAlign' ),
				] }
				hasToggle
				toggleAttributeName="showArrow"
			>
				<ColorPaletteControl
					value={ arrowColor }
					onChange={ arrowColor => setAttributes( { arrowColor } ) }
					label={ __( 'Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="Arrow%sSize"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Size', i18n ) }
						min="0"
						max="50"
						placeholder="30"
						allowReset={ true }
					/>
				</ResponsiveControl>
				<ResponsiveControl
					attrNameTemplate="Arrow%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl
						label={ __( 'Align', i18n ) }
						className="lmb--help-tip-image-box-arrow-align"
					/>
				</ResponsiveControl>
			</PanelAdvancedSettings>

		</Fragment>
	)
} )

class Edit extends Component {
	constructor() {
		super( ...arguments )
		this.state = {
			selectedBox: null,
		}
		this.handleFocusOutside = this.handleFocusOutside.bind( this )
	}

	handleFocusOutside() {
		this.setState( {
			selectedBox: null,
		} )
	}

	render() {
		const {
			className,
			setAttributes,
			attributes,
		} = this.props

		const {
			columns = 3,
			contentAlign = '',
			design = 'basic',
			shadow = '',
			imageSize = 'large',
			imageHoverEffect = '',
			showSubtitle = true,
			showTitle = true,
			showDescription = true,
			showArrow = false,
			titleTag = '',
			showOverlay = false,
			showOverlayHover = true,
		} = attributes

		const mainClasses = classnames( [
			className,
			'lmb-image-box--v4',
			`lmb-image-box--columns-${ columns }`,
			`lmb-image-box--design-${ design }`,
		], applyFilters( 'lumen.image-box.mainclasses', {
			[ `lmb-image-box--effect-${ imageHoverEffect }` ]: imageHoverEffect,
			'lmb-image-box--with-arrow': showArrow,
			[ `lmb-image-box--align-${ contentAlign }` ]: contentAlign,
		}, this.props ) )

		const show = showOptions( this.props )

		return (
			<BlockContainer.Edit className={ mainClasses } blockProps={ this.props } render={ () => (
				<Fragment>
					{ range( 1, columns + 1 ).map( i => {
						const itemClasses = classnames( [
							'lmb-image-box__item',
							`lmb-image-box__item${ i }`,
							'lmb-image-box__box',
						], applyFilters( 'lumen.image-box.itemclasses', {
							[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
						}, this.props, i ) )

						return (
							<div
								className={ itemClasses }
								key={ i }
								onMouseDown={ () => this.setState( { selectedBox: i } ) }
								role="button"
								tabIndex="0"
							>
								<div className="lmb-image-box__box lmb-image-box__image-wrapper">
									<ImageUploadPlaceholder
										imageID={ attributes[ `image${ i }Id` ] }
										imageURL={ attributes[ `image${ i }Url` ] }
										imageSize={ imageSize }
										className="lmb-image-box__box lmb-image-box__image"
										onRemove={ () => {
											setAttributes( {
												[ `image${ i }Id` ]: '',
												[ `image${ i }Url` ]: '',
												[ `image${ i }FullWidth` ]: '',
												[ `image${ i }FullHeight` ]: '',
												[ `image${ i }FullUrl` ]: '',
											} )
										} }
										onChange={ image => {
											setAttributes( {
												[ `image${ i }Id` ]: image.id,
												[ `image${ i }Url` ]: image.url,
												[ `image${ i }FullWidth` ]: image.sizes.full.width,
												[ `image${ i }FullHeight` ]: image.sizes.full.height,
												[ `image${ i }FullUrl` ]: image.sizes.full.url,
											} )
										} }
									/>
								</div>
								{ showOverlay &&
									<div className="lmb-image-box__box lmb-image-box__overlay"></div>
								}
								{ showOverlayHover &&
									<div className="lmb-image-box__box lmb-image-box__overlay-hover"></div>
								}
								<div className="lmb-image-box__content">
									{ ( showSubtitle || showTitle ) &&
										<div className="lmb-image-box__header">
											{ showSubtitle &&
												<RichText
													tagName="div"
													className="lmb-image-box__subtitle"
													value={ attributes[ `subtitle${ i }` ] }
													onChange={ subtitle => setAttributes( { [ `subtitle${ i }` ]: subtitle } ) }
													placeholder={ __( 'Subtitle', i18n ) }
													keepPlaceholderOnFocus
												/>
											}
											{ showTitle &&
												<RichText
													tagName={ titleTag || 'h4' }
													className="lmb-image-box__title"
													value={ attributes[ `title${ i }` ] }
													onChange={ title => setAttributes( { [ `title${ i }` ]: title } ) }
													placeholder={ __( 'Title', i18n ) }
													keepPlaceholderOnFocus
												/>
											}
										</div>
									}
									{ showDescription &&
										<RichText
											tagName="p"
											className="lmb-image-box__description"
											value={ attributes[ `description${ i }` ] }
											onChange={ description => setAttributes( { [ `description${ i }` ]: description } ) }
											placeholder={ __( 'Description', i18n ) }
											keepPlaceholderOnFocus
										/>
									}
								</div>
								{ showArrow &&
									<div className="lmb-image-box__arrow">
										<SVGArrow />
									</div>
								}
								{ this.state.selectedBox === i &&
									<UrlInputPopover
										value={ attributes[ `link${ i }Url` ] }
										onChange={ value => setAttributes( { [ `link${ i }Url` ]: value } ) }
										newTab={ attributes[ `link${ i }NewTab` ] }
										noFollow={ attributes[ `link${ i }NoFollow` ] }
										sponsored={ attributes[ `link${ i }Sponsored` ] }
										ugc={ attributes[ `link${ i }Ugc` ] }
										onChangeNewTab={ value => setAttributes( { [ `link${ i }NewTab` ]: value } ) }
										onChangeNoFollow={ value => setAttributes( { [ `link${ i }NoFollow` ]: value } ) }
										onChangeSponsored={ value => setAttributes( { [ `link${ i }Sponsored` ]: value } ) }
										onChangeUgc={ value => setAttributes( { [ `link${ i }Ugc` ]: value } ) }
									/>
								}
							</div>
						)
					} ) }
				</Fragment>
			) } />
		)
	}
}

export default compose(
	withUniqueClass,
	withSetAttributeHook,
	withGoogleFont,
	withTabbedInspector(),
	withContentAlignReseter( [ 'Line%sAlign', 'Subtitle%sAlign', 'Title%sAlign', 'Description%sAlign', 'Arrow%sAlign' ] ),
	withBlockStyles( createStyles, { editorMode: true } ),
	withClickOpenInspector( [
		[ '.lmb-image-box__title', 'title' ],
		[ '.lmb-image-box__subtitle', 'subtitle' ],
		[ '.lmb-image-box__description', 'description' ],
		[ '.lmb-image-box__arrow svg', 'arrow' ],
	] ),
	withSelect( ( select, props ) => {
		// Once the editor is loaded, cache the other sizes of the image.
		cacheImageData( props.attributes.image1Id, select )
		cacheImageData( props.attributes.image2Id, select )
		cacheImageData( props.attributes.image3Id, select )
		cacheImageData( props.attributes.image4Id, select )
	} ),
	withFocusOutside,
)( Edit )
