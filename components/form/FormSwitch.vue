<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import { useField } from 'vee-validate'

type Item = {
	title: string
	value: string
}

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
	modelValue: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['update:modelValue'])

const {
	value: inputValue,
	handleChange,
	errors,
} = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	initialValue: props.modelValue,
	valueProp: props.modelValue,
})

const onInput = (event) => {
	handleChange(event, true)
	emit('update:modelValue', event)
}
</script>

<template>
	<v-switch
		:label="label"
		@update:modelValue="onInput($event)"
		:modelValue="inputValue"
	>
	</v-switch>
</template>
