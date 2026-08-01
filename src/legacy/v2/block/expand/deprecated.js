/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { RichText } from '@wordpress/block-editor'

const deprecatedSchema_1_17_3 = {
	text: {
		source: 'html',
		selector: '.lmb-expand__less-text',
		multiline: 'p',
		default: '',
	},
	moreText: {
		source: 'html',
		selector: '.lmb-expand__more-text',
		multiline: 'p',
		default: '',
	},
	moreLabel: {
		source: 'html',
		selector: '.lmb-expand__more-toggle-text',
		default: __( 'Show more', i18n ),
	},
	lessLabel: {
		source: 'html',
		selector: '.lmb-expand__less-toggle-text',
		default: __( 'Show less', i18n ),
	},

	// Custom CSS attributes.
	customCSSUniqueID: {
		type: 'string',
		default: '',
	},
	customCSS: {
		type: 'string',
		default: '',
	},
	customCSSCompiled: {
		type: 'string',
		default: '',
	},
}

const deprecatedSave_1_17_3 = props => {
	const { className } = props
	const {
		text,
		moreLabel,
		moreText,
		lessLabel,
		design = '',
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'lmb-expand',
	], applyFilters( 'lumen.expand.mainclasses_1_17_3', {}, design, props ) )

	return (
		<div className={ mainClasses } aria-expanded="false">
			{ applyFilters( 'lumen.expand.save.output.before_1_17_3', null, design, props ) }
			<div className="lmb-expand__less-text">
				{ ! RichText.isEmpty( text ) && (
					<RichText.Content
						multiline="p"
						value={ text }
					/>
				) }
			</div>
			<div className="lmb-expand__more-text" style={ { display: 'none' } }>
				{ ! RichText.isEmpty( moreText ) && (
					<RichText.Content
						multiline="p"
						value={ moreText }
					/>
				) }
			</div>
			{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
			<a className="lmb-expand__toggle" href="#">
				<RichText.Content
					className="lmb-expand__more-toggle-text"
					tagName="span"
					value={ moreLabel }
				/>
				<RichText.Content
					className="lmb-expand__less-toggle-text"
					tagName="span"
					value={ lessLabel }
					style={ { display: 'none' } }
				/>
			</a>
			{ applyFilters( 'lumen.expand.save.output.after_1_17_3', null, design, props ) }
		</div>
	)
}

const deprecated = [
	{
		attributes: deprecatedSchema_1_17_3,
		save: deprecatedSave_1_17_3,
		migrate: attributes => {
			return {
				...attributes,
				showTitle: false,
			}
		},
	},
]

export default deprecated
