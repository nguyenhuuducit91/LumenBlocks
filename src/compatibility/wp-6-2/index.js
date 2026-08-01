
/**
 * Internal dependncies
 */
import { semverCompare } from '~lumen/utils'
import { wpVersion } from 'lumen'

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks'

addFilter( 'lumen.block.metadata', 'lumen/wp-6-2', settings => {
	if ( wpVersion && semverCompare( wpVersion, '<', '6.3' ) && settings?.supports?.spacing ) {
		delete settings.supports.spacing
	}
	return settings
} )
