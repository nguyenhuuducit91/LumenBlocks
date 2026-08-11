/**
 * Internal dependencies
 */
import {
	getMapStyles,
	getIconOptions,
	DEFAULT_ZOOM,
	DEFAULT_LOCATION,
	DEFAULT_ADDRESS,
} from './util'
import { withVersion } from '~lumen/hoc'
import {
	BlockDiv,
	getResponsiveClasses,
	getAlignmentClasses,
} from '~lumen/features'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n, version as VERSION } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { compose } from '@wordpress/compose'
import { RawHTML } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks'

export const Save = props => {
	const {
		attributes,
	} = props

	const {
		address,
		location,
		isDraggable,
		showFullScreenButton,
		showMapTypeButtons,
		showMarker,
		showStreetViewButton,
		showZoomButtons,
		usesApiKey,
		zoom,
	} = attributes

	const responsiveClass = getResponsiveClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )

	const blockClassNames = classnames( [
		props.className,
		'lmn-block-map',
		responsiveClass,
		blockAlignmentClass,
	], {
		'lmn--uses-api-key': usesApiKey,
	} )

	const styles = getMapStyles( attributes )
	const mapOptions = {
		center: location || DEFAULT_LOCATION,
		zoom: zoom || DEFAULT_ZOOM,
		styles: styles.length ? styles : undefined,
		gestureHandling: isDraggable ? undefined : 'none',
		fullscreenControl: showFullScreenButton,
		mapTypeControl: showMapTypeButtons,
		streetViewControl: showStreetViewButton,
		zoomControl: showZoomButtons,
	}

	const markerOptions = showMarker ? {
		position: location || DEFAULT_LOCATION,
		title: address || undefined,
	} : false

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			version={ props.version }
		>
			{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
			{ usesApiKey
				? (
					<div
						data-map-options={ JSON.stringify( mapOptions ) }
						data-marker-options={ JSON.stringify( markerOptions ) }
						data-icon-options={ JSON.stringify(
							applyFilters(
								'lumen.map.icon-options',
								getIconOptions( attributes ),
								attributes,
								props
							)
						) }
						className="lmn-block-map__canvas"
					/>
				)
				: <RawHTML>{
					`<iframe
						title="${ __( 'Embedded content from Google Maps Platform.', i18n ) }"
						src="https://maps.google.com/maps?q=${ address || DEFAULT_ADDRESS }&t=&z=${ zoom || DEFAULT_ZOOM }&ie=UTF8&output=embed"
						style="border:0;width:100%;max-width:none;max-height:none;height:100%;"
						aria-hidden="false"
						tabIndex="0"
						allowfullscreen
						loading="lazy"
						frameBorder="0"
					></iframe>`
				}</RawHTML>
			}

		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )

