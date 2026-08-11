import { DEFAULT_PROGRESS } from './schema'

import {
	BlockDiv,
	Typography,
	getResponsiveClasses,
	getTypographyClasses,
	getAlignmentClasses,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import { withVersion } from '~lumen/hoc'
import classnames from 'classnames'
import striptags from 'striptags'

import { compose } from '@wordpress/compose'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const { className, attributes } = props
	const responsiveClass = getResponsiveClasses( attributes )
	const blockAlignmentClass = getAlignmentClasses( attributes )
	const textClasses = getTypographyClasses( attributes )

	const blockClassNames = classnames( [
		className,
		'lmn-block-progress-bar',
		responsiveClass,
	] )

	const containerClassNames = classnames( [
		'lmn-block-progress-bar__container',
		blockAlignmentClass,
	] )

	const textClassNames = classnames( [
		'lmn-progress-bar__inner-text',
		textClasses,
	] )

	const divClassNames = classnames( [
		'lmn-progress-bar',
		{
			'lmn--with-animation': attributes.progressAnimate,
		},
	] )

	const barClassNames = classnames( 'lmn-progress-bar__bar', {
		'lmn--has-background-overlay': attributes.progressColorType === 'gradient' && attributes.progressColor2,
	} )

	// Check if progressValue is an int/float/empty, if NaN, assume its dynamic content
	let progressValue = attributes.progressValue
	if ( attributes.progressValue === '' ) {
		progressValue = DEFAULT_PROGRESS
	} else if ( attributes.progressValue?.match( /^[\d.]+$/ ) ) {
		progressValue = parseFloat( progressValue )
	}

	const derivedValue = `${ attributes.progressValuePrefix }${ progressValue }${ attributes.progressValueSuffix }`.trim()
	const derivedAriaValue = attributes.showText ? attributes.progressAriaValueText || attributes.text : undefined

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			<div className={ containerClassNames }>
				<div
					className={ divClassNames }
					role="progressbar"
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuenow={ progressValue }
					aria-valuetext={ derivedAriaValue ? striptags( derivedAriaValue ) : undefined }
					aria-label={ derivedAriaValue ? striptags( derivedAriaValue ) : undefined }
					{ ...applyFilters( 'lumen.progress-bar.div-props', {}, props ) }
				>
					<div className={ barClassNames }>
						{ attributes.showText && (
							<>
								<Typography.Content
									tagName="span"
									className={ classnames( [ textClassNames, 'lmn-progress-bar__text' ] ) }
									value={ attributes.text }
								/>
								<Typography.Content
									tagName="span"
									className={ classnames( [ textClassNames, 'lmn-progress-bar__progress-value-text' ] ) }
									value={ derivedValue }
								/>
							</>
						) }
					</div>
				</div>
			</div>
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
