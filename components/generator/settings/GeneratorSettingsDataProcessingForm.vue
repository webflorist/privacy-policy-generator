<script setup lang="ts">
import { useForm } from 'vee-validate'
const settings = useSettings()
const defaultProcessors = useDefaultProcessors()
const usedProcessors = useUsedProcessors()
const presets = useDataProcessingPresets()
const dataCategories = useDataCategories()
const countries = useCountries()
const { t } = useI18n()
const { formOptions, processTitle, processorName } = usePresenter()

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
	(e: 'hasErrors', state: boolean): void
	(e: 'created', key: number): void
	(e: 'sorted', key: number): void
	(e: 'updated'): void
}>()

const blankProcessing: DataProcessing = {
	processor: {
		id: undefined,
		name: undefined,
		street: undefined,
		zip: undefined,
		city: undefined,
		country: undefined,
		privacy_policy_url: undefined,
		dpf_url: undefined,
	},
	required: false,
	service: undefined,
	dataCategories: [],
	browserStore: [],
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
	emit('hasErrors', false)
}

const sortUp = () => {
	;[
		settings.value.dataProcessings[props.category][props.processingKey],
		settings.value.dataProcessings[props.category][props.processingKey - 1],
	] = [
		settings.value.dataProcessings[props.category][props.processingKey - 1],
		settings.value.dataProcessings[props.category][props.processingKey],
	]
	emit('sorted', props.processingKey - 1)
}

const sortDown = () => {
	;[
		settings.value.dataProcessings[props.category][props.processingKey],
		settings.value.dataProcessings[props.category][props.processingKey + 1],
	] = [
		settings.value.dataProcessings[props.category][props.processingKey + 1],
		settings.value.dataProcessings[props.category][props.processingKey],
	]
	emit('sorted', props.processingKey + 1)
}

const presetOptions = computed(() => {
	return presets[props.category].map((preset, key) => {
		return {
			title: processTitle(preset, props.category),
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
			title: processorName(processor),
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

const dataCategoryOptions = computed(() =>
	formOptions(dataCategories, 'settings.data_processings.fields.data_categories.options', true)
)

const purposesOptions = computed<DataProcessingPurpose>(() => {
	switch (props.category) {
		case 'webhosting':
			return formOptions(
				[
					'documents',
					'stylesheets',
					'fonts',
					'scripts',
					'images',
					'videos',
					'cdn',
					'database',
					'account',
				],
				'settings.data_processings.fields.purposes.options',
				true
			)
		case 'emails':
			return formOptions(
				[
					'newsletter',
					'transactional_mails',
					'contact_form',
					'application_form',
					'registration_form',
				],
				'settings.data_processings.fields.purposes.options',
				true
			)
	}
	return []
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

const activeBrowserStoreTab = ref(null)
const browserStoreErrors = ref({})
const addBrowserStore = () => {
	const newLength = processingModel.value.browserStore?.push({
		name: undefined,
		writtenOn: undefined,
		duration: undefined,
		purpose: undefined,
		thirdParty: false,
	})
	activeBrowserStoreTab.value = newLength - 1
}

const deleteBrowserStore = (key) => {
	processingModel.value.browserStore?.splice(key, 1)
	delete browserStoreErrors.value[key]
	activeBrowserStoreTab.value = processingModel.value.browserStore[key]
		? key
		: processingModel.value.browserStore[key - 1]
		? key - 1
		: processingModel.value.browserStore[0]
		? 0
		: 9999
}

const { errors } = useForm({
	validationSchema: {
		name: 'required',
		street: 'required',
		zip: 'required',
		city: 'required',
		country: 'required',
		privacy_policy_url: 'required|url',
		dpf_url: 'url',
		dataCategories: 'required',
	},
	validateOnMount: true,
})

const setBrowserStoreErrors = (key, hasErrors) => {
	browserStoreErrors.value[key] = hasErrors
}

const hasErrors = computed(() => {
	if (Object.keys(errors.value).length > 0) {
		return true
	}
	if (Object.values(browserStoreErrors.value).includes(true)) {
		return true
	}
	return false
})

watch(hasErrors, (newHasErrors) => {
	emit('hasErrors', newHasErrors)
})
</script>
<template>
	<template v-if="createNew && presetOptions.length > 0">
		<h5>{{ $t('settings.data_processings.load_from_preset') }}</h5>
		<FormSelectField
			class="m-default-sm"
			:items="presetOptions"
			:standalone="true"
			:clearable="false"
			name="loadProcessFromPreset"
			@update:modelValue="loadProcessFromPreset($event)"
		>
		</FormSelectField>
	</template>
	<div v-if="!createNew" class="m-default-sm flex flex-row items-center justify-end gap-5">
		<v-btn
			v-if="settings.dataProcessings[category].length > 0 && processingKey !== 0"
			append-icon="mdi-chevron-up"
			@click="sortUp()"
			>{{ $t('general.sort_up') }}</v-btn
		>
		<v-btn
			v-if="
				settings.dataProcessings[category].length > 0 &&
				settings.dataProcessings[category].length > processingKey + 1
			"
			append-icon="mdi-chevron-down"
			@click="sortDown()"
			>{{ $t('general.sort_down') }}</v-btn
		>
		<v-btn
			color="error"
			append-icon="mdi-alert"
			@click="deleteProcessing(category, processingKey)"
		>
			{{ $t('general.delete') }}
		</v-btn>
	</div>

	<FormSwitch
		v-model="processingModel.required"
		class="m-default-sm"
		:label="$t('settings.data_processings.fields.required.title')"
		name="required"
	></FormSwitch>
	<h5>{{ $t('settings.data_processings.fields.processor.title') }}</h5>
	<div class="m-default-sm">
		<FormSelectField
			autocomplete
			:label="$t('settings.data_processings.fields.processor.load_from_preset')"
			:items="processorOptions"
			:standalone="true"
			:clearable="false"
			name="loadProcessorFromPreset"
			@update:modelValue="loadProcessorFromPreset($event)"
		>
		</FormSelectField>
		<FormTextField
			v-model="processingModel.processor.name"
			:label="$t('settings.data_processings.fields.processor.name.title')"
			name="name"
		/>
		<FormTextField
			v-model="processingModel.processor.street"
			:label="$t('settings.data_processings.fields.processor.street.title')"
			name="street"
		/>
		<FormTextField
			v-model="processingModel.processor.zip"
			:label="$t('settings.data_processings.fields.processor.zip.title')"
			name="zip"
		/>
		<FormTextField
			v-model="processingModel.processor.city"
			:label="$t('settings.data_processings.fields.processor.city.title')"
			name="city"
		/>
		<FormSelectField
			v-model="processingModel.processor.country"
			autocomplete
			:label="$t('settings.data_processings.fields.processor.country.title')"
			name="country"
			:items="countries.getOptions()"
		/>
		<FormTextField
			v-model="processingModel.processor.privacy_policy_url"
			type="url"
			:label="$t('settings.data_processings.fields.processor.privacy_policy_url.title')"
			name="privacy_policy_url"
		/>
		<FormTextField
			v-model="processingModel.processor.dpf_url"
			type="url"
			:label="$t('settings.data_processings.fields.processor.dpf_url.title')"
			name="dpf_url"
			:hint="$t('settings.data_processings.fields.processor.dpf_url.description')"
		>
			<template #details>
				<a href="https://www.dataprivacyframework.gov/s/participant-search" target="_blank">
					{{ $t('settings.data_processings.fields.processor.dpf_url.to_search_page') }}
				</a>
			</template>
		</FormTextField>
	</div>

	<h5>
		{{ $t('settings.data_processings.fields.service.title') }} ({{ $t('general.optional') }})
	</h5>
	<FormTextField
		v-model="processingModel.service"
		class="m-default-sm"
		:label="$t('settings.data_processings.fields.service.title')"
		name="service"
	/>

	<template v-if="purposesOptions.length > 0">
		<h5>
			{{ $t('settings.data_processings.fields.purposes.title') }} ({{
				$t('general.optional')
			}})
		</h5>
		<FormChipGroup
			v-model="processingModel.purposes"
			class="m-default-sm"
			name="purposes"
			:label="$t('settings.data_processings.fields.purposes.title')"
			:items="purposesOptions"
			multiple
		></FormChipGroup>
	</template>

	<h5>{{ $t('settings.data_processings.fields.data_categories.title') }}</h5>
	<FormChipGroup
		v-model="processingModel.dataCategories"
		class="m-default-sm"
		name="dataCategories"
		:label="$t('settings.data_processings.fields.data_categories.title')"
		:items="dataCategoryOptions"
		multiple
	></FormChipGroup>

	<h5>{{ $t('settings.data_processings.fields.browser_store.title') }}</h5>
	<v-card>
		<v-tabs v-model="activeBrowserStoreTab" center-active show-arrows direction="vertical">
			<v-tab
				v-for="(browserStoreEntry, key) in processingModel.browserStore"
				:key="key"
				:value="key"
			>
				<template v-if="browserStoreEntry.name">{{ browserStoreEntry.name }}</template>
				<template v-else>{{
					$t('settings.data_processings.fields.browser_store.new_browser_store')
				}}</template>
			</v-tab>
			<v-tab :value="9999" prepend-icon="mdi-plus" @click="addBrowserStore()">
				{{ $t('general.add') }}
			</v-tab>
		</v-tabs>
		<v-card-text class="m-default-sm">
			<v-window v-model="activeBrowserStoreTab">
				<v-window-item
					v-for="(browserStoreEntry, key) in processingModel.browserStore"
					:key="key"
					:value="key"
				>
					<div class="text-right">
						<v-btn
							class="my-8"
							color="error"
							append-icon="mdi-alert"
							@click="deleteBrowserStore(key)"
						>
							{{ $t('general.delete') }}
						</v-btn>
					</div>
					<GeneratorSettingsDataProcessingFormBrowserStore
						v-model="processingModel.browserStore[key]"
						@has-errors="setBrowserStoreErrors(key, $event)"
					/>
				</v-window-item>
				<v-window-item :value="9999">
					{{ $t('settings.data_processings.fields.browser_store.add_browser_store') }}
				</v-window-item>
			</v-window>
		</v-card-text>
	</v-card>

	<v-btn
		:disabled="hasErrors"
		class="mt-8"
		:color="hasErrors ? 'error' : 'primary'"
		block
		:append-icon="hasErrors ? 'mdi-alert' : ''"
		@click="createNew ? addProcessing() : emit('updated')"
	>
		{{
			createNew ? $t('settings.data_processings.add') : $t('settings.data_processings.close')
		}}
	</v-btn>

	<v-messages
		:active="hasErrors"
		:messages="$t('errors.errors_in_form')"
		color="error"
		class="mt-3 px-6 text-center"
	></v-messages>
</template>
