<script setup lang="ts">
const settings = useSettings()

const numerusOptions: Numerus[] = ['plural', 'singular']
</script>
<template>
	<v-btn-toggle variant="outlined" v-model="settings.numerus" mandatory class="mx-auto">
		<v-btn
			v-for="numerus in numerusOptions"
			:key="numerus"
			@click="settings.numerus = numerus"
			class="w-24"
			color="primary"
			:value="numerus"
		>
			{{ $t(`settings.numerus.options.${numerus}.title`) }}
		</v-btn>
	</v-btn-toggle>
</template>
