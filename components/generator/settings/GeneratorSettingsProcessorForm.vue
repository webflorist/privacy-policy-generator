<script setup lang="ts">
import { processors as defaultProcessors } from '@webflorist/privacy-policy-text'
import { useForm } from 'vee-validate'

const settings = useSettings()

const props = defineProps({
	processorKey: {
		type: Number,
		required: false,
		default: null,
	},
})

const emit = defineEmits<{
	(e: 'created', key: number): void
}>()

const blankProcessor: Processor = {
	name: '',
	street: '',
	zip: '',
	city: '',
	country: '',
	privacy_policy_url: '',
}

const newProcessor = reactive<Processor>({ ...blankProcessor })

const createNew = computed(() => props.processorKey === null)

const processorModel = computed(() =>
	createNew.value
		? newProcessor
		: settings.value.processors[props.processorKey]
)

const addProcessor = () => {
	const newProcessorArrayLength = settings.value.processors.push({
		...newProcessor,
	})
	const newProcessorKey = newProcessorArrayLength - 1
	Object.assign(newProcessor, { ...blankProcessor })
	emit('created', newProcessorKey)
}

const processorPresets = computed(() => {
	return defaultProcessors.map((processor, key) => {
		return {
			title: processor.name + ', ' + processor.country,
			value: key,
		}
	})
})

const loadFromPreset = (key: number) => {
	Object.assign(newProcessor, defaultProcessors[key])
}

const { errors } = useForm({
	validationSchema: {
		name: 'required',
		street: 'required',
		zip: 'required',
		city: 'required',
		country: 'required',
		privacy_policy_url: 'required|url',
	},
	validateOnMount: true,
	initialValues: processorModel,
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)
</script>
<template>
	<FormSelectField
		:label="$t('settings.processors.add-from-preset')"
		:items="processorPresets"
		:standalone="true"
		@update:modelValue="loadFromPreset($event)"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.name.title')"
		name="name"
		v-model="processorModel.name"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.street.title')"
		name="street"
		v-model="processorModel.street"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.zip.title')"
		name="zip"
		v-model="processorModel.zip"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.city.title')"
		name="city"
		v-model="processorModel.city"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.country.title')"
		name="country"
		v-model="processorModel.country"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.privacy_policy_url.title')"
		name="privacy_policy_url"
		v-model="processorModel.privacy_policy_url"
		type="url"
	/>
	<v-btn
		v-if="createNew"
		:disabled="hasErrors"
		class="mt-8"
		color="secondary"
		block
		@click="addProcessor()"
	>
		{{ $t('settings.general.add') }}
	</v-btn>
</template>
