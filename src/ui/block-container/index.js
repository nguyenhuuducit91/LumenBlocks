/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * External dependencies
 */
import classnames from 'classnames'

const BlockContainer = {}

BlockContainer.Edit = props => {
	const {
		blockProps,
		render,
		mainClass,
		blockTag: blockTagProp,
		..._containerProps
	} = props
	const { blockName } = blockProps
	const {
		anchor = '',
		design,
		blockTag = 'div',
	} = blockProps.attributes

	const mainClasses = classnames( [
		props.className,
	], applyFilters( `lumen.${ blockName }.main-block.classes`, {
		'lmb-main-block': mainClass,
	}, blockProps ) )

	const innerClasses = classnames( [
		'lmb-inner-block',
	], applyFilters( `lumen.${ blockName }.main-block.inner-classes`, {}, blockProps ) )

	const containerProps = applyFilters( `lumen.${ blockName }.main-block.extraProps`, _containerProps, blockProps )

	// If anchor is not defined, force id to be undefined.
	const id = anchor !== '' ? anchor : undefined

	const BlockTag = blockTag || blockTagProp || 'div' // Allow the advanced block settings to override the HTML Tag.
	// TODO Remove `design` from the filters below.
	return (
		<BlockTag { ...containerProps } id={ id } className={ mainClasses }>
			{ blockProps.styles }
			{ applyFilters( `lumen.${ blockName }.edit.output.outer`, null, design, blockProps ) }
			{ render &&
				<div className={ innerClasses }>
					{ applyFilters( `lumen.${ blockName }.edit.output.before`, null, design, blockProps ) }
					<div className="lmb-block-content">
						{ render( blockProps ) }
					</div>
					{ applyFilters( `lumen.${ blockName }.edit.output.after`, null, design, blockProps ) }
				</div>
			}
		</BlockTag>
	)
}

BlockContainer.Edit.defaultProps = {
	styles: null, // provided by `withBlockStyles`
	mainClass: true,
}

BlockContainer.Save = props => {
	const {
		blockProps,
		render,
		mainClass,
		blockTag: blockTagProp,
		..._containerProps
	} = props
	const { blockName } = blockProps
	const {
		anchor = '',
		design,
		blockTag = 'div',
	} = blockProps.attributes

	const mainClasses = classnames( [
		props.className,
	], applyFilters( `lumen.${ blockName }.main-block.classes`, {
		'lmb-main-block': mainClass,
	}, blockProps ) )

	const innerClasses = classnames( [
		'lmb-inner-block',
	], applyFilters( `lumen.${ blockName }.main-block.inner-classes`, {}, blockProps ) )

	const containerProps = applyFilters( `lumen.${ blockName }.main-block.extraProps`, _containerProps, blockProps )

	// If anchor is not defined, force id to be undefined.
	const id = anchor !== '' ? anchor : undefined

	// TODO Remove `design` from the filters below.
	const BlockTag = blockTag || blockTagProp || 'div' // Allow the advanced block settings to override the HTML Tag.
	return (
		<BlockTag { ...containerProps } id={ id } className={ mainClasses }>
			{ blockProps.styles }
			{ applyFilters( `lumen.${ blockName }.save.output.outer`, null, design, blockProps ) }
			{ render &&
				<div className={ innerClasses }>
					{ applyFilters( `lumen.${ blockName }.save.output.before`, null, design, blockProps ) }
					<div className="lmb-block-content">
						{ render( blockProps ) }
					</div>
					{ applyFilters( `lumen.${ blockName }.save.output.after`, null, design, blockProps ) }
				</div>
			}
		</BlockTag>
	)
}

BlockContainer.Save.defaultProps = {
	styles: null, // provided by `withBlockStyles`
	mainClass: true,
}

export default BlockContainer
