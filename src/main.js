import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents  from 'vue3-touch-events'
import { createPinia } from 'pinia'
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
const pinia = createPinia()
const app = createApp(App);
app.config.globalProperties.$noImage = 'https://archive.org/download/no-photo-available/no-photo-available.png';
app.use(pinia);
app.directive('custommodel', (el, binding) => {
    console.log(el, binding);
    el.oninput = (e) => {
        console.log(e, "eku");
    }
})
app.use(Vue3TouchEvents)
app.use(router).mount('#app')
