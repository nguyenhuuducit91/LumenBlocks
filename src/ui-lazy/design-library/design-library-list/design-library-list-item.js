/**
 * Internal dependencies.
 */
import { DesignPreview } from './design-preview'
import { useShadowRoot } from './use-shadow-root'
import { usePreviewRenderer } from './use-preview-renderer'
import { useAutoScroll } from './use-auto-scroll'

/**
 * External dependencies.
 */
import { isPro, i18n } from 'lumen'
import classnames from 'classnames'
import {
	Tooltip, Button, ProControl,
} from '~lumen/ui'

/**
 * WordPress dependencies.
 */
import {
	useState, useRef, memo,
	useMemo,
} from '@wordpress/element'
import { Dashicon, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const DesignLibraryListItem = memo( props => {
	const {
		shouldRender,
		presetMarks,
		previewProps,
		isMultiSelectBusy,
	} = props

	const {
		selectedTab, selectedNum, selectedData, plan, label,
	} = previewProps

	const spacingSize = Array.isArray( presetMarks ) && presetMarks.length >= 2
		? presetMarks[ presetMarks.length - 2 ].value
		: 120

	const [ isLoading, setIsLoading ] = useState( true )
	const [ selected, setSelected ] = useState( false )

	const {
		hostRef, shadowRoot, stylesLoaded,
	} = useShadowRoot( shouldRender )

	const ref = useRef( null )

	const {
		blocks, enableBackground,
		shadowBodySizeRef, blocksForSubstitutionRef,
		previewSize, onClickDesign,
		updateShadowBodySize,
	} = usePreviewRenderer( previewProps, shouldRender, spacingSize,
		ref, hostRef, shadowRoot, setIsLoading, stylesLoaded )

	const {
		onMouseOut, onMouseOver, onMouseDown,
	} = useAutoScroll( hostRef, shadowBodySizeRef, selectedTab )

	const designPreviewSize = useMemo( () => {
		const tempHeight = selectedTab === 'pages' ? 345 : 100

		const previewHeight = selectedNum && selectedData ? selectedData.selectedPreviewSize.preview
			: ( enableBackground ? previewSize.heightBackground : previewSize.heightNoBackground )

		if ( ! blocks || ! previewHeight ) {
			return tempHeight
		}

		return previewHeight
	}, [ selectedTab, selectedNum, selectedData, previewSize, blocks, enableBackground ] )

	const mainClasses = classnames( [
		'lmb-design-library-item',
		'lmb-design-library-item--toggle',
	], {
		[ `lmb--is-${ plan }` ]: ! isPro && plan !== 'free',
		'lmb--is-toggled': selectedNum,
		'lmb--is-hidden': ! shouldRender,
	} )

	const onClickHost = e => {
		e.stopPropagation()
		if ( selectedTab === 'pages' ) {
			return
		}
		onClickDesign()
	}

	return (
		// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
		<button
			className={ mainClasses }
			ref={ ref }
			onClick={ onClickHost }
			onMouseOut={ onMouseOut }
			onMouseOver={ onMouseOver }
		>
			{ ! isPro && plan !== 'free' && <span className="lmn-pulsating-circle" role="presentation" /> }
			<div style={ { position: 'relative' } } className={ `lmn-block-design__design-container ${ designPreviewSize > 100 ? 'lmn--design-preview-large' : 'lmn--design-preview-small' }` }>
				{ ! isPro && plan !== 'free' && (
					<ProControl
						type="design-library"
						showImage={ false }
						showHideNote={ false }
					/>
				) }
				<div className={ `lmn-spinner-container ${ isLoading || ! shouldRender ? '' : 'lmn-hide-spinner' }` }><Spinner /></div>
				<div
					className="lmn-block-design__host-container"
					style={ {
						transform: `scale(${ selectedNum && selectedData ? selectedData.selectedPreviewSize.scale : previewSize?.scale })`,
						transformOrigin: 'top left',
						height: designPreviewSize,
					} }
				>
					<div className="lmn-block-design__host" ref={ hostRef }>
						{ shouldRender && shadowRoot && <DesignPreview
							blocks={ blocks }
							shadowRoot={ shadowRoot }
							selectedTab={ selectedTab }
							designIndex={ props.designIndex }
							onMouseDown={ onMouseDown }
							updateShadowBodySize={ updateShadowBodySize }
							setIsLoading={ setIsLoading }
						/> }
					</div>
				</div>
			</div>

			<footer
				// Add the number if isToggle is a number, signifying an order instead of just an on/off.
				data-selected-num={ selectedNum }
			>
				<div>
					<h4> { label } </h4>
					{ blocksForSubstitutionRef.current !== false && blocksForSubstitutionRef.current.size !== 0 &&
						<Tooltip text={ __( 'This design contains disabled blocks. You can still insert this design with blocks substituted with other enabled blocks.', i18n ) }>
							<Dashicon icon="warning" size={ 16 } />
						</Tooltip>
					}
				</div>
				<div>
					{ selectedNum !== 0 &&
						<Tooltip text={ __( 'Style options are locked for this design because it is selected.', i18n ) }>
							<Dashicon icon="editor-help" size={ 16 } />
						</Tooltip>
					}
					{ selectedTab === 'patterns' ? <span className="lmn-block-design__selected-num">{ selectedNum === 0 ? '' : selectedNum }</span>
						: <div>
							<Button
								label={ __( 'Insert', i18n ) }
								className={ `lmb-modal-design-library__add-multi ${ selected ? 'lmn--is-selected' : '' }` }
								disabled={ isMultiSelectBusy }
								onClick={ () => {
									setSelected( true )
									onClickDesign()
								} }
							>
								{ __( 'Insert', i18n ) }
								{ isMultiSelectBusy && <Spinner /> }
							</Button>
						</div>
					}
				</div>
			</footer>
		</button>
	)
} )

DesignLibraryListItem.defaultProps = {
	designId: '',
	image: '',
	label: '',
	onClick: () => {},
	plan: 'free',
	premiumLabel: __( 'Go Premium', i18n ),
}

export default DesignLibraryListItem
