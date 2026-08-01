export const substitute = {
	from: 'lumen/subtitle',
	transform: oldAttributes => {
		return [
			'core/paragraph',
			{
				fontSize: 'small',
				align: oldAttributes?.contentAlign,
				content: oldAttributes?.text,
			},
		]
	},
}

export default substitute
