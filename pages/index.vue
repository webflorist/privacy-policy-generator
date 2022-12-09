<script setup lang="ts">
import PrivacyPolicy from '@webflorist/privacy-policy-vue'

const { locale: currentLocale } = useI18n()

const settings = useSettings()

const isSingular = computed(() => settings.value.numerus === 'singular')

const dataController = {
	organisation: 'Acme Corporation',
	name: 'John Doe',
	address: 'Acme Street 1, 123456 Acme City, USA',
	email: 'privacy@example.com',
	phone: '+1 555-0123',
}

let cookies = {
	first_party: [
		{
			name: 'session',
			purpose: 'session', // session | xsrf | hide_alert | analytics | maps | analytics_third_party | maps_third_party
			written_on: 'every_visit', // every_visit | hide_alert | maps | accept_cookies
			duration: 'end_of_session', // end_of_session | 1_year | 2_years | 24_hours | 1_minute | various
		},
	],
	third_party: [
		{
			name: '_ga, _gat, _gid',
			purpose: 'analytics_third_party',
			written_on: 'accept_cookies',
			duration: 'various',
			processor: 'google_eu',
			service: 'Google Analytics',
		},
	],
}

const dataProcessing = {
	webhosting: {
		processor: ['netlify', 'storyblok'],
		data_categories: ['usage_data'],
	},
	analytics: {
		processor: 'google_eu',
		service: 'Google Analytics',
		data_categories: ['usage_data', 'usage_statistics'],
	},
	maps: {
		processor: 'google_usa',
		service: 'Google Maps',
		data_categories: ['usage_data', 'geo_data'],
	},
	send_emails: {
		processor: 'twilio_eu',
		service: 'Twilio Sendgrid',
		data_categories: ['usage_data', 'inventory_data'],
	},
	payment: {
		processor: 'stripe',
		service: 'Stripe Payments',
		data_categories: ['usage_data', 'inventory_data', 'payment_data'],
	},
}
</script>

<template>
	<PageMaster>
		<section class="bg-gray-50 py-16">
			<div class="container container-padding text-center">
				<h1
					class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl"
				>
					<span class="block">{{ $t('h1.line1') }}</span>
					{{ ' ' }}
					<span class="block text-primary-600">{{
						$t('h1.line2')
					}}</span>
				</h1>
				<div
					class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
				>
					<p v-html="$t('intro.p1')" />
					<p class="mt-3" v-html="$t('intro.p2')" />
					<p class="mt-3" v-html="$t('intro.p3')" />
				</div>
			</div>
		</section>
		<GeneratorSettings />
		<article class="container prose mx-auto my-10 px-10 lg:prose-lg">
			<h1>{{ $t('privacy_policy') }}</h1>
			<PrivacyPolicy
				:singular="isSingular"
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
			/>
		</article>
	</PageMaster>
</template>
