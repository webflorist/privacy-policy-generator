<script setup lang="ts">
const settings = useSettings()
const { t } = useI18n()

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
			name="language"
		/>
	</form>
</template>
