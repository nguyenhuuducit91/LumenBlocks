export const substitute = {
	from: 'lumen/timeline',
	transform: ( oldAttributes, innerBlocks ) => {
		const formattedDate = new Date().toLocaleDateString( 'en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		} )
		return [
			'lumen/columns',
			{
				...oldAttributes,
			},
			[
				[ 'lumen/column', {}, innerBlocks ],
				[ 'lumen/column', {}, [
					[ 'lumen/text', { text: formattedDate } ],
				] ],
			],
		]
	},
}

export default substitute
