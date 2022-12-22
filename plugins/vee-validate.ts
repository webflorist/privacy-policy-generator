import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, email, url } from '@vee-validate/rules'
import en from '@vee-validate/i18n/dist/locale/en.json'
import de from '@vee-validate/i18n/dist/locale/de.json'

export default defineNuxtPlugin((nuxtApp) => {
	configure({
		generateMessage: localize({
			en,
			de,
		}),
	})

	watch(nuxtApp.$i18n.locale, (newLocale) => setLocale(newLocale), {
		immediate: true,
	})

	defineRule('required', required)
	defineRule('email', email)
	defineRule('url', url)
})
