<script setup lang="ts">
const settings = useSettings()

const numerusOptions: Numerus[] = ['plural', 'singular']
</script>
<template>
	<div>
		<v-radio-group
			:label="$t(`settings.numerus.title`)"
			v-model="settings.numerus"
			inline
		>
			<v-radio
				v-for="numerus in numerusOptions"
				:key="numerus"
				:label="$t(`settings.numerus.options.${numerus}.title`)"
				:value="numerus"
			></v-radio>
		</v-radio-group>
	</div>
</template>
