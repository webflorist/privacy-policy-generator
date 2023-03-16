<script setup lang="ts">
import PrivacyPolicy from '@webflorist/privacy-policy-vue'

const { locale: currentLocale } = useI18n()

const settings = useSettings()

const hasWebhostingProcessing = computed(() => settings.value.dataProcessings.webhosting.length > 0)

const hasErrors = computed(() => !hasWebhostingProcessing.value)
</script>

<template>
	<v-main>
		<v-container tag="section">
			<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl">
				<span class="block">{{ $t('h1.line1') }}</span>
				{{ ' ' }}
				<span class="block text-4xl text-primary-600 sm:text-6xl">{{
					$t('h1.line2')
				}}</span>
			</h1>
			<div class="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
				<p v-html="$t('intro.p1')" />
				<p class="mt-3" v-html="$t('intro.p2')" />
				<p class="mt-3" v-html="$t('intro.p3')" />
			</div>
		</v-container>
		<GeneratorSettings />
		<v-divider></v-divider>
		<v-container v-if="hasErrors">
			<v-alert v-if="!hasWebhostingProcessing" type="error">
				{{ $t('errors.missing-webhosting-data-processing') }}
			</v-alert>
		</v-container>
		<v-container v-else>
			<h1>{{ $t('privacy_policy') }}</h1>
			<!--PrivacyPolicy
				:singular="settings.general.numerus === 'singular'"
				:locale="currentLocale"
				:data-controller="{
					organisation: settings.dataController.organisation,
					name: settings.dataController.name,
					address: settings.dataController.address,
					email: settings.dataController.email,
					phone: settings.dataController.phone,
				}"
				:cookies="cookies"
				:data-processing="dataProcessing"
			/-->
		</v-container>
	</v-main>
</template>
