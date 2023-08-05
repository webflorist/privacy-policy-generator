<script setup lang="ts">
const tabs = reactive({
	general: {
		errors: false,
	},
	data_controller: {
		errors: false,
	},
	data_processings: {
		errors: false,
	},
	processors: {
		errors: false,
	},
})

const emit = defineEmits<{
	(e: 'hasErrors', state: boolean): void
}>()

const hasErrors = computed(() => {
	return Object.values(tabs).some((tab) => tab.errors)
})

watch(hasErrors, (hasErrors) => {
	emit('hasErrors', hasErrors)
})
</script>
<template>
	<v-container tag="section" class="max-w-3xl">
		<h2>{{ $t('settings.title') }}</h2>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.general.title') }}</v-card-title>
			<v-card-text class="m-default-sm"> <GeneratorSettingsGeneral /></v-card-text>
		</v-card>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.data_controller.title') }}</v-card-title>
			<v-card-text class="m-default-sm">
				<GeneratorSettingsDataController @has-errors="tabs.data_controller.errors = $event"
			/></v-card-text>
		</v-card>

		<v-card>
			<v-card-title tag="h3">{{ $t('settings.data_processings.title') }}</v-card-title>
			<v-card-text class="m-default-sm">
				<GeneratorSettingsDataProcessings
					@has-errors="tabs.data_processings.errors = $event"
			/></v-card-text>
		</v-card>
	</v-container>
</template>
