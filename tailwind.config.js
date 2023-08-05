const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const primaryColor = colors.fuchsia
const secondaryColor = colors.pink
const neutralColor = colors.gray

function rem2px(input, fontSize = 16) {
	if (input == null) {
		return input
	}
	switch (typeof input) {
		case 'object': {
			if (Array.isArray(input)) {
				return input.map((val) => rem2px(val, fontSize))
			}
			const ret = {}
			for (const key in input) {
				ret[key] = rem2px(input[key], fontSize)
			}
			return ret
		}
		case 'string': {
			return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`)
		}
		case 'function': {
			// eslint-disable-next-line no-eval
			return eval(
				input
					.toString()
					.replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`)
			)
		}
		default:
			return input
	}
}

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
			body: ['"Roboto"', ...defaultTheme.fontFamily.sans],
			display: ['"Amaranth"', ...defaultTheme.fontFamily.serif],
		},
		// Use px for max-width, since container breakpoints are also in px.
		maxWidth: ({ theme, breakpoints }) => ({
			...rem2px(defaultTheme.maxWidth({ theme, breakpoints })),
		}),
		colors: {
			transparent: 'transparent',
			black: '#000000',
			white: '#ffffff',
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
			screens: {
				xs: '475px',
			},
			dropShadow: {
				primary: '3px 5px 0 rgba(35, 7, 79, 0.4)',
				secondary: '3px 5px 0 rgba(35, 7, 79, 0.4)',
			},
		},
	},
	variants: {
		extend: {},
	},
  safelist: [],
}
