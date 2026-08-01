/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	DefaultButton,
	DefaultOutlineButton,
	RenderBlock,
	getPlaceholders,
} from './utils'
import heroBg from './images/hero-bg.webp'
import mediaText from './images/media-text.webp'
import { COLOR_SCHEME_PROPERTY_LABELS } from '../../ui/color-scheme-preview'

import {
	i18n, srcUrl, homeUrl,
} from 'lumen'
import { isDarkColor } from '~lumen/utils'
import { LONG_TEXT } from './block-templates'

import { __, sprintf } from '@wordpress/i18n'
import {
	Icon,
	addTemplate as addTemplateIcon,
	styles as stylesIcon,
	scheduled as scheduledIcon,
} from '@wordpress/icons'
import { Fragment } from '@wordpress/element'
import { getBlockType } from '@wordpress/blocks'

export const ColorSchemes = ( { colorSchemes, className } ) => {
	return <>
		<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Color Schemes', i18n ) }</h2>
		<div className="lmb-style-guide__columns lmb-style-guide__color-schemes">
			{ colorSchemes.map( ( colorScheme, i ) => {
				return (
					<div key={ colorScheme.key } className="lmb-style-guide__column">
						<h2 className="lmb-style-guide__color-scheme-title lmb-style-guide__title lmb-style-guide__color-label">{ colorScheme.schemeType ? `${ colorScheme.schemeType } (${ colorScheme.name })` : colorScheme.name }</h2>
						<div className={ `lmb-style-guide__color-scheme lmb-style-guide__color-container lmb-style-guide__preview-root ${ className }` } style={ {
							backgroundColor: colorScheme.normal.backgroundColor,
							'--hover-background-color': colorScheme.hover.backgroundColor || colorScheme.normal.backgroundColor,
						} }>
							<div className="lmb-style-guide__color-scheme__subtitle lmn-subtitle lmb-style-guide__typography-preview" data-device="desktop" style={ {
								color: colorScheme.normal.accentColor,
								'--parent-hover-color': colorScheme.parentHover.accentColor || colorScheme.normal.accentColor,
							} }>{ __( 'Subtitle', i18n ) }</div>
							<h2 className="lmb-style-guide__color-scheme__heading lmb-style-guide__typography-preview" data-device="desktop" style={ {
								color: colorScheme.normal.headingColor,
								'--parent-hover-color': colorScheme.parentHover.headingColor || colorScheme.normal.headingColor,
							} }>{ __( 'Headings', i18n ) }</h2>

							<p className="lmb-style-guide__color-scheme__body lmb-style-guide__typography-preview" data-device="desktop" style={ {
								color: colorScheme.normal.textColor,
								'--parent-hover-color': colorScheme.parentHover.textColor || colorScheme.normal.textColor,
							} }>
								{ LONG_TEXT[ i % 6 ] }
							&nbsp;
								{ LONG_TEXT[ ( i + 1 ) % 6 ] }
							&nbsp;
								{ LONG_TEXT[ ( i + 2 ) % 6 ] }
							&nbsp;
								{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
								<a href="#" onClick={ e => e.preventDefault() } style={ {
									color: colorScheme.normal.linkColor,
									'--hover-color': colorScheme.hover.linkColor || colorScheme.normal.linkColor || colorScheme.normal.textColor,
									'--parent-hover-color': colorScheme.parentHover.linkColor || colorScheme.normal.linkColor || colorScheme.normal.textColor,
								} }>
									{ __( 'Link', i18n ) }
								</a>
							</p>

							{ /* TODO: Kae: the button looks here should be based on the design system */ }
							<div className={ `lmb-style-guide__preview-button-group lmn--container-scheme--${ colorScheme.key }` }>
								<DefaultButton text={ __( 'Button', i18n ) } />
								<DefaultOutlineButton text={ __( 'Button', i18n ) } />
							</div>
						</div>
						<div className="lmb-style-guide__color-scheme__colors">
							<h3 className="lmb-style-guide__section-subheading--small">{ __( 'Base Colors', i18n ) }</h3>
							{ Object.keys( colorScheme.normal ).map( property => {
								const label = COLOR_SCHEME_PROPERTY_LABELS[ property ]
								return <>
									<p>{ label }{ `: ` }<span className="lmb-style-guide__color-indicator" style={ { backgroundColor: colorScheme.normal[ property ] } } />{ colorScheme.normal[ property ] }</p>
								</>
							} ) }

							{ !! Object.values( colorScheme.hover ).length && <>
								<h3 className="lmb-style-guide__section-subheading--small">{ __( 'Hover Colors', i18n ) }</h3>
								{ Object.keys( colorScheme.hover ).map( property => {
									const label = COLOR_SCHEME_PROPERTY_LABELS[ property ]
									return <>
										<p>{ label }{ `: ` }<span className="lmb-style-guide__color-indicator" style={ { backgroundColor: colorScheme.hover[ property ] } } />{ colorScheme.hover[ property ] || colorScheme.normal[ property ] }</p>
									</>
								} ) }
							</> }

							{ !! Object.values( colorScheme.parentHover ).length && <>
								<h3 className="lmb-style-guide__section-subheading--small">{ __( 'Parent Hovered Colors', i18n ) }</h3>
								{ Object.keys( colorScheme.parentHover ).map( property => {
									const label = COLOR_SCHEME_PROPERTY_LABELS[ property ]
									return <>
										<p>{ label }{ `: ` }<span className="lmb-style-guide__color-indicator" style={ { backgroundColor: colorScheme.parentHover[ property ] } } />{ colorScheme.parentHover[ property ] || colorScheme.normal[ property ] }</p>
									</>
								} ) }
							</> }
						</div>
					</div>
				)
			} ) }
		</div>
	</>
}

export const Colors = ( { colors } ) => {
	return <>
		<h2 className="lmb-style-guide__section-subheading">{ __( 'Global Color Palette', i18n ) }</h2>
		<div className="lmb-style-guide__columns lmb-style-guide__colors">
			{ colors.map( ( color, key ) => {
				return <div key={ key } className="lmb-style-guide__column lmb-style-guide__color-container" style={ { backgroundColor: color.color } }>
					<div className="lmb-style-guide__color-label lmb-style-guide__title" style={ { color: isDarkColor( color.color ) ? '#fff' : '#000' } }>
						<div>{ color.name }</div>
						<div>{ color.color }</div>
					</div>
				</div>
			} ) }
		</div>
	</>
}

export const Typography = ( { typography } ) => {
	return <>
		<h1 className="lmb-style-guide__section-title lmb-style-guide__title lmb-style-guide__typography-title">{ __( 'Typography', i18n ) }</h1>
		<div className="lmb-style-guide__columns lmb-style-guide__typography-headings">

			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Desktop', i18n ) }</h2>
				{ typography.desktop.length > 0 && typography.desktop.map( ( [ element, description ], i ) => {
					const Tag = element.startsWith( 'h' ) ? element : 'p'
					const classname = i === 7 ? 'lmn-subtitle' : i === 8 ? 'lmn-button__inner-text' : ''

					const label = i < 6 ? sprintf( __( 'Heading %d', i18n ), i + 1 )
						: i === 6 ? __( 'Body', i18n )
							: i === 7 ? __( 'Subtitle', i18n )
								: __( 'Button', i18n )

					return (
						<div key={ i } className="lmb-style-guide__typography-container">
							<Tag className={ `lmb-style-guide__typography-preview ${ classname }` } data-device="desktop">{ label }</Tag>
							<div className="lmb-style-guide__typography-label">{ description }</div>
						</div>
					)
				} ) }
			</div>

			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Tablet', i18n ) }</h2>
				{ typography.tablet.length > 0 && typography.tablet.map( ( [ element, description ], i ) => {
					const Tag = element.startsWith( 'h' ) ? element : 'p'
					const classname = i === 7 ? 'lmn-subtitle' : i === 8 ? 'lmn-button__inner-text' : ''
					const label = i < 6 ? sprintf( __( 'Heading %d', i18n ), i + 1 )
						: i === 6 ? __( 'Body', i18n )
							: i === 7 ? __( 'Subtitle', i18n )
								: __( 'Button', i18n )

					return (
						<div key={ i } className="lmb-style-guide__typography-container">
							<Tag className={ `lmb-style-guide__typography-preview ${ classname }` } data-device="tablet">{ label }</Tag>
							<div className="lmb-style-guide__typography-label">{ description }</div>
						</div>
					)
				} ) }
			</div>

			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Mobile', i18n ) }</h2>
				{ typography.mobile.length > 0 && typography.mobile.map( ( [ element, description ], i ) => {
					const Tag = element.startsWith( 'h' ) ? element : 'p'
					const classname = i === 7 ? 'lmn-subtitle' : i === 8 ? 'lmn-button__inner-text' : ''
					const label = i < 6 ? sprintf( __( 'Heading %d', i18n ), i + 1 )
						: i === 6 ? __( 'Body', i18n )
							: i === 7 ? __( 'Subtitle', i18n )
								: __( 'Button', i18n )

					return (
						<div key={ i } className="lmb-style-guide__typography-container">
							<Tag className={ `lmb-style-guide__typography-preview ${ classname }` } data-device="mobile">{ label }</Tag>
							<div className="lmb-style-guide__typography-label">{ description }</div>
						</div>
					)
				} ) }
			</div>
		</div>

		<div className="lmb-style-guide__columns lmb-style-guide__typography-body">
			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Desktop', i18n ) }</h2>
				<h2 className="lmb-style-guide__typography-preview" data-device="desktop">{ __( 'Built on the Moments Between', i18n ) }</h2>
				<p className="lmb-style-guide__typography-preview" data-device="desktop">{ LONG_TEXT[ 0 ] } { LONG_TEXT[ 1 ] } { LONG_TEXT[ 2 ] }</p>
			</div>
			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Tablet', i18n ) }</h2>
				<h2 className="lmb-style-guide__typography-preview" data-device="tablet">{ __( 'Built on the Moments Between', i18n ) }</h2>
				<p className="lmb-style-guide__typography-preview" data-device="tablet">{ LONG_TEXT[ 1 ] } { LONG_TEXT[ 2 ] } { LONG_TEXT[ 3 ] }</p>
			</div>
			<div className="lmb-style-guide__column">
				<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Mobile', i18n ) }</h2>
				<h2 className="lmb-style-guide__typography-preview" data-device="mobile">{ __( 'Built on the Moments Between', i18n ) }</h2>
				<p className="lmb-style-guide__typography-preview" data-device="mobile">{ LONG_TEXT[ 2 ] } { LONG_TEXT[ 1 ] } { LONG_TEXT[ 2 ] }</p>
			</div>
		</div>
	</>
}

export const BlockStyles = ( { allBlockStyles, className } ) => {
	return <>
		<h1 className="lmb-style-guide__section-title lmb-style-guide__title">{ __( 'Web Elements', i18n ) }</h1>
		<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Buttons', i18n ) }</h2>
		<div className={ `lmb-style-guide__elements lmb-style-guide__elements__buttons lmb-style-guide__preview-root ${ className }` }>
			<RenderBlock blockName="lumen/button" attributes={ { text: __( 'Button', i18n ) } } />
			{ 'lumen/button' in allBlockStyles && allBlockStyles[ 'lumen/button' ].length > 0 && <>
				{ allBlockStyles[ 'lumen/button' ].map( ( blockStyle, index ) => {
					return <RenderBlock
						key={ index }
						blockName="lumen/button"
						attributes={ {
							...blockStyle.attributes,
							text: __( 'Button', i18n ),
							blockStyle: blockStyle.slug,
						} }
						name={ blockStyle.name }
					/>
				} ) }
			</> }
		</div>
		<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ __( 'Images', i18n ) }</h2>
		<div className={ `lmb-style-guide__elements lmb-style-guide__elements__images lmb-style-guide__preview-root ${ className }` }>
			{ /* <DefaultImage imgSrc={ srcUrl + '/' + heroBg } /> */ }
			<RenderBlock blockName="lumen/image" attributes={ { imageExternalUrl: `${ srcUrl }/${ heroBg }` } } />
			{ 'lumen/image' in allBlockStyles && allBlockStyles[ 'lumen/image' ].length > 0 && <>
				{ allBlockStyles[ 'lumen/image' ].map( ( blockStyle, index ) => {
					return <RenderBlock
						key={ index }
						blockName="lumen/image"
						attributes={ {
							...blockStyle.attributes,
							imageExternalUrl: `${ srcUrl }/${ heroBg }`,
							blockStyle: blockStyle.slug,
						} }
						name={ blockStyle.name }
					/>
				} ) }
			</> }
		</div>

		{ typeof allBlockStyles === 'object' && Object.keys( allBlockStyles ).length > 0 && <>
			{ Object.entries( allBlockStyles ).map( ( [ blockName, blockStyles ], index ) => {
				// Skip 'lumen/button' and 'lumen/image'
				if ( blockName === 'lumen/button' || blockName === 'lumen/image' ) {
					return null
				}

				const blockTitle = getBlockType( blockName ).title
				const { attributes, innerBlocks } = getPlaceholders( blockName )
				return ( <Fragment key={ index }>
					<h2 className="lmb-style-guide__section-subheading lmb-style-guide__title">{ blockTitle }</h2>
					<div className={ `lmb-style-guide__elements lmb-style-guide__preview-root ${ className }` }>
						{ /* Render Default Block Style */ }
						<RenderBlock key={ 0 } blockName={ blockName } attributes={ attributes } innerBlocks={ innerBlocks } />
						{ blockStyles.map( ( blockStyle, styleIndex ) => (
							<RenderBlock
								key={ styleIndex + 1 }
								blockName={ blockName }
								attributes={ {
									...attributes,
									...blockStyle.attributes,
									blockStyle: blockStyle.slug,
								} }
								innerBlocks={ innerBlocks }
								name={ blockStyle.name }
							/>
						) ) }
					</div>
				</Fragment>
				)
			} ) }
		</>
		}
	</>
}

export const WebPreview = ( { className } ) => {
	return <>
		<h1 className="lmb-style-guide__section-title lmb-style-guide__title">{ __( 'Example Website Preview', i18n ) }</h1>
		<div className="lmb-style-guide__preview">
			<div className="lmb-style-guide__preview-mock-browser">
				<div className="lmb-style-guide__preview-mock-browser__buttons">
					<div className="lmb-style-guide__preview-mock-browser__button"></div>
					<div className="lmb-style-guide__preview-mock-browser__button"></div>
					<div className="lmb-style-guide__preview-mock-browser__button"></div>
				</div>
				{ /* TODO: can we get the URL of the current site here? */ }
				<div className="lmb-style-guide__preview-mock-browser__url">{ homeUrl }</div>
				<div className="lmb-style-guide__preview-mock-browser__resize-handle"></div>
			</div>
			<div className={ `lmb-style-guide__preview-root ${ className }` }>
				{ /* HERO SECTION */ }
				<div className="wp-block-lumen-columns alignfull lmn-block-columns lmn-block lmn-2d5f398 lmn-block-background lmn--has-background-overlay lmb-style-guide__preview-hero" data-block-id="2d5f398" style={ { '--bg-image': `url(${ srcUrl + '/' + heroBg })` } }>
					<style>{ `.lmn-2d5f398 {min-height:450px !important;align-items:center !important;display:flex !important; background-size: cover !important; background-position: center !important; background-repeat: no-repeat !important;}` }</style>
					<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-content-align lmn-2d5f398-column alignwide">
						<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-830918c" data-v="4" data-block-id="830918c">
							<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-830918c-container lmn--no-background lmn--no-padding">
								<div className="has-text-align-center lmn-block-content lmn-inner-blocks lmn-830918c-inner-blocks">
									<div className="wp-block-lumen-subtitle lmn-block-subtitle lmn-block lmn-fb52f96" data-block-id="fb52f96">
										<style>{ '.lmn-fb52f96 .lmn-block-subtitle__text{color:#bbbbbb !important;}' }</style>
										<p className="lmn-block-subtitle__text lmn-subtitle has-text-color">{ __( 'Welcome to Our Company', i18n ) }</p>
									</div>

									<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-6602002" id="hero" data-block-id="6602002">
										<style>{ '.lmn-6602002 .lmn-block-heading__text{color:#ffffff !important;}' }</style>
										<h1 className="lmn-block-heading__text has-text-color">{ __( 'Professional Solutions for Businesses', i18n ) }</h1>
									</div>

									<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-f9171eb" data-block-id="f9171eb">
										<style>{ '.lmn-f9171eb .lmn-block-text__text{color:#ffffff !important;}' }</style>
										<p className="lmn-block-text__text has-text-color">
											{ __( 'We provide innovative services and support to help your business grow and succeed in a competitive market.', i18n ) }
										</p>
									</div>

									<div className="wp-block-lumen-button-group lmn-block-button-group lmn-block lmn-ff42814" data-block-id="ff42814">
										<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-button-group">
											<div className="wp-block-lumen-button lmn-block-button lmn-block lmn-65bd3dd" data-block-id="65bd3dd">
												<a className="lmn-link lmn-button lmn--hover-effect-darken" href="#" onClick={ e => e.preventDefault() }>
													<span className="lmn-button__inner-text">{ __( 'Get Started', i18n ) }</span>
												</a>
											</div>

											<div className="wp-block-lumen-button lmn-block-button is-style-ghost lmn-block lmn-5b35e19" data-block-id="5b35e19">
												<style>{ '.lmn-5b35e19 .lmn-button{background:transparent !important;}.lmn-5b35e19 .lmn-button:hover:after{background:transparent !important;opacity:1 !important;}:where(.lmn-hover-parent:hover,  .lmn-hover-parent.lmn--is-hovered) .lmn-5b35e19 .lmn-button:after{background:transparent !important;opacity:1 !important;}.lmn-5b35e19 .lmn-button:before{border-style:solid !important;border-color:#ffffff !important;}.lmn-5b35e19 .lmn-button__inner-text{color:#ffffff !important;}' }</style>
												<style className="lmn-custom-css">{ '.lmn-5b35e19.lmn-block-button{--lmn-button-outline-color:#fff !important}' }</style>
												<a className="lmn-link lmn-button lmn--hover-effect-darken" href="#" onClick={ e => e.preventDefault() }>
													<span className="has-text-color lmn-button__inner-text">{ __( 'Learn More', i18n ) }</span>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{ /* END OF HERO SECTION */ }

				{ /* 3-COLUMN CONTAINER SECTION */ }
				<div className="wp-block-lumen-columns alignfull lmn-block-columns lmn-block lmn-9a39825" data-block-id="9a39825">
					<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-content-align lmn-9a39825-column alignwide">
						<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-24d7b12" data-v="4" data-block-id="24d7b12">
							<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-24d7b12-container lmn--no-background lmn--no-padding">
								<div className="has-text-align-center lmn-block-content lmn-inner-blocks lmn-24d7b12-inner-blocks">
									<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-8b4585e" id="section-title" data-block-id="8b4585e">
										<h2 className="lmn-block-heading__text">{ __( 'Our Services', i18n ) }</h2>
									</div>

									<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-111d3c5" data-block-id="111d3c5">
										<p className="lmn-block-text__text">{ __( 'Explore a wide range of solutions designed to meet your business needs.', i18n ) }</p>
									</div>

									<div className="wp-block-lumen-columns lmn-block-columns lmn-block lmn-a05e839" data-block-id="a05e839">
										<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-content-align lmn-a05e839-column">
											<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-cc2cc69" data-v="4" data-block-id="cc2cc69">
												<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-cc2cc69-container lmn-hover-parent">
													<div className="lmn-block-content lmn-inner-blocks lmn-cc2cc69-inner-blocks">
														<div className="wp-block-lumen-icon lmn-block-icon lmn-block lmn-e4ae2c1" data-block-id="e4ae2c1">
															<span className="lmn--svg-wrapper">
																<div className="lmn--inner-svg">
																	<Icon icon={ addTemplateIcon } />
																</div>
															</span>
														</div>

														<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-3b5efe7" id="grid-item-title" data-block-id="3b5efe7">
															<h3 className="lmn-block-heading__text">{ __( 'Consulting', i18n ) }</h3>
														</div>

														<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-b456df6" data-block-id="b456df6">
															<p className="lmn-block-text__text">
																{ __( 'Strategic guidance and expert advice to help your organization achieve its objectives.', i18n ) }
															</p>
														</div>
													</div>
												</div>
											</div>

											<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-7437b03" data-v="4" data-block-id="7437b03">
												<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-7437b03-container lmn-hover-parent">
													<div className="lmn-block-content lmn-inner-blocks lmn-7437b03-inner-blocks">
														<div className="wp-block-lumen-icon lmn-block-icon lmn-block lmn-a8356d9" data-block-id="a8356d9">
															<span className="lmn--svg-wrapper">
																<div className="lmn--inner-svg">
																	<Icon icon={ stylesIcon } />
																</div>
															</span>
														</div>

														<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-8248330" id="grid-item-title" data-block-id="8248330">
															<h3 className="lmn-block-heading__text">{ __( 'Technology', i18n ) }</h3>
														</div>

														<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-dd2581b" data-block-id="dd2581b">
															<p className="lmn-block-text__text">
																{ __( 'Custom software and IT solutions to streamline your business processes.', i18n ) }
															</p>
														</div>
													</div>
												</div>
											</div>

											<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-b606511" data-v="4" data-block-id="b606511">
												<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-b606511-container lmn-hover-parent">
													<div className="lmn-block-content lmn-inner-blocks lmn-b606511-inner-blocks">
														<div className="wp-block-lumen-icon lmn-block-icon lmn-block lmn-bb4e0fd" data-block-id="bb4e0fd">
															<span className="lmn--svg-wrapper">
																<div className="lmn--inner-svg">
																	<Icon icon={ scheduledIcon } />
																</div>
															</span>
														</div>

														<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-3d2ed89" id="grid-item-title" data-block-id="3d2ed89">
															<h3 className="lmn-block-heading__text">{ __( 'Support', i18n ) }</h3>
														</div>

														<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-ffddcf7" data-block-id="ffddcf7">
															<p className="lmn-block-text__text">
																{ __( 'Dedicated assistance and ongoing support for all your business needs.', i18n ) }
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{ /* END OF 3-COLUMN CONTAINER SECTION */ }

				{ /* COLUMNS WITH BACKGROUND SECTION */ }
				<div className="wp-block-lumen-columns alignfull lmn-block-columns lmn-block-background lmn-block lmn-d3ac391" data-block-id="d3ac391">
					<style>{ '.lmn-d3ac391{margin-bottom: 0px !important;}' }</style>
					<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-content-align lmn-d3ac391-column alignwide">
						<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-e559c74" data-v="4" data-block-id="e559c74">
							<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-e559c74-container lmn--no-background lmn--no-padding">
								<div className="lmn-block-content lmn-inner-blocks lmn-e559c74-inner-blocks">
									<div className="wp-block-lumen-image lmn-block-image lmn-block lmn-f263134" data-block-id="f263134">
										<style>{ '.lmn-f263134 .lmn-img-wrapper{width:100% !important;height:400px !important;}.lmn-f263134 .lmn-img-wrapper img{object-fit:cover !important;}' }</style>
										<figure>
											<span className="lmn-img-wrapper lmn-image--shape-stretch">
												<img className="lmn-img wp-image-5695" src={ srcUrl + '/' + mediaText } width="1125" height="750" alt="Placeholder" />
											</span>
										</figure>
									</div>
								</div>
							</div>
						</div>

						<div className="wp-block-lumen-column lmn-block-column lmn-column lmn-block lmn-d99e48d" data-v="4" data-block-id="d99e48d">
							<style>{ '.lmn-d99e48d {padding-top:50px !important;}' }</style>
							<div className="lmn-column-wrapper lmn-block-column__content lmn-container lmn-d99e48d-container lmn--no-background lmn--no-padding">
								<div className="lmn-block-content lmn-inner-blocks lmn-d99e48d-inner-blocks">
									<div className="wp-block-lumen-subtitle lmn-block-subtitle lmn-block lmn-9514e13" data-block-id="9514e13">
										<p className="lmn-block-subtitle__text lmn-subtitle">{ __( 'About Our Company', i18n ) }</p>
									</div>

									<div className="wp-block-lumen-heading lmn-block-heading lmn-block-heading--v2 lmn-block lmn-505a24b" id="section-title" data-block-id="505a24b">
										<h2 className="lmn-block-heading__text">{ __( 'Committed to Your Success', i18n ) }</h2>
									</div>

									<div className="wp-block-lumen-text lmn-block-text lmn-block lmn-36a0bf6" data-block-id="36a0bf6">
										<p className="lmn-block-text__text">
											{ __( 'Our experienced team delivers reliable solutions and outstanding results for businesses of all sizes and industries.', i18n ) }
										</p>
									</div>

									<div className="wp-block-lumen-button-group lmn-block-button-group lmn-block lmn-cdea3f4" data-block-id="cdea3f4">
										<div className="lmn-row lmn-inner-blocks lmn-block-content lmn-button-group">
											<div className="wp-block-lumen-button lmn-block-button lmn-block lmn-96502ae" data-block-id="96502ae">
												<a className="lmn-link lmn-button lmn--hover-effect-darken" href="#" onClick={ e => e.preventDefault() }>
													<span className="lmn-button__inner-text">{ __( 'Read More', i18n ) }</span>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{ /* END OF COLUMNS WITH BACKGROUND SECTION */ }
			</div>
		</div>
	</>
}
