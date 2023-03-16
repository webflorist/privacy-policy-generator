<script setup lang="ts">
const settings = useSettings()
const presenter = usePresenter()

const props = defineProps({
	category: {
		type: [String as () => DataProcessingCategory],
		required: true,
	},
	required: {
		type: Boolean,
		required: false,
		default: false,
	},
})

const activePanel = ref(null)

</script>
<template>
	<h4>{{ $t(`settings.data_processings.categories.${category}.title`) }}</h4>
	<p>
		{{ $t(`settings.data_processings.categories.${category}.description`) }}
	</p>
	<v-expansion-panels v-model="activePanel">
		<v-expansion-panel>
			<v-expansion-panel-title
				expand-icon="mdi-database-plus"
				collapse-icon="mdi-close"
			>
				{{ $t('settings.data_processings.create') }}
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<GeneratorSettingsDataProcessingForm
					:category="category"
					@created="activePanel = null"
			/></v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-for="(processData, processingKey) of settings.dataProcessings[
				category
			]"
			:key="processingKey"
		>
			<v-expansion-panel-title
				expand-icon="mdi-pencil"
				collapse-icon="mdi-close"
				color="secondary-light"
			>
				{{ presenter.processTitle(processData) }}
			</v-expansion-panel-title>

			<v-expansion-panel-text>
				<GeneratorSettingsDataProcessingForm
					:category="category"
					:processingKey="processingKey"
				/>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
