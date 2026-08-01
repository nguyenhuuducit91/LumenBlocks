/**
 * Internal dependencies
 */
import { QUOTE_ICONS } from './quotes'

/**
 * External dependencies
 */
import { descriptionPlaceholder } from '~lumen/utils'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import classnames from 'classnames'

const deprecatedSave_1_17_3 = props => {
	const { className } = props
	const {
		color,
		text,
		quoteColor,
		backgroundColorType = '',
		backgroundColor,
		backgroundColor2,
		backgroundColorDirection = 0,
		backgroundType = '',
		backgroundImageURL,
		backgroundOpacity = 5,
		fixedBackground,
		quotationMark = 'round-thin',
		quotationSize = 70,
		align,
		contentWidth,
		design = 'plain',
		borderRadius = 12,
		shadow = 3,
	} = props.attributes

	const designHasBackground = [ 'basic', 'top-icon' ].includes( design )

	const mainClasses = classnames( [
		className,
		'lmb-blockquote',
		'lmb-blockquote--v2',
		'lmb--background-opacity-' + ( 1 * Math.round( backgroundOpacity / 1 ) ),
		`lmb-blockquote--design-${ design }`,
	], applyFilters( 'lumen.blockquote.mainclasses_1_17_3', {
		'lmb--has-background': designHasBackground && ( backgroundColor || backgroundImageURL ),
		'lmb--has-background-image': designHasBackground && backgroundImageURL,
		[ `lmb--shadow-${ shadow }` ]: designHasBackground && shadow !== 3,
		[ `lmb-content-width` ]: align === 'full' && contentWidth,
		'lmb-blockquote--small-quote': quotationSize < 60,
		[ `lmb--has-background-gradient` ]: backgroundColorType === 'gradient',
		[ `lmb--has-background-video` ]: backgroundType === 'video',
	}, design, props ) )

	const basicStyles = ! designHasBackground ? {} : {
		backgroundColor: backgroundColor ? backgroundColor : undefined,
		backgroundImage: backgroundImageURL ? `url(${ backgroundImageURL })` : undefined,
		backgroundAttachment: fixedBackground ? 'fixed' : undefined,
		'--lmb-background-color': backgroundImageURL || backgroundColorType === 'gradient' ? backgroundColor : undefined,
		'--lmb-background-color2': backgroundColorType === 'gradient' && backgroundColor2 ? backgroundColor2 : undefined,
		'--lmb-background-direction': backgroundColorType === 'gradient' ? `${ backgroundColorDirection }deg` : undefined,
		borderRadius: borderRadius !== 12 ? borderRadius : undefined,
	}

	const styles = applyFilters( 'lumen.blockquote.styles_1_17_3', {
		main: {
			'--quote-color': quoteColor ? quoteColor : undefined,
			...basicStyles,
		},
		text: {
			color,
		},
	}, design, props )

	return (
		<blockquote
			className={ mainClasses }
			style={ styles.main }>
			{ designHasBackground && backgroundType === 'video' && (
				<video
					className="lmb-video-background"
					autoPlay
					muted
					loop
					src={ backgroundImageURL }
				/>
			) }
			{ applyFilters( 'lumen.blockquote.save.output.before_1_17_3', null, design, props ) }
			<div className="lmb-content-wrapper">
				{ QUOTE_ICONS[ quotationMark ].iconFunc( {
					fill: quoteColor,
					width: quotationSize,
					height: quotationSize,
				} ) }
				{ applyFilters( 'lumen.blockquote.save.output_1_17_3',
					<RichText.Content
						tagName="p"
						className="lmb-blockquote__text"
						style={ styles.text }
						value={ text }
					/>,
					design, props
				) }
			</div>
			{ applyFilters( 'lumen.blockquote.save.output.after_1_17_3', null, design, props ) }
		</blockquote>
	)
}

const deprecatedSchema_1_17_3 = {
	align: {
		type: 'string',
	},
	text: {
		source: 'html',
		selector: 'p',
		default: descriptionPlaceholder( 'long' ),
	},
	color: {
		type: 'string',
		default: '',
	},
	quoteColor: {
		type: 'string',
		default: '',
	},
	backgroundColorType: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
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
	fixedBackground: {
		type: 'boolean',
		default: false,
	},
	contentWidth: {
		type: 'boolean',
		default: false,
	},
	quotationMark: {
		type: 'string',
		default: 'round-thin',
	},
	quotationSize: {
		type: 'number',
		default: 70,
	},
	design: {
		type: 'string',
		default: 'plain',
	},
	borderRadius: {
		type: 'number',
		default: 12,
	},
	shadow: {
		type: 'number',
		default: 3,
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
}

const deprecatedSave_1_13 = props => {
	const { className } = props
	const {
		color,
		text,
		quoteColor,
		backgroundColorType = '',
		backgroundColor,
		backgroundColor2,
		backgroundColorDirection = 0,
		backgroundType = '',
		backgroundImageURL,
		backgroundOpacity = 5,
		fixedBackground,
		quotationMark = 'round-thin',
		quotationSize = 70,
		align,
		contentWidth,
		design = 'plain',
		borderRadius = 12,
		shadow = 3,
	} = props.attributes

	const designHasBackground = [ 'basic', 'top-icon' ].includes( design )

	const mainClasses = classnames( [
		className,
		'lmb-blockquote',
		'lmb-blockquote--v2',
		'lmb--background-opacity-' + ( 1 * Math.round( backgroundOpacity / 1 ) ),
		`lmb-blockquote--design-${ design }`,
	], applyFilters( 'lumen.blockquote.mainclasses', {
		'lmb--has-background': designHasBackground && ( backgroundColor || backgroundImageURL ),
		'lmb--has-background-image': designHasBackground && backgroundImageURL,
		[ `lmb--shadow-${ shadow }` ]: designHasBackground && shadow !== 3,
		[ `lmb-content-width` ]: align === 'full' && contentWidth,
		'lmb-blockquote--small-quote': quotationSize < 60,
		[ `lmb--has-background-gradient` ]: backgroundColorType === 'gradient',
		[ `lmb--has-background-video` ]: backgroundType === 'video',
	}, design, props ) )

	const basicStyles = ! designHasBackground ? {} : {
		backgroundColor: backgroundColor ? backgroundColor : undefined,
		backgroundImage: backgroundImageURL ? `url(${ backgroundImageURL })` : undefined,
		backgroundAttachment: fixedBackground ? 'fixed' : undefined,
		'--lmb-background-color': backgroundImageURL || backgroundColorType === 'gradient' ? backgroundColor : undefined,
		'--lmb-background-color2': backgroundColorType === 'gradient' && backgroundColor2 ? backgroundColor2 : undefined,
		'--lmb-background-direction': backgroundColorType === 'gradient' ? `${ backgroundColorDirection }deg` : undefined,
		borderRadius: borderRadius !== 12 ? borderRadius : undefined,
	}

	const styles = applyFilters( 'lumen.blockquote.styles_1_17_3', {
		main: {
			'--quote-color': quoteColor ? quoteColor : undefined,
			...basicStyles,
		},
		text: {
			color,
		},
	}, design, props )

	return (
		<blockquote
			className={ mainClasses }
			style={ styles.main }>
			{ designHasBackground && backgroundType === 'video' && (
				<video
					className="lmb-video-background"
					autoPlay
					muted
					loop
					src={ backgroundImageURL }
				/>
			) }
			{ applyFilters( 'lumen.blockquote.save.output.before', null, design, props ) }
			<div className="lmb-content-wrapper">
				{ QUOTE_ICONS[ quotationMark ].iconFunc( {
					fill: quoteColor,
					width: quotationSize,
					height: quotationSize,
				} ) }
				{ applyFilters( 'lumen.blockquote.save.text',
					<RichText.Content
						tagName="p"
						className="lmb-blockquote__text"
						style={ styles.text }
						value={ text }
					/>,
					design, props
				) }
			</div>
			{ applyFilters( 'lumen.blockquote.save.output.after', null, design, props ) }
		</blockquote>
	)
}

const deprecatedSchema_1_13 = {
	align: {
		type: 'string',
	},
	text: {
		source: 'html',
		selector: 'p',
		default: descriptionPlaceholder( 'long' ),
	},
	color: {
		type: 'string',
		default: '',
	},
	quoteColor: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
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
	fixedBackground: {
		type: 'boolean',
		default: false,
	},
	contentWidth: {
		type: 'boolean',
		default: false,
	},
	quotationMark: {
		type: 'string',
		default: 'round-thin',
	},
	quotationSize: {
		type: 'number',
		default: 70,
	},
	design: {
		type: 'string',
		default: 'plain',
	},
	borderRadius: {
		type: 'number',
		default: 12,
	},
	shadow: {
		type: 'number',
		default: 3,
	},
}

const deprecated = [
	{
		attributes: deprecatedSchema_1_17_3,
		save: deprecatedSave_1_17_3,
		migrate: attributes => {
			// Update the custom CSS since the structure has changed.
			const updateCSS = css => {
				let newCss = ( css || '' )
					.replace( /\.lmb-content-wrapper/g, '.lmb-blockquote__item' )
					.replace( /svg(\s*\{)/g, '.lmb-blockquote__quote$1' )

				// For the basic design, the box is colored before by just the '.lmb-blockquote' selector.
				if ( attributes.design === 'basic' ) {
					newCss = newCss.replace( /\.lmb-blockquote(\s*\{)/g, '.lmb-blockquote__item$1' )
				}
				return newCss
			}

			return {
				...attributes,

				// Custom CSS.
				customCSS: updateCSS( attributes.customCSS ),
				customCSSCompiled: updateCSS( attributes.customCSSCompiled ),

				showQuote: true,
				quoteIcon: attributes.quotationMark,
				quoteSize: attributes.quotationSize,
				textColor: attributes.color ? attributes.color : ( attributes.backgroundColor ? '#000000' : undefined ),
				containerBackgroundColorType: attributes.backgroundColorType,
				containerBackgroundColor: attributes.backgroundColor,
				containerBackgroundColor2: attributes.backgroundColor2,
				containerBackgroundGradientDirection: attributes.backgroundColorDirection,
				containerBackgroundMediaId: attributes.backgroundImageID,
				containerBackgroundMediaUrl: attributes.backgroundImageURL,
				containerBackgroundTintStrength: attributes.backgroundOpacity,
				containerFixedBackground: attributes.fixedBackground,

				// Full-width support.
				design: attributes.design === 'basic' && attributes.align === 'full' ? 'plain' : attributes.design,
				showBlockBackground: attributes.design === 'basic' && attributes.align === 'full' ? true : undefined,
				blockInnerWidth: attributes.align !== 'full' ? undefined : ( attributes.design === 'basic' && attributes.contentWidth === true ? 'center' : 'full' ),
				blockBackgroundBackgroundColor: attributes.design === 'basic' && attributes.align === 'full' ? attributes.backgroundColor : undefined,

				// Full-width blocks before had 0 margin-top and margin-bottom.
				marginTop: attributes.align === 'full' ? 0 : undefined,
				marginBottom: attributes.align === 'full' ? 0 : undefined,
			}
		},
	},
	{ // This fixes the highlight design block error.
		attributes: deprecatedSchema_1_13,
		save: deprecatedSave_1_13,
	},
]

export default deprecated
