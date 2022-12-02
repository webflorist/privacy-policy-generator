export {}

declare global {
	type Numerus = 'singular' | 'plural'
	type DataController = {
		organisation?: string
		name?: string
		address: string
		email: string
		phone: string
	}
	type GeneratorSettings = {
		numerus: Numerus
		dataController: DataController
	}
}
