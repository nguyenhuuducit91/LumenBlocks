export const substitute = {
	from: 'lumen/expand',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/text',
			{ text: innerBlocks[ 2 ][ 1 ].text },
		]
	},
}

export default substitute
