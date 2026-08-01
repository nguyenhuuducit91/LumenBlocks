/**
 * External dependencies
 */
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import { BlockContainer } from '~lumen/ui'
import classnames from 'classnames'
import { range } from 'lodash'
import striptags from 'striptags'

/**
 * Internal dependencies
 */
import SVGArrow from './images/arrow.svg'
import createStyles from './style'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

const save = props => {
	const { className, attributes } = props
	const {
		columns = 2,
		contentAlign = '',
		design = 'basic',
		titleTag = '',
		shadow = '',
		showOverlay = false,
		showOverlayHover = true,
		showSubtitle = true,
		showTitle = true,
		showDescription = true,
		showArrow = false,
		imageHoverEffect = '',
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
	}, props ) )

	const show = showOptions( props )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const subtitle = attributes[ `subtitle${ i }` ]
					const title = attributes[ `title${ i }` ]
					const description = attributes[ `description${ i }` ]
					const ariaLabel = striptags(
						( showTitle && ! RichText.isEmpty( title ) ) ? title
							: ( showSubtitle && ! RichText.isEmpty( subtitle ) ) ? subtitle
								: ( showDescription && ! RichText.isEmpty( description ) ) ? description
									: ''
					)

					const itemClasses = classnames( [
						'lmb-image-box__item',
						`lmb-image-box__item${ i }`,
						'lmb-image-box__box',
					], applyFilters( 'lumen.image-box.itemclasses', {
						[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
					}, props, i ) )

					const rel = []
					if ( attributes[ `link${ i }NewTab` ] ) {
						rel.push( 'noopener' )
						rel.push( 'noreferrer' )
					}
					if ( attributes[ `link${ i }NoFollow` ] ) {
						rel.push( 'nofollow' )
					}
					if ( attributes[ `link${ i }Sponsored` ] ) {
						rel.push( 'sponsored' )
					}
					if ( attributes[ `link${ i }Ugc` ] ) {
						rel.push( 'ugc' )
					}

					return (
						<div
							className={ itemClasses }
							key={ i }
						>
							{ attributes[ `image${ i }Url` ] &&
								<div className="lmb-image-box__box lmb-image-box__image-wrapper">
									<div className="lmb-image-box__box lmb-image-box__image" role={ ariaLabel ? 'img' : undefined } aria-label={ ariaLabel || undefined }></div>
								</div>
							}
							{ showOverlay &&
								<div className="lmb-image-box__box lmb-image-box__overlay"></div>
							}
							{ showOverlayHover &&
								<div className="lmb-image-box__box lmb-image-box__overlay-hover"></div>
							}
							<div className="lmb-image-box__content">
								{ ( showSubtitle || showTitle ) &&
									<div className="lmb-image-box__header">
										{ showSubtitle && ! RichText.isEmpty( subtitle ) &&
											<RichText.Content
												tagName="div"
												className="lmb-image-box__subtitle"
												value={ subtitle }
											/>
										}
										{ showTitle && ! RichText.isEmpty( title ) &&
											<RichText.Content
												tagName={ titleTag || 'h4' }
												className="lmb-image-box__title"
												value={ title }
											/>
										}
									</div>
								}
								{ showDescription && ! RichText.isEmpty( description ) &&
									<RichText.Content
										tagName="p"
										className="lmb-image-box__description"
										value={ description }
									/>
								}
							</div>
							{ showArrow &&
								<div className="lmb-image-box__arrow">
									<SVGArrow />
								</div>
							}
							{ attributes[ `link${ i }Url` ] &&
								<a // eslint-disable-line react/jsx-no-target-blank
									className="lmb-image-box__overlay-link"
									href={ attributes[ `link${ i }Url` ] }
									target={ attributes[ `link${ i }NewTab` ] ? '_blank' : undefined }
									rel={ rel.join( ' ' ) || undefined }
									title={ ariaLabel }
									aria-label={ ariaLabel }
								>{ null }</a>
							}
						</div>
					)
				} ) }
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
