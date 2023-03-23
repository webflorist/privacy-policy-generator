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
	autocomplete: {
		type: Boolean,
		required: false,
		default: false,
	},
	modelValue: {
		type: [String, Object],
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
	<v-autocomplete
		v-if="autocomplete"
		:model-value="inputValue"
		:label="label"
		:error-messages="errors"
		:clearable="clearable"
		persistent-hint
		@blur="handleBlur"
		@input="onInput($event)"
		@update:modelValue="onInput($event)"
	>
		<template #prepend-item>
			<slot name="prepend-item" />
		</template>
		<template #append-item>
			<slot name="append-item" />
		</template>
	</v-autocomplete>
	<v-select
		v-else
		:model-value="inputValue"
		:label="label"
		:error-messages="errors"
		:clearable="clearable"
		@blur="handleBlur"
		@input="onInput($event)"
		@update:modelValue="onInput($event)"
	>
		<template #prepend-item>
			<slot name="prepend-item" />
		</template>
		<template #append-item>
			<slot name="append-item" />
		</template>
	</v-select>
</template>
