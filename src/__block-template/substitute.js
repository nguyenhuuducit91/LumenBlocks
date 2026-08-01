export const substitute = {
	from: 'lumen/card', // The name of the current block
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns', // The name of the new block
			{ ...oldAttributes }, // Attributes of the new block
			// The inner blocks of the new block
			[
				[
					'lumen/column',
					{
						align: oldAttributes.align,
						hasContainer: true,
					},
					[
						[ 'lumen/image', { imageUrl: oldAttributes.imageUrl } ],
						...innerBlocks,
					],
				],
			],
		]
	},
}

export default substitute
