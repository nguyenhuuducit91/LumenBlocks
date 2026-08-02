/**
 * External dependencies
 */
import { useAttributeEditHandlers, useBlockAttributesContext } from '~lumen/hooks'
import {
	getAttrNameFunction, __getValue, getShapeSVG, isElementDescendant,
} from '~lumen/utils'
import { kebabCase } from 'lodash'
import classnames from 'classnames'
import { IconSearchPopover, SvgIcon } from '~lumen/ui'

/**
 * Internal dependencies
 */
import { Edit } from './edit'
import { addAttributes } from './attributes'
import { addStyles } from './style'

/**
 * WordPress dependencies
 */
import { useBlockEditContext } from '@wordpress/block-editor'
import { dispatch, select } from '@wordpress/data'
import {
	useMemo, useState, useRef, useEffect, renderToString,
} from '@wordpress/element'

const LinearGradient = ( {
	id,
} ) => {
	const kebabId = kebabCase( id )
	return (
		<svg style={ {
			height: 0,
			width: 0,
		} }>
			<defs>
				<linearGradient
					id={ id }
					x1="0"
					x2="100%"
					y1="0"
					y2="0"
				>
					<stop offset="0%" style={ {
						stopOpacity: 1,
						stopColor: `var(--${ kebabId }-color-1)`,
					} }></stop>
					<stop offset="100%" style={ {
						stopOpacity: 1,
						stopColor: `var(--${ kebabId }-color-2)`,
					} }></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}

const NOOP = () => {}

const getSvgDef = ( href, viewBox = '0 0 24 24' ) => {
	return `<svg viewBox="${ viewBox }"><use href="${ href }" xlink:href="${ href }"></use></svg>`
}

const generateIconId = () => {
	return Math.floor( Math.random() * new Date().getTime() ) % 100000
}

/**
 * Extract viewBox, width, and height from SVG string without DOM manipulation
 * Only checks for the specific attributes we need (case-insensitive)
 *
 * @param {string} svgString The SVG string to parse
 * @return {Object} Object with viewBox, width, and height
 */
const extractSVGDimensions = svgString => {
	if ( ! svgString || typeof svgString !== 'string' ) {
		return {
			viewBox: null,
			width: null,
			height: null,
		}
	}

	// Find the opening <svg> tag
	const svgTagMatch = svgString.match( /<svg\s*[^>]*>/i )
	if ( ! svgTagMatch ) {
		return {
			viewBox: null,
			width: null,
			height: null,
		}
	}

	const svgTag = svgTagMatch[ 0 ]

	// Extract only the attributes we need (case-insensitive)
	// Pattern: attribute name (case-insensitive) = "value" or 'value' or value
	const getAttribute = attrName => {
		const regex = new RegExp( `${ attrName }\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i' )
		const match = svgTag.match( regex )
		if ( match ) {
			return match[ 1 ] || match[ 2 ] || match[ 3 ] || ''
		}
		return null
	}

	const viewBox = getAttribute( 'viewBox' )
	const widthStr = getAttribute( 'width' )
	const heightStr = getAttribute( 'height' )

	const width = widthStr ? parseInt( widthStr, 10 ) : null
	const height = heightStr ? parseInt( heightStr, 10 ) : null

	return {
		viewBox,
		width,
		height,
	}
}

export const Icon = props => {
	const {
		attrNameTemplate = '%s',
		hasLinearGradient = true,
		value = '',
		defaultValue = '',
		onChange = NOOP,
		openEvenIfUnselected = false,
	} = props

	const { isSelected } = useBlockEditContext()
	const [ isOpen, setIsOpen ] = useState( false )
	const popoverEl = useRef( null )

	// When the block is unselected, make sure that the popover is closed.
	useEffect( () => {
		if ( ! isSelected && isOpen && ! openEvenIfUnselected ) {
			setIsOpen( false )
		}
	}, [ isSelected, isOpen ] )

	// Assign the outside click listener.
	useEffect( () => {
		const clickOutsideListener = event => {
			if ( isOpen ) {
				// If the icon is clicked, just close the popover.
				if ( event.target.closest( '.lmn--inner-svg' ) ) {
					event.stopPropagation()
				}
				if ( ! event.target.closest( '.lmn--inner-svg' ) && ! isElementDescendant( popoverEl.current, event.target ) && ! event.target.closest( '.components-popover' ) ) {
					setIsOpen( false )
				}
			}
		}

		document.body.addEventListener( 'click', clickOutsideListener )
		return () => document.body.removeEventListener( 'click', clickOutsideListener )
	}, [ popoverEl.current, isOpen ] )

	// Enable editing of the icon only when the current block that implements
	// it is selected. We need to use setTimeout since the isSelected is
	// changed earlier.
	const [ debouncedIsSelected, setDebouncedIsSelected ] = useState( false )
	useEffect( () => {
		if ( ! isSelected ) {
			setDebouncedIsSelected( false )
			return
		}
		const t = setTimeout( () => {
			if ( isSelected ) {
				setDebouncedIsSelected( isSelected )
			}
		}, 1 )
		return () => clearTimeout( t )
	}, [ isSelected ] )

	const uniqueId = useBlockAttributesContext( attributes => attributes.uniqueId )

	const {
		getAttribute,
		getAttrName,
		updateAttributeHandler,
	} = useAttributeEditHandlers( attrNameTemplate )

	const ShapeComp = useMemo( () => getShapeSVG( getAttribute( 'backgroundShape' ) || 'blob1' ), [ getAttribute( 'backgroundShape' ) ] )

	const iconColorType = getAttribute( 'iconColorType' )

	/**
	 * Whether this icon is recoloured by the block.
	 *
	 * Every colour attribute counts, in every state: the hover colour is
	 * generated from the same selector as the normal one, so an icon that only
	 * changes on hover has the same problem as one that is recoloured outright.
	 */
	const hasIconColor = useBlockAttributesContext( attributes => {
		const bases = [
			getAttrName( 'iconColor1' ),
			getAttrName( 'iconColor2' ),
			getAttrName( 'iconColorType' ),
		]

		return Object.keys( attributes ).some( attrName => (
			!! attributes[ attrName ] && bases.some( base => attrName.startsWith( base ) )
		) )
	} )

	/**
	 * Whether this icon can be drawn from the shared page-icons `<defs>`.
	 *
	 * Icons are deduplicated by putting one copy in a hidden `<defs>` and
	 * pointing every instance at it with `<use>`. A `<use>` renders that copy
	 * into a shadow tree, and CSS selectors cannot cross into a shadow tree —
	 * so the generated colour rule, which targets the icon's own `path`, `g`
	 * and `rect` elements, matches nothing at all. What is left is the `fill`
	 * on the outer `<svg>`, and that only *inherits* inwards, where an explicit
	 * `fill="…"` on a path inside the referenced icon beats it: presentation
	 * attributes outrank inherited values.
	 *
	 * The frontend inlines the icon instead of referencing it, so the same rule
	 * lands on the real paths there. That asymmetry is the whole bug: recolour
	 * an icon and the change showed up on the site but not in the editor.
	 *
	 * So an icon that is recoloured keeps its own markup. Multicolor was
	 * already excluded for the same underlying reason.
	 */
	const canShareIcon = ! hasIconColor && iconColorType !== 'multicolor'

	const _icon = value || getAttribute( 'icon' )
	const processedIconRef = useRef( null )
	// Which shape the last run settled on, so that turning a colour on or off
	// is not mistaken for "already processed" and left as a `<use>`.
	const processedSharedRef = useRef( null )
	// What this instance actually put into the shared `<defs>`, if anything.
	// Handing back an icon it never registered would decrement someone else's
	// count and drop a symbol other blocks are still pointing at.
	const registeredIconRef = useRef( null )
	const lastIconValueRef = useRef( null )
	const [ icon, setIcon ] = useState( _icon )

	const addPageIconCount = ( svg, id ) => {
		dispatch( 'lumen/page-icons' ).addPageIcon( svg, id )
	}

	const releaseRegisteredIcon = () => {
		if ( registeredIconRef.current ) {
			dispatch( 'lumen/page-icons' ).removePageIcon( registeredIconRef.current )
			registeredIconRef.current = null
		}
	}

	useEffect( () => {
		// Skip if we've already processed this icon in this shape.
		if ( processedIconRef.current === _icon && processedSharedRef.current === canShareIcon ) {
			return
		}

		processedSharedRef.current = canShareIcon

		if ( ! canShareIcon ) {
			// Give up the shared copy if this instance had taken one out.
			releaseRegisteredIcon()
			processedIconRef.current = _icon
			setIcon( _icon ) // Use the original icon directly
			lastIconValueRef.current = _icon
			return
		}

		// Check if icon exists in pageIcons Map
		// The Map structure is: [SVG string (key), { id: iconId, count: number } (value)]
		if ( _icon ) {
			const iconStr = String( _icon )
			let originalSvg = null
			let iconId = null

			// The icon changed, so whatever this instance was holding before is
			// no longer its own. Released before taking the new one out so the
			// old symbol can leave the `<defs>` when nothing else wants it.
			if ( registeredIconRef.current !== iconStr ) {
				releaseRegisteredIcon()
			}

			// Get the current state of the store
			const pageIcons = select( 'lumen/page-icons' ).getPageIcons()

			// First, check if icon already exists in the store
			if ( pageIcons.has( iconStr ) ) {
				// Icon exists, use the existing ID and increment count
				const iconData = pageIcons.get( iconStr )
				iconId = iconData?.id || iconData
				originalSvg = iconStr
				addPageIconCount( iconStr, iconId )

				// Re-check after dispatch to get the actual ID (handles race conditions)
				const updatedPageIcons = select( 'lumen/page-icons' ).getPageIcons()
				if ( updatedPageIcons.has( iconStr ) ) {
					const iconData = updatedPageIcons.get( iconStr )
					iconId = iconData?.id || iconData || iconId
				}
			} else if ( iconStr && iconStr.trim().startsWith( '<svg' ) && ! iconStr.includes( '<use' ) ) {
				// Icon doesn't exist, generate new ID and add it
				originalSvg = iconStr
				iconId = generateIconId()
				addPageIconCount( iconStr, iconId )

				// After dispatch, immediately check the store again to get the actual ID
				// This handles the race condition where another component might have added
				// the same icon with a different ID
				const updatedPageIcons = select( 'lumen/page-icons' ).getPageIcons()
				if ( updatedPageIcons.has( iconStr ) ) {
					const iconData = updatedPageIcons.get( iconStr )
					// Use the ID from the store
					iconId = iconData?.id || iconData || iconId
				}
			}

			if ( originalSvg && iconId ) {
				let viewBox = '0 0 24 24' // Default viewBox
				// Extract viewBox from the original SVG for proper dimensions
				const {
					viewBox: vb,
					width,
					height,
				} = extractSVGDimensions( originalSvg )
				if ( vb ) {
					viewBox = vb
				} else {
					// Fallback to width/height if viewBox is not available
					const finalWidth = width || 24
					const finalHeight = height || 24
					viewBox = `0 0 ${ finalWidth } ${ finalHeight }`
				}
				const newIcon = getSvgDef( `#lmn-page-icons__${ iconId }`, viewBox )

				// Only update state if the icon actually changed
				if ( newIcon !== lastIconValueRef.current ) {
					setIcon( newIcon )
					lastIconValueRef.current = newIcon
				}
				processedIconRef.current = _icon
				registeredIconRef.current = originalSvg
			} else if ( ! _icon ) {
				// Clear processed ref when icon is removed
				processedIconRef.current = null
				if ( lastIconValueRef.current !== null ) {
					setIcon( null )
					lastIconValueRef.current = null
				}
			}
		} else {
			processedIconRef.current = null
			if ( lastIconValueRef.current !== null ) {
				setIcon( null )
				lastIconValueRef.current = null
			}
		}
	}, [ _icon, canShareIcon ] )

	useEffect( () => {
		return () => {
			// Only what this instance took out. It used to hand back whatever
			// icon it was displaying, registered or not, which took a symbol
			// away from the blocks still pointing at it.
			if ( registeredIconRef.current ) {
				dispatch( 'lumen/page-icons' ).removePageIcon( registeredIconRef.current )
			}
		}
	}, [] )

	if ( ! icon ) {
		return null
	}

	const linearGradient = hasLinearGradient ? (
		renderToString( <LinearGradient
			id={ 'linear-gradient-' + uniqueId }
			iconColor1={ getAttribute( 'iconColor1' ) }
			iconColor2={ getAttribute( 'iconColor2' ) }
		/> )
	) : undefined

	const classNames = classnames(
		[ 'lmn--svg-wrapper' ],
		{
			'lmn--show-cursor': debouncedIsSelected,
			'lmn--has-icon2': getAttribute( 'icon2' ),
		}
	)

	return (
		<span // eslint-disable-line
			className={ classNames }
			onClick={ event => {
				if ( debouncedIsSelected || openEvenIfUnselected ) {
					// Only register a click to .lmn--inner-svg.
					if ( event.target.closest( '.lmn--inner-svg' ) && ! isOpen ) {
						setIsOpen( ! isOpen )
					}
				}
			} }

		>
			{ icon && (
				<SvgIcon
					className="lmn--inner-svg"
					prependRenderString={ linearGradient }
					value={ icon }
					ariaLabel={ getAttribute( 'ariaLabel' ) }
				/>
			) }
			{ getAttribute( 'showBackgroundShape' ) && <ShapeComp className="lmn--shape-icon" /> }
			{ isOpen && (
				<IconSearchPopover
					__hasPopover={ true }
					__deprecateUseRef={ popoverEl }
					onClose={ () => setIsOpen( false ) }
					onChange={ icon => {
						dispatch( 'lumen/page-icons' ).removePageIcon( _icon )
						if ( onChange === NOOP ) {
							updateAttributeHandler( 'icon' )( icon )
						} else {
							onChange( icon )
						}
						setIsOpen( false )
					} }
					defaultValue={ defaultValue }
				/>
			) }
			{ getAttribute( 'icon2' ) && (
				<SvgIcon
					className="lmn--inner-svg lmn--icon-2"
					prependRenderString={ linearGradient }
					value={ getAttribute( 'icon2' ) }
					ariaLabel={ getAttribute( 'ariaLabel' ) }
					style={ { display: 'none' } }
				/>
			) }
		</span>
	)
}

Icon.Content = props => {
	const {
		attributes,
		attrNameTemplate,
		hasLinearGradient = true,
		children,
		value = '',
	} = props

	const getAttrName = getAttrNameFunction( attrNameTemplate )
	const getValue = __getValue( attributes, getAttrName, '' )

	const ShapeComp = getShapeSVG( getValue( 'backgroundShape' ) || 'blob1' )

	const linearGradient = hasLinearGradient ? (
		renderToString( <LinearGradient
			id={ 'linear-gradient-' + attributes.uniqueId }
			iconColor1={ getValue( 'iconColor1' ) }
			iconColor2={ getValue( 'iconColor2' ) }
		/> )
	) : undefined

	const className = classnames(
		[ 'lmn--svg-wrapper' ],
		{ 'lmn--has-icon2': getValue( 'icon2' ) }
	)

	const icon = value || getValue( 'icon' )
	if ( ! icon && ! getValue( 'icon2' ) ) {
		return null
	}

	return (
		<span className={ className }>
			{ icon && (
				<SvgIcon.Content
					className="lmn--inner-svg"
					prependRenderString={ linearGradient }
					value={ icon }
					ariaLabel={ getValue( 'ariaLabel' ) }
				/>
			) }
			{ getValue( 'showBackgroundShape' ) && (
				<ShapeComp className="lmn--shape-icon" />
			) }
			{ getValue( 'icon2' ) && ( // This is a second icon that's only outputted for reference. It's up to the parent block to decide what to do with it.
				<SvgIcon.Content
					className="lmn--inner-svg lmn--icon-2"
					prependRenderString={ linearGradient }
					value={ getValue( 'icon2' ) }
					ariaLabel={ getValue( 'ariaLabel' ) }
					style={ { display: 'none' } }
				/>
			) }
			{ children }
		</span>
	)
}

Icon.InspectorControls = Edit

Icon.addAttributes = addAttributes

Icon.addStyles = addStyles

