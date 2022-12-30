<script setup lang="ts">
import { useForm } from 'vee-validate'
const settings = useSettings()

const props = defineProps({
	category: {
		type: [String as () => DataProcessingCategory],
		required: true,
	},
	processingKey: {
		type: Number,
		required: false,
		default: null,
	},
})

const emit = defineEmits<{
	(e: 'errors', count: number): void
	(e: 'created', key: number): void
}>()

const blankProcessing: DataProcessing = {
	processor: null,
	service: null,
	dataCategories: [],
	cookies: [],
}

const newProcessing = reactive<DataProcessing>({ ...blankProcessing })

const createNew = computed(() => props.processingKey === null)

const processingModel = computed(() =>
	createNew.value
		? newProcessing
		: settings.value.dataProcessings[props.category][props.processingKey]
)

const addProcessing = () => {
	const newProcessingArrayLength = settings.value.dataProcessings[
		props.category
	].push({
		...newProcessing,
	})
	const newProcessingKey = newProcessingArrayLength - 1
	Object.assign(newProcessing, { ...blankProcessing })
	emit('created', newProcessingKey)
}

const processorOptions = computed(() => {
	return settings.value.processors.map((processor, key) => {
		return {
			title: processor.name + ', ' + processor.country,
			value: key,
		}
	})
})

const { errors } = useForm({
	validationSchema: {
		processor: 'required',
	},
	validateOnMount: true,
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

watch(errors, (newErrors) => {
	emit('errors', Object.keys(newErrors).length)
})
</script>
<template>
	<FormSelectField
		:label="$t('settings.data_processings.fields.processor.title')"
		name="processor"
		:items="processorOptions"
		v-model="processingModel.processor"
		:no-data-text="$t('errors.missing-data-processor')"
	>
		<template v-slot:append-item>
			<v-divider class="my-2"></v-divider>
			<div class="mx-4 text-xs">{{ $t('infos.add-data-processor') }}</div>
		</template>
	</FormSelectField>
	<FormTextField
		:label="$t('settings.data_processings.fields.service.title')"
		name="service"
		v-model="processingModel.service"
	/>
	<v-btn
		v-if="createNew"
		:disabled="hasErrors"
		class="mt-8"
		color="secondary"
		block
		@click="addProcessing()"
	>
		{{ $t('settings.general.add') }}
	</v-btn>
</template>
