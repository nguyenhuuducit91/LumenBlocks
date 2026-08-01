/**
 * External dependencies
 */
import striptags from 'striptags'
import { compact } from 'lodash'
import classnames from 'classnames'
import { i18n, version as VERSION } from 'lumen'
import {
	Image,
	ContainerDiv,
	Typography,
	getTypographyClasses,
} from '~lumen/features'
import { getBlockStyle } from '~lumen/hooks'
import { META_SEPARATORS } from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { dateI18n, format } from '@wordpress/date'
import { decodeEntities } from '@wordpress/html-entities'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'

/**
 * Internal dependencies
 */
import variations from './variations'

export const CONTENTS = [
	{
		label: __( 'Featured Image', i18n ),
		value: 'featured-image',
	},
	{
		label: __( 'Title', i18n ),
		value: 'title',
	},
	{
		label: __( 'Meta', i18n ),
		value: 'meta',
	},
	{
		label: __( 'Category', i18n ),
		value: 'category',
	},
	{
		label: __( 'Excerpt', i18n ),
		value: 'excerpt',
	},
	{
		label: __( 'Read More Button', i18n ),
		value: 'readmore',
	},
]

export const generateRenderPostItem = ( attributes, { isHovered } ) => {
	const {
		className = '',
		categoryHighlighted = false,
		imageSize,
		metaSeparator,
		excerptLength,
		authorShow = true,
		dateShow = true,
		commentsShow = true,
		imageShow = true,
		categoryShow = true,
		titleShow = true,
		metaShow = true,
		excerptShow = true,
		readmoreShow = true,
		contentOrder = [],
	} = attributes

	const style = getBlockStyle( variations, className )

	const itemClassNames = classnames( [
		'lmn-block-posts__item',
	] )

	const titleClassNames = classnames(
		'lmn-block-posts__title',
		getTypographyClasses( attributes, 'title%s' )
	)

	const categoryClassNames = classnames(
		'lmn-block-posts__category',
		'lmn-subtitle',
		getTypographyClasses( attributes, 'category%s' )
	)

	const excerptClassNames = classnames(
		'lmn-block-posts__excerpt',
		getTypographyClasses( attributes, 'excerpt%s' )
	)

	const metaClassNames = classnames(
		'lmn-block-posts__meta',
		'lmn-subtitle',
		getTypographyClasses( attributes, 'meta%s' )
	)

	const readmoreClassNames = classnames(
		'lmn-block-posts__readmore',
		getTypographyClasses( attributes, 'readmore%s' )
	)

	return ( post, idx ) => {
		const {
			featured_image_urls: featuredImageUrls,
			post_title: _title,
			category_list: categoryList,
			author_info: authorInfo,
			post_date_gmt: dateGmt,
			comments_num: commentsNum,
			post_excerpt_lumen: postExcerptLumen,
		} = post

		const featuredImgSrc = featuredImageUrls?.[ imageSize || 'full' ]?.[ 0 ]

		const enableHeight = ! [ 'portfolio', 'portfolio-2', 'horizontal', 'horizontal-2' ].includes( style?.name )
		const enableWidth = [ 'list', 'horizontal', 'horizontal-2' ].includes( style?.name )

		const featuredImage = !! featuredImgSrc && (
			<Image
				showTooltips={ isHovered }
				src={ featuredImgSrc }
				alt={ __( 'featured', i18n ) }
				hasRemove={ false }
				enableClickToEdit={ false }
				defaultWidth={ 100 }
				defaultHeight="auto"
				enableWidth={ enableWidth }
				widthResizePosition={ style?.name === 'horizontal'
					? 'left'
					: 'right' }
				enableDiagonal={ style?.name === 'list' }
				enableHeight={ enableHeight }
				hasTooltip={ enableHeight }
				heightResizePosition={ style?.name === 'vertical-card-2'
					? 'top'
					: 'bottom'
				}
				className="lmn-block-posts__image-link"
			/>
		)

		const title = (
			<Typography
				defaultTag="h3"
				attrNameTemplate="title%s"
				className={ titleClassNames }
				value={ decodeEntities( _title.trim() ) || __( '(Untitled)', i18n ) }
				editable={ false }
			/>
		)

		const category = categoryList && (
			<div className={ categoryClassNames }>
				{ categoryHighlighted ? (
					<a // eslint-disable-line jsx-a11y/anchor-is-valid
						href="#"
						className="lmn-button"
					>
						<Typography
							tagName="span"
							className="lmn-button__inner-text"
							attrNameTemplate="category%s"
							value={ striptags( categoryList ) }
							editable={ false }
						/>
					</a>
				) : (
					<Typography
						tagName="a"
						attrNameTemplate="category%s"
						value={ striptags( categoryList ) }
						editable={ false }
					/>
				) }
			</div>
		)

		const separator = <span className="lmn-block-posts__meta-sep">{ META_SEPARATORS[ metaSeparator || 'dot' ] }</span>
		const author = authorInfo?.name && <span>{ authorInfo.name }</span>
		const date = dateGmt && (
			<time dateTime={ format( 'c', dateGmt ) }>
				{ dateI18n( 'F d, Y', dateGmt ) }
			</time>
		)
		const comments = <span>{ commentsNum }</span>

		// Trim the excerpt.
		let excerptString = postExcerptLumen.split( ' ' )
		if ( excerptString.length > ( excerptLength || 55 ) ) {
			excerptString = excerptString.slice( 0, excerptLength || 55 ).join( ' ' ) + '...'
		} else {
			excerptString = post.post_excerpt_lumen
		}

		const excerpt = excerptString && (
			<div
				className={ excerptClassNames }
				dangerouslySetInnerHTML={ { __html: excerptString } }
			/>
		)

		const readmore = (
			<Typography
				identifier={ 'read-more-' + idx }
				tagName="a"
				attrNameTemplate="readmore%s"
				className={ readmoreClassNames }
				defaultValue={ __( 'Continue Reading', i18n ) }
			/>
		)

		const meta = ( authorShow || dateShow || commentsShow ) && (
			<div className={ metaClassNames }>
				{ authorShow && author }
				{ authorShow && author && ( ( dateShow && date ) || ( commentsShow && comments ) ) && separator }
				{ dateShow && date }
				{ ( ( authorShow && author ) || ( dateShow && date ) ) && commentsShow && comments && separator }
				{ commentsShow && comments }
			</div>
		)

		const contentFactory = {
			'featured-image': imageShow && featuredImage,
			title: titleShow && title,
			category: categoryShow && category,
			meta: metaShow && meta,
			excerpt: excerptShow && excerpt,
			readmore: readmoreShow && readmore,
		}

		const contents = contentOrder.map( key => {
			const comp = contentFactory[ key ]
			return comp
		} )

		let output = (
			<article>
				{ compact( contents ).map( ( content, i ) => <Fragment key={ i }>{ content }</Fragment> ) }
			</article>
		)

		output = applyFilters(
			'lumen.posts.edit.item.output',
			output,
			style?.name,
			attributes,
			{
				...contentFactory,
			}
		)

		return (
			<div className={ itemClassNames } key={ idx }>
				<ContainerDiv>
					{ output }
				</ContainerDiv>
			</div>
		)
	}
}

generateRenderPostItem.save = ( attributes, version = VERSION ) => {
	const {
		imageHasLink = true,
		className = '',
		authorShow = true,
		dateShow = true,
		commentsShow = true,
		imageShow = true,
		categoryShow = true,
		titleShow = true,
		metaShow = true,
		excerptShow = true,
		readmoreShow = true,
		contentOrder = [],
	} = attributes

	const style = getBlockStyle( variations, className )

	const itemClassNames = classnames( [
		'lmn-block-posts__item',
	] )

	const titleClassNames = classnames(
		'lmn-block-posts__title',
		getTypographyClasses( attributes, 'title%s' )
	)

	const categoryClassNames = classnames(
		'lmn-block-posts__category',
		'lmn-subtitle',
		getTypographyClasses( attributes, 'category%s' )
	)

	const excerptClassNames = classnames(
		'lmn-block-posts__excerpt',
		getTypographyClasses( attributes, 'excerpt%s' )
	)

	const metaClassNames = classnames(
		'lmn-block-posts__meta',
		'lmn-subtitle',
		getTypographyClasses( attributes, 'meta%s' )
	)

	const readmoreClassNames = classnames(
		'lmn-block-posts__readmore',
		getTypographyClasses( attributes, 'readmore%s' )
	)

	// attributes property was added after plugin version 3.6.3
	let featuredImage = <Image.Content attributes={ attributes } />
	featuredImage = applyFilters( 'lumen.posts.feature-image', featuredImage, version )

	if ( imageHasLink ) {
		featuredImage = <a href="!#postLink!#" className="lmn-block-posts__image-link">{ featuredImage }</a>
	}

	const title = (
		<Typography.Content
			defaultTag="h3"
			attrNameTemplate="title%s"
			className={ titleClassNames }
			value="<a href='!#postLink!#'>!#title!#</a>"
			attributes={ attributes }
			{ ...applyFilters( 'lumen.posts.title.typography-content', {}, version ) }
		/>
	)

	const category = (
		<Typography.Content
			tagName="div"
			attrNameTemplate="category%s"
			className={ categoryClassNames }
			value="!#category!#"
			attributes={ attributes }
			{ ...applyFilters( 'lumen.posts.title.category-content', {}, version ) }
		/>
	)

	const separator = <span className="lmn-block-posts__meta-sep">!#metaSeparator!#</span>
	const author = <span>!#authorName!#</span>
	const date = (
		<time dateTime="!#dateTime!#" >
			!#date!#
		</time>
	)
	const comments = <span>!#commentsNum!#</span>

	// Trim the excerpt.
	const excerpt = (
		<div
			className={ excerptClassNames }
			dangerouslySetInnerHTML={ { __html: '!#excerpt!#' } }
		/>
	)

	const readmore = (
		<Typography.Content
			tagName="a"
			href="!#postLink!#"
			attrNameTemplate="readmore%s"
			className={ readmoreClassNames }
			value="!#readmoreText!#"
			attributes={ attributes }
			{ ...applyFilters( 'lumen.posts.title.readmore-content', {}, version ) }
		/>
	)

	let meta = ( authorShow || dateShow || commentsShow ) && (
		<div className={ metaClassNames }>
			{ authorShow && author }
			{ authorShow && author && ( ( dateShow && date ) || ( commentsShow && comments ) ) && separator }
			{ dateShow && date }
			{ ( ( authorShow && author ) || ( dateShow && date ) ) && commentsShow && comments && separator }
			{ commentsShow && comments }
		</div>
	)
	meta = applyFilters( 'lumen.posts.meta', meta, {
		authorShow,
		dateShow,
		commentsShow,
		author,
		date,
		comments,
		separator,
		metaClassNames,
	}, version )

	const contentFactory = {
		'featured-image': imageShow && featuredImage,
		title: titleShow && title,
		category: categoryShow && category,
		meta: metaShow && meta,
		excerpt: excerptShow && excerpt,
		readmore: readmoreShow && readmore,
	}

	const contents = contentOrder.map( key => {
		const comp = contentFactory[ key ]
		return comp
	} )

	let output = (
		<article>
			{ compact( contents ).map( ( content, i ) => <Fragment key={ i }>{ content }</Fragment> ) }
		</article>
	)

	output = applyFilters(
		'lumen.posts.save.item.output',
		output,
		style?.name,
		attributes,
		{
			...contentFactory,
		}
	)

	return (
		<>
			{ '<!–- /lmn-start:posts/template –->' }
			<div className={ itemClassNames }>
				<ContainerDiv.Content attributes={ attributes }>
					{ output }
				</ContainerDiv.Content>
			</div>
			{ '<!–- /lmn-end:post/template –->' }
		</>
	)
}
