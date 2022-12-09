<script setup lang="ts">
const { locale: currentLocale, locales: availableLocales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
	<header class="bg-gray-50 py-5">
		<div class="container container-padding flex justify-between">
			<a href="https://github.com/webflorist" class="no-style">
				<span class="sr-only">Webflorist</span>
				<img alt="Webflorist logo" src="/webflorist.svg" class="w-10" />
			</a>
			<v-btn-toggle mandatory divided class="relative z-0 inline-flex" color="primary">
				<v-btn
					v-for="locale in availableLocales"
					:key="locale.code"
					:to="switchLocalePath(locale.code)"
					>{{ locale.name }}</v-btn
				>
			</v-btn-toggle>
		</div>
	</header>
</template>
