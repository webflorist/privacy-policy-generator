<script setup lang="ts">
const { t } = useI18n()
const processors = useUsedProcessors(true)
const formatDataCategories = (dataCategories: DataCategory[]) => {
	return dataCategories
		.map((category) =>
			t(`settings.data_processings.fields.data_categories.options.${category}.title`)
		)
		.join(', ')
}
const formatProcessingCategories = (categories: DataProcessingCategory[]) => {
	return categories
		.map((category) => t(`settings.data_processings.categories.${category}.title`))
		.join(', ')
}
</script>
<template>
	<p>{{ $t('settings.processors.description') }}</p>
	<v-card v-for="(processor, key) in processors" :key="key" :title="processor.name">
		<v-list density="compact">
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.name.title')"
				:subtitle="processor.name"
			/>
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.street.title')"
				:subtitle="processor.street"
			/>
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.zip.title')"
				:subtitle="processor.zip"
			/>
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.city.title')"
				:subtitle="processor.city"
			/>
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.country.title')"
				:subtitle="processor.country"
			/>
			<v-list-item
				:title="$t('settings.data_processings.fields.processor.privacy_policy_url.title')"
			>
				<v-list-item-subtitle>
					<a :href="processor.privacy_policy_url" target="_blank">{{
						processor.privacy_policy_url
					}}</a>
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item :title="$t('settings.data_processings.title')">
				<v-list-item-subtitle>
					{{ formatProcessingCategories(processor.processing_categories) }}
				</v-list-item-subtitle>
			</v-list-item>
			<v-list-item :title="$t('settings.data_processings.fields.data_categories.title')">
				<v-list-item-subtitle>
					{{ formatDataCategories(processor.data_categories) }}
				</v-list-item-subtitle>
			</v-list-item>
		</v-list>
	</v-card>
	<pre>
	{{ processors }}
	</pre
	>
</template>
