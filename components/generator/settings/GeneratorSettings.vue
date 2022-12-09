<script setup lang="ts">
const breakpoint = useBreakpoint()

const activeTab = ref('general')
const tabs = ['general', 'data-controller']
</script>
<template>
	<section class="bg-gray-50 pb-16">
		<div class="container-padding container prose max-w-2xl">
			<h2>{{ $t('settings.title') }}</h2>

			<v-card>
				<v-tabs
					v-model="activeTab"
					bg-color="primary"
					:direction="breakpoint.max.sm ? 'vertical' : 'horizontal'"
				>
					<v-tab
						v-for="tabKey in tabs"
						:key="tabKey"
						:value="tabKey"
						>{{ $t(`settings.tabs.${tabKey}.title`) }}</v-tab
					>
				</v-tabs>

				<v-card-text>
					<v-window v-model="activeTab">
						<v-window-item value="general">
							<GeneratorSettingsGeneral />
						</v-window-item>
						<v-window-item value="data-controller">
							<GeneratorSettingsDataController />
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</div>
	</section>
</template>
