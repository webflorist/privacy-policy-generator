import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
	theme: {
		themes: {
			light: {
				colors: {
					primary: '#9333ea',
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
		VTextField: {
			variant: 'underlined',
		},
	},
	ssr: true,
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vuetify)
})
