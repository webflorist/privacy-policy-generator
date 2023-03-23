<script setup lang="ts">
const { locale: currentLocale } = useI18n()

const settings = useSettings()

const cc0Link = computed(() =>
	currentLocale.value === 'de'
		? 'https://creativecommons.org/publicdomain/zero/1.0/deed.de'
		: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en'
)

const hasWebhostingProcessing = computed(() => settings.value.dataProcessings.webhosting.length > 0)

const hasSettingsErrors = ref(false)

const hasErrors = computed(() => !hasWebhostingProcessing.value || hasSettingsErrors.value)
</script>

<template>
	<div>
		<v-main>
			<v-container tag="section" class="pt-16 text-center">
				<div class="mx-auto mb-12 max-w-3xl flex-row items-center justify-center md:flex">
					<img
						src="/logo.svg"
						:alt="$t('images.logo.alt')"
						:title="$t('meta.site.title')"
						class="mx-auto mb-8 h-60 w-60 drop-shadow-primary md:mb-0 md:mr-10"
					/>
					<h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-left">
						<span class="block">{{ $t('h1.line1') }}</span>
						{{ ' ' }}
						<span
							class="block text-4xl text-primary-100 drop-shadow-primary dark:text-primary-500 sm:text-6xl"
							>{{ $t('h1.line2') }}</span
						>
					</h1>
				</div>
				<div
					class="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
				>
					<p>{{ $t('intro.p1') }}</p>
					<a
						:href="cc0Link"
						class="m-default no-style mx-auto block w-40"
						target="_blank"
					>
						<SvgCC0PublicDomain :alt="$t('images.cc0_icon.alt')" />
					</a>
					<p v-html="$t('intro.p2')" />
				</div>
			</v-container>
			<GeneratorSettings @has-errors="hasSettingsErrors = $event" />
			<v-divider></v-divider>
			<v-container v-if="hasErrors">
				<v-alert v-if="!hasWebhostingProcessing" type="error">
					{{ $t('errors.missing-webhosting-data-processing') }}
				</v-alert>
				<v-alert v-if="hasSettingsErrors" type="error">
					{{ $t('errors.settings-errors') }}
				</v-alert>
			</v-container>
			<v-container>
				<PrivacyPolicy />
			</v-container>
		</v-main>
	</div>
</template>
