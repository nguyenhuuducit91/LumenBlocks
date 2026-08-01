/**
 * Internal dependencies
 */
import { createStyles } from './style'
import { showOptions } from './util'
import {
	SocialButtonEditHelper, DivBackground, Image,
} from '../../components'

/**
 * External dependencies
 */
import { BlockContainer } from '~lumen/ui'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import { SOCIAL_SITES } from '~lumen/utils'
import classnames from 'classnames'
import { range, upperFirst } from 'lodash'
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
		imageShape = '',
		imageShapeStretch = false,
		imageShadow = '',
		nameTag = 'h4',
		showImage = true,
		showName = true,
		showPosition = true,
		showDescription = true,
		showSocial = true,
		socialNewTab = false,
	} = attributes

	const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		'lmb-team-member--v3',
		`lmb-team-member--design-${ design }`,
		`lmb-team-member--columns-${ columns }`,
	], applyFilters( 'lumen.team-member.mainclasses', {
	}, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const imageUrl = attributes[ `image${ i }Url` ]
					const imageId = attributes[ `image${ i }Id` ]
					const imageAlt = attributes[ `image${ i }Alt` ]
					const name = attributes[ `name${ i }` ]
					const position = attributes[ `position${ i }` ]
					const description = attributes[ `description${ i }` ]

					const itemClasses = classnames( [
						'lmb-team-member__item',
						`lmb-team-member__item${ i }`,
					], applyFilters( 'lumen.team-member.itemclasses', {
						[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
					}, props ) )

					return (
						<DivBackground
							className={ itemClasses }
							backgroundAttrName="column%s"
							blockProps={ props }
							showBackground={ show.columnBackground }
							index={ i }
							key={ i }
						>
							{ showImage && ! show.imageAsBackground && imageUrl &&
								<div className="lmb-team-member__image">
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
							{ show.imageAsBackground &&
								<div className="lmb-team-member__image"></div>
							}
							<div className="lmb-team-member__content">
								{ ( ( showName && ! RichText.isEmpty( name ) ) || ( showPosition && ! RichText.isEmpty( position ) ) ) &&
									<div className="lmb-team-member__title">
										{ showName && ! RichText.isEmpty( name ) &&
											<RichText.Content
												tagName={ nameTag || 'h4' }
												className="lmb-team-member__name"
												value={ name }
											/>
										}
										{ showPosition && ! RichText.isEmpty( position ) &&
											<RichText.Content
												tagName="p"
												className="lmb-team-member__position"
												value={ position }
											/>
										}
									</div>
								}
								{ showDescription && ! RichText.isEmpty( description ) &&
									<RichText.Content
										tagName="p"
										className="lmb-team-member__description"
										value={ description }
									/>
								}
								{ showSocial && show.social &&
									<div className="lmb-team-member__buttons">
										<SocialButtonEditHelper.Content
											attrNameTemplate={ `social%s` }
											blockAttributes={ props.attributes }
											newTab={ socialNewTab }
											// Pass the show* props
											{ ...Object.keys( SOCIAL_SITES ).reduce( ( propsToPass, socialId ) => {
												return {
													...propsToPass,
													[ `${ socialId }Url` ]: props.attributes[ `social${ i }${ upperFirst( socialId ) }Url` ],
													[ `show${ upperFirst( socialId ) }` ]: props.attributes[ `show${ upperFirst( socialId ) }` ],
												}
											}, {} ) }
										/>
									</div>
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
