export const useDefaultProcessors = (): Processor[] => {
	const processors: Processor[] = [
		{
			id: 'google_ireland_limited_ie',
			name: 'Google Ireland Limited',
			street: 'Gordon House, Barrow Street',
			zip: 'D4',
			city: 'Dublin',
			country: 'IE',
			privacy_policy_url: 'https://policies.google.com/privacy',
		},
		{
			id: 'google_llc_us',
			name: 'Google LLC',
			street: '1600 Amphitheatre Parkway',
			zip: 'CA 94043',
			city: 'Mountain View',
			country: 'US',
			privacy_policy_url: 'https://policies.google.com/privacy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt000000001L5AAI&status=Active',
		},
		{
			id: 'twilio_ireland_limited_ie',
			name: 'Twilio Ireland Limited',
			street: '25-28 North Wall Quay',
			zip: 'D1',
			city: 'Dublin',
			country: 'IE',
			privacy_policy_url: 'https://www.twilio.com/legal/privacy',
		},
		{
			id: 'twilio_inc_us',
			name: 'Twilio Inc.',
			street: '375 Beale Street, Suite 300',
			zip: 'CA 94105',
			city: 'San Francisco',
			country: 'US',
			privacy_policy_url: 'https://www.twilio.com/legal/privacy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000TNLbAAO&status=Active',
		},
		{
			id: 'netlify_inc_us',
			name: 'Netlify Inc.',
			street: '2325 3rd Street, Suite 296',
			zip: 'CA 94107',
			city: 'San Francisco',
			country: 'US',
			privacy_policy_url: 'https://www.netlify.com/privacy/',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt00000008RhTAAU&status=Active',
		},
		{
			id: 'stripe_inc_us',
			name: 'Stripe Inc.',
			street: '185 Berry Street, Suite 550',
			zip: 'CA 94107',
			city: 'San Francisco',
			country: 'US',
			privacy_policy_url: 'https://stripe.com/privacy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000TQOUAA4&status=Active',
		},
		{
			id: 'storyblok_gmbh_at',
			name: 'Storyblok GmbH',
			street: 'Peter-Behrens-Platz 2',
			zip: '4020',
			city: 'Linz',
			country: 'AT',
			privacy_policy_url: 'https://www.storyblok.com/legal/privacy-policy',
		},
		{
			id: 'amazon_web_services_inc_us',
			name: 'Amazon Web Services Inc.',
			street: '410 Terry Avenue North',
			zip: 'WA 98109-5210',
			city: 'Seattle',
			country: 'US',
			privacy_policy_url: 'https://aws.amazon.com/privacy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000TOWQAA4&status=Active',
		},
		{
			id: 'paypal_europe_sarl_et_cie_lu',
			name: 'PayPal (Europe) S.a.r.l. et Cie',
			street: 'S.C.A., 22-24 Boulevard Royal',
			zip: 'L-2449',
			city: 'Luxembourg',
			country: 'LU',
			privacy_policy_url: 'https://www.paypal.com/webapps/mpp/ua/privacy-full',
		},
		{
			id: 'domaintechnik_ledl_net_gmbh_at',
			name: 'Domaintechnik - Ledl.net GmbH',
			street: 'Lederergasse 6',
			zip: '5204',
			city: 'Straßwalchen',
			country: 'AT',
			privacy_policy_url: 'https://www.domaintechnik.at/datenschutzerklaerung.html',
		},
		{
			id: 'host_europe_gmbh_de',
			name: 'Host Europe GmbH',
			street: 'c/o WeWork, Friesenplatz 4',
			zip: '50672',
			city: 'Köln',
			country: 'DE',
			privacy_policy_url: 'https://www.hosteurope.de/AGB/Datenschutzerklaerung/',
		},
		{
			id: 'domainfactory_gmbh_de',
			name: 'Domainfactory GmbH',
			street: 'c/o WeWork, Neuturmstrasse 5',
			zip: '80331',
			city: 'München',
			country: 'DE',
			privacy_policy_url: 'https://www.df.eu/de/datenschutz/',
		},
		{
			id: 'cloudflare_inc_us',
			name: 'Cloudflare, Inc.',
			street: '101 Townsend St.',
			zip: 'CA 94107',
			city: 'San Francisco',
			country: 'US',
			privacy_policy_url: 'https://www.cloudflare.com/privacypolicy/',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000GnZKAA0&status=Active',
		},
		{
			id: 'ud_media_gmbh_de',
			name: 'UD Media GmbH',
			street: 'Kölner Straße 28',
			zip: '41812',
			city: 'Erkelenz',
			country: 'DE',
			privacy_policy_url: 'https://udmedia.de/service/datenschutz/',
		},
		{
			id: 'brevo_sas_fr',
			name: 'Brevo SAS',
			street: '106 boulevard Haussmann',
			zip: '75008',
			city: 'Paris',
			country: 'FR',
			privacy_policy_url: 'https://www.brevo.com/de/legal/privacypolicy/',
		},
		{
			id: 'meta_platforms_inc_us',
			name: 'Meta Platforms, Inc.',
			street: '1601 Willow Rd',
			zip: 'CA 94025',
			city: 'Menlo Park',
			country: 'US',
			privacy_policy_url: 'https://www.facebook.com/privacy/policy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000GnywAAC&status=Active',
		},
		{
			id: 'tiktok_technology_limited_ie',
			name: 'TikTok Technology Limited',
			street: '10 Earlsfort Terrace',
			zip: 'D02 T380',
			city: 'Dublin',
			country: 'IE',
			privacy_policy_url: 'https://www.tiktok.com/legal/privacy-policy',
		},
		{
			id: 'innocraft_ltd_nz',
			name: 'InnoCraft Ltd',
			street: '7 Waterloo Quay PO625',
			zip: '6140',
			city: 'Wellington',
			country: 'NZ',
			privacy_policy_url: 'https://matomo.org/privacy-policy/',
		},
		{
			id: 'vimeo_com_inc_us',
			name: 'Vimeo.com, Inc.',
			street: '330 West 34th Street, 5th Floor',
			zip: '10001',
			city: 'New York',
			country: 'US',
			privacy_policy_url: 'https://vimeo.com/privacy',
			dpf_url:
				'https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt00000008V77AAE&status=Active',
		},
		{
			id: 'getresponse_pl',
			name: 'GetResponse S.A.',
			street: 'Grunwaldzka 413',
			zip: '80-309',
			city: 'Gdansk',
			country: 'PL',
			privacy_policy_url: 'https://www.getresponse.com/legal/privacy',
		},
		{
			id: 'elopage_de',
			name: 'elopage GmbH',
			street: 'Potsdamer Straße 125',
			zip: '10783',
			city: 'Berlin',
			country: 'DE',
			privacy_policy_url: 'https://elopage.com/privacy',
		},
	]
	return processors.sort((a: Processor, b: Processor) => a.name.localeCompare(b.name))
}
