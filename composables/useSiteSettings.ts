export const useSiteSettings = () => {
	type SiteSettings = {
		baseUrl: string
		localeTitle: Record<string, string>
		localeDescription: Record<string, string>
		image?: string
		siteTag: string
		authorTag: string
	}

	const siteSettings = useState<SiteSettings>('siteSettings', (): SiteSettings => {
		return {
			baseUrl: 'https://privacy-policy-generator.web.florist',
			siteTag: '@privacy-policy-generator',
			authorTag: '@webflorist',
			localeTitle: {
				de: ' Datenschutzgenerator - webflorist',
				en: 'Privacy Policy Generator - webflorist',
			},
			localeDescription: {
				de: 'Generator für eine lizenzfreie Datenschutz­erklärung in verschiedenen Sprachen. Einfach, schnell und kostenlos.',
				en: 'Generator for a licence-free privacy policy in different languages. Simple, fast and free of charge.',
			},
		}
	})

	return {
		siteSettings,
	}
}
