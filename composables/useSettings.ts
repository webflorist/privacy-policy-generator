export const useSettings = () => {
	const { locale } = useI18n()
	return useState<GeneratorSettings>('settings', () => {
		return {
			general: {
				language: locale.value,
			},
			dataController: {
				organization: undefined,
				name: undefined,
				street: undefined,
				zip: undefined,
				city: undefined,
				country: undefined,
				email: undefined,
				phone: undefined,
			},
			dataProcessings: {
				webhosting: [],
				analytics: [],
				maps: [],
				videos: [],
				emails: [],
				payment: [],
				advertising: [],
				booking: [],
			},
		}
	})
}
