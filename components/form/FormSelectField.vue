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
	useValidation: {
		type: Boolean,
		default: true,
		required: false,
	},
})

if (props.useValidation) {
	const { handleBlur, errors } = useField(toRef(props, 'name'), undefined, {
		label: props.label,
	})
} else {
	const handleBlur = () => {}
	const errors = []
}
</script>

<template>
	<v-select
		@blur="handleBlur"
		:label="label"
		:error-messages="errors"
		clearable
	/>
</template>
