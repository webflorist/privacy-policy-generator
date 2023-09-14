<script setup lang="ts">
const settings = useSettings()
const { t } = useI18n()

const languageOptions = computed(() => [
	{ value: 'de', title: t('settings.general.fields.language.options.de.title') },
	{ value: 'en', title: t('settings.general.fields.language.options.en.title') },
	{ value: 'it', title: t('settings.general.fields.language.options.it.title') },
])

const langIsAiGenerated = computed(() => ['it'].includes(settings.value.general.language))
</script>
<template>
	<form>
		<FormSelectField
			v-model="settings.general.language"
			:label="$t(`settings.general.fields.language.title`)"
			:items="languageOptions"
			empty-option
			name="language"
		/>
		<v-alert v-if="langIsAiGenerated" type="warning">
			{{ $t('settings.general.language.ai_generated_hint') }}
		</v-alert>
		<i18n-t keypath="settings.general.fields.language.add_new_hint" tag="p">
			<template #issue>
				<a
					href="https://github.com/webflorist/privacy-policy-generator/issues"
					target="_blank"
					>issue</a
				>
			</template>
		</i18n-t>
	</form>
</template>
