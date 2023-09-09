<script setup lang="ts">
const breakpoint = useBreakpoint()
const settings = useSettings()

type CategoryData = {
	icon: string
	hasErrors: boolean
}

const categories: Record<DataProcessingCategory, CategoryData> = reactive({
	webhosting: {
		icon: 'mdi-server-network',
		hasErrors: false,
	},
	analytics: {
		icon: 'mdi-chart-bar',
		hasErrors: false,
	},
	maps: {
		icon: 'mdi-map',
		hasErrors: false,
	},
	videos: {
		icon: 'mdi-video',
		hasErrors: false,
	},
	emails: {
		icon: 'mdi-email',
		hasErrors: false,
	},
	payment: {
		icon: 'mdi-credit-card',
		hasErrors: false,
	},
	advertising: {
		icon: 'mdi-advertisements',
		hasErrors: false,
	},
	booking: {
		icon: 'mdi-calendar-cursor',
		hasErrors: false,
	},
})

const emit = defineEmits<{
	(e: 'hasErrors', state: boolean): void
}>()

const setErrorState = (category: DataProcessingCategory, hasErrors: boolean) => {
	categories[category].hasErrors = hasErrors
}

const hasErrors = computed(() => {
	return Object.values(categories).some((category) => category.hasErrors)
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
				v-for="(categoryData, category) in categories"
				:key="category"
				:value="category"
				class="min-w-[70px]"
			>
				<v-icon>
					{{ categoryData.icon }}
				</v-icon>
				<v-tooltip v-if="breakpoint.min.md" activator="parent" location="top">{{
					$t(`settings.data_processings.categories.${category}.title`)
				}}</v-tooltip>
				<span v-if="breakpoint.max.sm" class="ml-3">
					{{ $t(`settings.data_processings.categories.${category}.title`) }}
				</span>
				<v-badge
					v-if="settings.dataProcessings[category].length > 0"
					:content="settings.dataProcessings[category].length"
					:icon="categoryData.hasErrors ? 'mdi-alert' : undefined"
					:color="categoryData.hasErrors ? 'warning' : undefined"
					floating
				></v-badge>
			</v-tab>
		</v-tabs>

		<v-card-text class="m-default-sm">
			<v-window v-model="activeTab" class="p-1">
				<v-window-item
					v-for="(categoryData, category) in categories"
					:key="category"
					:value="category"
				>
					<GeneratorSettingsDataProcessingCategory
						:category="category"
						@has-errors="setErrorState(category, $event)"
					/>
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>
