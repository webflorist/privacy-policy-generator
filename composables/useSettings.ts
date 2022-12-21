export const useSettings = () => {
	return useState<GeneratorSettings>('settings', () => {
		return {
			general: {
				numerus: 'plural',
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
			}
		}
	})
}
