import * as yup from 'yup'
import { useForm } from 'vee-validate'
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
		}
	})
}
