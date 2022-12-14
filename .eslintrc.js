module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		'cypress/globals': true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:nuxt/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
		'plugin:cypress/recommended',
	],
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		'vue/multi-word-component-names': 'off',
	},
}
