import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-purple/theme.css'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue, { ripple: true })
	nuxtApp.vueApp.directive('tooltip', Tooltip)
	nuxtApp.vueApp.component('Button', Button)
	nuxtApp.vueApp.component('Dropdown', Dropdown)
	nuxtApp.vueApp.component('TabView', TabView)
	nuxtApp.vueApp.component('TabPanel', TabPanel)
	nuxtApp.vueApp.component('InputText', InputText)
})
