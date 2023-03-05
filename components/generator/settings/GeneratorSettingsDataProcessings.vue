<script setup lang="ts">
const breakpoint = useBreakpoint()
const categories: DataProcessingCategory[] = [
	'webhosting',
	'analytics',
	'maps',
	'emails',
	'payment',
	'advertising',
]

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
			<v-tab v-for="category in categories" :key="category" :value="category">
				{{ $t(`settings.data_processings.categories.${category}.title`) }}
			</v-tab>
		</v-tabs>

		<v-card-text>
			<v-window v-model="activeTab" class="p-1">
				<v-window-item v-for="category in categories" :key="category" :value="category">
					<GeneratorSettingsDataProcessingCategory :category="category" />
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>
</template>
