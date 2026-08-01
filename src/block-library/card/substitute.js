export const substitute = {
	from: 'lumen/card',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{ ...oldAttributes },
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
