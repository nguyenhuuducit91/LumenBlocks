export const substitute = {
	from: 'lumen/feature-grid',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{
				...oldAttributes,
				contentAlign: 'center',
			},
			innerBlocks,
		]
	},
}

export default substitute
