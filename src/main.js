import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents  from 'vue3-touch-events'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"
// /#tgWebAppData=query_id%3DAAFgY5teAgAAAGBjm15Z17ou%26user%3D%257B%2522id%2522%253A5882209120%252C%2522first_name%2522%253A%2522Frontend%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522language_code%2522%253A%2522en%2522%257D%26auth_date%3D1675341310%26hash%3D5796061732ae6901838d066111fcc896290c8299dba2961b0e84e8726a6b0651&tgWebAppVersion=6.4&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%2340a7e3%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23999999%22%2C%22link_color%22%3A%22%23168acd%22%2C%22secondary_bg_color%22%3A%22%23f1f1f1%22%2C%22text_color%22%3A%22%23000000%22%7D
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
import { useCardNumberPatternMatch } from './composables/useCardNumberPatternMatch'
const pinia = createPinia()
const app = createApp(App);
app.config.globalProperties.$noImage = 'https://archive.org/download/no-photo-available/no-photo-available.png';
app.use(pinia);
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('last-route')) {
        router.push('/balance-history');
    }
})
app.use(vClickOutside)
app.config.globalProperties.$filter = {
    debitCardFormat(e) {
        return useCardNumberPatternMatch({
            input: e,
            template: 'xxxx xxxx xxxx xxxx'
        });
    },

    numberFormat(e) {
        return new Intl.NumberFormat(undefined).format(e)
    }
}

app.use(Vue3TouchEvents)
app.use(router).mount('#app')
