<script setup lang="ts">
defineProps({
	error: Object,
})
useColorTheme()
const { locale: currentLocale, defaultLocale } = useI18n()

const homeLink = computed(() => {
	if (currentLocale.value === defaultLocale) {
		return '/'
	}
	return '/' + currentLocale.value
})
</script>

<template>
	<main class="typography">
		<div class="container-padding container my-16">
			<div class="m-default-lg text-center text-3xl md:text-4xl xl:text-5xl">
				<h1 v-if="error.statusCode === 404">404 - {{ $t('errors.page_not_found') }}</h1>
				<h1 v-else>{{ $t('errors.general_error') }}</h1>
			</div>
			<div class="m-default-lg text-center">
				<p>
					<a :href="homeLink" class="link">
						{{ $t('general.back_to_home') }}
					</a>
				</p>
			</div>
		</div>
	</main>
</template>
