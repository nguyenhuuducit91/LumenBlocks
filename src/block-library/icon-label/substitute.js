export const substitute = {
	from: 'lumen/icon-label',
	to: 'lumen/text',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'lumen/text',
			{
				text: innerBlocks[ 1 ][ 1 ].text,
			},
		]
	},
}

export default substitute
