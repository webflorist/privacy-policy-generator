<script setup lang="ts">
const settings = useSettings()
const { t } = useI18n()

const numerusOptions = computed(() => [
	{ value: 'plural', title: t('settings.general.fields.numerus.options.plural.title') },
	{ value: 'singular', title: t('settings.general.fields.numerus.options.singular.title') },
])

const languageOptions = computed(() => [
	{ value: 'de', title: t('settings.general.fields.language.options.de.title') },
	{ value: 'en', title: t('settings.general.fields.language.options.en.title') },
])
</script>
<template>
	<form>
		<FormSelectField
			v-model="settings.general.language"
			:label="$t(`settings.general.fields.language.title`)"
			:items="languageOptions"
			empty-option
		/>
		<FormRadioGroup
			v-model="settings.general.numerus"
			:label="$t(`settings.general.fields.numerus.title`)"
			inline
			:messages="$t('settings.general.fields.numerus.hint')"
			:items="numerusOptions"
		/>
	</form>
</template>
