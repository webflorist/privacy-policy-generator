export {}

declare global {
	type Numerus = 'singular' | 'plural'
	type GeneralSettings = {
		numerus: Numerus
	}
	type DataController = {
		organisation?: string|null
		name?: string|null
		address: string|null
		email: string|null
		phone: string|null
	}
	type GeneratorSettings = {
		general: GeneralSettings
		dataController: DataController
	}
}
