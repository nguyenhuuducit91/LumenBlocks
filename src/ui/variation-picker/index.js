/**
 * External dependencies
 */
import classnames from 'classnames'
import { i18n } from 'lumen'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Button, Placeholder } from '@wordpress/components'
import { layout } from '@wordpress/icons'

// Create our own variation picker
const VariationPicker = props => {
	const {
		icon = layout,
		label = __( 'Choose variation' ), // Dev note: no text domain here since this will use WP's translation.
		instructions = __( 'Select a variation to start with.', i18n ),
		variations,
		onSelect,
		allowSkip,
	} = props

	const classes = classnames( 'block-editor-block-variation-picker', {
		'has-many-variations': variations.length > 4,
	} )

	return (
		<div className="lmn-variation-picker">
			<Placeholder
				icon={ icon }
				label={ label }
				instructions={ instructions }
				className={ classes }
			>
				{	/* eslint-disable jsx-a11y/no-redundant-roles */ }
				<ul
					className="block-editor-block-variation-picker__variations"
					role="list"
					aria-label={ __( 'Block variations' ) } // Dev note: no text domain here since this will use WP's translation.
				>
					{ variations.map( variation => (
						<li key={ variation.name }>
							<Button
								variant="tertiary"
								icon={ variation.pickerIcon || variation.icon }
								iconSize={ 48 }
								onClick={ () => onSelect( variation ) }
								className="block-editor-block-variation-picker__variation"
								label={ variation.description || variation.pickerTitle || variation.title }
							/>
							<span
								className="block-editor-block-variation-picker__variation-label"
								role="presentation"
							>
								{ variation.pickerTitle || variation.title }
							</span>
						</li>
					) ) }
				</ul>
				{ /* eslint-enable jsx-a11y/no-redundant-roles */ }
				{ allowSkip && (
					<div className="block-editor-block-variation-picker__skip">
						<Button variant="link" onClick={ () => onSelect() }>
							{ __( 'Skip' ) /* Dev note: no text domain here since this will use WP's translation. */ }
						</Button>
					</div>
				) }
			</Placeholder>
		</div>
	)
}

export default VariationPicker
