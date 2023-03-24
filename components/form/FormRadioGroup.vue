<script setup lang="ts">
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
	items: {
		type: [Array as () => Item[]],
		required: true,
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
		<v-radio v-for="(item, key) in items" :key="key" :value="item.value">
			<template #label>
				{{ item.title }}
			</template>
		</v-radio>
	</v-radio-group>
</template>
