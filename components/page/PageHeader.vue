<script setup lang="ts">
import { useTheme } from 'vuetify'
const { locale: currentLocale, locales: availableLocales } = useI18n()
const theme = useTheme()
const switchLocalePath = useSwitchLocalePath()
const toggleTheme = () =>
	(theme.global.name.value = theme.global.current.value.dark
		? 'light'
		: 'dark')

const themeIcon = computed(() =>
	theme.global.name.value === 'light'
		? 'mdi-weather-sunny'
		: 'mdi-weather-night'
)
</script>

<template>
	<v-app-bar tag="header" :elevation="2" border="b">
		<template v-slot:prepend>
			<v-app-bar-nav-icon>
				<a href="https://github.com/webflorist" class="no-style">
					<span class="sr-only">Webflorist</span>
					<img
						alt="Webflorist logo"
						src="/webflorist.svg"
						class="w-10"
					/>
				</a>
			</v-app-bar-nav-icon>
		</template>
		<template v-slot:append>
			<v-btn :icon="themeIcon" @click="toggleTheme"></v-btn>
			<v-divider vertical class="mx-3"></v-divider>
			<v-btn-toggle
				mandatory
				divided
				class="relative z-0 inline-flex"
				color="primary"
			>
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
