<script setup lang="ts">
import PrivacyPolicyDataProcessings from './PrivacyPolicyDataProcessings.vue'

const settings = useSettings()
const locale = computed(() => settings.value.general.language)
const t = (keypath: string) => useI18n().t(keypath, 1, { locale: locale.value })

const usesCookies = computed(() =>
	Object.values(settings.value.dataProcessings).some((category) =>
		category.some((process) => process.cookies.length > 0)
	)
)
</script>
<template>
	<section>
		<h1>{{ t('privacy_policy.title') }}</h1>
		<p>{{ t('privacy_policy.intro_content.p1') }}</p>
		<p>{{ t('privacy_policy.intro_content.p2') }}</p>

		<section>
			<h2>{{ t('privacy_policy.gdpr_rights.title') }}</h2>
			<i18n-t keypath="privacy_policy.gdpr_rights.content.p1" :locale="locale" tag="p" />
			<ul>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li1.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li1.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li2.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li2.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li3.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li3.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li4.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li4.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li5.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li5.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li6.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li6.text') }}
				</li>
				<li>
					<strong>{{ t('privacy_policy.gdpr_rights.content.ul1.li7.strong') }}</strong>
					{{ t('privacy_policy.gdpr_rights.content.ul1.li7.text') }}
				</li>
			</ul>
		</section>

		<section>
			<h2>{{ t('privacy_policy.data_controller.title') }}</h2>
			<p>{{ t('privacy_policy.data_controller.content.p1') }}</p>
			<address>
				<template v-if="settings.dataController.organisation">
					{{ settings.dataController.organisation }}<br />
				</template>
				<template v-if="settings.dataController.name"
					>{{ settings.dataController.name }}<br
				/></template>
				<template v-if="settings.dataController.address">
					{{ settings.dataController.address }}<br />
				</template>
				<template v-if="settings.dataController.email">
					<a :href="'mailto:' + settings.dataController.email"
						>{{ settings.dataController.email }}<br
					/></a>
				</template>
				<template v-if="settings.dataController.phone">
					<a :href="'tel:' + settings.dataController.phone">{{
						settings.dataController.phone
					}}</a>
				</template>
			</address>
		</section>

		<section>
			<h2>{{ t('privacy_policy.security.title') }}</h2>
			<p>{{ t('privacy_policy.security.content.p1') }}</p>
			<p>{{ t('privacy_policy.security.content.p2') }}</p>
		</section>

		<section>
			<h2>{{ t('privacy_policy.cookies.title') }}</h2>

			<p v-if="!usesCookies">
				{{ t('privacy_policy.cookies.no_cookies_content.p1') }}
			</p>
			<template v-else>
				<p>{{ t('privacy_policy.cookies.content.p1') }}</p>
				<p>{{ t('privacy_policy.cookies.content.p2') }}</p>
				<p>{{ t('privacy_policy.cookies.content.p3') }}</p>
				<p>{{ t('privacy_policy.cookies.content.p4') }}</p>
			</template>
		</section>

		<section>
			<h2>{{ t('privacy_policy.data_processing.title') }}</h2>

			<section
				v-if="Object.entries(settings.dataProcessings.webhosting).length > 0"
				id="process-webhosting"
			>
				<h3>{{ t('privacy_policy.data_processing.webhosting.title') }}</h3>
				<p>{{ t('privacy_policy.data_processing.webhosting.content.p1') }}</p>
				<ul>
					<li>{{ t('privacy_policy.data_processing.webhosting.content.ul1.li1') }}</li>
					<li>{{ t('privacy_policy.data_processing.webhosting.content.ul1.li2') }}</li>
					<li>{{ t('privacy_policy.data_processing.webhosting.content.ul1.li3') }}</li>
					<li>{{ t('privacy_policy.data_processing.webhosting.content.ul1.li4') }}</li>
				</ul>
				<p>{{ t('privacy_policy.data_processing.webhosting.content.p2') }}</p>
				<PrivacyPolicyDataProcessings
					category="webhosting"
					:items="settings.dataProcessings.webhosting"
				/>
			</section>

			<section
				v-if="Object.entries(settings.dataProcessings.analytics).length > 0"
				id="process-analytics"
			>
				<h3>{{ t('privacy_policy.data_processing.analytics.title') }}</h3>

				<slot name="data_processing_analytics_start"></slot>

				<p>{{ t('privacy_policy.data_processing.analytics.content.p1') }}</p>
				<p>{{ t('privacy_policy.data_processing.analytics.content.p2') }}</p>

				<slot name="data_processing_analytics_end"></slot>
			</section>

			<section
				v-if="Object.entries(settings.dataProcessings.maps).length > 0"
				id="process-maps"
			>
				<h3>{{ t('privacy_policy.data_processing.maps.title') }}</h3>
				<slot name="data_processing_maps_start"></slot>
				<p>{{ t('privacy_policy.data_processing.maps.content.p1') }}</p>
				<p>{{ t('privacy_policy.data_processing.maps.content.p2') }}</p>
				<p>{{ t('privacy_policy.data_processing.maps.content.p3') }}</p>
				<slot name="data_processing_maps_end"></slot>
			</section>

			<section
				v-if="Object.entries(settings.dataProcessings.emails).length > 0"
				id="process-emails"
			>
				<h3>{{ t('privacy_policy.data_processing.send_emails.title') }}</h3>
				<slot name="data_processing_send_emails_start"></slot>
				<p>{{ t('privacy_policy.data_processing.send_emails.content.p1') }}</p>
				<slot name="data_processing_send_emails_end"></slot>
			</section>
		</section>
		<!--template>

			<section>
				<h2>{{ t('privacy_policy.cookies.title') }}</h2>

				<slot name="cookies_start"></slot>

				<p
					v-if="cookies === false"
					v-html="t('privacy_policy.cookies.no_cookies_content.p1')"
				/>
				<template v-else>
					<p>{{t('privacy_policy.cookies.content.p1') }} </p>
					<p>{{t('privacy_policy.cookies.content.p2') }} </p>
					<p>{{t('privacy_policy.cookies.content.p3') }} </p>
					<section v-for="cookieType of cookieTypes" :key="cookieType">
						<h3>{{ t('privacy_policy.cookies.' + cookieType + '.title') }}</h3>
						<p>{{t('privacy_policy.cookies.' + cookieType + '.content.p1') }} </p>
						<CookieDetails
							v-for="(cookie, key) of cookies[cookieType]"
							:key="key"
							:cookie="cookie"
							:t="t"
							:processors="usedProcessors"
							:type="cookieType"
						/>
					</section>
				</template>

				<slot name="cookies_end"></slot>
			</section>

			<section v-if="Object.entries(dataProcessing).length > 0">
				<h2>{{ t('privacy_policy.data_processing.title') }}</h2>

				<slot name="data_processing_start"></slot>

				<section v-if="dataProcessing.webhosting" id="process-webhosting">
					<h3>{{ t('privacy_policy.data_processing.webhosting.title') }}</h3>

					<slot name="data_processing_webhosting_start"></slot>

					<p>{{t('privacy_policy.data_processing.webhosting.content.p1') }} </p>
					<ul>
						<li
							v-html="t('privacy_policy.data_processing.webhosting.content.ul1.li1')"
						/>
						<li
							v-html="t('privacy_policy.data_processing.webhosting.content.ul1.li2')"
						/>
						<li
							v-html="t('privacy_policy.data_processing.webhosting.content.ul1.li3')"
						/>
						<li
							v-html="t('privacy_policy.data_processing.webhosting.content.ul1.li4')"
						/>
					</ul>
					<p>{{t('privacy_policy.data_processing.webhosting.content.p2') }} </p>

					<slot name="data_processing_webhosting_end"></slot>
				</section>

				<section v-if="dataProcessing.analytics" id="process-analytics">
					<h3>{{ t('privacy_policy.data_processing.analytics.title') }}</h3>

					<slot name="data_processing_analytics_start"></slot>

					<p>{{t('privacy_policy.data_processing.analytics.content.p1') }} </p>
					<p>{{t('privacy_policy.data_processing.analytics.content.p2') }} </p>

					<slot name="data_processing_analytics_end"></slot>
				</section>

				<section v-if="dataProcessing.maps" id="process-maps">
					<h3>{{ t('privacy_policy.data_processing.maps.title') }}</h3>
					<slot name="data_processing_maps_start"></slot>
					<p>{{t('privacy_policy.data_processing.maps.content.p1') }} </p>
					<p>{{t('privacy_policy.data_processing.maps.content.p2') }} </p>
					<p>{{t('privacy_policy.data_processing.maps.content.p3') }} </p>
					<slot name="data_processing_maps_end"></slot>
				</section>

				<section v-if="dataProcessing.send_emails" id="process-send_emails">
					<h3>{{ t('privacy_policy.data_processing.send_emails.title') }}</h3>
					<slot name="data_processing_send_emails_start"></slot>
					<p>{{t('privacy_policy.data_processing.send_emails.content.p1') }} </p>
					<slot name="data_processing_send_emails_end"></slot>
				</section>

				<slot name="data_processing_end"></slot>
			</section>

			<section>
				<h2>{{ t('privacy_policy.outgoing_links.title') }}</h2>
				<slot name="outgoing_links_start"></slot>
				<p>{{t('privacy_policy.outgoing_links.content.p1') }} </p>
				<slot name="outgoing_links_end"></slot>
			</section>

			<section>
				<h2>{{ t('privacy_policy.processor_list') }}</h2>

				<slot name="processor_list_start"></slot>

				<section
					v-for="(processor, key) in usedProcessors"
					:id="'processor-' + key"
					:key="key"
				>
					<h3>{{ processor.name }}</h3>
					<dl>
						<dt>{{ t('privacy_policy.address') }}</dt>
						<dd>
							{{ processor.address }}
						</dd>

						<dt>{{ t('privacy_policy.data_purpose.title') }}</dt>
						<dd>
							<div v-for="(purpose, key) in processor.purposes" :key="key">
								<a :href="'#process-' + purpose">{{
									t('privacy_policy.data_purpose.' + purpose)
								}}</a>
							</div>
						</dd>

						<dt>{{ t('privacy_policy.data_category.title') }}</dt>
						<dd>
							<span v-for="(category, key) in processor.data_categories" :key="key">
								<template v-if="key > 0 && key < processor.data_categories.length"
									>,
								</template>
								{{ t('privacy_policy.data_category.' + category) }}
							</span>
						</dd>

						<dt>{{ t('privacy_policy.privacy_policy') }}</dt>
						<dd>
							<a
								:href="processor.privacy_policy"
								target="_blank"
								rel="noopener nofollower"
								>{{ processor.privacy_policy }}</a
							>
						</dd>

						<template v-if="processor.privacy_shield">
							<dt>Privacy Shield</dt>
							<dd>
								<a
									:href="processor.privacy_shield"
									target="_blank"
									rel="noopener nofollower"
									>{{ processor.privacy_shield }}</a
								>
							</dd>
						</template>
					</dl>
				</section>

				<slot name="processor_list_end"></slot>
			</section>
		</template-->
	</section>
</template>
