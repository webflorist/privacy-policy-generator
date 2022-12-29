<script setup lang="ts">
const settings = useSettings()

const props = defineProps({
	category: {
		type: [String as () => DataProcessingType],
		required: true,
	},
	required: {
		type: Boolean,
		required: false,
		default: false,
	},
})

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
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-title
				expand-icon="mdi-plus"
				collapse-icon="mdi-close"
			>
				{{ $t('settings.data_processings.create') }}
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<GeneratorSettingsDataProcessingForm :category="category"
			/></v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-for="(processData, processKey) of settings.dataProcessings[
				category
			]"
			:key="processKey"
			:title="processKey"
		>
		<v-expansion-panel-title
				expand-icon="mdi-pencil"
				collapse-icon="mdi-close"
			>
				{{ processKey }}
			</v-expansion-panel-title>
			<GeneratorSettingsDataProcessingForm
				:category="category"
				:key="processKey"
			/>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
