<script setup lang="ts">
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

const { value, handleBlur, handleChange, errors } = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	standalone: props.standalone,
	syncVModel: true,
})
</script>

<template>
	<v-autocomplete
		v-if="autocomplete"
		:model-value="value"
		:label="label"
		:error-messages="errors"
		hide-details="auto"
		:clearable="clearable"
		persistent-hint
		@blur="handleBlur"
		@input="handleChange"
		@update:modelValue="handleChange"
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
		:model-value="value"
		:label="label"
		:error-messages="errors"
		:clearable="clearable"
		@blur="handleBlur"
		@input="handleChange"
		@update:modelValue="handleChange"
	>
		<template #prepend-item>
			<slot name="prepend-item" />
		</template>
		<template #append-item>
			<slot name="append-item" />
		</template>
	</v-select>
</template>
