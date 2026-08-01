/**
 * Internal dependencies
 */
import createStyles from './style'
import { showOptions } from './util'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { BlockContainer } from '~lumen/ui'
import { DivBackground } from '../../components'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { InnerBlocks } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { compose } from '@wordpress/compose'

const save = props => {
	const { className } = props
	const {
		design = '',
		shadow = '',
		restrictContentWidth = false,
		uniqueClass = '',
	} = props.attributes

	const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		'lmb-container--v2',
		`lmb-container--design-${ design }`,
	], applyFilters( 'lumen.container.mainclasses', {
	}, props ) )

	const wrapperClasses = classnames( [
		'lmb-container__wrapper',
		`${ uniqueClass }-wrapper`,
	], applyFilters( 'lumen.container.wrapperClasses', {
		[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
		'lmb--restrict-content-width': show.restrictContent && restrictContentWidth,
	}, props ) )

	const contentWrapperClasses = classnames( [
		'lmb-container__content-wrapper',
		`${ uniqueClass }-content-wrapper`,
	], applyFilters( 'lumen.container.itemclasses', {
		'lmb-content-wrapper': show.restrictContent && restrictContentWidth, // We need this for .lmb--restrict-content-width to work.
	}, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ wrapperClasses }
					backgroundAttrName="column%s"
					blockProps={ props }
					showBackground={ show.columnBackground }
				>
					{ applyFilters( 'lumen.container.save.wrapper.output', null, props ) }
					<div className="lmb-container__side">
						<div className={ contentWrapperClasses }>
							<InnerBlocks.Content />
						</div>
					</div>
				</DivBackground>
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
