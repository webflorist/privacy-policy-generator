<script setup lang="ts">
const settings = useSettings()

const numerusOptions: Numerus[] = ['singular', 'plural']
</script>
<template>
	<section class="bg-gray-50 pb-16">
		<div class="container prose max-w-2xl">
			<h2>{{ $t('settings.title') }}</h2>

			<TabView>
				<TabPanel :header="$t(`settings.tabs.general.title`)">
					<div class="p-buttonset mx-auto">
						<Button
							v-for="numerus in numerusOptions"
							:key="numerus"
							@click="settings.numerus = numerus"
							class="w-24"
							:class="
								settings.numerus === numerus
									? ''
									: 'p-button-outlined'
							"
						>
							{{
								$t(`settings.numerus.options.${numerus}.title`)
							}}
						</Button>
					</div>
				</TabPanel>
				<TabPanel :header="$t(`settings.tabs.data-controller.title`)">
					<FormFieldset>
						<FormField id="organisation">
							<template #label>
								{{
									$t(
										'settings.data-controller.organisation.title'
									)
								}}
							</template>
							<template #field>
								<InputText
									id="organisation"
									type="text"
									v-model="
										settings.dataController.organisation
									"
								/>
							</template>
						</FormField>
					</FormFieldset>
				</TabPanel>
			</TabView>
		</div>
	</section>
</template>
