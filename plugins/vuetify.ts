import { createVuetify, ThemeDefinition } from 'vuetify'
import { theme } from '#tailwind-config'

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		surface: theme.colors.primary[100],
		background: '#ffffff',
		primary: theme.colors.primary.DEFAULT,
		'primary-light': theme.colors.primary.light,
		'primary-dark': theme.colors.primary.dark,
		secondary: theme.colors.secondary.DEFAULT,
		'secondary-light': theme.colors.secondary.light,
		'secondary-dark': theme.colors.secondary.dark,
	},
}

const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		surface: '#1a2128',
		background: '#191919',
		'on-surface-variant': '#1a2128',
		primary: theme.colors.primary.DEFAULT,
		secondary: '#4d4d4d',
		'secondary-light': '#777777',
		'secondary-dark': theme.colors.secondary.dark,
	},
}

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'light',
		themes: {
			light: lightTheme,
			dark: darkTheme,
		},
	},
	defaults: {
		VBtnToggle: {
			color: 'primary',
			divided: true,
		},
		VBtn: {
			color: 'primary',
		},
		VCard: {
			tag: 'section',
		},
		VContainer: {
			tag: 'section',
		},
		VAlert: {
			tag: 'section',
		},
		VExpansionPanels: {
			variant: 'popout',
			tag: 'section',
		},
		VExpansionPanelTitle: {
			color: 'secondary',
		},
		VTextField: {
			//variant: 'default'
		},
		VTabs: {
			bgColor: 'primary',
			showArrows: true,
			centerActive: true,
		},
		VChipGroup: {
			selectedClass: 'bg-primary',
		},
	},
	ssr: true,
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vuetify)
})
