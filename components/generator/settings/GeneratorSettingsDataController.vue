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
	<FormTextField
		:label="$t('settings.data_controller.fields.organisation.title')"
		name="organisation"
		v-model="settings.dataController.organisation"
	/>
	<FormTextField
		:label="$t('settings.data_controller.fields.name.title')"
		name="name"
		v-model="settings.dataController.name"
	/>
	<FormTextField
		:label="$t('settings.data_controller.fields.address.title')"
		name="address"
		v-model="settings.dataController.address"
		type="address"
	/>
	<FormTextField
		:label="$t('settings.data_controller.fields.email.title')"
		name="email"
		v-model="settings.dataController.email"
		type="email"
	/>
	<FormTextField
		:label="$t('settings.data_controller.fields.phone.title')"
		name="phone"
		v-model="settings.dataController.phone"
		type="tel"
	/>
</template>
