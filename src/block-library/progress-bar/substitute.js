export const substitute = {
	from: 'lumen/progress-bar',
	transform: oldAttributes => {
		return [
			'core/paragraph',
			{
				content: oldAttributes?.progressValue || '50',
				fontSize: 'x-large',
			},
		]
	},
}

export default substitute
