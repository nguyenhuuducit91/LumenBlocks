/**
 * External dependencies
 */
import classnames from 'classnames'
import {
	withBlockStyles, withUniqueClass,
} from '../../higher-order'
import {
	ButtonEdit, DivBackground, SvgIconHelper,
} from '../../components'
import {
	BlockContainer,
} from '~lumen/ui'

/**
 * Internal dependencies
 */
import createStyles from './style'
import SVGCloseIcon from './images/close-icon.svg'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'

const save = props => {
	const { className } = props

	const {
		design = 'basic',
		notifType,
		dismissible,
		shadow = '',

		// Icon.
		showIcon = false,
		icon = 'fas-exclamation-triangle',

		// Title.
		showTitle = true,
		titleTag = 'h5',
		title = '',

		// Description.
		showDescription = true,
		description = '',

		// Button.
		showButton = true,
		buttonSize = 'normal',
		buttonText = '',
		buttonShadow = 0,
		buttonHoverEffect = '',
		buttonIcon = '',
		buttonIconPosition = '',
		buttonDesign = 'plain',
		buttonHoverGhostToNormal = false,
		buttonNewTab = false,
		buttonUrl = '',
		buttonNoFollow = false,
		buttonSponsored = false,
		buttonUgc = false,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-notification--v2',
		`lmb-notification--design-${ design }`,
		`lmb-notification--type-${ notifType }`,
	], applyFilters( 'lumen.notification.mainclasses', {
		'lmb-notification--dismissible': dismissible,
	}, props ) )

	const itemClasses = classnames( [
		'lmb-notification__item',
		'lmb-notification--new-icon', // For backward compatibility < 2.6 for new icon.
	], applyFilters( 'lumen.notification.itemclasses', {
		[ `lmb--shadow-${ shadow }` ]: shadow !== '',
	}, props ) )

	const show = showOptions( props )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<DivBackground
					className={ itemClasses }
					backgroundAttrName="column%s"
					blockProps={ props }
					showBackground={ show.columnBackground }
				>
					{ dismissible && (
						<span
							className="lmb-notification__close-button"
							role="button"
							tabIndex="0"
						>
							<SVGCloseIcon />
						</span>
					) }
					{ showIcon &&
						<div className="lmb-notification__icon">
							<SvgIconHelper.Content
								attrNameTemplate="icon%s"
								blockAttributes={ props.attributes }
								value={ icon }
							/>
						</div>
					}
					{ showTitle && ! RichText.isEmpty( title ) &&
						<RichText.Content
							tagName={ titleTag || 'h5' }
							className="lmb-notification__title"
							value={ title }
						/>
					}
					{ showDescription && ! RichText.isEmpty( description ) &&
						<RichText.Content
							tagName="p"
							className="lmb-notification__description"
							value={ description }
						/>
					}
					{ showButton && ! RichText.isEmpty( buttonText ) &&
						<ButtonEdit.Content
							size={ buttonSize !== '' ? buttonSize : 'normal' }
							text={ buttonText }
							icon={ buttonIcon }
							newTab={ buttonNewTab !== '' && buttonNewTab }
							url={ buttonUrl }
							noFollow={ buttonNoFollow }
							sponsored={ buttonSponsored }
							ugc={ buttonUgc }
							hoverEffect={ buttonHoverEffect }
							ghostToNormalEffect={ buttonHoverGhostToNormal }
							shadow={ buttonShadow }
							iconPosition={ buttonIconPosition }
							design={ buttonDesign !== '' ? buttonDesign : 'ghost' }
						/>
					}
				</DivBackground>
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
