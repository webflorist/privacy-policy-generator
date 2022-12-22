<script setup lang="ts">
import PrivacyPolicyText from '@webflorist/privacy-policy-text'

const settings = useSettings()

const activePanel = ref(null)

console.log(PrivacyPolicyText.processors)
</script>
<template>
	<v-expansion-panels v-model="activePanel">
		<v-expansion-panel>
			<v-expansion-panel-title
				expand-icon="mdi-plus"
				collapse-icon="mdi-close"
			>
				{{ $t('settings.processors.add') }}
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<GeneratorSettingsProcessorForm @created="activePanel = null" />
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-for="(processorData, processorKey) in settings.processors"
			:key="'processor-'+processorKey"
		>
			<v-expansion-panel-title
				expand-icon="mdi-pencil"
				collapse-icon="mdi-close"
			>
				{{ processorData.name }}
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<GeneratorSettingsProcessorForm :processorKey="processorKey" />
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
