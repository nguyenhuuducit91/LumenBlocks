import { i18n } from 'lumen'
import { Button, Placeholder } from '@wordpress/components'
import { useBlockEditContext } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { SVGLumenIcon } from '~lumen/icons'
import { insertColumnBlock } from '../column-inserter'
import { __ } from '@wordpress/i18n'

const GroupPlaceholder = props => {
	const {
		blockName: blockNameToAdd = 'lumen/column',
		attributes,
	} = props
	const { clientId, name: blockName } = useBlockEditContext()
	const { blockTitle } = useSelect( select => {
		return {
			blockTitle: select( 'core/blocks' ).getBlockType( blockName )?.title,
		}
	}, [ blockName ] )

	return (
		<Placeholder
			icon={ <SVGLumenIcon /> }
			label={ blockTitle }
			instructions={ __( 'There are no blocks in this group, please add one.', i18n ) }
		>
			<Button
				isSecondary
				className="lmb-design-library-block__button"
				onClick={ () => {
					insertColumnBlock( clientId, blockNameToAdd, attributes )
				} }
			>{ __( 'Add Block', i18n ) }</Button>
		</Placeholder>
	)
}

export default GroupPlaceholder
