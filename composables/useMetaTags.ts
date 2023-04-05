export const useMetaTags = () => {
	type GeoCoordinatesSchema = {
		latitude: string
		longitude: string
	}
	type PostalAddressSchema = {
		addressCountry: string
		addressLocality: string
		postalCode: string
		streetAddress: string
	}
	type OrganisationSchema = {
		name: string
		legalName: string
		address: PostalAddressSchema
		geo?: GeoCoordinatesSchema
		image?: string
		logo?: string
		email?: string
		telephone?: string
		faxNumber?: string
		sameAs?: string[]
	}
	type SiteMetaConfig = {
		url: string
		tag: string
		authorTag: string
		title?: string
		description?: string
		image?: string
		organization?: OrganisationSchema
	}

	type BreadcrumbItem = {
		title: string
		path: string
	}

	type RouteMetaOptions = {
		fullTitle?: string
		title?: string
		description?: string
		pageTranslationPath?: string
		image?: string
		breadcrumbs: BreadcrumbItem[]
		noRobots?: boolean
	}

	const routeMeta = computed<RouteMetaOptions>(() => route.meta)

	const siteMeta: SiteMetaConfig = useRuntimeConfig().public.siteMeta
	const route = useRoute()
	const pageUrl = computed(() => siteMeta.url + route.path.replace(/\/$/, ''))

	const { locale: currentLocale, t, te } = useI18n()

	const locale = computed(() => {
		return currentLocale.value
	})

	const siteTitle = computed<string>(() => {
		if (typeof siteMeta.title !== 'undefined') {
			return siteMeta.title
		}
		if (te('meta.site.title')) {
			return t('meta.site.title')
		}
		return pageUrl.value
	})

	const pageTitle = computed<string>(() => {
		if (typeof routeMeta.value.fullTitle !== 'undefined') {
			return routeMeta.value.fullTitle
		}
		if (typeof routeMeta.value.title !== 'undefined') {
			return routeMeta.value.title + ' - ' + siteTitle.value
		}
		if (typeof routeMeta.value.pageTranslationPath !== 'undefined') {
			if (te('meta.pages.' + routeMeta.value.pageTranslationPath + '.fullTitle')) {
				return t('meta.pages.' + routeMeta.value.pageTranslationPath + '.fullTitle')
			}
			if (te('meta.pages.' + routeMeta.value.pageTranslationPath + '.title')) {
				return (
					t('meta.pages.' + routeMeta.value.pageTranslationPath + '.title') +
					' - ' +
					siteTitle.value
				)
			}
		}
		return siteTitle.value
	})

	const siteDescription = computed<string>(() => {
		if (typeof siteMeta.description !== 'undefined') {
			return siteMeta.description
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
		if ('image' in siteMeta) {
			return siteMeta.image
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
						'@id': siteMeta.url + breadcrumbItem.path,
						url: siteMeta.url + breadcrumbItem.path,
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
					hid: 'description',
					name: 'description',
					content: pageDescription.value,
				},
				{
					hid: 'robots',
					name: 'robots',
					content: robots.value,
				},
				{
					hid: 'og:url',
					property: 'og:url',
					content: pageUrl.value,
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: siteTitle.value },
				{ property: 'og:locale', content: locale.value },
				{
					hid: 'og:title',
					property: 'og:title',
					content: pageTitle.value,
				},
				{
					hid: 'og:description',
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
				{ property: 'twitter:site', content: siteMeta.tag },
				{ property: 'twitter:creator', content: siteMeta.authorTag },
				{
					hid: 'twitter:url',
					property: 'twitter:url',
					content: pageUrl,
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: pageTitle,
				},
				{
					hid: 'twitter:description',
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
						hid: 'og:image',
						property: 'og:image',
						content: pageImage.value,
					},
					{
						hid: 'twitter:image',
						name: 'twitter:image',
						content: pageImage.value,
					},
				]
			)
		}
		return tags
	})

	const schemaTags = computed(() => {
		const tags = []

		tags.push(
			...[
				{
					hid: 'SchemaWebSite',
					type: 'application/ld+json',
					children: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'@id': siteMeta.url + '/#website',
						url: siteMeta.url,
						name: siteTitle.value,
					}),
				},

				{
					hid: 'SchemaWebPage',
					type: 'application/ld+json',
					children: JSON.stringify({
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
				hid: 'SchemaImageObject',
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'ImageObject',
					'@id': pageUrl.value + '/#primaryimage',
					url: pageImage.value,
				}),
			})
		}

		if (typeof siteMeta.organization !== 'undefined') {
			tags.push({
				hid: 'SchemaOrganization',
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: siteMeta.organization.name,
					legalName: siteMeta.organization.legalName,
					address: {
						'@type': 'PostalAddress',
						addressCountry: siteMeta.organization.address.addressCountry,
						addressLocality: siteMeta.organization.address.addressLocality,
						postalCode: siteMeta.organization.address.postalCode,
						streetAddress: siteMeta.organization.address.streetAddress,
					},
					...(typeof siteMeta.organization.geo !== 'undefined'
						? {
								geo: {
									'@type': 'GeoCoordinates',
									latitude: siteMeta.organization.geo.latitude,
									longitude: siteMeta.organization.geo.longitude,
								},
						  }
						: {}),
					image: siteMeta.organization.image,
					logo: siteMeta.organization.logo,
					email: siteMeta.organization.email,
					url: siteMeta.url,
					telephone: siteMeta.organization.telephone,
					faxNumber: siteMeta.organization.faxNumber,
					sameAs: siteMeta.organization.sameAs,
				}),
			})
		}
	})

	useHead({
		title: pageTitle,
		htmlAttrs: {
			lang: currentLocale,
		},
		meta: metaTags,
		link: [
			{
				rel: 'canonical',
				href: pageUrl,
			},
		],
		script: schemaTags,
	})
}
