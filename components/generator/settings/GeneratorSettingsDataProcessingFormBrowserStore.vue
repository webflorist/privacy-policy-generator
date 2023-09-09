<script setup lang="ts">
import { useForm } from 'vee-validate'
const { humanizedDuration, formOptions } = usePresenter()
const durationOptions = useDurationOptions()

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['update:modelValue', 'hasErrors'])

const model = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

const typeOptionValues: BrowserStoreType[] = [
	'cookie',
	'local_storage',
	'session_storage',
	'indexed_db',
]
const typeOptions = computed(() =>
	formOptions(
		typeOptionValues,
		'settings.data_processings.fields.browser_store.type.options',
		true
	)
)

const writtenOnOptionValues = ['every_visit', 'service_usage']
const writtenOnOptions = computed(() =>
	formOptions(
		writtenOnOptionValues,
		'settings.data_processings.fields.browser_store.written_on.options',
		true
	)
)

const cookieDurationOptions = computed(() =>
	formOptions(durationOptions, 'settings.data_processings.fields.browser_store.duration.options')
)

const purposeOptionValues = ['session', 'security', 'gdpr_choice', 'settings', 'service']
const purposeOptions = computed(() =>
	formOptions(
		purposeOptionValues,
		'settings.data_processings.fields.browser_store.purpose.options'
	)
)

const { errors } = useForm({
	validationSchema: {
		name: 'required',
		type: 'required',
		writtenOn: { required: true, one_of: writtenOnOptionValues },
		duration: 'numeric',
		purpose: { required: true, one_of: purposeOptionValues },
	},
	validateOnMount: true,
})

watch(errors, (newErrors) => {
	emit('hasErrors', Object.keys(newErrors).length > 0)
})
</script>
<template>
	<FormTextField
		v-model="model.name"
		:label="$t('settings.data_processings.fields.browser_store.name.title')"
		name="name"
	/>
	<FormSelectField
		v-model="model.type"
		:label="$t('settings.data_processings.fields.browser_store.type.title')"
		name="type"
		:items="typeOptions"
	/>
	<FormSelectField
		v-model="model.writtenOn"
		:label="$t('settings.data_processings.fields.browser_store.written_on.title')"
		name="writtenOn"
		:items="writtenOnOptions"
	/>
	<FormCombobox
		v-if="model.type === 'cookie'"
		v-model="model.duration"
		:label="$t('settings.data_processings.fields.browser_store.duration.title')"
		:hint="$t('settings.data_processings.fields.browser_store.duration.hint')"
		name="duration"
		:items="cookieDurationOptions"
	>
		<template v-if="model.duration" #append-inner>
			<span class="whitespace-nowrap">
				{{ humanizedDuration(model.duration) }}
			</span>
		</template>
	</FormCombobox>
	<FormSelectField
		v-model="model.purpose"
		:label="$t('settings.data_processings.fields.browser_store.purpose.title')"
		name="purpose"
		:items="purposeOptions"
	/>
	<FormSwitch
		v-model="model.thirdParty"
		:label="$t('settings.data_processings.fields.browser_store.third_party.title')"
		name="thirdParty"
	></FormSwitch>
</template>
