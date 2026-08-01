/**
 * Internal dependencies
 */
import { createStyles } from './style'
import { showOptions } from './util'

/**
 * External dependencies
 */
import {
	BlockContainer,
} from '~lumen/ui'
import { DivBackground, Image } from '../../components'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import classnames from 'classnames'
import { range } from 'lodash'
import striptags from 'striptags'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

const save = props => {
	const { className, attributes } = props
	const {
		columns = 2,
		design = 'basic',
		shadow = '',
		nameTag = 'h4',
		imageShadow = '',
		imageShape = 'circle',
		imageShapeStretch = false,
		showTestimonial = true,
		showImage = true,
		showName = true,
		showPosition = true,
	} = attributes

	const mainClasses = classnames( [
		className,
		'lmb-testimonial--v3',
		`lmb-testimonial--columns-${ columns }`,
		`lmb-testimonial--design-${ design }`,
	], applyFilters( 'lumen.testimonial.mainclasses', {
	}, props ) )

	const show = showOptions( props )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const imageUrl = attributes[ `image${ i }Url` ]
					const imageId = attributes[ `image${ i }Id` ]
					const imageAlt = attributes[ `image${ i }Alt` ]
					const name = attributes[ `name${ i }` ]
					const position = attributes[ `position${ i }` ]
					const testimonial = attributes[ `testimonial${ i }` ]

					const itemClasses = classnames( [
						'lmb-testimonial__item',
						`lmb-testimonial__item${ i }`,
					], applyFilters( 'lumen.testimonial.itemclasses', {
						[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
					}, props, i ) )

					const bodyWrapperClasses = classnames( [
						'lmb-testimonial__body-wrapper',
					], applyFilters( 'lumen.testimonial.bodywrapperclasses', {}, props, i ) )

					return (
						<DivBackground
							className={ itemClasses }
							backgroundAttrName="column%s"
							blockProps={ props }
							showBackground={ show.columnBackground }
							index={ i }
							key={ i }
						>
							<div className={ bodyWrapperClasses }>
								{ showTestimonial &&
									<RichText.Content
										tagName="p"
										className="lmb-testimonial__body"
										value={ testimonial }
									/>
								}
							</div>
							<div className="lmb-testimonial__person">
								{ ! show.imageAsBackground && showImage && imageUrl &&
									<div className="lmb-testimonial__image">
										<Image
											imageId={ imageId }
											src={ imageUrl }
											alt={ striptags( imageAlt || ( showName && name ) ) }
											shadow={ imageShadow }
											shape={ attributes[ `image${ i }Shape` ] || imageShape }
											shapeStretch={ attributes[ `image${ i }ShapeStretch` ] || imageShapeStretch }
										/>
									</div>
								}
								{ show.imageAsBackground && showImage && imageUrl &&
									<div className="lmb-testimonial__image"></div>
								}
								{ showName &&
									<RichText.Content
										tagName={ nameTag || 'h4' }
										className="lmb-testimonial__name"
										value={ name }
									/>
								}
								{ showPosition &&
									<RichText.Content
										tagName="p"
										className="lmb-testimonial__position"
										value={ position }
									/>
								}
							</div>
						</DivBackground>
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
