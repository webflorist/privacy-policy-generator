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
				&copy; {{ new Date().getFullYear() }}
				<strong>web.florist - Gerald Buttinger</strong>
			</v-col>
		</v-row>
	</v-footer>
</template>
