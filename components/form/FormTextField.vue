<script setup lang="ts">
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
	clearable: {
		type: Boolean,
		required: false,
		default: true,
	},
	modelValue: {
		type: [String, Object],
		default: '',
	},
})

const { value, handleBlur, handleChange, errors } = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	syncVModel: true,
})
</script>

<template>
	<v-text-field
		:model-value="value"
		:label="label"
		:error-messages="errors"
		hide-details="auto"
		:type="type"
		:clearable="clearable"
		persistent-hint
		:name="name"
		@blur="handleBlur"
		@input="handleChange"
		@update:modelValue="handleChange"
	>
		<template v-if="$slots.prepend" #prepend>
			<slot name="prepend" />
		</template>
		<template v-if="$slots.append" #append>
			<slot name="append" />
		</template>
		<template v-if="$slots['prepend-inner']" #prepend-inner>
			<slot name="prepend-inner" />
		</template>
		<template v-if="$slots['append-inner']" #append-inner>
			<slot name="append-inner" />
		</template>
		<template v-if="$slots.details" #details>
			<slot name="details" />
		</template>
	</v-text-field>
</template>
