/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { InnerBlocks } from '@wordpress/block-editor'

const deprecatedSchema_1_17_3 = {
	textColor: {
		type: 'string',
	},
	contentAlign: {
		type: 'string',
		default: '',
	},
	backgroundColorType: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
		default: '#f1f1f1',
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
	height: {
		type: 'string',
		default: 'normal',
	},
	contentWidth: {
		type: 'boolean',
		default: false,
	},
	contentLocation: {
		type: 'string',
		default: 'full',
	},
	verticalAlign: {
		type: 'string',
		default: 'center',
	},
	borderRadius: {
		type: 'number',
		default: 12,
	},
	shadow: {
		type: 'number',
		default: 3,
	},
	align: {
		type: 'string',
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

const deprecatedSave_1_17_3 = props => {
	const {
		className,
	} = props

	const {
		contentAlign,
		textColor,
		backgroundColorType = '',
		backgroundColor,
		backgroundColor2,
		backgroundColorDirection = 0,
		backgroundType = '',
		backgroundImageURL,
		backgroundOpacity,
		fixedBackground,
		height,
		contentLocation,
		verticalAlign,
		contentWidth,
		borderRadius = 12,
		shadow = 3,
		design = '',
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-container',
		'lmb--background-opacity-' + ( 1 * Math.round( backgroundOpacity / 1 ) ),
	], applyFilters( 'lumen.container.mainclasses_1_17_3', {
		[ `lmb-container--content-${ contentAlign }` ]: contentAlign,
		'lmb--has-background': ( backgroundColor && backgroundColor !== 'transparent' ) || backgroundImageURL,
		'lmb--has-background-image': backgroundImageURL,
		[ `lmb-container--height-${ height }` ]: height,
		[ `lmb-container--align-horizontal-${ contentLocation }` ]: contentLocation,
		[ `lmb--content-width` ]: contentWidth,
		[ `lmb--shadow-${ shadow }` ]: shadow !== 3,
		[ `lmb--has-background-gradient` ]: backgroundColorType === 'gradient',
		[ `lmb--has-background-video` ]: backgroundType === 'video',
	}, design, props ) )

	const mainStyle = {
		'--lmb-text-color': textColor ? textColor : undefined,
		backgroundColor: backgroundColor ? backgroundColor : undefined,
		backgroundImage: backgroundImageURL ? `url(${ backgroundImageURL })` : undefined,
		backgroundAttachment: fixedBackground ? 'fixed' : undefined,
		'--lmb-background-color': backgroundImageURL || backgroundColorType === 'gradient' ? backgroundColor : undefined,
		'--lmb-background-color2': backgroundColorType === 'gradient' && backgroundColor2 ? backgroundColor2 : undefined,
		'--lmb-background-direction': backgroundColorType === 'gradient' ? `${ backgroundColorDirection }deg` : undefined,
		'justify-content': ( height === 'full' || height === 'half' ) && verticalAlign ? verticalAlign : undefined,
		borderRadius: borderRadius !== 12 ? borderRadius : undefined,
	}

	return (
		<div className={ mainClasses } style={ mainStyle }>
			{ backgroundType === 'video' && (
				<video
					className="lmb-video-background"
					autoPlay
					muted
					loop
					src={ backgroundImageURL }
				/>
			) }
			{ applyFilters( 'lumen.container.save.output.before_1_17_3', null, design, props ) }
			<div className="lmb-container__wrapper">
				<div className="lmb-container__content-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
			{ applyFilters( 'lumen.container.save.output.after_1_17_3', null, design, props ) }
		</div>
	)
}

const deprecated = [
	{
		attributes: deprecatedSchema_1_17_3,
		save: deprecatedSave_1_17_3,
		migrate: attributes => {
			// Update the custom CSS since the structure has changed.
			const updateCSS = css => ( css || '' ).replace( /\.lmb-container(\s*\{)/g, '.lmb-container__wrapper$1' )

			return {
				...attributes,

				// Custom CSS.
				customCSS: updateCSS( attributes.customCSS ),
				customCSSCompiled: updateCSS( attributes.customCSSCompiled ),

				design: 'basic',
				headingColor: attributes.textColor,
				bodyTextColor: attributes.textColor,
				linkColor: attributes.textColor,
				linkHoverColor: attributes.textColor,

				columnBackgroundColorType: attributes.backgroundColorType,
				columnBackgroundColor: attributes.backgroundColor,
				columnBackgroundColor2: attributes.backgroundColor2,
				columnBackgroundGradientDirection: attributes.backgroundColorDirection,
				columnBackgroundMediaId: attributes.backgroundImageID,
				columnBackgroundMediaUrl: attributes.backgroundImageURL,
				columnBackgroundTintStrength: attributes.backgroundOpacity,
				columnFixedBackground: attributes.fixedBackground,

				restrictContentWidth: attributes.contentWidth,

				contentWidth: [ 'left', 'center', 'right' ].includes( attributes.contentLocation ) ? 50 : 100,
				contentHorizontalAlign: attributes.contentLocation === 'left' ? 'flex-start' :
					attributes.contentLocation === 'center' ? 'center' :
						attributes.contentLocation === 'right' ? 'flex-end' :
							undefined,

				contentVerticalAlign: attributes.verticalAlign,

				// Full-width blocks before had 0 margin-top and margin-bottom.
				marginTop: attributes.align === 'full' ? 0 : undefined,
				marginBottom: attributes.align === 'full' ? 0 : undefined,
			}
		},
	},
]

export default deprecated
