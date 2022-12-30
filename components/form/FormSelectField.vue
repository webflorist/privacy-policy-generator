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
	standalone: {
		type: Boolean,
		default: false,
		required: false,
	},
})

const { handleChange, errors } = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	standalone: props.standalone,
})
</script>

<template>
	<v-select
		@update:modelValue="handleChange"
		:label="label"
		:error-messages="errors"
		clearable
		:focused="true"
	>
		<template v-slot:prepend-item>
			<slot name="prepend-item" />
		</template>
		<template v-slot:append-item>
			<slot name="append-item" />
		</template>
	</v-select>
</template>
