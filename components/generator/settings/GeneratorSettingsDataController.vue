<script setup lang="ts">
import { useForm } from 'vee-validate'
import { defineRule } from 'vee-validate'
const { t } = useI18n()
const settings = useSettings()

defineRule('name-or-org-required', (value, target, ctx) => {
	if (ctx.form.name || ctx.form.organisation) {
		return true
	}
	return t('errors.name-or-org-required')
})
const form = useForm({
	validationSchema: {
		name: 'name-or-org-required',
		email: 'required|email',
	},
	validateOnMount: true,
})
</script>
<template>
	<p>{{ $t('settings.data_controller.description') }}</p>
	<form>
		<FormTextField
			v-model="settings.dataController.organisation"
			:label="$t('settings.data_controller.fields.organisation.title')"
			name="organisation"
		/>
		<FormTextField
			v-model="settings.dataController.name"
			:label="$t('settings.data_controller.fields.name.title')"
			name="name"
		/>
		<FormTextField
			v-model="settings.dataController.address"
			:label="$t('settings.data_controller.fields.address.title')"
			name="address"
			type="address"
		/>
		<FormTextField
			v-model="settings.dataController.email"
			:label="$t('settings.data_controller.fields.email.title')"
			name="email"
			type="email"
		/>
		<FormTextField
			v-model="settings.dataController.phone"
			:label="$t('settings.data_controller.fields.phone.title')"
			name="phone"
			type="tel"
		/>
	</form>
</template>
