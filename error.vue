<script setup lang="ts">
defineProps({
	error: Object,
})
useColorTheme()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
	<NuxtLayout>
		<v-main>
			<v-container tag="section" class="pt-16 text-center">
				<div class="mx-auto mb-12 max-w-3xl flex-row items-center justify-center md:flex">
					<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-left">
						<span class="block">404</span>
						{{ ' ' }}
						<span
							class="block text-4xl text-primary-100 drop-shadow-primary dark:text-primary-500 sm:text-6xl"
							>{{ $t('errors.page-not-found') }}</span
						>
					</h1>
				</div>
				<div
					class="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
				>
					<p>
						<button class="link" @click="handleError">Zurück zur Startseite</button>
					</p>
				</div>
			</v-container>
		</v-main>
	</NuxtLayout>
</template>
