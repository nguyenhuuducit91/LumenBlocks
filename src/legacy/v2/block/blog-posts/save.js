/**
 * External dependencies
 */
import { BlockContainer } from '~lumen/ui'
import { ButtonEditHelper } from '../../components'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import classnames from 'classnames'

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

const save = props => {
	const { className, attributes } = props
	const {
		uniqueClass = '',
		columns = 2,
		design = 'basic',
		categoryHighlighted = false,
		columnBackgroundColor = '',
		columnBackgroundColor2 = '',
		showLoadMoreButton = false,
		loadMoreItems = '',
	} = attributes

	const mainClasses = classnames( [
		className,
		'lmb-blog-posts--v2',
		`lmb-blog-posts--design-${ design }`,
		`lmb-blog-posts--columns-${ columns }`,
	], applyFilters( 'lumen.blog-posts.mainclasses', {
		'lmb-blog-posts--cat-highlighted': categoryHighlighted,
		'lmb-blog-posts--has-bg-color': columnBackgroundColor || columnBackgroundColor2,
	}, props ) )

	const propsToPass = {}
	if ( showLoadMoreButton ) {
		propsToPass[ 'data-load-items' ] = loadMoreItems
		propsToPass[ 'data-id' ] = uniqueClass
	}

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } { ...propsToPass } render={ () => {
			return (
				<Fragment>
					{ showLoadMoreButton && (
						<ButtonEditHelper.Content
							containerClassName="lmb-blog-posts__load-more-button"
							attrNameTemplate={ `loadMoreButton%s` }
							blockAttributes={ props.attributes }
							url="#0"
							role="button"
						/>
					) }
				</Fragment>
			)
		} } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
