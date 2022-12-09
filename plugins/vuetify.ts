import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
	defaults: {
		VBtn: {
			color: 'primary',
		},
		VBtnToggle: {
			color: 'primary',
			divided: true,
		},
		VTextField: {
			color: 'primary',
			variant: 'underlined',
			clearable: true
		},		
	},
	theme: {
		themes: {
			light: {
				colors: {
					primary: '#9333ea',
				},
			},
		},
	},
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vuetify)
})
