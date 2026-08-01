/**
 * Internal dependencies
 */
import {
	BaseControl, Button, PanelAdvancedSettings,
} from '~lumen/ui'

/**
 * External dependencies
 */
import { adminUrl, i18n } from 'lumen'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n'
import {
	select, useSelect, dispatch,
} from '@wordpress/data'
import { addFilter } from '@wordpress/hooks'
import { useMemo, useState } from '@wordpress/element'

addFilter( 'lumen.global-settings.inspector', 'lumen/default-blocks', output => {
	// Updating this will force the block list to rerender and update whether
	// blocks have default styles or not.
	const [ forceUpdate, setForceUpdate ] = useState( 0 )
	const [ isOpen, setIsOpen ] = useState( false )

	const blocks = useMemo( () => {
		const { getBlockSupport } = select( 'core/blocks' )
		return select( 'core/blocks' ).getBlockTypes()
			.filter( ( { name } ) => name.startsWith( 'lumen/' ) )
			.filter( ( { name } ) => getBlockSupport( name, 'lmnSaveBlockStyle' ) !== false )
			.sort( ( a, b ) => a.title.localeCompare( b.title ) )
	}, [] )

	const { getBlockStyle } = useSelect( 'lumen/block-styles' )

	// This is needed to force the block list to rerender if a block style has changed.
	useSelect( select => {
		return isOpen ? select( 'lumen/block-styles' ).getAllBlockStyles() : []
	}, [ isOpen ] )

	return (
		<>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Block Defaults', i18n ) }
				onToggle={ isOpen => setIsOpen( isOpen ) }
			>
				<p className="components-base-control__help">
					<span style={ { marginBottom: '8px', display: 'block' } }>
						{ __( 'Please use the Design System options instead of this. Block Defaults will be sunset and removed from a future version.', i18n ) }
					</span>
					{ __( 'Manage how Lumen blocks look when they\'re inserted.', i18n ) }
				</p>
				{ blocks.map( ( block, i ) => {
					const searchParams = new URLSearchParams()
					searchParams.set( 'lmn_edit_block', block.name )
					searchParams.set( 'lmn_edit_block_style', 'default' )
					searchParams.set( 'lmn_edit_block_title', block.title )

					const hasStyle = getBlockStyle( block.name, 'default' )
					const className = classnames(
						'lmb-button-icon-control',
						'lmn-block-default-control',
						{
							'lmn-block-default-control--is-active': hasStyle,
						}
					)

					return (
						<BaseControl
							key={ i }
							label={ block.title }
							className={ className }
							allowReset={ true }
							showReset={ hasStyle }
							onReset={ () => {
								dispatch( 'lumen/block-styles' ).deleteBlockDefaultStyle( block.name, sprintf( __( 'Default %s Block Deleted!', i18n ), block.title ) )
									.then( () => {
										setForceUpdate( forceUpdate + 1 )
									} )
							} }
						>
							<div className="lmb-button-icon-control__wrapper">
								<Button
									className="lmb-button-icon-control__edit"
									label={ __( 'Edit', i18n ) }
									href={ `${ adminUrl }?${ searchParams.toString() }` }
									target="_style-editor"
									isSecondary
									icon="edit"
								/>
							</div>
						</BaseControl>
					)
				} ) }
			</PanelAdvancedSettings>
		</>
	)
}, 80 )
