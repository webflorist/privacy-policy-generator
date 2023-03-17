<script lang="ts" setup>
useMetaTags()
useFavicons()
useColorTheme()
</script>
<template>
	<v-app>
		<PageHeader />
		<slot />
		<PageFooter />
	</v-app>
</template>
