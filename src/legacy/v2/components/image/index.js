/**
 * External dependencies
 */
import classnames from 'classnames'
import striptags from 'striptags'

const Image = props => {
	const imageClasses = classnames( [
		props.className,
		'lmb-img',
	], {
		// Responsive.
		[ `wp-image-${ props.imageId }` ]: props.imageId,

		// Shape.
		'lmb-img--shape': props.shape,

		// Firefox doesn't do stretching via SVG attribute and needs to be done via CSS.
		'lmb-image--shape-stretch': props.shapeStretch,

		// Shadow is only available when there is no shape.
		[ `lmb--shadow-${ props.shadow }` ]: ! props.shape && props.shadow,
	} )

	return (
		<img
			className={ imageClasses }
			src={ props.src || undefined }
			alt={ striptags( props.alt || undefined ) }
			title={ striptags( props.title || undefined ) }
			width={ props.width || undefined }
			height={ props.height || undefined }
		/>
	)
}

Image.defaultProps = {
	imageId: '',

	alt: '',
	title: '',
	src: '',
	size: 'full',

	width: '',
	height: '',

	shape: '',
	shapeStretch: false,
	shadow: '',
}

export default Image
