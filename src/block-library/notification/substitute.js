export const substitute = {
	from: 'lumen/notification',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{
				...oldAttributes,
			},
			[
				[
					'lumen/column',
					{
						hasContainer: true,
						containerBackgroundColor: oldAttributes.containerBackgroundColor,
					},
					innerBlocks,
				],
			],
		]
	},
}

export default substitute
