export const useMetaTags = () => {
	const siteMeta = useRuntimeConfig().public.siteMeta
	const route = useRoute()
	const pageUrl = computed(() => siteMeta.url + route.path.replace(/\/$/, ''))
	const { locale: currentLocale } = useI18n()

	const pageTitle = computed(() => {
		if (route.meta.fullTitle) {
			return route.meta.fullTitle
		}
		if (route.meta.title) {
			return route.meta.title + ' - ' + siteMeta.title
		}
		return siteMeta.title
	})

	const pageDescription = computed(() => {
		if (route.meta.description) {
			return route.meta.description
		}
		return siteMeta.description
	})

	const pageImage = computed(() => {
		if (route.meta.image) {
			return route.meta.image
		}
		return siteMeta.image
	})

	const breadcrumbs = computed(() => {
		const breadcrumbs = []

		if (route.meta.breadcrumbs?.length > 0) {
			for (let i = 0; i < route.meta.breadcrumbs.length; i++) {
				const breadcrumbItem = route.meta.breadcrumbs[i]
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

	const pageSchema = computed(() => {
		return JSON.stringify({
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
				: []),
		})
	})

	const imageSchema = computed(() => {
		return JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'ImageObject',
			'@id': pageUrl.value + '/#primaryimage',
			url: pageImage.value,
		})
	})

	const robots = computed(() => {
		if (route.meta.noRobots) {
			return 'noindex,nofollow'
		}
		return 'index,follow'
	})

	useHead({
		title: pageTitle,
		htmlAttrs: {
			lang: currentLocale,
		},
		meta: [
			...('geo' in siteMeta
				? [
						{
							name: 'geo.region',
							content: siteMeta.geo.region,
						},
						{
							name: 'geo.placename',
							content: siteMeta.geo.placename,
						},
						{
							name: 'geo.position',
							content:
								siteMeta.geo.latitude +
								';' +
								siteMeta.geo.longitude,
						},
						{
							name: 'ICBM',
							content:
								siteMeta.geo.latitude +
								', ' +
								siteMeta.geo.longitude,
						},
				  ]
				: []),
			{
				hid: 'description',
				name: 'description',
				content: pageDescription,
			},
			{
				hid: 'robots',
				name: 'robots',
				content: robots,
			},
			// Facebook Meta Tags
			{
				hid: 'og:url',
				property: 'og:url',
				content: pageUrl,
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:site_name', content: siteMeta.title },
			{ property: 'og:locale', content: 'de_DE' },
			{
				hid: 'og:title',
				property: 'og:title',
				content: pageTitle,
			},
			{
				hid: 'og:description',
				property: 'og:description',
				content: pageDescription,
			},
			{
				hid: 'og:image',
				property: 'og:image',
				content: pageImage,
			},

			// Twitter Meta Tags
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
			{
				hid: 'twitter:image',
				name: 'twitter:image',
				content: pageImage,
			},
			{
				name: 'apple-mobile-web-app-title',
				content: siteMeta.title,
			},
			{
				name: 'application-name',
				content: siteMeta.title,
			},
		],
		link: [
			{
				rel: 'canonical',
				href: pageUrl,
			},
		],
		script: [
			{
				hid: 'SchemaWebSite',
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					'@id': siteMeta.url + '/#website',
					url: siteMeta.url,
					name: siteMeta.title,
				}),
			},

			{
				hid: 'SchemaWebPage',
				type: 'application/ld+json',
				children: pageSchema,
			},
			{
				hid: 'SchemaImageObject',
				type: 'application/ld+json',
				children: imageSchema,
			},
			...('organization' in siteMeta
				? [
						{
							hid: 'SchemaOrganization',
							type: 'application/ld+json',
							children: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'Organization',
								name: siteMeta.organization.name,
								legalName: siteMeta.organization.legalName,
								address: {
									'@type': 'PostalAddress',
									addressCountry:
										siteMeta.organization.address
											.addressCountry,
									addressLocality:
										siteMeta.organization.address
											.addressLocality,
									postalCode:
										siteMeta.organization.address
											.postalCode,
									streetAddress:
										siteMeta.organization.address
											.streetAddress,
								},
								geo: {
									'@type': 'GeoCoordinates',
									latitude:
										siteMeta.organization.geo.latitude,
									longitude:
										siteMeta.organization.geo.longitude,
								},
								image: [siteMeta.image],
								logo: siteMeta.organization.logo,
								email: siteMeta.organization.email,
								url: siteMeta.url,
								telephone: siteMeta.organization.telephone,
								faxNumber: siteMeta.organization.faxNumber,
								sameAs: siteMeta.organization.sameAs,
							}),
						},
				  ]
				: []),
		],
	})
}
