<script setup lang="ts">
const breakpoint = useBreakpoint()

const activeTab = ref('general')
const tabs = reactive({
	general: {
		errors: 0,
	},
	data_controller: {
		errors: 0,
	},
	data_processings: {
		errors: 0,
	},
	processors: {
		errors: 0,
	},
})
</script>
<template>
	<v-container tag="section" class="max-w-3xl">
		<h2>{{ $t('settings.title') }}</h2>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.general.title') }}</v-card-title>
			<v-card-text> <GeneratorSettingsGeneral /></v-card-text>
		</v-card>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.data_controller.title') }}</v-card-title>
			<v-card-text> <GeneratorSettingsDataController /></v-card-text>
		</v-card>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.data_processings.title') }}</v-card-title>
			<v-card-text> <GeneratorSettingsDataProcessings /></v-card-text>
		</v-card>
	</v-container>
</template>
