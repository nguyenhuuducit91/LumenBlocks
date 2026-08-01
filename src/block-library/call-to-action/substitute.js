export const substitute = {
	from: 'lumen/call-to-action',
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
