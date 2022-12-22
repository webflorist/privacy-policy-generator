export {}

declare global {
	type Numerus = 'singular' | 'plural'
	type Language =  'de' | 'en'
	type GeneralSettings = {
		numerus: Numerus
		language: Language
	}
	type DataController = {
		organisation?: string|null
		name?: string|null
		address: string|null
		email: string|null
		phone: string|null
	}
	type Processor = {
		name: string
		street: string
		zip: string
		city: string
		county?: string
		country: string
		privacyPolicyUrl: string
	}
	type GeneratorSettings = {
		general: GeneralSettings
		dataController: DataController
		processors: Processor[]
	}
}
