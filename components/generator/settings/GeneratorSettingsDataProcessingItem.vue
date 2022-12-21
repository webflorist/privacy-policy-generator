<script setup lang="ts">
import { useForm } from 'vee-validate'
import { defineRule } from 'vee-validate'
const { t } = useI18n()
const settings = useSettings()

const props = defineProps({
	category: {
		type: [String as () => DataProcessingType],
		required: true,
	},
	key: {
		type: Number,
		required: false,
		default: null,
	},
})

const newItemData = reactive<DataProcessing>({
	processor: null,
	service: null,
	dataCategories: [],
	cookies: [],
})

const model: DataProcessing =
	props.key !== null
		? settings.value.dataProcessings[props.category][props.key]
		: newItemData

defineRule('name-or-org-required', (value, target, ctx) => {
	if (ctx.form.name || ctx.form.organisation) {
		return true
	}
	return t('errors.name-or-org-required')
})

const form = useForm({
	validationSchema: {
		name: 'name-or-org-required',
		email: 'required|email',
	},
	validateOnMount: true,
})

const emit = defineEmits<{
	(e: 'errors', count: number): void
}>()

watch(form.errors, (newErrors) => {
	emit('errors', Object.keys(newErrors).length)
})
</script>
<template>
	<FormSelectField
		:label="$t('settings.data-processings.fields.processor.title')"
		name="processor"
		v-model="model.processor"
	/>
	<FormTextField
		:label="$t('settings.data-processings.fields.service.title')"
		name="service"
		v-model="model.service"
	/>
</template>
