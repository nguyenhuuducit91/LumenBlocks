export const substitute = {
	from: 'lumen/horizontal-scroller',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{ ...oldAttributes },
			innerBlocks,
		]
	},
}

export default substitute
