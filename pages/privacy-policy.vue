<script setup lang="ts">
const { locale: currentLocale } = useI18n()

const settings: GeneratorSettings = {
	general: {
		language: currentLocale.value,
	},
	dataController: {
		name: 'Gerald Buttinger',
		street: 'Alte Aigner Str. 3A',
		city: 'Salzburg',
		zip: '12345',
		country: 'United States',
		email: 'gerald@web.florist',
	},
}
</script>

<template>
	<div class="typography">
		<v-main>
			<v-container>
				<PrivacyPolicyText :settings="settings" />
			</v-container>
		</v-main>
	</div>
</template>
