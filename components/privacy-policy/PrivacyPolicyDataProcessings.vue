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
const { getCountryName } = useCountries()
const settings = useSettings()
const present = usePresenter()
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

			<dl>
				<dt>
					<h5>{{ t('settings.data_processings.fields.processor.title') }}</h5>
				</dt>
				<dd>
					{{ process.processor.name }}<br />
					{{ process.processor.street }}<br />
					{{ process.processor.zip }}<br />
					{{ process.processor.city }}<br />
					{{ getCountryName(process.processor.country, locale) }}
				</dd>

				<dt>
					<h5>
						{{
							t('settings.data_processings.fields.processor.privacy_policy_url.title')
						}}
					</h5>
				</dt>
				<dd>
					<a :href="process.processor.privacy_policy_url" target="_blank">{{
						process.processor.privacy_policy_url
					}}</a>
				</dd>

				<dt>
					<h5>
						{{ t('settings.data_processings.fields.data_categories.title') }}
					</h5>
				</dt>
				<dd>
					<template v-for="dataCategory of process.dataCategories" :key="dataCategory">
						{{
							t(
								`settings.data_processings.fields.data_categories.options.${dataCategory}.title`
							)
						}}
						({{
							t(
								`settings.data_processings.fields.data_categories.options.${dataCategory}.description`
							)
						}})<br />
					</template>
				</dd>
				<template v-if="process.browserStore && process.browserStore.length > 0">
					<dt>
						<h5>
							{{ t('settings.data_processings.fields.browser_store.title') }}
						</h5>
					</dt>
					<dd>
						<PrivacyPolicyDataProcessingBrowserStore
							:browser-store-items="process.browserStore"
						/>
					</dd>
				</template>
			</dl>
		</li>
	</ul>
</template>
