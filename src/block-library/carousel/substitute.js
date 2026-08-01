export const substitute = {
	from: 'lumen/carousel',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{ ...oldAttributes },
			innerBlocks,
		]
	},
}

export default substitute
