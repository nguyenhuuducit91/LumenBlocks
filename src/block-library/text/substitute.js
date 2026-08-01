export const substitute = {
	from: 'lumen/text',
	transform: oldAttributes => {
		return [
			'core/paragraph',
			{
				content: oldAttributes?.text,
				align: oldAttributes?.contentAlign,
			},
		]
	},
}

export default substitute
