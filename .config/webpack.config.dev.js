const { externals, lumenExternals } = require( './externals' )
const rules = require( './rules' )
const plugins = require( './plugins' )
const path = require( 'path' )

module.exports = [
/**
 * These entry is for scripts that compiles our libraries and modules into the
 * built script.
 */
{

    mode: 'development',

    devtool: 'cheap-module-source-map',

	entry: {
		// This is our main editor script that loads our modules into an api
		// window.lmn
		lmn: {
			import: path.resolve( __dirname, '../src/lmn.js' ),
			library: {
				name: 'lmn',
				type: 'window',
			},
		},
		// Admin settings script.
		'admin_welcome': path.resolve( __dirname, '../src/dashboard/admin.js' ),
		'frontend_blocks_deprecated_v2': {
			import: path.resolve( __dirname, '../src/legacy/v2/block-frontend.js' ),
			filename: 'deprecated/[name].js'
		},
    },

	output: {
		filename: '[name].js',
		chunkFilename: 'chunks/[name].[contenthash].js', // Output filename for dynamically imported chunks
    },

    // Externals are only WordPress loaded libraries.
    externals,

    // optimization: {
    //     splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /node_modules/,
	// 				chunks: "initial",
	// 				name: "editor_vendor",
	// 				priority: 10,
	// 				enforce: true
	// 			}
	// 		}
    //     },
    // },

    resolve: {
        alias: {
            '~lumen': path.resolve( __dirname, '../src/' )
        }
    },

    // Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
    },

	module: {
        strictExportPresence: true,
        rules,
	},

	plugins,
},

/**
 * This entry is for editor scripts that use our apis from window.lmn
 */
{

    mode: 'development',

    devtool: 'cheap-module-source-map',

	entry: {
		editor_blocks: {
			import: path.resolve( __dirname, '../src/blocks.js' ),
		},
        'editor_blocks_deprecated_v2': {
			import: path.resolve( __dirname, '../src/legacy/v2/blocks.js' ),
			filename: 'deprecated/[name].js'
		},
    },

	output: {
		filename: '[name].js',
    },

    // Use window.lmn as external imports.
	externals: {
		...externals,
		...lumenExternals,
	},

    // optimization: {
    //     splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /node_modules/,
	// 				chunks: "initial",
	// 				name: "editor_vendor",
	// 				priority: 10,
	// 				enforce: true
	// 			}
	// 		}
    //     },
    // },

	resolve: {
		alias: {
			// This is only used by deprecated v1 and v2 code, this normally
			// shouldn't be imported outside deprecated scripts.
			'~lumen/legacy': path.resolve( __dirname, '../src/legacy' ),
		},
	},

    // Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
    },

	module: {
        strictExportPresence: true,
        rules,
	},

	plugins,
},

/**
 * Frontend files are meant to be very lightweight, so no Babel, just make use
 * of eslint-plugin-compat to make sure that we only use JS functions that are
 * compatible with the browsers we support.
 */
{
    mode: 'development',

    devtool: 'cheap-module-source-map',

	target: [ 'web', 'es2017' ],

	entry: {
		'frontend_image_lightbox': path.resolve( __dirname, '../src/lightbox/frontend-image-lightbox.js' ),
		'frontend_blocks': path.resolve( __dirname, '../src/block-frontend.js' ),
		'frontend_block_accordion': path.resolve( __dirname, '../src/block-library/accordion/frontend-accordion.js' ),
		'frontend_block_accordion_polyfill': path.resolve( __dirname, '../src/block-library/accordion/frontend-accordion-polyfill.js' ),
		'frontend_block_carousel': path.resolve( __dirname, '../src/block-library/carousel/frontend-carousel.js' ),
		'frontend_block_count_up': path.resolve( __dirname, '../src/block-library/count-up/frontend-count-up.js' ),
		'frontend_block_countdown': path.resolve( __dirname, '../src/block-library/countdown/frontend-countdown.js' ),
		'frontend_block_expand': path.resolve( __dirname, '../src/block-library/expand/frontend-expand.js' ),
		'frontend_block_map': path.resolve( __dirname, '../src/block-library/map/frontend-map.js' ),
		'frontend_block_notification': path.resolve( __dirname, '../src/block-library/notification/frontend-notification.js' ),
		'frontend_block_video_popup': path.resolve( __dirname, '../src/block-library/video-popup/frontend-video-popup.js' ),
		'frontend_block_progress_circle': path.resolve( __dirname, '../src/block-library/progress-circle/frontend-progress-circle.js' ),
		'frontend_block_progress_bar': path.resolve( __dirname, '../src/block-library/progress-bar/frontend-progress-bar.js' ),
		'frontend_block_horizontal_scroller': path.resolve( __dirname, '../src/block-library/horizontal-scroller/frontend-horizontal-scroller.js' ),
		'frontend_block_tabs': path.resolve( __dirname, '../src/block-library/tabs/frontend-tabs.js' ),
		'frontend_image_optimizer_polyfill': path.resolve( __dirname, '../src/features/image/image-optimizer-polyfill.js' ),
		'frontend_motion_effects': path.resolve( __dirname, '../src/features/effects-animations/frontend.js' ),
	},

	output: {
		filename: '[name].js',
	    library: '[name]',  // it assigns this module to the global (window) object
    },

    // Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
    },
} ]
