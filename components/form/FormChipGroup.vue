<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import { useField } from 'vee-validate'

type Item = {
	title: string
	value: string
	hint?: string
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
	<v-chip-group @update:modelValue="onInput($event)" :modelValue="inputValue">
		<v-chip v-for="(item, key) in items" :key="key" :value="item.value">
			{{ item.title }}
			<v-tooltip v-if="item.hint" activator="parent" location="bottom">{{
				item.hint
			}}</v-tooltip>
		</v-chip>
	</v-chip-group>
</template>
