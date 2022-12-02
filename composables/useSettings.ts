export const useSettings = () => {
	return useState<GeneratorSettings>('settings', () => {
		return {
			numerus: 'plural',
			dataController: {
				organisation: null,
				name: null,
				address: null,
				email: null,
				phone: null,
			},
		}
	})
}
