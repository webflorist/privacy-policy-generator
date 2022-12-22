export const useSettings = () => {
	const { locale } = useI18n()
	return useState<GeneratorSettings>('settings', () => {
		return {
			general: {
				numerus: 'plural',
				language: locale.value,
			},
			dataController: {
				organisation: null,
				name: null,
				address: null,
				email: null,
				phone: null,
			},
			dataProcessings: {
				webhosting: [],
				analytics: [],
				maps: [],
				emails: [],
				payment: [],
				advertising: [],
				booking: [],
			},
			processors: [],
		}
	})
}
