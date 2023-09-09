<script setup lang="ts">
const present = usePresenter()
const { t } = useI18n()
defineProps({
	browserStoreItems: {
		type: Array as () => BrowserStore[],
		required: true,
	},
})
const getDuration = (browserStore: BrowserStore) => {
	switch (browserStore.type) {
		case 'cookie':
			return browserStore.duration
				? present.humanizedDuration(browserStore.duration)
				: t('settings.data_processings.fields.browser_store.duration.options.unknown.title')
		case 'local_storage':
		case 'indexed_db':
			return t(
				'settings.data_processings.fields.browser_store.duration.options.unlimited.title'
			)
		case 'session_storage':
			return t(
				'settings.data_processings.fields.browser_store.duration.options.end_of_session.title'
			)
		default:
			return t('settings.data_processings.fields.browser_store.duration.options.unknown')
	}
}
</script>
<template>
	<ul>
		<li v-for="(browserStore, key) of browserStoreItems" :key="key">
			<strong
				><i>{{ browserStore.name }}:</i></strong
			><br />
			<template v-if="browserStore.thirdParty">
				{{ $t('settings.data_processings.fields.browser_store.third_party.title') }}<br
			/></template>
			<strong>{{ $t('settings.data_processings.fields.browser_store.type.title') }}:</strong>
			{{
				$t(
					`settings.data_processings.fields.browser_store.type.options.${browserStore.type}.title`
				)
			}}<br />
			<strong
				>{{
					$t('settings.data_processings.fields.browser_store.written_on.title')
				}}:</strong
			>
			{{
				$t(
					`settings.data_processings.fields.browser_store.written_on.options.${browserStore.writtenOn}.title`
				)
			}}<br />
			<strong
				>{{ $t('settings.data_processings.fields.browser_store.duration.title') }}:</strong
			>
			{{ getDuration(browserStore) }}<br />
			<strong
				>{{ $t('settings.data_processings.fields.browser_store.purpose.title') }}:</strong
			>
			{{
				$t(
					`settings.data_processings.fields.browser_store.purpose.options.${browserStore.purpose}.title`
				)
			}}
		</li>
	</ul>
</template>
