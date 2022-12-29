import { createVuetify } from 'vuetify'
import { theme } from '#tailwind-config'

const vuetify = createVuetify({
	theme: {
		themes: {
			light: {
				colors: {
					primary: theme.colors.primary.DEFAULT,
					'primary-light':
						theme.colors.primary.light,
					'primary-dark':
						theme.colors.primary.dark,
					secondary:
						theme.colors.secondary.DEFAULT,
					'secondary-light':
						theme.colors.secondary.light,
					'secondary-dark':
						theme.colors.secondary.dark,
				},
			},
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
		VExpansionPanels: {
			variant: 'popout',
		},
		VExpansionPanelTitle: {
			color: 'secondary',
		},
	},
	ssr: true,
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vuetify)
})
