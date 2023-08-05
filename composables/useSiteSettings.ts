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
			baseUrl: 'https://privacy-policy.web.florist',
			siteTag: '@privacy-policy-generator',
			authorTag: '@webflorist',
			localeTitle: {
				de: 'Datenschutzgenerator',
				en: 'Privacy Policy Generator',
			},
			localeDescription: {
				de: 'Datenschutzgenerator',
				en: 'Privacy Policy Generator',
			},
		}
	})

	return {
		siteSettings,
	}
}
