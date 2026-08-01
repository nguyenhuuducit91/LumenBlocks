/**
 * TODO
 */

import { i18n } from 'lumen'
import { __, sprintf } from '@wordpress/i18n'
import {
	useState, useEffect, useRef,
} from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'
import { addQueryArgs } from '@wordpress/url'

const PostPickerItem = props => {
	return (
		<div className="lmb-post-picker-item">
			<span className="lmb-post-picker-item__label">{ props.value }</span>
			<a
				className="lmb-post-picker-item__view"
				href={ props.url }
				target="_pickerpreview"
			><span className="dashicons dashicons-external"></span></a>
			<button
				className="lmb-post-picker-item__remove button button-secondary button-small"
				onClick={ props.onRemove }
			>{ __( 'Remove', i18n ) }</button>
		</div>
	)
}

PostPickerItem.defaultProps = {
	value: '',
	url: '',
	onRemove: () => {},
}

const noTitlePost = postId => {
	return sprintf( __( '#%s (no title)', i18n ), postId )
}

const getName = ( {
	postId, title, postType,
} ) => {
	return `${ title || noTitlePost( postId ) } - ${ postType }`
}

const PostPickerControl = props => {
	const [ inputValue, setInputValue ] = useState( '' )
	const [ searchResults, setSearchResults ] = useState( [] )
	const [ focused, setFocused ] = useState( false )
	const controlRef = useRef()

	useEffect( () => {
		// if ( inputValue ) {
		searchPosts( inputValue )
		// }
	}, [ inputValue ] )

	useEffect( () => {
		document.body.addEventListener( 'mousedown', event => {
			if ( ! controlRef.current.contains( event.target ) ) {
				setFocused( false )
			}
		} )
	}, [] )

	const searchPosts = search => {
		const postIds = props.value.map( v => v.postId )
		// const results = [ { title: 'hello', postId: 9 }, { title: 'world', postId: 123 } ]
		apiFetch( {
			path: addQueryArgs( `/lumen/v2/editor_mode_get_all_posts`, {
				search,
			} ),
			method: 'GET',
		} )
			.then( results => {
				setSearchResults( results.filter( r => ! postIds.includes( r.postId ) ) )
			} )
	}

	const onRemove = postId => {
		props.onChange( props.value.filter( v => v.postId !== postId ) )
		searchPosts( inputValue )
	}

	const onSelect = post => {
		setSearchResults( searchResults.filter( r => post.postId !== r.postId ) )
		props.onChange( [
			...props.value,
			post,
		] )
		setFocused( true )
	}

	const id = props.label.replace( /[^\S]/g, '-' ).replace( /-{1,}/g, '-' )

	return (
		<div
			className="lmb-post-picker s-settings-field"
			id="lmb-post-picker"
		>
			<label className="s-text-field" htmlFor={ id }>
				<span className="s-settings-field__title">{ props.label }</span>
				<div className="lmb-post-picker-wrapper s-text-field">
					<div className="lmb-post-picker__input-wrapper" ref={ controlRef }>
						<input
							className=""
							type="text"
							id={ id }
							value={ inputValue }
							onChange={ event => setInputValue( event.target.value ) }
							onFocus={ () => {
								setFocused( true )
								searchPosts( inputValue )
							} }
							onKeyDown={ event => {
								if ( event.keyCode === 27 ) {
									setFocused( false )
								}
							} }
						/>
						{ ( focused && searchResults && searchResults.length )
							? <div className="lmb-post-picker__search-results-wrapper">
								{ searchResults.map( post => {
									const title = getName( post )
									const { postId } = post
									return (
										<button
											key={ postId }
											className="lmb-post-picker__search-result button button-large button-link"
											onClick={ () => onSelect( { ...post, title } ) }
										>
											{ title }
										</button>
									)
								} ) }
							</div>
							: null
						}
						{ ( focused && inputValue && ! searchResults.length ) &&
							<div className="lmb-post-picker__search-results-wrapper">
								<div className="lmb-post-picker__no-results">
									{ __( 'No posts found', i18n ) }
								</div>
							</div>
						}
					</div>
				</div>
			</label>
			<div className="lmb-post-picker__list">
				{ props.value.map( ( {
					title, postId, url,
				} ) => {
					return <PostPickerItem
						key={ postId }
						value={ title }
						url={ url }
						onRemove={ () => onRemove( postId ) }
					/>
				} ) }
			</div>
		</div>
	)
}

PostPickerControl.defaultProps = {
	className: '',
	label: __( 'Pick a post', i18n ),
	value: [],
	onChange: () => {},
	postType: 'all',
}

export default PostPickerControl
