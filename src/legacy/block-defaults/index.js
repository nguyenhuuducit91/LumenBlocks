import { settings as lumenSettings } from 'lumen'

// Conditionally import scripts
if ( lumenSettings.lumen_enable_block_defaults ) {
	// Use require instead of dynamic import to avoid code splitting
	require( './save-block' )
	require( './global-settings' )
}
