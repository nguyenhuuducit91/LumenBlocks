import { __ } from '@wordpress/i18n'
import { i18n } from 'lumen'
import { dispatch, select } from '@wordpress/data'
import { createInterpolateElement } from '@wordpress/element'
import { waitForElement } from '../utils'

export const blockBackgrounds = {
	initialize: () => {
		// Add some default content that we will select

		const blockObject = wp.blocks.createBlock(
			'lumen/columns',
			{
				uniqueId: '1dbe04e',
				blockMargin: { bottom: '' },
				align: 'full',
				containerWidth: 50,
				containerHorizontalAlign: 'flex-start',
				containerWidthUnit: '%',
			},
			[
				wp.blocks.createBlock(
					'lumen/column',
					{
						uniqueId: 'f957abc',
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
			]
		)
		// Insert our block
		dispatch( 'core/block-editor' ).insertBlocks( [ blockObject ], 0 )

		// Select the inner columns block for the tour
		dispatch( 'core/block-editor' ).selectBlock( blockObject.clientId )
	},
	steps: [
		{
			title: __( 'Discover Lumen Block Backgrounds & Containers', i18n ),
			description: __( 'Welcome! Let\'s enhance your page by first adding a background to the Columns block. The Style Tab lets you tweak backgrounds, colors, borders, and typography for a custom look.', i18n ),
			help: createInterpolateElement( __( 'Click the <strong>Style Tab</strong> in the sidebar to get started.', i18n ), {
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
				setTimeout( () => {
					// Click the tab
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--style:not(.is-active)' )?.click()
				}, 100 )
			},
		},
		{
			title: __( 'Enable a Block Background', i18n ),
			description: __( 'Turn on the background option to instantly add a background layer to your section. Watch as your design transforms with a single toggle.', i18n ),
			help: createInterpolateElement( __( 'Toggle ON the <strong>Background</strong> option to continue.', i18n ), {
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

				waitForElement( '.edit-post-sidebar__panel-tab.lmb-tab--style' ).then( () => {
					// Click the tab
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--style:not(.is-active)' )?.click()
				} )
			},
		},
		{
			title: __( 'Customize the Background Color', i18n ),
			description: __( 'Now let\'s personalize your section. Choose a background color to help your content stand out or integrate it seamlessly into your page design.', i18n ),
			help: createInterpolateElement( __( 'Open the <strong>Background Color</strong> panel to select a color.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.lmn-color-palette-control',
			position: 'left',
			glowTarget: '.lmb-block-background-panel .block-editor-panel-color-gradient-settings__dropdown',
			nextEventTarget: '.lmb-block-background-panel .block-editor-panel-color-gradient-settings__dropdown',
			nextEvent: 'mousedown',
			preStep: () => {
				// Toggle background on
				document.querySelector( '.lmb-block-background-panel:not(.is-opened) button' )?.click()
				document.querySelector( '.lmb-block-background-panel .lmb-toggle-panel-form-toggle:not(.is-checked) input' )?.click()
			},
			postStep: () => {
				setTimeout( () => {
					// Click the tab
					document.querySelector( '.lmb-block-background-panel .lmn-color-palette-control .block-editor-panel-color-gradient-settings__dropdown:not(.is-open)' )?.click()
				}, 100 )
			},
		},
		{
			title: __( 'Pick Your Brand Color', i18n ),
			description: __( 'Select a color that matches your brand or mood. Try out different colors and instantly see the changes on your block.', i18n ),
			help: createInterpolateElement( __( 'Choose a <strong>Color</strong> from the palette to apply it, click next when done.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.components-popover__content:has(.lmn-color-palette-control__popover-content)',
			position: 'left',
			glowTarget: '.components-popover__content:has(.lmn-color-palette-control__popover-content)',
			// nextEvent: 'mousedown',
			// nextEventTarget: '.lmn-color-palette-control__popover-content *',
			postStep: () => {
				setTimeout( () => {
					// Click the color picker
					document.querySelector( '.lmb-block-background-panel .lmn-color-palette-control .block-editor-panel-color-gradient-settings__dropdown.is-open' )?.click()
				}, 100 )
			},
		},
		{
			title: __( 'Add a Container for Better Layout', i18n ),
			description: __( 'Turn on the Container option to give your columns content a background, padding, and improved alignment for a polished look.', i18n ),
			help: createInterpolateElement( __( 'Toggle ON the <strong>Container</strong> to proceed.', i18n ), {
				strong: <strong />,
			} ),
			anchor: '.lmb-panel--container-size .components-panel__body-title',
			position: 'left',
			glowTarget: '.lmb-panel--container-size .components-panel__body-title',
			nextEventTarget: '.lmb-panel--container-size .components-panel__body-title input[type="checkbox"]',
			nextEvent: 'mousedown',
			preStep: () => {
				// Click the tab
				document.querySelector( '.lmb-block-background-panel .lmn-color-palette-control .block-editor-panel-color-gradient-settings__dropdown.is-open' )?.click()

				const allBlocks = select( 'core/block-editor' ).getBlocks()
				const columnsBlock = allBlocks.find( block => block.name === 'lumen/columns' )
				if ( columnsBlock && columnsBlock.innerBlocks[ 0 ] ) {
					dispatch( 'core/block-editor' ).selectBlock( columnsBlock.innerBlocks[ 0 ].clientId )
					document.querySelector( '.edit-post-sidebar__panel-tab.lmb-tab--layout:not(.is-active)' )?.click()
					waitForElement( '.lmb-panel--layout.is-opened .components-panel__body-title button' ).then( () => {
						document.querySelector( '.lmb-panel--layout.is-opened .components-panel__body-title button' )?.click()
					} )
				}
			},
		},
		{
			title: __( 'Block Backgrounds & Containers Recap', i18n ),
			description: __( 'Great job! You\'ve learned how to add and customize block backgrounds and containers. These features are available in most Lumen blocks, helping you create beautiful, consistent layouts with ease.', i18n ),
			preStep: () => {
				// Toggle background on
				document.querySelector( '.lmb-panel--container-size:not(.is-opened)' )?.click()
				document.querySelector( '.lmb-panel--container-size .lmb-toggle-panel-form-toggle:not(.is-checked) input' )?.click()
			},
		},
		{
			title: __( 'Tip: Style All Blocks Efficiently', i18n ),
			description: createInterpolateElement( __( 'Use the <strong>Lumen Design System</strong> to manage styles for all Lumen blocks globally. Perfect for a unified look and quick design changes!', i18n ), {
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
