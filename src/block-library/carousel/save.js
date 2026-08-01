/**
 * External dependencies
 */
import { withVersion } from '~lumen/hoc'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	BlockDiv,
	CustomCSS,
	getAlignmentClasses,
	getResponsiveClasses,
	getRowClasses,
	Separator,
	getSeparatorClasses,
	getContentAlignmentClasses,
} from '~lumen/features'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { SvgIcon } from '~lumen/ui'
import { defaultIconNext, defaultIconPrev } from './schema'

export const Save = props => {
	const {
		attributes,
	} = props

	const rowClass = getRowClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const responsiveClass = getResponsiveClasses( props.attributes )

	const blockClassName = classnames( [
		props.className,
		'lmn-block-carousel',
		responsiveClass,
		separatorClass,
		{
			'lmn--is-slide': attributes.carouselType === '',
			'lmn--is-fade': attributes.carouselType === 'fade',
			'lmn--infinite-scroll': attributes.carouselType === '' && attributes.infiniteScroll,
			'lmn--hide-mobile-arrows': attributes.showArrowsOnMobile === false,
			'lmn--hide-mobile-dots': attributes.showDotsOnMobile === false,

			'lmn--arrows-outside': attributes.arrowPosition === 'outside',
			'lmn--dots-outline': attributes.dotsStyle === 'outline',
			[ `lmn--arrows-justify-${ attributes.arrowJustify || 'space-between' }` ]: attributes.arrowJustify || 'space-between',
			[ `lmn--arrows-align-${ attributes.arrowAlign || 'center' }` ]: attributes.arrowAlign || 'center',
		},
	] )

	const contentClassNames = classnames( applyFilters( 'lumen.carousel.save.contentClassNames', [
		[
			rowClass,
			'lmn-inner-blocks',
			blockAlignmentClass,
			'lmn-block-content',
			'lmn-block-carousel__slider-wrapper',
		],
		getContentAlignmentClasses( props.attributes ),
	], props ) )

	return (
		<BlockDiv.Content
			className={ blockClassName }
			attributes={ attributes }
			version={ props.version }
			data-slides-to-show={ attributes.slidesToShow }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<CustomCSS.Content attributes={ attributes } />
			<Separator.Content attributes={ attributes }>
				<div className="lmn-block-carousel__content-wrapper">
					<div className={ contentClassNames }>
						<div
							className="lmn-block-carousel__slider"
							role="list"
							data-autoplay={ attributes.autoplay ? ( attributes.autoplaySpeed || '4000' ) : undefined }
							data-label-slide-of={ attributes.ariaLabelPrev || 'Slide %%d of %%d' }
							tabIndex={ 0 }
							{ ...applyFilters( 'lumen.carousel.save.slider-props', {}, props ) }
						>
							<InnerBlocks.Content />
						</div>
						{ attributes.showArrows && (
							<div className="lmn-block-carousel__buttons">
								<button className="lmn-block-carousel__button lmn-block-carousel__button__prev" aria-label={ attributes.ariaLabelPrev || 'Previous slide' }>
									<SvgIcon.Content
										value={ attributes.arrowIconPrev || defaultIconPrev }
									/>
								</button>
								<button className="lmn-block-carousel__button lmn-block-carousel__button__next" aria-label={ attributes.ariaLabelNext || 'Next slide' }>
									<SvgIcon.Content
										value={ attributes.arrowIconNext || defaultIconNext }
									/>
								</button>
							</div>
						) }
					</div>
					{ attributes.showDots && <div className="lmn-block-carousel__dots" role="list" data-label={ attributes.ariaLabelSlide || 'Slide %%d' }></div> }
				</div>
			</Separator.Content>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
