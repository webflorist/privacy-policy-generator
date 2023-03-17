<script setup lang="ts">
import { useTheme } from 'vuetify'
const { locale: currentLocale, locales: availableLocales } = useI18n()
const theme = useTheme()
const switchLocalePath = useSwitchLocalePath()
const toggleTheme = () =>
	(theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')

const themeIcon = computed(() =>
	theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
)
</script>

<template>
	<v-app-bar tag="header" :elevation="2" border="b">
		<template #prepend>
			<v-app-bar-nav-icon>
				<NuxtLink
					:to="'/' + currentLocale"
					class="no-style"
					:title="$t('general.back-to-home')"
				>
					<span class="sr-only">{{ $t('general.back-to-home') }}</span>
					<img :alt="$t('images.favicon.alt')" src="/favicon.svg" class="w-32" />
				</NuxtLink>
			</v-app-bar-nav-icon>
		</template>
		<template #append>
			<v-btn :icon="themeIcon" @click="toggleTheme"></v-btn>
			<v-divider vertical class="mx-3"></v-divider>
			<v-btn-toggle mandatory divided class="relative z-0 inline-flex" color="primary">
				<v-btn
					v-for="locale in availableLocales"
					:key="locale.code"
					:to="switchLocalePath(locale.code)"
					>{{ locale.name }}</v-btn
				>
			</v-btn-toggle>
		</template>
	</v-app-bar>
</template>
