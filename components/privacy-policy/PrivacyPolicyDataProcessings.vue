<script setup lang="ts">
defineProps({
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

			<h5>{{ t('settings.data_processings.fields.processor.title') }}</h5>
			<p>
				{{ process.processor.name }}<br />
				{{ process.processor.street }}<br />
				{{ process.processor.zip }} {{ process.processor.city }}<br />
				{{ getCountryName(process.processor.country, locale) }}<br />

				<a :href="process.processor.privacy_policy_url" target="_blank">{{
					t('settings.data_processings.fields.processor.privacy_policy_url.title')
				}}</a>
				<template v-if="process.processor.dpf_url">
					<br />
					<a :href="process.processor.dpf_url" target="_blank">{{
						t('settings.data_processings.fields.processor.dpf_url.title')
					}}</a>
				</template>
			</p>

			<template v-if="process.purposes && process.purposes.length > 0">
				<h5>
					{{ t('settings.data_processings.fields.purposes.title') }}
				</h5>
				<ul>
					<li v-for="purpose of process.purposes" :key="purpose">
						<strong
							>{{
								t(
									`settings.data_processings.fields.purposes.options.${purpose}.title`
								)
							}}:</strong
						>
						{{
							t(
								`settings.data_processings.fields.purposes.options.${purpose}.description`
							)
						}}<br />
					</li>
				</ul>
			</template>

			<h5>
				{{ t('settings.data_processings.fields.data_categories.title') }}
			</h5>

			<ul>
				<li v-for="dataCategory of process.dataCategories" :key="dataCategory">
					<strong
						>{{
							t(
								`settings.data_processings.fields.data_categories.options.${dataCategory}.title`
							)
						}}:</strong
					>
					{{
						t(
							`settings.data_processings.fields.data_categories.options.${dataCategory}.description`
						)
					}}<br />
				</li>
			</ul>
			<template v-if="process.browserStore && process.browserStore.length > 0">
				<h5>
					{{ t('settings.data_processings.fields.browser_store.title') }}
				</h5>

				<PrivacyPolicyDataProcessingBrowserStore
					:browser-store-items="process.browserStore"
				/>
			</template>
		</li>
	</ul>
</template>
