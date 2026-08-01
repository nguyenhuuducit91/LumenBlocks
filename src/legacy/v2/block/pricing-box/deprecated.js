/**
 * External dependencies
 */
import {
	DeprecatedButtonContent_1_15_5,
} from '../../components/button-edit'
import {
	descriptionPlaceholder, isDarkColor, range,
} from '~lumen/utils'
import classnames from 'classnames'
import striptags from 'striptags'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

const deprecatedSave_1_17_3 = props => {
	const { className, attributes } = props
	const {
		pricingBoxColor,
		priceColor,
		perMonthLabelColor,
		buttonColor,
		buttonTextColor,
		buttonDesign,
		buttonIcon,
		featureListColor,
		columns = 2,
		size,
		cornerButtonRadius,
		design = 'basic',
		borderRadius = 12,
		shadow = 3,
	} = attributes

	const mainClasses = classnames( [
		className,
		'lmb-pricing-box',
		'lmb-pricing-box--v2',
		`lmb-pricing-box--columns-${ columns }`,
		`lmb-pricing-box--design-${ design }`,
	], applyFilters( 'lumen.pricing-box.mainclasses_1_17_3', {}, design, props ) )

	return (
		<div className={ mainClasses }>
			{ applyFilters( 'lumen.pricing-box.save.output.before_1_17_3', null, design, props ) }
			{ range( 1, columns + 1 ).map( i => {
				const index = i === 1 ? '' : i
				const title = attributes[ `pricingBoxTitle${ index }` ]
				const price = attributes[ `price${ index }` ]
				const pricePrefix = attributes[ `pricePrefix${ index }` ]
				const priceSuffix = attributes[ `priceSuffix${ index }` ]
				const subPrice = attributes[ `perMonthLabel${ index }` ]
				const buttonURL = attributes[ `url${ index }` ]
				const buttonNewTab = attributes[ `newTab${ index }` ]
				const buttonText = attributes[ `buttonText${ index }` ]
				const description = attributes[ `featureList${ index }` ]
				const imageURL = attributes[ `imageURL${ index }` ]
				const imageAlt = attributes[ `imageAlt${ index }` ]
				const highlightColor = attributes[ `highlightColor${ index }` ] || ''

				const itemClasses = classnames( [
					'lmb-pricing-box__item',
				], applyFilters( 'lumen.pricing-box.itemclasses_1_17_3', {
					[ `lmb--shadow-${ shadow }` ]: design !== 'plain' && shadow !== 3,
					'lmb-pricing-box--highlighted': design !== 'plain' && highlightColor,
					'lmb-pricing-box--is-dark': design !== 'plain' && highlightColor ? isDarkColor( highlightColor ) : false,
				}, design, i, props ) )

				const styles = applyFilters( 'lumen.pricing-box.styles_1_17_3', {
					item: {
						borderRadius: design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
						backgroundColor: design !== 'plain' && highlightColor ? highlightColor : undefined,
					},
					title: {
						color: pricingBoxColor,
					},
					price: {
						color: priceColor,
					},
					month: {
						color: perMonthLabelColor,
					},
					description: {
						color: featureListColor,
					},
				}, design, i, props )

				return (
					<div className={ itemClasses } style={ styles.item } key={ i }>
						{ ( () => {
							const imageComp = imageURL && (
								<div className="lmb-pricing-box__image">
									<img src={ imageURL } alt={ striptags( title ? title : imageAlt ) } />
								</div>
							)
							const imageBGComp = imageURL && (
								<div className="lmb-pricing-box__image-bg" style={ {
									backgroundImage: `url(${ imageURL })`,
								} }>
								</div>
							)
							const titleComp = ! RichText.isEmpty( title ) && (
								<RichText.Content
									tagName="h3"
									className="lmb-pricing-box__title"
									style={ styles.title }
									value={ title }
								/>
							)
							const priceComp = ( ! RichText.isEmpty( price ) || ! RichText.isEmpty( subPrice ) ) && (
								<div className="lmb-pricing-box__price-wrapper">
									{ ! RichText.isEmpty( price ) && (
										<div className="lmb-pricing-box__price-line">
											{ ! RichText.isEmpty( pricePrefix ) && (
												<RichText.Content
													tagName="span"
													className="lmb-pricing-box__price-prefix"
													style={ styles.price }
													value={ pricePrefix }
												/>
											) }
											<RichText.Content
												tagName="span"
												className="lmb-pricing-box__price"
												style={ styles.price }
												value={ price }
											/>
											{ ! RichText.isEmpty( priceSuffix ) && (
												<RichText.Content
													tagName="span"
													className="lmb-pricing-box__price-suffix"
													style={ styles.price }
													value={ priceSuffix }
												/>
											) }
										</div>
									) }
									{ ! RichText.isEmpty( subPrice ) && (
										<RichText.Content
											tagName="p"
											className="lmb-pricing-box__subprice"
											style={ styles.month }
											value={ subPrice }
										/>
									) }
								</div>
							)
							const buttonComp = buttonText && !! buttonText.length && (
								<div className="lmb-pricing-box__button">
									<DeprecatedButtonContent_1_15_5
										size={ size }
										url={ buttonURL }
										newTab={ buttonNewTab }
										color={ buttonTextColor }
										text={ buttonText }
										design={ buttonDesign }
										icon={ buttonIcon }
										backgroundColor={ buttonColor }
										borderRadius={ cornerButtonRadius }
									/>
								</div>
							)
							const descriptionComp = ! RichText.isEmpty( description ) && (
								<RichText.Content
									tagName="p"
									className="lmb-pricing-box__description"
									style={ styles.description }
									value={ description }
								/>
							)
							const comps = {
								imageComp,
								imageBGComp,
								titleComp,
								priceComp,
								buttonComp,
								descriptionComp,
							}
							return applyFilters( 'lumen.pricing-box.save.output_1_17_3', (
								<Fragment>
									{ imageComp }
									{ titleComp }
									{ priceComp }
									{ buttonComp }
									{ descriptionComp }
								</Fragment>
							), design, comps, i, props )
						} )() }
					</div>
				)
			} ) }
			{ applyFilters( 'lumen.pricing-box.save.output.after_1_17_3', null, design, props ) }
		</div>
	)
}

const deprecatedSchema_1_17_3 = {
	pricingBoxColor: {
		type: 'string',
	},
	priceColor: {
		type: 'string',
	},
	perMonthLabelColor: {
		type: 'string',
	},
	buttonColor: {
		type: 'string',
	},
	buttonTextColor: {
		type: 'string',
	},
	buttonDesign: {
		type: 'string',
		default: 'basic',
	},
	buttonIcon: {
		type: 'string',
	},
	featureListColor: {
		type: 'string',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	size: {
		type: 'string',
		default: 'normal',
	},
	cornerButtonRadius: {
		type: 'number',
		default: 4,
	},
	design: {
		type: 'string',
		default: 'basic',
	},
	borderRadius: {
		type: 'number',
		default: 12,
	},
	shadow: {
		type: 'number',
		default: 3,
	},
	hoverEffect: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
	},

	// Custom CSS attributes.
	customCSSUniqueID: {
		type: 'string',
		default: '',
	},
	customCSS: {
		type: 'string',
		default: '',
	},
	customCSSCompiled: {
		type: 'string',
		default: '',
	},
}
// Wrap in curly or else statement will merge with the previous one and will error out.
{ [ 1, 2, 3 ].forEach( i => {
	const index = i === 1 ? '' : i
	deprecatedSchema_1_17_3[ `url${ index }` ] = {
		type: 'string',
		source: 'attribute',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-button`,
		attribute: 'href',
		default: '',
	}
	deprecatedSchema_1_17_3[ `newTab${ index }` ] = {
		type: 'boolean',
		source: 'attribute',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-button`,
		attribute: 'target',
		default: false,
	}
	deprecatedSchema_1_17_3[ `imageURL${ index }` ] = {
		type: 'string',
	}
	deprecatedSchema_1_17_3[ `imageID${ index }` ] = {
		type: 'string',
	}
	deprecatedSchema_1_17_3[ `imageAlt${ index }` ] = {
		type: 'string',
	}
	deprecatedSchema_1_17_3[ `highlightColor${ index }` ] = {
		type: 'string',
		default: '',
	}
	deprecatedSchema_1_17_3[ `pricingBoxTitle${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__title`,
		default: __( 'Title', i18n ),
	}
	deprecatedSchema_1_17_3[ `price${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__price`,
		default: `${ index }9`,
	}
	deprecatedSchema_1_17_3[ `pricePrefix${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__price-prefix`,
		default: '$',
	}
	deprecatedSchema_1_17_3[ `priceSuffix${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__price-suffix`,
		default: '.00',
	}
	deprecatedSchema_1_17_3[ `perMonthLabel${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__subprice`,
		default: __( 'Description', i18n ),
	}
	deprecatedSchema_1_17_3[ `buttonText${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-button span`,
		default: __( 'Button text', i18n ),
	}
	deprecatedSchema_1_17_3[ `featureList${ index }` ] = {
		source: 'html',
		selector: `.lmb-pricing-box__item:nth-of-type(${ i }) .lmb-pricing-box__description`,
		default: descriptionPlaceholder( 'medium' ),
	}
} ) }

const deprecated = [
	{
		attributes: deprecatedSchema_1_17_3,
		save: deprecatedSave_1_17_3,
		migrate: attributes => {
			const {
				design = 'basic',
			} = attributes

			return {
				...attributes,

				titleColor: attributes.pricingBoxColor,
				priceColor: attributes.priceColor,
				subPriceColor: attributes.perMonthLabelColor,
				buttonBackgroundColor: attributes.buttonColor,
				descriptionColor: attributes.featureListColor,
				buttonSize: attributes.size,
				buttonBorderRadius: attributes.cornerButtonRadius,

				button1Url: attributes.url,
				button2Url: attributes.url2,
				button3Url: attributes.url3,
				button1NewTab: attributes.newTab,
				button2NewTab: attributes.newTab2,
				button3NewTab: attributes.newTab3,

				image1Url: attributes.imageURL,
				image2Url: attributes.imageURL2,
				image3Url: attributes.imageURL3,
				image1Id: attributes.imageID,
				image2Id: attributes.imageID2,
				image3Id: attributes.imageID3,
				image1Alt: attributes.imageAlt,
				image2Alt: attributes.imageAlt2,
				image3Alt: attributes.imageAlt3,

				// Depends on design, the highlight color can either be the background color or header color.
				column1BackgroundColor: ! [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor : '',
				column2BackgroundColor: ! [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor2 : '',
				column3BackgroundColor: ! [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor3 : '',

				column1HeaderBackgroundColor: [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor : '',
				column2HeaderBackgroundColor: [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor2 : '',
				column3HeaderBackgroundColor: [ 'sectioned', 'colored' ].includes( design ) ? attributes.highlightColor3 : '',

				title1: attributes.pricingBoxTitle,
				title2: attributes.pricingBoxTitle2,
				title3: attributes.pricingBoxTitle3,
				price1: attributes.price,
				price2: attributes.price2,
				price3: attributes.price3,
				pricePrefix1: attributes.pricePrefix,
				pricePrefix2: attributes.pricePrefix2,
				pricePrefix3: attributes.pricePrefix3,
				priceSuffix1: attributes.priceSuffix,
				priceSuffix2: attributes.priceSuffix2,
				priceSuffix3: attributes.priceSuffix3,
				subPrice1: attributes.perMonthLabel,
				subPrice2: attributes.perMonthLabel2,
				subPrice3: attributes.perMonthLabel3,
				button1Text: attributes.buttonText,
				button2Text: attributes.buttonText2,
				button3Text: attributes.buttonText3,
				description1: attributes.featureList,
				description2: attributes.featureList2,
				description3: attributes.featureList3,
			}
		},
	},
]

export default deprecated
