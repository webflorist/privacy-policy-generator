import { de } from '@vee-validate/i18n/dist/locale/de.json'
// https://nuxt.com/docs/api/configuration/nuxt-config

import { theme } from './tailwind.config.js'
export default defineNuxtConfig({
	runtimeConfig: {
		public: {},
	},
	modules: [
		'@vite-pwa/nuxt',
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@invictus.codes/nuxt-vuetify',
	],
	css: [
		'@fontsource/roboto/300.css',
		'@fontsource/roboto/400.css',
		'@fontsource/roboto/700.css',
		'@fontsource/amaranth/400.css',
		'@fontsource/amaranth/700.css',
		'@mdi/font/css/materialdesignicons.css',
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
		defaultLocale: 'en',
		lazy: true,
		compilation: {
			strictMessage: false,
		},
		customRoutes: 'config',
		pages: {
			'privacy-policy': {
				en: 'privacy-policy',
				de: 'datenschutzerklaerung',
			},
		},
	},

	tailwindcss: {
		exposeConfig: true,
		injectPosition: 'last',
	},

	// https://nuxt.com/modules/nuxt-vuetify
	vuetify: {
		/* vuetify options */
		vuetifyOptions: {
			theme: {
				defaultTheme: 'light',
				themes: {
					light: {
						dark: false,
						colors: {
							surface: theme.colors.primary[100],
							background: '#ffffff',
							primary: theme.colors.primary.DEFAULT,
							'primary-light': theme.colors.primary.light,
							'primary-dark': theme.colors.primary.dark,
							secondary: theme.colors.neutral.DEFAULT,
							'secondary-light': theme.colors.neutral.light,
							'secondary-dark': theme.colors.neutral.dark,
						},
					},
					dark: {
						dark: true,
						colors: {
							surface: '#1a2128',
							background: '#191919',
							'on-surface-variant': '#1a2128',
							primary: theme.colors.primary.DEFAULT,
							secondary: '#4d4d4d',
							'secondary-light': '#777777',
							'secondary-dark': theme.colors.neutral.dark,
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
					// variant: 'default'
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
		},

		moduleOptions: {
			/* nuxt-vuetify module options */
			treeshaking: true,
			useIconCDN: false,

			/* vite-plugin-vuetify options */
			styles: true,
			autoImport: true,
			useVuetifyLabs: false,
		},
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
