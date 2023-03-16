<script setup lang="ts">
import { useForm } from 'vee-validate'
const settings = useSettings()
const defaultProcessors = useDefaultProcessors()
const usedProcessors = useUsedProcessors()
const presets = useDataProcessingPresets()
const dataCategories = useDataCategories()
const presenter = usePresenter()
const breakpoint = useBreakpoint()
const durationOptions = useDurationOptions()
const { humanizeMinutes } = useHumanizedDuraition()
const { t } = useI18n()

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
	processor: {
		id: null,
		name: null,
		street: null,
		zip: null,
		city: null,
		country: null,
		privacy_policy_url: null,
	},
	required: false,
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
	const newProcessingArrayLength = settings.value.dataProcessings[props.category].push({
		...newProcessing,
	})
	const newProcessingKey = newProcessingArrayLength - 1
	Object.assign(newProcessing, { ...blankProcessing })
	emit('created', newProcessingKey)
}

const deleteProcessing = () => {
	settings.value.dataProcessings[props.category].splice(props.processingKey, 1)
}

const presetOptions = computed(() => {
	return presets[props.category].map((preset, key) => {
		return {
			title: presenter.processTitle(preset),
			value: key,
		}
	})
})

const processorOptions = computed(() => {
	type Option = {
		title: string
		value: string
		props?: Record<any, any>
	}
	const generateOption = (processor: Processor): Option => {
		return {
			title: presenter.processorName(processor),
			value: processor.id,
		}
	}
	const options: Option[] = []
	if (usedProcessors.value.length > 0) {
		options.push(
			{
				title: t('settings.data_processings.used_processors'),
				value: 'header',
				props: { disabled: true },
			},
			...usedProcessors.value.map((processor) => generateOption(processor))
		)
	}
	options.push({
		title: t('settings.data_processings.default_processors'),
		value: 'header',
		props: { disabled: true },
	})
	options.push(
		...defaultProcessors.flatMap((processor) => {
			// Only add default processor, if not already used.
			if (!options.find((option) => processor.id === option.key)) {
				return generateOption(processor)
			}
			return []
		})
	)
	return options
})

const dataCategoryOptions = computed(() => {
	return dataCategories.map((dataCategory) => {
		return {
			title: t(
				`settings.data_processings.fields.data_categories.options.${dataCategory}.title`
			),
			value: dataCategory,
			hint: t(
				`settings.data_processings.fields.data_categories.options.${dataCategory}.description`
			),
		}
	})
})

const loadProcessFromPreset = (key: number) => {
	// First add processor to processor-list
	Object.assign(newProcessing, presets[props.category][key])
}

const loadProcessorFromPreset = (key: string) => {
	const allProcessors: Processor[] = [...usedProcessors.value, ...defaultProcessors]
	// First add processor to processor-list
	Object.assign(
		newProcessing.processor,
		allProcessors.find((processor) => processor.id === key)
	)
}

const activeCookieTab = ref(null)
const addCookie = () => {
	const newLength = processingModel.value.cookies?.push({
		name: null,
		writtenOn: null,
		duration: null,
		purpose: null,
		thirdParty: false,
	})
	activeCookieTab.value = newLength - 1
}

const deleteCookie = (key) => {
	processingModel.value.cookies?.splice(key, 1)
}

const cookieWrittenOnOptions = computed(() => {
	const options = ['every_visit', 'service_usage']
	return options.map((option) => {
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

const cookiePurposeOptions = computed(() => {
	const options = ['session', 'security', 'gdpr_choice', 'settings', 'service']
	return options.map((option) => {
		return {
			title: t(`settings.data_processings.fields.cookies.purpose.options.${option}.title`),
			value: option,
		}
	})
})

const { errors } = useForm({
	validationSchema: {
		name: 'required',
		street: 'required',
		zip: 'required',
		city: 'required',
		country: 'required',
		privacy_policy_url: 'required|url',
		dataCategories: 'required',
	},
	validateOnMount: true,
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

watch(errors, (newErrors) => {
	emit('errors', Object.keys(newErrors).length)
})
</script>
<template>
	<template v-if="createNew">
		<h4>{{ $t('settings.data_processings.load_from_preset') }}</h4>
		<FormSelectField
			class="m-default"
			:items="presetOptions"
			:standalone="true"
			:clearable="false"
			@update:modelValue="loadProcessFromPreset($event)"
		>
		</FormSelectField>
	</template>
	<div class="text-right">
		<v-btn
			v-if="!createNew"
			class="my-8"
			color="error"
			@click="deleteProcessing(category, processingKey)"
			appendIcon="mdi-alert"
		>
			{{ $t('settings.data_processings.delete') }}
		</v-btn>
	</div>

	<FormSwitch
		:label="$t('settings.data_processings.fields.required.title')"
		name="required"
		v-model="processingModel.required"
	></FormSwitch>
	<h4>{{ $t('settings.data_processings.fields.processor.title') }}</h4>
	<div class="m-default">
		<FormSelectField
			autocomplete
			:label="$t('settings.data_processings.fields.processor.load_from_preset')"
			:items="processorOptions"
			:standalone="true"
			:clearable="false"
			@update:modelValue="loadProcessorFromPreset($event)"
		>
		</FormSelectField>
		<FormTextField
			:label="$t('settings.data_processings.fields.processor.name.title')"
			name="name"
			v-model="processingModel.processor.name"
		/>
		<FormTextField
			:label="$t('settings.data_processings.fields.processor.street.title')"
			name="street"
			v-model="processingModel.processor.street"
		/>
		<FormTextField
			:label="$t('settings.data_processings.fields.processor.zip.title')"
			name="zip"
			v-model="processingModel.processor.zip"
		/>
		<FormTextField
			:label="$t('settings.data_processings.fields.processor.city.title')"
			name="city"
			v-model="processingModel.processor.city"
		/>
		<FormTextField
			:label="$t('settings.data_processings.fields.processor.country.title')"
			name="country"
			v-model="processingModel.processor.country"
		/>
		<FormTextField
			type="url"
			:label="$t('settings.data_processings.fields.processor.privacy_policy_url.title')"
			name="privacy_policy_url"
			v-model="processingModel.processor.privacy_policy_url"
		/>
	</div>
	<h4>
		{{ $t('settings.data_processings.fields.service.title') }} ({{ $t('general.optional') }})
	</h4>
	<FormTextField
		class="m-default"
		:label="$t('settings.data_processings.fields.service.title')"
		name="service"
		v-model="processingModel.service"
	/>

	<h4>{{ $t('settings.data_processings.fields.data_categories.title') }}</h4>
	<FormChipGroup
		class="m-default"
		name="dataCategories"
		:label="$t('settings.data_processings.fields.data_categories.title')"
		:items="dataCategoryOptions"
		v-model="processingModel.dataCategories"
		multiple
	></FormChipGroup>

	<h4>{{ $t('settings.data_processings.fields.cookies.title') }}</h4>
	<v-card>
		<v-tabs
			v-model="activeCookieTab"
			center-active
			show-arrows
			:direction="breakpoint.max.sm ? 'vertical' : 'horizontal'"
		>
			<v-tab v-for="(cookie, key) in processingModel.cookies" :key="key" :value="key">
				<template v-if="cookie.name">{{ presenter.stringLimit(cookie.name, 5) }}</template>
				<template v-else>{{
					$t('settings.data_processings.fields.cookies.new_cookie')
				}}</template>
			</v-tab>
			<v-tab :value="9999" @click="addCookie()">
				<v-icon>mdi-plus</v-icon>
			</v-tab>
		</v-tabs>
		<v-card-text class="m-default">
			<v-window v-model="activeCookieTab">
				<v-window-item
					v-for="(cookie, key) in processingModel.cookies"
					:key="key"
					:value="key"
				>
					<div class="text-right">
						<v-btn
							class="my-8"
							color="error"
							@click="deleteCookie(key)"
							appendIcon="mdi-alert"
						>
							{{ $t('settings.data_processings.fields.cookies.delete_cookie') }}
						</v-btn>
					</div>
					<FormTextField
						:label="$t('settings.data_processings.fields.cookies.name.title')"
						name="cookie.name"
						v-model="processingModel.cookies[key].name"
					/>
					<FormSelectField
						:label="$t('settings.data_processings.fields.cookies.written_on.title')"
						name="cookie.writtenOn"
						v-model="processingModel.cookies[key].writtenOn"
						:items="cookieWrittenOnOptions"
					/>
					<FormCombobox
						:label="$t('settings.data_processings.fields.cookies.duration.title')"
						:hint="$t('settings.data_processings.fields.cookies.duration.hint')"
						name="cookie.duration"
						v-model="processingModel.cookies[key].duration"
						:items="cookieDurationOptions"
					>
						<template v-slot:append-inner v-if="processingModel.cookies[key].duration">
							<span class="whitespace-nowrap">
								{{ humanizeMinutes(processingModel.cookies[key].duration) }}
							</span>
						</template>
					</FormCombobox>
					<FormSelectField
						:label="$t('settings.data_processings.fields.cookies.purpose.title')"
						name="cookie.purpose"
						v-model="processingModel.cookies[key].purpose"
						:items="cookiePurposeOptions"
					/>
					<FormSwitch
						:label="$t('settings.data_processings.fields.cookies.third_party.title')"
						name="cookie.thirdParty"
						v-model="processingModel.cookies[key].thirdParty"
					></FormSwitch>
				</v-window-item>
				<v-window-item :value="9999">
					{{ $t('settings.data_processings.fields.cookies.add_cookies') }}
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>

	<v-btn
		v-if="createNew"
		:disabled="hasErrors"
		class="mt-8"
		:color="hasErrors ? 'error' : 'secondary'"
		block
		@click="addProcessing()"
		:appendIcon="hasErrors ? 'mdi-alert' : ''"
	>
		{{ $t('settings.data_processings.add') }}
	</v-btn>

	<v-messages
		:active="hasErrors"
		:messages="$t('errors.errors-in-form')"
		color="error"
		class="mt-3 px-6 text-center"
	></v-messages>
</template>
