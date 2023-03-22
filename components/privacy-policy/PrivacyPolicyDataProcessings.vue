<script setup lang="ts">
const props = defineProps({
	items: {
		type: Array as () => DataProcessing[],
		required: true,
	},
	category: {
		type: String as () => DataProcessingCategory,
		required: true,
	},
})
const settings = useSettings()
const present = usePresenter()
const countries = useCountries()
const locale = computed(() => settings.value.general.language)
const t = (keypath: string) => useI18n().t(keypath, 1, { locale: locale.value })
</script>
<template>
	<p>{{ t('privacy_policy.data_processing.items.p1') }}</p>
	<ul>
		<li v-for="(process, key) of items" :key="key">
			<h4>{{ present.processTitle(process, category) }}</h4>

			<p v-if="process.required">
				{{ t('settings.data_processings.fields.required.title') }}
			</p>

			<h5>{{ t('settings.data_processings.fields.processor.title') }}</h5>

			<dl>
				<dt>{{ t('settings.data_processings.fields.processor.name.title') }}</dt>
				<dd>{{ process.processor.name }}</dd>

				<dt>{{ t('settings.data_processings.fields.processor.street.title') }}</dt>
				<dd>{{ process.processor.street }}</dd>

				<dt>{{ t('settings.data_processings.fields.processor.zip.title') }}</dt>
				<dd>{{ process.processor.zip }}</dd>

				<dt>{{ t('settings.data_processings.fields.processor.city.title') }}</dt>
				<dd>{{ process.processor.city }}</dd>

				<dt>{{ t('settings.data_processings.fields.processor.country.title') }}</dt>
				<dd>{{ countries.getCountryName(process.processor.country, locale) }}</dd>

				<dt>
					{{ t('settings.data_processings.fields.processor.privacy_policy_url.title') }}
				</dt>
				<dd>
					<a :href="process.processor.privacy_policy_url" target="_blank">{{
						process.processor.privacy_policy_url
					}}</a>
				</dd>
			</dl>

			<h5>{{ t('settings.data_processings.fields.data_categories.title') }}</h5>
			<dl>
				<template v-for="(category, key) of process.dataCategories" :key="key">
					<dt>
						{{
							t(
								`settings.data_processings.fields.data_categories.options.${category}.title`
							)
						}}
					</dt>
					<dd>
						{{
							t(
								`settings.data_processings.fields.data_categories.options.${category}.description`
							)
						}}
					</dd>
				</template>
			</dl>
		</li>
	</ul>
</template>
