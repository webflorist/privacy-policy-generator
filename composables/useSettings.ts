export const useSettings = () => {
	const { locale } = useI18n()
	return useState<GeneratorSettings>('settings', () => {
		return {
			general: {
				numerus: 'plural',
				language: locale.value,
			},
			dataController: {
				organisation: undefined,
				name: undefined,
				address: undefined,
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
