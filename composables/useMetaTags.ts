export const useMetaTags = () => {
	type BreadcrumbItem = {
		title: string
		path: string
	}

	type RouteMetaOptions = {
		title?: string
		overrideTitleSchema?: boolean
		description?: string
		pageTranslationPath?: string
		image?: string
		breadcrumbs: BreadcrumbItem[]
		noRobots?: boolean
	}

	const routeMeta = computed<RouteMetaOptions>(() => route.meta)

	const route = useRoute()
	const { siteSettings } = useSiteSettings()
	const { locale: currentLocale, locales: availableLocales, t, te } = useI18n()
	const switchLocalePath = useSwitchLocalePath()

	const pageUrl = computed(() => siteSettings.value.baseUrl + route.path.replace(/\/$/, ''))

	const locale = computed(() => {
		return currentLocale.value
	})

	const siteTitle = computed<string>(() => {
		if (typeof siteSettings.value.localeTitle[currentLocale.value] !== 'undefined') {
			return siteSettings.value.localeTitle[currentLocale.value]
		}
		if (te('meta.site.title')) {
			return t('meta.site.title')
		}
		return pageUrl.value
	})

	const pageTitle = computed<string>(() => {
		let title = null
		if (typeof routeMeta.value.title !== 'undefined') {
			title = routeMeta.value.title
		} else if (
			typeof routeMeta.value.pageTranslationPath !== 'undefined' &&
			te('meta.pages.' + routeMeta.value.pageTranslationPath + '.title')
		) {
			title = t('meta.pages.' + routeMeta.value.pageTranslationPath + '.fullTitle')
		}
		if (title !== null) {
			if (routeMeta.value.overrideTitleSchema === true) {
				return title
			}
			return title + ' - ' + siteTitle.value
		}
		return siteTitle.value
	})

	const siteDescription = computed<string>(() => {
		if (typeof siteSettings.value.localeDescription[currentLocale.value] !== 'undefined') {
			return siteSettings.value.localeDescription[currentLocale.value]
		}
		if (te('meta.site.description')) {
			return t('meta.site.description')
		}
		return ''
	})

	const pageDescription = computed<string>(() => {
		if (typeof routeMeta.value.description !== 'undefined') {
			return routeMeta.value.description
		}
		if (
			typeof routeMeta.value.pageTranslationPath !== 'undefined' &&
			te('meta.pages.' + routeMeta.value.pageTranslationPath + '.description')
		) {
			return t('meta.pages.' + routeMeta.value.pageTranslationPath + '.description')
		}
		return siteDescription.value
	})

	const pageImage = computed(() => {
		if (typeof routeMeta.value.image !== 'undefined') {
			return routeMeta.value.image
		}
		if ('image' in siteSettings.value) {
			return siteSettings.value.image
		}
		return null
	})

	const breadcrumbs = computed(() => {
		const breadcrumbs = []

		if (routeMeta.value.breadcrumbs?.length > 0) {
			for (let i = 0; i < routeMeta.value.breadcrumbs.length; i++) {
				const breadcrumbItem = routeMeta.value.breadcrumbs[i]
				breadcrumbs.push({
					'@type': 'ListItem',
					position: i + 1,
					item: {
						'@type': 'WebPage',
						'@id': siteSettings.value.baseUrl + breadcrumbItem.path,
						url: siteSettings.value.baseUrl + breadcrumbItem.path,
						name: breadcrumbItem.title,
					},
				})
			}
		}

		return breadcrumbs
	})

	const robots = computed(() => {
		if (typeof routeMeta.value.noRobots !== 'undefined' && routeMeta.value.noRobots) {
			return 'noindex,nofollow'
		}
		return 'index,follow'
	})

	const metaTags = computed(() => {
		const tags = []

		// Default Tags
		tags.push(
			...[
				{
					key: 'description',
					name: 'description',
					content: pageDescription.value,
				},
				{
					key: 'robots',
					name: 'robots',
					content: robots.value,
				},
				{
					key: 'og:url',
					property: 'og:url',
					content: pageUrl.value,
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: siteTitle.value },
				{ property: 'og:locale', content: locale.value },
				{
					key: 'og:title',
					property: 'og:title',
					content: pageTitle.value,
				},
				{
					key: 'og:description',
					property: 'og:description',
					content: pageDescription.value,
				},
				{
					name: 'apple-mobile-web-app-title',
					content: siteTitle,
				},
				{
					name: 'application-name',
					content: siteTitle,
				},
			]
		)

		// Twitter Tags
		tags.push(
			...[
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ property: 'twitter:site', content: siteSettings.value.siteTag },
				{ property: 'twitter:creator', content: siteSettings.value.authorTag },
				{
					key: 'twitter:url',
					property: 'twitter:url',
					content: pageUrl,
				},
				{
					key: 'twitter:title',
					name: 'twitter:title',
					content: pageTitle,
				},
				{
					key: 'twitter:description',
					name: 'twitter:description',
					content: pageDescription,
				},
			]
		)

		// Image related tags (if present)
		if (pageImage.value) {
			tags.push(
				...[
					{
						key: 'og:image',
						property: 'og:image',
						content: pageImage.value,
					},
					{
						key: 'twitter:image',
						name: 'twitter:image',
						content: pageImage.value,
					},
				]
			)
		}
		return tags
	})

	const linkTags = computed(() => {
		const tags = []

		// Canonical Tag
		tags.push({
			rel: 'canonical',
			href: pageUrl,
		})

		// hreflang Tags
		for (const localeInfo of availableLocales.value) {
			tags.push({
				rel: 'alternate',
				hreflang: localeInfo.code,
				href: siteSettings.value.baseUrl + switchLocalePath(localeInfo.code),
			})
		}

		return tags
	})

	const schemaTags = computed(() => {
		const tags = []

		tags.push(
			...[
				{
					key: 'SchemaWebSite',
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'@id': siteSettings.value.baseUrl + '/#website',
						url: siteSettings.value.baseUrl,
						name: siteTitle.value,
					}),
				},

				{
					key: 'SchemaWebPage',
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						url: pageUrl.value,
						inLanguage: 'de-DE',
						name: pageTitle.value,
						description: pageDescription.value,
						...(breadcrumbs.value.length > 0
							? {
									breadcrumb: {
										'@type': 'BreadcrumbList',
										itemListElement: breadcrumbs.value,
									},
							  }
							: {}),
					}),
				},
			]
		)

		if (pageImage.value) {
			tags.push({
				key: 'SchemaImageObject',
				type: 'application/ld+json',
				innerHTML: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'ImageObject',
					'@id': pageUrl.value + '/#primaryimage',
					url: pageImage.value,
				}),
			})
		}

		return tags
	})

	useHead({
		title: pageTitle,
		htmlAttrs: {
			lang: currentLocale,
		},
		meta: metaTags,
		link: linkTags,
		script: schemaTags,
	})
}
