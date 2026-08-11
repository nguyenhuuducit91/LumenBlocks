import { __ } from '@wordpress/i18n'
import { i18n } from 'lumen'
import { TOUR_DEMO_IMAGE_URL } from '../demo-image'
import { dispatch, select } from '@wordpress/data'
import { createInterpolateElement } from '@wordpress/element'

export const blocks = {
	initialize: () => {
		// Add some default content that we will select

		const blockObject = wp.blocks.createBlock(
			'lumen/columns',
			{
				uniqueId: '1dbe04e',
				blockMargin: { bottom: '' },
				align: 'full',
			},
			[
				wp.blocks.createBlock(
					'lumen/column',
					{
						uniqueId: 'f957abc',
						hasContainer: true,
						columnSpacing: {
							top: '', right: '', bottom: '', left: '',
						},
					},
					[
						wp.blocks.createBlock(
							'lumen/heading',
							{
								uniqueId: 'a8ebea7',
								// Retain our text
								text: 'Explore the World with Us',
								textTag: 'h2',
							}
						),
						wp.blocks.createBlock(
							'lumen/text',
							{
								uniqueId: '57e76a1',
								// Retain our text
								text: 'Discover breathtaking destinations, plan your next adventure, and make unforgettable memories with our travel guides and tips.',
							}
						),
						wp.blocks.createBlock(
							'lumen/button-group',
							{ uniqueId: 'e063798' },
							[
								wp.blocks.createBlock(
									'lumen/button',
									{
										uniqueId: '5d04ca8',
										// Retain our text
										text: 'Start your journey',
										url: '',
									}
								),
							]
						),
					]
				),
				wp.blocks.createBlock(
					'lumen/column',
					{
						uniqueId: '3dcffca',
						hasContainer: true,
						containerBackgroundMediaExternalUrl: TOUR_DEMO_IMAGE_URL,
						containerHeight: '500',
					},
					[]
				),
			]
		)

		// Delete all blocks
		// const allBlocks = select( 'core/block-editor' ).getBlocks()
		// dispatch( 'core/block-editor' ).removeBlocks( allBlocks.map( block => block.clientId ) )

		// Insert our block
		dispatch( 'core/block-editor' ).insertBlocks( [ blockObject ], 0 )

		// Select the inner columns block for the tour
		dispatch( 'core/block-editor' ).selectBlock( blockObject.innerBlocks[ 0 ].clientId )
	},
	steps: [
		{
			title: '👋 ' + __( 'Welcome to Your Lumen Blocks', i18n ),
			description: __( 'This inspector is contains all the settings for this block, let\'s explore it!', i18n ),
			help: createInterpolateElement( __( 'If you\'re familiar with <strong>page builders</strong>, then you\'ll feel right at home.', i18n ), {
				strong: <strong />,
			} ),
			size: 'medium',
			anchor: '.lmb--has-panel-tabs',
			position: 'left',
			glowTarget: '.lmb--has-panel-tabs',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )
			},
		},
		{
			title: __( 'The Layout Tab', i18n ),
			description: __( 'Lumen blocks normally have 3 tabs, each with different settings. The Layout Tab contains layout-related options like flex controls, spacing and margins.', i18n ),
			help: createInterpolateElement( __( 'Open the <strong>Layout Tab</strong> to continue.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.edit-post-sidebar__panel-tab.lmb-tab--layout',
			position: 'left',
			glowTarget: '.edit-post-sidebar__panel-tab.lmb-tab--layout',
			nextEventTarget: '.edit-post-sidebar__panel-tab.lmb-tab--layout',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Make sure the Inner Column is selected.
				const block = select( 'core/block-editor' ).getSelectedBlock()
				if ( block?.name !== 'lumen/column' ) {
					// Look for the first "lumen/columns" block
					const allBlocks = select( 'core/block-editor' ).getBlocks()
					const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
					if ( columnsBlock ) {
						dispatch( 'core/block-editor' ).selectBlock( columnsBlock.innerBlocks[ 0 ].clientId )
					}
				}

				setTimeout( () => {
					// Click the tab
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--layout:not(.is-active)' )?.click()
				}, 100 )
			},
		},
		{
			title: __( 'Try Changing Alignments', i18n ),
			description: __( 'Let\'s try changing this option and see how it affects our block.', i18n ),
			help: createInterpolateElement( __( 'Pick <strong>Center or End</strong> Column Alignment to continue.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.lmb-column-align-control',
			position: 'left',
			glowTarget: '.lmb-column-align-control',
			nextEventTarget: '.lmb-column-align-control .lmn-control-content button',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Make sure the Inner Column is selected.
				const block = select( 'core/block-editor' ).getSelectedBlock()
				if ( block?.name !== 'lumen/column' ) {
					// Look for the first "lumen/columns" block
					const allBlocks = select( 'core/block-editor' ).getBlocks()
					const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
					if ( columnsBlock ) {
						dispatch( 'core/block-editor' ).selectBlock( columnsBlock.innerBlocks[ 0 ].clientId )
					}
				}

				setTimeout( () => {
					// Click the tab
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--layout:not(.is-active)' )?.click()
				}, 100 )

				setTimeout( () => {
					document.querySelector( '.lmb-panel--layout:not(.is-opened)' )?.click()
				}, 150 )
			},
		},
		{
			title: __( 'The Style Tab', i18n ),
			description: __( 'Let\'s try to add a background to the main Columns block. The Style Tab contains style-related options like backgrounds, color, borders and typography.', i18n ),
			help: createInterpolateElement( __( 'Click the <strong>Style Tab</strong> to continue.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.edit-post-sidebar__panel-tab.lmb-tab--style',
			position: 'left',
			glowTarget: '.edit-post-sidebar__panel-tab.lmb-tab--style',
			nextEventTarget: '.edit-post-sidebar__panel-tab.lmb-tab--style',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Look for the first "lumen/columns" block
				const allBlocks = select( 'core/block-editor' ).getBlocks()
				const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
				if ( columnsBlock ) {
					dispatch( 'core/block-editor' ).selectBlock( columnsBlock.clientId )
				}
			},
			postStep: () => {
				// Click the tab
				document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--style:not(.is-active)' )?.click()
			},
		},
		{
			title: __( 'Try Enabling Backgrounds', i18n ),
			description: __( 'Let\'s try turning on the background for our section and see how it affects our block.', i18n ),
			help: createInterpolateElement( __( 'Toggle ON the <strong>Background</strong> to continue.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.lmb-block-background-panel .components-panel__body-title',
			position: 'left',
			glowTarget: '.lmb-block-background-panel .components-panel__body-title',
			nextEventTarget: '.lmb-block-background-panel .components-panel__body-title input[type="checkbox"]',
			nextEvent: 'mousedown',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Look for the first "lumen/columns" block
				const allBlocks = select( 'core/block-editor' ).getBlocks()
				const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
				if ( columnsBlock ) {
					dispatch( 'core/block-editor' ).selectBlock( columnsBlock.clientId )
				}

				setTimeout( () => {
					// Click the tab
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--style:not(.is-active)' )?.click()
				}, 100 )
			},
			// postStep: () => {
			// 	setTimeout( () => {
			// 		const checkbox = document.querySelector( '.lmb-block-background-panel .components-panel__body-title input[type="checkbox"]' )
			// 		if ( checkbox && checkbox.value !== 'on' ) {
			// 			checkbox.click()
			// 		}
			// 	}, 100 )
			// },
		},
		{
			title: __( 'The Advanced Tab', i18n ),
			description: __( 'Lastly, the Advanced Tab contains all other options like z-index, transforms, conditional display and class names.', i18n ),
			help: createInterpolateElement( __( 'Click the <strong>Advanced Tab</strong> to continue.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.edit-post-sidebar__panel-tab.lmb-tab--advanced',
			position: 'left',
			glowTarget: '.edit-post-sidebar__panel-tab.lmb-tab--advanced',
			nextEventTarget: '.edit-post-sidebar__panel-tab.lmb-tab--advanced',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Look for the first "lumen/columns" block
				const allBlocks = select( 'core/block-editor' ).getBlocks()
				const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
				if ( columnsBlock ) {
					dispatch( 'core/block-editor' ).selectBlock( columnsBlock.clientId )
				}
			},
			postStep: () => {
				// Click the tab
				document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--advanced:not(.is-active)' )?.click()
			},
		},
		{
			title: __( 'Consistent Options Everywhere', i18n ),
			description: __( 'Once you get the hang of these settings, you\'ll spot them in almost every Lumen block. This makes it easy and familiar to build any design you want.', i18n ),
			anchor: '.lmb--has-panel-tabs',
			size: 'medium',
			position: 'left',
			preStep: () => {
				// Open the inspector sidebar
				dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' )

				// Look for the first "lumen/columns" block
				const allBlocks = select( 'core/block-editor' ).getBlocks()
				const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
				if ( columnsBlock ) {
					dispatch( 'core/block-editor' ).selectBlock( columnsBlock.clientId )
				}
			},
		},
		{
			title: __( 'One Last Thing…', i18n ),
			description: createInterpolateElement( __( 'You can also check the <strong>Lumen Design System</strong> to globally style all blocks. This saves a ton of time!', i18n ), {
				strong: <strong />,
			} ),
			anchor: '[aria-controls="lumen-global-settings:sidebar"]',
			position: 'left-top',
			offsetY: '-30px',
			offsetX: '-8px',
			glowTarget: '[aria-controls="lumen-global-settings:sidebar"]',
		},
	],
}
