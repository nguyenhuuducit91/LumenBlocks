/**
 * Internal dependencies
 */
import createStyles from './style'
// import { showOptions } from './util'

/**
 * External dependencies
 */
import classnames from 'classnames'
import { BlockContainer } from '~lumen/ui'
import { DivBackground } from '../../components'
import { withBlockStyles, withUniqueClass } from '../../higher-order'

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
		design = 'plain',
		shadow = '',
		// contentWidth = 100,
		// restrictContentWidth = false,
		uniqueClass = '',
	} = props.attributes

	// const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		`lmb-column--design-${ design }`,
	], applyFilters( 'lumen.columns.mainclasses', {
	}, props ) )

	const itemClasses = classnames( [
		'lmb-column__item',
		`${ uniqueClass }-column-wrapper`,
	], applyFilters( 'lumen.column.itemclasses', {
		[ `lmb--shadow-${ shadow }` ]: shadow !== '',
	}, props ) )

	// const wrapperClasses = classnames( [
	// 	'lmb-container__wrapper',
	// 	`${ uniqueClass }-wrapper`,
	// ], applyFilters( 'lumen.container.wrapperClasses', {
	// 	[ `lmb--shadow-${ shadow }` ]: shadow !== '',
	// 	'lmb--restrict-content-width': show.restrictContent && restrictContentWidth,
	// }, props ) )

	// const contentWrapperClasses = classnames( [
	// 	'lmb-container__content-wrapper',
	// 	`${ uniqueClass }-content-wrapper`,
	// ], {
	// 	'lmb-content-wrapper': show.restrictContent && restrictContentWidth, // We need this for .lmb--restrict-content-width to work.
	// } )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ itemClasses }
					backgroundAttrName="column%s"
					blockProps={ props }
				>
					<div className="lmb-column__content-wrapper">
						<InnerBlocks.Content />
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
