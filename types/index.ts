export {}

declare global {
	type Language = 'de' | 'en'

	type LocaleString = Record<Language, string>

	type GeneralSettings = {
		language: Language
	}

	type FormOption = {
		title: string
		value: string
		hint?: string
	}

	type FormOptions = FormOption[]

	type DataController = {
		organisation?: string
		name?: string
		street: string
		zip: string
		city: string
		country: string
		email: string
		phone?: string
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
		| 'videos' // Embedding of videos
		| 'emails' // Sending of e-mails (e.g. via contact forms)
		| 'payment' // Processing of payment transactions
		| 'advertising' // Display of targeted advertisements
		| 'booking' // Booking of places or services

	type Processor = {
		id: string
		name: string
		street: string
		zip: string
		city: string
		country: string
		privacy_policy_url: string
		dpf_url?: string
		processing_categories?: DataProcessingCategory[]
		data_categories?: DataCategory[]
	}

	type BrowserStoreType = 'cookie' | 'local_storage' | 'session_storage' | 'indexed_db'

	type BrowserStoreWrittenOn =
		| 'every_visit' // BrowserStore is written automatically on every visit (e.g. session cookies).
		| 'service_usage' // BrowserStore is only written, when using the associated service (e.g. interactive maps, analytics, payment, etc.)

	type CookieDuration = number | 'various'

	type BrowserStorePurpose =
		| 'session' // Entry is used to store session related data (e.g. authentication).
		| 'security' // Entry is for security purposes (e.g. used prevent "Cross-Site Request Forgery" attacks).
		| 'gdpr_choice' // Entry is used to save the user's choice(s) of the GDPR/cookie-dialog.
		| 'settings' // Entry is used to store user-settings (e.g. language or display mode).
		| 'service' // Entry is used to provide the service associated with it.

	type BrowserStore = {
		name: string // Name of the cookie(s)
		type: BrowserStoreType // Type of Browser Storage
		writtenOn: BrowserStoreWrittenOn // When is the entry created?
		duration?: CookieDuration // How long is the cookie valid?
		purpose: BrowserStorePurpose // What is the purpose of the entry?
		thirdParty: boolean // Is this entry set by a third-party service/domain?
	}

	type DataProcessingPurposeWebhosting =
		| 'documents' // HTML-documents
		| 'stylesheets' // Stylesheets
		| 'fonts' // Fonts
		| 'images' // Images
		| 'videos' // Videos
		| 'scripts' // Scripts
		| 'cdn' // CDN
		| 'database' // Database

	type DataProcessingPurposeEmails =
		| 'newsletter' // Newsletter
		| 'transactional_mails' // Transactional Mails
		| 'contact_form' // Contact Forms
		| 'application_form' // Application Forms
		| 'registration_form' // Application Forms

	type DataProcessingPurpose = DataProcessingPurposeWebhosting | DataProcessingPurposeEmails

	type DataProcessing = {
		processor: Processor // The processor
		required: boolean // Is this processing is technically required for the website's basic functionality?
		service?: string | LocaleString // Name of the service (e.g. "Google Analytics")
		dataCategories: DataCategory[] // The processed data categories
		purposes?: DataProcessingPurpose[] // Purposes of the data processing (depending on category)
		browserStore?: BrowserStore[] // BrowserStore(s) associated with this data-processing
	}

	type GeneratorSettings = {
		general: GeneralSettings
		dataController: DataController
		dataProcessings: Record<DataProcessingCategory, DataProcessing[]>
	}
}
