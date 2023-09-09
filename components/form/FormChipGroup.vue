<script setup lang="ts">
import { useField } from 'vee-validate'

type Item = {
	title: string
	value: string
	hint?: string
}

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
	items: {
		type: [Array as () => Item[]],
		required: true,
	},
	modelValue: {
		type: [String, Array],
		default: '',
	},
})

const { value, handleChange, errors } = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	syncVModel: true,
})
</script>

<template>
	<div>
		<v-chip-group :model-value="value" v-bind="$attrs" @update:model-value="handleChange">
			<v-chip v-for="(item, key) in items" :key="key" :value="item.value">
				{{ item.title }}
				<v-tooltip v-if="item.hint" activator="parent" location="bottom">{{
					item.hint
				}}</v-tooltip>
			</v-chip>
		</v-chip-group>
		<v-messages
			v-if="errors.length > 0"
			:active="errors.length > 0"
			:messages="errors"
			color="error"
			class="mt-3 px-3"
		></v-messages>
	</div>
</template>
