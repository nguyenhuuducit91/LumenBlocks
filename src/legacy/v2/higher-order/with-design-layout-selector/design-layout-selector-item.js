/**
 * External dependencies
 */
import {
	srcUrl, isPro, showProNotice,
} from 'lumen'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const DesignLayoutSelectorItem = ( {
	image,
	label,
	className,
	...otherProps
} ) => {
	const src = ! image ? ''
	            : image.match( /https?:/i ) ? image
	            : srcUrl ? `${ srcUrl }/${ image }`
	            : image

	const isLayoutPremium = otherProps.plan !== 'free'
	const isLocked = isLayoutPremium && ! isPro && showProNotice

	if ( isLayoutPremium && ! isPro && ! showProNotice ) {
		return null
	}

	const itemClassNames = classnames( [
		'lmb-design-layout-selector__item',
		className,
	], {
		'is-premium': otherProps.plan && ! isPro && otherProps.plan !== 'free',
		'is-locked': isLocked,
	} )

	const Tag = isLocked ? `div` : `button`

	return (
		<Tag
			className={ itemClassNames } { ...otherProps }
		>
			<div className="lmb-design-layout-selector__wrapper">
				{ isLocked &&
					<Icon className="lmb-design-layout-selector__lock" icon="lock" />
				}
				<img className="lmb-design-layout-selector__image" src={ src } alt={ label } />
			</div>
			<div className="lmb-design-layout-selector__label">{ label }</div>
		</Tag>
	)
}

DesignLayoutSelectorItem.defaultProps = {
	name: '',
	label: '',
	className: '',
}

export default DesignLayoutSelectorItem
