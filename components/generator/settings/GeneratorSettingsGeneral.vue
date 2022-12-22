<script setup lang="ts">
const settings = useSettings()

const numerusOptions: Numerus[] = ['plural', 'singular']
</script>
<template>
	<v-radio-group
		:label="$t(`settings.general.fields.numerus.title`)"
		v-model="settings.general.numerus"
		inline
		:messages="$t('settings.general.fields.numerus.hint')"
	>
		<v-radio
			v-for="numerus in numerusOptions"
			:key="numerus"
			:label="
				$t(`settings.general.fields.numerus.options.${numerus}.title`)
			"
			:value="numerus"
		></v-radio>
	</v-radio-group>
</template>
