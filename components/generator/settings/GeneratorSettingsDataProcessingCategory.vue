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

const missesRequiredItem = computed(
	() =>
		props.required &&
		settings.value.dataProcessings[props.category].length === 0
)

const itemErrors = reactive({})

const emit = defineEmits<{
	(e: 'errors', count: number): void
}>()

watch(
	[itemErrors, missesRequiredItem],
	([newItemErrors, newMissesRequiredItem]) => {
		let errors = 0
		for (const itemErrorCount of Object.values(newItemErrors)) {
			errors += itemErrorCount
		}
		if (newMissesRequiredItem) {
			errors++
		}
		emit('errors', errors)
	},
	{ immediate: true }
)
</script>
<template>
	<h3>{{ $t(`settings.data_processings.categories.${category}.title`) }}</h3>
	<p>
		{{ $t(`settings.data_processings.categories.${category}.description`) }}
	</p>
	<v-alert v-if="missesRequiredItem" dense color="red" class="mb-5">
		{{ $t('errors.missing-data-processing') }}
	</v-alert>
	<v-expansion-panels v-model="activePanel">
		<v-expansion-panel>
			<v-expansion-panel-title
				expand-icon="mdi-plus"
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
