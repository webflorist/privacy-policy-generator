// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
	runtimeConfig: {
		public: {},
	},
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		'@vite-pwa/nuxt',
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		// @ts-ignore
		// this adds the vuetify vite plugin
		// also produces type errors in the current beta release
		async (options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => config.plugins.push(vuetify()))
		},
	],
	css: [
		'@fontsource/roboto/300.css',
		'@fontsource/roboto/400.css',
		'@fontsource/roboto/700.css',
		'@fontsource/amaranth/400.css',
		'@fontsource/amaranth/700.css',
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
		defaultLocale: 'en',
		lazy: true,
		compilation: {
			strictMessage: false,
		},
	},

	tailwindcss: {
		exposeConfig: true,
		injectPosition: 'last',
	},

	postcss: {
		plugins: {
			'postcss-import': {},
			'tailwindcss/nesting': {},
			tailwindcss: {},
			autoprefixer: {},
			'postcss-extend': {},
		},
	},

	pwa: {
		registerType: 'autoUpdate',
		registerWebManifestInRouteRules: true,
		manifest: {
			name: 'Privacy Policy Generator',
			short_name: 'PrivacyPolicyGenerator',
			theme_color: '#4a148c',
			background_color: '#4a148c',
			icons: [
				{
					src: '/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
		workbox: {
			navigateFallback: '/',
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		client: {
			installPrompt: true,
			// you don't need to include this: only for testing purposes
			// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: false,
			type: 'module',
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

	// Nitro Config (See https://nitro.unjs.io/config)
	nitro: {
		prerender: {
			failOnError: true,
			crawlLinks: true,
		},
	},
})
