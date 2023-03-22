export const useDataProcessingPresets = () => {
	const defaultProcessors = useDefaultProcessors()
	const durationOptions = useDurationOptions()

	const webhosting: DataProcessing[] = [
		{
			processor: defaultProcessors.find((processor) => processor.id === 'cloudflare_inc_us'),
			required: true,
			service: 'Cloudflare CDN',
			dataCategories: ['online', 'usage'],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'storyblok_gmbh_at'),
			required: true,
			service: 'Storyblok CMS',
			dataCategories: ['online', 'usage'],
		},
	]

	const analytics: DataProcessing[] = [
		{
			processor: defaultProcessors.find(
				(processor) => processor.id === 'google_ireland_limited_ie'
			),
			required: false,
			service: 'Google Analytics',
			dataCategories: ['online', 'usage', 'geo', 'pseudonymized'],
			cookies: [
				{
					name: '_ga',
					writtenOn: 'service_usage',
					duration: durationOptions['2_years'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '_gat',
					writtenOn: 'service_usage',
					duration: durationOptions['24_hours'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '_gid',
					writtenOn: 'service_usage',
					duration: 1,
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
		{
			processor: defaultProcessors.find(
				(processor) => processor.id === 'meta_platforms_inc_us'
			),
			required: false,
			service: 'Meta-Pixel',
			dataCategories: ['online', 'usage', 'geo'],
			cookies: [
				{
					name: '_fbp',
					writtenOn: 'service_usage',
					duration: durationOptions['3_months'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: '_fbc',
					writtenOn: 'service_usage',
					duration: durationOptions['3_months'],
					purpose: 'service',
					thirdParty: false,
				},
			],
		},
		{
			processor: defaultProcessors.find(
				(processor) => processor.id === 'tiktok_technology_limited_ie'
			),
			required: false,
			service: 'TikTok Pixel',
			dataCategories: ['online', 'usage', 'geo'],
			cookies: [
				{
					name: '_ttp',
					writtenOn: 'service_usage',
					duration: durationOptions['13_months'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: '_ttp',
					writtenOn: 'service_usage',
					duration: durationOptions['13_months'],
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
	]

	const maps: DataProcessing[] = [
		{
			processor: defaultProcessors.find((processor) => processor.id === 'google_llc_us'),
			required: false,
			service: 'Google Maps',
			dataCategories: ['online', 'geo'],
			cookies: [
				{
					name: 'DV',
					writtenOn: 'service_usage',
					duration: 7,
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '1P_JAR, OTZ',
					writtenOn: 'service_usage',
					duration: durationOptions['1_month'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'NID',
					writtenOn: 'service_usage',
					duration: durationOptions['6_months'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'CONSENT, __Secure-ENID, AEC, OGPC',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'SAPISID, APISID, SSID, HSID, SID, SIDCC, __Secure-*',
					writtenOn: 'service_usage',
					duration: durationOptions['1_year'],
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
	]
	const emails: DataProcessing[] = [
		{
			processor: defaultProcessors.find(
				(processor) => processor.id === 'amazon_web_services_inc_us'
			),
			required: false,
			service: 'Simple Email Service (SES)',
			dataCategories: ['personal'],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'sendinblue_sas_fr'),
			required: false,
			service: 'Transactional Email',
			dataCategories: ['personal'],
		},
	]
	const payment: DataProcessing[] = []
	const advertising: DataProcessing[] = []
	const booking: DataProcessing[] = []

	return {
		webhosting,
		analytics,
		maps,
		emails,
		payment,
		advertising,
		booking,
	}
}
