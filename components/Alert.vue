<script setup lang="ts">
type AlertType = 'warning' | 'error' | 'success'

defineProps({
	type: {
		type: [String as () => AlertType],
		required: true,
	},
})
</script>
<template>
	<v-alert tag="section" dense :color="type">
		{{ $t('errors.missing-webhosting-data-processing') }}
	</v-alert>
</template>
