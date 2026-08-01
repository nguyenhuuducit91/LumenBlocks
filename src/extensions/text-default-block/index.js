import { setDefaultBlockName, getDefaultBlockName } from '@wordpress/blocks'
import { useEffect } from '@wordpress/element'

export const TextDefaultBlock = () => {
	// Set the default block to lumen/text
	useEffect( () => {
		if ( getDefaultBlockName() === 'lumen/text' ) {
			return null
		}
		setDefaultBlockName( 'lumen/text' )
	}, [] )

	return null
}
