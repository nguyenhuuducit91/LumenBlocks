export const substitute = {
	from: 'lumen/icon-box',
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
