<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { setLocale } from '@vee-validate/i18n'
/* useMetaTags()
useFavicons() */

const theme = useTheme()
theme.global.name.value = 'dark'

useHead({
	htmlAttrs: {
		class: [theme.global.name],
	},
})

onMounted(() => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		theme.global.name.value = 'dark'
	} else {
		theme.global.name.value = 'light'
	}
})
</script>
<template>
	<v-app>
		<PageHeader />
		<div>
			<NuxtPage />
		</div>
		<PageFooter />
	</v-app>
</template>
