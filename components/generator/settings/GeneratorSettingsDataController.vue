<script setup lang="ts">
const settings = useSettings()
</script>
<template>
	<v-form>
		<v-text-field :label="$t('settings.data-controller.organisation.title')" v-model="settings.dataController.organisation" />
		<v-text-field :label="$t('settings.data-controller.name.title')" v-model="settings.dataController.name" />
		<v-text-field :label="$t('settings.data-controller.address.title')" v-model="settings.dataController.address" />
		<v-text-field :label="$t('settings.data-controller.email.title')" v-model="settings.dataController.email" />
		<v-text-field :label="$t('settings.data-controller.phone.title')" v-model="settings.dataController.phone" />
	</v-form>
</template>
