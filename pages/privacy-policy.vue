<script setup lang="ts">
const { locale } = useI18n()
const defaultProcessors = useDefaultProcessors()

const settings: GeneratorSettings = {
	general: { language: locale.value },
	dataController: {
		organization: 'web.florist',
		name: 'Gerald Buttinger',
		email: 'gerald@web.florist',
	},
	dataProcessings: {
		webhosting: [
			{
				processor: defaultProcessors.find((processor) => processor.id === 'netlify_inc_us'),
				required: true,
				dataCategories: ['online', 'usage'],
				browserStore: [],
				purposes: ['documents', 'stylesheets', 'fonts', 'scripts', 'images', 'videos'],
			},
		],
		analytics: [],
		tagmanager: [],
		maps: [],
		videos: [],
		emails: [],
		payment: [],
		advertising: [],
		booking: [],
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
