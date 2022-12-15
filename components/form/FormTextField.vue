<script setup>
import { defineProps, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: 'text',
	},
	label: {
		type: String,
		required: false,
		default: undefined,
	},
})

const { value, handleBlur, errors } = useField(
	toRef(props, 'name'),
	undefined,
	{ label: props.label }
)
</script>

<template>
	<v-text-field
		v-model="value"
		@blur="handleBlur"
		:label="label"
		:error="true"
		:error-messages="errors"
		:type="type"
		clearable
	/>
</template>
