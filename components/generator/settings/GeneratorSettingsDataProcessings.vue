<script setup lang="ts">
const breakpoint = useBreakpoint()
const settings = useSettings()
const categories: DataProcessingCategory[] = [
	'webhosting',
	'analytics',
	'maps',
	'emails',
	'payment',
	'advertising',
]

const emit = defineEmits<{
	(e: 'hasErrors', state: boolean): void
}>()

const errorStates = ref({
	webhosting: false,
	analytics: false,
	maps: false,
	emails: false,
	payment: false,
	advertising: false,
})

const setErrorState = (category: DataProcessingCategory, hasErrors: boolean) => {
	errorStates.value[category] = hasErrors
}

const hasErrors = computed(() => {
	return Object.values(errorStates.value).some((error) => error)
})

watch(hasErrors, (hasErrors) => {
	emit('hasErrors', hasErrors)
})

const activeTab = ref(null)
</script>
<template>
	<v-card>
		<v-tabs
			v-model="activeTab"
			bg-color="primary"
			show-arrows
			center-active
			:direction="breakpoint.max.sm ? 'vertical' : 'horizontal'"
		>
			<v-tab
				v-for="category in categories"
				:key="category"
				:value="category"
				:append-icon="errorStates[category] ? 'mdi-alert' : undefined"
			>
				{{ $t(`settings.data_processings.categories.${category}.title`) }}
				<v-badge
					v-if="settings.dataProcessings[category].length > 0"
					:content="settings.dataProcessings[category].length"
					inline
				>
				</v-badge>
			</v-tab>
		</v-tabs>

		<v-card-text class="m-default">
			<v-window v-model="activeTab" class="p-1">
				<v-window-item v-for="category in categories" :key="category" :value="category">
					<GeneratorSettingsDataProcessingCategory
						:category="category"
						@has-errors="setErrorState(category, $event)"
					/>
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>
