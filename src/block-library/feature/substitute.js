export const substitute = {
	from: 'lumen/feature',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{ ...oldAttributes },
			innerBlocks,
		]
	},
}

export default substitute
