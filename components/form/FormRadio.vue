<script setup lang="ts">
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
	<v-radio-group
		:label="label"
		:model-value="inputValue"
		:error-messages="errors"
		@update:modelValue="onInput($event)"
	>
		<v-radio :model-value="inputValue" @update:modelValue="onInput($event)">
			<template #label>
				{{ label }}
			</template>
		</v-radio>
	</v-radio-group>
</template>
