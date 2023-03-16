const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const primaryColor = colors.fuchsia
const secondaryColor = colors.gray

module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./app.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: 'class',
	important: true,
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: {
					...primaryColor,
					DEFAULT: primaryColor[700],
					light: primaryColor[300],
					dark: primaryColor[900],
				},
				secondary: {
					...secondaryColor,
					DEFAULT: secondaryColor[500],
					light: secondaryColor[300],
					dark: secondaryColor[900],
				},
			},
		},
	},
	variants: {
		extend: {},
	},
}
