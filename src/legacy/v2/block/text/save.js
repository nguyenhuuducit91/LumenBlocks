/**
 * Internal dependencies
 */
import createStyles from './style'
import { showOptions } from './util'

/**
 * External dependencies
 */
import { BlockContainer } from '~lumen/ui'
import {
	withUniqueClass, withBlockStyles,
} from '../../higher-order'
import classnames from 'classnames'
import { range } from 'lodash'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import { compose } from '@wordpress/compose'

const save = props => {
	const { attributes, className } = props

	const {
		columns = 1,
		design = 'plain',
		reverseTitle = false,
		title = '',
		showTitle = false,
		titleTag = '',
		showSubtitle = false,
		subtitle = '',
		showColumnRule = false,
		subtitleOnTop = false,
	} = attributes

	const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		`lmb-text--design-${ design }`,
		`lmb-text--columns-${ columns }`,
	], applyFilters( 'lumen.text.mainclasses', {
		'lmb-text--reverse-title': show.reverseTitle && reverseTitle,
		'lmb-text--has-rule': showColumnRule,
		'lmb-text--subtitle-top': subtitleOnTop,
	}, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ ( ( showTitle && ! RichText.isEmpty( title ) ) || ( showSubtitle && ! RichText.isEmpty( subtitle ) ) ) &&
					<div className="lmb-text__title-wrapper">
						{ showTitle && ! RichText.isEmpty( title ) &&
							<RichText.Content
								tagName={ titleTag || 'h2' }
								className="lmb-text__title"
								value={ title }
							/>
						}
						{ showSubtitle && ! RichText.isEmpty( subtitle ) &&
							<RichText.Content
								tagName="p"
								className="lmb-text__subtitle"
								value={ subtitle }
							/>
						}
					</div>
				}
				<div className="lmb-text__text-wrapper">
					{ range( columns || 1 ).map( i => {
						const index = i + 1
						return (
							<Fragment key={ i }>
								<div className="lmb-text__text">
									<RichText.Content
										tagName="p"
										className={ `lmb-text__text-${ index }` }
										value={ attributes[ `text${ index }` ] }
									/>
								</div>
								{ showColumnRule && i !== columns - 1 &&
									<div className={ `lmb-text__rule lmb-text__rule-${ index }` } role="presentation" />
								}
							</Fragment>
						)
					} ) }
				</div>
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
