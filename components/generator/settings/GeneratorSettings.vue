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
	<section class="pb-16">
		<div class="container-padding container max-w-3xl">
			<h2>{{ $t('settings.title') }}</h2>

			<v-card class="mb-5">
				<v-card-title tag="h3">{{ $t('settings.general.title') }}</v-card-title>
				<v-card-text> <GeneratorSettingsGeneral /></v-card-text>
			</v-card>

			<v-card class="mb-5">
				<v-card-title tag="h3">{{ $t('settings.data_controller.title') }}</v-card-title>
				<v-card-text> <GeneratorSettingsDataController /></v-card-text>
			</v-card>

			<v-card class="mb-5">
				<v-card-title tag="h3">{{ $t('settings.data_processings.title') }}</v-card-title>
				<v-card-text> <GeneratorSettingsDataProcessings /></v-card-text>
			</v-card>
		</div>
	</section>
</template>
