import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents  from 'vue3-touch-events'
import { createPinia } from 'pinia'
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.directive('resizeable', (el, binding) => {
    el.oninput = function () {
        console.log("zo'r", el.value.length * binding.modifiers.size);
        el.style.width = `${el.value.length * binding.modifiers.size + .6 }rem`;
    }
})
app.use(Vue3TouchEvents)
app.use(router).mount('#app')
