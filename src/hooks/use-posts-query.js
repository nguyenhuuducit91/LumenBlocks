/**
 * External dependencies
 */
import {
	pickBy, isEmpty, isUndefined,
} from 'lodash'
/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@wordpress/api-fetch'
import { applyFilters } from '@wordpress/hooks'
import {
	useMemo, useState, useEffect,
} from '@wordpress/element'
import { useSelect } from '@wordpress/data'

/**
 * Reads a comma-separated list of post IDs.
 *
 * Anything that is not a number is dropped rather than passed on: `WP_Query`
 * would turn a stray word into `0` and quietly return nothing at all, which
 * looks like "there are no posts" rather than like a typo.
 *
 * @param {string} value What was typed.
 * @return {number[]|undefined} IDs, or undefined when there are none.
 */
const toIds = value => {
	const ids = String( value || '' )
		.split( ',' )
		.map( one => parseInt( one.trim(), 10 ) )
		.filter( one => ! isNaN( one ) && one > 0 )

	return ids.length ? ids : undefined
}

/**
 * Custom hook for getting posts
 *
 * @param {Object} attributes
 * @return {Array} posts
 */
export const usePostsQuery = attributes => {
	const {
		type,
		orderBy,
		order,
		taxonomyType,
		taxonomy,
		taxonomyFilterType,
		taxonomyTypeToDisplay,
		postOffset,
		postExclude,
		postInclude,
		numberOfItems = 6,
		excludeCurrentPost,
		excerptLength,
	} = attributes

	const [ isRequesting, setIsRequesting ] = useState( true )
	const [ posts, setPosts ] = useState( null )

	/*
	 * "Leave out the post being viewed" is resolved to an id here rather than
	 * sent as a flag: the REST endpoint hands its query parameters straight to
	 * WP_Query, which would silently ignore an argument it does not know.
	 */
	const currentPostId = useSelect( select => select( 'core/editor' )?.getCurrentPostId?.(), [] )

	const excluded = useMemo( () => {
		const ids = toIds( postExclude ) || []

		return excludeCurrentPost && currentPostId
			? [ ...new Set( [ ...ids, currentPostId ] ) ]
			: ( ids.length ? ids : undefined )
	}, [ postExclude, excludeCurrentPost, currentPostId ] )

	const postQuery = useMemo( () => {
		setIsRequesting( true )
		const postQuery = pickBy( {
			...applyFilters( 'lumen.posts.postQuery', {
				order,
				orderby: [ orderBy, 'ID' ].join( ' ' ),
				posts_per_page: numberOfItems, // eslint-disable-line camelcase
				max_excerpt: excerptLength, // eslint-disable-line camelcase
				taxonomy_type_to_display: taxonomyTypeToDisplay, // eslint-disable-line camelcase
				offset: postOffset,
				post__in: toIds( postInclude ), // eslint-disable-line camelcase
				post__not_in: excluded, // eslint-disable-line camelcase
			}, attributes ),
		}, value => {
			// Exludes and includes can be empty.
			if ( Array.isArray( value ) ) {
				return ! isEmpty( value )
			}
			// Don't include empty values.
			return ! isUndefined( value ) && value !== ''
		} )
		if ( taxonomy && taxonomyType ) {
			const _taxonomy = taxonomy.split( ',' ).map( s => parseInt( s, 10 ) ).filter( i => ! isNaN( i ) )
			// Categories.
			if ( taxonomyType === 'category' ) {
				postQuery[ taxonomyFilterType === '__in' ? 'category__in' : 'category__not_in' ] = _taxonomy
				// Tags.
			} else if ( taxonomyType === 'post_tag' ) {
				postQuery[ taxonomyFilterType === '__in' ? 'tag__in' : 'tag__not_in' ] = _taxonomy
				// Custom taxonomies.
			} else {
				postQuery.tax_query = [ { // eslint-disable-line camelcase
					taxonomy: taxonomyType,
					terms: _taxonomy,
					operator: taxonomyFilterType === '__in' ? 'IN' : 'NOT IN',
				} ]
			}
		}

		return postQuery
	}, [
		type,
		orderBy,
		order,
		taxonomyType,
		taxonomy,
		taxonomyFilterType,
		taxonomyTypeToDisplay,
		postOffset,
		excluded,
		postInclude,
		numberOfItems,
		excludeCurrentPost,
	] )

	useEffect( () => {
		apiFetch( {
			// eslint-disable-next-line camelcase
			path: addQueryArgs( `/lumen/v3/get_posts`, { post_type: type, ...postQuery } ),
			method: 'GET',
		} ).then( _posts => {
			setPosts( _posts )
			setIsRequesting( false )
		} )
	}, [ postQuery ] )

	return {
		posts,
		hasPosts: Array.isArray( posts ) && !! posts.length,
		isRequesting,
	}
}
