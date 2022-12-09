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
	ssr: true,
})

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vuetify)
})
