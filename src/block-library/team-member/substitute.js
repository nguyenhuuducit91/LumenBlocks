export const substitute = {
	from: 'lumen/team-member',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/columns',
			{},
			[
				[
					'lumen/column',
					{},
					innerBlocks,
				],
			],
		]
	},
}

export default substitute
