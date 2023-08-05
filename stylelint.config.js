module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html',
		'stylelint-config-recommended-vue',
		'stylelint-config-prettier',
	],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'layer',
					'extend',
				],
			},
		],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null,
		'media-query-no-invalid': null,
	},
	overrides: [
		{
			files: ['**/*.vue', '**/*.html'],
			customSyntax: 'postcss-html',
		},
	],
}
