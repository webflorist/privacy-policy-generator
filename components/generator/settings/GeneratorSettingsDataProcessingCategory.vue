<script setup lang="ts">
const settings = useSettings()
const presenter = usePresenter()

defineProps({
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

const emit = defineEmits<{
	(e: 'hasErrors', state: boolean): void
}>()

const errorStates = ref({})

const setErrorState = (key: number, hasErrors: boolean) => {
	errorStates.value[key] = hasErrors
}

const hasErrors = computed(() => {
	return Object.values(errorStates.value).some((error) => error)
})

watch(hasErrors, (hasErrors) => {
	emit('hasErrors', hasErrors)
})

const expansionPanels = ref<HTMLElement | null>(null)
const activePanel = ref<number | null>()

const dataProcessingCreated = () => {
	activePanel.value = null
	expansionPanels.value?.$el.scrollIntoView(true)
}

const dataProcessingUpdated = () => {
	activePanel.value = null
	expansionPanels.value?.$el.scrollIntoView(true)
}
</script>
<template>
	<h4>{{ $t(`settings.data_processings.categories.${category}.title`) }}</h4>
	<p>
		{{ $t(`settings.data_processings.categories.${category}.description`) }}
	</p>
	<v-expansion-panels ref="expansionPanels" v-model="activePanel">
		<v-expansion-panel>
			<v-expansion-panel-title expand-icon="mdi-database-plus" collapse-icon="mdi-close">
				{{ $t('settings.data_processings.create') }}
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<GeneratorSettingsDataProcessingForm
					:category="category"
					@created="dataProcessingCreated()"
			/></v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-for="(processData, processingKey) of settings.dataProcessings[category]"
			:key="processingKey"
		>
			<v-expansion-panel-title
				expand-icon="mdi-pencil"
				collapse-icon="mdi-close"
				:color="errorStates[processingKey] ? 'error' : 'neutral-light'"
			>
				{{ presenter.processTitle(processData, category) }}
				<v-icon v-if="errorStates[processingKey]" class="ml-2">mdi-alert</v-icon>
			</v-expansion-panel-title>

			<v-expansion-panel-text>
				<GeneratorSettingsDataProcessingForm
					:category="category"
					:processing-key="processingKey"
					@has-errors="setErrorState(processingKey, $event)"
					@sorted="activePanel = $event + 1"
					@updated="dataProcessingUpdated()"
				/>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
