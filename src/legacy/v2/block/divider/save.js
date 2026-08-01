/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { BlockContainer } from '~lumen/ui'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { compose } from '@wordpress/compose'

const save = props => {
	const { className } = props
	const {
		design = 'basic',
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-divider--v2',
		`lmb-divider--design-${ design }`,
	], applyFilters( 'lumen.divider.mainclasses', {
	}, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<hr className="lmb-divider__hr" />
				{ ( design === 'dots' || design === 'asterisks' ) &&
					<div className="lmb-divider__dots" aria-hidden="true">
						<div className="lmb-divider__dot"></div>
						<div className="lmb-divider__dot"></div>
						<div className="lmb-divider__dot"></div>
					</div>
				}
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
