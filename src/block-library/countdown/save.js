import { CountdownNumber } from './countdown-number'
import { Divider } from './divider'
import { getCountdownAlignment } from './edit'

import {
	BlockDiv,
	ContainerDiv,
	getResponsiveClasses,
	getTypographyClasses,
	Typography,
} from '~lumen/features'
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import { withVersion } from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'

const SECONDS = 1
const SECONDS_IN_MINUTE = SECONDS * 60
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24

export const Save = props => {
	const {
		className,
		attributes,
	} = props

	let duration = ''

	if ( attributes.countdownType === 'recurring' ) {
		// Convert into milli seconds
		duration =
			( attributes.daysLeft * SECONDS_IN_DAY ) +
			( attributes.hoursLeft * SECONDS_IN_HOUR ) +
			( attributes.minutesLeft * SECONDS_IN_MINUTE ) +
			( attributes.secondsLeft * SECONDS )
	}

	const responsiveClass = getResponsiveClasses( props.attributes )

	const digitTextClasses = getTypographyClasses( attributes, 'digit%s' )

	const labelTextClasses = getTypographyClasses( attributes, 'label%s' )

	const messageTextClasses = getTypographyClasses( attributes, 'message%s' )

	const blockClassNames = classnames( [
		className,
		'lmn-block-countdown',
		responsiveClass,
		getCountdownAlignment( attributes ),
	] )

	const contentClassNames = classnames( [
		'lmn-block-countdown__content-container',
	] )

	const dayDigitClassNames = classnames( [
		'lmn-block-countdown__digit',
		'lmn-block-countdown__digit-day',
		digitTextClasses,
	] )

	const hourDigitClassNames = classnames( [
		'lmn-block-countdown__digit',
		'lmn-block-countdown__digit-hour',
		digitTextClasses,
	] )

	const minuteDigitClassNames = classnames( [
		'lmn-block-countdown__digit',
		'lmn-block-countdown__digit-minute',
		digitTextClasses,
	] )

	const secondDigitClassNames = classnames( [
		'lmn-block-countdown__digit',
		'lmn-block-countdown__digit-second',
		digitTextClasses,
	] )

	const dayLabelClassNames = classnames( [
		'lmn-block-countdown__label-day',
		'lmn-block-countdown__label',
		labelTextClasses,
	] )

	const hourLabelClassNames = classnames( [
		'lmn-block-countdown__label-hour',
		'lmn-block-countdown__label',
		labelTextClasses,
	] )

	const minuteLabelClassNames = classnames( [
		'lmn-block-countdown__label-minute',
		'lmn-block-countdown__label',
		labelTextClasses,
	] )

	const secondLabelClassNames = classnames( [
		'lmn-block-countdown__label-second',
		'lmn-block-countdown__label',
		labelTextClasses,
	] )

	const messageClassNames = classnames( [
		'lmn-block-countdown__message',
		messageTextClasses,
	] )

	return (
		<BlockDiv.Content
			className={ blockClassNames }
			attributes={ attributes }
			data-lmn-countdown-date={ attributes.date }
			data-lmn-countdown-duration={ duration }
			data-lmn-countdown-restart-interval={ attributes.restartInterval }
			data-lmn-countdown-type={ attributes.countdownType }
			data-lmn-countdown-action={ attributes.actionOnExpiration }
			data-lmn-countdown-timezone={ attributes.timezone }
			data-lmn-countdown-is-double-digit={ attributes.isDoubleDigitHidden }
			version={ props.version }
			data-v={ props.attributes.version }
		>
			<div className="lmn-block-countdown__container">
				{ attributes.generatedCss && <style>{ attributes.generatedCss }</style> }
				{ attributes.dayShow &&
					<ContainerDiv.Content className={ contentClassNames } attributes={ attributes }>
						<div className="lmn-block-countdown__container-wrapper">
							<CountdownNumber.Content className={ dayDigitClassNames } />
							<Typography.Content
								className={ dayLabelClassNames }
								attrNameTemplate="day%s"
								attributes={ attributes }
							/>
						</div>
					</ContainerDiv.Content>
				}
				{ attributes.hasDivider && attributes.dayShow && <Divider.Content attributes={ attributes } /> }
				{ attributes.hourShow &&
					<ContainerDiv.Content className={ contentClassNames } attributes={ attributes }>
						<div className="lmn-block-countdown__container-wrapper">
							<CountdownNumber.Content className={ hourDigitClassNames } />
							<Typography.Content
								className={ hourLabelClassNames }
								attrNameTemplate="hour%s"
								attributes={ attributes }
							/>
						</div>
					</ContainerDiv.Content>
				}
				{ attributes.hasDivider && attributes.hourShow && <Divider.Content attributes={ attributes } /> }
				{ attributes.minuteShow &&
					<ContainerDiv.Content className={ contentClassNames } attributes={ attributes }>
						<div className="lmn-block-countdown__container-wrapper">
							<CountdownNumber.Content className={ minuteDigitClassNames } />
							<Typography.Content
								className={ minuteLabelClassNames }
								attrNameTemplate="minute%s"
								attributes={ attributes }
							/>
						</div>
					</ContainerDiv.Content>
				}
				{ attributes.hasDivider && attributes.minuteShow && attributes.secondShow && <Divider.Content attributes={ attributes } /> }
				{ attributes.secondShow &&
					<ContainerDiv.Content className={ contentClassNames } attributes={ attributes }>
						<div className="lmn-block-countdown__container-wrapper">
							<CountdownNumber.Content className={ secondDigitClassNames } />
							<Typography.Content
								className={ secondLabelClassNames }
								attrNameTemplate="second%s"
								attributes={ attributes }
							/>
						</div>
					</ContainerDiv.Content>
				}
			</div>
			{ attributes.actionOnExpiration === 'showMessage' &&
				<Typography.Content
					className={ messageClassNames }
					attrNameTemplate="message%s"
					attributes={ attributes }
				/>
			}
		</BlockDiv.Content>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )
