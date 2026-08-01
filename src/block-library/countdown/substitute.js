export const substitute = {
	from: 'lumen/countdown',
	transform: oldAttributes => {
		return [
			'lumen/columns',
			{ ...oldAttributes },
			[
				[
					'lumen/column',
					{ align: 'center' },
					[
						[ 'core/paragraph', {
							fontSize: 'x-large',
							content: '3',
							align: 'center',
							style: { spacing: { margin: { top: '0', bottom: '0' } } },
						} ],
						[ 'core/paragraph', {
							content: 'Days',
							align: 'center',
							style: { spacing: { margin: { top: '0', bottom: '0' } } },
						} ],
					],
				],
				[
					'lumen/column',
					{ align: 'center' },
					[
						[ 'core/paragraph', {
							fontSize: 'x-large',
							content: '16',
							align: 'center',
							style: { spacing: { margin: { top: '0', bottom: '0' } } },
						} ],
						[ 'core/paragraph', {
							content: 'Hours',
							align: 'center',
							style: { spacing: { margin: { top: '0', bottom: '0' } } },
						} ],
					],
				],
			],
		]
	},
}

export default substitute
