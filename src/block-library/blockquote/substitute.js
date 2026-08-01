export const substitute = {
	from: 'lumen/blockquote',
	transform: ( oldAttributes, innerBlocks ) => {
		return [
			'core/pullquote',
			{
				value: innerBlocks[ 1 ][ 1 ].text,
				align: oldAttributes.contentAlign,
			},
		]
	},
}

export default substitute
