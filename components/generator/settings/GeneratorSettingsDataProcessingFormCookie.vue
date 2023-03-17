<script setup lang="ts">
import { useForm } from 'vee-validate'
const durationOptions = useDurationOptions()
const { humanizeMinutes } = useHumanizedDuraition()
const { t } = useI18n()

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['update:modelValue', 'hasErrors'])

const cookieModel = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})

const writtenOnOptionValues = ['every_visit', 'service_usage']
const cookieWrittenOnOptions = computed(() => {
	return writtenOnOptionValues.map((option) => {
		return {
			title: t(`settings.data_processings.fields.cookies.written_on.options.${option}.title`),
			value: option,
			hint: t(
				`settings.data_processings.fields.cookies.written_on.options.${option}.description`
			),
		}
	})
})

const cookieDurationOptions = computed(() => {
	return Object.keys(durationOptions).map((option) => {
		return {
			title: t(`settings.data_processings.fields.cookies.duration.options.${option}.title`),
			value: durationOptions[option],
		}
	})
})

const humanizeDuration = (duration: number) => {
	const presetOption = Object.keys(durationOptions).find(
		(key) => durationOptions[key] === duration
	)
	if (presetOption) {
		return t(`settings.data_processings.fields.cookies.duration.options.${presetOption}.title`)
	}
	return humanizeMinutes(duration)
}

const purposeOptionValues = ['session', 'security', 'gdpr_choice', 'settings', 'service']
const cookiePurposeOptions = computed(() => {
	return purposeOptionValues.map((option) => {
		return {
			title: t(`settings.data_processings.fields.cookies.purpose.options.${option}.title`),
			value: option,
		}
	})
})

const { errors } = useForm({
	validationSchema: {
		name: 'required',
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
		v-model="cookieModel.name"
		:label="$t('settings.data_processings.fields.cookies.name.title')"
		name="name"
	/>
	<FormSelectField
		v-model="cookieModel.writtenOn"
		:label="$t('settings.data_processings.fields.cookies.written_on.title')"
		name="writtenOn"
		:items="cookieWrittenOnOptions"
	/>
	<FormCombobox
		v-model="cookieModel.duration"
		:label="$t('settings.data_processings.fields.cookies.duration.title')"
		:hint="$t('settings.data_processings.fields.cookies.duration.hint')"
		name="duration"
		:items="cookieDurationOptions"
	>
		<template v-if="cookieModel.duration" #append-inner>
			<span class="whitespace-nowrap">
				{{ humanizeDuration(cookieModel.duration) }}
			</span>
		</template>
	</FormCombobox>
	<FormSelectField
		v-model="cookieModel.purpose"
		:label="$t('settings.data_processings.fields.cookies.purpose.title')"
		name="purpose"
		:items="cookiePurposeOptions"
	/>
	<FormSwitch
		v-model="cookieModel.thirdParty"
		:label="$t('settings.data_processings.fields.cookies.third_party.title')"
		name="thirdParty"
	></FormSwitch>
</template>
