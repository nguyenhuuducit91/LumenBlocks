/**
 * WordPress dependencies
 */
import { doAction } from '@wordpress/hooks'

export const addStyles = ( blockStyleGenerator, props = {} ) => {
	const propsToPass = {
		...props,
		version: props.version,
		versionAdded: '3.0.0',
		versionDeprecated: '',
	}
	const {
		hasIconGap = true,
		selector = '',
		hoverSelector = '',
		dependencies = [],
	} = props

	const getSvgSelector = ( getAttribute, _selector = selector, suffixes = [], fallback = selector ) => {
		const svgSelector = `${ _selector || fallback } .lmn--inner-svg svg:last-child`
		if ( suffixes.length ) {
			return [
				svgSelector,
				svgSelector + ` :is(${ suffixes.join( ',' ) })`,
			]
		}
		return svgSelector
	}

	const getSvgHoverSelector = ( getAttribute, _selector = selector, suffixes = [] ) => getSvgSelector( getAttribute, _selector, suffixes, selector + ':hover' )

	const shapeSelector = `${ selector } .lmn--inner-svg`
	const shapeHoverSelector = `${ hoverSelector } .lmn--inner-svg`

	{ /* Icon Styles */ }
	blockStyleGenerator.addBlockStyles( 'iconSize', [ {
		...propsToPass,
		selectorCallback: getAttribute => getSvgSelector( getAttribute ),
		hoverSelectorCallback: getAttribute => getSvgHoverSelector( getAttribute, hoverSelector ),
		styleRule: 'height',
		attrName: 'iconSize',
		key: 'iconSize',
		responsive: 'all',
		format: '%spx',
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconSize', [ {
		...propsToPass,
		selectorCallback: getAttribute => getSvgSelector( getAttribute ),
		hoverSelectorCallback: getAttribute => getSvgHoverSelector( getAttribute, hoverSelector ),
		styleRule: 'width',
		attrName: 'iconSize',
		key: 'iconSize-width',
		responsive: 'all',
		format: '%spx',
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconOpacity', [ {
		...propsToPass,
		selectorCallback: getAttribute => getSvgSelector( getAttribute ),
		hoverSelectorCallback: getAttribute => getSvgHoverSelector( getAttribute, hoverSelector ),
		styleRule: 'opacity',
		attrName: 'iconOpacity',
		key: 'iconOpacity',
		hover: 'all',
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconRotation', [ {
		...propsToPass,
		selectorCallback: getAttribute => getSvgSelector( getAttribute ),
		hoverSelectorCallback: getAttribute => getSvgHoverSelector( getAttribute, hoverSelector ),
		styleRule: 'transform',
		attrName: 'iconRotation',
		key: 'iconRotation',
		hover: 'all',
		format: 'rotate(%sdeg)',
	} ] )

	if ( hasIconGap ) {
		blockStyleGenerator.addBlockStyles( 'iconGap', [ {
			...propsToPass,
			selectorCallback: getAttribute => getSvgSelector( getAttribute ),
			hoverSelectorCallback: getAttribute => getSvgSelector( getAttribute, hoverSelector ),
			styleRuleCallback: getAttribute => getAttribute( 'iconPosition' ) === 'right' ? 'marginInlineStart' : 'marginInlineEnd',
			attrName: 'iconGap',
			key: 'iconGap',
			format: '%spx',
			dependencies: [
				'iconPosition',
				...dependencies,
			],
		} ] )
	}

	blockStyleGenerator.addBlockStyles( 'iconColor1', [ {
		...propsToPass,
		selectorCallback: getAttribute => getSvgSelector( getAttribute, selector, [ 'g', 'path', 'rect', 'polygon', 'ellipse' ] ),
		hoverSelectorCallback: getAttribute => getSvgHoverSelector( getAttribute, hoverSelector, [ 'g', 'path', 'rect', 'polygon', 'ellipse' ] ),
		styleRule: 'fill',
		attrName: 'iconColor1',
		key: 'iconColor1-fill',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			if ( getAttribute( 'iconColorType' ) === 'gradient' && getAttribute( 'iconColor1', 'desktop', state ) && getAttribute( 'iconColor2', 'desktop', state ) ) {
				return `url(#linear-gradient-${ getAttribute( 'uniqueId' ) })`
			}

			if ( ! getAttribute( 'iconColorType' ) ) {
				return value
			}

			return undefined
		},
		dependencies: [
			'iconColorType',
			'iconColor1',
			'iconColor2',
			'uniqueId',
			...dependencies,
		],
		hover: 'all',
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconColorGradientDirection', [ {
		...propsToPass,
		selectorCallback: getAttribute => `${ selector } #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
		styleRule: 'transform',
		format: 'rotate(%sdeg)',
		attrName: 'iconColorGradientDirection',
		key: 'iconColorGradientDirection',
		hoverSelectorCallback: getAttribute => `${ selector }:hover #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconColor1', [ {
		...propsToPass,
		selectorCallback: getAttribute => `${ selector } #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
		styleRuleCallback: getAttribute => `--linear-gradient-${ getAttribute( 'uniqueId' ) }-color-1`,
		attrName: 'iconColor1',
		key: 'iconColor1',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			if ( getAttribute( 'iconColorType' ) !== 'gradient' ||
					! getAttribute( 'iconColor1', 'desktop', state ) ||
					! getAttribute( 'iconColor2', 'desktop', state )
			) {
				return undefined
			}
			return value
		},
		hoverSelectorCallback: getAttribute => `${ selector }:hover #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
		dependencies: [
			'iconColorType',
			'iconColor1',
			'iconColor2',
			...dependencies,
		],
	} ] )

	blockStyleGenerator.addBlockStyles( 'iconColor2', [ {
		...propsToPass,
		selectorCallback: getAttribute => `${ selector } #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
		styleRuleCallback: getAttribute => `--linear-gradient-${ getAttribute( 'uniqueId' ) }-color-2`,
		attrName: 'iconColor2',
		key: 'iconColor2',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			if ( getAttribute( 'iconColorType' ) !== 'gradient' ||
			! getAttribute( 'iconColor1', 'desktop', state ) ||
			! getAttribute( 'iconColor2', 'desktop', state )
			) {
				return undefined
			}
			return value
		},
		hoverSelectorCallback: getAttribute => `${ selector }:hover #linear-gradient-${ getAttribute( 'uniqueId' ) }`,
		dependencies: [
			'iconColorType',
			'iconColor1',
			'iconColor2',
			...dependencies,
		],
	} ] )

	{ /* Shape Styles */ }
	blockStyleGenerator.addBlockStyles( 'shapeColor1', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'backgroundColor',
		attrName: 'shapeColor1',
		key: 'shapeColor1',
		hover: 'all',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			const shapeColorType = getAttribute( 'shapeColorType' )
			if ( state !== 'normal' && shapeColorType === 'gradient' ) {
				return undefined
			}

			return value
		},
		dependencies: [
			'shapeColorType',
			'shapeColor2',
			'shapeColorType',
			'shapeGradientDirection',
			...dependencies,
		],
	} ] )

	/*
	 * The gradient behind an icon.
	 *
	 * `shapeColor1` above deliberately writes no background-color when the type
	 * is gradient, and nothing wrote one in its place — choosing "Gradient" left
	 * the shape with no fill at all. This is the missing half. The stops are
	 * written as one shorthand rather than as custom properties because, unlike
	 * the icon itself, the shape is an ordinary element and not an SVG `<defs>`.
	 */
	blockStyleGenerator.addBlockStyles( 'shapeColorGradient', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'backgroundImage',
		attrName: 'shapeColor1',
		key: 'shapeColorGradient',
		hover: 'all',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			if ( getAttribute( 'shapeColorType' ) !== 'gradient' ) {
				return undefined
			}

			const color1 = value || getAttribute( 'shapeColor1', 'desktop', state )
			const color2 = getAttribute( 'shapeColor2', 'desktop', state )

			// One stop is not a gradient; leaving it undefined lets the plain
			// background-color above keep whatever it had.
			if ( ! color1 || ! color2 ) {
				return undefined
			}

			const direction = getAttribute( 'shapeColorGradientDirection', 'desktop', state ) || 0

			return `linear-gradient(${ direction }deg, ${ color1 }, ${ color2 })`
		},
		dependencies: [
			'shapeColorType',
			'shapeColor1',
			'shapeColor2',
			'shapeColorGradientDirection',
			...dependencies,
		],
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeBorderRadius', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderRadius',
		attrName: 'shapeBorderRadius',
		key: 'shapeBorderRadius',
		format: '%s%',
		hover: 'all',
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapePadding', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'padding',
		attrName: 'shapePadding',
		key: 'shapePadding',
		format: '%spx',
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeOutlineColor', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderColor',
		attrName: 'shapeOutlineColor',
		key: 'shapeOutlineColor',
		hover: 'all',
	} ] )

	blockStyleGenerator.addBlockStyles( 'borderStyle', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderStyle',
		attrName: 'borderStyle',
		key: 'borderStyle',
		valuePreCallback: ( value, getAttribute, device, state ) => {
			if (
				! getAttribute( 'shapeOutlineWidth', 'desktop', state )?.top ||
				! getAttribute( 'shapeOutlineWidth', 'desktop', state )?.right ||
				! getAttribute( 'shapeOutlineWidth', 'desktop', state )?.bottom ||
				! getAttribute( 'shapeOutlineWidth', 'desktop', state )?.left
			) {
				return undefined
			}

			return 'solid'
		},
		hover: 'all',
		dependencies: [
			'shapeOutlineWidth',
			...dependencies,
		],
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeOutlineWidth', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderTopWidth',
		attrName: 'shapeOutlineWidth',
		key: 'shapeOutlineWidth-top',
		responsive: 'all',
		format: '%spx',
		valuePreCallback: value => value?.top,
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeOutlineWidth', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderRightWidth',
		attrName: 'shapeOutlineWidth',
		key: 'shapeOutlineWidth-right',
		responsive: 'all',
		format: '%spx',
		valuePreCallback: value => value?.right,
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeOutlineWidth', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderBottomWidth',
		attrName: 'shapeOutlineWidth',
		key: 'shapeOutlineWidth-bottom',
		responsive: 'all',
		format: '%spx',
		valuePreCallback: value => value?.bottom,
	} ] )

	blockStyleGenerator.addBlockStyles( 'shapeOutlineWidth', [ {
		...propsToPass,
		selector: shapeSelector,
		hoverSelector: shapeHoverSelector,
		styleRule: 'borderLeftWidth',
		attrName: 'shapeOutlineWidth',
		key: 'shapeOutlineWidth-left',
		responsive: 'all',
		format: '%spx',
		valuePreCallback: value => value?.left,
	} ] )

	/*
	 * The shape behind an icon.
	 *
	 * The markup for this was already rendered in both the editor and the saved
	 * output, the positioning was already in `style.scss`, and seven attributes
	 * were already declared — but nothing turned any of them into CSS, so the
	 * shape could only ever appear in its default colour at its default size.
	 * These are the rules that were missing.
	 */
	const backgroundShapeSelector = `${ selector } .lmn--shape-icon`
	const backgroundShapeHoverSelector = `${ hoverSelector } .lmn--shape-icon`

	blockStyleGenerator.addBlockStyles( 'backgroundShapeColor', [ {
		...propsToPass,
		selector: backgroundShapeSelector,
		hoverSelector: backgroundShapeHoverSelector,
		styleRule: 'fill',
		attrName: 'backgroundShapeColor',
		key: 'backgroundShapeColor',
		hover: 'all',
	} ] )

	blockStyleGenerator.addBlockStyles( 'backgroundShapeOpacity', [ {
		...propsToPass,
		selector: backgroundShapeSelector,
		hoverSelector: backgroundShapeHoverSelector,
		styleRule: 'opacity',
		attrName: 'backgroundShapeOpacity',
		key: 'backgroundShapeOpacity',
		hover: 'all',
	} ] )

	/*
	 * Size and offset are one rule, not three.
	 *
	 * The shape is centred by a `translate(-50%, -50%)` in the stylesheet. A
	 * separate `transform` for the offset would replace that centring rather
	 * than add to it, so the whole transform is written here in one piece and
	 * the offsets are appended to the centring instead of overwriting it.
	 */
	blockStyleGenerator.addBlockStyles( 'backgroundShapeSize', [
		{
			...propsToPass,
			selector: backgroundShapeSelector,
			styleRule: 'width',
			attrName: 'backgroundShapeSize',
			key: 'backgroundShapeSize-width',
			format: '%s%',
		},
		{
			...propsToPass,
			selector: backgroundShapeSelector,
			styleRule: 'height',
			attrName: 'backgroundShapeSize',
			key: 'backgroundShapeSize-height',
			format: '%s%',
		},
	] )

	blockStyleGenerator.addBlockStyles( 'backgroundShapeOffset', [ {
		...propsToPass,
		selector: backgroundShapeSelector,
		styleRule: 'transform',
		attrName: 'backgroundShapeOffsetHorizontal',
		key: 'backgroundShapeOffset',
		valuePreCallback: ( value, getAttribute ) => {
			const horizontal = value || 0
			const vertical = getAttribute( 'backgroundShapeOffsetVertical' ) || 0

			if ( ! horizontal && ! vertical ) {
				return undefined
			}

			return `translateX(calc(-50% + ${ horizontal }px)) translateY(calc(-50% + ${ vertical }px))`
		},
		dependencies: [
			'backgroundShapeOffsetVertical',
			...dependencies,
		],
	} ] )

	doAction( 'lumen.block-component.icon.indiv-icon-style.addStyles', blockStyleGenerator )
}
