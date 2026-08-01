/**
 * Internal dependencies
 */
import { QUOTE_ICONS } from './quotes'
import createStyles from './style'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

/**
 * External dependencies
 */
import { BlockContainer } from '~lumen/ui'
import { DivBackground } from '../../components'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import classnames from 'classnames'

const save = props => {
	const { className } = props

	const {
		blockTag = '',
		design = 'plain',
		shadow = '',
		text = '',
		showQuote = true,
		quoteIcon = 'round-thin',
		quoteSize = 70,
	} = props.attributes

	const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		'lmb-blockquote--v3',
		`lmb-blockquote--design-${ design }`,
	], applyFilters( 'lumen.blockquote.mainclasses', {
		'lmb-blockquote--small-quote': quoteSize < 60,
	}, design, props ) )

	const itemClasses = classnames( [
		'lmb-blockquote__item',
	], applyFilters( 'lumen.blockquote.itemclasses', {
		[ `lmb--shadow-${ shadow }` ]: show.containerBackground && shadow !== '',
	}, props ) )

	return (
		<BlockContainer.Save blockTag={ blockTag || 'blockquote' } className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ itemClasses }
					backgroundAttrName="container%s"
					blockProps={ props }
					showBackground={ show.containerBackground }
				>
					{ showQuote && QUOTE_ICONS[ quoteIcon || 'round-thin' ].iconFunc( {}, {
						className: 'lmb-blockquote__quote',
						width: quoteSize,
						height: quoteSize,
					} ) }
					<div className="lmb-blockquote__content">
						<RichText.Content
							tagName="p"
							className="lmb-blockquote__text"
							value={ text }
						/>
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
