export const substitute = {
	from: 'lumen/testimonial',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{
				...oldAttributes,
			},
			[ [ 'lumen/column', { hasContainer: true }, innerBlocks ] ],
		]
	},
}

export default substitute
