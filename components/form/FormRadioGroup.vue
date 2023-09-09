<script setup lang="ts">
import { useField } from 'vee-validate'

type Item = {
	title: string
	value: string
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
		type: String,
		default: '',
	},
})

const { value, handleChange, errors } = useField(toRef(props, 'name'), undefined, {
	label: props.label,
	syncVModel: true,
})
</script>

<template>
	<v-radio-group
		:label="label"
		:model-value="value"
		:error-messages="errors"
		hide-details="auto"
		@update:modelValue="handleChange"
	>
		<v-radio v-for="(item, key) in items" :key="key" :value="item.value">
			<template #label>
				{{ item.title }}
			</template>
		</v-radio>
	</v-radio-group>
</template>
