export const substitute = {
	from: 'lumen/hero',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{
				...oldAttributes,
			},
			[ [ 'lumen/column', {}, innerBlocks ] ],
		]
	},
}

export default substitute
