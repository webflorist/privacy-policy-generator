export {}

declare global {
	type Numerus = 'singular' | 'plural'

	type Language = 'de' | 'en'

	type GeneralSettings = {
		numerus: Numerus
		language: Language
	}

	type DataController = {
		organisation?: string | null
		name?: string | null
		address: string | null
		email: string | null
		phone: string | null
	}

	type Processor = {
		id: string
		name: string
		street: string
		zip: string
		city: string
		country: string
		privacy_policy_url: string
		processing_categories?: DataProcessingCategory[]
		data_categories?: DataCategory[]
	}

	type DataCategory =
		| 'geo' // Geolocation data
		| 'personal' // Personally identifiable data - like name, phone, e-mail, address
		| 'sensitive' // Sensitive personal information - like sexual orientation, racial or ethnic origin, medical or financial information
		| 'payment' // Payment data - like credit card or bank account info
		| 'online' // Online identifiers - like IP/MAC address, cookies, advertising IDs, pixel tags, device fingerprints.
		| 'usage' // Usage data (e.g. which, when and how long webpages were visited)
		| 'pseudonymized' // Personal information, that was anonymized (e.g. by hashing a IP-address), but can still be identified with additional information.

	type DataProcessingCategory =
		| 'webhosting' // Hosting of websites and associated services and assets (e.g. databases, images, etc.)
		| 'analytics' // Usage analytics, statistics and tracking
		| 'maps' // Display of interactive maps, route planning, etc.
		| 'emails' // Sending of e-mails (e.g. via contact forms)
		| 'payment' // Processing of payment transactions
		| 'advertising' // Display of targeted advertisements
		| 'booking' // Booking of places or services

	type CookieWrittenOn =
		| 'every_visit' // Cookie is written automatically on every visit (e.g. session cookies).
		| 'service_usage' // Cookie is only written, when using the associated service (e.g. interactive maps, analytics, payment, etc.)

	type CookieDuration = number | 'various'

	type CookiePurpose =
		| 'session' // Cookie is used to store session related data (e.g. authentication).
		| 'security' // Cookie is for security purposes (e.g. used prevent "Cross-Site Request Forgery" attacks).
		| 'gdpr_choice' // Cookie is used to save the user's choice(s) of the GDPR/cookie-dialog.
		| 'settings' // Cookie is used to store user-settings (e.g. language or display mode).
		| 'service' // Cookie is used to provide the service associated with it.

	type Cookie = {
		name: string // Name of the cookie(s)
		writtenOn: CookieWrittenOn // When is the cookie created?
		duration?: CookieDuration // How long is the cookie valid?
		purpose: CookiePurpose // What is the purpose of the cookie?
		thirdParty: boolean // Is this cookie set by a third-party service?
	}

	type DataProcessing = {
		processor: Processor // The processor
		required: boolean // Is this processing is technically required for the website's basic functionality?
		service: string | null // Name of the service (e.g. "Google Analytics")
		dataCategories: DataCategory[] // The processed data categories
		cookies?: Cookie[] // Cookie(s) associated with this data-processing
	}

	type GeneratorSettings = {
		general: GeneralSettings
		dataController: DataController
		dataProcessings: Record<DataProcessingCategory, DataProcessing[]>
	}
}
