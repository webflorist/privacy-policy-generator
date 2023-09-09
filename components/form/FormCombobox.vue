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
	modelValue: {
		type: [String, Number],
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
	<v-combobox
		:model-value="value"
		:label="label"
		:error-messages="errors"
		hide-details="auto"
		:clearable="clearable"
		persistent-hint
		:return-object="false"
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
	</v-combobox>
</template>
