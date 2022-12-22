<script setup lang="ts">
import PrivacyPolicyText from '@webflorist/privacy-policy-text'
import { useForm } from 'vee-validate'

const settings = useSettings()

const props = defineProps({
	processorKey: {
		type: Number,
		required: false,
		default: null,
	},
})

const newProcessor = reactive<Processor>({
	name: '',
	street: '',
	zip: '',
	city: '',
	county: '',
	country: '',
	privacyPolicyUrl: '',
})

const createNew = computed(() => props.processorKey === null)

const processorModel = computed(() =>
	createNew.value
		? newProcessor
		: settings.value.processors[props.processorKey]
)

const addProcessor = () => {
	settings.value.processors.push(newProcessor)
}

const { errors } = useForm({
	validationSchema: {
		name: 'required',
		street: 'required',
		zip: 'required',
		city: 'required',
		country: 'required',
		privacyPolicyUrl: 'required|url',
	},
	validateOnMount: true,
	initialValues: processorModel,
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)
</script>
<template>
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
		:label="$t('settings.processors.fields.county.title')"
		name="county"
		v-model="processorModel.county"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.country.title')"
		name="country"
		v-model="processorModel.country"
	/>
	<FormTextField
		:label="$t('settings.processors.fields.privacyPolicyUrl.title')"
		name="privacyPolicyUrl"
		v-model="processorModel.privacyPolicyUrl"
		type="url"
	/>
	<v-btn
		v-if="createNew"
		:disabled="hasErrors"
		class="mt-8"
		block
		@click="addProcessor()"
	>
		{{ $t('settings.processors.add') }}
	</v-btn>
</template>
