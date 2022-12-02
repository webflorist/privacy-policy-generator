// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			siteMeta: {
				url: 'https://TODO',
			},
		},
	},
	build: {
		transpile: ['primevue'],
	},
	modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
	css: [
		'@fontsource/inter/300.css',
		'@fontsource/inter/400.css',
		'@fontsource/inter/700.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
	],
	vite: {
		css: {
			devSourcemap: true,
		},
	},
	i18n: {
		locales: [
			{
				code: 'de',
				name: 'Deutsch',
				file: 'de.json',
			},
			{
				code: 'en',
				name: 'English',
				file: 'en.json',
			},
		],
		detectBrowserLanguage: {
			useCookie: false,
			alwaysRedirect: true,
		},
		strategy: 'prefix',
		langDir: 'locales',
		vueI18n: {
			globalInjection: true,
			legacy: false,
			fallbackLocale: 'en',
		},
	},

	tailwindcss: {
		cssPath: '~/assets/css/main.css',
	},

	postcss: {
		plugins: {
			'postcss-import': {},
			'postcss-extend': {},
			'tailwindcss/nesting': {},
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	app: {
		head: {
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
			],
			link: [
				{
					rel: 'preload',
					as: 'font',
					href: '/fonts/woff2/ForzaSSm-Book_Web.woff2',
					crossorigin: 'anonymous',
				},
			],
		},
	},
})
