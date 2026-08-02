/**
 * Gives every Lumen block the toolbar button that selects its parent.
 *
 * Applied through `lumen.registerBlockType.edit` rather than added to each
 * block's edit component: there are 48 of them, one would be missed, and the
 * button has nothing to do with what any individual block does.
 *
 * The fill itself renders nothing when the block is not selected — but the
 * ancestor lookup behind it runs for every mounted block, so the guard here
 * keeps it to the one block whose toolbar is actually on screen.
 */

/**
 * External dependencies
 */
import { FocusParentBlockToolbar } from '~lumen/ui'

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose'

const withFocusParentBlock = createHigherOrderComponent(
	WrappedComponent => props => {
		return (
			<>
				{ props.isSelected && <FocusParentBlockToolbar /> }
				<WrappedComponent { ...props } />
			</>
		)
	},
	'withFocusParentBlock'
)

export default withFocusParentBlock
