/**
 * Internal dependencies
 */
import BlockStyles from './style'

/**
 * External dependencies
 */
import { version as VERSION } from 'lumen'
import classnames from 'classnames'
import {
	ColumnInnerBlocks,
	ControlSeparator,
	GroupPlaceholder,
	InspectorLayoutControls,
	InspectorTabs,
} from '~lumen/ui'
import {
	BlockDiv,
	useGeneratedCss,
	MarginBottom,
	getRowClasses,
	Alignment,
	getAlignmentClasses,
	Advanced,
	Responsive,
	CustomAttributes,
	EffectsAnimations,
	ConditionalDisplay,
	Separator,
	getSeparatorClasses,
	Transform,
	ContentAlign,
	getContentAlignmentClasses,
	Columns,
} from '~lumen/features'
import { useBlockContext } from '~lumen/hooks'
import {
	withBlockAttributeContext,
	withBlockWrapperIsHovered,
	withQueryLoopContext,
} from '~lumen/hoc'

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose'
import { __ } from '@wordpress/i18n'

const ALLOWED_INNER_BLOCKS = [ 'lumen/column' ]

const TEMPLATE = [
	[ 'lumen/column' ],
	[ 'lumen/column' ],
	[ 'lumen/column' ],
]

const Edit = props => {
	const {
		className,
		clientId,
	} = props

	useGeneratedCss( props.attributes )

	const rowClass = getRowClasses( props.attributes )
	const separatorClass = getSeparatorClasses( props.attributes )
	const blockAlignmentClass = getAlignmentClasses( props.attributes )
	const { hasInnerBlocks } = useBlockContext()
	const [ columnProviderValue, columnTooltipClass ] = ColumnInnerBlocks.useContext()

	const blockClassNames = classnames( [
		className,
		'lmn-block-columns',
		rowClass,
		separatorClass,
		columnTooltipClass,
	] )

	const contentClassNames = classnames( [
		'lmn-inner-blocks',
		blockAlignmentClass,
		'lmn-block-content',
	], getContentAlignmentClasses( props.attributes ) )

	return (
		<>
			<InspectorTabs />

			<Columns.InspectorControls />
			<InspectorLayoutControls>
				<ControlSeparator />
			</InspectorLayoutControls>
			<ContentAlign.InspectorControls />
			<Alignment.InspectorControls hasColumnJustify={ true } hasRowAlignment={ true } />
			<BlockDiv.InspectorControls />
			<Separator.InspectorControls />
			<Advanced.InspectorControls />
			<Transform.InspectorControls />
			<EffectsAnimations.InspectorControls />
			<CustomAttributes.InspectorControls />
			<Responsive.InspectorControls />
			<ConditionalDisplay.InspectorControls />

			<BlockDiv
				blockHoverClass={ props.blockHoverClass }
				clientId={ props.clientId }
				attributes={ props.attributes }
				className={ blockClassNames }
				// enableVariationPicker={ true }
			>
				<BlockStyles
					version={ VERSION }
					blockState={ props.blockState }
					clientId={ clientId }
				/>

				{ ! hasInnerBlocks && <GroupPlaceholder blockName="lumen/column" /> }
				<Separator>
					<div
						className={ contentClassNames }
						data-align={ ! props.attributes.contentAlign ? undefined // Only needed in the backend
							: props.attributes.contentAlign === 'alignwide' ? 'wide'
								: props.attributes.contentAlign === 'alignfull' ? 'full' : undefined }
					>
						<ColumnInnerBlocks
							providerValue={ columnProviderValue }
							orientation="horizontal"
							template={ props.attributes.templateLock ? undefined : TEMPLATE }
							allowedBlocks={ ALLOWED_INNER_BLOCKS }
							renderAppender={ false }
							templateLock={ props.attributes.templateLock || false }
						/>
					</div>
				</Separator>
			</BlockDiv>
			{ props.isHovered && hasInnerBlocks && <MarginBottom /> }
		</>
	)
}

export default compose(
	withBlockWrapperIsHovered,
	withQueryLoopContext,
	withBlockAttributeContext,
)( Edit )
