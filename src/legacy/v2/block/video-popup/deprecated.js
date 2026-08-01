/**
 * Internal dependencies
 */
import { getPlayButton as getPlayButton_1_15_6 } from './deprecated/util_1_15_6'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * External dependencies
 */
import classnames from 'classnames'

const deprecatedSave_1_15_6 = props => {
	const { className } = props
	const {
		videoID,
		playButtonType,
		playButtonColor = '#ffffff',
		backgroundImageURL,
		backgroundColorType = '',
		backgroundColor,
		backgroundColor2,
		backgroundColorDirection = 0,
		backgroundType = '',
		backgroundOpacity,
		design = 'basic',
		borderRadius = 12,
		shadow = 3,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-video-popup',
		'lmb-video-popup--v2',
		`lmb-video-popup--design-${ design }`,
		`lmb-video-popup--button-${ playButtonType }`,
		'lmb--background-opacity-' + ( 1 * Math.round( backgroundOpacity / 1 ) ),
	], applyFilters( 'lumen.video-popup.mainclasses_1_15_6', {
		'lmb--has-background': backgroundColor || backgroundImageURL,
		'lmb--has-background-image': backgroundImageURL,
		[ `lmb--shadow-${ shadow }` ]: design !== 'plain' && shadow !== 3,
		[ `lmb--has-background-gradient` ]: backgroundColorType === 'gradient',
		[ `lmb--has-background-video` ]: backgroundType === 'video',
	}, design, props ) )

	const mainStyle = {
		backgroundColor: backgroundColor ? backgroundColor : undefined,
		backgroundImage: backgroundImageURL ? `url(${ backgroundImageURL })` : undefined,
		'--lmb-background-color': backgroundImageURL || backgroundColorType === 'gradient' ? backgroundColor : undefined,
		'--lmb-background-color2': backgroundColorType === 'gradient' && backgroundColor2 ? backgroundColor2 : undefined,
		'--lmb-background-direction': backgroundColorType === 'gradient' ? `${ backgroundColorDirection }deg` : undefined,
		borderRadius: design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
	}

	return (
		<div className={ mainClasses } style={ mainStyle } data-video={ videoID }>
			{ backgroundType === 'video' && (
				<video
					className="lmb-video-background"
					autoPlay
					muted
					loop
					src={ backgroundImageURL }
				/>
			) }
			{ applyFilters( 'lumen.video-popup.save.output.before_1_15_6', null, design, props ) }
			<div className="lmb-video-popup__wrapper" >
				{ /* eslint-disable-next-line */ }
				<a href="#" className="lmb-video-popup__overlay" />
				<span className="lmb-video-popup__play-button">
					{ getPlayButton_1_15_6( playButtonType, playButtonColor ) }
				</span>
			</div>
		</div>
	)
}

const deprecatedSchema_1_15_6 = {
	videoLink: {
		type: 'string',
	},
	videoID: {
		type: 'string',
		source: 'attribute',
		selector: 'div',
		attribute: 'data-video',
	},
	playButtonType: {
		type: 'string',
		default: 'normal',
	},
	playButtonColor: {
		type: 'string',
		default: '#ffffff',
	},
	backgroundColorType: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
		default: '#000000',
	},
	backgroundColor2: {
		type: 'string',
		default: '',
	},
	backgroundColorDirection: {
		type: 'number',
		default: 0,
	},
	backgroundType: {
		type: 'string',
		default: '',
	},
	backgroundImageID: {
		type: 'number',
	},
	backgroundImageURL: {
		type: 'string',
	},
	backgroundOpacity: {
		type: 'number',
		default: 5,
	},
	align: {
		type: 'string',
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

	// Keep the old attributes. Gutenberg issue https://github.com/WordPress/gutenberg/issues/10406
	overlayColor: {
		type: 'string',
	},
	mediaLink: {
		type: 'string',
	},
	mediaID: {
		type: 'number',
	},
}

const deprecated = [
	{
		attributes: deprecatedSchema_1_15_6,
		save: deprecatedSave_1_15_6,
		migrate: attributes => {
			// Update the custom CSS since the structure has changed.
			const updateCSS = css => ( css || '' ).replace( /\.lmb-video-popup([\s\{\[\.\#\:])/g, '.lmb-video-popup__wrapper$1' )

			return {
				...attributes,
				previewBackgroundColorType: attributes.backgroundColorType,
				previewBackgroundColor: attributes.backgroundColor,
				previewBackgroundColor2: attributes.backgroundColor2,
				previewBackgroundGradientDirection: attributes.backgroundColorDirection,
				previewBackgroundMediaId: attributes.backgroundImageID,
				previewBackgroundMediaUrl: attributes.backgroundImageURL,
				previewBackgroundTintStrength: attributes.backgroundOpacity,
				customCSS: updateCSS( attributes.customCSS ),
				customCSSCompiled: updateCSS( attributes.customCSSCompiled ),

				// Full-width blocks before had 0 margin-top and margin-bottom.
				marginTop: attributes.align === 'full' ? 0 : undefined,
				marginBottom: attributes.align === 'full' ? 0 : undefined,
			}
		},
	},
]

export default deprecated
