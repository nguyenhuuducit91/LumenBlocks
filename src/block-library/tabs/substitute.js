export const substitute = {
	from: 'lumen/tabs',
	transform: ( oldAttributes, innerBlocks ) => {
		const labels = innerBlocks[ 0 ][ 1 ]?.tabLabels
		const contents = innerBlocks[ 1 ][ 2 ]

		const insideBlocks = []

		labels.forEach( ( label, index ) => {
			insideBlocks.push( [ 'lumen/heading', { text: label?.label } ] )
			if ( contents[ index ] ) {
				insideBlocks.push( contents[ index ] )
			}
		} )

		return [
			'lumen/columns',
			{
				...oldAttributes,
			},
			[ [ 'lumen/column', {}, insideBlocks ] ],
		]
	},
}

export default substitute
