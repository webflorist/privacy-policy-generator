export const useDataProcessingPresets = () => {
	const defaultProcessors = useDefaultProcessors()
	const durationOptions = useDurationOptions()

	const webhosting: DataProcessing[] = [
		{
			processor: defaultProcessors.find((processor) => processor.id === 'cloudflare_inc_us'),
			required: true,
			service: 'Cloudflare CDN',
			dataCategories: ['online', 'usage'],
			purposes: ['cdn'],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'storyblok_gmbh_at'),
			required: true,
			service: 'Storyblok CMS',
			dataCategories: ['online', 'usage'],
			purposes: ['images'],
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
			browserStore: [
				{
					name: '_ga',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['2_years'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '_gat',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['24_hours'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '_gid',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: 1,
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'innocraft_ltd_nz'),
			required: false,
			service: 'Matomo Cloud',
			dataCategories: ['online', 'usage', 'geo', 'pseudonymized'],
			browserStore: [
				{
					name: '_pk_id.*',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['13_months'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: '_pk_ref.*',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['6_months'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: '_pk_ses.*, _pk_cvar.*, _pk_hsr.*',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: 30,
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: '_pk_testcookie',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: 0,
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: 'mtm_consent, mtm_consent_removed, mtm_cookie_consent',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['30_years'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: 'matomo_ignore',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['30_years'],
					purpose: 'service',
					thirdParty: false,
				},
				{
					name: 'matomo_sessid',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['2_weeks'],
					purpose: 'service',
					thirdParty: false,
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

	const tagmanager: DataProcessing[] = [
		{
			processor: defaultProcessors.find(
				(processor) => processor.id === 'google_ireland_limited_ie'
			),
			required: false,
			service: 'Google Tag Manager',
			dataCategories: ['online', 'usage'],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'innocraft_ltd_nz'),
			required: false,
			service: 'Matomo Cloud Tag Manager',
			dataCategories: ['online', 'usage'],
		},
	]

	const maps: DataProcessing[] = [
		{
			processor: defaultProcessors.find((processor) => processor.id === 'google_llc_us'),
			required: false,
			service: 'Google Maps',
			dataCategories: ['online', 'geo'],
			browserStore: [
				{
					name: 'DV',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: 7,
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '1P_JAR, OTZ',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['1_month'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'NID',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['6_months'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'CONSENT, __Secure-ENID, AEC, OGPC',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['3_months'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'SAPISID, APISID, SSID, HSID, SID, SIDCC, __Secure-*',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['1_year'],
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
	]
	const videos: DataProcessing[] = [
		{
			processor: defaultProcessors.find((processor) => processor.id === 'google_llc_us'),
			required: false,
			service: 'YouTube',
			dataCategories: ['online', 'geo'],
			browserStore: [
				{
					name: 'DV',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: 7,
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '1P_JAR, OTZ',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['1_month'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'NID',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['6_months'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'CONSENT, __Secure-ENID, AEC, OGPC',
					type: 'cookie',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'SAPISID, APISID, SSID, HSID, SID, SIDCC, __Secure-*',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['1_year'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'yt-remote-device-id, yt-remote-connected-devices, yt.innertube::nextId, yt.innertube::requests',
					type: 'local_storage',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'yt-remote-session-app, yt-remote-cast-installed, yt-remote-session-name, yt-remote-cast-available, yt-remote-fast-check-period',
					type: 'session_storage',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'YtIdbMeta',
					type: 'indexed_db',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
			],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'vimeo_com_inc_us'),
			required: false,
			service: 'Vimeo',
			dataCategories: ['online', 'geo'],
			browserStore: [
				{
					name: 'sync_active',
					type: 'local_storage',
					writtenOn: 'service_usage',
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'vuid',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['13_months'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: '__cf_bm',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['24_hours'],
					purpose: 'service',
					thirdParty: true,
				},
				{
					name: 'player',
					type: 'cookie',
					writtenOn: 'service_usage',
					duration: durationOptions['13_months'],
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
			processor: defaultProcessors.find((processor) => processor.id === 'brevo_sas_fr'),
			required: false,
			service: 'Transactional Email',
			dataCategories: ['personal'],
			purposes: ['transactional_mails'],
		},
		{
			processor: defaultProcessors.find((processor) => processor.id === 'brevo_sas_fr'),
			required: false,
			service: 'Marketing Platform',
			dataCategories: ['personal'],
			purposes: ['newsletter'],
		},
	]
	const payment: DataProcessing[] = []
	const advertising: DataProcessing[] = []
	const booking: DataProcessing[] = []

	return {
		webhosting,
		analytics,
		tagmanager,
		maps,
		videos,
		emails,
		payment,
		advertising,
		booking,
	}
}
