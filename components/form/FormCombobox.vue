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
		persistent-hint
		:return-object="false"
	>
		<template v-if="$slots.prepend" v-slot:prepend>
			<slot name="prepend" />
		</template>
		<template v-if="$slots.append" v-slot:append>
			<slot name="append" />
		</template>
		<template v-if="$slots['prepend-inner']" v-slot:prepend-inner>
			<slot name="prepend-inner" />
		</template>
		<template v-if="$slots['append-inner']" v-slot:append-inner>
			<slot name="append-inner" />
		</template>
		<template v-if="$slots.details" v-slot:details>
			<slot name="details" />
		</template>
	</v-combobox>
</template>
