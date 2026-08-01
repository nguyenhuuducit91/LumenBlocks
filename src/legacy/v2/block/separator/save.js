/**
 * External dependencies
 */
import { BlockContainer, Separator } from '~lumen/ui'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import classnames from 'classnames'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

const save = props => {
	const { className } = props

	const {
		design = 'wave-1',
		flipVertically = false,
		flipHorizontally = false,
		layer1Shadow = false,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-separator--v2',
		`lmb-separator--design-${ design }`,
	], applyFilters( 'lumen.separator.mainclasses', {
		'lmb-separator--flip-vertical': flipVertically,
		'lmb-separator--flip-horizontal': flipHorizontally,
	}, design, props ) )

	return (
		<BlockContainer.Save mainClass={ false } className={ mainClasses } aria-hidden="true" blockProps={ props } render={ () => (
			<Fragment>
				<div className="lmb-separator__top-pad" />
				<div className="lmb-separator__svg-wrapper">
					<Separator
						design={ design }
						shadow={ layer1Shadow }
						className="lmb-separator__svg-inner"
					>
						{ applyFilters( 'lumen.separator.edit.output.layers', null, design, props ) }
					</Separator>
				</div>
				<div className="lmb-separator__bottom-pad" />
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
