<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
	name: {
		type: String,
		required: false,
		default: undefined,
	},
	label: {
		type: String,
		required: false,
		default: undefined,
	},
	clearable: {
		type: Boolean,
		required: false,
		default: true,
	},
	standalone: {
		type: Boolean,
		default: false,
		required: false,
	},
	modelValue: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['update:modelValue'])

const {
	value: inputValue,
	handleBlur,
	handleChange,
	errors,
} = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	standalone: props.standalone,
	initialValue: props.modelValue,
	valueProp: props.modelValue,
})

const onInput = (event) => {
	handleChange(event, true)
	emit('update:modelValue', event)
}
</script>

<template>
	<v-combobox
		@blur="handleBlur"
		@input="onInput($event)"
		@update:modelValue="onInput($event)"
		:modelValue="inputValue"
		:label="label"
		:error-messages="errors"
		:clearable="clearable"
	>
		<template v-slot:prepend-item>
			<slot name="prepend-item" />
		</template>
		<template v-slot:append-item>
			<slot name="append-item" />
		</template>
	</v-combobox>
</template>
