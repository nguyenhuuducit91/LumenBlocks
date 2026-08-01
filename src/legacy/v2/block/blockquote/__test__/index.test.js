/**
 * External dependencies
 */
import { blockAttributeTests } from '~lumen/test/shared'

/**
 * Internal dependencies
 */
import { settings } from '../'

describe( `${ settings.title } block`, () => {
	blockAttributeTests( { settings } )
} )
