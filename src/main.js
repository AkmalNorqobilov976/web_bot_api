import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents  from 'vue3-touch-events'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"

import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
import { useCardNumberPatternMatch } from './composables/useCardNumberPatternMatch'
const pinia = createPinia()
const app = createApp(App);
app.config.globalProperties.$noImage = 'https://archive.org/download/no-photo-available/no-photo-available.png';
app.use(pinia);
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('last-route')) {
        router.push(localStorage.getItem('last-route'));
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
