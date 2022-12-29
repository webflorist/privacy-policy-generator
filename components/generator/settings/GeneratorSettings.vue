<script setup lang="ts">
import { useForm } from 'vee-validate'
const breakpoint = useBreakpoint()

const activeTab = ref('general')
const tabs = reactive({
	general: {
		errors: 0,
	},
	data_controller: {
		errors: 0,
	},
	data_processings: {
		errors: 0,
	},
	processors: {
		errors: 0,
	},
})
</script>
<template>
	<section class="bg-gray-50 pb-16">
		<div class="container-padding container prose max-w-3xl">
			<h2>{{ $t('settings.title') }}</h2>

			<v-card>
				<v-tabs
					v-model="activeTab"
					bg-color="primary"
					show-arrows
					center-active
					:direction="breakpoint.max.sm ? 'vertical' : 'horizontal'"
				>
					<v-tab
						v-for="(tabData, tabKey) in tabs"
						:key="tabKey"
						:value="tabKey"
					>
						{{ $t(`settings.${tabKey}.tab`) }}
						<v-badge
							v-if="tabData.errors > 0"
							color="red"
							:content="tabData.errors"
							inline
						>
						</v-badge>
					</v-tab>
				</v-tabs>

				<v-card-text>
					<v-window v-model="activeTab" class="p-1">
						<v-window-item value="general">
							<GeneratorSettingsGeneral />
						</v-window-item>
						<v-window-item value="data_controller" eager>
							<GeneratorSettingsDataController
								@errors="tabs.data_controller.errors = $event"
							/>
						</v-window-item>
						<v-window-item value="data_processings" eager>
							<GeneratorSettingsDataProcessings
								@errors="tabs.data_processings.errors = $event"
							/>
						</v-window-item>
						<v-window-item value="processors" eager>
							<GeneratorSettingsProcessors
								@errors="tabs.processors.errors = $event"
							/>
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</div>
	</section>
</template>
