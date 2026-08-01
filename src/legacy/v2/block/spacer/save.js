/**
 * External dependencies
 */
import { withBlockStyles, withUniqueClass } from '../../higher-order'
import { BlockContainer } from '~lumen/ui'
import { DivBackground } from '../../components'
import classnames from 'classnames'

/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

const save = props => {
	const mainClasses = classnames( [
		props.className,
		'lmb-spacer--v2',
	] )
	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<DivBackground
				className="lmb-spacer--inner"
				backgroundAttrName="%s"
				blockProps={ props }
			/>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
