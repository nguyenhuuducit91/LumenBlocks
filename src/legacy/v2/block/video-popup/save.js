/**
 * External dependencies
 */
import { withBlockStyles, withUniqueClass } from '../../higher-order'
import { DivBackground } from '../../components'
import { BlockContainer } from '~lumen/ui'
import classnames from 'classnames'
import striptags from 'striptags'

/**
 * Internal dependencies
 */
import createStyles from './style'
import { getPlayButton } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

const save = props => {
	const { className } = props
	const {
		videoID,
		playButtonType,
		shadow = '',
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-video-popup--v3',
	], applyFilters( 'lumen.video-popup.mainclasses', {
	}, props ) )

	const boxClasses = classnames( [
		'lmb-video-popup__wrapper',
	], applyFilters( 'lumen.video-popup.boxclasses', {
		[ `lmb--shadow-${ shadow }` ]: shadow !== '',
	}, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ boxClasses }
					backgroundAttrName="preview%s"
					blockProps={ props }
					data-video={ striptags( videoID ) }
				>
					{ /* eslint-disable-next-line */ }
					<button className="lmb-video-popup__overlay" aria-label="Play">
						<span className="lmb-video-popup__play-button">
							{ getPlayButton( playButtonType ) }
						</span>
					</button>
				</DivBackground>
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
