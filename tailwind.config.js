const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const primaryColor = colors.fuchsia
const secondaryColor = colors.pink
const neutralColor = colors.gray

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
		fontFamily: {
			body: ['"Inter"', ...defaultTheme.fontFamily.sans],
			display: ['"Inter"', ...defaultTheme.fontFamily.sans],
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
			neutral: {
				...neutralColor,
				DEFAULT: neutralColor[500],
				light: neutralColor[300],
				dark: neutralColor[900],
			},
		},
		extend: {
			dropShadow: {
				primary: '3px 5px 0 rgba(35, 7, 79, 0.4)',
				secondary: '3px 5px 0 rgba(35, 7, 79, 0.4)',
			},
		},
	},
	variants: {
		extend: {},
	},
}
