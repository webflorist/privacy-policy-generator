<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
	<v-footer border="t">
		<v-row justify="center" no-gutters class="text-sm">
			<NuxtLink
				:to="localePath('privacy-policy')"
				class="unstyled"
				:title="$t('privacy_policy.title')"
			>
				{{ $t('privacy_policy.title') }}
			</NuxtLink>
			<v-col class="mt-4 text-center" cols="12">
				&copy; {{ new Date().getFullYear() }} <strong>webflorist</strong> |
				<a :href="$t('general.cc0_link')" target="_blank">{{
					$t('general.cc0_licence')
				}}</a>
			</v-col>
		</v-row>
	</v-footer>
</template>
