import { useTheme } from 'vuetify'
export const useColorTheme = () => {
	const theme = useTheme()
	theme.global.name.value = 'dark'

	useHead({
		htmlAttrs: {
			class: [theme.global.name],
		},
	})

	onMounted(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme.global.name.value = 'dark'
		} else {
			theme.global.name.value = 'light'
		}
	})
}
