
/**
 * Internal dependencies
 */
import SVGQuickButtonsArrow from './images/quick-buttons-arrow.svg'
import SVGCheck from './images/check.svg'
import SVGStateHoverIcon from '../ui/base-control2/images/state-hover.svg'
import SVGStateParentHoverIcon from '../ui/base-control2/images/state-parent-hover.svg'
import SVGProIcon from './images/pro-icon.svg'

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n'
import {
	Icon,
	addTemplate as addTemplateIcon,
	styles as stylesIcon,
	scheduled as scheduledIcon,
	brush as brushIcon,
	blockDefault as blockDefaultIcon,
	desktop as desktopIcon,
	cog as cogIcon,
	column as columnIcon,
	copy as copyIcon,
	filter as filterIcon,
	reusableBlock as reusableBlockIcon,
	symbol as symbolIcon,
	archive as archiveIcon,
	globe as globeIcon,
} from '@wordpress/icons'

/**
 * External dependencies
 */
import {
	i18n, guidedTourStates, isPro,
} from 'lumen'
import classNames from 'classnames'

const QUICK_BUTTONS = [
	{
		title: __( 'Building with Blocks & Layouts', i18n ),
		description: __( 'Start creating your pages with blocks and easy-to-use layouts.', i18n ),
		items: [
			{
				id: 'design-library',
				icon: addTemplateIcon,
				title: __( 'Start Building with the Design Library', i18n ),
				description: __( 'Jump straight into our Design Library and insert polished, pre-built sections; no more blank-page overwhelm.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=design-library`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'blocks',
				icon: blockDefaultIcon,
				title: __( 'Lumen Block Settings', i18n ),
				description: __( 'Learn how to use Lumen blocks and get more out of them.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=blocks`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'block-backgrounds',
				icon: columnIcon,
				title: __( 'Block Backgrounds & Containers', i18n ),
				description: __( 'Use backgrounds to create stunning full-width sections, and containers to add boxed content for organizing your page.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=block-backgrounds`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'site-kit',
				icon: scheduledIcon,
				title: __( 'Start with a Complete Site Kit', i18n ),
				description: __( 'Pick a ready-made website template to kickstart your project — fully built layouts and styles, just swap in your content.', i18n ),
				link: '/wp-admin/post-new.php?post_type=page',
				cta: __( 'Try Now', i18n ),
				display: false,
			},
		],
	},
	{
		title: __( 'Responsive & Interactive Design', i18n ),
		description: __( 'Make your site look great and interactive on any device.', i18n ),
		items: [
			{
				id: 'responsive-controls',
				icon: desktopIcon,
				title: __( 'Responsive Controls', i18n ),
				description: __( 'Adjust styles for desktop, tablet, and mobile. Easily control layout, spacing, and appearance for a seamless experience on any device.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=responsive-controls`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'hover-states',
				icon: <span className="s-custom-icon-wrapper"><SVGStateHoverIcon /></span>,
				title: __( 'Styling Hover States', i18n ),
				description: __( 'Adjust styles for different hover states to create engaging effects when users interact with your designs.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=hover-states`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'advanced-hover-states',
				icon: <span className="s-custom-icon-wrapper"><SVGStateParentHoverIcon /></span>,
				title: __( 'Styling Hover States (Advanced)', i18n ),
				description: __( 'Learn how to style containers and their contents together by applying hover effects to multiple blocks at once.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=advanced-hover-states`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'motion-effects',
				icon: symbolIcon,
				title: __( 'Motion Effects', i18n ),
				description: __( 'Add animations and transitions to your blocks for a more engaging and interactive user experience.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=motion-effects` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
		],
	},
	{
		title: __( 'Styling Sitewide', i18n ),
		description: __( 'Manage your brand\'s appearance and style across your whole website.', i18n ),
		items: [
			{
				id: 'design-system',
				icon: stylesIcon,
				title: __( 'Apply Global Styles Instantly', i18n ),
				description: __( 'Set your brand\'s colors, fonts, and spacing once in the Design System; every Lumen block updates automatically.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=design-system`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'design-system-picker',
				icon: brushIcon,
				title: __( 'Pre-set Design Systems', i18n ),
				description: __( 'Browse curated Design System presets — apply a professional look instantly without building from scratch.', i18n ),
				link: '/wp-admin/post-new.php?post_type=page',
				cta: __( 'Try Now', i18n ),
				display: false,
			},
			{
				id: 'global-color-schemes',
				icon: globeIcon,
				title: __( 'Global Color Schemes', i18n ),
				description: __( 'Create and apply color schemes to your entire website. Maintain consistent branding across all pages with ease.', i18n ),
				link: `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=global-color-schemes`,
				cta: __( 'Try Now', i18n ),
			},
			{
				id: 'block-styles',
				icon: reusableBlockIcon,
				title: __( 'Re-using Block Styles', i18n ),
				description: __( 'Re-use block styles sitewide for consistent branding. Save and quickly apply your favorite style combinations to any block.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=block-styles` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
			{
				id: 'copy-paste-styles',
				icon: copyIcon,
				title: __( 'Copy & Paste Styles', i18n ),
				description: __( 'Quickly apply styles from one block to another for consistent design and branding.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=copy-paste-styles` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
		],
	},
	{
		title: __( 'Advanced Functionality', i18n ),
		description: __( 'Unlock more advanced features and controls for your site.', i18n ),
		items: [
			{
				id: 'dynamic-content',
				icon: archiveIcon,
				title: __( 'Dynamic Content', i18n ),
				description: __( 'Dynamically display content based on user interactions, site conditions, or time-based triggers.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=dynamic-content` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
			{
				id: 'conditional-display',
				icon: cogIcon,
				title: __( 'Conditional Display', i18n ),
				description: __( 'Show or hide blocks based on specific conditions, such as user roles, device type, or custom criteria.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=conditional-display` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
			{
				id: 'custom-css',
				icon: filterIcon,
				title: __( 'Applying CSS per Block', i18n ),
				description: __( 'Add custom CSS to your blocks for precise control over their appearance and behavior.', i18n ),
				link: isPro ? `/wp-admin/post-new.php?post_type=page&content=${ __( 'Welcome to Lumen', i18n ) }&tour=custom-css` : '',
				cta: __( 'Try Now', i18n ),
				premium: true,
			},
		],
	},
]

let totalGuidedTours = 0
let totalDone = 0
QUICK_BUTTONS.forEach( category => {
	category.items.forEach( item => {
		if ( item.premium && ! isPro ) {
			return
		}
		if ( item.display === false ) {
			return
		}

		totalGuidedTours += 1
		if ( guidedTourStates?.includes( item.id ) ) {
			totalDone += 1
		}
	} )
} )

export const GettingStarted = () => {
	return <>
		<div className="s-body">
			<div className="s-getting-started__centered" role="region" aria-labelledby="welcome-lumen-title">
				<div className="tag" id="welcome-lumen-tag">{ __( 'Welcome to Lumen', i18n ) }</div>
				<h1 className="title" id="welcome-lumen-title">{ __( 'Welcome to Your New Block Editor Workflow!', i18n ) }</h1>
			</div>
			<section
				className="s-getting-started__progress s-card"
				aria-labelledby="learning-progress-title"
				aria-describedby="learning-progress-desc"
				role="group"
			>
				<div className="s-getting-started__progress-labels">
					<h2 id="learning-progress-title" className="s-getting-started__progress-labels-title">
						{ __( 'Your Learning Progress', i18n ) }
					</h2>
					<p
						className="s-getting-started__progress-labels-count"
						id="learning-progress-desc"
					>
						{ sprintf( __( '%d of %d completed', i18n ), totalDone, totalGuidedTours ) }
					</p>
				</div>
				<div
					className="s-getting-started__progress-bar"
					role="progressbar"
					aria-valuenow={ totalDone }
					aria-valuemin={ 0 }
					aria-valuemax={ totalGuidedTours }
					aria-valuetext={
						sprintf( __( '%d of %d learning items completed', i18n ), totalDone, totalGuidedTours )
					}
					aria-describedby="learning-progress-desc"
					tabIndex={ 0 }
				>
					<div
						className="s-getting-started__progress-bar-fill"
						style={ { width: `${ totalGuidedTours ? ( totalDone / totalGuidedTours ) * 100 : 0 }%` } }
					></div>
				</div>
			</section>
			<div className="s-getting-started__quick-start-wrapper" role="region" aria-labelledby="tutorials-list-title">
				<div className="s-guided-tours-container" role="list" aria-label={ __( 'Guided Tutorials', i18n ) }>
					{ QUICK_BUTTONS.map( ( category, k ) => {
						const categoryTitleId = `category-title-${ k }`
						const categoryDescId = `category-desc-${ k }`

						return (
							<section
								key={ category.title }
								aria-labelledby={ categoryTitleId }
								aria-describedby={ categoryDescId }
								role="group"
							>
								<h2 id={ categoryTitleId }>
									{ category.title }{ ' ' }
									<span>
										{ sprintf( __( '(%d)', i18n ), category.items.filter( item => item.display !== false ).length ) }
									</span>
								</h2>
								<p id={ categoryDescId }>{ category.description }</p>
								<div className="s-guided-tours-container-inner" role="list">
									{ category.items.map( ( item, i ) => {
										if ( item.display === false ) {
											return null
										}

										const buttonId = `guided-tour-${ item.id }-button`
										const cardTitleId = `guided-tour-${ item.id }-title`
										const cardDescId = `guided-tour-${ item.id }-desc`

										return (
											<article
												className="s-card"
												key={ item.id }
												role="listitem"
												aria-labelledby={ cardTitleId }
												aria-describedby={ cardDescId }
											>
												{ k === 0 && i === 0 && (
													<div className="s-quick-buttons-arrow" aria-hidden="true">
														<SVGQuickButtonsArrow />
														<span>{ __( 'Start Here', i18n ) }</span>
													</div>
												) }
												<div className="s-quick-button-icon" aria-hidden="true">
													<Icon icon={ item.icon } />
												</div>
												<div className="s-quick-button-description">
													<h3 id={ cardTitleId }>
														{ ! isPro && item.premium && <span className="lmn-pulsating-circle" role="presentation" /> }
														<span>{ item.title }</span>
													</h3>
													<p id={ cardDescId }>{ item.description }</p>
												</div>
												<div className="s-quick-button-button">
													<a
														id={ buttonId }
														href={ item.link }
														// aria-disabled={ item.premium && ! isPro }
														className={ classNames( 's-button s-secondary-button uppercase', {
															's-button--checked': guidedTourStates?.includes( item.id ),
															's-button--unlock': item.premium && ! isPro,
															// 's-button--disabled': item.premium && ! isPro,
														} ) }
														role="button"
														tabIndex={ 0 }
														aria-pressed={ !! guidedTourStates?.includes( item.id ) }
														aria-label={
															`${ item.title }: ${ item.description }` +
															( item.premium && ! isPro ? ` (${ __( 'Pro required', i18n ) })` : '' )
														}
													>
														<span className="s-quick-button-toggle-indicator" aria-hidden="true">
															{ item.premium && ! isPro
																? <SVGProIcon />
																: <SVGCheck />
															}
														</span>
														{ item.premium && ! isPro
															? __( 'Unlock', i18n )
															: guidedTourStates?.includes( item.id ) ? __( 'Done', i18n ) : item.cta
														}
													</a>
												</div>
											</article>
										)
									} ) }
								</div>
							</section>
						)
					} ) }
				</div>
			</div>

		</div>
	</>
}
