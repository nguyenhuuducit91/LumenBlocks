/**
 * External dependencies
 */
import { i18n, wpGlobalStylesInlineCss } from 'lumen'

/**
 * Internal dependencies
 */
import { DUMMY_COLOR_SCHEMES } from './utils'
import {
	BlockStyles, Colors, ColorSchemes, Typography, WebPreview,
} from './components'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const StyleGuide = props => {
	const { designSystem = {}, contentRef = null } = props

	const {
		colors = [],
		colorSchemes = DUMMY_COLOR_SCHEMES,
		typography = {
			desktop: [], tablet: [], mobile: [],
		},
		allBlockStyles = [],
		designSystemStyles = '',
		previewClassNames = '',
	} = designSystem

	const src = typeof wpGlobalStylesInlineCss === 'string' ? wpGlobalStylesInlineCss : ''
	const THEME_STYLES = src.replaceAll( ':root', '&' ).replace( /[^\-](\bbody)/g, ( match, p1 ) => {
		return match.replace( p1, '.lmb-style-guide__preview-root' )
	} )

	return (
		<>
			<div className="lmb-style-guide">
				<div className="lmb-style-guide__content" ref={ contentRef }>
					<style>
						{ `.lmb-style-guide__preview{ ${ THEME_STYLES } }` }
					</style>
					<style>{ designSystemStyles }</style>
					<h1 className="lmb-style-guide__section-title lmb-style-guide__title">{ __( 'Colors', i18n ) }</h1>

					{ colorSchemes && <ColorSchemes colorSchemes={ colorSchemes } className={ previewClassNames } /> }

					{ !! colors.length && <Colors colors={ colors } /> }

					<Typography typography={ typography } />

					<BlockStyles allBlockStyles={ allBlockStyles } className={ previewClassNames } />

					<WebPreview className={ previewClassNames } />
				</div>
			</div>
		</>
	)
}

export default StyleGuide
