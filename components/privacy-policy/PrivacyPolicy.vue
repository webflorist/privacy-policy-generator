<script setup lang="ts">
import prettify from 'pretty'
import TurndownService from 'turndown'

const settings = useSettings()

const turndownService = new TurndownService({
	headingStyle: 'atx',
})

const privacyPolicy = ref()
const showCopyMessage = ref(false)

const getPrettyHtml = () => {
	let html: string = privacyPolicy.value.innerHTML
	html = html.replaceAll('<!---->', '')
	html = html.replaceAll('<!--v-if-->', '')
	return prettify(html)
}
const copyHtml = () => {
	const html: string = getPrettyHtml()
	navigator.clipboard.writeText(html)
	showCopyMessage.value = true
}
const copyText = () => {
	const text: string = privacyPolicy.value.innerText
	navigator.clipboard.writeText(text)
	showCopyMessage.value = true
}
const copyMarkdown = () => {
	const markdown: string = turndownService.turndown(getPrettyHtml())
	navigator.clipboard.writeText(markdown)
	showCopyMessage.value = true
}
</script>
<template>
	<v-card class="m-default-sm sticky right-0 top-20 float-right">
		<v-card-title class="text-center">{{ $t('general.copy_to_clipboard') }}</v-card-title>
		<v-card-text class="flex justify-evenly gap-3">
			<v-btn @click="copyHtml()">{{ $t('general.copy_html') }}</v-btn>
			<v-btn @click="copyText()">{{ $t('general.copy_text') }}</v-btn>
			<v-btn @click="copyMarkdown()">{{ $t('general.copy_markdown') }}</v-btn>
			<v-snackbar v-model="showCopyMessage" color="primary" timeout="2000" location="top">
				{{ $t('general.copy_successful') }}
				<template #actions>
					<v-btn variant="text" color="white" @click="showCopyMessage = false">
						{{ $t('general.close') }}
					</v-btn>
				</template>
			</v-snackbar>
		</v-card-text>
	</v-card>
	<section ref="privacyPolicy" class="mt-32">
		<PrivacyPolicyText :settings="settings" />
	</section>
</template>
