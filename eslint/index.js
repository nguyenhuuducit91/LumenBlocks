module.exports = {
	rules: {
		'no-update-block-attributes': require( './rules/no-update-block-attributes' ),
		'no-use-block-attributes': require( './rules/no-use-block-attributes' ),
		'no-import-lmn-full-library': require( './rules/no-import-lmn-full-library' ),
		'no-import-use-lmn-api': require( './rules/no-import-use-lmn-api' ),
		'no-deprecated-use-styles': require( './rules/no-deprecated-use-styles' ),
		'no-get-block-parents': require( './rules/no-get-block-parents' ),
		'no-use-dispatch': require( './rules/no-use-dispatch' ),
		'no-import-create-root': require( './rules/no-import-create-root' ),
	},
	configs: {
		recommended: {
			plugins: [
				'lumen',
			],
			rules: {
				'lumen/no-update-block-attributes': 'error',
				'lumen/no-use-block-attributes': 'error',
				'lumen/no-import-lmn-full-library': 'error',
				'lumen/no-import-use-lmn-api': 'error',
				'lumen/no-deprecated-use-styles': 'error',
				'lumen/no-get-block-parents': 'error',
				'lumen/no-use-dispatch': 'error',
				'lumen/no-import-create-root': 'error',
			},
		},
	},
}

