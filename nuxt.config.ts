// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			siteMeta: {
				url: 'https://TODO',
			},
		},
	},
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		// @ts-ignore
		// this adds the vuetify vite plugin
		// also produces type errors in the current beta release
		async (options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) =>
				config.plugins.push(vuetify())
			)
		},
	],
	css: [
		'@fontsource/inter/300.css',
		'@fontsource/inter/400.css',
		'@fontsource/inter/700.css',
		'vuetify/styles',
		'@mdi/font/css/materialdesignicons.css',
	],
	vite: {
		css: {
			devSourcemap: true,
		},
		ssr: {
			noExternal: ['vuetify'], // add the vuetify vite plugin
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
		exposeConfig: true,
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
			/* 			link: [
				{
					rel: 'preload',
					as: 'font',
					href: '/fonts/woff2/ForzaSSm-Book_Web.woff2',
					crossorigin: 'anonymous',
				},
			], */
		},
	},
})
