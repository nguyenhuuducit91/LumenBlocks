export const substitute = {
	from: 'lumen/video-popup',
	transform: oldAttributes => {
		return [
			'core/video',
			{
				src: oldAttributes?.oldAttributes,
			},
		]
	},
}

export default substitute
