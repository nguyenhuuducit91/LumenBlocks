/**
 * External dependencies
 */
import {
	BlockContainer,
} from '~lumen/ui'
import { ButtonEditHelper, DivBackground } from '../../components'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import classnames from 'classnames'

/**
 * Internal dependencies
 */
import createStyles from './style'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

const save = props => {
	const { className } = props
	const {
		restrictContentWidth = 'center',
		fullHeight = false,
		shadow = '',
		design = 'basic',
		titleTag = '',
		title,
		subtitle,
		showTitle = true,
		showSubtitle = true,
		showButton = true,
		showButton2 = false,
		buttonText = '',
		invert = false,
	} = props.attributes

	const show = showOptions( props )

	const mainClasses = classnames( [
		className,
		'lmb-header',
		'lmb-header--v3',
		[ `lmb-header--design-${ design }` ],
	], applyFilters( 'lumen.header.mainclasses', {
		'lmb--restrict-content-width': show.restrictContent && restrictContentWidth,
		'lmb-header--invert': invert,
	}, design, props ) )

	const itemClasses = classnames( [
		'lmb-header__item',
	], applyFilters( 'lumen.header.boxclasses', {
		'lmb--full-height': fullHeight,
		[ `lmb--shadow-${ shadow }` ]: show.columnBackground && shadow !== '',
	}, props ) )

	const titleComp = showTitle && ! RichText.isEmpty( title ) &&
		<RichText.Content
			tagName={ titleTag || 'h2' }
			className="lmb-header__title"
			value={ title }
		/>
	const subtitleComp = showSubtitle && ! RichText.isEmpty( subtitle ) &&
		<RichText.Content
			tagName="p"
			className="lmb-header__subtitle"
			value={ subtitle }
		/>
	const buttonComp = showButton && ! RichText.isEmpty( buttonText ) &&
		<ButtonEditHelper.Content
			className="lmb-button1"
			attrNameTemplate="button%s"
			blockAttributes={ props.attributes }
		/>
	const button2Comp = showButton2 && //! RichText.isEmpty( button2Text ) &&
		<ButtonEditHelper.Content
			className="lmb-button2"
			attrNameTemplate="button2%s"
			blockAttributes={ props.attributes }
		/>

	const comps = {
		titleComp,
		subtitleComp,
		buttonComp,
		button2Comp,
	}

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ itemClasses }
					backgroundAttrName="column%s"
					blockProps={ props }
					showBackground={ show.columnBackground }
				>
					<div className="lmb-content-wrapper">
						{ applyFilters( 'lumen.header.save.output', (
							<Fragment>
								{ showTitle && titleComp }
								{ showSubtitle && subtitleComp }
								{ ( showButton || showButton2 ) &&
									<div className="lmb-header__buttons">
										{ showButton && buttonComp }
										{ showButton2 && button2Comp }
									</div>
								}
							</Fragment>
						), design, props, comps ) }
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
