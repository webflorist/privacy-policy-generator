<script setup lang="ts">
import { useForm } from 'vee-validate'
const breakpoint = useBreakpoint()

const activeTab = ref('general')
const tabs = reactive({
	general: {
		errors: 0,
	},
	'data-controller': {
		errors: 0,
	},
	processors: {
		errors: 0,
	},
})
</script>
<template>
	<section class="bg-gray-50 pb-16">
		<div class="container-padding container prose max-w-2xl">
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
					<v-window v-model="activeTab">
						<v-window-item value="general">
							<GeneratorSettingsGeneral />
						</v-window-item>
						<v-window-item value="data-controller" eager>
							<GeneratorSettingsDataController
								@errors="
									tabs['data-controller'].errors = $event
								"
							/>
						</v-window-item>
						<v-window-item value="processors" eager>
							<GeneratorSettingsProcessors
								@errors="tabs['processors'].errors = $event"
							/>
						</v-window-item>
					</v-window>
				</v-card-text>
			</v-card>
		</div>
	</section>
</template>
