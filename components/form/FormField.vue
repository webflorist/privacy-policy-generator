<script setup lang="ts">
defineProps({
	id: {
		required: true,
		type: String,
	},
})
</script>
<template>
	<label :for="id">
		<slot name="label"></slot>
	</label>
	<div>
		<slot name="field"></slot>
	</div>
</template>
