<script setup lang="ts">
const settings = useSettings()

const categories = reactive({
	webhosting: {
		errors: 0,
		required: true,
	},
	analytics: {
		errors: 0,
		required: false,
	},
	maps: {
		errors: 0,
		required: false,
	},
	emails: {
		errors: 0,
		required: false,
	},
	payment: {
		errors: 0,
		required: false,
	},
	advertising: {
		errors: 0,
		required: false,
	},
})

const emit = defineEmits<{
	(e: 'errors', count: number): void
}>()

watch(categories, (newCategories) => {
	let errors = 0
	for (const categoryData of Object.values(newCategories)) {
		errors += categoryData.errors
	}
	emit('errors', errors)
})
</script>
<template>
	<GeneratorSettingsDataProcessingCategory
		v-for="(categoryData, category) in categories"
		:key="category"
		:category="category"
		:required="categoryData.required"
		@errors="categories[category].errors = $event"
	/>
</template>
