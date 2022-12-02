<script setup lang="ts">
const { locale: currentLocale, locales: availableLocales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
	<header class="bg-gray-50 py-5">
		<div class="container flex justify-between">
			<a href="https://github.com/webflorist" class="no-style">
				<span class="sr-only">Webflorist</span>
				<img alt="Webflorist logo" src="/webflorist.svg" class="w-10" />
			</a>
			<nav class="p-buttonset relative z-0 inline-flex">
				<NuxtLink
					v-for="locale in availableLocales"
					:key="locale.code"
					:to="switchLocalePath(locale.code)"
					class="p-button p-component"
					:class="
						currentLocale === locale.code
							? ''
							: 'p-button-outlined'
					"
					>{{ locale.name }}</NuxtLink
				>
			</nav>
		</div>
	</header>
</template>
