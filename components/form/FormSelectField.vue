<script setup>
import { defineProps, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: false,
		default: undefined,
	},
})

const { handleBlur, errors } = useField(
	toRef(props, 'name'),
	undefined,
	{ label: props.label }
)
</script>

<template>
	<v-select
		@blur="handleBlur"
		:label="label"
		:error-messages="errors"
		clearable
	/>
</template>
