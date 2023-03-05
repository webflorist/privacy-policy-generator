<script setup lang="ts"></script>

<template>
	<v-footer border="t">
		<v-row justify="center" no-gutters>
			<v-btn variant="text" class="mx-2" rounded="xl">
				test
			</v-btn>
			<v-col class="mt-4 text-center" cols="12">
				{{ new Date().getFullYear() }} <strong>webflorist</strong>
			</v-col>
		</v-row>
	</v-footer>
</template>
