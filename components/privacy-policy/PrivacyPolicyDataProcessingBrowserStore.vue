<script setup lang="ts">
const present = usePresenter()
const props = defineProps({
	browserStoreItems: {
		type: Array as () => BrowserStore[],
		required: true,
	},
})
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
			{{ present.humanizedDuration(browserStore.duration) }}<br />
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
